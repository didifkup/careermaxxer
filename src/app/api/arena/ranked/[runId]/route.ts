import { NextRequest, NextResponse } from "next/server";
import { getAuthOr401 } from "../../auth";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;

  const { runId } = await params;
  if (!runId) {
    return NextResponse.json({ error: "runId required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: run, error } = await supabase
    .from("ranked_runs")
    .select(
      "id, user_id, started_at, duration_sec, lives_total, lives_remaining, current_difficulty, streak, total_money, status"
    )
    .eq("id", runId)
    .single();

  if (error || !run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }
  if (run.user_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    runId: run.id,
    started_at: run.started_at,
    duration_sec: run.duration_sec,
    lives_total: run.lives_total,
    lives_remaining: run.lives_remaining,
    current_difficulty: run.current_difficulty,
    streak: run.streak,
    total_money: run.total_money,
    status: run.status,
  });
}
