import { NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

/** Normalized shape after taking first profile/school from Supabase relation arrays. */
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

/** Raw shape from Supabase (profiles/schools can be arrays from joins). */
type RawRatingRow = {
  user_id: string;
  market_value: number;
  peak_market_value: number;
  title: string;
  profiles: Array<{
    username: string | null;
    school_id: string | null;
    schools: Array<{ name: string }> | null;
  }> | null;
};

function normalizeRatingRow(r: RawRatingRow): RatingRow {
  const profile = r.profiles?.[0] ?? null;
  const schools = profile?.schools;
  const school = Array.isArray(schools) ? schools[0] ?? null : schools;
  return {
    user_id: r.user_id,
    market_value: r.market_value,
    peak_market_value: r.peak_market_value,
    title: r.title,
    profiles: profile
      ? {
          username: profile.username,
          school_id: profile.school_id,
          schools: school ? { name: school.name } : null,
        }
      : null,
  };
}

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

  const withUsername = (rows ?? []).map((r) =>
    normalizeRatingRow(r as RawRatingRow)
  );
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
