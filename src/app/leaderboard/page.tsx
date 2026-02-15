"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LeaderboardHeader } from "@/components/leaderboard/LeaderboardHeader";
import { YourStatusCard } from "@/components/leaderboard/YourStatusCard";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { PageContainer } from "@/components/ui/page-container";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { GlassCard } from "@/components/ui/glass-card";

type LeaderboardRow = {
  rank: number;
  user_id: string;
  username: string;
  school_name: string | null;
  title: string;
  market_value: number;
  peak_market_value: number;
};

type Profile = {
  user_id: string;
  username: string | null;
  school_id: string | null;
  market_value: number;
  title: string;
};

const SEGMENT_OPTIONS = [
  { value: "global" as const, label: "Global" },
  { value: "school" as const, label: "School" },
];

function LeaderboardSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="h-14 animate-pulse rounded-xl border border-slate-200/80 bg-white/60"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"global" | "school">("global");
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [globalData, setGlobalData] = useState<LeaderboardRow[]>([]);
  const [schoolData, setSchoolData] = useState<LeaderboardRow[] | null>(null);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [schoolLoading, setSchoolLoading] = useState(false);
  const [schoolError, setSchoolError] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const profileRes = await fetch("/api/profile");
      if (cancelled) return;
      if (!profileRes.ok) {
        setAuthError(true);
        setGlobalLoading(false);
        return;
      }
      const data = await profileRes.json();
      setUserId(data.user_id ?? null);
      setProfile({
        user_id: data.user_id,
        username: data.username ?? null,
        school_id: data.school_id ?? null,
        market_value: data.market_value ?? 60_000,
        title: data.title ?? "Intern",
      });

      const globalRes = await fetch("/api/leaderboards/global");
      if (cancelled) return;
      setGlobalLoading(false);
      if (globalRes.ok) {
        const list = await globalRes.json();
        setGlobalData(Array.isArray(list) ? list : []);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (tab !== "school") return;
    if (schoolData !== null || schoolError !== null) return;
    let cancelled = false;
    setSchoolLoading(true);
    setSchoolError(null);
    fetch("/api/leaderboards/school")
      .then((res) => {
        if (cancelled) return res;
        if (res.status === 400) {
          return res.json().then((d) => {
            setSchoolError(d?.error ?? "Set your school to view rankings");
            setSchoolData([]);
            return res;
          });
        }
        return res.json().then((data) => {
          setSchoolData(Array.isArray(data) ? data : []);
          return res;
        });
      })
      .catch(() => {
        if (!cancelled) setSchoolError("Failed to load");
      })
      .finally(() => {
        if (!cancelled) setSchoolLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, schoolData, schoolError]);

  if (authError) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <h1 className="font-display text-3xl font-semibold text-slate-800">
            Leaderboards
          </h1>
          <p className="text-slate-600">
            <Link
              href="/login"
              className="text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 rounded"
            >
              Sign in
            </Link>{" "}
            to view leaderboards.
          </p>
        </div>
      </PageContainer>
    );
  }

  const rows = tab === "global" ? globalData : schoolData ?? [];
  const loading = tab === "global" ? globalLoading : schoolLoading;
  const schoolSet = tab === "school" && schoolError === null;
  const myRow = userId ? rows.find((r) => r.user_id === userId) : null;
  const schoolRank = tab === "school" ? myRow?.rank : null;
  const schoolName = myRow?.school_name ?? (tab === "school" ? rows[0]?.school_name : null);
  const headerSubtitle =
    tab === "school" && schoolRank != null && schoolName
      ? `You're #${schoolRank} at ${schoolName}`
      : undefined;

  return (
    <PageContainer>
      <div className="space-y-8">
        <LeaderboardHeader tab={tab} subtitle={headerSubtitle} />

        <SegmentedToggle
          options={SEGMENT_OPTIONS}
          value={tab}
          onChange={setTab}
          aria-label="Leaderboard type"
        />

        {userId && (
          <YourStatusCard
            userId={userId}
            profile={profile}
            rows={rows}
            tab={tab}
            schoolSet={schoolSet}
          />
        )}

        {loading ? (
          <GlassCard className="p-6">
            <p className="mb-4 text-sm text-slate-500">Loading rankings…</p>
            <LeaderboardSkeleton />
          </GlassCard>
        ) : (
          <LeaderboardTable rows={rows} userId={userId} />
        )}

        <GlassCard className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          <p className="text-lg font-semibold text-slate-800">Ready to climb?</p>
          <div className="flex items-center gap-3">
            <Link
              href="/arena"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
            >
              Go to Arena →
            </Link>
            <Link
              href="/arena"
              className="text-sm text-slate-500 hover:text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 rounded"
            >
              Back to Arena
            </Link>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
