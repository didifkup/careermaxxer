"use client";

import { motion } from "framer-motion";
import { StaggerContainer, CardHover, motionVariants } from "../ui/Motion";

const TILES = [
  "Reps under pressure",
  "Rubric grading (not vibes)",
  "Competition that compounds",
];

const DIAGRAM = ["Learn", "Speak", "Get Graded", "Fix", "Repeat", "Rank Up"];

export function Mechanism() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          Why this works (and why everything else feels slow).
        </motion.h2>
        <StaggerContainer className="mb-12 grid gap-4 sm:grid-cols-3">
          {TILES.map((tile) => (
            <motion.div key={tile} variants={motionVariants.fadeUp}>
              <CardHover className="p-6 text-center">
                <p className="font-medium text-foreground">{tile}</p>
              </CardHover>
            </motion.div>
          ))}
        </StaggerContainer>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {DIAGRAM.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-md bg-black/5 px-2 py-1 font-medium text-foreground">{step}</span>
              {i < DIAGRAM.length - 1 && <span className="text-black/30">→</span>}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
