import { NextRequest, NextResponse } from "next/server";
import { getAuthOr401 } from "../../../auth";
import { createClient } from "@/lib/supabase/server";
import {
  computeScore,
  computeMoneyAwarded,
  computeMoneyPenalty,
  getNextRunState,
} from "@/lib/arena/scoring";
import type { QuestionFormat } from "@/lib/arena/types";

function normalizeResponsePayload(response: unknown): string {
  if (Array.isArray(response)) {
    return response
      .map((x) => String(x).trim().toLowerCase())
      .filter(Boolean)
      .sort()
      .join(",");
  }
  return String(response ?? "").trim();
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;

  const { runId } = await params;
  if (!runId) {
    return NextResponse.json({ error: "runId required" }, { status: 400 });
  }

  let body: { questionId?: string; response?: unknown; timeTakenSec?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { questionId, response: rawResponse, timeTakenSec } = body;
  if (!questionId || rawResponse === undefined) {
    return NextResponse.json(
      { error: "questionId and response required" },
      { status: 400 }
    );
  }

  const timeTaken = Math.max(0, Math.floor(Number(timeTakenSec) || 0));
  const response = normalizeResponsePayload(rawResponse);

  const supabase = await createClient();

  const { data: run, error: runErr } = await supabase
    .from("ranked_runs")
    .select(
      "id, user_id, status, lives_remaining, streak, total_money, questions_answered, questions_correct, current_difficulty, highest_difficulty, avg_difficulty"
    )
    .eq("id", runId)
    .single();

  if (runErr || !run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }
  if (run.user_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (run.status !== "active") {
    return NextResponse.json({ error: "Run not active" }, { status: 400 });
  }

  const { data: question, error: qErr } = await supabase
    .from("questions")
    .select(
      "id, correct_answer, format, difficulty, expected_time_sec"
    )
    .eq("id", questionId)
    .single();

  if (qErr || !question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const { data: rating } = await supabase
    .from("ratings")
    .select("title")
    .eq("user_id", userId)
    .maybeSingle();

  const userTitle = rating?.title ?? "Intern";
  const expectedTimeSec = Math.max(
    1,
    Math.floor(Number(question.expected_time_sec) ?? 30)
  );

  const score = computeScore(
    question.format as QuestionFormat,
    question.correct_answer,
    response
  );

  const difficulty = question.difficulty;
  const moneyAwarded = computeMoneyAwarded(
    score,
    difficulty,
    timeTaken,
    expectedTimeSec,
    run.streak
  );
  const moneyPenalty = computeMoneyPenalty(
    score,
    difficulty,
    run.streak,
    userTitle
  );

  const delta = moneyAwarded - moneyPenalty;
  const newTotalMoney = run.total_money + delta;

  const next = getNextRunState(
    score,
    run.lives_remaining,
    run.streak,
    run.current_difficulty
  );

  const newQuestionsAnswered = run.questions_answered + 1;
  const newQuestionsCorrect = run.questions_correct + (score > 0 ? 1 : 0);
  const newAvg =
    (run.avg_difficulty * run.questions_answered + difficulty) /
    newQuestionsAnswered;
  const newHighest = Math.max(run.highest_difficulty, difficulty);

  const { error: insertErr } = await supabase.from("ranked_run_answers").insert({
    run_id: runId,
    question_id: questionId,
    correct: score > 0,
    difficulty,
    money_awarded: moneyAwarded,
    money_penalty: moneyPenalty,
    time_taken_sec: timeTaken,
    response: rawResponse as string | number | boolean | object,
  });

  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 500 });
  }

  const { error: updateRunErr } = await supabase
    .from("ranked_runs")
    .update({
      lives_remaining: next.livesRemaining,
      streak: next.streak,
      total_money: newTotalMoney,
      questions_answered: newQuestionsAnswered,
      questions_correct: newQuestionsCorrect,
      current_difficulty: next.currentDifficulty,
      highest_difficulty: newHighest,
      avg_difficulty: newAvg,
    })
    .eq("id", runId);

  if (updateRunErr) {
    return NextResponse.json({ error: updateRunErr.message }, { status: 500 });
  }

  await supabase.from("question_history").upsert(
    {
      user_id: userId,
      question_id: questionId,
      last_seen_at: new Date().toISOString(),
      correct: score > 0,
      difficulty,
    },
    { onConflict: "user_id,question_id" }
  );

  return NextResponse.json({
    correct: score > 0,
    moneyAwarded,
    moneyPenalty,
    livesRemaining: next.livesRemaining,
    streak: next.streak,
    totalMoney: newTotalMoney,
    currentDifficulty: next.currentDifficulty,
  });
}
