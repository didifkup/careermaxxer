/**
 * Curriculum: floors and nodes (IB basics).
 * Data-driven floors (1–13) come from src/data/floors.
 */
import { FLOOR_NODES_FLAT, FLOOR_TITLES_FROM_DATA } from "@/data/floors";

/** "core" = main quiz (blocks progression); "drill" = optional practice (does not block). */
export type QuestionDifficulty = "core" | "drill";

/** Duolingo-style question types for Floor 1 (5th-grade, mixed practice). */
export type QuestionType = "multipleChoice" | "fillInBlank" | "tapAllThatApply" | "trueFalse" | "orderSteps";

/** Legacy MC-only shape (used by question bank for floors 2+). */
export type QuestionMC = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explainLikeIm5: string;
  difficulty?: QuestionDifficulty;
};

/** Union: legacy MC or new typed questions for Floor 1. */
export type Question =
  | (QuestionMC & { type?: "multipleChoice" })
  | {
      type: "fillInBlank";
      id: string;
      prompt: string;
      correctAnswer: string;
      explainLikeIm5?: string;
    }
  | {
      type: "tapAllThatApply";
      id: string;
      prompt: string;
      choices: string[];
      correctIndices: number[];
      explainLikeIm5?: string;
    }
  | {
      type: "trueFalse";
      id: string;
      prompt: string;
      correctAnswer: boolean;
      explainLikeIm5?: string;
    }
  | {
      type: "orderSteps";
      id: string;
      prompt: string;
      /** Steps shown in shuffled order; user puts them in correct order. */
      steps: string[];
      /** Indices into steps in the correct order (e.g. [1, 2, 0] = steps[1], steps[2], steps[0]). */
      correctOrder: number[];
      explainLikeIm5?: string;
    };

export type Lesson = {
  headline: string;
  bullets: string[];
  analogy: string;
  recap: string;
};

export type NodeDifficulty = "Easy" | "Medium" | "Celebration";

export type Node = {
  id: string;
  floorNumber: number;
  title: string;
  slug: string;
  salaryReward: number;
  difficulty: NodeDifficulty;
  lesson: Lesson;
  /** Questions are sourced from QUESTION_BANK via getQuestionsForNode(). */
  questions: Question[];
};

/** Max questions per node for 2–4 min pacing (3–5 max). */
export const MAX_QUESTIONS_PER_NODE = 5;

/** Salary curve: early nodes larger jumps so 3–4 nodes → wolf upgrade or milestone (25%, 40%). */
const SALARY_FIRST_4 = 20_000;  // nodes 1–4: 80k total → ~44% after 4 nodes
const SALARY_NEXT_4 = 15_000;   // nodes 5–8
const SALARY_LAST_4 = 10_000;   // nodes 9–12 → total 180k

/** All nodes: data-driven floors (1–13) from @/data/floors. */
export const NODES: Node[] = [
  ...FLOOR_NODES_FLAT,
];

/** Total salary if all nodes completed (for validation). */
export const TOTAL_SALARY_REWARD = NODES.reduce((sum, n) => sum + n.salaryReward, 0);

/** Get all nodes for a given floor (1-based). */
export function getNodesForFloor(floorNumber: number): Node[] {
  return NODES.filter((n) => n.floorNumber === floorNumber);
}

/** Floor display titles (Floor 1 = Finance Concepts, Floor 2 = Accounting – Concepts, etc.). */
/** Data-driven floors (1–8) from FLOOR_TITLES_FROM_DATA. */
export const FLOOR_TITLES: Record<number, string> = { ...FLOOR_TITLES_FROM_DATA };

/** Get display title for a floor (e.g. "Floor 2: Accounting – Concepts"). */
export function getFloorTitle(floorNumber: number): string {
  const title = FLOOR_TITLES[floorNumber];
  return title ? `Floor ${floorNumber}: ${title}` : `Floor ${floorNumber}`;
}

/** Get all floors as arrays of nodes. Floors are 1..13. */
export function getFloors(): Node[][] {
  const floors: Node[][] = [];
  const maxFloor = Math.max(...NODES.map((n) => n.floorNumber), 13);
  for (let f = 1; f <= maxFloor; f++) {
    floors.push(getNodesForFloor(f));
  }
  return floors;
}

/** Get a single node by id. */
export function getNodeById(id: string): Node | undefined {
  return NODES.find((n) => n.id === id);
}

/** Get node index in NODES (0-based). Used for unlock logic: previous node must be completed. */
export function getNodeIndex(id: string): number {
  const i = NODES.findIndex((n) => n.id === id);
  return i === -1 ? -1 : i;
}

/** Get the next node in path order (for "One more" preview). Returns undefined if none. */
export function getNextNodeAfter(nodeId: string): Node | undefined {
  const i = getNodeIndex(nodeId);
  if (i < 0 || i >= NODES.length - 1) return undefined;
  return NODES[i + 1];
}
