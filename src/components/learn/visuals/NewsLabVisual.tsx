"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "news";

export function NewsLabVisual() {
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: scanning horizontal beam left → right */}
      <path d="M 20 110 Q 210 85 400 110" fill="none" stroke="rgba(37,99,235,0.2)" strokeWidth="1.6" />
      <rect
        x="0"
        y="98"
        width="28"
        height="24"
        rx="3"
        fill="url(#news-lvGradientPrimary)"
        filter="url(#news-lvGlow)"
        className={styles.lvScan}
        style={{ transformOrigin: "14px 110px" }}
      />
      {/* Layer 2 — SEQUENTIAL: headline blocks highlight in sequence */}
      {[45, 125, 205, 285, 365].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={152}
          width="56"
          height="22"
          rx="4"
          fill="none"
          stroke="url(#news-lvGradientPrimary)"
          strokeOpacity="0.85"
          strokeWidth="1.6"
          className={styles.lvNode}
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      {/* Layer 3 — AMBIENT: subtle flicker dots */}
      {[80, 210, 340].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={75}
          r="2.5"
          fill="rgba(37,99,235,0.5)"
          className={styles.lvRing}
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
    </LabVisualFrame>
  );
}
