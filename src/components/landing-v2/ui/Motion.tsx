"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardHover: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.2 } },
};

const viewportOnce = { once: true, amount: 0.2 };
const reducedMotionViewport = { once: true, amount: 0 };

export function FadeUp(props: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  useReducedMotion?: boolean;
}) {
  const { children, className, delay = 0, useReducedMotion } = props;
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={useReducedMotion ? reducedMotionViewport : viewportOnce}
      variants={fadeUp}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer(props: {
  children: React.ReactNode;
  className?: string;
  useReducedMotion?: boolean;
}) {
  const { children, className, useReducedMotion } = props;
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={useReducedMotion ? reducedMotionViewport : viewportOnce}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function CardHover(props: { children: React.ReactNode; className?: string }) {
  const { children, className } = props;
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-black/5 shadow-[0_20px_60px_rgba(37,99,235,0.10)] transition-shadow duration-200 hover:shadow-[0_24px_64px_rgba(37,99,235,0.14)]",
        className
      )}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      {children}
    </motion.div>
  );
}

export const motionVariants = { fadeUp, staggerContainer, cardHover };
export const viewportConfig = { viewportOnce, reducedMotionViewport };

export function useReducedMotion(): boolean {
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
