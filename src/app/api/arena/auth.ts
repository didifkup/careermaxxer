import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Returns the authenticated user or a 401 JSON response.
 * Use in API route handlers: const res = await getAuthOr401(); if (res) return res;
 */
export async function getAuthOr401(): Promise<{ userId: string } | NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return { userId: user.id };
}
