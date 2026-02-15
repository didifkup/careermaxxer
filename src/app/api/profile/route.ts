import { NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createClient, upsertProfileForUser } from "@/lib/supabase/server";

export async function GET() {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  const authEmail = authUser?.email?.trim() || null;

  let { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("id, username, email, school_id, avatar_url, schools!school_id(name)")
    .eq("id", userId)
    .single();

  if (profileErr || !profile) {
    await upsertProfileForUser(userId, authEmail);
    const retry = await supabase
      .from("profiles")
      .select("id, username, email, school_id, avatar_url, schools!school_id(name)")
      .eq("id", userId)
      .single();
    profile = retry.data;
    profileErr = retry.error;
  }
  if (profileErr || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Sync email from auth into profile when missing (e.g. user hit leaderboard before account/arena)
  const profileEmail = profile.email?.trim() || null;
  if (!profileEmail && authEmail) {
    await supabase.from("profiles").update({ email: authEmail }).eq("id", userId);
    (profile as { email: string | null }).email = authEmail;
  }

  const { data: rating } = await supabase
    .from("ratings")
    .select("market_value, title")
    .eq("user_id", userId)
    .maybeSingle();

  const raw = profile.schools as { name: string } | Array<{ name: string }> | null | undefined;
  const school = Array.isArray(raw) ? raw[0] : raw;
  let schoolName =
    school && typeof school === "object" && typeof school.name === "string"
      ? school.name
      : null;
  if (!schoolName && profile.school_id) {
    const { data: schoolRow } = await supabase
      .from("schools")
      .select("name")
      .eq("id", profile.school_id)
      .single();
    schoolName = schoolRow?.name?.trim() ?? null;
  }

  return NextResponse.json({
    user_id: profile.id,
    username: profile.username ?? null,
    school_id: profile.school_id ?? null,
    school_name: schoolName,
    avatar_url: profile.avatar_url ?? null,
    market_value: rating?.market_value ?? 60_000,
    title: rating?.title ?? "Intern",
  });
}
