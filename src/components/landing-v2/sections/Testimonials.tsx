"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { StaggerContainer, CardHover, motionVariants } from "../ui/Motion";

const TESTIMONIALS = [
  { quote: "I didn't realize how much I rambled until I saw my structure score. After 4 mocks, my answers were tight.", author: "Finance major, Big Ten school" },
  { quote: "The leaderboard made me practice daily. Watching my Market Value climb was addictive.", author: "Junior, target school" },
  { quote: "The Next Best Fix drill is insane. It tells you exactly what to improve next — no guessing.", author: "Sophomore, non-target" },
];

export function Testimonials() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }}>
          From $60K to competitive.
        </motion.h2>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.author} variants={motionVariants.fadeUp}>
              <CardHover className="relative p-6">
                <p className="text-sm text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-3 text-xs text-muted-foreground">— {t.author}</p>
                <span className="absolute top-4 right-4 text-blue-600" aria-hidden><Check className="h-4 w-4" /></span>
              </CardHover>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
