"use client";

import { useCallback } from "react";
import { getFloors } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { useToast } from "@/contexts/ToastContext";
import { FloorSection } from "./FloorSection";

const LOCKED_TOAST_MESSAGE = "Finish the previous node to unlock this floor.";

interface BuildingPathProps {
  progress: Progress;
  onSelectNode?: (nodeId: string) => void;
}

/**
 * Duolingo-style vertical path: floors stacked with a subtle building background.
 * Uses curriculum.ts for layout. Locked node click shows toast; unlocked opens Learning modal.
 */
export function BuildingPath({ progress, onSelectNode }: BuildingPathProps) {
  const { addToast } = useToast();

  const showLockedToast = useCallback(() => {
    addToast(LOCKED_TOAST_MESSAGE);
  }, [addToast]);

  const floors = getFloors();

  return (
    <div className="relative w-full max-w-lg mx-auto">
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
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-surface-base/80 via-transparent to-surface-base/80 pointer-events-none" aria-hidden />

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

      {/* Path content */}
      <div className="relative flex flex-col gap-0 pb-12">
        <h2 className="mb-2 text-xl font-bold text-text-primary sm:text-2xl">
          Climb the office
        </h2>
        <p className="mb-6 text-text-secondary">
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
              />
              {/* Connector line to next floor */}
              {floorIndex < floors.length - 1 && (
                <div className="flex justify-center py-2" aria-hidden>
                  <div className="h-8 w-1 rounded-full bg-brand-primary/30" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
