"use client";

interface FloorProgressHintProps {
  completed: number;
  total: number;
  visible: boolean;
}

/**
 * Subtle progress feedback for long floors: "4 / 11 completed".
 * Appears near the active node, fades after ~1.5s. Encouraging, not instructional.
 */
export function FloorProgressHint({ completed, total, visible }: FloorProgressHintProps) {
  return (
    <div
      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full pb-0.5 transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      aria-live="polite"
      aria-hidden={!visible}
    >
      <span className="whitespace-nowrap text-[11px] font-medium text-text-secondary/90">
        {completed} / {total} completed
      </span>
    </div>
  );
}
