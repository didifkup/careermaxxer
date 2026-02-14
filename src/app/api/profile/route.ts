import { NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;

  const supabase = await createClient();

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("id, username, school_id, avatar_url")
    .eq("id", userId)
    .single();

  if (profileErr || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { data: rating } = await supabase
    .from("ratings")
    .select("market_value, title")
    .eq("user_id", userId)
    .maybeSingle();

  return NextResponse.json({
    user_id: profile.id,
    username: profile.username ?? null,
    school_id: profile.school_id ?? null,
    avatar_url: profile.avatar_url ?? null,
    market_value: rating?.market_value ?? 60_000,
    title: rating?.title ?? "Intern",
  });
}
