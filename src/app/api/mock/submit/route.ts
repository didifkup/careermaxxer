import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";

const MAX_DURATION_SECONDS = 120;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB
const RATE_LIMIT_PER_DAY = 10;

const submitSchema = z.object({
  track: z.enum(["technical", "behavioral"]),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  questionId: z.string().uuid(),
  durationSeconds: z.number().min(1).max(MAX_DURATION_SECONDS),
});

const FILLER_WORDS = [
  "um",
  "uh",
  "like",
  "you know",
  "so",
  "actually",
  "literally",
  "basically",
];

function countFillers(text: string): Record<string, number> {
  const lower = text.toLowerCase();
  const counts: Record<string, number> = {};
  for (const word of FILLER_WORDS) {
    const regex =
      word === "you know"
        ? new RegExp("\\byou\\s+know\\b", "gi")
        : new RegExp(`\\b${word.replace(/\s+/g, "\\s+")}\\b`, "gi");
    const matches = lower.match(regex);
    counts[word] = matches ? matches.length : 0;
  }
  return counts;
}

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export type FillerMetrics = {
  counts: Record<string, number>;
  total_filler: number;
  word_count: number;
  estimated_wpm: number;
  first_5s_density?: number;
};

function computeFillerMetrics(
  transcript: string,
  durationSeconds: number
): FillerMetrics {
  const counts = countFillers(transcript);
  const total_filler = Object.values(counts).reduce((a, b) => a + b, 0);
  const wc = wordCount(transcript);
  const estimated_wpm = Math.round(
    (wc / Math.max(durationSeconds, 1)) * 60
  );
  const words = transcript.trim().split(/\s+/);
  const first25 = words.slice(0, 25).join(" ");
  const firstFiller = countFillers(first25);
  const first_5s_density = Object.values(firstFiller).reduce((a, b) => a + b, 0);
  return {
    counts,
    total_filler,
    word_count: wc,
    estimated_wpm,
    first_5s_density,
  };
}

type Scores = {
  content: number;
  structure: number;
  clarity: number;
  concision: number;
  confidence: number;
  overall: number;
};

type FeedbackPayload = {
  scores: Scores;
  strengths: string[];
  fixes: string[];
  model_answer: string;
  rewrite_my_answer: string;
  follow_up_question: string;
  tag_feedback: Array<{ tag: string; note: string }>;
};

type NextBestFix = {
  title: string;
  why: string;
  target: {
    metric: "total_filler" | "structure" | "concision" | "content" | "clarity";
    current: number;
    goal: number;
  };
  drill: { name: string; steps: string[] };
};

function computeNextBestFix(
  scores: Scores,
  fillerMetrics: FillerMetrics,
  track: string
): NextBestFix {
  const { total_filler, estimated_wpm } = fillerMetrics;
  const { structure, concision, content, clarity } = scores;

  if (total_filler >= 10) {
    const goal = Math.ceil(total_filler * 0.5);
    return {
      title: "Cut filler words by 50%",
      why: "High filler count distracts from your message and can signal nervousness.",
      target: { metric: "total_filler", current: total_filler, goal },
      drill: {
        name: "Pause instead of filler",
        steps: [
          "When you feel an 'um' coming, pause for 1 second instead.",
          "Record a 10-second opener twice; aim for zero fillers the second time.",
          "Practice the first sentence of your answer until it's smooth.",
        ],
      },
    };
  }

  if (track === "behavioral" && structure < 7) {
    const goal = Math.min(10, structure + 2);
    return {
      title: "Strengthen STAR structure",
      why: "Behavioral answers land when they have clear Situation, Task, Action, and Result.",
      target: { metric: "structure", current: structure, goal },
      drill: {
        name: "STAR skeleton",
        steps: [
          "Situation: 1 line of context.",
          "Task: 1 line of your goal.",
          "Action: 2 lines of what you did.",
          "Result: 1 line with a metric or tangible impact.",
        ],
      },
    };
  }

  if (concision < 7 || estimated_wpm > 190) {
    const goal = Math.min(10, concision + 2);
    return {
      title: "Tighten pacing and concision",
      why: "Interviewers prefer crisp answers; slow down and trim fluff.",
      target: { metric: "concision", current: concision, goal },
      drill: {
        name: "60-second cap",
        steps: [
          "Answer in 4 bullets max.",
          "Headline first, then 2–3 supporting points.",
          "Practice the same question in under 60 seconds.",
        ],
      },
    };
  }

  if (track === "technical" && content < 7) {
    const goal = Math.min(10, content + 2);
    return {
      title: "Cover key points from the ideal answer",
      why: "Technical scores depend on correctness and hitting the main concepts.",
      target: { metric: "content", current: content, goal },
      drill: {
        name: "3-point checklist",
        steps: [
          "Before answering, list 3 must-mention points from the rubric.",
          "Deliver each point in one sentence, then brief support.",
          "Re-record until all 3 appear clearly.",
        ],
      },
    };
  }

  const goal = Math.min(10, clarity + 2);
  return {
    title: "Lead with a headline",
    why: "Clarity improves when you state the answer first, then support.",
    target: { metric: "clarity", current: clarity, goal },
    drill: {
      name: "Headline-first",
      steps: [
        "Give a 1-sentence direct answer first.",
        "Then 2 supporting bullets.",
        "Avoid burying the lead.",
      ],
    },
  };
}

export async function POST(request: NextRequest) {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const userId = auth.userId;

  const supabaseAdmin = createServiceRoleClient();

  const { count } = await supabaseAdmin
    .from("mock_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if ((count ?? 0) >= RATE_LIMIT_PER_DAY) {
    return NextResponse.json(
      { error: "Rate limit: max 10 mock attempts per day. Try again tomorrow." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  const track = formData.get("track") as string | null;
  const difficultyRaw = formData.get("difficulty");
  const questionId = formData.get("questionId") as string | null;
  const durationRaw = formData.get("durationSeconds");
  const video = formData.get("video") as File | null;

  const durationSeconds =
    durationRaw != null ? Number(durationRaw) : NaN;
  const difficultyStr =
    typeof difficultyRaw === "string" ? difficultyRaw : undefined;
  const parsed = submitSchema.safeParse({
    track: track ?? undefined,
    difficulty:
      difficultyStr === "1" ? 1 : difficultyStr === "2" ? 2 : difficultyStr === "3" ? 3 : undefined,
    questionId: questionId ?? undefined,
    durationSeconds: Number.isFinite(durationSeconds) ? durationSeconds : undefined,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first ? `${first.path.join(".")}: ${first.message}` : "Validation failed" },
      { status: 400 }
    );
  }

  if (!video || !(video instanceof Blob) || video.size === 0) {
    return NextResponse.json({ error: "Missing or empty video file" }, { status: 400 });
  }
  if (video.size > MAX_VIDEO_BYTES) {
    return NextResponse.json(
      { error: "Video too large (max 50MB)" },
      { status: 400 }
    );
  }

  const { track: t, difficulty: d, questionId: qId, durationSeconds: dur } = parsed.data;

  const { data: question, error: qErr } = await supabaseAdmin
    .from("mock_questions")
    .select("id, prompt, ideal_answer, rubric_json")
    .eq("id", qId)
    .single();

  if (qErr || !question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  // Video is used only for transcription; never stored (no Supabase Storage).
  let transcriptText: string;
  try {
    const openai = getOpenAIClient();
    const buf = await video.arrayBuffer();
    const nodeFile = new File([buf], "audio.webm", { type: "video/webm" });
    const transcription = await openai.audio.transcriptions.create({
      file: nodeFile,
      model: "whisper-1",
      response_format: "text",
    });
    transcriptText =
      typeof transcription === "string"
        ? transcription
        : (transcription as { text?: string }).text ?? "";
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Transcription failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const fillerMetrics = computeFillerMetrics(transcriptText, dur);

  const gradingPrompt = `You are an IB interview grader. Grade this candidate response.

TRACK: ${t}
DIFFICULTY: ${d}
QUESTION: ${question.prompt}
IDEAL ANSWER (key points): ${question.ideal_answer}
RUBRIC: ${JSON.stringify(question.rubric_json)}

CANDIDATE TRANSCRIPT:
${transcriptText}

${t === "technical" ? "Score content heavily on correctness vs the ideal answer; call out missing or wrong points." : "Score structure heavily on STAR/CAR and specificity; penalize vagueness and lack of result/impact."}

Output ONLY valid JSON with this exact shape (no markdown, no extra text):
{
  "scores": {
    "content": number 1-10,
    "structure": number 1-10,
    "clarity": number 1-10,
    "concision": number 1-10,
    "confidence": number 1-10,
    "overall": number 1-10
  },
  "strengths": ["max 3 punchy items"],
  "fixes": ["max 3 actionable items"],
  "model_answer": "concise best-in-class answer (2-4 sentences)",
  "rewrite_my_answer": "same meaning as transcript but tighter, IB tone, no fluff",
  "follow_up_question": "one natural follow-up the interviewer might ask",
  "tag_feedback": [{"tag": "string", "note": "string"}]
}`;

  let feedbackPayload: FeedbackPayload;
  try {
    const openai = getOpenAIClient();
    const model = getOpenAIModel();
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: gradingPrompt }],
      response_format: { type: "json_object" },
      max_tokens: 1500,
    });
    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const parsedFeedback = JSON.parse(raw) as FeedbackPayload;
    if (
      !parsedFeedback.scores ||
      typeof parsedFeedback.scores.overall !== "number"
    ) {
      throw new Error("Invalid grading response");
    }
    feedbackPayload = {
      scores: parsedFeedback.scores,
      strengths: Array.isArray(parsedFeedback.strengths)
        ? parsedFeedback.strengths.slice(0, 3)
        : [],
      fixes: Array.isArray(parsedFeedback.fixes)
        ? parsedFeedback.fixes.slice(0, 3)
        : [],
      model_answer: String(parsedFeedback.model_answer ?? ""),
      rewrite_my_answer: String(parsedFeedback.rewrite_my_answer ?? ""),
      follow_up_question: String(parsedFeedback.follow_up_question ?? ""),
      tag_feedback: Array.isArray(parsedFeedback.tag_feedback)
        ? parsedFeedback.tag_feedback
        : [],
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Grading failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const next_best_fix = computeNextBestFix(
    feedbackPayload.scores,
    fillerMetrics,
    t
  );

  const { error: insertErr } = await supabaseAdmin.from("mock_attempts").insert({
    user_id: userId,
    question_id: qId,
    track: t,
    difficulty: d,
    transcript_text: transcriptText,
    filler_counts: fillerMetrics.counts,
    scores_json: feedbackPayload.scores,
    feedback_json: {
      strengths: feedbackPayload.strengths,
      fixes: feedbackPayload.fixes,
      model_answer: feedbackPayload.model_answer,
      rewrite_my_answer: feedbackPayload.rewrite_my_answer,
      follow_up_question: feedbackPayload.follow_up_question,
      tag_feedback: feedbackPayload.tag_feedback,
    },
    next_best_fix,
  });

  if (insertErr) {
    return NextResponse.json(
      { error: "Failed to save attempt" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    transcript_text: transcriptText,
    filler_counts: fillerMetrics.counts,
    total_filler: fillerMetrics.total_filler,
    word_count: fillerMetrics.word_count,
    estimated_wpm: fillerMetrics.estimated_wpm,
    first_5s_density: fillerMetrics.first_5s_density,
    scores_json: feedbackPayload.scores,
    feedback_json: {
      strengths: feedbackPayload.strengths,
      fixes: feedbackPayload.fixes,
      model_answer: feedbackPayload.model_answer,
      rewrite_my_answer: feedbackPayload.rewrite_my_answer,
      follow_up_question: feedbackPayload.follow_up_question,
      tag_feedback: feedbackPayload.tag_feedback,
    },
    next_best_fix,
  });
}
