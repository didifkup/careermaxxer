import { NextRequest, NextResponse } from "next/server";
import { getAuthOr401 } from "../../../auth";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

const HOURS_RECENTLY_SEEN = 2;
const MIN_CANDIDATES_BEFORE_EXPAND = 1;

/** Thin fields (no explanation) for fast load. */
const QUESTION_THIN_SELECT =
  "id, topic, subtopic, difficulty, format, prompt, option_a, option_b, option_c, option_d, expected_time_sec, tags";

function now() {
  return Date.now();
}

/** Fetch one question by difficulty band using OFFSET (no ORDER BY random). */
async function fetchOneQuestion(
  supabase: SupabaseClient,
  diffs: number[],
  excludeSubtopic: string | null
): Promise<Record<string, unknown> | null> {
  let q = supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true)
    .in("difficulty", diffs);
  if (excludeSubtopic != null && excludeSubtopic.trim() !== "") {
    q = q.neq("subtopic", excludeSubtopic);
  }
  const { count, error: countErr } = await q;
  if (countErr || count == null || count < 1) return null;
  const offset = Math.floor(Math.random() * Math.max(0, count));
  let q2 = supabase
    .from("questions")
    .select(QUESTION_THIN_SELECT)
    .eq("is_active", true)
    .in("difficulty", diffs)
    .order("id", { ascending: true })
    .range(offset, offset);
  if (excludeSubtopic != null && excludeSubtopic.trim() !== "") {
    q2 = q2.neq("subtopic", excludeSubtopic);
  }
  const { data: row } = await q2.maybeSingle();
  return row as Record<string, unknown> | null;
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  const t0 = now();
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;
  const tAuth = now() - t0;

  const { runId } = await params;
  if (!runId) {
    return NextResponse.json({ error: "runId required" }, { status: 400 });
  }

  const supabase = await createClient();

  const t1 = now();
  const { data: run, error: runErr } = await supabase
    .from("ranked_runs")
    .select("id, user_id, current_difficulty, status")
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
  const tRun = now() - t1;

  const difficulty = Math.max(1, Math.min(5, run.current_difficulty));
  const cutoffIso = new Date(
    Date.now() - HOURS_RECENTLY_SEEN * 60 * 60 * 1000
  ).toISOString();

  const t2 = now();
  const [lastAnswerRes, recentSeenRes] = await Promise.all([
    supabase
      .from("ranked_run_answers")
      .select("question_id")
      .eq("run_id", runId)
      .order("answered_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("question_history")
      .select("question_id")
      .eq("user_id", userId)
      .gt("last_seen_at", cutoffIso),
  ]);
  const tParallel = now() - t2;

  let lastSubtopic: string | null = null;
  let tLastQ = 0;
  if (lastAnswerRes.data?.question_id) {
    const t2a = now();
    const { data: lastQ } = await supabase
      .from("questions")
      .select("subtopic")
      .eq("id", lastAnswerRes.data.question_id)
      .single();
    lastSubtopic = lastQ?.subtopic ?? null;
    tLastQ = now() - t2a;
  }

  const t3 = now();
  let diffs = [difficulty];
  let questionRow = await fetchOneQuestion(supabase, diffs, lastSubtopic);
  if (!questionRow && MIN_CANDIDATES_BEFORE_EXPAND >= 1) {
    diffs = [
      ...new Set([
        Math.max(1, difficulty - 1),
        difficulty,
        Math.min(5, difficulty + 1),
      ]),
    ];
    questionRow = await fetchOneQuestion(supabase, diffs, lastSubtopic);
  }
  const tQuestion = now() - t3;

  if (!questionRow) {
    return NextResponse.json(
      { error: "No questions available" },
      { status: 404 }
    );
  }

  const total = now() - t0;
  console.log(
    "[ranked/next-question]",
    {
      runId,
      auth_ms: tAuth,
      run_ms: tRun,
      parallel_last_recent_ms: tParallel,
      last_subtopic_ms: tLastQ,
      question_select_ms: tQuestion,
      total_ms: total,
    }
  );

  const question = {
    id: questionRow.id,
    topic: questionRow.topic,
    subtopic: questionRow.subtopic,
    difficulty: questionRow.difficulty,
    format: questionRow.format,
    prompt: questionRow.prompt,
    option_a: questionRow.option_a ?? null,
    option_b: questionRow.option_b ?? null,
    option_c: questionRow.option_c ?? null,
    option_d: questionRow.option_d ?? null,
    expected_time_sec: questionRow.expected_time_sec ?? 30,
    tags: questionRow.tags ?? null,
  };

  return NextResponse.json({ question });
}
