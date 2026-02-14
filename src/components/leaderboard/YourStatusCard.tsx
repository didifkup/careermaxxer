"use client";

import Link from "next/link";
import { TierPill } from "./TierPill";
import { SchoolBadge } from "./SchoolBadge";
import { formatMoney } from "@/lib/arena/ladder";

export type LeaderboardRow = {
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

function formatDollars(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

export function YourStatusCard({
  userId,
  profile,
  rows,
  tab,
  schoolSet,
}: {
  userId: string | null;
  profile: Profile | null;
  rows: LeaderboardRow[];
  tab: "global" | "school";
  schoolSet: boolean | null;
}) {
  const myRow = userId ? rows.find((r) => r.user_id === userId) : null;
  const myIndex = myRow ? rows.findIndex((r) => r.user_id === userId) : -1;
  const above = myIndex > 0 ? rows[myIndex - 1]! : null;
  const below = myIndex >= 0 && myIndex < rows.length - 1 ? rows[myIndex + 1]! : null;

  const marketValue = myRow?.market_value ?? profile?.market_value ?? 0;
  const awayFromAbove = above ? Math.max(0, above.market_value - marketValue) : 0;
  const aheadOfBelow = below ? Math.max(0, marketValue - below.market_value) : 0;
  const gapTotal = awayFromAbove + aheadOfBelow;
  const progressToNext = gapTotal > 0 ? aheadOfBelow / gapTotal : 1;

  if (!userId) return null;

  const displayUsername = myRow?.username ?? profile?.username;
  const displaySchoolName = myRow?.school_name ?? (profile?.school_id ? "Your school" : null);
  const displayTitle = myRow?.title ?? profile?.title ?? "Intern";
  const globalRank = tab === "global" ? myRow?.rank ?? null : null;
  const schoolRank = tab === "school" ? myRow?.rank ?? null : null;
  const showProgress = (above || below) && myRow;

  if (tab === "school" && !schoolSet) {
    return (
      <div className="rounded-xl border-2 border-amber-200 bg-amber-50/80 p-6">
        <p className="font-semibold text-amber-900">Set your school to compete</p>
        <p className="mt-1 text-sm text-amber-800">
          <Link href="/account" className="font-medium underline hover:no-underline">
            Go to Account
          </Link>{" "}
          to set your school and see your rank.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-brand-primary/20 bg-surface-raised p-6 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
            You
          </p>
          <p className="mt-0.5 font-bold text-text-primary">
            {displayUsername ? `@${displayUsername}` : (
              <Link href="/account" className="text-brand-primary hover:underline">
                Set username
              </Link>
            )}
          </p>
          <div className="mt-2">
            <SchoolBadge name={displaySchoolName} size="md" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {globalRank != null && (
            <div>
              <p className="text-xs text-text-secondary">Global Rank</p>
              <p className="font-bold tabular-nums text-text-primary">#{globalRank}</p>
            </div>
          )}
          {schoolRank != null && (
            <div>
              <p className="text-xs text-text-secondary">School Rank</p>
              <p className="font-bold tabular-nums text-text-primary">#{schoolRank}</p>
            </div>
          )}
          <TierPill title={displayTitle} />
        </div>

        <div className="min-w-[180px]">
          {showProgress && above && (
            <p className="text-xs text-text-secondary">
              {formatDollars(awayFromAbove)} away from #{above.rank}
            </p>
          )}
          {showProgress && below && (
            <p className="mt-0.5 text-xs text-text-secondary">
              {formatDollars(aheadOfBelow)} ahead of #{below.rank}
            </p>
          )}
          {showProgress && (above || below) && (
            <div
              className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/10"
              role="progressbar"
              aria-valuenow={progressToNext * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-brand-accent transition-all duration-300"
                style={{ width: `${progressToNext * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
