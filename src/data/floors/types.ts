import type { FloorNodeInput, Node, Question } from "@/lib/curriculum";

/**
 * Background / atmosphere key for a floor. Maps to design tokens or CSS for intentional feel.
 */
export type FloorBackgroundStyle = "default" | "warm" | "cool" | "accent" | "minimal";

/**
 * Floor metadata: makes each floor feel intentional and designed.
 * Use for UI (headers, completion, atmosphere) and for consistent authoring.
 */
export type FloorMetadata = {
  /** Display title for the floor (e.g. "Finance Concepts"). */
  title: string;
  /** Short concept focus (e.g. "Assets, liabilities, debt & equity"). */
  conceptFocus: string;
  /** Total salary reward for completing all nodes on this floor. */
  totalReward: number;
  /** Optional copy for the floor-complete milestone moment. When set, used as completion message. */
  milestoneCopy?: string;
  /** Key for floor background / atmosphere (design tokens or CSS). */
  backgroundStyle: FloorBackgroundStyle;
};

/**
 * Floor = concept grouping (one level of the Tower).
 * metadata: intentional design (title, concept focus, total reward, milestone copy, background).
 * nodes: variable-length (4–15+ per floor). Enriched to Node in index.ts.
 * One file per floor (floor1.ts, floor2.ts, …). Add a new floor by:
 * 1. Copy floor2.ts → floorN.ts and fill in metadata, nodes, questions, completion.
 * 2. In index.ts: add floorN to FLOOR_SPECS and to the exports.
 * See src/types/practice-game.ts for Tower/Floor/Node/Stairs/Landing/Rewards.
 */
export type FloorSpec = {
  floorNumber: number;
  /** Intentional floor design (title, concept focus, total reward, milestone copy, background). */
  metadata: FloorMetadata;
  /** Display title. Must match metadata.title. Used by FLOOR_TITLES_FROM_DATA until all consumers use metadata. */
  title: string;
  /** Variable-length: 4–15+ nodes per floor. Enriched to Node in index.ts. */
  nodes: FloorNodeInput[];
  questions: Record<string, Question[]>;
  completion: {
    lastNodeId: string;
    /** Shown on floor complete. Fallback when metadata.milestoneCopy is not set. */
    message: string;
    nextFloor: string;
  };
};

export type FloorCompletion = {
  nodeId: string;
  message: string;
  nextFloor: string;
};
