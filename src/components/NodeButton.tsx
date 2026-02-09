"use client";

import type { Node } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { isNodeUnlocked } from "@/lib/progress";
import { formatSalary } from "@/lib/format";

type NodeState = "locked" | "unlocked" | "completed";

function getNodeState(progress: Progress, node: Node): NodeState {
  if (progress.completedNodeIds.includes(node.id)) return "completed";
  if (isNodeUnlocked(progress, node.id)) return "unlocked";
  return "locked";
}

/** Acronym from lesson title (e.g. "Assets vs Liabilities" → "AV"). */
function getNodeAcronym(node: Node): string {
  const words = node.title.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return ((words[0][0] ?? "") + (words[1][0] ?? "")).toUpperCase();
  }
  return node.title.slice(0, 2).toUpperCase() || "•";
}

interface NodeButtonProps {
  node: Node;
  progress: Progress;
  onSelect?: (nodeId: string) => void;
  onLockedClick?: () => void;
  /** When true, run completion sequence: pop, check snap, salary float (no modal). */
  justCompleted?: boolean;
  /** From Practice map: node is completed (in user progress). */
  isCompleted?: boolean;
  /** From Practice map: node is the next unlockable or currently selected. */
  isCurrent?: boolean;
  /** From Practice map: node is locked (not yet unlockable). */
  isLocked?: boolean;
}

/**
 * Premium game tile: rounded rectangle, frosted/white background, subtle border, depth shadow.
 * Content: difficulty (top), large acronym (center), title, salary.
 * States: locked (blur + opacity), active (depth + glow), completed (check + green accent).
 * When isCompleted/isCurrent/isLocked are passed from the Practice map, they override internal derivation.
 */
export function NodeButton({
  node,
  progress,
  onSelect,
  onLockedClick,
  justCompleted,
  isCompleted: isCompletedProp,
  isCurrent: isCurrentProp,
  isLocked: isLockedProp,
}: NodeButtonProps) {
  const fromProps = isCompletedProp !== undefined || isLockedProp !== undefined;
  const state = getNodeState(progress, node);
  const isLocked = fromProps ? (isLockedProp ?? state === "locked") : state === "locked";
  const isCompleted = fromProps ? (isCompletedProp ?? state === "completed") : state === "completed";
  const isCurrent = isCurrentProp ?? false;
  const isUnlocked = !isLocked && !isCompleted;
  const runCompletionSequence = Boolean(justCompleted && isCompleted);

  const handleClick = () => {
    if (isLocked) {
      onLockedClick?.();
      return;
    }
    if (isUnlocked) {
      onSelect?.(node.id);
    }
  };

  const shadowClass =
    isCompleted
      ? "shadow-practice-node-rest"
      : isUnlocked
        ? "shadow-practice-node-depth-glow"
        : "shadow-practice-node-rest";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex w-[96px] flex-col items-center transition-transform duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-practice-glow-active focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[locked]:cursor-not-allowed data-[unlocked]:cursor-pointer data-[unlocked]:hover:scale-[1.06] data-[unlocked]:hover:-translate-y-0.5 data-[completed]:cursor-pointer data-[completed]:hover:scale-[1.06] data-[completed]:hover:-translate-y-0.5"
      data-locked={isLocked ? "" : undefined}
      data-unlocked={isUnlocked ? "" : undefined}
      data-completed={isCompleted ? "" : undefined}
      aria-pressed={false}
      aria-label={isLocked ? `${node.title} (locked)` : isCompleted ? `${node.title} (completed)` : node.title}
    >
      <div
        className={`flex w-full flex-col items-center rounded-xl border bg-white px-2 py-2 text-left transition-[box-shadow,opacity] duration-200 ease-out ${shadowClass}
          data-[locked]:scale-[var(--practice-locked-scale)] data-[locked]:opacity-[var(--practice-locked-tile-opacity)]
          data-[unlocked]:z-10 data-[unlocked]:scale-[var(--practice-node-active-scale)] data-[unlocked]:border-2 data-[unlocked]:border-practice-glow-active/50 data-[unlocked]:bg-white data-[unlocked]:animate-practice-idle-pulse data-[unlocked]:animate-practice-idle-glow data-[unlocked]:hover:shadow-practice-node-hover data-[unlocked]:active:scale-[0.98] data-[unlocked]:active:shadow-practice-node-active
          data-[current]:ring-2 data-[current]:ring-sky-500/60 data-[current]:shadow-[0_0_0_4px_rgba(59,130,246,0.25),0_14px_40px_rgba(59,130,246,0.22)] data-[current]:hover:ring-sky-500/70 data-[current]:hover:shadow-[0_0_0_4px_rgba(59,130,246,0.32),0_14px_40px_rgba(59,130,246,0.26)]
          data-[completed]:ring-2 data-[completed]:ring-green-500/40 data-[completed]:shadow-[0_0_0_4px_rgba(34,197,94,0.20),0_10px_30px_rgba(34,197,94,0.18)] data-[completed]:hover:ring-green-500/55 data-[completed]:hover:shadow-[0_0_0_4px_rgba(34,197,94,0.30),0_10px_30px_rgba(34,197,94,0.25)] data-[completed]:opacity-90 data-[completed]:border-practice-node-border
          ${runCompletionSequence ? "completion-sequence-node-pop" : ""}
          border-practice-node-border ${isCurrent ? "animate-node-bounce" : ""}`}
        data-locked={isLocked ? "" : undefined}
        data-unlocked={isUnlocked ? "" : undefined}
        data-current={isCurrent ? "" : undefined}
        data-completed={isCompleted ? "" : undefined}
      >
      {/* Difficulty badge — top (active = bold; completed = soft; locked = muted) */}
      <span
        className={`mb-1 w-full text-center text-[9px] font-semibold uppercase tracking-wider ${
          isCompleted ? "text-practice-glow-completed/90" : isUnlocked ? "text-practice-glow-active font-bold" : "text-text-secondary/80"
        }`}
      >
        {node.difficulty}
      </span>

      {/* Large acronym — center (active = prominent; completed = soft green; locked = faint). Checkmark snaps in on completion. */}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-bold tabular-nums ${
          isCompleted
            ? "bg-practice-glow-completed/12 text-practice-glow-completed/90"
            : isUnlocked
              ? "bg-practice-glow-active/15 text-practice-glow-active"
              : "bg-black/[0.06] text-text-secondary/70"
        }`}
      >
        {isCompleted ? (
          <span
            className={runCompletionSequence ? "completion-sequence-check-snap inline-block origin-center" : ""}
            style={runCompletionSequence ? { transform: "scale(0)", opacity: 0 } : undefined}
          >
            ✓
          </span>
        ) : (
          getNodeAcronym(node)
        )}
      </span>

      {/* Lesson title (active = full weight; completed/locked = softer) */}
      <span
        className={`mt-1 line-clamp-2 max-w-full text-center text-[11px] leading-tight ${
          isUnlocked ? "font-semibold text-text-primary" : isCompleted ? "font-medium text-text-primary/90" : "font-medium text-text-secondary/70"
        }`}
      >
        {node.title}
      </span>

      {/* Small salary reward (recedes when not active). On completion, "+$X" floats up. */}
      <span
        className={`relative mt-0.5 text-[9px] ${isUnlocked ? "font-semibold text-text-secondary" : "font-medium text-text-secondary/60"}`}
      >
        +{formatSalary(node.salaryReward)}
        {runCompletionSequence && (
          <span
            className="completion-sequence-salary-float xp-gain-glow absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-semibold text-practice-glow-completed"
            aria-hidden
          >
            +{formatSalary(node.salaryReward)}
          </span>
        )}
      </span>
      </div>

      {/* Completed: small check badge — satisfying but secondary */}
      {isCompleted && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-practice-glow-completed/90 text-white text-[8px] shadow-practice-node-rest"
          aria-hidden
        >
          ✓
        </span>
      )}

      {/* Locked: blur + opacity overlay so tile recedes */}
      {isLocked && (
        <span
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-[var(--practice-locked-blur)]"
          style={{ opacity: "var(--practice-locked-opacity)" }}
          aria-hidden
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-black/[0.08] text-xs">
            🔒
          </span>
        </span>
      )}
    </button>
  );
}
