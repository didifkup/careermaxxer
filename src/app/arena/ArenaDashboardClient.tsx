"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    <Button
      size="lg"
      onClick={handleEnterRanked}
      disabled={loading}
      className="w-full sm:w-auto"
    >
      {loading ? "Starting…" : "Enter Ranked Sprint"}
    </Button>
  );
}
