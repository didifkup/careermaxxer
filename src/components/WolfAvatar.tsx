"use client";

import { useEffect, useState } from "react";

export type WolfStage = 0 | 1 | 2 | 3 | 4;

interface WolfAvatarProps {
  stage: WolfStage;
  /** When true, play level-up animation (scale pop + glow + "Level Up") for ~1s */
  levelUp?: boolean;
  className?: string;
  size?: number;
}

/** MVP: 5 wolf stages with distinct SVG shapes + accessories; level-up animation. */
export function WolfAvatar({ stage, levelUp = false, className = "", size = 200 }: WolfAvatarProps) {
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    if (levelUp) {
      setShowLevelUp(true);
      const t = setTimeout(() => setShowLevelUp(false), 1000);
      return () => clearTimeout(t);
    }
  }, [levelUp]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Level-up overlay: glow ring + "Level Up" text */}
      {showLevelUp && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
          aria-live="polite"
        >
          <div className="absolute inset-0 -m-4 rounded-full bg-brand-accent/25 animate-level-glow" />
          <span className="relative text-lg font-bold text-brand-primary drop-shadow-sm">
            Level Up
          </span>
        </div>
      )}

      {/* Avatar container — scale pop when level up */}
      <div
        className={`relative ${showLevelUp ? "animate-scale-pop" : ""}`}
      >
        <WolfShape stage={stage} size={size} />
      </div>
    </div>
  );
}

function WolfShape({ stage, size }: { stage: WolfStage; size: number }) {
  const viewBox = "0 0 120 120";

  // Shared base: head + ears
  const headFill = stage >= 3 ? "hsl(0 0% 70%)" : stage >= 1 ? "hsl(0 0% 75%)" : "hsl(0 0% 80%)";
  const stroke = "hsl(0 0% 50%)";

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 hover:scale-105"
      aria-hidden
    >
      <defs>
        <filter id="wolf-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow ring for Sharp+ */}
      {stage >= 2 && (
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="hsl(142 71% 45% / 0.25)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      )}

      {/* Head — size grows slightly by stage */}
      <ellipse
        cx="60"
        cy={62 - stage * 1}
        rx={42 + stage * 2}
        ry={40 + stage}
        fill={headFill}
        stroke={stroke}
        strokeWidth="2"
      />
      {/* Ears */}
      <ellipse cx="30" cy="34" rx="14" ry="18" fill={headFill} stroke={stroke} strokeWidth="2" />
      <ellipse cx="90" cy="34" rx="14" ry="18" fill={headFill} stroke={stroke} strokeWidth="2" />
      {/* Inner ears — Pup/Junior smaller */}
      {stage <= 1 && (
        <>
          <ellipse cx="32" cy="38" rx="6" ry="8" fill="hsl(0 0% 65%)" />
          <ellipse cx="88" cy="38" rx="6" ry="8" fill="hsl(0 0% 65%)" />
        </>
      )}

      {/* Snout */}
      <ellipse cx="60" cy="80" rx="18" ry="14" fill="hsl(0 0% 88%)" stroke={stroke} strokeWidth="1.5" />
      <ellipse cx="60" cy="74" rx="6" ry="5" fill="hsl(0 0% 12%)" />

      {/* Eyes — fiercer as stage increases */}
      <ellipse cx="45" cy="54" rx={8 + stage} ry="10" fill="hsl(0 0% 12%)" />
      <ellipse cx="75" cy="54" rx={8 + stage} ry="10" fill="hsl(0 0% 12%)" />
      <circle cx="47" cy="52" r="2" fill="white" opacity="0.9" />
      <circle cx="77" cy="52" r="2" fill="white" opacity="0.9" />

      {/* Accessories by stage */}
      {stage >= 1 && (
        <ellipse cx="60" cy="92" rx="12" ry="4" fill="hsl(0 0% 40%)" opacity="0.6" />
      )}
      {stage >= 3 && (
        <>
          <path d="M 20 50 Q 25 35 35 45" stroke="hsl(0 0% 50%)" strokeWidth="2" fill="none" />
          <path d="M 100 50 Q 95 35 85 45" stroke="hsl(0 0% 50%)" strokeWidth="2" fill="none" />
        </>
      )}
      {stage >= 4 && (
        <g filter="url(#wolf-glow)">
          <path
            d="M 50 22 L 55 12 L 60 22 L 70 18 L 65 28 L 75 32 L 65 35 L 68 45 L 60 40 L 52 45 L 55 35 L 45 32 L 55 28 Z"
            fill="hsl(45 90% 55%)"
            stroke="hsl(40 80% 40%)"
            strokeWidth="1"
          />
        </g>
      )}
    </svg>
  );
}
