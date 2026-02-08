"use client";

import type { Node } from "@/lib/curriculum";
import { getFloorTitle } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { NodeButton } from "./NodeButton";

interface FloorSectionProps {
  floorNumber: number;
  nodes: Node[];
  progress: Progress;
  onSelectNode?: (nodeId: string) => void;
  onLockedClick?: () => void;
}

/**
 * Duolingo-style floor: 3 nodes with alternating left/right offset.
 * Layout: node 0 left, node 1 right, node 2 left (zigzag path).
 */
export function FloorSection({
  floorNumber,
  nodes,
  progress,
  onSelectNode,
  onLockedClick,
}: FloorSectionProps) {
  return (
    <section
      className="relative flex w-full flex-col items-stretch gap-6 py-6"
      aria-label={`Floor ${floorNumber}`}
    >
      {/* Floor label */}
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-brand-primary/15 px-3 py-1.5 text-sm font-bold text-brand-primary">
          {getFloorTitle(floorNumber)}
        </span>
        <div className="h-px flex-1 bg-brand-primary/20" />
      </div>

      {/* Nodes: alternating left/right offset */}
      <div className="flex w-full max-w-md flex-col gap-4 self-center">
        {nodes.map((node, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={node.id}
              className={`flex w-full ${isLeft ? "justify-start pl-0 pr-8 sm:pr-12" : "justify-end pl-8 pr-0 sm:pl-12"}`}
            >
              <NodeButton
                node={node}
                progress={progress}
                onSelect={onSelectNode}
                onLockedClick={onLockedClick}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
