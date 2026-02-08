import type { Node, Question } from "@/lib/curriculum";

/**
 * One file per floor (floor1.ts, floor2.ts, …). Add a new floor by:
 * 1. Copy floor2.ts → floorN.ts and fill in nodes, questions, completion.
 * 2. In index.ts: add floorN to FLOOR_SPECS and to the exports.
 * No changes needed in curriculum.ts, questionBank.ts, or PostCompleteView.tsx.
 */
export type FloorSpec = {
  floorNumber: number;
  title: string;
  nodes: Node[];
  questions: Record<string, Question[]>;
  completion: {
    lastNodeId: string;
    message: string;
    nextFloor: string;
  };
};

export type FloorCompletion = {
  nodeId: string;
  message: string;
  nextFloor: string;
};
