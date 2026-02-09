"use client";

import { useCallback, useMemo } from "react";
import { getFloors } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { isNodeUnlocked } from "@/lib/progress";
import { useToast } from "@/contexts/ToastContext";
import { FloorSection } from "./FloorSection";

const LOCKED_TOAST_MESSAGE = "Finish the previous node to unlock this floor.";

interface BuildingPathProps {
  progress: Progress;
  onSelectNode?: (nodeId: string) => void;
  /** When set, the tower runs completion animation on this node (pop, check, salary float, stair light). */
  justCompletedNodeId?: string | null;
  /** When set, this node is considered "current" (e.g. modal open on it). */
  selectedNodeId?: string | null;
}

/**
 * Renders the Tower path: Floors (concept groupings) and Stairs (connectors between floors).
 * Duolingo-style vertical path with building background. Locked node → toast; unlocked → Learning modal.
 * See src/types/practice-game.ts (Tower, Floor, Node, Stairs, Landing, Rewards).
 */
export function BuildingPath({ progress, onSelectNode, justCompletedNodeId, selectedNodeId }: BuildingPathProps) {
  const { addToast } = useToast();

  const showLockedToast = useCallback(() => {
    addToast(LOCKED_TOAST_MESSAGE);
  }, [addToast]);

  const floors = getFloors();

  /** Id of the next unlockable node (first in path order that is unlocked and not completed). */
  const currentVertexId = useMemo(() => {
    const allNodes = floors.flat();
    const next = allNodes.find(
      (n) => isNodeUnlocked(progress, n.id) && !progress.completedNodeIds.includes(n.id)
    );
    return next?.id ?? null;
  }, [floors, progress]);

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      {/* Subtle building background: vertical window stripes */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.04]"
        aria-hidden
      >
        <div className="flex h-full gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-8 shrink-0 rounded bg-brand-primary"
              style={{ minHeight: "100%" }}
            />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, hsl(var(--practice-floor-gradient-from)), hsl(var(--practice-floor-gradient-via)), hsl(var(--practice-floor-gradient-to)))`,
        }}
        aria-hidden
      />

      {/* Floating icons in building — subtle */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-around gap-8 py-8 opacity-[0.07]" aria-hidden>
        {[1, 2, 3, 4].map((floor) => (
          <div key={floor} className="flex justify-around">
            <span className="animate-float text-2xl" style={{ animationDelay: `${floor * 0.2}s` }}>💼</span>
            <span className="animate-float text-2xl" style={{ animationDelay: `${floor * 0.2 + 0.3}s` }}>📈</span>
            <span className="animate-float text-2xl" style={{ animationDelay: `${floor * 0.2 + 0.6}s` }}>💰</span>
          </div>
        ))}
      </div>

      {/* Path content — tight stack */}
      <div className="relative flex flex-col gap-0 pb-3">
        <h2 className="mb-0 text-lg font-bold text-text-primary sm:text-xl">
          Climb the office
        </h2>
        <p className="mb-1.5 text-sm text-text-secondary">
          One node at a time. Unlock the next, grow your salary — you&apos;ve got this.
        </p>

        {floors.map((nodes, floorIndex) => {
          const floorNum = floorIndex + 1;
          return (
            <div key={floorNum}>
              <FloorSection
                floorNumber={floorNum}
                nodes={nodes}
                progress={progress}
                onSelectNode={onSelectNode}
                onLockedClick={showLockedToast}
                justCompletedNodeId={justCompletedNodeId ?? undefined}
                currentVertexId={currentVertexId ?? undefined}
                selectedNodeId={selectedNodeId ?? undefined}
              />
              {/* Stairs: tight connector between floors */}
              {floorIndex < floors.length - 1 && (
                <div className="flex justify-center py-0" aria-hidden>
                  <div className="h-2.5 w-0.5 rounded-full bg-practice-stair-active/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
