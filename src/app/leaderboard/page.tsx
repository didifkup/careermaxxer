"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LeaderboardHeader } from "@/components/leaderboard/LeaderboardHeader";
import { YourStatusCard } from "@/components/leaderboard/YourStatusCard";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { Button } from "@/components/ui/button";

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
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <h1 className="font-display text-2xl font-bold text-brand-primary">
          Leaderboards
        </h1>
        <p className="text-text-secondary">
          <Link href="/login" className="text-brand-primary hover:underline">
            Sign in
          </Link>{" "}
          to view leaderboards.
        </p>
      </div>
    );
  }

  const rows = tab === "global" ? globalData : (schoolData ?? []);
  const loading = tab === "global" ? globalLoading : schoolLoading;
  const schoolSet = tab === "school" && schoolError === null;

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-8">
      <LeaderboardHeader tab={tab} />

      <div
        className="flex gap-1 rounded-full bg-black/5 p-1"
        role="tablist"
        aria-label="Leaderboard type"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "global"}
          onClick={() => setTab("global")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            tab === "global"
              ? "bg-white text-brand-primary shadow-card"
              : "text-text-secondary hover:bg-white/60 hover:text-text-primary"
          }`}
        >
          Global
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "school"}
          onClick={() => setTab("school")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            tab === "school"
              ? "bg-white text-brand-primary shadow-card"
              : "text-text-secondary hover:bg-white/60 hover:text-text-primary"
          }`}
        >
          School
        </button>
      </div>

      {userId && (
        <YourStatusCard
          userId={userId}
          profile={profile}
          rows={rows}
          tab={tab}
          schoolSet={tab === "school" ? !schoolError : null}
        />
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-text-secondary">
          <span
            className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-brand-primary border-t-transparent"
            aria-hidden
          />
          Loading…
        </div>
      ) : (
        <LeaderboardTable rows={rows} userId={userId} />
      )}

      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-black/10 bg-surface-raised px-6 py-5 sm:flex-row">
        <p className="text-lg font-semibold text-text-primary">Ready to climb?</p>
        <div className="flex items-center gap-3">
          <Button asChild size="lg">
            <Link href="/arena">Go to Arena →</Link>
          </Button>
          <Link
            href="/arena"
            className="text-sm text-text-secondary hover:text-brand-primary hover:underline"
          >
            Back to Arena
          </Link>
        </div>
      </div>
    </div>
  );
}
