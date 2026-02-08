"use client";

import { getFloors, getFloorTitle } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import { NodeCard } from "./NodeCard";

interface BuildingPathProps {
  progress: Progress;
  onSelectNode?: (nodeId: string) => void;
}

export function BuildingPath({ progress, onSelectNode }: BuildingPathProps) {
  const floors = getFloors();

  return (
    <div className="flex flex-col items-center gap-8 pb-12">
      <h2 className="self-start text-xl font-bold text-text-primary sm:text-2xl">
        Climb the office
      </h2>
      <p className="self-start text-text-secondary">
        Complete nodes in order. Each one unlocks the next and grows your salary.
      </p>

      <div className="flex w-full max-w-md flex-col items-center gap-0">
        {floors.map((nodes, floorIndex) => {
          const floorNum = floorIndex + 1;
          return (
            <div key={floorNum} className="flex flex-col items-center gap-0">
              {/* Floor label */}
              <div className="mb-3 flex w-full items-center gap-3">
                <span className="rounded-full bg-brand-primary/15 px-3 py-1 text-sm font-semibold text-brand-primary">
                  {getFloorTitle(floorNum)}
                </span>
                <div className="h-px flex-1 bg-brand-primary/20" />
              </div>
              {/* Nodes on this floor */}
              <div className="flex flex-col items-center gap-4">
                {nodes.map((node) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    progress={progress}
                    onSelect={onSelectNode}
                  />
                ))}
              </div>
              {/* Connector to next floor (except after last) */}
              {floorIndex < floors.length - 1 && (
                <div
                  className="my-2 h-8 w-1 shrink-0 rounded-full bg-brand-primary/30"
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
