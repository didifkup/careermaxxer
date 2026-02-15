"use client";

import { cn } from "@/lib/utils";

type DiagramCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function DiagramCard({
  title,
  children,
  className,
}: DiagramCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-slate-200 bg-[#f9fafc] overflow-hidden p-6 shadow-sm md:p-8",
        className
      )}
    >
      {/* Inner depth gradient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white via-white to-[#f3f6fb]"
        aria-hidden
      />
      {/* Dot grid: very subtle, light mode */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="relative z-10">
        {title && (
          <h4 className="mb-5 text-xs font-medium uppercase tracking-widest text-slate-500">
            {title}
          </h4>
        )}
        {children}
      </div>
    </div>
  );
}
