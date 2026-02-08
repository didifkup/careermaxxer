"use client";

/**
 * Modal for learning a node: lesson → quiz (or celebration step for Celebration nodes).
 * Binge pacing: Celebration nodes skip quiz (short recap + light confetti); max questions per node enforced.
 */
import { useEffect, useCallback, useState } from "react";
import type { Node } from "@/lib/curriculum";
import { MAX_QUESTIONS_PER_NODE } from "@/lib/curriculum";
import { getCoreQuestionsForNode, getDrillQuestionsForNode, DRILL_QUESTIONS_MAX } from "@/lib/questionBank";
import { formatSalary } from "@/lib/format";
import { QuestionFlow } from "@/components/QuestionFlow";
import { PostCompleteView } from "@/components/PostCompleteView";
import type { PostCompleteData } from "@/components/PostCompleteView";
import { fireConfettiLight } from "@/lib/confetti";

type Step = "lesson" | "quiz" | "celebration";

interface LearningModalProps {
  open: boolean;
  node: Node | null;
  postCompleteData: PostCompleteData | null;
  onClose: () => void;
  onComplete?: () => void;
  onOpenNextNode?: (nextNode: Node) => void;
  onShowNextReward?: () => void;
}

const BULLETS_MAX = 4;

export function LearningModal({
  open,
  node,
  postCompleteData,
  onClose,
  onComplete,
  onOpenNextNode,
  onShowNextReward,
}: LearningModalProps) {
  const [step, setStep] = useState<Step>("lesson");
  const [drillModeNode, setDrillModeNode] = useState<Node | null>(null);

  const resetState = useCallback(() => {
    setStep("lesson");
    setDrillModeNode(null);
  }, []);

  useEffect(() => {
    if (!open) resetState();
  }, [open, resetState]);

  useEffect(() => {
    if (node) setStep("lesson");
  }, [node]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleStartQuestions = () => setStep("quiz");
  // Celebration nodes (Easy → Easy → Medium → Celebration): no quiz, just recap + reward + light confetti.
  const handleStartCelebration = () => setStep("celebration");

  /** Called when user clicks Continue on Node Complete; parent persists and shows post-complete view. */
  const handleFlowComplete = () => {
    onComplete?.();
  };

  const handleStartDrill = () => {
    if (postCompleteData?.completedNode) setDrillModeNode(postCompleteData.completedNode);
  };

  const handleDrillFlowComplete = () => {
    setDrillModeNode(null);
  };

  const showingPostComplete = Boolean(postCompleteData);
  const isCelebrationNode = node?.difficulty === "Celebration";
  const inDrillMode = Boolean(drillModeNode);
  // Core quiz: beginner-friendly questions (blocks progression).
  const questions =
    node && node.difficulty !== "Celebration"
      ? getCoreQuestionsForNode(node.id, MAX_QUESTIONS_PER_NODE)
      : [];
  const drillQuestions = drillModeNode
    ? getDrillQuestionsForNode(drillModeNode.id, DRILL_QUESTIONS_MAX)
    : [];
  const hasDrillForCompleted =
    postCompleteData && getDrillQuestionsForNode(postCompleteData.completedNode.id, 1).length > 0;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex p-4 max-sm:items-end max-sm:justify-center max-sm:p-0 sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="learning-modal-title"
    >
      {/* Backdrop — fades in */}
      <div
        className="absolute inset-0 bg-black/50 animate-[fade-in_0.2s_ease-out_forwards]"
        onClick={handleOverlayClick}
        aria-hidden
      />

      {/* Panel — centered on desktop, bottom sheet on mobile */}
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-surface-raised shadow-elevated flex flex-col animate-[slide-up_0.3s_ease-out] max-sm:max-h-[85vh] max-sm:rounded-b-none max-sm:rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: progress + title + floor */}
        <div className="shrink-0 border-b border-black/5 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-text-secondary">
              {showingPostComplete ? "Nice work" : step === "lesson" ? (isCelebrationNode ? "Lesson" : "Lesson 1/2") : step === "celebration" ? "Recap" : "Quiz 2/2"}
            </span>
            {node && !showingPostComplete && (
              <span className="rounded-full bg-brand-primary/15 px-2.5 py-0.5 text-xs font-semibold text-brand-primary">
                Floor {node.floorNumber}
              </span>
            )}
          </div>
          <h2 id="learning-modal-title" className="mt-1 text-lg font-bold text-text-primary">
            {inDrillMode && drillModeNode
              ? `Drill: ${drillModeNode.title}`
              : showingPostComplete && postCompleteData
                ? postCompleteData.completedNode.title
                : node?.title ?? ""}
          </h2>
        </div>

        {/* Content area — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {inDrillMode && drillModeNode && drillQuestions.length > 0 && (
            <QuestionFlow
              node={drillModeNode}
              questions={drillQuestions}
              onComplete={handleDrillFlowComplete}
              isDrill
            />
          )}
          {showingPostComplete && postCompleteData && !inDrillMode && (
            <PostCompleteView
              data={postCompleteData}
              onKeepGoing={onShowNextReward ?? (() => {})}
              onTakeBreak={onClose}
              onShowNextReward={onShowNextReward ?? (() => {})}
              onOneMore={onOpenNextNode ?? (() => {})}
              onStartDrill={hasDrillForCompleted ? handleStartDrill : undefined}
            />
          )}
          {!showingPostComplete && !inDrillMode && step === "lesson" && node && (
            <LessonContent node={node} />
          )}
          {!showingPostComplete && !inDrillMode && step === "quiz" && node && questions.length > 0 && (
            <QuestionFlow
              node={node}
              questions={questions}
              onComplete={handleFlowComplete}
            />
          )}
          {!showingPostComplete && !inDrillMode && step === "celebration" && node && isCelebrationNode && (
            <CelebrationCompleteScreen node={node} onContinue={handleFlowComplete} />
          )}
        </div>

        {/* Footer: primary action (only when lesson step, not post-complete) */}
        {!showingPostComplete && step === "lesson" && node && (
          <div className="shrink-0 border-t border-black/5 px-5 py-4">
            <button
              type="button"
              onClick={isCelebrationNode ? handleStartCelebration : handleStartQuestions}
              className="w-full rounded-xl bg-brand-accent py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
            >
              {isCelebrationNode ? "Continue" : "Got it → Start Questions"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Celebration node: no questions — short recap, salary reward, lighter confetti, then Continue. */
function CelebrationCompleteScreen({ node, onContinue }: { node: Node; onContinue: () => void }) {
  useEffect(() => {
    fireConfettiLight();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <div className="rounded-full bg-success/15 p-5 animate-[bounce-soft_0.8s_ease-out]">
        <span className="text-4xl" aria-hidden>✨</span>
      </div>
      <h3 className="text-lg font-bold text-text-primary">Recap</h3>
      <p className="text-sm text-text-secondary">{node.lesson.recap}</p>
      <p className="text-lg font-semibold text-success">
        + {formatSalary(node.salaryReward)} added to your salary
      </p>
      <p className="text-xs text-text-secondary">You&apos;re building your salary.</p>
      <button
        type="button"
        onClick={onContinue}
        className="w-full max-w-xs rounded-xl bg-brand-accent py-4 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
      >
        Continue
      </button>
    </div>
  );
}

function LessonContent({ node }: { node: Node }) {
  const { lesson } = node;
  const bullets = lesson.bullets.slice(0, BULLETS_MAX);

  return (
    <div className="space-y-5">
      <p className="text-base font-semibold leading-snug text-text-primary">
        {lesson.headline}
      </p>
      {bullets.length > 0 && (
        <ul className="space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-text-primary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="rounded-xl bg-brand-primary/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          Like you&apos;re 5
        </p>
        <p className="mt-2 text-sm leading-snug text-text-primary">
          {lesson.analogy}
        </p>
      </div>
      <p className="text-sm font-medium text-text-secondary">
        {lesson.recap}
      </p>
    </div>
  );
}

