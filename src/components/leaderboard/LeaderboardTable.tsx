"use client";

import { TierPill } from "./TierPill";
import { SchoolBadge } from "./SchoolBadge";
import { formatMoney } from "@/lib/arena/ladder";
import type { LeaderboardRow } from "./YourStatusCard";

export function LeaderboardTable({
  rows,
  userId,
}: {
  rows: LeaderboardRow[];
  userId: string | null;
}) {
  const rankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-amber-500" aria-hidden>🥇</span>;
    if (rank === 2) return <span className="text-slate-400" aria-hidden>🥈</span>;
    if (rank === 3) return <span className="text-amber-700" aria-hidden>🥉</span>;
    return null;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-surface-raised shadow-sm">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-black/[0.03]">
              <th className="px-4 py-3 font-semibold text-text-primary">Rank</th>
              <th className="px-4 py-3 font-semibold text-text-primary">User</th>
              <th className="px-4 py-3 font-semibold text-text-primary">School</th>
              <th className="px-4 py-3 font-semibold text-text-primary">Title</th>
              <th className="px-4 py-3 font-semibold text-text-primary">Market Value</th>
              <th className="px-4 py-3 font-semibold text-text-secondary">Peak</th>
              <th className="px-4 py-3 font-semibold text-text-secondary">Δ</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-text-secondary">
                  No rankings yet.
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const isTop3 = row.rank >= 1 && row.rank <= 3;
              const isYou = userId !== null && row.user_id === userId;
              const glowClass =
                row.rank === 1
                  ? "shadow-[0_0_14px_rgba(234,179,8,0.22)] ring-1 ring-amber-400/25"
                  : row.rank === 2
                    ? "shadow-[0_0_12px_rgba(148,163,184,0.25)] ring-1 ring-slate-300/20"
                    : row.rank === 3
                      ? "shadow-[0_0_10px_rgba(180,83,9,0.18)] ring-1 ring-amber-700/20"
                      : "";
              return (
                <tr
                  key={row.user_id}
                  className={`border-b border-black/5 transition-colors duration-200 ${
                    isYou
                      ? "bg-brand-primary/10 ring-1 ring-brand-primary/20"
                      : "hover:bg-black/[0.03]"
                  } ${isTop3 ? glowClass : ""}`}
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 font-medium text-text-primary">
                      {rankIcon(row.rank)}
                      #{row.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-text-primary">
                      @{row.username}
                    </span>
                    {isYou && (
                      <span className="ml-1.5 rounded bg-brand-primary/20 px-1.5 py-0.5 text-xs font-bold text-brand-primary">
                        YOU
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <SchoolBadge name={row.school_name} size="md" />
                  </td>
                  <td className="px-4 py-3">
                    <TierPill title={row.title} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-accent">
                    {formatMoney(row.market_value)}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatMoney(row.peak_market_value)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-text-secondary">
                    —
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list: SCHOOL prominent */}
      <div className="block border-t border-black/10 md:hidden">
        {rows.length === 0 && (
          <div className="px-4 py-8 text-center text-text-secondary">
            No rankings yet.
          </div>
        )}
        {rows.map((row) => {
          const isYou = userId !== null && row.user_id === userId;
          return (
            <div
              key={row.user_id}
              className={`border-b border-black/5 px-4 py-4 last:border-b-0 ${
                isYou ? "bg-brand-primary/10" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-text-primary">#{row.rank}</span>
                <span className="font-semibold text-text-primary">@{row.username}</span>
                {isYou && (
                  <span className="rounded bg-brand-primary/20 px-1.5 py-0.5 text-xs font-bold text-brand-primary">
                    YOU
                  </span>
                )}
                <TierPill title={row.title} />
              </div>
              <div className="mt-2">
                <SchoolBadge name={row.school_name} size="sm" />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-brand-accent">
                  {formatMoney(row.market_value)}
                </span>
                <span className="text-text-secondary">Δ —</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
