import { NextRequest, NextResponse } from "next/server";
import { getAuthOr401 } from "../../../auth";
import { createClient } from "@/lib/supabase/server";
import { computeFinalize } from "@/lib/arena/finalize";

export async function POST(
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

  const { data: run, error: runErr } = await supabase
    .from("ranked_runs")
    .select(
      "id, user_id, status, total_money, compensation_delta, ended_at, questions_correct, questions_answered, avg_difficulty"
    )
    .eq("id", runId)
    .single();

  if (runErr || !run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }
  if (run.user_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (run.status === "completed") {
    const { data: rating } = await supabase
      .from("ratings")
      .select("market_value, title")
      .eq("user_id", userId)
      .single();

    return NextResponse.json({
      idempotent: true,
      totalMoney: run.total_money,
      compensationDelta: run.compensation_delta,
      newMarketValue: rating?.market_value ?? 60_000,
      newTitle: rating?.title ?? "Intern",
      titleChange: null,
    });
  }

  const { data: rating, error: ratingErr } = await supabase
    .from("ratings")
    .select("market_value, peak_market_value, title, placement_runs_completed")
    .eq("user_id", userId)
    .single();

  if (ratingErr || !rating) {
    return NextResponse.json({ error: "Rating not found" }, { status: 500 });
  }

  const questionsAnswered = run.questions_answered ?? 0;
  const questionsCorrect = run.questions_correct ?? 0;
  const avgDifficulty = Number(run.avg_difficulty) || 2;

  const {
    compensationDelta,
    newMarketValue,
    newTitle,
    newPeak,
  } = computeFinalize(
    run.total_money,
    questionsCorrect,
    questionsAnswered,
    avgDifficulty,
    rating.market_value,
    rating.peak_market_value
  );

  const previousTitle = rating.title;
  const titleChange =
    previousTitle !== newTitle
      ? newMarketValue > rating.market_value
        ? "promotion"
        : "demotion"
      : null;

  const { error: updateRunErr } = await supabase
    .from("ranked_runs")
    .update({
      status: "completed",
      ended_at: new Date().toISOString(),
      compensation_delta: compensationDelta,
    })
    .eq("id", runId);

  if (updateRunErr) {
    return NextResponse.json({ error: updateRunErr.message }, { status: 500 });
  }

  const { error: updateRatingErr } = await supabase
    .from("ratings")
    .update({
      market_value: newMarketValue,
      peak_market_value: newPeak,
      title: newTitle,
      placement_runs_completed: (rating.placement_runs_completed ?? 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (updateRatingErr) {
    return NextResponse.json(
      { error: updateRatingErr.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    idempotent: false,
    totalMoney: run.total_money,
    compensationDelta,
    newMarketValue,
    newTitle,
    titleChange,
  });
}
