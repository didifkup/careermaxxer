"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type EnergyLineProps = {
  variant?: "solid" | "dashed";
  animateDraw?: boolean;
  delayMs?: number;
  pulse?: boolean;
  className?: string;
  /** Vertical connector (stack layout): line from top to bottom */
  vertical?: boolean;
};

const strokeColor = "rgba(100,116,139,0.3)";

export function EnergyLine({
  variant = "solid",
  animateDraw = true,
  delayMs = 0,
  pulse = false,
  className,
  vertical = true,
}: EnergyLineProps) {
  const lineRef = useRef<SVGPathElement>(null);
  const [drawComplete, setDrawComplete] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduceMotion(m?.matches ?? false);
  }, []);

  useEffect(() => {
    if (!animateDraw || reduceMotion || !lineRef.current) {
      setDrawComplete(true);
      return;
    }
    const t = setTimeout(() => setDrawComplete(true), delayMs + 320);
    return () => clearTimeout(t);
  }, [animateDraw, delayMs, reduceMotion]);

  const shouldAnimate = animateDraw && !reduceMotion;
  const pathLength = 24;
  const dashOffset = shouldAnimate && !drawComplete ? pathLength : 0;
  const isDashed = variant === "dashed";

  if (vertical) {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <svg
          width="2"
          height="24"
          viewBox="0 0 2 24"
          className="overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={`energy-v-${id}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(99,102,241,0.35)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.25)" />
            </linearGradient>
          </defs>
          <path
            ref={lineRef}
            d="M1 0 v24"
            fill="none"
            stroke={isDashed ? strokeColor : `url(#energy-v-${id})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={isDashed ? "4 4" : `${pathLength} ${pathLength}`}
            strokeDashoffset={isDashed ? 0 : dashOffset}
            style={{
              opacity: isDashed ? 0.6 : 1,
              transitionProperty: shouldAnimate && !isDashed ? "stroke-dashoffset" : "none",
              transitionDuration: shouldAnimate && !isDashed ? "280ms" : "0ms",
              transitionTimingFunction: "ease-out",
              transitionDelay: `${delayMs}ms`,
            }}
          />
          {pulse && drawComplete && (
            <circle
              r="2"
              cx="1"
              cy="12"
              fill="rgba(99,102,241,0.4)"
              className="animate-pulse"
              style={{ animationDuration: "1.5s" }}
            />
          )}
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width="24"
        height="2"
        viewBox="0 0 24 2"
        className="overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={`energy-h-${id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(99,102,241,0.35)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.25)" />
          </linearGradient>
        </defs>
        <path
          ref={lineRef}
          d="M0 1 h24"
          fill="none"
          stroke={isDashed ? strokeColor : `url(#energy-h-${id})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={isDashed ? "4 4" : `${pathLength} ${pathLength}`}
          strokeDashoffset={isDashed ? 0 : dashOffset}
          style={{
            opacity: isDashed ? 0.6 : 1,
            transitionProperty: shouldAnimate && !isDashed ? "stroke-dashoffset" : "none",
            transitionDuration: shouldAnimate && !isDashed ? "280ms" : "0ms",
            transitionTimingFunction: "ease-out",
            transitionDelay: `${delayMs}ms`,
          }}
        />
      </svg>
    </div>
  );
}
