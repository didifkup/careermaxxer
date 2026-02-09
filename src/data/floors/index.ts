import type { Node, Question } from "@/lib/curriculum";
import type { FloorCompletion, FloorMetadata } from "./types";
import { floor1 } from "./floor1";
import { floor2 } from "./floor2";
import { floor3 } from "./floor3";
import { floor4 } from "./floor4";
import { floor5 } from "./floor5";
import { floor6 } from "./floor6";
import { floor7 } from "./floor7";
import { floor8 } from "./floor8";
import { floor9 } from "./floor9";
import { floor10 } from "./floor10";
import { floor11 } from "./floor11";
import { floor12 } from "./floor12";
import { floor13 } from "./floor13";

/** Add a new floor: create floorN.ts (copy floor2.ts), then add to this array. Variable-length floors (4–15+ nodes) supported. */
const FLOOR_SPECS = [floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8, floor9, floor10, floor11, floor12, floor13];

/** Enrich floor node inputs with floorId, floorLabel, indexInFloor, totalNodesInFloor, and questions from spec. */
function enrichFloorNodes(spec: (typeof FLOOR_SPECS)[number]): Node[] {
  const { floorNumber, metadata, nodes, questions: questionsByNodeId } = spec;
  const floorId = String(floorNumber);
  const floorLabel = metadata.title;
  const totalNodesInFloor = nodes.length;
  return nodes.map((node, indexInFloor) => ({
    ...node,
    floorId,
    floorLabel,
    indexInFloor,
    totalNodesInFloor,
    questions: questionsByNodeId[node.id] ?? [],
  }));
}

/** All nodes from data-driven floors (1, 2, …) in order. Each node has floorId, floorLabel, indexInFloor, totalNodesInFloor. */
export const FLOOR_NODES_FLAT: Node[] = FLOOR_SPECS.flatMap(enrichFloorNodes);

/** Questions by nodeId for data-driven floors. questionBank checks this first. */
export const FLOOR_QUESTIONS_MAP: Record<string, Question[]> = Object.assign(
  {},
  ...FLOOR_SPECS.map((s) => s.questions)
);

/** Completion messages: when user finishes last node of a floor. Uses metadata.milestoneCopy when set. */
export const FLOOR_COMPLETIONS: FloorCompletion[] = FLOOR_SPECS.map((s) => ({
  nodeId: s.completion.lastNodeId,
  message: s.metadata.milestoneCopy ?? s.completion.message,
  nextFloor: s.completion.nextFloor,
}));

/** Floor titles for path UI. From metadata.title. */
export const FLOOR_TITLES_FROM_DATA: Record<number, string> = Object.fromEntries(
  FLOOR_SPECS.map((s) => [s.floorNumber, s.metadata.title])
);

/** Floor metadata by floor number. Use for UI (concept focus, total reward, background style, milestone copy). */
export const FLOOR_METADATA: Record<number, FloorMetadata> = Object.fromEntries(
  FLOOR_SPECS.map((s) => [s.floorNumber, s.metadata])
);
