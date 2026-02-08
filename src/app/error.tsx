"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-xl font-bold text-red-600">Something went wrong</h1>
      <p className="max-w-md text-sm text-stone-600">
        {error.message}
      </p>
      {error.digest && (
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
