"use client";

import { useEffect, useState } from "react";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function WaveBackgroundWrapper({
  enabled = true,
  darkTheme = false,
}: {
  enabled?: boolean;
  darkTheme?: boolean;
}) {
  const reduced = useReducedMotion();

  if (!enabled) return null;

  if (reduced) {
    return (
      <div
        className="absolute inset-0 h-full w-full"
        aria-hidden
        style={{
          background: darkTheme
            ? "linear-gradient(180deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.95) 100%)"
            : "linear-gradient(180deg, rgba(248,250,252,0.98) 0%, rgba(241,245,249,0.95) 100%)",
        }}
      />
    );
  }

  /* CSS-only animated wave: always visible, no WebGL/OGL dependency */
  return (
    <div
      className="hero-wave-drift absolute inset-0 h-full w-full overflow-hidden"
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(ellipse 120% 80% at 20% 40%, rgba(59, 130, 246, 0.18) 0%, transparent 50%),
          radial-gradient(ellipse 100% 70% at 80% 60%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse 80% 100% at 50% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 45%)
        `,
        backgroundSize: "200% 200%, 180% 180%, 160% 160%",
        backgroundPosition: "0% 50%, 100% 50%, 50% 80%",
        animation: "hero-wave-drift 18s ease-in-out infinite",
      }}
    />
  );
}
