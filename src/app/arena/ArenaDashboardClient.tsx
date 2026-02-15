"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function ArenaDashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/arena/ping", { method: "GET" }).catch(() => {});
  }, []);

  async function handleEnterRanked() {
    setLoading(true);
    try {
      const res = await fetch("/api/arena/ranked/start", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to start run");
      }
      const { runId, started_at, run, first_question } = await res.json();
      if (runId && (run != null || first_question != null)) {
        try {
          sessionStorage.setItem(
            `arena_run_${runId}`,
            JSON.stringify({ run, started_at, first_question })
          );
        } catch {
          // ignore sessionStorage errors
        }
      }
      const q = started_at ? `?started=${encodeURIComponent(started_at)}` : "";
      router.push(`/arena/ranked/${runId}${q}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleEnterRanked}
      disabled={loading}
      className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98] disabled:opacity-60 sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
    >
      {loading ? "Starting…" : "Enter Ranked Sprint"}
    </button>
  );
}
