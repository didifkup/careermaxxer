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
}

export function WolfPanel({ progress, justEarnedSalary }: WolfPanelProps) {
  const prevStageRef = useRef<WolfStage>(progress.wolfStage);
  const [levelUp, setLevelUp] = useState(false);
  const [displaySalary, setDisplaySalary] = useState(progress.salary);

  useEffect(() => {
    if (justEarnedSalary == null) setDisplaySalary(progress.salary);
  }, [progress.salary, justEarnedSalary]);

  useEffect(() => {
    if (progress.wolfStage > prevStageRef.current) {
      setLevelUp(true);
      prevStageRef.current = progress.wolfStage;
      const t = setTimeout(() => setLevelUp(false), 1100);
      return () => clearTimeout(t);
    }
    prevStageRef.current = progress.wolfStage;
  }, [progress.wolfStage]);

  /** Count-up animation when XP is just earned: animate from (salary - delta) to salary with ease-out. */
  useEffect(() => {
    if (justEarnedSalary == null || justEarnedSalary <= 0) return;
    const startSalary = progress.salary - justEarnedSalary;
    const endSalary = progress.salary;
    setDisplaySalary(startSalary);
    const startTime = performance.now();
    let rafId: number;
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / XP_COUNT_UP_MS);
      const eased = easeOutCubic(t);
      setDisplaySalary(Math.round(startSalary + (endSalary - startSalary) * eased));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [justEarnedSalary, progress.salary]);

  const pct = Math.min(100, (displaySalary / SALARY_MAX) * 100);
  const showXpGain = justEarnedSalary != null && justEarnedSalary > 0;

  return (
    <aside className="flex w-full flex-col rounded-xl bg-surface-raised p-4 shadow-elevated lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-7rem)] lg:w-72 lg:shrink-0">
      <div className="flex flex-col items-center gap-4">
        {/* Wolf avatar with level-up animation */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="rounded-xl bg-surface-base p-3 shadow-card transition hover:shadow-elevated">
            <WolfAvatar
              stage={progress.wolfStage}
              levelUp={levelUp}
              size={160}
              className="flex-shrink-0"
            />
          </div>
          <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary">
            {WOLF_STAGE_LABELS[progress.wolfStage]}
          </span>
        </div>

        <div className="w-full space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-xs">
            <span className="text-text-secondary">Salary progress</span>
            <span className="flex items-center gap-1.5">
              <span
                className={`font-semibold tabular-nums transition-colors duration-200 ${
                  showXpGain ? "text-practice-glow-completed xp-gain-glow" : "text-brand-accent"
                }`}
              >
                {formatSalary(displaySalary)}
              </span>
              {showXpGain && (
                <span className="xp-gain-badge animate-xp-gain-in font-semibold text-practice-glow-completed">
                  +{formatSalary(justEarnedSalary)}
                </span>
              )}
            </span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-black/10 shadow-inner">
            <div
              className="h-full rounded-full bg-brand-accent transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={progress.salary}
              aria-valuemin={0}
              aria-valuemax={SALARY_MAX}
            />
            {showXpGain && <span className="xp-gain-bar-shimmer" aria-hidden />}
          </div>
          <p className="text-right text-xs text-text-secondary">Goal: {formatSalary(SALARY_MAX)}</p>
        </div>

        <div className="w-full rounded-lg bg-surface-base px-3 py-2 text-center shadow-card">
          <p className="text-[10px] text-text-secondary">Your office floor</p>
          <p className="text-lg font-bold text-brand-primary">Floor {progress.currentFloor}</p>
        </div>
      </div>
    </aside>
  );
}
