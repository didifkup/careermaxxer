"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { NextBestFix, type NextBestFixPayload } from "@/components/mock-interview/NextBestFix";
import { CountUp } from "@/components/landing-v2/ui/CountUp";

const worldsPageBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

type TabId = "tailored" | "p30" | "p60" | "p90" | "guardrails";

type Result = {
  submission_id: string;
  score_overall: number;
  score_breakdown: Record<string, number>;
  next_best_fix: NextBestFixPayload;
  tailored_resume: string;
  pitches: { s30: string; s60: string; s90: string };
  guardrails: { risky_claims: string[]; missing_metrics: string[] };
  boost: number;
  boost_available_in_days: number | null;
  new_market_value: number;
};

const BREAKDOWN_LABELS: { key: string; label: string; max: number }[] = [
  { key: "ib_fit", label: "IB Fit", max: 20 },
  { key: "impact", label: "Impact", max: 20 },
  { key: "clarity", label: "Clarity", max: 20 },
  { key: "structure", label: "Structure", max: 15 },
  { key: "story", label: "Story", max: 15 },
  { key: "ats", label: "ATS", max: 10 },
];

export function ResumeLabClient() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("tailored");

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.name.toLowerCase().endsWith(".pdf") || f.name.toLowerCase().endsWith(".docx") || f.name.toLowerCase().endsWith(".doc"))) {
      setFile(f);
      setError(null);
    } else {
      setError("Please upload a PDF or DOCX file.");
    }
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setError(null);
    }
  }, []);

  const submit = async () => {
    if (!file) {
      setError("Choose a file first.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/resume/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      setResult(data);
      setActiveTab("tailored");
    } catch {
      setError("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast
  };

  const resetForAnother = () => {
    setResult(null);
    setFile(null);
    setActiveTab("tailored");
  };

  return (
    <div className="min-h-screen px-4 py-12 md:py-16" style={worldsPageBg}>
      <div className="mx-auto max-w-[900px]">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-semibold text-slate-800 md:text-5xl">
              Resume Lab
            </h1>
            <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              Adds to Market Value
            </span>
          </div>
          <p className="mt-2 text-base text-slate-500 md:text-lg">
            Turn your resume into an IB-ready weapon — and generate your 30/60/90-second walk-through.
          </p>
        </header>

        {!result ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Upload Resume
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  PDF or DOCX. We don&apos;t store your file.
                </p>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  className={`
                    mt-4 flex min-h-[160px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-colors
                    ${dragOver ? "border-blue-400 bg-blue-50/50" : "border-slate-200 bg-slate-50/50"}
                  `}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={onFileChange}
                    className="sr-only"
                    id="resume-file"
                  />
                  <label htmlFor="resume-file" className="cursor-pointer text-center">
                    <span className="text-sm font-medium text-blue-600 hover:underline">
                      Choose file
                    </span>
                    <span className="text-slate-500"> or drag and drop</span>
                  </label>
                  {file && (
                    <p className="mt-2 text-sm text-slate-600">
                      {file.name}
                    </p>
                  )}
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
                <button
                  type="button"
                  onClick={submit}
                  disabled={loading || !file}
                  className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Analyzing…" : "Analyze Resume"}
                </button>
              </GlassCard>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GlassCard className="p-6 transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Resume Score
                  </h2>
                  <p className="mt-2 text-4xl font-bold text-slate-800">
                    <CountUp value={result.score_overall} /> / 100
                  </p>
                </div>
                <div className="text-right text-sm">
                  {result.boost > 0 ? (
                    <>
                      <p className="font-semibold text-green-700">
                        Market Value +$<CountUp value={result.boost} />
                      </p>
                      <p className="text-slate-600">
                        New Market Value: $<CountUp value={result.new_market_value} />
                      </p>
                    </>
                  ) : result.boost_available_in_days != null ? (
                    <p className="text-slate-600">
                      Boost available again in {result.boost_available_in_days} days.
                    </p>
                  ) : (
                    <p className="text-slate-600">
                      Market Value: $<CountUp value={result.new_market_value} />
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {BREAKDOWN_LABELS.map(({ key, label, max }) => {
                  const value = result.score_breakdown[key] ?? 0;
                  const pct = max > 0 ? (value / max) * 100 : 0;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="w-24 shrink-0 text-sm font-medium text-slate-700">{label}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm tabular-nums text-slate-800">{value}/{max}</span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <NextBestFix data={result.next_best_fix} onRetry={resetForAnother} />

            <GlassCard className="overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/80">
                {([
                  { id: "tailored" as TabId, label: "Tailored Resume" },
                  { id: "p30" as TabId, label: "30s Pitch" },
                  { id: "p60" as TabId, label: "60s Pitch" },
                  { id: "p90" as TabId, label: "90s Pitch" },
                  { id: "guardrails" as TabId, label: "Risk & Missing Metrics" },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition ${
                      activeTab === tab.id
                        ? "border-b-2 border-blue-600 text-blue-700 bg-white"
                        : "text-slate-600 hover:bg-white/60"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === "tailored" && (
                  <div className="space-y-3">
                    <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm text-slate-800 font-sans">
                      {result.tailored_resume}
                    </pre>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(result.tailored_resume, "Tailored Resume")}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                      >
                        Copy Tailored Resume
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(result.pitches.s60, "60s Pitch")}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Copy 60s Pitch
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "p30" && (
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{result.pitches.s30}</p>
                )}
                {activeTab === "p60" && (
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{result.pitches.s60}</p>
                )}
                {activeTab === "p90" && (
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{result.pitches.s90}</p>
                )}
                {activeTab === "guardrails" && (
                  <div className="space-y-4">
                    {result.guardrails.risky_claims?.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold uppercase text-amber-700">Risky claims</h3>
                        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-slate-700">
                          {result.guardrails.risky_claims.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.guardrails.missing_metrics?.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold uppercase text-slate-600">Missing metrics</h3>
                        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-slate-700">
                          {result.guardrails.missing_metrics.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {(!result.guardrails.risky_claims?.length && !result.guardrails.missing_metrics?.length) && (
                      <p className="text-sm text-slate-500">No specific risks or missing metrics flagged.</p>
                    )}
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
