"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "exits";

export function ExitsLabVisual() {
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: main trunk path draws (dash-draw) */}
      <path
        d="M 210 200 L 210 115"
        fill="none"
        stroke="url(#exits-lvGradientPrimary)"
        strokeOpacity="0.85"
        strokeWidth="1.8"
        strokeDasharray="500"
        className={styles.lvDashDraw}
      />
      <path
        d="M 210 115 L 95 55"
        fill="none"
        stroke="url(#exits-lvGradientPrimary)"
        strokeOpacity="0.85"
        strokeWidth="1.6"
        strokeDasharray="300"
        className={styles.lvDashDraw}
        style={{ animationDelay: "0.3s" }}
      />
      <path
        d="M 210 115 L 210 45"
        fill="none"
        stroke="url(#exits-lvGradientPrimary)"
        strokeOpacity="0.85"
        strokeWidth="1.6"
        strokeDasharray="200"
        className={styles.lvDashDraw}
        style={{ animationDelay: "0.25s" }}
      />
      <path
        d="M 210 115 L 325 55"
        fill="none"
        stroke="url(#exits-lvGradientPrimary)"
        strokeOpacity="0.85"
        strokeWidth="1.6"
        strokeDasharray="300"
        className={styles.lvDashDraw}
        style={{ animationDelay: "0.35s" }}
      />
      {/* Layer 2 — SEQUENTIAL: branches light up one by one (nodes) */}
      <circle cx="95" cy="55" r="11" fill="url(#exits-lvNodeFill)" fillOpacity="0.8" stroke="url(#exits-lvGradientPrimary)" strokeWidth="1.6" strokeOpacity="0.85" className={styles.lvNode} style={{ animationDelay: "0.5s" }} />
      <circle cx="210" cy="45" r="11" fill="url(#exits-lvNodeFill)" fillOpacity="0.8" stroke="url(#exits-lvGradientPrimary)" strokeWidth="1.6" strokeOpacity="0.85" className={styles.lvNode} style={{ animationDelay: "0.45s" }} />
      <circle cx="325" cy="55" r="11" fill="url(#exits-lvNodeFill)" fillOpacity="0.8" stroke="url(#exits-lvGradientPrimary)" strokeWidth="1.6" strokeOpacity="0.85" className={styles.lvNode} style={{ animationDelay: "0.55s" }} />
      <circle cx="210" cy="115" r="8" fill="rgba(37,99,235,0.4)" stroke="url(#exits-lvGradientPrimary)" strokeWidth="1.6" strokeOpacity="0.85" />
      {/* Layer 3 — AMBIENT: orbit dot choosing a branch */}
      <circle
        cx="210"
        cy="80"
        r="4"
        fill="url(#exits-lvGradientPrimary)"
        filter="url(#exits-lvGlow)"
        className={styles.lvParticle}
      />
    </LabVisualFrame>
  );
}
