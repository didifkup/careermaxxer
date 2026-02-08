"use client";

/**
 * Lightweight confetti burst — no external library.
 * Creates DOM particles, animates with CSS, then removes.
 */

const COLORS = ["#22c55e", "#0a2463", "#f59e0b", "#ef4444", "#8b5cf6"];
const LIGHT_COLORS = ["#86efac", "#93c5fd", "#fde047", "#fca5a5", "#c4b5fd"];
const PARTICLE_COUNT = 35;
const LIGHT_PARTICLE_COUNT = 12;
const DURATION_MS = 2200;
const LIGHT_DURATION_MS = 1400;

function createConfetti(options: {
  particleCount: number;
  colors: string[];
  durationMs: number;
  startY?: string;
}): void {
  const { particleCount, colors, durationMs, startY = "20%" } = options;
  if (typeof document === "undefined") return;

  const container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 9999;
    display: flex; justify-content: center; align-items: flex-start; padding-top: ${startY};
  `;
  document.body.appendChild(container);

  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = options.durationMs === LIGHT_DURATION_MS ? 4 + Math.random() * 4 : 6 + Math.random() * 8;
    const startX = -30 + Math.random() * 60;
    const endX = startX + (Math.random() - 0.5) * (options.durationMs === LIGHT_DURATION_MS ? 60 : 120);
    const rotation = Math.random() * 360 - 180;
    const delay = Math.random() * (options.durationMs === LIGHT_DURATION_MS ? 80 : 200);

    el.style.cssText = `
      position: absolute; width: ${size}px; height: ${size}px;
      background: ${color}; border-radius: 2px;
      transform: translateX(${startX}vw) translateY(0) rotate(0deg);
      opacity: 0.9;
    `;
    el.animate(
      [
        {
          transform: `translateX(${startX}vw) translateY(0) rotate(0deg)`,
          opacity: 0.9,
        },
        {
          transform: `translateX(${endX}vw) translateY(70vh) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      { duration: durationMs, delay, easing: "ease-out", fill: "forwards" }
    );
    container.appendChild(el);
  }

  setTimeout(() => container.remove(), durationMs + 300);
}

export function fireConfetti(): void {
  createConfetti({
    particleCount: PARTICLE_COUNT,
    colors: COLORS,
    durationMs: DURATION_MS,
  });
}

/** Lighter, calmer confetti for Celebration nodes (fewer particles, softer colors). */
export function fireConfettiLight(): void {
  createConfetti({
    particleCount: LIGHT_PARTICLE_COUNT,
    colors: LIGHT_COLORS,
    durationMs: LIGHT_DURATION_MS,
    startY: "25%",
  });
}
