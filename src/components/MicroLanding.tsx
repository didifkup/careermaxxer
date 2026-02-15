"use client";

interface MicroLandingProps {
  /** Optional copy (e.g. "Checkpoint", "Halfway there"). Omit for visual-only platform. */
  copy?: string;
}

/**
 * Micro landing: subtle platform between nodes on long floors.
 * Breather, not a reset — stairs continue through. Slight background contrast, optional copy.
 */
export function MicroLanding({ copy }: MicroLandingProps) {
  return (
    <div
      className="relative z-[1] col-span-2 flex w-full items-center justify-center py-1.5"
      aria-hidden
    >
      <div className="w-full max-w-[200px] rounded-2xl border border-blue-100/70 bg-white/70 px-3 py-1.5 text-center shadow-[0_4px_12px_rgba(37,99,235,0.06)] backdrop-blur-sm">
        {copy && (
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
            {copy}
          </span>
        )}
      </div>
    </div>
  );
}
