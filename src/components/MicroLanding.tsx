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
      <div
        className="w-full max-w-[200px] rounded-xl border border-practice-node-border/50 px-3 py-1.5 text-center"
        style={{
          background: "hsl(var(--practice-landing-bg) / 0.9)",
          boxShadow: "0 1px 3px hsl(220 20% 40% / 0.05)",
        }}
      >
        {copy && (
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary/80">
            {copy}
          </span>
        )}
      </div>
    </div>
  );
}
