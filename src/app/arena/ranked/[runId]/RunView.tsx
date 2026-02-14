"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/arena/ladder";
import { QuestionRenderer } from "./QuestionRenderer";
import type { RunQuestion } from "./types";
import { Button } from "@/components/ui/button";

const DURATION_SEC = 600;
const FEEDBACK_MS = 1500;

interface RunState {
  livesRemaining: number;
  livesTotal: number;
  currentDifficulty: number;
  streak: number;
  totalMoney: number;
  status: string;
}

interface SummaryState {
  totalMoney: number;
  compensationDelta: number;
  newMarketValue: number;
  newTitle: string;
  titleChange: "promotion" | "demotion" | null;
}

interface RunViewProps {
  runId: string;
}

export function RunView({ runId }: RunViewProps) {
  const router = useRouter();
  const [run, setRun] = useState<RunState | null>(null);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(DURATION_SEC);
  const [question, setQuestion] = useState<RunQuestion | null>(null);
  const [answerValue, setAnswerValue] = useState<string | string[]>("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState<SummaryState | null>(null);
  const [questionStartMs, setQuestionStartMs] = useState<number>(0);

  const loadRun = useCallback(async () => {
    const res = await fetch(`/api/arena/ranked/${runId}`);
    if (!res.ok) {
      router.push("/arena");
      return;
    }
    const data = await res.json();
    setRun({
      livesRemaining: data.lives_remaining,
      livesTotal: data.lives_total,
      currentDifficulty: data.current_difficulty,
      streak: data.streak,
      totalMoney: data.total_money,
      status: data.status,
    });
    setStartedAt(data.started_at);
    setTimeRemaining(
      Math.max(
        0,
        data.duration_sec -
          Math.floor(
            (Date.now() - new Date(data.started_at).getTime()) / 1000
          )
      )
    );
  }, [runId, router]);

  useEffect(() => {
    const key = `arena_run_${runId}`;
    try {
      const raw = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
      if (raw) {
        const data = JSON.parse(raw) as {
          run?: {
            lives_remaining?: number;
            lives_total?: number;
            current_difficulty?: number;
            streak?: number;
            total_money?: number;
            status?: string;
            duration_sec?: number;
            started_at?: string;
          };
          started_at?: string;
          first_question?: RunQuestion;
        };
        if (data?.run) {
          const r = data.run;
          setRun({
            livesRemaining: r.lives_remaining ?? 3,
            livesTotal: r.lives_total ?? 3,
            currentDifficulty: r.current_difficulty ?? 2,
            streak: r.streak ?? 0,
            totalMoney: r.total_money ?? 0,
            status: r.status ?? "active",
          });
          const started = data.started_at ?? r.started_at;
          setStartedAt(started ?? null);
          const durationSec = r.duration_sec ?? DURATION_SEC;
          setTimeRemaining(
            started
              ? Math.max(
                  0,
                  durationSec -
                    Math.floor(
                      (Date.now() - new Date(started).getTime()) / 1000
                    )
                )
              : durationSec
          );
          if (data.first_question) {
            setQuestion(data.first_question);
            setAnswerValue(
              data.first_question.format === "multi" ? [] : ""
            );
            setQuestionStartMs(Date.now());
          }
          setLoading(false);
          sessionStorage.removeItem(key);
          return;
        }
      }
    } catch {
      // ignore parse or storage errors
    }
    loadRun();
  }, [runId, loadRun]);

  useEffect(() => {
    if (!startedAt || run?.status !== "active") return;
    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - new Date(startedAt).getTime()) / 1000
      );
      const remaining = Math.max(0, DURATION_SEC - elapsed);
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt, run?.status]);

  useEffect(() => {
    if (
      run &&
      run.status !== "active" &&
      !summary
    ) {
      fetch(`/api/arena/ranked/${runId}/finalize`, { method: "POST" })
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (data) {
            setSummary({
              totalMoney: data.totalMoney,
              compensationDelta: data.compensationDelta,
              newMarketValue: data.newMarketValue,
              newTitle: data.newTitle,
              titleChange: data.titleChange,
            });
          }
        });
      return;
    }
    if (timeRemaining <= 0 && run?.status === "active" && !summary) {
      (async () => {
        const res = await fetch(`/api/arena/ranked/${runId}/finalize`, {
          method: "POST",
        });
        if (res.ok) {
          const data = await res.json();
          setSummary({
            totalMoney: data.totalMoney,
            compensationDelta: data.compensationDelta,
            newMarketValue: data.newMarketValue,
            newTitle: data.newTitle,
            titleChange: data.titleChange,
          });
        }
      })();
    }
  }, [timeRemaining, run?.status, runId, summary]);

  const fetchNextQuestion = useCallback(async () => {
    setLoading(true);
    setQuestion(null);
    try {
      const res = await fetch(`/api/arena/ranked/${runId}/next-question`, {
        method: "POST",
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.question) {
        setQuestion(data.question);
        setAnswerValue(data.question.format === "multi" ? [] : "");
        setQuestionStartMs(Date.now());
      }
    } finally {
      setLoading(false);
    }
  }, [runId]);

  useEffect(() => {
    if (!run || run.status !== "active" || summary || question != null) return;
    fetchNextQuestion();
  }, [run, summary, runId, fetchNextQuestion, question]);

  const handleSubmit = async () => {
    if (!question || submitting || feedback != null) return;
    const timeTakenSec = Math.floor((Date.now() - questionStartMs) / 1000);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/arena/ranked/${runId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          response:
            question.format === "multi" && Array.isArray(answerValue)
              ? answerValue
              : answerValue,
          timeTakenSec,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitting(false);
        return;
      }
      setRun((prev) =>
        prev
          ? {
              ...prev,
              livesRemaining: data.livesRemaining,
              streak: data.streak,
              totalMoney: data.totalMoney,
              currentDifficulty: data.currentDifficulty,
            }
          : prev
      );
      setFeedback(data.correct ? "correct" : "incorrect");

      if (data.livesRemaining <= 0) {
        const finalizeRes = await fetch(`/api/arena/ranked/${runId}/finalize`, {
          method: "POST",
        });
        if (finalizeRes.ok) {
          const finalData = await finalizeRes.json();
          setSummary({
            totalMoney: finalData.totalMoney,
            compensationDelta: finalData.compensationDelta,
            newMarketValue: finalData.newMarketValue,
            newTitle: finalData.newTitle,
            titleChange: finalData.titleChange,
          });
        }
        setSubmitting(false);
        return;
      }

      setTimeout(() => {
        setFeedback(null);
        setQuestion(null);
        setSubmitting(false);
      }, FEEDBACK_MS);
    } catch {
      setSubmitting(false);
    }
  };

  const handleRunItBack = async () => {
    const res = await fetch("/api/arena/ranked/start", { method: "POST" });
    if (!res.ok) return;
    const { runId: newRunId, started_at, run, first_question } = await res.json();
    if (newRunId && (run != null || first_question != null)) {
      try {
        sessionStorage.setItem(
          `arena_run_${newRunId}`,
          JSON.stringify({ run, started_at, first_question })
        );
      } catch {
        // ignore
      }
    }
    const q = started_at ? `?started=${encodeURIComponent(started_at)}` : "";
    router.push(`/arena/ranked/${newRunId}${q}`);
  };

  if (summary) {
    return (
      <div className="mx-auto max-w-xl space-y-6 py-8">
        <h1 className="font-display text-2xl font-bold text-brand-primary">
          Run complete
        </h1>
        <div className="rounded-xl border border-black/10 bg-surface-raised p-6 shadow-sm space-y-4">
          <p className="text-text-primary">
            <span className="text-text-secondary">Total this run: </span>
            <span className="font-semibold">{formatMoney(summary.totalMoney)}</span>
          </p>
          <p className="text-text-primary">
            <span className="text-text-secondary">Compensation delta: </span>
            <span
              className={
                summary.compensationDelta >= 0
                  ? "font-semibold text-green-600"
                  : "font-semibold text-destructive"
              }
            >
              {summary.compensationDelta >= 0 ? "+" : ""}
              {formatMoney(summary.compensationDelta)}
            </span>
          </p>
          <p className="text-text-primary">
            <span className="text-text-secondary">New market value: </span>
            <span className="font-semibold">
              {formatMoney(summary.newMarketValue)}
            </span>
          </p>
          <p className="text-text-primary">
            <span className="text-text-secondary">Title: </span>
            <span className="font-semibold">{summary.newTitle}</span>
            {summary.titleChange && (
              <span
                className={
                  summary.titleChange === "promotion"
                    ? "ml-2 text-green-600"
                    : "ml-2 text-destructive"
                }
              >
                ({summary.titleChange})
              </span>
            )}
          </p>
          <Button onClick={handleRunItBack} className="w-full sm:w-auto">
            Run it back
          </Button>
        </div>
        <p>
          <a href="/arena" className="text-brand-primary hover:underline">
            Back to Arena
          </a>
        </p>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="mx-auto max-w-xl py-8">
        <p className="text-text-secondary">Loading run…</p>
      </div>
    );
  }

  if (run.status !== "active" && !summary) {
    return (
      <div className="mx-auto max-w-xl py-8">
        <p className="text-text-secondary">Loading results…</p>
      </div>
    );
  }

  const showQuestion = question && feedback == null;

  return (
    <div className="mx-auto max-w-xl space-y-6 py-6">
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-black/10 bg-surface-raised px-4 py-3 text-sm">
        <span className="font-medium text-brand-primary">
          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
        </span>
        <span className="text-text-secondary">
          Lives: {run.livesRemaining}/{run.livesTotal}
        </span>
        <span className="text-text-secondary">Difficulty: {run.currentDifficulty}</span>
        <span className="text-text-secondary">Streak: {run.streak}</span>
        <span className="font-semibold text-brand-accent">
          {formatMoney(run.totalMoney)}
        </span>
      </div>

      {loading && !showQuestion && !feedback && (
        <p className="text-text-secondary">Loading question…</p>
      )}

      {feedback && (
        <div
          className={`rounded-xl border-2 px-6 py-4 text-center font-medium ${
            feedback === "correct"
              ? "border-green-500 bg-green-500/10 text-green-700"
              : "border-destructive bg-destructive/10 text-destructive"
          }`}
          role="status"
        >
          {feedback === "correct" ? "Correct!" : "Incorrect"}
        </div>
      )}

      {showQuestion && (
        <>
          <div className="rounded-xl border border-black/10 bg-surface-raised p-6 shadow-sm">
            <p className="text-xs text-text-secondary">
              {question.topic} · {question.subtopic}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-text-primary">
              {question.prompt}
            </h2>
            <div className="mt-4">
              <QuestionRenderer
                question={question}
                value={answerValue}
                onChange={setAnswerValue}
                disabled={submitting}
              />
            </div>
            <div className="mt-6">
              <Button
                onClick={handleSubmit}
                disabled={
                  submitting ||
                  (question.format === "multi"
                    ? (answerValue as string[]).length === 0
                    : !String(answerValue).trim())
                }
                className="w-full sm:w-auto"
              >
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </div>
        </>
      )}

      <p>
        <a href="/arena" className="text-sm text-brand-primary hover:underline">
          Exit to Arena
        </a>
      </p>
    </div>
  );
}
