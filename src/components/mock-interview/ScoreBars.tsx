"use client";

import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  content: "Content",
  structure: "Structure",
  clarity: "Clarity",
  concision: "Concision",
  confidence: "Confidence",
  overall: "Overall",
};

export type Scores = {
  content: number;
  structure: number;
  clarity: number;
  concision: number;
  confidence: number;
  overall: number;
};

export function ScoreBars({ scores, className }: { scores: Scores; className?: string }) {
  const entries = Object.entries(scores).filter(([k]) => LABELS[k]);
  return (
    <div className={cn("space-y-3", className)}>
      {entries.map(([key, value]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm font-medium text-slate-700">
            {LABELS[key]}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, value * 10))}%` }}
            />
          </div>
          <span className="w-8 text-right text-sm font-semibold tabular-nums text-slate-800">
            {value}/10
          </span>
        </div>
      ))}
    </div>
  );
}
