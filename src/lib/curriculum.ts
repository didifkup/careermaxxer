/**
 * Curriculum: floors and nodes (IB basics).
 * Game-system concepts: Floors = concept groupings, Nodes = playable lessons.
 * Data-driven floors (1–13) come from src/data/floors. See src/types/practice-game.ts.
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

/**
 * Node = playable lesson (one unit of learning; completes to grant rewards and unlock next).
 * Supports variable-length floors (4–15+ nodes per floor).
 * floorId + floorLabel + indexInFloor + totalNodesInFloor are set when building from floor specs.
 */
export type Node = {
  id: string;
  /** Numeric floor (1-based). Kept for backward compat; prefer floorId for identity. */
  floorNumber: number;
  /** Stable floor identity (e.g. "1", "2"). Safe for any number of floors. */
  floorId: string;
  /** Display label for the floor (e.g. "Finance Concepts"). */
  floorLabel: string;
  /** 0-based index of this node within its floor. */
  indexInFloor: number;
  /** Total number of nodes on this floor (enables variable-length floors: 4–15+). */
  totalNodesInFloor: number;
  title: string;
  slug: string;
  salaryReward: number;
  difficulty: NodeDifficulty;
  lesson: Lesson;
  /** Questions are sourced from QUESTION_BANK via getQuestionsForNode(). */
  questions: Question[];
};

/** Node shape without salaryReward; used for BASE_NODES before reward allocation. */
type NodeWithoutReward = Omit<Node, "salaryReward">;

/**
 * Input shape for a node when defining floor data. Enrichment (floorId, floorLabel, indexInFloor, totalNodesInFloor) is applied in data/floors/index.ts.
 */
export type FloorNodeInput = Omit<
  Node,
  "floorId" | "floorLabel" | "indexInFloor" | "totalNodesInFloor"
>;

/** Max questions per node for 2–4 min pacing (3–5 max). */
export const MAX_QUESTIONS_PER_NODE = 5;

/** Salary curve: early nodes larger jumps so 3–4 nodes → wolf upgrade or milestone (25%, 40%). */
const SALARY_FIRST_4 = 20_000;  // nodes 1–4: 80k total → ~44% after 4 nodes
const SALARY_NEXT_4 = 15_000;   // nodes 5–8
const SALARY_LAST_4 = 10_000;   // nodes 9–12 → total 180k

/** Total salary to distribute across playable nodes (must match SALARY_MAX in constants). */
const TOTAL_SALARY = 180_000;

/**
 * Front-load curve exponent: earlier nodes get higher reward.
 * Tune here: e.g. 1.25 = strong front-load, 1.1 = mild.
 */
export const FRONTLOAD_POWER = 1.25;

/** Optional per-node clamps. Set to null to disable. After clamping, rewards are re-normalized so total = TOTAL_SALARY. */
const MIN_REWARD: number | null = 1000;
const MAX_REWARD: number | null = 20_000;

/**
 * Assigns salaryReward to nodes by position: playable nodes (questions.length > 0) share
 * TOTAL_SALARY via a front-loaded weight curve; celebration/spacer nodes get 0.
 * Optional min/max clamps are applied then re-normalized in a second pass so total stays exactly TOTAL_SALARY.
 *
 * Algorithm:
 * 1) Playable = nodes where questions?.length > 0; order = path order (index i = 0..N-1).
 * 2) weight(i) = (N - i) ** FRONTLOAD_POWER.
 * 3) Distribute TOTAL_SALARY proportionally; floor each; assign leftover to first node.
 * 4) If MIN_REWARD/MAX_REWARD set: clamp each reward, then second-pass adjust so sum = TOTAL_SALARY.
 * 5) Non-playable nodes get salaryReward = 0.
 */
export function assignSalaryRewards(nodes: NodeWithoutReward[]): Node[] {
  const playableIndices: number[] = [];
  nodes.forEach((n, i) => {
    if ((n.questions?.length ?? 0) > 0) playableIndices.push(i);
  });
  const N = playableIndices.length;
  if (N === 0) {
    return nodes.map((n) => ({ ...n, salaryReward: 0 }));
  }
  const weights = playableIndices.map((_, i) => Math.pow(N - i, FRONTLOAD_POWER));
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  const rawRewards = weights.map((w) => (TOTAL_SALARY * w) / sumWeights);
  let rewards = rawRewards.map(Math.floor);
  let leftover = TOTAL_SALARY - rewards.reduce((a, b) => a + b, 0);
  rewards[0] += leftover;

  const minR = MIN_REWARD ?? -Infinity;
  const maxR = MAX_REWARD ?? Infinity;

  if (minR > -Infinity || maxR < Infinity) {
    rewards = rewards.map((r) => Math.max(minR, Math.min(maxR, r)));
    let sum = rewards.reduce((a, b) => a + b, 0);
    let delta = TOTAL_SALARY - sum;
    while (delta !== 0) {
      if (delta > 0) {
        for (let i = 0; i < N && delta > 0; i++) {
          const room = maxR - rewards[i];
          if (room <= 0) continue;
          const add = Math.min(delta, room);
          rewards[i] += add;
          delta -= add;
        }
      } else {
        for (let i = N - 1; i >= 0 && delta < 0; i--) {
          const room = rewards[i] - minR;
          if (room <= 0) continue;
          const sub = Math.min(-delta, room);
          rewards[i] -= sub;
          delta += sub;
        }
      }
      if (delta !== 0) {
        rewards[0] += delta;
        break;
      }
    }
  }

  const rewardByIndex = new Map<number, number>();
  playableIndices.forEach((origIdx, i) => rewardByIndex.set(origIdx, rewards[i]));
  return nodes.map((n, i) => ({
    ...n,
    salaryReward: rewardByIndex.get(i) ?? 0,
  }));
}

/** Base nodes from floor data (salaryReward stripped; rewards assigned via assignSalaryRewards). */
const BASE_NODES: NodeWithoutReward[] = FLOOR_NODES_FLAT.map(({ salaryReward: _s, ...rest }) => rest as NodeWithoutReward);

/** All nodes with computed salaryReward. Rest of app consumes this. */
export const NODES: Node[] = assignSalaryRewards(BASE_NODES);

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
