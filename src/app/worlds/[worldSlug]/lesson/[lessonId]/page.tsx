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
  ScenarioQuestion,
  CashMeterQuestion,
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
  | OrderQuestion
  | ScenarioQuestion
  | CashMeterQuestion {
  return (
    q.type === "mc" ||
    q.type === "boolean" ||
    q.type === "fill" ||
    q.type === "numeric" ||
    q.type === "drag_match" ||
    q.type === "order" ||
    q.type === "scenario" ||
    q.type === "cash_meter"
  );
}

type Phase = "read" | "practice" | "boss" | "mastery";

// ---------------------------------------------------------------------------
// READ screen
// ---------------------------------------------------------------------------

const worldsLessonBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

function ReadScreen({
  lesson,
  onStart,
}: {
  lesson: { headline: string; story: string; ruleCard: string };
  onStart: () => void;
}) {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-slate-800">
        {lesson.headline}
      </h1>
      <div className="whitespace-pre-line text-slate-700">
        {lesson.story}
      </div>
      <div className="rounded-2xl border border-blue-100/70 bg-white/75 p-5 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur-xl">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Rule</p>
        <p className="mt-2 text-slate-800">{lesson.ruleCard}</p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98]"
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
    <div className="space-y-6 rounded-3xl border border-blue-100/70 bg-white/75 p-8 text-center shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl">
      <div
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-600"
        aria-hidden
      >
        ✓
      </div>
      <h2 className="font-display text-xl font-semibold text-slate-800">
        Module complete
      </h2>
      <p className="text-lg font-medium text-slate-700">{badgeName}</p>
      <p className="text-sm font-semibold text-emerald-600">
        +{formatSalary(salaryReward)} earned
      </p>
      <button
        type="button"
        onClick={onBackToPath}
        className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98]"
      >
        Back to path
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
      <div className="min-h-screen px-4 py-8" style={worldsLessonBg}>
        <div className="mx-auto max-w-2xl">
          <p className="text-slate-600">Invalid world.</p>
          <Link href="/worlds" className="mt-2 inline-block text-blue-600 underline hover:text-blue-700">
            Back to Worlds
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen px-4 py-8" style={worldsLessonBg}>
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-blue-100/70 bg-white/75 p-8 text-center shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl">
            <h2 className="font-display text-xl font-semibold text-slate-800">
              Lesson not found
            </h2>
            <p className="mt-2 text-slate-600">
              This lesson doesn&apos;t exist or has been removed.
            </p>
            <Link
              href={`/worlds/${worldSlug}`}
              className="mt-4 inline-block rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98]"
            >
              Back to path
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={worldsLessonBg}>
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-blue-100/70 pb-4">
          <Link
            href={`/worlds/${worldSlug}`}
            className="self-start rounded-xl px-3 py-1.5 text-sm text-slate-600 transition hover:bg-white/60 hover:text-slate-800"
          >
            ← Back to path
          </Link>
          <SalaryHUD />
        </header>

        <main>
          {phase === "read" && (
            <div className="rounded-3xl border border-blue-100/70 bg-white/75 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl">
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
            </div>
          )}

          {phase === "practice" && currentPracticeQuestion && (
            <div className="space-y-4 rounded-3xl border border-blue-100/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium text-slate-500">
                  {practiceIndex + 1} / {practiceTotal}
                </span>
                {streak > 0 && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-700">
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
            <div className="space-y-4 rounded-3xl border border-blue-100/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl">
              <p className="rounded-xl bg-amber-100/80 px-3 py-1.5 text-sm font-semibold text-amber-800">
                Boss
              </p>
              <div className="flex items-center justify-between gap-2 text-sm">
                {streak > 0 && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-700">
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
    </div>
  );
}
