"use client";

import { motion } from "framer-motion";
import { StaggerContainer, motionVariants } from "../ui/Motion";

const BULLETS = [
  "You ramble under pressure.",
  "You miss structure.",
  "You guess what to fix.",
  "You've never been graded.",
];

export function Problem() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <StaggerContainer className="flex flex-col gap-6">
          <motion.h2
            variants={motionVariants.fadeUp}
            className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Most candidates have no idea what they&apos;re worth.
          </motion.h2>
          <motion.p
            variants={motionVariants.fadeUp}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            You can memorize every formula and still underperform out loud.
          </motion.p>
          <motion.ul variants={motionVariants.fadeUp} className="list-disc space-y-2 pl-5 text-muted-foreground">
            {BULLETS.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </motion.ul>
          <motion.p variants={motionVariants.fadeUp} className="font-semibold text-foreground">
            CareerMaxxer turns prep into measurable performance.
          </motion.p>
        </StaggerContainer>
      </div>
    </section>
  );
}
