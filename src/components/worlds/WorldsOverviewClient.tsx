"use client";

import { useMemo, useState, useEffect } from "react";
import {
  LABS,
  FSM_TOTAL_MINUTES,
  FSM_MODULES,
  formatTimeMinutes,
} from "@/lib/worlds/catalog";
import { getFSMModuleCompletions } from "@/lib/worlds/progress";
import { WorldCard } from "./WorldCard";

const worldsPageBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

export function WorldsOverviewClient() {
  const [fsmCompleted, setFsmCompleted] = useState<string[]>([]);

  useEffect(() => {
    setFsmCompleted(getFSMModuleCompletions());
  }, []);

  const fsmCompletedCount = useMemo(
    () => FSM_MODULES.filter((m) => fsmCompleted.includes(m.id)).length,
    [fsmCompleted]
  );

  return (
    <div
      className="min-h-screen px-4 py-12 md:py-16"
      style={worldsPageBg}
    >
      <div className="mx-auto max-w-[900px]">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-semibold text-slate-800 md:text-5xl">
              Labs
            </h1>
            <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              AI Lab Curriculum
            </span>
          </div>
          <p className="mt-2 text-base text-slate-500 md:text-lg">
            Six focused labs. Clear progress. Real modeling intuition.
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Pick a lab. Run short modules. Watch your progress compound.
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LABS.map((lab) => {
            const isFsm = lab.slug === "fsm";
            const totalModules = isFsm ? FSM_MODULES.length : 0;
            const completedModules = isFsm ? fsmCompletedCount : 0;
            const totalTimeLabel = isFsm
              ? formatTimeMinutes(FSM_TOTAL_MINUTES)
              : lab.placeholderMinutes > 0
                ? formatTimeMinutes(lab.placeholderMinutes)
                : "—";
            return (
              <li key={lab.slug}>
                <WorldCard
                  lab={lab}
                  completedModules={completedModules}
                  totalModules={totalModules}
                  totalTimeLabel={totalTimeLabel}
                  active={false}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
