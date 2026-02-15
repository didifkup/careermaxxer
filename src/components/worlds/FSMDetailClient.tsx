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
import { GlassCard } from "@/components/ui/glass-card";
import { FsmVisualJourney } from "@/components/labs/fsm/FsmVisualJourney";
import { WorldIcon } from "./WorldIcon";
import { ProgressBar } from "./ProgressBar";
import { ModuleCard } from "./ModuleCard";
import { cn } from "@/lib/utils";

type FsmModuleKey = "overview" | "journey" | "build";

export function FSMDetailClient() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeModule, setActiveModule] = useState<FsmModuleKey>("overview");

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

      <GlassCard className="p-6 md:p-8">
        <div
          className="inline-flex gap-0.5 rounded-2xl border border-blue-100/70 bg-white/60 p-1 backdrop-blur-sm"
          role="tablist"
          aria-label="FSM module"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === "overview"}
            onClick={() => setActiveModule("overview")}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
              activeModule === "overview"
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-slate-600 hover:bg-white/80 hover:text-slate-800"
            )}
          >
            Overview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === "journey"}
            onClick={() => setActiveModule("journey")}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
              activeModule === "journey"
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-slate-600 hover:bg-white/80 hover:text-slate-800"
            )}
          >
            Visual Journey
          </button>
          <span
            role="tab"
            aria-disabled="true"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 cursor-not-allowed"
          >
            Build Mode (Coming Soon)
          </span>
        </div>

        {activeModule === "overview" && (
          <div className="mt-8 max-w-3xl mx-auto px-0">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-800">
              Financial Statement Modeling
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600">
              Learn how the three statements connect and how bankers build integrated models.
              You’ll see the big picture first, then drill into each statement and the order of build.
            </p>
            <div className="mt-6 rounded-2xl border border-blue-100/70 bg-white/60 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium text-blue-700">Best for complete beginners</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModule("journey")}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
            >
              Start Visual Journey
              <span aria-hidden>→</span>
            </button>

            <section className="mt-12">
              <h3 className="text-lg font-semibold text-slate-800">Modules</h3>
              <p className="mt-1 text-sm text-slate-500">
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
        )}

        {activeModule === "journey" && (
          <div className="mt-8">
            <FsmVisualJourney />
          </div>
        )}

        {activeModule === "build" && (
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-blue-100/70 bg-white/60 p-8 text-center backdrop-blur-sm">
              <p className="text-lg font-medium text-slate-700">Build Mode coming soon</p>
              <p className="mt-2 text-sm text-slate-500">
                Hands-on model building will be available here.
              </p>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
