import { NextRequest, NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createClient, upsertProfileForUser } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 25_000;
const BOOST_PER_POINT = 150;
const BOOST_CAP = 5000;
const RATE_LIMIT_DAYS = 7;

const RESUME_SYSTEM = `You are an expert IB (investment banking) recruiter and resume coach. You tailor resumes for banking roles and score them using a strict rubric. You NEVER invent companies, job titles, or metrics. If the resume is missing quantified outcomes, suggest placeholders like "[X%]" or "[$Y]" and list them in missing_metrics. Flag any claims that sound exaggerated in risky_claims.

SCORING RUBRIC (apply strictly):
- ib_fit (0-20): Relevance of experiences to finance, deal/analysis proximity, finance language.
- impact (0-20): Quantified outcomes, ownership verbs, scope of responsibility.
- clarity (0-20): Scannability, concise bullets, no fluff.
- structure (0-15): Clean section order, consistent formatting.
- story (0-15): Narrative coherence, career progression, why-IB plausibility.
- ats (0-10): Simple formatting, no heavy tables/graphics reliance.

Total = ib_fit + impact + clarity + structure + story + ats (max 100). Return overall as integer 0-100.

For tailored_resume: Keep ALL original companies and job titles. Only rewrite bullet points and structure for IB (action verbs, metrics first, banking-relevant framing). Do not add or invent any role or company.

Respond with valid JSON only, no markdown code fence.`;

type AIResumeResponse = {
  tailored_resume: string;
  pitches: { s30: string; s60: string; s90: string };
  score: {
    overall: number;
    breakdown: {
      ib_fit: number;
      impact: number;
      clarity: number;
      structure: number;
      story: number;
      ats: number;
    };
  };
  next_best_fix: {
    title: string;
    why: string;
    target: { metric: string; current: number; goal: number };
    drill: { name: string; steps: string[] };
  };
  guardrails: { risky_claims: string[]; missing_metrics: string[] };
};

function sanitize(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_TEXT_LENGTH);
}

async function extractText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = (file.name || "").toLowerCase();

  if (name.endsWith(".pdf")) {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    try {
      const textResult = await parser.getText();
      return sanitize(textResult?.text ?? "");
    } finally {
      await parser.destroy();
    }
  }

  if (name.endsWith(".docx") || name.endsWith(".doc")) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return sanitize(result.value || "");
  }

  throw new Error("Unsupported format. Use PDF or DOCX.");
}

export async function POST(req: NextRequest) {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const userId = auth.userId;

  let file: File | null = null;
  try {
    const formData = await req.formData();
    file = formData.get("file") as File | null;
  } catch {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  if (!file || file.size === 0) {
    return NextResponse.json(
      { error: "No file or empty file" },
      { status: 400 }
    );
  }

  let rawText: string;
  try {
    rawText = await extractText(file);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to extract text";
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }

  if (!rawText || rawText.length < 50) {
    return NextResponse.json(
      { error: "Extracted text too short or empty" },
      { status: 400 }
    );
  }

  const openai = getOpenAIClient();
  const model = getOpenAIModel();

  const userPrompt = `Resume text (extracted):\n\n${rawText}\n\nProduce: 1) tailored_resume (IB-formatted, same roles/companies), 2) pitches (s30, s60, s90 for "Walk me through your resume"), 3) score with breakdown (integers, rubric above), 4) next_best_fix (one priority improvement with target metric and drill steps), 5) guardrails (risky_claims, missing_metrics). JSON only.`;

  let parsed: AIResumeResponse;
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: RESUME_SYSTEM },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });
    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty AI response");
    parsed = JSON.parse(content) as AIResumeResponse;
  } catch (e) {
    console.error("Resume AI error:", e);
    return NextResponse.json(
      { error: "AI processing failed" },
      { status: 500 }
    );
  }

  const overall = Math.min(100, Math.max(0, Math.round(Number(parsed.score?.overall) || 0)));
  const breakdown = parsed.score?.breakdown || {};
  const b = {
    ib_fit: Math.min(20, Math.max(0, Math.round(Number(breakdown.ib_fit) || 0))),
    impact: Math.min(20, Math.max(0, Math.round(Number(breakdown.impact) || 0))),
    clarity: Math.min(20, Math.max(0, Math.round(Number(breakdown.clarity) || 0))),
    structure: Math.min(15, Math.max(0, Math.round(Number(breakdown.structure) || 0))),
    story: Math.min(15, Math.max(0, Math.round(Number(breakdown.story) || 0))),
    ats: Math.min(10, Math.max(0, Math.round(Number(breakdown.ats) || 0))),
  };
  const tailored = String(parsed.tailored_resume ?? "").slice(0, 100_000);
  const pitch30 = String(parsed.pitches?.s30 ?? "").slice(0, 5000);
  const pitch60 = String(parsed.pitches?.s60 ?? "").slice(0, 5000);
  const pitch90 = String(parsed.pitches?.s90 ?? "").slice(0, 5000);
  const nextBestFix = parsed.next_best_fix
    ? {
        title: String(parsed.next_best_fix.title ?? ""),
        why: String(parsed.next_best_fix.why ?? ""),
        target: {
          metric: String(parsed.next_best_fix.target?.metric ?? "score"),
          current: Number(parsed.next_best_fix.target?.current) || 0,
          goal: Number(parsed.next_best_fix.target?.goal) || 100,
        },
        drill: {
          name: String(parsed.next_best_fix.drill?.name ?? "Improve"),
          steps: Array.isArray(parsed.next_best_fix.drill?.steps)
            ? parsed.next_best_fix.drill.steps.map(String)
            : [],
        },
      }
    : { title: "Improve score", why: "Keep refining.", target: { metric: "overall", current: overall, goal: 100 }, drill: { name: "Practice", steps: [] } };

  const supabase = await createClient();
  const { data: previousBestRow } = await supabase
    .from("resume_submissions")
    .select("score_overall")
    .eq("user_id", userId)
    .order("score_overall", { ascending: false })
    .limit(1)
    .maybeSingle();
  const previousBest = previousBestRow?.score_overall ?? 0;
  const scoreDelta = Math.max(0, overall - previousBest);
  let boost = Math.min(BOOST_CAP, scoreDelta * BOOST_PER_POINT);

  const service = createServiceRoleClient();
  const { data: lastBoost } = await service
    .from("market_value_events")
    .select("created_at")
    .eq("user_id", userId)
    .eq("reason", "Resume Lab improvement")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let boostAvailableInDays: number | null = null;
  if (lastBoost?.created_at) {
    const last = new Date(lastBoost.created_at).getTime();
    const now = Date.now();
    const daysSince = (now - last) / (1000 * 60 * 60 * 24);
    if (daysSince < RATE_LIMIT_DAYS) {
      boost = 0;
      boostAvailableInDays = Math.ceil(RATE_LIMIT_DAYS - daysSince);
    }
  }

  const { data: submission, error: insertErr } = await supabase
    .from("resume_submissions")
    .insert({
      user_id: userId,
      original_text: rawText,
      tailored_text: tailored,
      pitch_30: pitch30,
      pitch_60: pitch60,
      pitch_90: pitch90,
      score_overall: overall,
      score_breakdown: b,
      next_best_fix: nextBestFix,
    })
    .select("id")
    .single();

  if (insertErr || !submission) {
    console.error("Resume submission insert error:", insertErr);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }

  let newMarketValue = 60_000;
  if (boost > 0) {
    const supabaseAuth = await createClient();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    await upsertProfileForUser(userId, user?.email ?? null);
    const { data: rating } = await service
      .from("ratings")
      .select("market_value, peak_market_value")
      .eq("user_id", userId)
      .maybeSingle();

    const current = rating?.market_value ?? 60_000;
    const peak = rating?.peak_market_value ?? 60_000;
    newMarketValue = Math.min(1_000_000, current + boost);
    const newPeak = Math.max(peak, newMarketValue);

    await service.from("ratings").upsert(
      {
        user_id: userId,
        market_value: newMarketValue,
        peak_market_value: newPeak,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    await service.from("market_value_events").insert({
      user_id: userId,
      delta_value: boost,
      reason: "Resume Lab improvement",
      metadata: {
        resume_submission_id: submission.id,
        score_overall: overall,
        previous_best: previousBest,
        boost,
      },
    });
  } else {
    const { data: rating } = await service
      .from("ratings")
      .select("market_value")
      .eq("user_id", userId)
      .maybeSingle();
    newMarketValue = rating?.market_value ?? 60_000;
  }

  return NextResponse.json({
    submission_id: submission.id,
    score_overall: overall,
    score_breakdown: b,
    next_best_fix: nextBestFix,
    tailored_resume: tailored,
    pitches: { s30: pitch30, s60: pitch60, s90: pitch90 },
    guardrails: parsed.guardrails || { risky_claims: [], missing_metrics: [] },
    boost,
    boost_available_in_days: boostAvailableInDays,
    new_market_value: newMarketValue,
  });
}
