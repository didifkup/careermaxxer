"use client";

/**
 * Legacy storage helpers. Prefer progress.ts for all progress/salary state.
 * Progress is persisted as a single blob under STORAGE_KEY_PROGRESS.
 */

import { loadProgress, saveProgress, type Progress } from "./progress";

/** @deprecated Use progress.loadProgress() instead. */
export function getProgress(): Progress {
  return loadProgress();
}

/** @deprecated Use progress.saveProgress() instead. */
export function setProgress(state: Progress): void {
  saveProgress(state);
}

/** @deprecated Use progress.loadProgress().salary instead. */
export function getSalary(): number | null {
  const p = loadProgress();
  return p?.salary ?? null;
}

/** @deprecated Use progress.completeNode() or progress.saveProgress() with updated salary. */
export function setSalary(value: number): void {
  const p = loadProgress();
  saveProgress({ ...p, salary: Math.max(0, value) });
}
