"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "student";
const POINTS = [{ x: 70, y: 55 }, { x: 210, y: 75 }, { x: 350, y: 55 }, { x: 140, y: 140 }, { x: 280, y: 140 }, { x: 210, y: 192 }];

export function StudentStrategyLabVisual() {
  const pathD = `M ${POINTS[0].x} ${POINTS[0].y} L ${POINTS[1].x} ${POINTS[1].y} L ${POINTS[2].x} ${POINTS[2].y} L ${POINTS[4].x} ${POINTS[4].y} L ${POINTS[5].x} ${POINTS[5].y}`;
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: path dash-draw animation */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#student-lvGradientPrimary)"
        strokeOpacity="0.85"
        strokeWidth="1.8"
        strokeDasharray="500"
        className={styles.lvDashDraw}
      />
      {/* Layer 2 — SEQUENTIAL: checkpoints pulse one by one */}
      {POINTS.map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={i === 1 ? 10 : 6}
          fill="url(#student-lvNodeFill)"
          fillOpacity="0.8"
          stroke="url(#student-lvGradientPrimary)"
          strokeWidth="1.6"
          strokeOpacity="0.85"
          className={styles.lvNode}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      {/* Layer 3 — AMBIENT: subtle compass rotation (small orbit) */}
      <circle
        cx="210"
        cy="95"
        r="20"
        fill="none"
        stroke="rgba(37,99,235,0.2)"
        strokeWidth="1"
        strokeDasharray="4 6"
        className={styles.lvOrbit}
        style={{ transformOrigin: "210px 95px" }}
      />
      <circle
        cx="210"
        cy="88"
        r="4"
        fill="url(#student-lvGradientPrimary)"
        className={styles.lvOrbit}
        style={{ transformOrigin: "210px 95px" }}
      />
    </LabVisualFrame>
  );
}
