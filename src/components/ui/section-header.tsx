"use client";

import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  rightSlot,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-800 md:text-4xl">
          {title}
        </h1>
        {subtitle != null && (
          <p className="mt-1 text-base text-slate-500 md:text-lg">{subtitle}</p>
        )}
      </div>
      {rightSlot != null && (
        <div className="flex items-center gap-2 text-sm">{rightSlot}</div>
      )}
    </div>
  );
}
