"use client";

import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { WorldIcon } from "./WorldIcon";
import { LeverageEngineVisualJourney } from "@/components/labs/leverage-engine/LeverageEngineVisualJourney";
import { leverageEngineLevel1Sections } from "@/components/labs/leverage-engine/leverageEngineLevel1JourneyContent";
import { leverageEngineLevel2Sections } from "@/components/labs/leverage-engine/leverageEngineLevel2JourneyContent";
import { leverageEngineCaseSections } from "@/components/labs/leverage-engine/leverageEngineCaseJourneyContent";
import { cn } from "@/lib/utils";

type LEModuleKey = "overview" | "level1" | "level2" | "case" | "build";

export function LeverageEngineDetailClient() {
  const [activeModule, setActiveModule] = useState<LEModuleKey>("overview");

  return (
    <div className="mx-auto max-w-[900px] space-y-8">
      <nav className="text-sm text-slate-500">
        <Link href="/worlds" className="text-blue-600 hover:underline">
          Labs
        </Link>
        <span className="mx-2">→</span>
        <span className="text-slate-700">Leverage Engine</span>
      </nav>

      <header>
        <div className="flex items-center gap-4">
          <WorldIcon slug="leverage" active />
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-800 md:text-4xl">
              Leverage Engine
            </h1>
            <p className="mt-1 text-slate-500">
              Understand LBOs: debt, paydown, returns — from zero to solid.
            </p>
          </div>
        </div>
      </header>

      <GlassCard className="p-6 md:p-8">
        <div
          className="inline-flex flex-wrap gap-1 rounded-2xl border border-blue-100/70 bg-white/60 p-1 backdrop-blur-sm"
          role="tablist"
          aria-label="Leverage Engine module"
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
            aria-selected={activeModule === "level1"}
            onClick={() => setActiveModule("level1")}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
              activeModule === "level1"
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-slate-600 hover:bg-white/80 hover:text-slate-800"
            )}
          >
            Level 1
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === "level2"}
            onClick={() => setActiveModule("level2")}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
              activeModule === "level2"
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-slate-600 hover:bg-white/80 hover:text-slate-800"
            )}
          >
            Level 2
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === "case"}
            onClick={() => setActiveModule("case")}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
              activeModule === "case"
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-slate-600 hover:bg-white/80 hover:text-slate-800"
            )}
          >
            Case
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
              Leverage Engine
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600">
              An LBO is buying a company using a lot of debt + some equity.
            </p>
            <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-600">
              The magic: if the company pays down debt, the equity slice can grow
              fast.
            </p>
            <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-600">
              This lab teaches the mechanics so you can talk about LBOs like an
              analyst.
            </p>
            <div className="mt-6 rounded-2xl border border-blue-100/70 bg-white/60 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium text-blue-700">
                Best after finishing FSM basics
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModule("level1")}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
            >
              Start Level 1
              <span aria-hidden>→</span>
            </button>
          </div>
        )}

        {activeModule === "level1" && (
          <div className="mt-8">
            <LeverageEngineVisualJourney
              sections={leverageEngineLevel1Sections}
              title="Level 1 — LBO Intuition"
            />
          </div>
        )}

        {activeModule === "level2" && (
          <div className="mt-8">
            <LeverageEngineVisualJourney
              sections={leverageEngineLevel2Sections}
              title="Level 2 — Debt Stack + Covenants"
            />
          </div>
        )}

        {activeModule === "case" && (
          <div className="mt-8">
            <LeverageEngineVisualJourney
              sections={leverageEngineCaseSections}
              title="Case — Cocktail Napkin LBO"
            />
          </div>
        )}

        {activeModule === "build" && (
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-blue-100/70 bg-white/60 p-8 text-center backdrop-blur-sm">
              <p className="text-lg font-medium text-slate-700">
                Build Mode coming soon
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Hands-on LBO build will be available here.
              </p>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
