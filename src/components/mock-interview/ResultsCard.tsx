"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ScoreBars, type Scores } from "./ScoreBars";
import { NextBestFix, type NextBestFixPayload } from "./NextBestFix";
import { cn } from "@/lib/utils";

export type MockResult = {
  transcript_text: string;
  filler_counts: Record<string, number>;
  total_filler: number;
  word_count: number;
  estimated_wpm: number;
  first_5s_density?: number;
  scores_json: Scores;
  feedback_json: {
    strengths: string[];
    fixes: string[];
    model_answer: string;
    rewrite_my_answer: string;
    follow_up_question: string;
    tag_feedback: Array<{ tag: string; note: string }>;
  };
  next_best_fix: NextBestFixPayload;
};

export function ResultsCard({
  result,
  onRetry,
  onAnswerFollowUp,
}: {
  result: MockResult;
  onRetry: () => void;
  onAnswerFollowUp: () => void;
}) {
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const { feedback_json, next_best_fix, filler_counts, total_filler, estimated_wpm } = result;
  const topFillers = Object.entries(filler_counts)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <NextBestFix data={next_best_fix} onRetry={onRetry} />

      <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Scores
        </h3>
        <ScoreBars scores={result.scores_json} className="mt-4" />
      </GlassCard>

      <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Strengths & Fixes
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-green-700">Strengths</p>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-slate-700">
              {feedback_json.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-amber-700">Fixes</p>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-slate-700">
              {feedback_json.fixes.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Filler & Pace
        </h3>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            Total filler: {total_filler}
          </span>
          {topFillers.length > 0 && (
            <span className="text-slate-600">
              Top: {topFillers.map(([w, n]) => `${w} (${n})`).join(", ")}
            </span>
          )}
          <span className="text-slate-600">Est. WPM: {result.estimated_wpm}</span>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5">
        <button
          type="button"
          onClick={() => setTranscriptOpen((o) => !o)}
          className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-slate-700 hover:bg-slate-50/50"
        >
          <span>Transcript</span>
          <span className="text-slate-400">{transcriptOpen ? "▼" : "▶"}</span>
        </button>
        {transcriptOpen && (
          <div className="border-t border-slate-100 px-6 py-4">
            <p className="whitespace-pre-wrap text-sm text-slate-600">
              {result.transcript_text || "(Empty)"}
            </p>
          </div>
        )}
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
            Model Answer
          </h3>
          <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
            {feedback_json.model_answer}
          </p>
        </GlassCard>
        <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
            Your Answer (Improved)
          </h3>
          <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
            {feedback_json.rewrite_my_answer}
          </p>
        </GlassCard>
      </div>

      {feedback_json.follow_up_question && (
        <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Follow-up
          </h3>
          <p className="mt-2 text-slate-700">{feedback_json.follow_up_question}</p>
          <button
            type="button"
            onClick={onAnswerFollowUp}
            className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
          >
            Answer follow-up
          </button>
        </GlassCard>
      )}
    </div>
  );
}
