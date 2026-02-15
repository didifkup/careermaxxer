"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  FSM_MODULES,
  FSM_TOTAL_MINUTES,
  formatTimeMinutes,
} from "@/lib/worlds/catalog";
import {
  getFSMModuleCompletions,
  setFSMModuleComplete,
  isFSMModuleComplete,
} from "@/lib/worlds/progress";
import { WorldIcon } from "./WorldIcon";
import { ProgressBar } from "./ProgressBar";
import { ModuleCard } from "./ModuleCard";

export function FSMDetailClient() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const refresh = useCallback(() => {
    setCompletedIds(getFSMModuleCompletions());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const completedCount = FSM_MODULES.filter((m) =>
    completedIds.includes(m.id)
  ).length;
  const completedMinutes = FSM_MODULES.filter((m) =>
    completedIds.includes(m.id)
  ).reduce((sum, m) => sum + m.estimatedMinutes, 0);
  const remainingMinutes = FSM_TOTAL_MINUTES - completedMinutes;

  const toggleComplete = useCallback(
    (moduleId: string) => {
      const next = isFSMModuleComplete(moduleId);
      setFSMModuleComplete(moduleId, !next);
      setCompletedIds(getFSMModuleCompletions());
    },
    []
  );

  return (
    <div className="mx-auto max-w-[900px] space-y-8">
      <nav className="text-sm text-slate-500">
        <Link href="/worlds" className="text-blue-600 hover:underline">
          Labs
        </Link>
        <span className="mx-2">→</span>
        <span className="text-slate-700">Financial System Core</span>
      </nav>

      <header>
        <div className="flex items-center gap-4">
          <WorldIcon slug="fsm" active />
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-800 md:text-4xl">
              Financial System Core
            </h1>
            <p className="mt-1 text-slate-500">
              A clean, step-by-step build of the full three-statement system.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-6 rounded-2xl border border-blue-100/70 bg-white/60 p-4 backdrop-blur-sm">
          <div>
            <p className="text-xs font-medium text-slate-500">Progress</p>
            <p className="text-lg font-semibold text-slate-800">
              {completedCount} / 6 modules
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Completed</p>
            <p className="text-lg font-semibold text-slate-800">
              {formatTimeMinutes(completedMinutes)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Remaining</p>
            <p className="text-lg font-semibold text-slate-800">
              {formatTimeMinutes(remainingMinutes)}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={completedCount} max={6} />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {completedCount > 0
            ? "You're building momentum."
            : "First module is the hardest. After that it's flow."}
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-slate-800">Modules</h2>
        <p className="mt-1 text-sm text-slate-400">
          Run one module at a time. Keep it tight. Keep it consistent.
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FSM_MODULES.map((mod) => (
            <li key={mod.id}>
              <ModuleCard
                title={mod.title}
                description={mod.description}
                href={mod.href}
                estimatedMinutes={mod.estimatedMinutes}
                completed={completedIds.includes(mod.id)}
                onToggleComplete={() => toggleComplete(mod.id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
