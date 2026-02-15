"use client";

import Link from "next/link";
import type { LabDef } from "@/lib/worlds/catalog";
import { WorldIcon } from "./WorldIcon";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";

export type WorldCardProps = {
  lab: LabDef;
  completedModules: number;
  totalModules: number;
  totalTimeLabel: string;
  active?: boolean;
};

export function WorldCard({
  lab,
  completedModules,
  totalModules,
  totalTimeLabel,
  active,
}: WorldCardProps) {
  const isAvailable = lab.available;
  const progressMax = totalModules > 0 ? totalModules : 1;
  const progressVal = totalModules > 0 ? completedModules : 0;

  return (
    <article
      className={cn(
        "group flex flex-col rounded-3xl border border-blue-100/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-blue-200/90 hover:shadow-[0_24px_64px_rgba(37,99,235,0.14)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <WorldIcon slug={lab.slug} active={active} />
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            isAvailable
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-500"
          )}
        >
          {isAvailable ? "Available" : "Coming soon"}
        </span>
      </div>
      <h2 className="mt-4 font-display text-lg font-semibold text-slate-800">
        {lab.title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{lab.hook}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>Estimated time: {totalTimeLabel}</span>
        <span>
          Progress: {totalModules > 0 ? `${completedModules} / ${totalModules}` : "—"} modules
        </span>
      </div>
      <div className="mt-3">
        <ProgressBar value={progressVal} max={progressMax} />
      </div>
      {totalModules > 0 && (
        <p className="mt-2 text-xs text-slate-400">
          {completedModules > 0
            ? "Keep going—consistency compounds."
            : "Start small. Finish clean."}
        </p>
      )}
      <div className="mt-4 flex flex-1 items-end">
        {isAvailable ? (
          <Link
            href={`/worlds/${lab.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98]"
          >
            Enter Lab
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <Link
            href={`/worlds/${lab.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200/80 bg-white px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
          >
            View Lab
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
