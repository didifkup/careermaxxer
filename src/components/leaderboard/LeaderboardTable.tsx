"use client";

import { TierPill } from "./TierPill";
import { SchoolBadge } from "./SchoolBadge";
import { formatMoney } from "@/lib/arena/ladder";
import type { LeaderboardRow } from "./YourStatusCard";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

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

  const rowBase =
    "border-b border-slate-100 transition-colors duration-200 last:border-b-0";
  const top1Row =
    "bg-amber-50/50 shadow-[0_0_14px_rgba(234,179,8,0.12)] ring-1 ring-amber-300/30";
  const top2Row =
    "bg-slate-50/80 shadow-[0_0_12px_rgba(148,163,184,0.15)] ring-1 ring-slate-200/40";
  const top3Row =
    "bg-amber-50/30 shadow-[0_0_10px_rgba(180,83,9,0.10)] ring-1 ring-amber-600/20";
  const youRow =
    "bg-amber-50/40 ring-1 ring-amber-200/50";

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm" role="table">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-4 py-3 font-semibold text-slate-700">Rank</th>
              <th className="px-4 py-3 font-semibold text-slate-700">User</th>
              <th className="px-4 py-3 font-semibold text-slate-700">School</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Market Value</th>
              <th className="px-4 py-3 font-semibold text-slate-500">Peak</th>
              <th className="px-4 py-3 font-semibold text-slate-500">Δ</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  No rankings yet.
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const isTop3 = row.rank >= 1 && row.rank <= 3;
              const isYou = userId !== null && row.user_id === userId;
              const topClass =
                row.rank === 1 ? top1Row : row.rank === 2 ? top2Row : row.rank === 3 ? top3Row : "";
              return (
                <tr
                  key={row.user_id}
                  className={cn(
                    rowBase,
                    isYou && youRow,
                    isTop3 && topClass,
                    !isYou && !isTop3 && "hover:bg-slate-50/50"
                  )}
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 font-medium text-slate-800">
                      {rankIcon(row.rank)}
                      #{row.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-800">
                      @{row.username}
                    </span>
                    {isYou && (
                      <span
                        className="ml-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800"
                        aria-label="Your row"
                      >
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
                  <td className="px-4 py-3 font-semibold text-blue-600 tabular-nums">
                    {formatMoney(row.market_value)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-slate-600">
                    {formatMoney(row.peak_market_value)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-slate-500">—</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="block border-t border-slate-100 md:hidden">
        {rows.length === 0 && (
          <div className="px-4 py-12 text-center text-slate-500">
            No rankings yet.
          </div>
        )}
        {rows.map((row) => {
          const isYou = userId !== null && row.user_id === userId;
          const isTop3 = row.rank >= 1 && row.rank <= 3;
          return (
            <div
              key={row.user_id}
              className={cn(
                "border-b border-slate-100 px-4 py-4 last:border-b-0 transition-colors",
                isYou && "bg-amber-50/50",
                isTop3 && "bg-slate-50/50"
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-800">#{row.rank}</span>
                <span className="font-semibold text-slate-800">
                  @{row.username}
                </span>
                {isYou && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                    YOU
                  </span>
                )}
                <TierPill title={row.title} />
              </div>
              <div className="mt-2">
                <SchoolBadge name={row.school_name} size="sm" />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-blue-600 tabular-nums">
                  {formatMoney(row.market_value)}
                </span>
                <span className="text-slate-500">Δ —</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
