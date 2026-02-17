"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "recruiting";
const STAGES = [70, 140, 210, 280, 350];

export function RecruitingLabVisual() {
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: glowing beam moving through horizontal pipeline */}
      <line
        x1="50"
        y1="110"
        x2="370"
        y2="110"
        stroke="rgba(37,99,235,0.2)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <rect
        x="50"
        y="102"
        width="80"
        height="16"
        rx="2"
        fill="url(#recruiting-lvGradientPrimary)"
        filter="url(#recruiting-lvGlow)"
        className={styles.lvBeam}
        style={{ transformOrigin: "90px 110px" }}
      />
      {/* Layer 2 — SEQUENTIAL: nodes pulse in order */}
      {STAGES.slice(0, -1).map((x, i) => (
        <line
          key={i}
          x1={x + 28}
          y1="110"
          x2={STAGES[i + 1] - 28}
          y2="110"
          stroke="url(#recruiting-lvGradientPrimary)"
          strokeOpacity="0.85"
          strokeWidth="1.8"
        />
      ))}
      {STAGES.map((x, i) => (
        <g key={i}>
          <circle
            cx={x}
            cy="110"
            r="12"
            fill="url(#recruiting-lvNodeFill)"
            fillOpacity="0.8"
            stroke="url(#recruiting-lvGradientPrimary)"
            strokeWidth="1.6"
            strokeOpacity="0.85"
            className={styles.lvNode}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          {i < 2 && (
            <path
              d="M 66 110 L 70 114 L 78 106"
              fill="none"
              stroke="rgba(37,99,235,0.95)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>
      ))}
      {/* Layer 3 — AMBIENT: upward drifting particles */}
      {[100, 200, 300].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={170 - i * 8}
          r="2"
          fill="rgba(37,99,235,0.5)"
          className={styles.lvParticle}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </LabVisualFrame>
  );
}
