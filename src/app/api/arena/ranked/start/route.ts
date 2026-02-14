import { NextResponse } from "next/server";
import { getAuthOr401 } from "../../auth";
import { createClient } from "@/lib/supabase/server";
import { getTitleFromMarketValue } from "@/lib/arena/ladder";
import type { SupabaseClient } from "@supabase/supabase-js";

const DURATION_SEC = 600;
const LIVES_TOTAL = 3;
const DEFAULT_DIFFICULTY = 2;

/** Thin fields for first question (no explanation). */
const QUESTION_THIN_SELECT =
  "id, topic, subtopic, difficulty, format, prompt, option_a, option_b, option_c, option_d, expected_time_sec, tags";

function now() {
  return Date.now();
}

/** Fetch one question by difficulty using OFFSET (no ORDER BY random). */
async function fetchOneQuestionByDifficulty(
  supabase: SupabaseClient,
  difficulty: number
): Promise<Record<string, unknown> | null> {
  const diffs = [Math.max(1, Math.min(5, difficulty))];
  const { count, error: countErr } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true)
    .in("difficulty", diffs);
  if (countErr || count == null || count < 1) return null;
  const offset = Math.floor(Math.random() * Math.max(0, count));
  const { data: row } = await supabase
    .from("questions")
    .select(QUESTION_THIN_SELECT)
    .eq("is_active", true)
    .in("difficulty", diffs)
    .order("id", { ascending: true })
    .range(offset, offset)
    .maybeSingle();
  return row as Record<string, unknown> | null;
}

export async function POST() {
  const t0 = now();
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;
  const tAuth = now() - t0;

  const supabase = await createClient();

  const t1 = now();
  const { data: existingRating } = await supabase
    .from("ratings")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!existingRating) {
    const title = getTitleFromMarketValue(60_000);
    const { error: insertErr } = await supabase.from("ratings").insert({
      user_id: userId,
      market_value: 60_000,
      peak_market_value: 60_000,
      title,
      placement_runs_completed: 0,
    });
    if (insertErr) {
      return NextResponse.json(
        { error: insertErr.message },
        { status: 500 }
      );
    }
  }
  const tRating = now() - t1;

  const t2 = now();
  const { data: run, error } = await supabase
    .from("ranked_runs")
    .insert({
      user_id: userId,
      duration_sec: DURATION_SEC,
      lives_total: LIVES_TOTAL,
      lives_remaining: LIVES_TOTAL,
      current_difficulty: DEFAULT_DIFFICULTY,
      highest_difficulty: DEFAULT_DIFFICULTY,
      avg_difficulty: DEFAULT_DIFFICULTY,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const tRun = now() - t2;

  const t3 = now();
  const firstQuestionRow = await fetchOneQuestionByDifficulty(
    supabase,
    DEFAULT_DIFFICULTY
  );
  const tQuestion = now() - t3;

  const total = now() - t0;
  console.log(
    "[ranked/start]",
    {
      auth_ms: tAuth,
      rating_ms: tRating,
      run_insert_ms: tRun,
      first_question_ms: tQuestion,
      total_ms: total,
    }
  );

  const first_question = firstQuestionRow
    ? {
        id: firstQuestionRow.id,
        topic: firstQuestionRow.topic,
        subtopic: firstQuestionRow.subtopic,
        difficulty: firstQuestionRow.difficulty,
        format: firstQuestionRow.format,
        prompt: firstQuestionRow.prompt,
        option_a: firstQuestionRow.option_a ?? null,
        option_b: firstQuestionRow.option_b ?? null,
        option_c: firstQuestionRow.option_c ?? null,
        option_d: firstQuestionRow.option_d ?? null,
        expected_time_sec: firstQuestionRow.expected_time_sec ?? 30,
        tags: firstQuestionRow.tags ?? null,
      }
    : null;

  return NextResponse.json({
    runId: run.id,
    started_at: run.started_at,
    run: {
      id: run.id,
      duration_sec: run.duration_sec,
      lives_total: run.lives_total,
      lives_remaining: run.lives_remaining,
      current_difficulty: run.current_difficulty,
      streak: run.streak,
      total_money: run.total_money,
      status: run.status,
    },
    first_question,
  });
}
