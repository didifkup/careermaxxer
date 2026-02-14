import { NextRequest, NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createClient } from "@/lib/supabase/server";
import { validateUsername } from "@/lib/profile/validate";

export async function POST(request: NextRequest) {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;
  const { userId } = auth;

  let body: { username?: unknown; school_id?: unknown; avatar_url?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const updates: {
    username?: string | null;
    school_id?: string | null;
    avatar_url?: string | null;
  } = {};

  if (body.username !== undefined) {
    if (body.username === null || body.username === "") {
      updates.username = null;
    } else {
      const result = validateUsername(body.username);
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      updates.username = result.username;
    }
  }

  if (body.school_id !== undefined) {
    if (body.school_id === null || body.school_id === "") {
      updates.school_id = null;
    } else {
      const schoolId = String(body.school_id).trim();
      if (!schoolId) {
        updates.school_id = null;
      } else {
        const supabase = await createClient();
        const { data: school } = await supabase
          .from("schools")
          .select("id")
          .eq("id", schoolId)
          .eq("is_active", true)
          .maybeSingle();
        if (!school) {
          return NextResponse.json({ error: "Invalid school_id" }, { status: 400 });
        }
        updates.school_id = schoolId;
      }
    }
  }

  if (body.avatar_url !== undefined) {
    updates.avatar_url = body.avatar_url === null || body.avatar_url === "" ? null : String(body.avatar_url).trim();
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Username already taken", code: "USERNAME_TAKEN" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
