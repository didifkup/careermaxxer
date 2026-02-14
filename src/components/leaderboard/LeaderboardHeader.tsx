"use client";

import { useState, useEffect } from "react";

const REFRESH_INTERVAL_SEC = 6 * 3600;

function formatCountdown(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
}

export function LeaderboardHeader({
  tab,
}: {
  tab: "global" | "school";
}) {
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL_SEC);

  useEffect(() => {
    setSecondsLeft(REFRESH_INTERVAL_SEC);
    const t = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : REFRESH_INTERVAL_SEC));
    }, 1000);
    return () => clearInterval(t);
  }, [tab]);

  const subheader =
    tab === "global"
      ? "Climb the global ladder. Every sprint changes rank."
      : "Be the #1 at your school. Flex it.";

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-primary">
          Leaderboards
        </h1>
        <p className="mt-1 text-sm text-text-secondary">{subheader}</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="font-medium text-text-primary">Live Rankings</span>
        <span className="tabular-nums text-text-secondary">
          Next refresh in: {formatCountdown(secondsLeft)}
        </span>
      </div>
    </div>
  );
}
