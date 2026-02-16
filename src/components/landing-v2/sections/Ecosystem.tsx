"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CardHover, StaggerContainer, motionVariants } from "../ui/Motion";

const CARDS = [
  {
    title: "Arena Mode",
    copy: "Ranked technical sprints. Global + school leaderboards. Streak pressure. Instant Market Value movement.",
    linkText: "Enter the Arena →",
    href: "/arena",
  },
  {
    title: "AI Mock Interviews",
    copy: "Talk to camera. Get graded instantly. Content + structure + filler words. Next Best Fix drill after every attempt.",
    linkText: "Run a Mock →",
    href: "/mock-interview",
  },
  {
    title: "AI Labs",
    copy: "DCF, M&A, LBO, Trading Comps, Transaction Comps — broken into 2–5 minute reps that stick.",
    linkText: "Enter the Labs →",
    href: "/worlds",
  },
];

export function Ecosystem() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          A ranked ecosystem — not a course.
        </motion.h2>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div key={card.title} variants={motionVariants.fadeUp}>
              <CardHover className="h-full p-6">
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.copy}</p>
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group"
                >
                  {card.linkText}
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </CardHover>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
