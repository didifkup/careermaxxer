"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  DiagramCard,
  FlowCanvas,
  EquationBar,
  SplitSignal,
} from "@/components/labs/fsm/diagrams";
import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";

export type JourneySection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  diagram?: JourneyDiagram;
};

function DiagramRenderer({
  diagram,
  rootRef,
}: {
  diagram: JourneyDiagram;
  rootRef: React.RefObject<Element | null>;
}) {
  return (
    <DiagramCard>
      {diagram.kind === "flowCanvas" && (
        <FlowCanvas
          nodes={diagram.nodes}
          edges={diagram.edges}
          highlights={diagram.highlights}
          layout={diagram.layout}
          rootRef={rootRef}
        />
      )}
      {diagram.kind === "equationBar" && (
        <EquationBar
          tokens={diagram.tokens}
          operators={diagram.operators}
          rootRef={rootRef}
        />
      )}
      {diagram.kind === "splitSignal" && (
        <SplitSignal
          left={diagram.left}
          branches={diagram.branches}
          bottom={diagram.bottom}
          highlights={diagram.highlights}
          rootRef={rootRef}
        />
      )}
    </DiagramCard>
  );
}

function useReduceMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduce(m?.matches ?? false);
    const f = () => setReduce(m?.matches ?? false);
    m?.addEventListener?.("change", f);
    return () => m?.removeEventListener?.("change", f);
  }, []);
  return reduce;
}

function SectionBlock({
  section,
  reduceMotion,
  scrollRef,
}: {
  section: JourneySection;
  reduceMotion: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px -40px 0px" });

  return (
    <motion.section
      ref={ref}
      id={section.id}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={
        reduceMotion
          ? undefined
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 16 }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-12 border-b border-slate-200/80 last:border-b-0"
    >
      <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
        {section.label}
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-800 mb-6">
        {section.title}
      </h2>
      <div className="space-y-4 text-base md:text-lg leading-relaxed text-slate-600">
        {section.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {section.diagram && (
        <div className="mt-6 overflow-x-auto">
          <DiagramRenderer
            diagram={section.diagram}
            rootRef={scrollRef as React.RefObject<Element | null>}
          />
        </div>
      )}
    </motion.section>
  );
}

export type VisualJourneyProps = {
  sections: JourneySection[];
  title?: string;
};

export function VisualJourney({ sections, title }: VisualJourneyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReduceMotion();

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const max = scrollHeight - clientHeight;
    const pct = max <= 0 ? 100 : Math.min(100, (scrollTop / max) * 100);
    setProgress(pct);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };
    updateProgress();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  return (
    <div className="relative rounded-2xl border border-blue-100/70 bg-white/75 backdrop-blur overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.10)]">
      <div
        className="sticky top-0 z-10 h-1.5 w-full bg-slate-200/80 shrink-0"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title ? `${title} progress` : "Visual journey progress"}
      >
        <div
          className="h-full bg-blue-600 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div
        ref={scrollRef}
        className="relative max-h-[70vh] overflow-y-auto overscroll-contain"
        tabIndex={0}
      >
        <div className="min-h-full">
          {sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              reduceMotion={reduceMotion}
              scrollRef={scrollRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
