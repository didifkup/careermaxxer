import { NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

type RatingRow = {
  user_id: string;
  market_value: number;
  peak_market_value: number;
  title: string;
  profiles: {
    username: string | null;
    school_id: string | null;
    schools: { name: string } | null;
  } | null;
};

export async function GET() {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;

  const supabase = createServiceRoleClient();

  const { data: rows, error } = await supabase
    .from("ratings")
    .select(
      "user_id, market_value, peak_market_value, title, profiles!inner(username, school_id, schools(name))"
    )
    .order("market_value", { ascending: false })
    .order("peak_market_value", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const withUsername = (rows ?? []) as RatingRow[];
  const filtered = withUsername.filter(
    (r) => r.profiles?.username != null && r.profiles.username.trim() !== ""
  );
  const top100 = filtered.slice(0, 100);

  const leaderboard = top100.map((r, index) => ({
    rank: index + 1,
    user_id: r.user_id,
    username: r.profiles!.username!.trim(),
    school_name: r.profiles?.schools?.name ?? null,
    title: r.title,
    market_value: r.market_value,
    peak_market_value: r.peak_market_value,
  }));

  return NextResponse.json(leaderboard);
}
