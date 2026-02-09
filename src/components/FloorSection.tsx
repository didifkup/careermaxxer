"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Node } from "@/lib/curriculum";
import { getFloorTitle } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { isNodeUnlocked } from "@/lib/progress";
import { FloorProgressHint } from "./FloorProgressHint";
import { MicroLanding } from "./MicroLanding";
import { NodeButton } from "./NodeButton";
import { StairConnector } from "./StairConnector";

const FLOOR_PROGRESS_HINT_FADE_MS = 1500;
const FLOOR_PROGRESS_MIN_NODES = 7;

interface FloorSectionProps {
  floorNumber: number;
  nodes: Node[];
  progress: Progress;
  onSelectNode?: (nodeId: string) => void;
  onLockedClick?: () => void;
  justCompletedNodeId?: string;
  /** Id of the next unlockable node (path order). Used for isCurrent. */
  currentVertexId?: string;
  /** Id of the node currently selected (e.g. modal open). Used for isCurrent. */
  selectedNodeId?: string;
}

const MICRO_LANDING_MIN_FLOOR_NODES = 7;
const MICRO_LANDING_EVERY_N_NODES = 5;

const MICRO_LANDING_COPY = ["Checkpoint", "Halfway there", "Keep going", "Almost there"];

/** Indices after which to insert a micro landing (for floors with >6 nodes). Every 4–6 nodes. */
function getMicroLandingIndices(nodeCount: number): number[] {
  if (nodeCount < MICRO_LANDING_MIN_FLOOR_NODES) return [];
  const indices: number[] = [];
  for (let i = MICRO_LANDING_EVERY_N_NODES - 1; i < nodeCount - 1; i += MICRO_LANDING_EVERY_N_NODES) {
    indices.push(i);
  }
  return indices;
}

function getStairState(progress: Progress, node: Node): "locked" | "unlocked" | "completed" {
  if (progress.completedNodeIds.includes(node.id)) return "completed";
  if (isNodeUnlocked(progress, node.id)) return "unlocked";
  return "locked";
}

/**
 * Zig-zag node layout with diagonal stair connectors between nodes.
 * Stairs rendered behind nodes (z-0); direction follows zig-zag (down-right / down-left).
 */
export function FloorSection({
  floorNumber,
  nodes,
  progress,
  onSelectNode,
  onLockedClick,
  justCompletedNodeId,
  currentVertexId,
  selectedNodeId,
}: FloorSectionProps) {
  const total = nodes.length;
  const completedInFloor = nodes.filter((n) => progress.completedNodeIds.includes(n.id)).length;
  const activeIndex =
    total >= FLOOR_PROGRESS_MIN_NODES
      ? nodes.findIndex(
          (n) => isNodeUnlocked(progress, n.id) && !progress.completedNodeIds.includes(n.id)
        )
      : -1;
  const showProgressHint = total >= FLOOR_PROGRESS_MIN_NODES && activeIndex >= 0;

  const [progressHintVisible, setProgressHintVisible] = useState(true);
  const [floorCelebrationActive, setFloorCelebrationActive] = useState(false);
  useEffect(() => {
    if (!showProgressHint) return;
    setProgressHintVisible(true);
    const t = setTimeout(() => setProgressHintVisible(false), FLOOR_PROGRESS_HINT_FADE_MS);
    return () => clearTimeout(t);
  }, [showProgressHint, floorNumber, completedInFloor]);

  const floorIsComplete = completedInFloor === total;
  const floorJustCompleted =
    Boolean(justCompletedNodeId) &&
    nodes.some((n) => n.id === justCompletedNodeId) &&
    floorIsComplete;

  useEffect(() => {
    if (!floorJustCompleted) return;
    setFloorCelebrationActive(true);
    const t = setTimeout(() => setFloorCelebrationActive(false), 800);
    return () => clearTimeout(t);
  }, [floorJustCompleted]);

  return (
    <section
      className="relative flex w-full flex-col items-stretch py-0"
      aria-label={`Floor ${floorNumber}`}
    >
      {/* Floor label + Floor complete badge when done */}
      <div className="flex flex-wrap items-center gap-1">
        <span className="rounded-full bg-brand-primary/15 px-2 py-0.5 text-xs font-bold text-brand-primary">
          {getFloorTitle(floorNumber)}
        </span>
        <div className="h-px flex-1 min-w-4 bg-brand-primary/20" />
        {floorIsComplete && (
          <span
            className={`rounded-full bg-practice-glow-completed/12 px-2.5 py-0.5 text-[11px] font-semibold text-practice-glow-completed/95 ${
              floorCelebrationActive ? "floor-complete-celebration" : ""
            }`}
          >
            Floor complete
          </span>
        )}
      </div>
      {/* Nodes, micro landings (floors with >6 nodes), and diagonal stairs; stairs continue through landings */}
      <div className="mt-0.5 flex w-full flex-col items-center md:mx-auto md:max-w-[600px] md:grid md:grid-cols-[300px_300px] md:auto-rows-auto md:gap-x-0">
        {(() => {
          const landingIndices = getMicroLandingIndices(nodes.length);
          let landingCopyIndex = 0;
          const elements: ReactNode[] = [];
          nodes.forEach((node, index) => {
            const isLeft = index % 2 === 0;
            const isCompleted = progress.completedNodeIds.includes(node.id);
            const isLocked = !isNodeUnlocked(progress, node.id);
            const isCurrent =
              node.id === currentVertexId || (selectedNodeId != null && node.id === selectedNodeId);
            elements.push(
              <div
                key={node.id}
                data-node-id={node.id}
                className="relative z-10 flex w-full justify-center md:flex-none"
                style={
                  isLeft
                    ? { gridColumn: 1, justifySelf: "start", gridRow: "auto" }
                    : { gridColumn: 2, justifySelf: "end", gridRow: "auto" }
                }
              >
                {showProgressHint && index === activeIndex && (
                  <FloorProgressHint
                    completed={completedInFloor}
                    total={total}
                    visible={progressHintVisible}
                  />
                )}
                <NodeButton
                  node={node}
                  progress={progress}
                  onSelect={onSelectNode}
                  onLockedClick={onLockedClick}
                  justCompleted={node.id === justCompletedNodeId}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  isLocked={isLocked}
                />
              </div>
            );
            if (index === nodes.length - 1) return;
            /* Micro landing before stair (breather, not reset); stairs continue through */
            if (landingIndices.includes(index)) {
              elements.push(
                <MicroLanding
                  key={`landing-${floorNumber}-${index}`}
                  copy={MICRO_LANDING_COPY[landingCopyIndex++ % MICRO_LANDING_COPY.length]}
                />
              );
            }
            const nextNode = nodes[index + 1];
            const isStairAfterJustCompleted = node.id === justCompletedNodeId;
            elements.push(
              <div key={`stair-${node.id}`} className="col-span-2 min-h-0 w-full">
                <StairConnector
                  direction={isLeft ? "down-right" : "down-left"}
                  state={getStairState(progress, nextNode)}
                  justLit={isStairAfterJustCompleted}
                />
              </div>
            );
          });
          return elements;
        })()}
      </div>
    </section>
  );
}
