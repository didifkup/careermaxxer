"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * IntersectionObserver that triggers once when element is in view.
 * Uses rootRef (e.g. FSM scroll container) as root. Respects prefers-reduced-motion (returns true immediately).
 */
export function useInViewOnce(
  ref: RefObject<Element | null>,
  options: {
    rootRef?: RefObject<Element | null>;
    threshold?: number;
    rootMargin?: string;
  } = {}
): boolean {
  const { rootRef, threshold = 0.25, rootMargin = "0px" } = options;
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduceMotion(m?.matches ?? false);
    const handler = () => setReduceMotion(m?.matches ?? false);
    m?.addEventListener?.("change", handler);
    return () => m?.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      return;
    }
  }, [reduceMotion]);

  useEffect(() => {
    const el = ref?.current;
    if (!el || inView) return;
    const root = rootRef?.current ?? null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { root, threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootRef, threshold, rootMargin, inView]);

  return inView || reduceMotion;
}
