"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/ui/section-header";

const REFRESH_INTERVAL_SEC = 6 * 3600;

function formatCountdown(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

export function LeaderboardHeader({
  tab,
  subtitle,
}: {
  tab: "global" | "school";
  subtitle?: string;
}) {
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL_SEC);

  useEffect(() => {
    setSecondsLeft(REFRESH_INTERVAL_SEC);
    const t = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : REFRESH_INTERVAL_SEC));
    }, 1000);
    return () => clearInterval(t);
  }, [tab]);

  const defaultSubheader =
    tab === "global"
      ? "Climb the global ladder. Every sprint changes rank."
      : "Be the #1 at your school. Flex it.";

  return (
    <SectionHeader
      title="Leaderboards"
      subtitle={subtitle ?? defaultSubheader}
      rightSlot={
        <>
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-medium text-slate-700">Live</span>
          <span className="tabular-nums text-slate-500">
            Refresh: {formatCountdown(secondsLeft)}
          </span>
        </>
      }
    />
  );
}
