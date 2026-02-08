import type { Question } from "@/lib/curriculum";
import { MAX_QUESTIONS_PER_NODE } from "@/lib/curriculum";
import { FLOOR_QUESTIONS_MAP } from "@/data/floors";
import rewrittenData from "./rewritten_questions_existing.json";

/** Raw shape from rewritten_questions_existing.json */
type RewrittenItem = {
  id: string;
  nodeId: string;
  difficulty: "core" | "drill";
  prompt: string;
  choices: string[];
  correctIndex: number;
  explainLikeIm5: string;
  originalQuestionText?: string;
  originalAnswerText?: string;
  page?: number;
  section?: string;
};

/**
 * Question bank keyed by node id. Populated from rewritten_questions_existing.json.
 * Each node has both core and drill questions; difficulty is on each Question.
 */
function buildQuestionBank(): Record<string, Question[]> {
  const bank: Record<string, Question[]> = {};
  const list = rewrittenData as RewrittenItem[];
  for (const item of list) {
    const q: Question = {
      id: item.id,
      prompt: item.prompt,
      choices: item.choices,
      correctIndex: item.correctIndex,
      explainLikeIm5: item.explainLikeIm5,
      difficulty: item.difficulty,
    };
    if (!bank[item.nodeId]) bank[item.nodeId] = [];
    bank[item.nodeId].push(q);
  }
  return bank;
}

export const QUESTION_BANK: Record<string, Question[]> = buildQuestionBank();

/**
 * Seeded PRNG (mulberry32). Returns 0..1.
 */
function seededRandom(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Hash a string to a 32-bit integer (djb2).
 */
function hashString(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return h >>> 0;
}

/**
 * Fisher–Yates shuffle with seeded RNG. Mutates the array.
 */
function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const rng = seededRandom(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Core questions for the main quiz (blocks progression). Beginner-friendly, up to maxCount.
 * Data-driven floors use FLOOR_QUESTIONS_MAP; others use QUESTION_BANK (core only).
 */
export function getCoreQuestionsForNode(
  nodeId: string,
  maxCount: number = MAX_QUESTIONS_PER_NODE
): Question[] {
  const floorQuestions = FLOOR_QUESTIONS_MAP[nodeId];
  if (floorQuestions) return [...floorQuestions];
  const list = QUESTION_BANK[nodeId];
  if (!list || list.length === 0) return [];
  const core = list.filter((q) => "difficulty" in q && q.difficulty === "core");
  if (core.length === 0) return [];
  const dateStr = getTodayDateString();
  const seed = hashString(nodeId + "core" + dateStr);
  const copy = [...core];
  shuffleWithSeed(copy, seed);
  return copy.slice(0, maxCount);
}

/** Max drill questions per node when user chooses "Drill Mode". */
export const DRILL_QUESTIONS_MAX = 20;

/**
 * Drill questions for optional practice (does not block progression). Up to maxCount.
 */
export function getDrillQuestionsForNode(
  nodeId: string,
  maxCount: number = DRILL_QUESTIONS_MAX
): Question[] {
  const list = QUESTION_BANK[nodeId];
  if (!list || list.length === 0) return [];
  const drill = list.filter((q) => "difficulty" in q && q.difficulty === "drill");
  if (drill.length === 0) return [];
  const dateStr = getTodayDateString();
  const seed = hashString(nodeId + "drill" + dateStr);
  const copy = [...drill];
  shuffleWithSeed(copy, seed);
  return copy.slice(0, maxCount);
}

/**
 * Returns questions for a node from the bank (all difficulties).
 * - If nodeId not in bank, returns [].
 * - If maxCount is provided: deterministic daily shuffle (seed = nodeId + YYYY-MM-DD), then slice(0, maxCount).
 * - If maxCount is not provided: returns all questions for that node.
 */
export function getQuestionsForNode(nodeId: string, maxCount?: number): Question[] {
  const list = QUESTION_BANK[nodeId];
  if (!list || list.length === 0) return [];

  if (maxCount === undefined) {
    return [...list];
  }

  const dateStr = getTodayDateString();
  const seed = hashString(nodeId + dateStr);
  const copy = [...list];
  shuffleWithSeed(copy, seed);
  return copy.slice(0, maxCount);
}

/**
 * Total number of questions across all nodes in the bank.
 */
export function getAllQuestionsCount(): number {
  return Object.values(QUESTION_BANK).reduce((sum, qs) => sum + qs.length, 0);
}
