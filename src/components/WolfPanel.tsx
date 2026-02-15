"use client";

import { useEffect, useRef, useState } from "react";
import type { Progress } from "@/lib/progress";
import { SALARY_MAX } from "@/lib/constants";
import { formatSalary } from "@/lib/format";
import { WolfAvatar } from "@/components/WolfAvatar";
import type { WolfStage } from "@/components/WolfAvatar";

const WOLF_STAGE_LABELS: Record<WolfStage, string> = {
  0: "Pup",
  1: "Junior",
  2: "Sharp",
  3: "Alpha",
  4: "Legend",
};

const XP_COUNT_UP_MS = 420;
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

interface WolfPanelProps {
  progress: Progress;
  /** When set, show XP gain: count-up, green emphasis, "+$X" badge, brief glow. Cleared by parent after ~2.5s. */
  justEarnedSalary?: number | null;
  /** Optional: when provided (e.g. from page hero), use this for display instead of internal animation. */
  displaySalary?: number;
}

export function WolfPanel({ progress, justEarnedSalary, displaySalary: displaySalaryProp }: WolfPanelProps) {
  const prevStageRef = useRef<WolfStage>(progress.wolfStage);
  const [levelUp, setLevelUp] = useState(false);
  const [internalSalary, setInternalSalary] = useState(progress.salary);
  const displaySalary = displaySalaryProp ?? internalSalary;

  useEffect(() => {
    if (displaySalaryProp != null) return;
    if (justEarnedSalary == null) setInternalSalary(progress.salary);
  }, [progress.salary, justEarnedSalary, displaySalaryProp]);

  useEffect(() => {
    if (progress.wolfStage > prevStageRef.current) {
      setLevelUp(true);
      prevStageRef.current = progress.wolfStage;
      const t = setTimeout(() => setLevelUp(false), 1100);
      return () => clearTimeout(t);
    }
    prevStageRef.current = progress.wolfStage;
  }, [progress.wolfStage]);

  /** Count-up animation when XP is just earned (only when not controlled by parent). */
  useEffect(() => {
    if (displaySalaryProp != null || justEarnedSalary == null || justEarnedSalary <= 0) return;
    const startSalary = progress.salary - justEarnedSalary;
    const endSalary = progress.salary;
    setInternalSalary(startSalary);
    const startTime = performance.now();
    let rafId: number;
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / XP_COUNT_UP_MS);
      const eased = easeOutCubic(t);
      setInternalSalary(Math.round(startSalary + (endSalary - startSalary) * eased));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [justEarnedSalary, progress.salary, displaySalaryProp]);

  const pct = Math.min(100, (displaySalary / SALARY_MAX) * 100);
  const showXpGain = justEarnedSalary != null && justEarnedSalary > 0;

  const levelLabel = `Level ${String(progress.currentFloor).padStart(2, "0")}`;

  return (
    <aside className="flex w-full flex-col rounded-2xl border border-blue-100/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur-xl lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-7rem)] lg:w-72 lg:shrink-0">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1.5">
          <div className="rounded-2xl border border-blue-100/70 bg-white/80 p-3 shadow-sm">
            <WolfAvatar
              stage={progress.wolfStage}
              levelUp={levelUp}
              size={160}
              className="flex-shrink-0"
            />
          </div>
          <span className="rounded-full bg-blue-100/80 px-3 py-1 text-xs font-semibold text-blue-700">
            {WOLF_STAGE_LABELS[progress.wolfStage]}
          </span>
        </div>

        <div className="w-full space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-xs">
            <span className="text-slate-500">Salary progress</span>
            <span className="flex items-center gap-1.5">
              <span
                className={`font-semibold tabular-nums transition-colors duration-200 ${
                  showXpGain ? "text-emerald-600 xp-gain-glow" : "text-blue-600"
                }`}
              >
                {formatSalary(displaySalary)}
              </span>
              {showXpGain && (
                <span className="xp-gain-badge animate-xp-gain-in font-semibold text-emerald-600">
                  +{formatSalary(justEarnedSalary)}
                </span>
              )}
            </span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={progress.salary}
              aria-valuemin={0}
              aria-valuemax={SALARY_MAX}
            />
            {showXpGain && <span className="xp-gain-bar-shimmer" aria-hidden />}
          </div>
          <p className="text-right text-xs text-slate-500">Goal: {formatSalary(SALARY_MAX)}</p>
        </div>

        <div className="w-full rounded-xl border border-blue-100/70 bg-white/80 px-3 py-2 text-center">
          <p className="text-[10px] text-slate-500">Current level</p>
          <p className="text-lg font-bold text-slate-800">{levelLabel}</p>
        </div>
      </div>
    </aside>
  );
}
