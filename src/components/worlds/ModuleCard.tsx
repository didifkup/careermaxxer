"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export type ModuleCardProps = {
  title: string;
  description: string;
  href: string;
  estimatedMinutes: number;
  completed?: boolean;
  onToggleComplete?: () => void;
};

export function ModuleCard({
  title,
  description,
  href,
  estimatedMinutes,
  completed = false,
  onToggleComplete,
}: ModuleCardProps) {
  const minutes = Number(estimatedMinutes) || 15;

  return (
    <article
      className={cn(
        "flex flex-col rounded-3xl border border-blue-100/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-blue-200/90 hover:shadow-[0_24px_64px_rgba(37,99,235,0.14)]"
      )}
    >
      <h3 className="font-display text-lg font-semibold text-slate-800">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{description}</p>
      <p className="mt-3 text-xs text-slate-400">
        Estimated: {minutes} min
      </p>
      <div className="mt-5 flex flex-1 flex-col justify-end">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {onToggleComplete ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onToggleComplete();
              }}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                completed
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-400 hover:bg-slate-100 hover:text-blue-600"
              )}
              aria-pressed={completed}
              title={completed ? "Mark incomplete" : "Mark complete"}
            >
              {completed ? "Completed" : "Mark complete"}
            </button>
          ) : (
            <span />
          )}
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98]"
          >
            Continue
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
