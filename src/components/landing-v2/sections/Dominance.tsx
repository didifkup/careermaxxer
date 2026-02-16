"use client";

import { motion } from "framer-motion";

export function Dominance() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          Everything you expect. And the one thing no one else has.
        </motion.p>
      </div>
    </section>
  );
}
