"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "life";

export function LifeLabVisual() {
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: rotating outer ring */}
      <circle cx="210" cy="110" r="72" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1.6" />
      <circle
        cx="210"
        cy="110"
        r="58"
        fill="none"
        stroke="url(#life-lvGradientSecondary)"
        strokeOpacity="0.85"
        strokeWidth="1.8"
        strokeDasharray="12 8"
        className={styles.lvOrbit}
        style={{ transformOrigin: "210px 110px" }}
      />
      {/* Layer 2 — SEQUENTIAL: tick marks pulse in rhythm */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const r = 58;
        const x = 210 + r * Math.cos(a);
        const y = 110 + r * Math.sin(a);
        return (
          <line
            key={i}
            x1={210 + (r - 8) * Math.cos(a)}
            y1={110 + (r - 8) * Math.sin(a)}
            x2={x}
            y2={y}
            stroke="url(#life-lvGradientSecondary)"
            strokeOpacity="0.85"
            strokeWidth="1.6"
            className={styles.lvNode}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        );
      })}
      <circle
        cx="210"
        cy="52"
        r="6"
        fill="url(#life-lvGradientSecondary)"
        filter="url(#life-lvGlow)"
        className={styles.lvOrbit}
        style={{ transformOrigin: "210px 110px" }}
      />
      {/* Layer 3 — AMBIENT: floating schedule blocks */}
      {[60, 144, 228, 312].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={168}
          width="44"
          height="20"
          rx="4"
          fill="none"
          stroke="url(#life-lvGradientSecondary)"
          strokeOpacity="0.85"
          strokeWidth="1.6"
          className={styles.lvParticle}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </LabVisualFrame>
  );
}
