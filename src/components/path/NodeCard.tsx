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

interface NodeCardProps {
  node: Node;
  progress: Progress;
  onSelect?: (nodeId: string) => void;
}

export function NodeCard({ node, progress, onSelect }: NodeCardProps) {
  const state = getNodeState(progress, node);
  const isClickable = state === "unlocked";

  return (
    <button
      type="button"
      onClick={() => isClickable && onSelect?.(node.id)}
      disabled={!isClickable}
      className={`group flex w-full max-w-sm items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left shadow-card transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 ${
        state === "completed"
          ? "border-success/40 bg-success/10 hover:border-success/60"
          : state === "unlocked"
            ? "border-brand-primary/30 bg-surface-raised hover:scale-[1.02] hover:border-brand-primary/50 hover:shadow-elevated active:scale-[0.99]"
            : "cursor-not-allowed border-black/10 bg-surface-base opacity-60"
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition ${
          state === "completed"
            ? "bg-success/20"
            : state === "unlocked"
              ? "bg-brand-primary/10 group-hover:bg-brand-primary/20"
              : "bg-black/5"
        }`}
        aria-hidden
      >
        {state === "completed" ? "✓" : state === "unlocked" ? "▶" : "🔒"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-text-primary">{node.title}</p>
        <p className="text-sm text-text-secondary">Floor {node.floorNumber}</p>
      </div>
      {state === "completed" && (
        <span className="text-success" aria-label="Completed">
          ✓
        </span>
      )}
    </button>
  );
}
