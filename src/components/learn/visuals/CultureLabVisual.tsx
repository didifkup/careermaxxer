"use client";

import { LabVisualFrame } from "./LabVisualFrame";
import styles from "./labVisuals.module.css";

const P = "culture";
const NODES = [
  { cx: 105, cy: 55 },
  { cx: 315, cy: 55 },
  { cx: 210, cy: 110 },
  { cx: 70, cy: 165 },
  { cx: 350, cy: 165 },
  { cx: 210, cy: 190 },
];
const LINKS = [[0, 2], [1, 2], [2, 5], [0, 3], [1, 4], [3, 5], [4, 5]];

export function CultureLabVisual() {
  return (
    <LabVisualFrame idPrefix={P}>
      {/* Layer 1 — HERO: central node pulse expanding outward */}
      <circle
        cx="210"
        cy="110"
        r="18"
        fill="url(#culture-lvNodeFill)"
        fillOpacity="0.8"
        stroke="url(#culture-lvGradientPrimary)"
        strokeWidth="1.8"
        strokeOpacity="0.85"
        filter="url(#culture-lvGlow)"
        className={styles.lvRing}
      />
      {/* Layer 2 — SEQUENTIAL: connected nodes light in wave pattern */}
      {LINKS.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].cx}
          y1={NODES[a].cy}
          x2={NODES[b].cx}
          y2={NODES[b].cy}
          stroke="url(#culture-lvGradientPrimary)"
          strokeOpacity="0.85"
          strokeWidth="1.6"
        />
      ))}
      {NODES.map((n, i) =>
        i === 2 ? null : (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="9"
            fill="url(#culture-lvNodeFill)"
            fillOpacity="0.8"
            stroke="url(#culture-lvGradientPrimary)"
            strokeWidth="1.6"
            strokeOpacity="0.85"
            className={styles.lvNode}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        )
      )}
      {/* Layer 3 — AMBIENT: orbiting signal dot */}
      <circle
        cx="210"
        cy="75"
        r="5"
        fill="url(#culture-lvGradientSecondary)"
        className={styles.lvOrbit}
        style={{ transformOrigin: "210px 110px" }}
      />
    </LabVisualFrame>
  );
}
