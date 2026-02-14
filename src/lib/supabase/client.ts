import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getEnvError(): string {
  const missing: string[] = [];
  if (!supabaseUrl?.trim()) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseAnonKey?.trim()) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (missing.length === 0) return "";
  return `Missing Supabase env: ${missing.join(", ")}. Add them to .env.local. See https://supabase.com/dashboard/project/_/settings/api`;
}

export function createClient() {
  const err = getEnvError();
  if (err) {
    throw new Error(err);
  }
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
