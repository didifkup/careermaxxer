import type { Node, Question } from "@/lib/curriculum";
import type { FloorCompletion } from "./types";
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

/** Add a new floor: create floorN.ts (copy floor2.ts), then add to this array. */
const FLOOR_SPECS = [floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8, floor9, floor10, floor11, floor12, floor13];

/** All nodes from data-driven floors (1, 2, …) in order. Curriculum merges these with legacy nodes. */
export const FLOOR_NODES_FLAT: Node[] = FLOOR_SPECS.flatMap((s) => s.nodes);

/** Questions by nodeId for data-driven floors. questionBank checks this first. */
export const FLOOR_QUESTIONS_MAP: Record<string, Question[]> = Object.assign(
  {},
  ...FLOOR_SPECS.map((s) => s.questions)
);

/** Completion messages: when user finishes last node of a floor, show message + nextFloor. */
export const FLOOR_COMPLETIONS: FloorCompletion[] = FLOOR_SPECS.map((s) => ({
  nodeId: s.completion.lastNodeId,
  message: s.completion.message,
  nextFloor: s.completion.nextFloor,
}));

/** Floor titles for path UI. Curriculum merges with legacy floor titles. */
export const FLOOR_TITLES_FROM_DATA: Record<number, string> = Object.fromEntries(
  FLOOR_SPECS.map((s) => [s.floorNumber, s.title])
);
