"use client";

import { useEffect, useRef, useState } from "react";
import { formatSalary } from "@/lib/format";
import { cn } from "@/lib/utils";

export type MascotStage = "pup" | "cub" | "young" | "alpha";

const STAGE_LABELS: Record<MascotStage, string> = {
  pup: "Pup",
  cub: "Cub",
  young: "Young Wolf",
  alpha: "Alpha",
};

/** Stage from level (1–13): 1–3 Pup, 4–6 Cub, 7–10 Young Wolf, 11–13 Alpha. */
export function getStageFromLevel(level: number, _maxLevel?: number): MascotStage {
  if (level <= 3) return "pup";
  if (level <= 6) return "cub";
  if (level <= 10) return "young";
  return "alpha";
}

export type AccessoryDef = {
  id: string;
  label: string;
  tooltip: string;
  unlockedAt: number;
  /** Render SVG/HTML for overlay; positioned in mascot container. */
  render: (stage: MascotStage) => React.ReactNode;
};

const ACCESSORIES: AccessoryDef[] = [
  {
    id: "analyst",
    label: "Analyst Badge",
    tooltip: "ANL — You're in the game.",
    unlockedAt: 2,
    render: () => (
      <span
        className="absolute right-[12%] top-[8%] rounded bg-slate-700 px-1 py-0.5 text-[8px] font-bold text-white"
        aria-label="Analyst badge"
      >
        ANL
      </span>
    ),
  },
  {
    id: "tie",
    label: "Tie",
    tooltip: "Dress for the desk.",
    unlockedAt: 4,
    render: () => (
      <span
        className="absolute bottom-[24%] left-1/2 h-6 w-1 -translate-x-1/2 bg-slate-600"
        aria-label="Tie"
      />
    ),
  },
  {
    id: "headset",
    label: "Headset",
    tooltip: "Always on the call.",
    unlockedAt: 6,
    render: () => (
      <span
        className="absolute left-[8%] top-[20%] flex h-4 w-3 items-end justify-center rounded-sm border border-slate-500 bg-slate-100 px-0.5 pt-0.5"
        aria-label="Headset"
      >
        <span className="h-1.5 w-1 rounded-full bg-slate-500" />
      </span>
    ),
  },
  {
    id: "lapel",
    label: "Suit Lapel",
    tooltip: "Sharp look.",
    unlockedAt: 8,
    render: () => (
      <>
        <span className="absolute bottom-[38%] left-[24%] h-6 w-px rotate-[-15deg] bg-slate-400/90" aria-hidden />
        <span className="absolute bottom-[38%] right-[24%] h-6 w-px rotate-[15deg] bg-slate-400/90" aria-hidden />
      </>
    ),
  },
  {
    id: "tombstone",
    label: "Deal Tombstone",
    tooltip: "Closed.",
    unlockedAt: 10,
    render: () => (
      <span
        className="absolute right-[8%] bottom-[25%] flex h-5 w-4 items-center justify-center rounded border border-slate-400 bg-white text-[7px] font-bold text-slate-700"
        aria-label="Deal tombstone"
      >
        M&A
      </span>
    ),
  },
  {
    id: "starpin",
    label: "Top Bucket Star",
    tooltip: "Top bucket.",
    unlockedAt: 11,
    render: () => (
      <span
        className="absolute right-[18%] top-[15%] text-[10px] text-amber-500"
        aria-label="Star pin"
      >
        ★
      </span>
    ),
  },
  {
    id: "vp",
    label: "VP Crest",
    tooltip: "VP energy.",
    unlockedAt: 12,
    render: () => (
      <span
        className="absolute left-[12%] top-[8%] rounded bg-blue-800 px-1 py-0.5 text-[8px] font-bold text-white"
        aria-label="VP crest"
      >
        VP
      </span>
    ),
  },
  {
    id: "md",
    label: "MD Ring",
    tooltip: "Managing Director.",
    unlockedAt: 13,
    render: () => (
      <span
        className="absolute bottom-[15%] left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-amber-600/80 bg-amber-50/90 text-[7px] font-bold text-amber-800"
        aria-label="MD ring"
      >
        MD
      </span>
    ),
  },
];

function getAccessories(level: number): AccessoryDef[] {
  return ACCESSORIES.filter((a) => level >= a.unlockedAt);
}

function getNextUnlock(level: number): { label: string; at: number } | null {
  const next = ACCESSORIES.find((a) => a.unlockedAt > level);
  return next ? { label: next.label, at: next.unlockedAt } : null;
}

// -----------------------------------------------------------------------------
// Wolf SVG (minimal, stage variants)
// -----------------------------------------------------------------------------

function WolfHeadSvg({ stage, size }: { stage: MascotStage; size: number }) {
  const viewBox = "0 0 120 120";
  const isPup = stage === "pup";
  const isAlpha = stage === "alpha";
  const rx = isPup ? 46 : isAlpha ? 40 : 44;
  const ry = isPup ? 44 : isAlpha ? 38 : 42;
  const earRy = isPup ? 20 : isAlpha ? 16 : 18;
  const fill = isAlpha ? "hsl(0 0% 68%)" : isPup ? "hsl(0 0% 82%)" : "hsl(0 0% 75%)";
  const stroke = "hsl(0 0% 48%)";

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300"
      aria-hidden
    >
      <defs>
        <linearGradient id="wolf-head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={fill} stopOpacity={1} />
          <stop offset="100%" stopColor={fill} stopOpacity={0.92} />
        </linearGradient>
      </defs>
      {/* Head */}
      <ellipse cx="60" cy={62} rx={rx} ry={ry} fill="url(#wolf-head-grad)" stroke={stroke} strokeWidth={2} />
      {/* Ears */}
      <ellipse cx="28" cy="32" rx="14" ry={earRy} fill={fill} stroke={stroke} strokeWidth={2} />
      <ellipse cx="92" cy="32" rx="14" ry={earRy} fill={fill} stroke={stroke} strokeWidth={2} />
      {isPup && (
        <>
          <ellipse cx="30" cy="36" rx="6" ry="8" fill="hsl(0 0% 68%)" />
          <ellipse cx="90" cy="36" rx="6" ry="8" fill="hsl(0 0% 68%)" />
        </>
      )}
      {/* Snout */}
      <ellipse cx="60" cy="82" rx="18" ry="14" fill="hsl(0 0% 90%)" stroke={stroke} strokeWidth={1.5} />
      <ellipse cx="60" cy="76" rx="6" ry="5" fill="hsl(0 0% 14%)" />
      {/* Eyes */}
      <ellipse cx="44" cy="54" rx={isAlpha ? 10 : 8} ry="10" fill="hsl(0 0% 14%)" />
      <ellipse cx="76" cy="54" rx={isAlpha ? 10 : 8} ry="10" fill="hsl(0 0% 14%)" />
      <circle cx="46" cy="52" r="2" fill="white" opacity={0.9} />
      <circle cx="78" cy="52" r="2" fill="white" opacity={0.9} />
      {/* Alpha: subtle scar line */}
      {isAlpha && (
        <path
          d="M 38 62 Q 52 58 62 64"
          stroke="hsl(0 0% 55%)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity={0.6}
        />
      )}
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export interface WolfMascotCardProps {
  level: number;
  marketValue: number;
  progressPct: number;
  maxLevel?: number;
  justEarnedSalary?: number | null;
  /** Current level label e.g. "Level 05" */
  currentLevelLabel?: string;
  /** Goal salary for progress bar label */
  goalLabel?: string;
}

export function WolfMascotCard({
  level,
  marketValue,
  progressPct,
  maxLevel,
  justEarnedSalary,
  currentLevelLabel,
  goalLabel = "$180,000",
}: WolfMascotCardProps) {
  const stage = getStageFromLevel(level, maxLevel);
  const accessories = getAccessories(level);
  const nextUnlock = getNextUnlock(level);

  const prevLevelRef = useRef(level);
  const [levelUpAnim, setLevelUpAnim] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);
  const [newAccessoryIds, setNewAccessoryIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (level > prevLevelRef.current) {
      setLevelUpAnim(true);
      setGlowPulse(true);
      const newlyUnlocked = ACCESSORIES.filter(
        (a) => a.unlockedAt === level
      ).map((a) => a.id);
      if (newlyUnlocked.length) setNewAccessoryIds((s) => new Set([...s, ...newlyUnlocked]));
      const t1 = setTimeout(() => setLevelUpAnim(false), 280);
      const t2 = setTimeout(() => setGlowPulse(false), 600);
      const t3 = setTimeout(() => setNewAccessoryIds(new Set()), 400);
      prevLevelRef.current = level;
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
    prevLevelRef.current = level;
  }, [level]);

  const showXpGain = justEarnedSalary != null && justEarnedSalary > 0;
  const pct = Math.min(100, Math.max(0, progressPct));

  return (
    <aside
      className={cn(
        "flex w-full min-w-0 max-w-sm flex-col rounded-2xl border border-blue-100/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur-xl",
        "lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-7rem)]"
      )}
      aria-label="Market value and mascot"
    >
      {/* Top row: Market Value */}
      <div className="border-b border-slate-100/80 pb-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Market Value
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "tabular-nums font-semibold text-slate-800 transition-colors duration-200",
              showXpGain && "text-emerald-600"
            )}
          >
            {formatSalary(marketValue)}
          </span>
          {showXpGain && (
            <span className="text-xs font-semibold text-emerald-600">
              +{formatSalary(justEarnedSalary)}
            </span>
          )}
        </p>
      </div>

      {/* Mascot module */}
      <div className="relative flex flex-col items-center py-4">
        <div
          className={cn(
            "relative flex flex-col items-center justify-center transition-transform duration-200",
            levelUpAnim && "wolf-mascot-pop"
          )}
        >
          {glowPulse && (
            <div
              className="absolute inset-0 -m-2 rounded-full bg-blue-400/20 blur-xl wolf-mascot-glow"
              aria-hidden
            />
          )}
          <div className="relative" style={{ width: 140, height: 140 }}>
            <WolfHeadSvg stage={stage} size={140} />
            {accessories.map((acc) => (
              <div
                key={acc.id}
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  newAccessoryIds.has(acc.id) && "wolf-mascot-acc-in"
                )}
                style={{ animationFillMode: "backwards" }}
                title={acc.tooltip}
              >
                {acc.render(stage)}
              </div>
            ))}
          </div>
        </div>
        <span className="mt-2 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-semibold text-blue-700">
          {STAGE_LABELS[stage]}
        </span>
      </div>

      {/* Progress module */}
      <div className="space-y-2 border-t border-slate-100/80 pt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Progress
        </p>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        {currentLevelLabel && (
          <p className="text-xs text-slate-600">
            Current: <span className="font-semibold">{currentLevelLabel}</span>
          </p>
        )}
        <p className="text-xs text-slate-500">Goal: {goalLabel}</p>
        {nextUnlock && (
          <p className="text-xs text-blue-600">
            Next unlock: <span className="font-medium">{nextUnlock.label}</span> at Level {nextUnlock.at}
          </p>
        )}
      </div>
    </aside>
  );
}
