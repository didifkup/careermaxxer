"use client";

import { SALARY_MAX, STORAGE_KEY_PROGRESS } from "./constants";
import { NODES, getNodeById, getNodeIndex } from "./curriculum";

/**
 * Progress shape persisted to localStorage.
 * Single source of truth for completion state, salary, wolf stage, and streak.
 */
export type Progress = {
  completedNodeIds: string[];
  salary: number;
  wolfStage: 0 | 1 | 2 | 3 | 4;
  currentFloor: number;
  streakCount: number;
  /** YYYY-MM-DD; used to compute streak (consecutive days). */
  lastCompletionDate?: string;
};

const DEFAULT_PROGRESS: Progress = {
  completedNodeIds: [],
  salary: 0,
  wolfStage: 0,
  currentFloor: 1,
  streakCount: 0,
};

const STORAGE_KEY = STORAGE_KEY_PROGRESS;

/** Salary % thresholds: 0: 0–20%, 1: 20–40%, 2: 40–65%, 3: 65–85%, 4: 85–100%. */
const WOLF_SALARY_THRESHOLDS = [0.2, 0.4, 0.65, 0.85] as const;

function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/**
 * Compute wolf stage (0–4) from current salary as a fraction of SALARY_MAX.
 * 0: 0–20%, 1: 20–40%, 2: 40–65%, 3: 65–85%, 4: 85–100%.
 */
export function computeWolfStage(salary: number): 0 | 1 | 2 | 3 | 4 {
  if (salary <= 0) return 0;
  const pct = Math.min(1, salary / SALARY_MAX);
  if (pct >= 0.85) return 4;
  if (pct >= 0.65) return 3;
  if (pct >= 0.4) return 2;
  if (pct >= 0.2) return 1;
  return 0;
}

/**
 * Normalize and validate progress from storage. Handles missing/invalid data.
 * Unit check: loadProgress() with no storage returns DEFAULT_PROGRESS.
 * Unit check: loadProgress() with invalid JSON returns DEFAULT_PROGRESS.
 */
export function loadProgress(): Progress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null || raw === "") return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_PROGRESS };
    const p = parsed as Record<string, unknown>;

    const completedNodeIds = Array.isArray(p.completedNodeIds)
      ? (p.completedNodeIds as string[]).filter((id): id is string => typeof id === "string")
      : [];
    const salary = typeof p.salary === "number" && p.salary >= 0
      ? Math.min(p.salary, SALARY_MAX)
      : 0;
    const currentFloor =
      typeof p.currentFloor === "number" && p.currentFloor >= 1
        ? Math.min(p.currentFloor, 5)
        : 1;
    const streakCount =
      typeof p.streakCount === "number" && p.streakCount >= 0
        ? Math.floor(p.streakCount)
        : 0;
    const lastCompletionDate =
      typeof p.lastCompletionDate === "string" ? p.lastCompletionDate : undefined;

    const wolfStage = computeWolfStage(salary);

    return {
      completedNodeIds,
      salary,
      wolfStage,
      currentFloor,
      streakCount,
      lastCompletionDate,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

/**
 * Persist progress to localStorage. No-op on server or on write failure.
 * Unit check: saveProgress then loadProgress returns same data.
 */
export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore quota / security errors
  }
}

/**
 * Reset to default progress and persist.
 * Unit check: resetProgress(); loadProgress() === DEFAULT_PROGRESS (with salary 0, etc.).
 */
export function resetProgress(): void {
  const next: Progress = { ...DEFAULT_PROGRESS };
  saveProgress(next);
}

/**
 * Returns node ids that are unlocked: either the first node, or any node whose
 * immediate predecessor (by NODES order) is completed.
 * Unit check: getUnlockedNodeIds(empty progress) returns [firstNode.id].
 * Unit check: getUnlockedNodeIds(all completed) returns all node ids.
 */
export function getUnlockedNodeIds(progress: Progress): string[] {
  const completed = new Set(progress.completedNodeIds);
  const unlocked: string[] = [];
  for (let i = 0; i < NODES.length; i++) {
    const node = NODES[i];
    const prevCompleted = i === 0 || completed.has(NODES[i - 1].id);
    if (prevCompleted) unlocked.push(node.id);
  }
  return unlocked;
}

/**
 * True if this node exists and is unlocked (previous node completed, or first node).
 * Unit check: isNodeUnlocked(progress, firstNode.id) === true when progress is empty.
 * Unit check: isNodeUnlocked(progress, "nonexistent") === false.
 */
export function isNodeUnlocked(progress: Progress, nodeId: string): boolean {
  const index = getNodeIndex(nodeId);
  if (index < 0) return false;
  if (index === 0) return true;
  return progress.completedNodeIds.includes(NODES[index - 1].id);
}

/**
 * Update streak when completing a node: same day = no change, next day = +1, else reset to 1.
 * Unit check: same day twice -> streak unchanged. Next day -> +1. Skip day -> 1.
 */
function nextStreak(prev: number, lastDate: string | undefined, today: string): number {
  if (!lastDate) return 1;
  if (lastDate === today) return prev;
  const last = new Date(lastDate);
  const curr = new Date(today);
  const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return prev + 1;
  return 1;
}

/**
 * If node is unlocked and not yet completed, marks it complete, updates salary,
 * wolfStage, currentFloor, streak, and lastCompletionDate; saves and returns new progress.
 * Otherwise returns current progress unchanged.
 * Unit check: completeNode("node-revenue") on fresh progress returns new progress with 1 completed, salary 15k.
 * Unit check: completeNode("node-revenue") when already completed returns same progress.
 * Unit check: completeNode("node-expenses") when node-revenue not completed returns same progress.
 */
export function completeNode(nodeId: string): Progress {
  const progress = loadProgress();
  const node = getNodeById(nodeId);
  if (!node) return progress;
  if (progress.completedNodeIds.includes(nodeId)) return progress;
  if (!isNodeUnlocked(progress, nodeId)) return progress;

  const today = getTodayDateString();
  const newCompleted = [...progress.completedNodeIds, nodeId];
  const newSalary = Math.min(SALARY_MAX, progress.salary + node.salaryReward);
  const newWolfStage = computeWolfStage(newSalary);
  const newCurrentFloor = Math.max(progress.currentFloor, node.floorNumber);
  const newStreak = nextStreak(
    progress.streakCount,
    progress.lastCompletionDate,
    today
  );

  const next: Progress = {
    completedNodeIds: newCompleted,
    salary: newSalary,
    wolfStage: newWolfStage,
    currentFloor: newCurrentFloor,
    streakCount: newStreak,
    lastCompletionDate: today,
  };

  saveProgress(next);
  return next;
}
