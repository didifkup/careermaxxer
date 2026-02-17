"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "compensation";
const BARS = [50, 95, 140, 185, 230, 275, 320, 365];
const HEIGHTS = [30, 50, 38, 58, 48, 68, 55, 72];

export function CompensationLabVisual() {
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: rising bar animation loop */}
      <rect
        x="48"
        y={140 - HEIGHTS[0]}
        width="32"
        height={HEIGHTS[0]}
        rx="4"
        fill="url(#compensation-lvGradientPrimary)"
        filter="url(#compensation-lvGlow)"
        className={styles.lvNode}
      />
      {/* Layer 2 — SEQUENTIAL: trend line dash-draw */}
      <path
        d="M 64 160 L 140 120 L 220 95 L 300 75 L 380 55"
        fill="none"
        stroke="url(#compensation-lvGradientPrimary)"
        strokeOpacity="0.85"
        strokeWidth="1.8"
        strokeDasharray="500"
        className={styles.lvDashDraw}
      />
      {BARS.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={140 - HEIGHTS[i]}
          width="32"
          height={HEIGHTS[i]}
          rx="4"
          fill="none"
          stroke="url(#compensation-lvGradientPrimary)"
          strokeOpacity="0.85"
          strokeWidth="1.6"
          className={styles.lvNode}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      {/* Layer 3 — AMBIENT: subtle coin shimmer pulse */}
      <circle
        cx="210"
        cy="45"
        r="10"
        fill="url(#compensation-lvNodeFill)"
        fillOpacity="0.8"
        stroke="url(#compensation-lvGradientPrimary)"
        strokeWidth="1.6"
        strokeOpacity="0.85"
        className={styles.lvRing}
      />
    </LabVisualFrame>
  );
}
