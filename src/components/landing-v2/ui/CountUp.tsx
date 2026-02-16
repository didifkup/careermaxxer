"use client";

import { useEffect, useRef, useState } from "react";

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

function useInView(ref: React.RefObject<HTMLElement>, once = true): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setInView(true);
        else if (!once) setInView(false);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once]);
  return inView;
}

export function CountUp({
  value,
  duration = 1200,
  format = (n) => n.toLocaleString(),
  className,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced || !inView ? value : 0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    startRef.current = null;
    const start = () => {
      if (startRef.current == null) startRef.current = performance.now();
      const elapsed = performance.now() - (startRef.current ?? 0);
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setDisplay(eased * value);
      if (t < 1) requestAnimationFrame(start);
    };
    const id = requestAnimationFrame(start);
    return () => cancelAnimationFrame(id);
  }, [inView, value, duration, reduced]);

  const show = reduced || !inView ? value : display;
  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(show)}
      {suffix}
    </span>
  );
}
