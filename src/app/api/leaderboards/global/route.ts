import { NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

/** Normalized shape after taking first profile/school from Supabase relation arrays. */
type RatingRow = {
  user_id: string;
  market_value: number;
  peak_market_value: number;
  title: string;
  profiles: {
    username: string | null;
    email: string | null;
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
    email: string | null;
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
          email: profile.email ?? null,
          school_id: profile.school_id,
          schools: school ? { name: school.name } : null,
        }
      : null,
  };
}

/** Display name for leaderboard: username, or email local part, or "Anonymous". */
function displayName(profile: RatingRow["profiles"]): string {
  const u = profile?.username?.trim();
  if (u) return u;
  const e = profile?.email?.trim();
  if (e) {
    const local = e.split("@")[0]?.trim();
    if (local) return local;
  }
  return "Anonymous";
}

export async function GET() {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;

  const supabase = createServiceRoleClient();

  const { data: rows, error } = await supabase
    .from("ratings")
    .select(
      "user_id, market_value, peak_market_value, title, profiles!inner(username, email, school_id, schools!school_id(name))"
    )
    .order("market_value", { ascending: false })
    .order("peak_market_value", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const normalized = (rows ?? []).map((r) =>
    normalizeRatingRow(r as RawRatingRow)
  );
  const top100 = normalized.slice(0, 100);

  let leaderboard = top100.map((r, index) => ({
    rank: index + 1,
    user_id: r.user_id,
    username: displayName(r.profiles),
    school_name: r.profiles?.schools?.name ?? null,
    title: r.title,
    market_value: r.market_value,
    peak_market_value: r.peak_market_value,
  }));

  // Enrich current user's row from auth + profile so name/school are visible even if join or email was missing
  const authClient = await createClient();
  const {
    data: { user: authUser },
  } = await authClient.auth.getUser();
  const authEmail = authUser?.email?.trim() || null;
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("username, school_id, schools!school_id(name)")
    .eq("id", userId)
    .single();
  const mySchoolRaw = myProfile?.schools as { name: string } | Array<{ name: string }> | null | undefined;
  const mySchool = Array.isArray(mySchoolRaw) ? mySchoolRaw[0] : mySchoolRaw;
  let mySchoolName: string | null =
    mySchool && typeof mySchool.name === "string" ? mySchool.name : null;
  if (!mySchoolName && myProfile?.school_id) {
    const { data: schoolRow } = await supabase
      .from("schools")
      .select("name")
      .eq("id", myProfile.school_id)
      .single();
    mySchoolName = schoolRow?.name?.trim() ?? null;
  }
  const myDisplayName =
    myProfile?.username?.trim() ||
    (authEmail ? authEmail.split("@")[0]?.trim() : null) ||
    "Anonymous";
  leaderboard = leaderboard.map((row) =>
    row.user_id === userId
      ? {
          ...row,
          username: myDisplayName,
          school_name: mySchoolName ?? row.school_name,
        }
      : row
  );

  return NextResponse.json(leaderboard);
}
