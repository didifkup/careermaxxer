"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StaggerContainer, motionVariants, useReducedMotion } from "../ui/Motion";
import { CountUp } from "../ui/CountUp";

const LEADERBOARD = [
  { rank: 1, username: "wallstwolf", school: "Harvard", value: 982400 },
  { rank: 2, username: "ibgrind", school: "Wharton", value: 943200 },
  { rank: 3, username: "dcfking", school: "Stern", value: 920150 },
  { rank: 4, username: "mergerqueen", school: "Columbia", value: 884300 },
  { rank: 5, username: "dealflow", school: "Booth", value: 856100 },
  { rank: 6, username: "valuemax", school: "Kellogg", value: 821000 },
  { rank: 7, username: "modelmind", school: "Sloan", value: 798500 },
  { rank: 8, username: "tigerbanker", school: "Clemson", value: 610450 },
] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr,400px] lg:gap-16 items-start">
          {/* Left: copy + CTA */}
          <div className="flex flex-col">
            <StaggerContainer className="flex flex-col gap-6" useReducedMotion={reduced}>
              <motion.div variants={motionVariants.fadeUp}>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                  Ranked IB Training • Live Market Value
                </span>
              </motion.div>
              <motion.h1
                variants={motionVariants.fadeUp}
                className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                Climb your Market Value.
              </motion.h1>
              <motion.p
                variants={motionVariants.fadeUp}
                className="max-w-xl text-lg text-muted-foreground leading-relaxed"
              >
                CareerMaxxer turns interview prep into a ranked performance ecosystem — AI-graded mock
                interviews, competitive technical sprints, and Labs that compound daily.
              </motion.p>
              <motion.p variants={motionVariants.fadeUp} className="font-semibold text-foreground">
                Most students prepare. Top candidates increase their value.
              </motion.p>
              <motion.div variants={motionVariants.fadeUp} className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5">
                  <Link href="/arena">Enter the Arena — Free</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="rounded-xl group">
                  <Link href="/arena#market-value">
                    See how Market Value works
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </Button>
              </motion.div>
              <motion.p variants={motionVariants.fadeUp} className="text-sm text-muted-foreground">
                Start at $60,000. Earn your way up. No credit card.
              </motion.p>
            </StaggerContainer>
          </div>

          {/* Right: two stacked cards */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Card A: Leaderboard */}
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_20px_60px_rgba(37,99,235,0.10)] transition-shadow hover:shadow-[0_24px_64px_rgba(37,99,235,0.14)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Global Market Value Leaderboard
              </h3>
              <ul className="space-y-1.5 max-h-[240px] overflow-y-auto">
                {LEADERBOARD.map((row) => (
                  <LeaderboardRow key={row.rank} {...row} />
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3 text-sm">
                <span className="text-muted-foreground">Your Market Value: <CountUp value={60000} prefix="$" /></span>
                <span className="text-muted-foreground">Rank: Unranked</span>
              </div>
              <Button asChild size="sm" className="mt-2 w-full rounded-lg bg-blue-600 hover:bg-blue-700">
                <Link href="/arena">Start first sprint →</Link>
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Gain value by winning ranked sprints + graded mocks.
              </p>
            </div>

            {/* Card B: Mock preview */}
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_20px_60px_rgba(37,99,235,0.10)] transition-shadow hover:shadow-[0_24px_64px_rgba(37,99,235,0.14)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                AI Mock Interview (Live Preview)
              </h3>
              <p className="text-sm font-medium text-foreground">Walk me through a DCF.</p>
              <p className="mt-1 text-xs text-muted-foreground italic">
                &ldquo;I&apos;d project free cash flows, discount using WACC, then add terminal value…&rdquo;
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>Content 8.6</span>
                <span>•</span>
                <span>Structure 7.4</span>
                <span>•</span>
                <span>Clarity 9.1</span>
                <span>•</span>
                <span>Filler Words: 6</span>
              </div>
              <span className="mt-2 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                Next Best Fix: Cut filler words by 50%
              </span>
              <Link
                href="/mock-interview"
                className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Try a mock →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeaderboardRow({
  rank,
  username,
  school,
  value,
}: { rank: number; username: string; school: string; value: number }) {
  return (
    <motion.li
      className="flex items-center justify-between rounded-lg border-l-2 border-transparent py-1.5 pr-2 transition-colors hover:bg-black/[0.02] hover:border-blue-500/50"
      initial="rest"
      whileHover="hover"
      variants={{ rest: {}, hover: { borderLeftColor: "rgba(37,99,235,0.5)" } }}
    >
      <span className="text-muted-foreground w-5">{rank}.</span>
      <span className="flex-1 truncate font-medium">{username}</span>
      <span className="text-muted-foreground truncate max-w-[80px]">{school}</span>
      <CountUp value={value} prefix="$" className="font-medium tabular-nums" />
    </motion.li>
  );
}
