import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { SUPABASE_CONFIG_ERROR_CODE } from "./errors";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getServerEnvError(requireServiceRole = false): string {
  const missing: string[] = [];
  if (!supabaseUrl?.trim()) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseAnonKey?.trim()) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (requireServiceRole && !supabaseServiceRoleKey?.trim())
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (missing.length === 0) return "";
  return `Missing Supabase env: ${missing.join(", ")}. Add them to .env.local. See https://supabase.com/dashboard/project/_/settings/api`;
}

function createConfigError(message: string): Error & { code: string } {
  const err = new Error(message) as Error & { code: string };
  err.code = SUPABASE_CONFIG_ERROR_CODE;
  return err;
}

/**
 * Request-scoped Supabase client for Server Components, Server Actions, and Route Handlers.
 * Uses cookie-based session. Do not use for admin operations (use createServiceRoleClient instead).
 */
export async function createClient() {
  const errMsg = getServerEnvError(false);
  if (errMsg) throw createConfigError(errMsg);

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll from Server Component — ignore; middleware can refresh session
        }
      },
    },
  });
}

/**
 * Service role client for server-only admin operations (e.g. profile upsert).
 * Only use in server code (route handlers, server actions). Never expose to the client.
 */
export function createServiceRoleClient() {
  const errMsg = getServerEnvError(true);
  if (errMsg) throw createConfigError(errMsg);

  return createSupabaseClient(supabaseUrl!, supabaseServiceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type ProfileRow = {
  id: string;
  email: string | null;
  created_at: string;
};

/**
 * Upsert a profile row for the given auth user. Call after first login.
 * Uses service role so it works regardless of RLS.
 */
export async function upsertProfileForUser(
  id: string,
  email: string | null
): Promise<void> {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      id,
      email: email ?? null,
      created_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
  if (error) throw new Error(`Failed to upsert profile: ${error.message}`);
}
