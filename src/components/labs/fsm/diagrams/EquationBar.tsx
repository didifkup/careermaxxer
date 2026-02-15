"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";
import type { TokenDef } from "./types";

const toneStyles = {
  neutral: "border-slate-200 bg-white text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
  accent:
    "border-indigo-300 bg-white text-slate-900 shadow-[0_0_0_2px_rgba(99,102,241,0.08)]",
  good:
    "border-emerald-300 bg-white text-slate-900 shadow-[0_0_0_2px_rgba(16,185,129,0.08)]",
  warn:
    "border-amber-300 bg-white text-slate-900 shadow-[0_0_0_2px_rgba(245,158,11,0.08)]",
};

const STAGGER_MS = 80;
const DURATION = 0.26;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export type EquationBarProps = {
  tokens: TokenDef[];
  operators: string[];
  rootRef?: React.RefObject<Element | null>;
};

export function EquationBar({
  tokens,
  operators,
  rootRef,
}: EquationBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(containerRef, { rootRef, threshold: 0.25 });

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center justify-center gap-2 md:gap-4"
    >
      {tokens.map((token, i) => (
        <span key={i} className="contents">
          <motion.span
            initial={inView ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: DURATION,
              ease: EASE,
              delay: inView ? (i * 2 * STAGGER_MS) / 1000 : 0,
            }}
            className={cn(
              "inline-flex items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 hover:translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-300",
              toneStyles[token.tone ?? "neutral"]
            )}
          >
            {token.text}
          </motion.span>
          {i < operators.length && (
            <motion.span
              initial={inView ? false : { opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{
                duration: 0.2,
                delay: inView ? (i * 2 * STAGGER_MS) / 1000 + DURATION : 0,
              }}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg font-semibold text-slate-700"
              aria-hidden
            >
              {operators[i]}
            </motion.span>
          )}
        </span>
      ))}
    </div>
  );
}
