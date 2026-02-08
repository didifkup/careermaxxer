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

interface WolfPanelProps {
  progress: Progress;
}

export function WolfPanel({ progress }: WolfPanelProps) {
  const prevStageRef = useRef<WolfStage>(progress.wolfStage);
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    if (progress.wolfStage > prevStageRef.current) {
      setLevelUp(true);
      prevStageRef.current = progress.wolfStage;
      const t = setTimeout(() => setLevelUp(false), 1100);
      return () => clearTimeout(t);
    }
    prevStageRef.current = progress.wolfStage;
  }, [progress.wolfStage]);

  const pct = Math.min(100, (progress.salary / SALARY_MAX) * 100);

  return (
    <aside className="flex w-full flex-col rounded-2xl bg-surface-raised p-6 shadow-elevated lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-7rem)] lg:w-80 lg:shrink-0">
      <div className="flex flex-col items-center gap-6">
        {/* Wolf avatar — BIG, with level-up animation */}
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-2xl bg-surface-base p-5 shadow-card transition hover:shadow-elevated">
            <WolfAvatar
              stage={progress.wolfStage}
              levelUp={levelUp}
              size={220}
              className="flex-shrink-0"
            />
          </div>
          <span className="rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-bold text-brand-primary">
            {WOLF_STAGE_LABELS[progress.wolfStage]}
          </span>
        </div>

        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Salary progress</span>
            <span className="font-semibold text-brand-accent">{formatSalary(progress.salary)}</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-black/10 shadow-inner">
            <div
              className="h-full rounded-full bg-brand-accent transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={progress.salary}
              aria-valuemin={0}
              aria-valuemax={SALARY_MAX}
            />
          </div>
          <p className="text-right text-xs text-text-secondary">Goal: {formatSalary(SALARY_MAX)}</p>
        </div>

        <div className="w-full rounded-xl bg-surface-base px-4 py-3 text-center shadow-card">
          <p className="text-xs text-text-secondary">Your office floor</p>
          <p className="text-2xl font-bold text-brand-primary">Floor {progress.currentFloor}</p>
        </div>
      </div>
    </aside>
  );
}
