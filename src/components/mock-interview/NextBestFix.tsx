"use client";

import { cn } from "@/lib/utils";

export type NextBestFixPayload = {
  title: string;
  why: string;
  target: { metric: string; current: number; goal: number };
  drill: { name: string; steps: string[] };
};

export function NextBestFix({
  data,
  onRetry,
  className,
}: {
  data: NextBestFixPayload;
  onRetry: () => void;
  className?: string;
}) {
  const { title, why, target, drill } = data;
  const pct =
    target.goal > target.current
      ? Math.min(100, (target.current / target.goal) * 100)
      : 100;

  return (
    <div
      className={cn(
        "rounded-2xl border border-blue-100/70 bg-gradient-to-br from-blue-50/80 to-white p-5 shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{why}</p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] transition hover:bg-blue-700 hover:shadow-[0_6px_16px_rgba(37,99,235,0.3)]"
        >
          Retry Attempt
        </button>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>
            {target.metric.replace(/_/g, " ")}: {target.current} → {target.goal}
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Do the drill: {drill.name}
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
          {drill.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
