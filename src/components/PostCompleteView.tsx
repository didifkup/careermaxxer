"use client";

/**
 * Post-complete UI: Rewards (salary, confidence, completion) and Landings (breathers).
 * Views: nextReward (one-more preview), midSessionPeak (after 3rd node), breather (after 4th), celebration (legacy).
 * See src/types/practice-game.ts for Tower/Floor/Node/Stairs/Landing/Rewards.
 */
import type { Node } from "@/lib/curriculum";
import { formatSalary } from "@/lib/format";
import { BINGE_CALM_MODE_AFTER_NODES } from "@/lib/constants";
import { FLOOR_COMPLETIONS } from "@/data/floors";

export type PostCompleteViewType = "breather" | "celebration" | "midSessionPeak" | "nextReward";

export interface PostCompleteData {
  view: PostCompleteViewType;
  nextNode: Node | null;
  sessionCompletedCount: number;
  completedNode: Node;
  /** Current floor from progress (for mid-session peak). */
  currentFloor?: number;
}

interface PostCompleteViewProps {
  data: PostCompleteData;
  onKeepGoing: () => void;
  onTakeBreak: () => void;
  onShowNextReward: () => void;
  onOneMore: (nextNode: Node) => void;
  /** Override calm mode; when unset, derived from sessionCompletedCount >= BINGE_CALM_MODE_AFTER_NODES. */
  calmMode?: boolean;
  /** When set, show "Sharpen your edge (Drill Mode) →" (optional practice; does not block progression). */
  onStartDrill?: () => void;
}

export function PostCompleteView({
  data,
  onKeepGoing,
  onTakeBreak,
  onShowNextReward,
  onOneMore,
  calmMode,
  onStartDrill,
}: PostCompleteViewProps) {
  // Soft burnout prevention: after 4 nodes, calmer colors and slower transitions (no guilt language).
  const isCalm = calmMode ?? data.sessionCompletedCount >= BINGE_CALM_MODE_AFTER_NODES;
  const transitionClass = isCalm ? "transition-all duration-500" : "transition-all duration-300";

  const drillButton = onStartDrill ? (
    <button
      type="button"
      onClick={onStartDrill}
      className="mx-auto rounded-xl border-2 border-brand-primary/30 bg-brand-primary/5 px-6 py-3 font-semibold text-brand-primary transition hover:bg-brand-primary/10 active:scale-[0.99]"
    >
      Sharpen your edge (Drill Mode) →
    </button>
  ) : null;

  if (data.view === "midSessionPeak") {
    return (
      <div className={`flex flex-col gap-6 py-4 text-center ${transitionClass}`}>
        <div className="rounded-full bg-brand-primary/20 p-5 animate-[bounce-soft_0.7s_ease-out]">
          <span className="text-4xl" aria-hidden>🏆</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary">Promotion unlocked</h3>
        <p className="text-base font-medium text-text-primary">
          You&apos;re thinking like an investment banker.
        </p>
        {data.currentFloor != null && (
          <div className="rounded-xl border-2 border-brand-primary/30 bg-brand-primary/10 px-4 py-3">
            <p className="text-xs text-text-secondary">Your office floor</p>
            <p className="text-2xl font-bold text-brand-primary">Floor {data.currentFloor}</p>
          </div>
        )}
        <button
          type="button"
          onClick={onShowNextReward}
          className="mx-auto rounded-xl bg-brand-accent px-8 py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
        >
          Continue
        </button>
        {drillButton}
      </div>
    );
  }

  if (data.view === "breather") {
    return (
      <div className={`flex flex-col gap-6 rounded-2xl bg-practice-landing-bg py-4 text-center ${transitionClass} ${isCalm ? "text-text-primary" : ""}`}>
        <p className="text-lg font-semibold text-text-primary">
          You&apos;re on fire 🔥 Want a 60-second breather?
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onKeepGoing}
            className={`rounded-xl px-6 py-3.5 font-semibold shadow-card transition active:scale-[0.99] ${isCalm ? "bg-success/90 text-white duration-500" : "bg-brand-accent text-white hover:opacity-95"}`}
          >
            Keep going
          </button>
          <button
            type="button"
            onClick={onTakeBreak}
            className="rounded-xl border-2 border-black/15 bg-surface-base px-6 py-3.5 font-semibold text-text-primary transition hover:bg-black/5 active:scale-[0.99]"
          >
            Take a break
          </button>
        </div>
        {drillButton}
      </div>
    );
  }

  if (data.view === "celebration") {
    return (
      <div className="flex flex-col gap-6 py-4 text-center">
        <div className="animate-[bounce-soft_0.6s_ease-out] rounded-full bg-success/20 p-6">
          <span className="text-5xl" aria-hidden>🌟</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary">Celebration node</h3>
        <p className="text-sm text-text-secondary">
          {data.completedNode.lesson.recap}
        </p>
        <p className="text-lg font-semibold text-success">
          + {formatSalary(data.completedNode.salaryReward)} added to salary
        </p>
        <button
          type="button"
          onClick={onShowNextReward}
          className="mx-auto rounded-xl bg-brand-accent px-8 py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
        >
          Continue
        </button>
        {drillButton}
      </div>
    );
  }

  if (data.view === "nextReward") {
    if (!data.nextNode) {
      return (
        <div className={`flex flex-col gap-6 py-4 text-center ${transitionClass}`}>
          <p className="text-lg font-semibold text-text-primary">All caught up!</p>
          <button
            type="button"
            onClick={onTakeBreak}
            className="mx-auto rounded-xl bg-brand-accent px-8 py-3.5 font-semibold text-white shadow-card transition hover:opacity-95"
          >
            Done
          </button>
        </div>
      );
    }
    const floorCompletion = FLOOR_COMPLETIONS.find(
      (c) => c.nodeId === data.completedNode.id
    );
    return (
      <div className={`flex flex-col gap-6 py-4 text-center ${transitionClass}`}>
        {floorCompletion && (
          <div className="rounded-2xl border-2 border-success/30 bg-success/10 p-4">
            <p className="text-base font-bold text-text-primary">
              {floorCompletion.message}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {floorCompletion.nextFloor} is now unlocked.
            </p>
          </div>
        )}
        <div className={`rounded-2xl border-2 p-5 ${isCalm ? "border-success/30 bg-success/5" : "border-brand-primary/20 bg-brand-primary/5 shadow-[0_0_20px_rgba(10,36,99,0.15)]"}`}>
          <p className="text-sm font-medium text-text-secondary">Next reward</p>
          <p className="text-lg font-bold text-text-primary">{data.nextNode.title}</p>
          <p className="text-success font-semibold">+ {formatSalary(data.nextNode.salaryReward)}</p>
        </div>
        <button
          type="button"
          onClick={() => onOneMore(data.nextNode!)}
          className="mx-auto rounded-xl bg-brand-accent px-8 py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
        >
          One more →
        </button>
        <button
          type="button"
          onClick={onTakeBreak}
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition"
        >
          Save & come back
        </button>
        {drillButton}
      </div>
    );
  }

  return null;
}
