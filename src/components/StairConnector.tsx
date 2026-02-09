"use client";

type StairState = "locked" | "unlocked" | "completed";
type StairDirection = "down-right" | "down-left";

interface StairConnectorProps {
  direction: StairDirection;
  state: StairState;
  /** When true, play brief light-up animation (stair to next node). */
  justLit?: boolean;
}

const strokeColor = (state: StairState) =>
  state === "completed"
    ? "hsl(var(--practice-glow-completed) / 0.65)"
    : state === "unlocked"
      ? "hsl(var(--practice-glow-active) / 0.5)"
      : "hsl(var(--practice-stair-locked) / 0.45)";

/**
 * Diagonal stair connector between nodes. Rendered behind nodes (z-0).
 * Angles tuned so the eye flows downward naturally (primary = down, secondary = side step);
 * avoids long flat diagonals that can pause or confuse.
 */
export function StairConnector({ direction, state, justLit }: StairConnectorProps) {
  const isDownRight = direction === "down-right";
  const opacity = state === "locked" ? 0.45 : state === "completed" ? 0.75 : 0.95;
  const glowFilter =
    state === "unlocked"
      ? "drop-shadow(0 0 6px hsl(var(--practice-glow-active) / 0.35))"
      : undefined;

  /* Gentler angle: ~22° from vertical so "down" dominates and the eye isn’t pulled sideways.
     Start/end align with node centers (left col ~22%, right col ~78% in 0–100 viewBox). */
  const startX = isDownRight ? 22 : 78;
  const endX = isDownRight ? 78 : 22;
  const y1 = 4;
  const y2 = 96;

  return (
    <div
      className="relative z-0 flex w-full shrink-0 items-center justify-center overflow-visible"
      style={{ height: "var(--practice-zigzag-gap-y)" }}
      aria-hidden
    >
      <svg
        className={`absolute inset-0 h-full w-full ${justLit ? "completion-sequence-stair-light" : ""}`}
        style={{ opacity, filter: glowFilter }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Main diagonal: down-first angle so eye follows naturally to next node */}
        <line
          x1={startX}
          y1={y1}
          x2={endX}
          y2={y2}
          stroke={strokeColor(state)}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        {/* Secondary line for depth */}
        <line
          x1={startX + (isDownRight ? 2 : -2)}
          y1={y1 + 2}
          x2={endX + (isDownRight ? -2 : 2)}
          y2={y2 - 2}
          stroke={strokeColor(state)}
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeOpacity={0.5}
          strokeDasharray="3 6"
        />
      </svg>
    </div>
  );
}
