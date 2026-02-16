"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StaggerContainer, motionVariants } from "../ui/Motion";

const STEPS = [
  "Pick your school → instant Market Value: $60,000",
  "A 5-question sprint auto-starts",
  "Correct answers → value increases immediately",
  "See your first rank movement + Next Best Fix",
];

export function OnboardingAutoSprint() {
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);

  const runDemo = () => {
    if (animating) return;
    setAnimating(true);
    setProgress(0);
    let i = 0;
    const id = setInterval(() => {
      setProgress(i);
      i++;
      if (i > 5) {
        clearInterval(id);
        setAnimating(false);
      }
    }, 400);
    return () => clearInterval(id);
  };

  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          What happens when you join
        </motion.h2>
        <StaggerContainer className="space-y-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={motionVariants.fadeUp}
              className="flex items-center gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                {i + 1}
              </span>
              <span className="text-foreground">{step}</span>
            </motion.div>
          ))}
        </StaggerContainer>
        <motion.div
          className="mt-10 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(37,99,235,0.10)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-4 text-sm font-medium text-foreground">Sprint progress (replay on click)</p>
          <div className="flex items-center gap-2">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-black/10">
              <motion.div
                className="h-full rounded-full bg-blue-600"
                initial={false}
                animate={{ width: `${(progress / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-sm text-muted-foreground tabular-nums">{progress}/5</span>
          </div>
          <button
            type="button"
            onClick={runDemo}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Replay demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
