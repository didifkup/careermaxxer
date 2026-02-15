"use client";

import { cn } from "@/lib/utils";

export type SegmentedToggleOption<T extends string> = {
  value: T;
  label: string;
};

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  className,
}: {
  options: SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  "aria-label"?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex gap-0.5 rounded-2xl border border-blue-100/70 bg-white/60 p-1 backdrop-blur-sm",
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
            value === opt.value
              ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
              : "text-slate-600 hover:bg-white/80 hover:text-slate-800"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
