"use client";

import confetti from "canvas-confetti";
import { motion, useInView } from "framer-motion";
import { Award, Timer, TrendingUp, Zap } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function fireMicroConfetti(originEl?: HTMLElement) {
  // Respect reduced motion
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduce) return;

  let origin = { x: 0.5, y: 0.35 };

  if (originEl) {
    const r = originEl.getBoundingClientRect();
    origin = {
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
    };
  }

  confetti({
    particleCount: 26,
    spread: 48,
    startVelocity: 18,
    gravity: 0.9,
    scalar: 0.7,
    ticks: 140,
    origin,
  });
}

type CountUpProps = {
  to: number;
  inView: boolean;
  durationMs?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  onDone?: () => void;
};

function CountUp({ to, inView, durationMs = 900, className, suffix = "", prefix = "", onDone }: CountUpProps) {
  const [value, setValue] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const didCallDone = React.useRef(false);

  React.useEffect(() => {
    if (!inView) return;

    setDone(false);
    didCallDone.current = false;

    let raf = 0;
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // Ease out (smooth, subtle)
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);

      if (t >= 1) {
        setDone(true);
        if (!didCallDone.current) {
          didCallDone.current = true;
          onDone?.();
        }
      }
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, inView, durationMs, onDone]);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">
        {prefix}{value}{suffix}
      </span>

      {/* shimmer overlay (only after done) */}
      {done ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-md animate-shimmer-sweep"
        >
          <span
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            style={{ mixBlendMode: "overlay" }}
          />
        </span>
      ) : null}
    </span>
  );
}

function useDing() {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const unlockedRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Use a tiny base64 wav so no asset file is needed.
    // This is a very short "ding" tone.
    const src =
      "data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YRAAAAAA/////wAAAP///wAAAP///wAAAP///wAAAP///w==";

    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.25;

    const unlock = () => {
      unlockedRef.current = true;
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const play = React.useCallback(() => {
    if (!audioRef.current) return;
    if (!unlockedRef.current) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    // restart and play
    audioRef.current.currentTime = 0;
    void audioRef.current.play().catch(() => {});
  }, []);

  return { play };
}

const metrics = [
  {
    icon: Timer,
    valueStatic: "2–5",
    valueSuffix: " min",
    label: "Lessons",
    desc: "Quick lessons you do daily.",
  },
  {
    icon: Zap,
    valueNumber: 3,
    valueSuffix: "×",
    valueAfter: " faster",
    label: "Recall speed",
    desc: "See patterns, not memorizing words.",
  },
  {
    icon: Award,
    valueNumber: 90,
    valueSuffix: "%",
    label: "More Superday confidence",
    desc: "Feel calmer in real interviews.",
  },
  {
    icon: TrendingUp,
    valueNumber: 30,
    valueSuffix: "%",
    valueAfter: " faster",
    label: "Learning speed",
    desc: "Study less. Learn more each time.",
  },
];

export function QuantOutcomesStats() {
  const metricsRef = React.useRef<HTMLDivElement | null>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-20% 0px" });
  const { play: playDing } = useDing();
  const dopamineFiredRef = React.useRef(false);
  const ninetyRef = React.useRef<HTMLDivElement | null>(null);

  const dopamineOnDone = React.useCallback(() => {
    if (dopamineFiredRef.current) return;
    dopamineFiredRef.current = true;
    playDing();
    fireMicroConfetti(ninetyRef.current ?? undefined);
  }, [playDing]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>OUTCOMES</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                What CareerMaxxer does for you
              </h2>
              <p className="text-lg lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                Clear direction, faster learning, and calm interview readiness —
                with progress you can measure.
              </p>
              <p className="text-sm font-medium text-foreground mt-3 text-left">
                You'll feel the difference after your{" "}
                <span className="text-primary font-semibold">first 3 floors</span>.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="relative">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10"
                initial={{ opacity: 0 }}
                animate={
                  metricsInView
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
                  animate={
                    metricsInView
                      ? { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute left-1/3 top-2/3 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
                  animate={
                    metricsInView
                      ? { scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />
              </motion.div>
              <div
                ref={metricsRef}
                className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-2"
              >
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={
                    metricsInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : {}
                  }
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08,
                  }}
                  className="flex gap-0 flex-col justify-between p-6 border rounded-md"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                    animate={
                      metricsInView
                        ? { opacity: 1, scale: 1, rotate: 0 }
                        : {}
                    }
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.08 + 0.05,
                    }}
                  >
                    <Icon className="w-4 h-4 mb-6 text-primary" />
                  </motion.div>
                  <div ref={metric.valueNumber === 90 ? ninetyRef : undefined}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, y: 6 }}
                      animate={metricsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.06 }}
                      className="text-5xl md:text-6xl font-bold tracking-tighter leading-none"
                    >
                      {typeof metric.valueNumber === "number" ? (
                        <>
                          <CountUp
                            to={metric.valueNumber}
                            inView={metricsInView}
                            durationMs={900}
                            suffix={metric.valueSuffix ?? ""}
                            onDone={metric.valueNumber === 90 ? dopamineOnDone : undefined}
                          />
                          {metric.valueAfter ? <span className="text-foreground/80"> {metric.valueAfter}</span> : null}
                        </>
                      ) : (
                        <span>
                          {metric.valueStatic}
                          {metric.valueSuffix ?? ""}
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.18 }}
                  >
                    <p className="mt-2 text-sm font-medium text-left">{metric.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed text-left">
                      {metric.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
              })}
              </div>
              <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Confidence meter</p>
                <p className="text-sm text-muted-foreground">Superday-ready</p>
              </div>

              <div className="relative mt-3">
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden border">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={metricsInView ? { width: "90%" } : { width: "0%" }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.25,
                    }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <motion.div
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]"
                  style={{ left: "90%" }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={metricsInView ? { opacity: [0, 1, 0], scale: [0.6, 1.15, 0.8] } : {}}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 1.05 }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Cold →</span>
                <span>Confident</span>
              </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 w-full text-left">
                *Some metrics are targets/early beta indicators; results vary
                with consistency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
