"use client";

import { useEffect } from "react";
import { SUPABASE_CONFIG_ERROR_CODE } from "@/lib/supabase/errors";

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

  const isConfigMissing =
    "code" in error && (error as { code?: string }).code === SUPABASE_CONFIG_ERROR_CODE;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-xl font-bold text-red-600">Something went wrong</h1>
      {isConfigMissing ? (
        <p className="max-w-md text-sm text-stone-600">
          Database is not configured. Add{" "}
          <strong>NEXT_PUBLIC_SUPABASE_URL</strong> and{" "}
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong> in your deployment
          environment (e.g. Vercel: Project Settings → Environment Variables),
          then redeploy.
        </p>
      ) : (
        <>
          <p className="max-w-md text-sm text-stone-600">
            {error.message || "An unexpected error occurred."}
          </p>
          <p className="max-w-md text-xs text-stone-500">
            If you run this site, ensure environment variables (e.g. Supabase) are set in your deployment (e.g. Vercel → Settings → Environment Variables).
          </p>
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
