"use client";

import { useState, useEffect } from "react";
import type { Node, Question } from "@/lib/curriculum";
import { fireConfetti } from "@/lib/confetti";
import { formatSalary } from "@/lib/format";

type Phase = "question" | "complete";

function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function isMultipleChoice(q: Question): q is Question & { choices: string[]; correctIndex: number } {
  return "choices" in q && "correctIndex" in q && !("correctIndices" in q);
}
function isFillInBlank(q: Question): q is Question & { type: "fillInBlank"; correctAnswer: string } {
  return (q as { type?: string }).type === "fillInBlank";
}
function isTapAllThatApply(q: Question): q is Question & { choices: string[]; correctIndices: number[] } {
  return (q as { type?: string }).type === "tapAllThatApply";
}
function isTrueFalse(q: Question): q is Question & { correctAnswer: boolean } {
  return (q as { type?: string }).type === "trueFalse";
}
function isOrderSteps(q: Question): q is Question & { steps: string[]; correctOrder: number[] } {
  return (q as { type?: string }).type === "orderSteps";
}

function shuffleIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getExplain(q: Question): string {
  return "explainLikeIm5" in q && typeof (q as { explainLikeIm5?: string }).explainLikeIm5 === "string"
    ? (q as { explainLikeIm5: string }).explainLikeIm5
    : "";
}

interface QuestionFlowProps {
  node: Node;
  questions: Question[];
  onComplete: () => void;
  /** When true, completion shows XP reward instead of salary (drill mode). */
  isDrill?: boolean;
}

export function QuestionFlow({ node, questions, onComplete, isDrill }: QuestionFlowProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [fillInAnswer, setFillInAnswer] = useState("");
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [orderIndices, setOrderIndices] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [phase, setPhase] = useState<Phase>("question");

  const total = questions.length;
  const currentQuestion = questions[questionIndex];

  const correct = (() => {
    if (!currentQuestion) return false;
    if (isMultipleChoice(currentQuestion)) {
      return selectedChoice === currentQuestion.correctIndex;
    }
    if (isFillInBlank(currentQuestion)) {
      return showFeedback && normalizeAnswer(fillInAnswer) === normalizeAnswer(currentQuestion.correctAnswer);
    }
    if (isTapAllThatApply(currentQuestion)) {
      if (!showFeedback) return false;
      const a = [...selectedIndices].sort((a, b) => a - b);
      const b = [...currentQuestion.correctIndices].sort((a, b) => a - b);
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }
    if (isTrueFalse(currentQuestion)) {
      const expectedIndex = currentQuestion.correctAnswer ? 0 : 1;
      return selectedChoice === expectedIndex;
    }
    if (isOrderSteps(currentQuestion)) {
      if (!showFeedback || orderIndices.length !== currentQuestion.correctOrder.length) return false;
      return orderIndices.every((v, i) => v === currentQuestion.correctOrder[i]);
    }
    return false;
  })();

  const isLast = questionIndex >= total - 1;

  const handleChoice = (choiceIndex: number) => {
    if (showFeedback) return;
    const q = currentQuestion;
    if (q && isTapAllThatApply(q)) {
      setSelectedIndices((prev) =>
        prev.includes(choiceIndex) ? prev.filter((i) => i !== choiceIndex) : [...prev, choiceIndex]
      );
      return;
    }
    if (q && isTrueFalse(q)) {
      setSelectedChoice(choiceIndex);
      setShowFeedback(true);
      return;
    }
    setSelectedChoice(choiceIndex);
    setShowFeedback(true);
  };

  const handleSubmitTapAll = () => {
    if (showFeedback) return;
    setShowFeedback(true);
  };

  const handleSubmitFillIn = () => {
    if (showFeedback) return;
    setShowFeedback(true);
  };

  const handleSubmitOrderSteps = () => {
    if (showFeedback) return;
    setShowFeedback(true);
  };

  const moveStep = (fromPos: number, direction: "up" | "down") => {
    if (showFeedback) return;
    const toPos = direction === "up" ? fromPos - 1 : fromPos + 1;
    if (toPos < 0 || toPos >= orderIndices.length) return;
    const next = [...orderIndices];
    [next[fromPos], next[toPos]] = [next[toPos], next[fromPos]];
    setOrderIndices(next);
  };

  useEffect(() => {
    if (currentQuestion && isOrderSteps(currentQuestion) && orderIndices.length !== currentQuestion.steps.length) {
      setOrderIndices(shuffleIndices(currentQuestion.steps.length));
    }
  }, [questionIndex, currentQuestion]);

  useEffect(() => {
    if (phase === "complete") fireConfetti();
  }, [phase]);

  const handleNext = () => {
    if (isLast) {
      setPhase("complete");
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelectedChoice(null);
    setFillInAnswer("");
    setSelectedIndices([]);
    setOrderIndices([]);
    setShowFeedback(false);
  };

  const handleRetry = () => {
    setSelectedChoice(null);
    setFillInAnswer("");
    setSelectedIndices([]);
    if (currentQuestion && isOrderSteps(currentQuestion)) {
      setOrderIndices(shuffleIndices(currentQuestion.steps.length));
    }
    setShowFeedback(false);
  };

  const handleContinue = () => {
    onComplete();
  };

  if (phase === "complete") {
    return (
      <NodeCompleteScreen
        salaryReward={node.salaryReward}
        onContinue={handleContinue}
        isDrill={isDrill}
      />
    );
  }

  if (!currentQuestion) return null;

  const explain = getExplain(currentQuestion);

  return (
    <div className="flex flex-col gap-6">
      {/* Progress dots */}
      <div className="flex justify-center gap-2" aria-label={`Question ${questionIndex + 1} of ${total}`}>
        {questions.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              i < questionIndex ? "bg-success scale-100" : i === questionIndex ? "bg-brand-primary scale-125" : "bg-black/20"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <p className="text-base font-semibold text-text-primary">{currentQuestion.prompt}</p>

      {/* Multiple choice or True/False */}
      {(isMultipleChoice(currentQuestion) || isTrueFalse(currentQuestion)) && (
        <div className="space-y-3">
          {(isTrueFalse(currentQuestion)
            ? ["True", "False"]
            : currentQuestion.choices
          ).map((choice, i) => {
            const correctIndex = isTrueFalse(currentQuestion)
              ? (currentQuestion.correctAnswer ? 0 : 1)
              : currentQuestion.correctIndex;
            const isSelected = selectedChoice === i;
            const isCorrectChoice = i === correctIndex;
            const showCorrect = showFeedback && isCorrectChoice;
            const showWrong = showFeedback && isSelected && !correct;
            return (
              <button
                key={i}
                type="button"
                disabled={showFeedback && !showWrong}
                onClick={() => handleChoice(i)}
                className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
                  showCorrect
                    ? "border-success bg-success/15 text-text-primary shadow-[0_0_0_2px_hsl(var(--color-success)/0.3)]"
                    : showWrong
                      ? "border-error bg-error/10 text-text-primary"
                      : isSelected
                        ? "border-brand-primary bg-brand-primary/10 text-text-primary"
                        : "border-black/10 bg-surface-base text-text-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 active:scale-[0.99]"
                } ${showFeedback && !showWrong && !showCorrect ? "opacity-60" : ""}`}
              >
                {choice}
              </button>
            );
          })}
        </div>
      )}

      {/* Fill in the blank */}
      {isFillInBlank(currentQuestion) && (
        <div className="space-y-3">
          <input
            type="text"
            value={fillInAnswer}
            onChange={(e) => setFillInAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitFillIn()}
            disabled={showFeedback}
            placeholder="Type your answer..."
            className="w-full rounded-2xl border-2 border-black/10 bg-surface-base px-5 py-4 text-sm font-medium text-text-primary placeholder:text-text-secondary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
            aria-label="Your answer"
          />
          {!showFeedback && (
            <button
              type="button"
              onClick={handleSubmitFillIn}
              className="w-full rounded-xl bg-brand-accent py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
            >
              Check
            </button>
          )}
        </div>
      )}

      {/* Order steps */}
      {isOrderSteps(currentQuestion) && (
        <div className="space-y-3">
          {orderIndices.length === currentQuestion.steps.length &&
            orderIndices.map((stepIndex, pos) => (
              <div
                key={stepIndex}
                className="flex items-center gap-2 rounded-2xl border-2 border-black/10 bg-surface-base px-4 py-3"
              >
                <span className="text-sm font-medium text-text-secondary w-6">{pos + 1}.</span>
                <span className="flex-1 text-sm font-medium text-text-primary">
                  {currentQuestion.steps[stepIndex]}
                </span>
                {!showFeedback && (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveStep(pos, "up")}
                      disabled={pos === 0}
                      className="rounded-lg border border-black/20 px-2 py-1 text-xs font-semibold text-text-primary hover:bg-black/5 disabled:opacity-40"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(pos, "down")}
                      disabled={pos === orderIndices.length - 1}
                      className="rounded-lg border border-black/20 px-2 py-1 text-xs font-semibold text-text-primary hover:bg-black/5 disabled:opacity-40"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            ))}
          {!showFeedback && orderIndices.length > 0 && (
            <button
              type="button"
              onClick={handleSubmitOrderSteps}
              className="w-full rounded-xl bg-brand-accent py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
            >
              Check
            </button>
          )}
        </div>
      )}

      {/* Tap all that apply */}
      {isTapAllThatApply(currentQuestion) && (
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, i) => {
            const isSelected = selectedIndices.includes(i);
            const isCorrect = currentQuestion.correctIndices.includes(i);
            const showCorrect = showFeedback && isCorrect;
            const showWrong = showFeedback && isSelected && !isCorrect;
            const showCorrectSelected = showFeedback && isSelected && isCorrect;
            return (
              <button
                key={i}
                type="button"
                disabled={showFeedback}
                onClick={() => handleChoice(i)}
                className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
                  showCorrectSelected
                    ? "border-success bg-success/15 text-text-primary shadow-[0_0_0_2px_hsl(var(--color-success)/0.3)]"
                    : showWrong
                      ? "border-error bg-error/10 text-text-primary"
                      : showCorrect
                        ? "border-success bg-success/10 text-text-primary"
                        : isSelected
                          ? "border-brand-primary bg-brand-primary/10 text-text-primary"
                          : "border-black/10 bg-surface-base text-text-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 active:scale-[0.99]"
                } ${showFeedback ? "opacity-90" : ""}`}
              >
                {choice}
              </button>
            );
          })}
          {!showFeedback && (
            <button
              type="button"
              onClick={handleSubmitTapAll}
              disabled={selectedIndices.length === 0}
              className="w-full rounded-xl bg-brand-accent py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              Check
            </button>
          )}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`rounded-2xl border-2 p-4 transition-all ${
            correct
              ? "animate-[bounce-soft_0.5s_ease-out] border-success bg-success/10"
              : "border-error/30 bg-error/5"
          }`}
        >
          {correct ? (
            <>
              <p className="font-semibold text-success">Correct!</p>
              {explain && <p className="mt-2 text-sm text-text-secondary">{explain}</p>}
              <button
                type="button"
                onClick={handleNext}
                className="mt-4 w-full rounded-xl bg-brand-accent py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
              >
                {isLast ? "See results" : "Next"}
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-error">Not quite</p>
              {explain && (
                <>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
                    Explain like I&apos;m 5
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">{explain}</p>
                </>
              )}
              <button
                type="button"
                onClick={handleRetry}
                className="mt-4 w-full rounded-xl border-2 border-brand-primary bg-brand-primary/10 py-3 font-semibold text-brand-primary transition hover:bg-brand-primary/20 active:scale-[0.99]"
              >
                Try again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface NodeCompleteScreenProps {
  salaryReward: number;
  onContinue: () => void;
  isDrill?: boolean;
}

function NodeCompleteScreen({ salaryReward, onContinue, isDrill }: NodeCompleteScreenProps) {
  if (isDrill) {
    return (
      <div className="flex flex-col items-center gap-6 py-4 text-center">
        <div className="rounded-full bg-brand-primary/15 p-4">
          <span className="text-4xl" aria-hidden>⚡</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary">Drill complete</h3>
        <p className="text-lg font-semibold text-brand-primary">+50 XP</p>
        <p className="text-sm text-text-secondary">You sharpened your edge.</p>
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
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <div className="rounded-full bg-success/20 p-4">
        <span className="text-4xl" aria-hidden>🎉</span>
      </div>
      <h3 className="text-xl font-bold text-text-primary">Node complete</h3>
      <p className="text-lg font-semibold text-success">
        + {formatSalary(salaryReward)} added to your salary
      </p>
      <p className="text-sm text-text-secondary">
        You&apos;re building your salary. Your wolf looks sharper today.
      </p>
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
