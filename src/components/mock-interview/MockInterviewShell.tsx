"use client";

import { useState, useCallback, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { RecorderCard } from "./RecorderCard";
import { ResultsCard, type MockResult } from "./ResultsCard";
import { useQuestionDeck } from "./useQuestionDeck";
import { useToast } from "@/contexts/ToastContext";
import { cn } from "@/lib/utils";

type Track = "technical" | "behavioral";
type Difficulty = 1 | 2 | 3;

const TRACK_OPTIONS = [
  { value: "technical" as const, label: "Technical" },
  { value: "behavioral" as const, label: "Behavioral" },
];
const DIFFICULTY_OPTIONS = [
  { value: "1" as const, label: "Warmup" },
  { value: "2" as const, label: "Real" },
  { value: "3" as const, label: "Hard" },
];

function clearAttemptState(
  setRecordedBlob: (v: Blob | null) => void,
  setResult: (v: MockResult | null) => void
) {
  setRecordedBlob(null);
  setResult(null);
}

export function MockInterviewShell() {
  const { addToast } = useToast();
  const [track, setTrack] = useState<Track>("technical");
  const [difficulty, setDifficulty] = useState<Difficulty>(1);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<MockResult | null>(null);

  const deck = useQuestionDeck({
    track,
    difficulty,
    onPoolError: (msg) => addToast(msg, "info"),
  });

  const { currentQuestion: question, loading: loadingQuestion } = deck;

  const handleNewQuestion = useCallback(() => {
    deck.shuffle();
    clearAttemptState(setRecordedBlob, setResult);
  }, [deck]);

  const handlePrev = useCallback(() => {
    deck.prev();
    clearAttemptState(setRecordedBlob, setResult);
  }, [deck]);

  const handleNext = useCallback(() => {
    deck.next();
    clearAttemptState(setRecordedBlob, setResult);
  }, [deck]);

  const handleShuffle = useCallback(() => {
    deck.shuffle();
    clearAttemptState(setRecordedBlob, setResult);
  }, [deck]);

  useEffect(() => {
    clearAttemptState(setRecordedBlob, setResult);
  }, [track, difficulty]);

  const handleRecorded = (blob: Blob, durationSeconds: number) => {
    setRecordedBlob(blob);
    setRecordedDuration(durationSeconds);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!recordedBlob || !question) return;
    setSubmitting(true);
    setResult(null);
    try {
      const form = new FormData();
      form.set("track", question.track);
      form.set("difficulty", String(question.difficulty));
      form.set("questionId", question.id);
      form.set("durationSeconds", String(recordedDuration));
      form.set("video", recordedBlob, "response.webm");

      const res = await fetch("/api/mock/submit", {
        method: "POST",
        body: form,
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        addToast(json?.error ?? `Error ${res.status}`, "default");
        if (res.status === 429) addToast("Max 10 attempts per day.", "info");
        return;
      }

      setResult({
        transcript_text: json.transcript_text ?? "",
        filler_counts: json.filler_counts ?? {},
        total_filler: json.total_filler ?? 0,
        word_count: json.word_count ?? 0,
        estimated_wpm: json.estimated_wpm ?? 0,
        first_5s_density: json.first_5s_density,
        scores_json: json.scores_json ?? {},
        feedback_json: json.feedback_json ?? {},
        next_best_fix: json.next_best_fix ?? {},
      });
      addToast("Grading complete.", "success");
    } catch {
      addToast("Upload failed. Try again.", "default");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    setRecordedBlob(null);
  };

  const handleAnswerFollowUp = useCallback(() => {
    deck.shuffle();
    clearAttemptState(setRecordedBlob, setResult);
  }, [deck]);

  const difficultyValue = String(difficulty) as "1" | "2" | "3";

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-semibold text-slate-800 md:text-5xl">
            AI Mock Interview
          </h1>
          <p className="mt-2 text-base text-slate-500 md:text-lg">
            Talk to camera. Get graded. Improve fast.
          </p>
        </div>
        <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          Rubric Grading • 120s max
        </span>
      </header>

      <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Controls
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div>
            <span className="mr-2 text-xs text-slate-500">Track</span>
            <SegmentedToggle
              options={TRACK_OPTIONS}
              value={track}
              onChange={(v) => setTrack(v)}
              aria-label="Question track"
            />
          </div>
          <div>
            <span className="mr-2 text-xs text-slate-500">Difficulty</span>
            <SegmentedToggle
              options={DIFFICULTY_OPTIONS}
              value={difficultyValue}
              onChange={(v) => setDifficulty(Number(v) as Difficulty)}
              aria-label="Difficulty"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={loadingQuestion || !deck.canPrev}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={handleShuffle}
              disabled={loadingQuestion}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Shuffle
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={loadingQuestion || !deck.canNext}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
            </button>
            <button
              type="button"
              onClick={handleNewQuestion}
              disabled={loadingQuestion}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] disabled:opacity-60"
            >
              {loadingQuestion ? "Loading…" : "New Question"}
            </button>
          </div>
        </div>
        {deck.meta.total > 0 && (
          <p className="mt-3 text-xs text-slate-500">
            Question {deck.meta.index} of {deck.meta.total} in this set
          </p>
        )}
      </GlassCard>

      {question && (
        <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Question
          </h2>
          <p className="mt-3 text-lg font-medium text-slate-800">{question.prompt}</p>
          {question.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-slate-500">
            Aim for 60–90s. Headline first.
          </p>
        </GlassCard>
      )}

      {question && (
        <RecorderCard
          onRecorded={handleRecorded}
          onMaxDurationReached={() => addToast("Recording stopped at 120s.", "info")}
          disabled={loadingQuestion || submitting}
        />
      )}

      {recordedBlob && question && !result && (
        <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={cn(
              "rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] disabled:opacity-60"
            )}
          >
            {submitting ? "Grading…" : "Submit for grading"}
          </button>
        </GlassCard>
      )}

      {submitting && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Transcribing and grading…</p>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-xl border border-slate-200/80 bg-white/60"
              />
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-800">Results</h2>
          <ResultsCard
            result={result}
            onRetry={handleRetry}
            onAnswerFollowUp={handleAnswerFollowUp}
          />
        </div>
      )}
    </div>
  );
}
