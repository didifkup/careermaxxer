"use client";

import { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, viewportConfig } from "../ui/Motion";

const ROWS: { feature: string; tooltip: string; traditional: "check" | "dash"; careerMaxxer: "check" }[] = [
  { feature: "Video Lessons", tooltip: "Fast, focused lessons that get you to reps quickly.", traditional: "check", careerMaxxer: "check" },
  { feature: "Technical Question Banks", tooltip: "High-frequency interview questions with structured answers.", traditional: "check", careerMaxxer: "check" },
  { feature: "Modeling Walkthroughs", tooltip: "Step-by-step modeling concepts without the fluff.", traditional: "check", careerMaxxer: "check" },
  { feature: "AI Chat Support", tooltip: "Ask questions and get clarity instantly.", traditional: "check", careerMaxxer: "check" },
  { feature: "Ranked Technical Sprints", tooltip: "Timed competitive reps that move your Market Value.", traditional: "dash", careerMaxxer: "check" },
  { feature: "AI-Graded Mock Interviews", tooltip: "Talk to camera, get rubric scoring in seconds.", traditional: "dash", careerMaxxer: "check" },
  { feature: "Filler Word & Structure Scoring", tooltip: "Track rambling, filler words, and structure objectively.", traditional: "dash", careerMaxxer: "check" },
  { feature: "School-Specific Leaderboards", tooltip: "See where you rank inside your school.", traditional: "dash", careerMaxxer: "check" },
  { feature: "Live Market Value Tracking", tooltip: "Your $60,000 → $1,000,000 performance index updates as you improve.", traditional: "dash", careerMaxxer: "check" },
  { feature: "Real-Time Performance Ranking", tooltip: "Rank changes based on live results, not completion.", traditional: "dash", careerMaxxer: "check" },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const checkPopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function CellTooltip({
  children,
  tooltip,
  id,
}: {
  children: React.ReactNode;
  tooltip: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        tabIndex={0}
        role="button"
        aria-describedby={open ? `${id}-tooltip` : undefined}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className="outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-1"
      >
        {children}
      </div>
      {open && (
        <div
          id={`${id}-tooltip`}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs text-foreground shadow-lg"
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}

export function ComparisonGrid() {
  const reduced = useReducedMotion();

  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={reduced ? viewportConfig.reducedMotionViewport : viewportConfig.viewportOnce}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Interview prep has evolved.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Content delivery was the first phase.
            <br />
            Performance infrastructure is the next.
          </p>
        </motion.div>

        <motion.div
          className="overflow-x-auto scrollbar-hide"
          initial="hidden"
          whileInView="visible"
          viewport={reduced ? viewportConfig.reducedMotionViewport : { once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.1 },
            },
          }}
        >
          {/* Desktop: table-like grid */}
          <div className="hidden min-w-[600px] rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden md:block">
            {/* Header */}
            <div className="grid grid-cols-[1fr_140px_160px] border-b border-black/5 bg-slate-50/80 text-sm font-medium text-foreground">
              <div className="px-4 py-3">Feature</div>
              <div className="px-4 py-3 text-center">Traditional Prep Platforms</div>
              <div className="px-4 py-3 text-center">CareerMaxxer</div>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={reduced ? viewportConfig.reducedMotionViewport : { once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
            >
            {ROWS.map((row, i) => (
              <motion.div
                key={row.feature}
                custom={i}
                variants={rowVariants}
                className={cn(
                  "group grid grid-cols-[1fr_140px_160px] border-b border-black/5 transition-colors last:border-b-0",
                  "hover:bg-slate-900/[0.03]",
                  reduced ? "" : "hover:-translate-y-px"
                )}
                style={{
                  transition: reduced ? undefined : "transform 0.2s ease, background-color 0.15s ease",
                }}
              >
                <div className="relative flex items-center px-4 py-3">
                  {!reduced && (
                    <span
                      className="absolute left-0 top-0 h-full w-0.5 bg-blue-500 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      aria-hidden
                    />
                  )}
                  <span className="text-sm text-foreground">{row.feature}</span>
                </div>
                <div className="flex items-center justify-center px-4 py-3 text-muted-foreground">
                  {row.traditional === "check" ? (
                    <Check className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                  ) : (
                    <Minus className="h-5 w-5 shrink-0" strokeWidth={2} />
                  )}
                </div>
                <div className="relative flex items-center justify-center px-4 py-3 bg-blue-500/[0.03] ring-2 ring-blue-500/20 ring-inset shadow-[inset_0_0_0_1px_rgba(37,99,235,0.08)]">
                  <CellTooltip tooltip={row.tooltip} id={`cmp-${i}`}>
                    <motion.span
                      variants={reduced ? undefined : checkPopVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportConfig.viewportOnce}
                      className="inline-flex text-blue-600"
                    >
                      <Check className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                    </motion.span>
                  </CellTooltip>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </div>

          {/* Mobile: card per row */}
          <motion.div
            className="flex flex-col gap-3 md:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={reduced ? viewportConfig.reducedMotionViewport : { once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
            }}
          >
            {ROWS.map((row, i) => (
              <motion.div
                key={row.feature}
                custom={i}
                variants={rowVariants}
                className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
              >
                <p className="mb-3 text-sm font-medium text-foreground">{row.feature}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-muted-foreground">
                    Traditional: {row.traditional === "check" ? "✓" : "—"}
                  </span>
                  <CellTooltip tooltip={row.tooltip} id={`cmp-m-${i}`}>
                    <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-700">
                      CareerMaxxer: ✓
                    </span>
                  </CellTooltip>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-10 text-center text-lg font-semibold text-foreground"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig.viewportOnce}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Every platform teaches the material.
          <br />
          Only one measures performance.
        </motion.p>
      </div>
    </section>
  );
}
