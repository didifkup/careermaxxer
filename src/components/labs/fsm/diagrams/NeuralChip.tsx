"use client";

import { cn } from "@/lib/utils";
import type { ChipIcon, NodeDef } from "./types";

const toneStyles = {
  neutral:
    "border-slate-200 bg-white text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
  accent:
    "border-indigo-300 bg-white text-slate-900 shadow-[0_0_0_2px_rgba(99,102,241,0.08)]",
  good:
    "border-emerald-300 bg-white text-slate-900 shadow-[0_0_0_2px_rgba(16,185,129,0.08)]",
  warn:
    "border-amber-300 bg-white text-slate-900 shadow-[0_0_0_2px_rgba(245,158,11,0.08)]",
};

function IconDot({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="8" cy="8" r="3" />
    </svg>
  );
}

function IconStack({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M4 6h8M4 10h8M4 14h8" />
    </svg>
  );
}

function IconWave({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M2 8c2-2 4-2 6 0s4 2 6 0M2 11c2-2 4-2 6 0s4 2 6 0" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2 5 8h3L7 14l4-6H8L9 2Z" />
    </svg>
  );
}

function ChipIconGlyph({ icon }: { icon: ChipIcon }) {
  const c = "h-3.5 w-3.5 text-slate-500";
  switch (icon) {
    case "dot":
      return <IconDot className={c} />;
    case "stack":
      return <IconStack className={c} />;
    case "wave":
      return <IconWave className={c} />;
    case "bolt":
      return <IconBolt className={c} />;
    default:
      return <IconDot className={c} />;
  }
}

export type NeuralChipProps = {
  title: string;
  subtitle?: string;
  tone?: "neutral" | "accent" | "good" | "warn";
  icon?: ChipIcon;
  badge?: string;
  highlighted?: boolean;
  className?: string;
};

export function NeuralChip({
  title,
  subtitle,
  tone = "neutral",
  icon = "dot",
  badge,
  highlighted = false,
  className,
}: NeuralChipProps) {
  const style = highlighted ? toneStyles.accent : toneStyles[tone];
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 min-w-0",
        "hover:translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-300",
        highlighted && "ring-2 ring-indigo-200 bg-indigo-50/80",
        style,
        className
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
        <ChipIconGlyph icon={icon} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm leading-tight text-slate-900">
          {title}
        </p>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
      {badge && (
        <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
          {badge}
        </span>
      )}
    </div>
  );
}

/** Render from NodeDef */
export function NeuralChipFromNode({
  node,
  highlighted,
}: {
  node: NodeDef;
  highlighted?: boolean;
}) {
  return (
    <NeuralChip
      title={node.title}
      subtitle={node.subtitle}
      tone={node.tone}
      icon={node.icon ?? "dot"}
      badge={node.badge}
      highlighted={highlighted}
    />
  );
}
