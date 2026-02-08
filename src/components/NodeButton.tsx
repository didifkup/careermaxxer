"use client";

import type { Node } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { isNodeUnlocked } from "@/lib/progress";

type NodeState = "locked" | "unlocked" | "completed";

function getNodeState(progress: Progress, node: Node): NodeState {
  if (progress.completedNodeIds.includes(node.id)) return "completed";
  if (isNodeUnlocked(progress, node.id)) return "unlocked";
  return "locked";
}

/** Icon for node: topic shorthand or emoji. */
function getNodeIcon(node: Node): string {
  const first = node.title.split(/\s/)[0]?.slice(0, 2).toUpperCase() ?? "•";
  return first;
}

interface NodeButtonProps {
  node: Node;
  progress: Progress;
  onSelect?: (nodeId: string) => void;
  onLockedClick?: () => void;
}

export function NodeButton({ node, progress, onSelect, onLockedClick }: NodeButtonProps) {
  const state = getNodeState(progress, node);
  const isLocked = state === "locked";
  const isCompleted = state === "completed";
  const isUnlocked = state === "unlocked";

  const handleClick = () => {
    if (isLocked) {
      onLockedClick?.();
      return;
    }
    if (isUnlocked) {
      onSelect?.(node.id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border-2 bg-surface-raised p-4 shadow-card transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[locked]:cursor-pointer data-[unlocked]:hover:scale-105 data-[unlocked]:hover:shadow-elevated data-[unlocked]:active:scale-[0.98]"
      data-locked={isLocked ? "" : undefined}
      data-unlocked={isUnlocked ? "" : undefined}
      aria-pressed={false}
      aria-label={isLocked ? `${node.title} (locked)` : isCompleted ? `${node.title} (completed)` : node.title}
    >
      {/* Icon circle */}
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold transition ${
          isCompleted
            ? "bg-success/20 text-success"
            : isUnlocked
              ? "bg-brand-primary/15 text-brand-primary group-hover:bg-brand-primary/25"
              : "bg-black/10 text-text-secondary"
        }`}
      >
        {isCompleted ? "✓" : getNodeIcon(node)}
      </span>
      {/* Title */}
      <span
        className={`max-w-[100px] text-center text-sm font-semibold leading-tight ${
          isLocked ? "text-text-secondary" : "text-text-primary"
        }`}
      >
        {node.title}
      </span>
      {/* Difficulty tag */}
      <span className="text-[10px] font-medium uppercase tracking-wide text-text-secondary">
        {node.difficulty}
      </span>
      {/* Completed checkmark badge */}
      {isCompleted && (
        <span
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white shadow"
          aria-hidden
        >
          ✓
        </span>
      )}
      {/* Locked overlay */}
      {isLocked && (
        <span
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-[1px]"
          aria-hidden
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/30 text-xl">
            🔒
          </span>
        </span>
      )}
    </button>
  );
}
