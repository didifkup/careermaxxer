"use client";

import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { WorldIcon } from "./WorldIcon";
import { DcfVisualJourney } from "@/components/labs/dcf/DcfVisualJourney";
import { dcfLevel1Sections } from "@/components/labs/dcf/dcfLevel1JourneyContent";
import { dcfLevel2Sections } from "@/components/labs/dcf/dcfLevel2JourneyContent";
import { cn } from "@/lib/utils";

type DcfModuleKey = "overview" | "level1" | "level2" | "build";

export function DCFDetailClient() {
  const [activeModule, setActiveModule] = useState<DcfModuleKey>("overview");

  return (
    <div className="mx-auto max-w-[900px] space-y-8">
      <nav className="text-sm text-slate-500">
        <Link href="/worlds" className="text-blue-600 hover:underline">
          Labs
        </Link>
        <span className="mx-2">→</span>
        <span className="text-slate-700">DCF Modeling</span>
      </nav>

      <header>
        <div className="flex items-center gap-4">
          <WorldIcon slug="dcf" active />
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-800 md:text-4xl">
              DCF Modeling
            </h1>
            <p className="mt-1 text-slate-500">
              Value a business by discounting future cash flows.
            </p>
          </div>
        </div>
      </header>

      <GlassCard className="p-6 md:p-8">
        <div
          className="inline-flex flex-wrap gap-1 rounded-2xl border border-blue-100/70 bg-white/60 p-1 backdrop-blur-sm"
          role="tablist"
          aria-label="DCF module"
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
              DCF Modeling
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-600">
              Learn how to value a company by forecasting its cash flows and
              discounting them back to today. Level 1 covers the foundations;
              Level 2 adds the banker edge.
            </p>
            <div className="mt-6 rounded-2xl border border-blue-100/70 bg-white/60 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium text-blue-700">Best after finishing FSM basics</p>
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
            <DcfVisualJourney sections={dcfLevel1Sections} title="Level 1 — Foundations" />
          </div>
        )}

        {activeModule === "level2" && (
          <div className="mt-8">
            <DcfVisualJourney sections={dcfLevel2Sections} title="Level 2 — Banker Edge" />
          </div>
        )}

        {activeModule === "build" && (
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-blue-100/70 bg-white/60 p-8 text-center backdrop-blur-sm">
              <p className="text-lg font-medium text-slate-700">Build Mode coming soon</p>
              <p className="mt-2 text-sm text-slate-500">
                Hands-on DCF build will be available here.
              </p>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
