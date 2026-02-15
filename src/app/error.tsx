"use client";

import { useEffect } from "react";
import { SUPABASE_CONFIG_ERROR_CODE } from "@/lib/supabase/errors";

const SUPABASE_ENV_HINT = (
  <>
    <p className="max-w-md text-sm text-stone-600">
      For Arena login and auth to work, set these in your deployment:
    </p>
    <ul className="mt-2 max-w-md list-inside list-disc text-left text-sm text-stone-600">
      <li>
        <strong>NEXT_PUBLIC_SUPABASE_URL</strong> — your Supabase project URL
      </li>
      <li>
        <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong> — your Supabase anon/public key
      </li>
      <li>
        <strong>SUPABASE_SERVICE_ROLE_KEY</strong> — for profile upsert (server-only)
      </li>
    </ul>
    <p className="mt-3 max-w-md text-xs text-stone-500">
      Vercel: Project → Settings → Environment Variables → add each, then redeploy.
    </p>
  </>
);

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; code?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  const code = "code" in error ? (error as { code?: string }).code : undefined;
  const message = typeof error.message === "string" ? error.message : "";
  const isConfigMissing =
    code === SUPABASE_CONFIG_ERROR_CODE ||
    message.includes("Missing Supabase") ||
    message.includes("SUPABASE_CONFIG");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-xl font-bold text-red-600">Something went wrong</h1>
      {isConfigMissing ? (
        <>
          <p className="max-w-md text-sm text-stone-600">
            Supabase is not configured for this environment.
          </p>
          {SUPABASE_ENV_HINT}
        </>
      ) : (
        <>
          <p className="max-w-md text-sm text-stone-600">
            {message || "An unexpected error occurred."}
          </p>
          <p className="mt-2 max-w-md text-sm font-medium text-stone-600">
            If this happens on Arena or login, it’s usually missing env vars:
          </p>
          {SUPABASE_ENV_HINT}
        </>
      )}
      {error.digest && !isConfigMissing && (
        <p className="text-xs text-stone-400">Digest: {error.digest}</p>
      )}
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
