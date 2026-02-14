import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim().toLowerCase();

/**
 * Returns the authenticated admin user email or an error response.
 * Use in admin API routes: const res = await requireAdmin(); if (res.error) return res.error;
 */
export async function requireAdmin(): Promise<
  | { email: string }
  | { error: NextResponse }
> {
  if (!ADMIN_EMAIL) {
    return {
      error: NextResponse.json(
        { error: "Admin import not configured (ADMIN_EMAIL)" },
        { status: 503 }
      ),
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const userEmail = user.email?.trim().toLowerCase();
  if (userEmail !== ADMIN_EMAIL) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { email: user.email! };
}
