"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { NeuralChipFromNode } from "./NeuralChip";
import { EnergyLine } from "./EnergyLine";
import type { NodeDef } from "./types";

const STAGGER_MS = 90;
const DURATION = 0.28;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export type SplitSignalProps = {
  left: NodeDef;
  branches: NodeDef[];
  bottom?: NodeDef;
  highlights?: string[];
  rootRef?: React.RefObject<Element | null>;
};

export function SplitSignal({
  left,
  branches,
  bottom,
  highlights = [],
  rootRef,
}: SplitSignalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(containerRef, { rootRef, threshold: 0.25 });
  const highlightSet = new Set(highlights);

  return (
    <div ref={containerRef} className="flex flex-col items-stretch gap-0">
      <motion.div
        initial={inView ? false : { opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: DURATION, ease: EASE, delay: inView ? 0 : 0 }}
        className="flex justify-center"
      >
        <NeuralChipFromNode
          node={left}
          highlighted={highlightSet.has(left.id)}
        />
      </motion.div>

      <motion.div
        initial={inView ? false : { opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.2, delay: inView ? DURATION : 0 }}
        className="flex justify-center"
      >
        <EnergyLine vertical animateDraw={inView} delayMs={DURATION * 1000} />
      </motion.div>

      <div className="grid gap-4 pt-1 sm:grid-cols-2 md:grid-cols-3">
        {branches.map((node, i) => (
          <motion.div
            key={node.id}
            initial={inView ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: DURATION,
              ease: EASE,
              delay: inView ? (i + 1) * (STAGGER_MS / 1000) : 0,
            }}
            className="flex justify-center"
          >
            <NeuralChipFromNode
              node={node}
              highlighted={highlightSet.has(node.id)}
            />
          </motion.div>
        ))}
      </div>

      {bottom && (
        <>
          <motion.div
            initial={inView ? false : { opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{
              duration: 0.2,
              delay: inView ? (branches.length + 1) * (STAGGER_MS / 1000) + DURATION : 0,
            }}
            className="flex justify-center pt-2"
          >
            <EnergyLine vertical animateDraw={inView} delayMs={(branches.length + 1) * STAGGER_MS} />
          </motion.div>
          <motion.div
            initial={inView ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: DURATION,
              ease: EASE,
              delay: inView ? (branches.length + 1) * (STAGGER_MS / 1000) + 0.1 : 0,
            }}
            className="flex justify-center"
          >
            <NeuralChipFromNode
              node={bottom}
              highlighted={highlightSet.has(bottom.id)}
            />
          </motion.div>
        </>
      )}
    </div>
  );
}
