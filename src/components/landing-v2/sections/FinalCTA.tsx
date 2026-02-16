"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          The market is moving.
        </motion.h2>
        <motion.p
          className="mt-3 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Your school is either climbing. Or invisible.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-blue-600 px-8 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5"
          >
            <Link href="/arena">Enter the Arena — Free</Link>
          </Button>
        </motion.div>
        <motion.p
          className="mt-3 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Instant Market Value. 2 minutes to start. No credit card.
        </motion.p>
      </div>
    </section>
  );
}
