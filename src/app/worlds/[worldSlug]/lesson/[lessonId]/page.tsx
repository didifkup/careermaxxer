"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { SalaryHUD } from "@/components/worlds/SalaryHUD";
import { QuestionRenderer } from "@/components/worlds/QuestionRenderer";
import { getLessonById } from "@/lib/worlds";
import type {
  Question,
  MCQuestion,
  BooleanQuestion,
  FillQuestion,
  NumericQuestion,
  DragMatchQuestion,
  OrderQuestion,
} from "@/lib/worlds";
import {
  markNodeComplete,
  addSalary,
} from "@/lib/worlds/progress";
import { fireConfettiLight } from "@/lib/confetti";

function formatSalary(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

function isRunnableQuestion(
  q: Question
): q is
  | MCQuestion
  | BooleanQuestion
  | FillQuestion
  | NumericQuestion
  | DragMatchQuestion
  | OrderQuestion {
  return (
    q.type === "mc" ||
    q.type === "boolean" ||
    q.type === "fill" ||
    q.type === "numeric" ||
    q.type === "drag_match" ||
    q.type === "order"
  );
}

type Phase = "read" | "practice" | "boss" | "mastery";

// ---------------------------------------------------------------------------
// READ screen
// ---------------------------------------------------------------------------

function ReadScreen({
  lesson,
  onStart,
}: {
  lesson: { headline: string; story: string; ruleCard: string };
  onStart: () => void;
}) {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-brand-primary">
        {lesson.headline}
      </h1>
      <div className="whitespace-pre-line text-text-primary">
        {lesson.story}
      </div>
      <div className="rounded-xl border-2 border-brand-primary/20 bg-surface-base p-4">
        <p className="text-sm font-medium text-text-secondary">Rule</p>
        <p className="mt-1 text-text-primary">{lesson.ruleCard}</p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
      >
        Start Practice
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MASTERY screen
// ---------------------------------------------------------------------------

function MasteryScreen({
  badgeName,
  salaryReward,
  onBackToPath,
}: {
  badgeName: string;
  salaryReward: number;
  onBackToPath: () => void;
}) {
  return (
    <div className="space-y-6 text-center">
      <div
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20 text-4xl text-success animate-scale-pop"
        aria-hidden
      >
        ✓
      </div>
      <h2 className="font-display text-xl font-bold text-brand-primary">
        Mastery unlocked
      </h2>
      <p className="text-lg font-semibold text-text-primary">{badgeName}</p>
      <p className="text-brand-accent font-semibold">
        +{formatSalary(salaryReward)} earned
      </p>
      <button
        type="button"
        onClick={onBackToPath}
        className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
      >
        Back to Path
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LessonRunnerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const worldSlug = typeof params?.worldSlug === "string" ? params.worldSlug : "";
  const lessonId = typeof params?.lessonId === "string" ? params.lessonId : "";
  const nodeId = searchParams.get("nodeId");

  const lesson = useMemo(() => getLessonById(lessonId), [lessonId]);

  const [phase, setPhase] = useState<Phase>("read");
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [streak, setStreak] = useState(0);

  const practiceQuestions = useMemo(
    () => (lesson ? lesson.questions.filter(isRunnableQuestion) : []),
    [lesson]
  );
  const bossQuestion = lesson && isRunnableQuestion(lesson.bossQuestion) ? lesson.bossQuestion : null;
  const currentPracticeQuestion = practiceQuestions[practiceIndex];
  const practiceTotal = practiceQuestions.length;

  const handleComplete = useCallback(() => {
    if (!lesson || !worldSlug) return;
    if (nodeId) {
      markNodeComplete(nodeId);
      addSalary(lesson.mastery.salaryReward);
    }
    router.push(`/worlds/${worldSlug}`);
  }, [lesson, worldSlug, nodeId, router]);

  const handleCorrect = useCallback(() => {
    setStreak((s) => s + 1);
    if (phase === "practice") {
      if (practiceIndex + 1 >= practiceTotal) {
        setPhase("boss");
        if (!bossQuestion) {
          setPhase("mastery");
          fireConfettiLight();
        }
      } else {
        setPracticeIndex((i) => i + 1);
      }
    } else if (phase === "boss") {
      setPhase("mastery");
      fireConfettiLight();
    }
  }, [phase, practiceIndex, practiceTotal, bossQuestion]);

  const handleWrong = useCallback(() => {
    setStreak(0);
  }, []);

  if (!worldSlug) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-text-secondary">Invalid world.</p>
        <Link href="/worlds" className="mt-2 inline-block text-brand-primary underline">
          Back to Worlds
        </Link>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border-2 border-black/10 bg-surface-base p-8 text-center">
          <h2 className="font-display text-xl font-bold text-text-primary">
            Lesson not found
          </h2>
          <p className="mt-2 text-text-secondary">
            This lesson doesn&apos;t exist or has been removed.
          </p>
          <Link
            href={`/worlds/${worldSlug}`}
            className="mt-4 inline-block rounded-xl bg-brand-primary px-4 py-2 font-semibold text-text-inverse transition hover:opacity-90"
          >
            Back to path
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6 flex flex-col gap-4 border-b border-black/10 pb-4">
        <Link
          href={`/worlds/${worldSlug}`}
          className="self-start rounded-lg px-2 py-1 text-sm text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
        >
          ← Back to path
        </Link>
        <SalaryHUD />
      </header>

      <main>
        {phase === "read" && (
          <ReadScreen
            lesson={{
              headline: lesson.headline,
              story: lesson.story,
              ruleCard: lesson.ruleCard,
            }}
            onStart={() => {
              if (practiceTotal > 0) setPhase("practice");
              else if (bossQuestion) setPhase("boss");
              else {
                setPhase("mastery");
                fireConfettiLight();
              }
            }}
          />
        )}

        {phase === "practice" && currentPracticeQuestion && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium text-text-secondary">
                {practiceIndex + 1} / {practiceTotal}
              </span>
              {streak > 0 && (
                <span className="rounded-full bg-success/15 px-2 py-0.5 font-medium text-success">
                  Streak: {streak}
                </span>
              )}
            </div>
            <QuestionRenderer
              question={currentPracticeQuestion}
              onCorrect={handleCorrect}
              onIncorrect={handleWrong}
            />
          </div>
        )}

        {phase === "boss" && bossQuestion && (
          <div className="space-y-4">
            <p className="rounded-lg bg-warning/15 px-3 py-1.5 text-sm font-semibold text-warning">
              Boss
            </p>
            <div className="flex items-center justify-between gap-2 text-sm">
              {streak > 0 && (
                <span className="rounded-full bg-success/15 px-2 py-0.5 font-medium text-success">
                  Streak: {streak}
                </span>
              )}
            </div>
            <QuestionRenderer
              question={bossQuestion}
              onCorrect={handleCorrect}
              onIncorrect={handleWrong}
            />
          </div>
        )}

        {phase === "mastery" && (
          <MasteryScreen
            badgeName={lesson.mastery.badgeName}
            salaryReward={lesson.mastery.salaryReward}
            onBackToPath={handleComplete}
          />
        )}
      </main>
    </div>
  );
}
