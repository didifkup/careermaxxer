"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LeaderboardRow = {
  rank: number;
  user_id: string;
  username: string;
  school_name: string | null;
  title: string;
  market_value: number;
  peak_market_value: number;
};

export function ArenaPrestigePanel() {
  const [globalRank, setGlobalRank] = useState<number | null>(null);
  const [schoolRank, setSchoolRank] = useState<number | null>(null);
  const [schoolSet, setSchoolSet] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const profileRes = await fetch("/api/profile").catch(() => null);
      if (cancelled) return;
      const profile = profileRes?.ok ? await profileRes.json().catch(() => null) : null;
      const uid = profile?.user_id ?? null;
      setUserId(uid);

      const [globalRes, schoolRes] = await Promise.all([
        fetch("/api/leaderboards/global").catch(() => null),
        uid ? fetch("/api/leaderboards/school").catch(() => null) : null,
      ]);

      if (cancelled) return;

      if (globalRes?.ok) {
        const data = await globalRes.json().catch(() => []);
        const rows = Array.isArray(data) ? data : [];
        const row = rows.find((r: LeaderboardRow) => r.user_id === uid);
        setGlobalRank(row ? row.rank : null);
      }

      if (schoolRes) {
        if (schoolRes.status === 400) {
          setSchoolSet(false);
          setSchoolRank(null);
        } else if (schoolRes.ok) {
          setSchoolSet(true);
          const data = await schoolRes.json().catch(() => []);
          const rows = Array.isArray(data) ? data : [];
          const row = rows.find((r: LeaderboardRow) => r.user_id === uid);
          setSchoolRank(row ? row.rank : null);
        }
      } else {
        setSchoolSet(null);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="rounded-2xl border border-blue-100/70 bg-white/75 px-4 py-3 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur-xl"
      aria-label="Ranking summary"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <div className="flex items-baseline gap-2">
          <span className="text-slate-500">Global Rank</span>
          <span className="font-semibold tabular-nums text-slate-800">
            {userId == null ? "—" : globalRank != null ? `#${globalRank}` : "Unranked"}
          </span>
        </div>
        <div className="h-4 w-px bg-slate-200" aria-hidden />
        <div className="flex items-baseline gap-2">
          <span className="text-slate-500">School Rank</span>
          {schoolSet === false ? (
            <Link
              href="/account"
              className="font-medium text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 rounded"
            >
              Set school
            </Link>
          ) : (
            <span className="font-semibold tabular-nums text-slate-800">
              {userId == null ? "—" : schoolRank != null ? `#${schoolRank}` : "Unranked"}
            </span>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-slate-500">
        <Link
          href="/leaderboard"
          className="text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 rounded"
        >
          View leaderboards →
        </Link>
      </p>
    </div>
  );
}
