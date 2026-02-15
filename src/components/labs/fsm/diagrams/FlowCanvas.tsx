"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { NeuralChipFromNode } from "./NeuralChip";
import { EnergyLine } from "./EnergyLine";
import type { NodeDef, EdgeDef } from "./types";
import { cn } from "@/lib/utils";

const STAGGER_MS = 90;
const DURATION = 0.28;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export type FlowCanvasProps = {
  nodes: NodeDef[];
  edges?: EdgeDef[];
  highlights?: string[];
  layout?: "stack" | "wide";
  rootRef?: React.RefObject<Element | null>;
};

export function FlowCanvas({
  nodes,
  edges = [],
  highlights = [],
  layout = "stack",
  rootRef,
}: FlowCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(containerRef, { rootRef, threshold: 0.25 });

  const isWide = layout === "wide";
  const highlightSet = new Set(highlights);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col items-stretch gap-0",
        isWide && "md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-2"
      )}
    >
      {nodes.map((node, i) => (
        <div
          key={node.id}
          className={cn(
            "flex flex-col items-stretch gap-0",
            isWide && "md:flex-row md:items-center md:gap-2 md:flex-shrink-0"
          )}
        >
          <motion.div
            initial={inView ? false : { opacity: 0, y: 10 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{
              duration: DURATION,
              ease: EASE,
              delay: inView ? i * (STAGGER_MS / 1000) : 0,
            }}
            className=""
          >
            <NeuralChipFromNode
              node={node}
              highlighted={highlightSet.has(node.id)}
            />
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={inView ? false : { opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{
                duration: 0.2,
                delay: inView ? i * (STAGGER_MS / 1000) + DURATION : 0,
              }}
            >
              <EnergyLine
                vertical={!isWide}
                animateDraw={inView}
                delayMs={i * STAGGER_MS + DURATION * 1000}
                variant={
                  edges.find(
                    (e) => e.from === nodes[i].id && e.to === nodes[i + 1].id
                  )?.variant
                }
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
