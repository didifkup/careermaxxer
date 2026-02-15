"use client";

import type { Node } from "@/lib/curriculum";
import type { NodeDifficulty } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { isNodeUnlocked } from "@/lib/progress";
import { formatSalary } from "@/lib/format";

type NodeState = "locked" | "unlocked" | "completed";

const DIFFICULTY_LABEL: Record<NodeDifficulty, string> = {
  Easy: "Foundation",
  Medium: "Intermediate",
  Celebration: "Advanced",
};

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

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex w-[96px] flex-col items-center transition-transform duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[locked]:cursor-not-allowed data-[unlocked]:cursor-pointer data-[unlocked]:hover:scale-[1.05] data-[unlocked]:hover:-translate-y-0.5 data-[completed]:cursor-pointer data-[completed]:hover:scale-[1.02] data-[completed]:hover:-translate-y-0.5"
      data-locked={isLocked ? "" : undefined}
      data-unlocked={isUnlocked ? "" : undefined}
      data-completed={isCompleted ? "" : undefined}
      aria-pressed={false}
      aria-label={isLocked ? `${node.title} (locked)` : isCompleted ? `${node.title} (completed)` : node.title}
    >
      <div
        className={`flex w-full flex-col items-center rounded-2xl border border-blue-100/70 bg-white/80 px-2 py-2 text-left shadow-[0_8px_24px_rgba(37,99,235,0.08)] transition-all duration-200 ease-out
          data-[locked]:scale-[var(--practice-locked-scale)] data-[locked]:opacity-[var(--practice-locked-tile-opacity)]
          data-[unlocked]:z-10 data-[unlocked]:scale-[var(--practice-node-active-scale)] data-[unlocked]:border-blue-200/70 data-[unlocked]:shadow-[0_12px_32px_rgba(37,99,235,0.12)] data-[unlocked]:animate-practice-idle-pulse data-[unlocked]:animate-practice-idle-glow data-[unlocked]:hover:border-blue-300 data-[unlocked]:hover:shadow-[0_14px_36px_rgba(37,99,235,0.14)] data-[unlocked]:active:scale-[0.98]
          data-[current]:ring-2 data-[current]:ring-blue-300 data-[current]:shadow-[0_0_0_4px_rgba(59,130,246,0.2),0_14px_40px_rgba(37,99,235,0.15)] data-[current]:hover:ring-blue-400
          data-[completed]:ring-1 data-[completed]:ring-emerald-200 data-[completed]:shadow-[0_0_0_3px_rgba(34,197,94,0.12),0_8px_24px_rgba(34,197,94,0.08)] data-[completed]:hover:ring-emerald-300 data-[completed]:hover:shadow-[0_0_0_4px_rgba(34,197,94,0.18)] data-[completed]:border-emerald-100
          ${runCompletionSequence ? "completion-sequence-node-pop" : ""}
          ${isCurrent ? "animate-node-bounce" : ""}`}
        data-locked={isLocked ? "" : undefined}
        data-unlocked={isUnlocked ? "" : undefined}
        data-current={isCurrent ? "" : undefined}
        data-completed={isCompleted ? "" : undefined}
      >
      {/* Difficulty badge — Foundation / Intermediate / Advanced */}
      <span
        className={`mb-1 w-full text-center text-[9px] font-semibold uppercase tracking-wider ${
          isCompleted ? "text-emerald-600/90" : isUnlocked ? "text-blue-600 font-bold" : "text-slate-400"
        }`}
      >
        {DIFFICULTY_LABEL[node.difficulty] ?? node.difficulty}
      </span>

      {/* Large acronym — center. Checkmark snaps in on completion. */}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base font-bold tabular-nums ${
          isCompleted
            ? "bg-emerald-100/80 text-emerald-700"
            : isUnlocked
              ? "bg-blue-100/80 text-blue-700"
              : "bg-slate-100 text-slate-400"
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

      {/* Lesson title */}
      <span
        className={`mt-1 line-clamp-2 max-w-full text-center text-[11px] leading-tight ${
          isUnlocked ? "font-semibold text-slate-800" : isCompleted ? "font-medium text-slate-700" : "font-medium text-slate-400"
        }`}
      >
        {node.title}
      </span>

      {/* Small salary reward. On completion, "+$X" floats up. */}
      <span
        className={`relative mt-0.5 text-[9px] ${isUnlocked ? "font-semibold text-slate-600" : "font-medium text-slate-500"}`}
      >
        +{formatSalary(node.salaryReward)}
        {runCompletionSequence && (
          <span
            className="completion-sequence-salary-float xp-gain-glow absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-semibold text-emerald-600"
            aria-hidden
          >
            +{formatSalary(node.salaryReward)}
          </span>
        )}
      </span>
      </div>

      {/* Completed: small check badge */}
      {isCompleted && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 text-white text-[8px] shadow-sm"
          aria-hidden
        >
          ✓
        </span>
      )}

      {/* Locked: blur + opacity overlay */}
      {isLocked && (
        <span
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[var(--practice-locked-blur)]"
          style={{ opacity: "var(--practice-locked-opacity)" }}
          aria-hidden
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-slate-200/80 text-xs">
            🔒
          </span>
        </span>
      )}
    </button>
  );
}
