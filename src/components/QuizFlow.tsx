"use client";

import { useState, useMemo } from "react";
import type { Node, Question } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { getNodeById } from "@/lib/curriculum";
import { getQuestionsForNode } from "@/lib/questionBank";

/** Quiz mode only shows multiple-choice questions (choices + correctIndex). */
type QuizItem = {
  nodeId: string;
  nodeTitle: string;
  question: Question & { choices: string[]; correctIndex: number };
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Only multiple-choice questions (with choices + correctIndex) are shown in quiz mode. */
function isMultipleChoiceQuestion(q: Question): q is Question & { choices: string[]; correctIndex: number } {
  return "choices" in q && "correctIndex" in q && !("correctIndices" in q);
}

function buildQuizPool(progress: Progress): QuizItem[] {
  const pool: QuizItem[] = [];
  for (const nodeId of progress.completedNodeIds) {
    const node = getNodeById(nodeId);
    if (!node) continue;
    const nodeQuestions = getQuestionsForNode(nodeId);
    for (const q of nodeQuestions) {
      if (isMultipleChoiceQuestion(q)) {
        pool.push({ nodeId, nodeTitle: node.title, question: q });
      }
    }
  }
  return shuffle(pool);
}

interface QuizFlowProps {
  progress: Progress;
}

export function QuizFlow({ progress }: QuizFlowProps) {
  const pool = useMemo(() => buildQuizPool(progress), [progress]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [phase, setPhase] = useState<"quiz" | "done">("quiz");

  const item = pool[index];
  const total = pool.length;
  const correct = item && selected === item.question.correctIndex;
  const isLast = index >= total - 1;

  const handleChoice = (choiceIndex: number) => {
    if (showFeedback) return;
    setSelected(choiceIndex);
    setShowFeedback(true);
    if (choiceIndex === item.question.correctIndex) {
      setScore((s) => s + 1);
      setCorrectStreak((c) => c + 1);
    } else {
      setCorrectStreak(0);
    }
  };

  const handleNext = () => {
    if (isLast) {
      setPhase("done");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setShowFeedback(false);
  };

  if (pool.length === 0) {
    return (
      <div className="rounded-2xl bg-surface-raised p-8 shadow-card text-center">
        <h2 className="text-xl font-bold text-text-primary">No questions yet</h2>
        <p className="mt-2 text-text-secondary">
          Complete nodes in Practice to unlock quiz questions here.
        </p>
      </div>
    );
  }

  if (phase === "done") {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const encouragement =
      pct >= 80 ? "You're on fire! 🔥" : pct >= 60 ? "Nice work! Keep it up." : "Keep practicing — you've got this.";
    return (
      <div className="rounded-2xl bg-surface-raised p-8 shadow-card text-center">
        <h2 className="text-2xl font-bold text-text-primary">Quiz complete</h2>
        <p className="mt-4 text-3xl font-bold text-brand-accent">
          {score} / {total} correct
        </p>
        <p className="mt-2 text-text-secondary">{pct}%</p>
        <p className="mt-6 font-semibold text-text-primary">{encouragement}</p>
        <p className="mt-2 text-sm text-text-secondary">
          Quiz mode does not change your salary. Practice nodes to earn more.
        </p>
      </div>
    );
  }

  if (!item) return null;

  const { question } = item;

  return (
    <div className="rounded-2xl bg-surface-raised p-6 shadow-card">
      <div className="mb-4 flex justify-between text-sm text-text-secondary">
        <span>Question {index + 1} of {total}</span>
        <span>{score} correct</span>
      </div>
      {correctStreak >= 2 && (
        <p className="mb-3 text-sm font-semibold text-success">{correctStreak} in a row!</p>
      )}
      <p className="text-base font-semibold text-text-primary">{question.prompt}</p>
      <p className="mt-1 text-xs text-text-secondary">From: {item.nodeTitle}</p>
      <div className="mt-5 space-y-3">
        {question.choices.map((choice, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          const showCorrect = showFeedback && isCorrect;
          const showWrong = showFeedback && isSelected && !correct;
          return (
            <button
              key={i}
              type="button"
              disabled={showFeedback && !showWrong}
              onClick={() => handleChoice(i)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                showCorrect
                  ? "border-success bg-success/15 text-text-primary"
                  : showWrong
                    ? "border-error bg-error/10 text-text-primary"
                    : isSelected
                      ? "border-brand-primary bg-brand-primary/10 text-text-primary"
                      : "border-black/10 bg-surface-base text-text-primary hover:border-brand-primary/30"
              } ${showFeedback && !showWrong && !showCorrect ? "opacity-60" : ""}`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="mt-5 rounded-xl bg-black/5 p-4">
          <p className={`text-sm font-semibold ${correct ? "text-success" : "text-error"}`}>
            {correct ? "Correct!" : "Not quite"}
          </p>
          <p className="mt-2 text-sm text-text-secondary">{question.explainLikeIm5}</p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-4 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {isLast ? "See results" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
