"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "career";
const RUNG_Y = [35, 65, 95, 125, 155, 185];

export function CareerLabVisual() {
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: vertical progress beam climbing ladder */}
      <rect
        x="88"
        y="185"
        width="16"
        height="60"
        rx="2"
        fill="url(#career-lvGradientPrimary)"
        filter="url(#career-lvGlow)"
        className={styles.lvRise}
        style={{ transformOrigin: "96px 215px" }}
      />
      {/* Layer 2 — SEQUENTIAL: milestone nodes light up bottom → top */}
      {RUNG_Y.map((y, i) => (
        <g key={i}>
          <line
            x1="90"
            y1={y}
            x2="330"
            y2={y}
            stroke="url(#career-lvGradientPrimary)"
            strokeOpacity="0.85"
            strokeWidth="1.6"
          />
          <circle
            cx={90 + (i % 5) * 60}
            cy={y}
            r={i % 2 === 0 ? 7 : 5}
            fill="url(#career-lvNodeFill)"
            fillOpacity="0.8"
            stroke="url(#career-lvGradientPrimary)"
            strokeWidth="1.6"
            strokeOpacity="0.85"
            className={styles.lvNode}
            style={{ animationDelay: `${(5 - i) * 0.15}s` }}
          />
        </g>
      ))}
      <path
        d="M 95 200 L 95 25 L 325 25 L 325 200"
        fill="none"
        stroke="rgba(37,99,235,0.25)"
        strokeWidth="1.6"
        strokeDasharray="6 4"
      />
      {/* Layer 3 — AMBIENT: faint upward particles */}
      {[120, 210, 300].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={190 - i * 15}
          r="1.5"
          fill="rgba(37,99,235,0.45)"
          className={styles.lvParticle}
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </LabVisualFrame>
  );
}
