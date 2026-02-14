"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import type { ToneOption, LengthOption } from "./types";
import { PerimeterGlow } from "./PerimeterGlow";
import { cn } from "@/lib/utils";

const THEME_CHIPS = ["Gym", "Gaming", "Basketball", "Cars", "Cooking"];
const TOPIC_CHIPS = [
  "3 statements link",
  "DCF intuition",
  "EV vs Equity",
  "WACC + beta",
  "Comps multiples",
  "Accretion/dilution",
  "LBO basics",
];
const TONE_OPTIONS: { value: ToneOption; label: string }[] = [
  { value: "fun", label: "Fun" },
  { value: "chill", label: "Chill" },
  { value: "serious", label: "Serious" },
];
const LENGTH_OPTIONS: { value: LengthOption; label: string }[] = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

const inputInsidePerimeterClass =
  "w-full rounded-xl bg-transparent px-4 py-3 text-[15px] placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-0 resize-none";
const chipBaseClass =
  "rounded-full px-3 py-1.5 text-sm font-medium border transition-colors";

export type AIPanelProps = {
  theme: string;
  setTheme: (v: string) => void;
  topic: string;
  setTopic: (v: string) => void;
  tone: ToneOption;
  setTone: (v: ToneOption) => void;
  length: LengthOption;
  setLength: (v: LengthOption) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  themeFocusedOnce: boolean;
  setThemeFocusedOnce: (v: boolean) => void;
};

export function AIPanel({
  theme,
  setTheme,
  topic,
  setTopic,
  tone,
  setTone,
  length,
  setLength,
  loading,
  error,
  onSubmit,
  themeFocusedOnce,
  setThemeFocusedOnce,
}: AIPanelProps) {
  const showSectionB = theme.trim().length >= 3 || themeFocusedOnce;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-wrap items-start justify-between gap-3"
      >
        <div>
          <h1 className="font-display text-4xl font-semibold text-slate-800 md:text-5xl">
            Storyteller
          </h1>
          <p className="mt-2 text-base text-slate-500 md:text-lg">
            Tell me what you&apos;re into. Then tell me what finance thing is
            confusing you.
          </p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          AI Mentor
        </span>
      </motion.header>

      {/* AI Panel Container */}
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative overflow-hidden rounded-3xl border border-blue-100/70 bg-white/75 shadow-[0_20px_60px_rgba(37,99,235,0.12)] backdrop-blur-xl"
        style={{
          boxShadow:
            "0 20px 60px rgba(37,99,235,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
        whileHover={{
          y: -2,
          boxShadow:
            "0 24px 64px rgba(37,99,235,0.16), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* Top highlight line */}
        <div
          className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/80 to-transparent"
          aria-hidden
        />

        <div className="p-6 md:p-8">
          {/* Section A: Theme */}
          <section>
            <label
              htmlFor="ai-theme"
              className="block text-sm font-medium text-slate-700"
            >
              What are you into?
            </label>
            <PerimeterGlow className="mt-2">
              <textarea
                id="ai-theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value.slice(0, 300))}
                onFocus={() => setThemeFocusedOnce(true)}
                placeholder="Gym + healthy eating, gaming, cars, fashion, sports…"
                maxLength={300}
                rows={2}
                className={inputInsidePerimeterClass}
              />
            </PerimeterGlow>
            <p className="mt-1 text-xs text-slate-500">{theme.length}/300</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {THEME_CHIPS.map((chip) => (
                <motion.button
                  key={chip}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    setTheme((prev) => (prev ? `${prev}, ${chip}` : chip))
                  }
                  className={cn(
                    chipBaseClass,
                    "bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
                  )}
                >
                  {chip}
                </motion.button>
              ))}
            </div>
          </section>

          {/* Divider — animates width when Section B appears */}
          <AnimatePresence>
            {showSectionB && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="my-6 h-px bg-slate-200/80"
                aria-hidden
              />
            )}
          </AnimatePresence>

          {/* Section B: Topic — guided reveal */}
          <AnimatePresence>
            {showSectionB && (
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <label
                  htmlFor="ai-topic"
                  className="block text-sm font-medium text-slate-700"
                >
                  What do you want to understand?
                </label>
                <PerimeterGlow className="mt-2">
                  <textarea
                    id="ai-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value.slice(0, 300))}
                    placeholder="e.g. How the 3 financial statements link (especially retained earnings)"
                    maxLength={300}
                    rows={3}
                    className={inputInsidePerimeterClass}
                  />
                </PerimeterGlow>
                <p className="mt-1 text-xs text-slate-500">{topic.length}/300</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TOPIC_CHIPS.map((chip) => (
                    <motion.button
                      key={chip}
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setTopic((prev) =>
                          prev ? `${prev} — ${chip}` : chip
                        )
                      }
                      className={cn(
                        chipBaseClass,
                        "bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
                      )}
                    >
                      {chip}
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Footer: Tone, Length, CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="mr-2 text-xs text-slate-500">Tone:</span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ToneOption)}
                  disabled={loading}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
                >
                  {TONE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="mr-2 text-xs text-slate-500">Length:</span>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as LengthOption)}
                  disabled={loading}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
                >
                  {LENGTH_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={cn(
                "flex w-full min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition-shadow sm:w-auto",
                "hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] disabled:opacity-60 disabled:hover:shadow-[0_10px_25px_rgba(37,99,235,0.30)]"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  <span>Synthesizing…</span>
                </>
              ) : (
                <>
                  <span>Tell me the story</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Pulse line at bottom when loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden"
            >
              <motion.div
                className="h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-100"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
