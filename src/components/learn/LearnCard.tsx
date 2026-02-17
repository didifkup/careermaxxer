"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { learnStyles } from "./learnStyles";

export type LearnCardProps = {
  href: string;
  title: string;
  hook: string;
  visual: React.ReactNode;
  guidesLabel?: string;
  className?: string;
};

export function LearnCard({
  href,
  title,
  hook,
  visual,
  guidesLabel = "Guides: Coming soon",
  className,
}: LearnCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/card relative block text-left",
        learnStyles.cardBase,
        learnStyles.cardHover,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 rounded-2xl",
        className
      )}
    >
      {/* Optional floating particles overlay (pure CSS, light) */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" aria-hidden>
        <span className="learn-card-particle absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-blue-400/40" />
        <span className="learn-card-particle learn-card-particle-delay-1 absolute right-[15%] top-[30%] h-1 w-1 rounded-full bg-blue-300/30" />
        <span className="learn-card-particle learn-card-particle-delay-2 absolute bottom-[25%] left-[20%] h-0.5 w-0.5 rounded-full bg-slate-400/30" />
      </span>

      <div className="relative flex flex-col p-6">
        {/* Lab visual area — main attraction */}
        <div
          className={cn(
            "relative h-[140px] w-full overflow-hidden rounded-xl border border-blue-50/80 bg-gradient-to-br from-blue-50/60 to-white/80",
            "transition-transform duration-300 group-hover/card:scale-[1.02]"
          )}
          aria-hidden
        >
          <div className="lvIdle learn-card-visual absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ease-out">
            {visual}
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-1 flex-col">
          <h2 className="font-display text-lg font-semibold text-slate-800 group-hover/card:text-slate-900">
            {title}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {hook}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            {guidesLabel}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition group-hover/card:gap-2 group-hover/card:text-blue-700">
            Explore
            <span aria-hidden className="transition-transform duration-200 group-hover/card:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
