"use client";

import type { ReactNode } from "react";
import styles from "./labVisuals.module.css";

type LabVisualFrameProps = {
  /** Unique prefix for defs ids (e.g. 'recruiting') so multiple frames on page don't clash */
  idPrefix: string;
  children: ReactNode;
  className?: string;
};

export function LabVisualFrame({ idPrefix, children, className }: LabVisualFrameProps) {
  const p = idPrefix;
  return (
    <svg
      viewBox="0 0 420 220"
      preserveAspectRatio="xMidYMid meet"
      className={`${styles.frame} ${className ?? ""}`.trim()}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${p}-lvGradientPrimary`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(37,99,235,0.95)" />
          <stop offset="100%" stopColor="rgba(37,99,235,0.6)" />
        </linearGradient>
        <linearGradient id={`${p}-lvGradientSecondary`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(99,102,241,0.9)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0.5)" />
        </linearGradient>
        <radialGradient id={`${p}-lvNodeFill`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(37,99,235,0.25)" />
        </radialGradient>
        <filter id={`${p}-lvGlow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="rgba(37,99,235,0.5)" floodOpacity="1" />
        </filter>
      </defs>
      {/* Subtle background grid */}
      <g className={styles.grid} strokeWidth="1" stroke="currentColor">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 22} x2="420" y2={i * 22} />
        ))}
        {Array.from({ length: 22 }, (_, i) => (
          <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="220" />
        ))}
      </g>
      <g vectorEffect="non-scaling-stroke">
        {children}
      </g>
    </svg>
  );
}
