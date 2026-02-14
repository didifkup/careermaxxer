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
      className="rounded-xl border border-black/8 bg-surface-raised/80 px-4 py-3 shadow-sm"
      aria-label="Ranking summary"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <div className="flex items-baseline gap-2">
          <span className="text-text-secondary">Global Rank</span>
          <span className="font-semibold tabular-nums text-text-primary">
            {userId == null ? "—" : globalRank != null ? `#${globalRank}` : "Unranked"}
          </span>
        </div>
        <div className="h-4 w-px bg-black/10" aria-hidden />
        <div className="flex items-baseline gap-2">
          <span className="text-text-secondary">School Rank</span>
          {schoolSet === false ? (
            <Link
              href="/account"
              className="font-medium text-brand-primary hover:underline"
            >
              Set school
            </Link>
          ) : (
            <span className="font-semibold tabular-nums text-text-primary">
              {userId == null ? "—" : schoolRank != null ? `#${schoolRank}` : "Unranked"}
            </span>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-text-secondary">
        <Link href="/leaderboard" className="hover:underline">
          View leaderboards →
        </Link>
      </p>
    </div>
  );
}
