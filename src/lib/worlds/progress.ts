/**
 * Worlds-only progress and salary. Separate from technical nodes.
 * localStorage with in-memory fallback when storage is unavailable.
 */

export const SALARY_CAP = 180_000;

const STORAGE_KEY_PROGRESS = "modeling_progress_v1";
const STORAGE_KEY_SALARY = "modeling_salary_v1";

export type ModelingProgress = {
  completedNodeIds: string[];
};

const DEFAULT_PROGRESS: ModelingProgress = {
  completedNodeIds: [],
};

// ---------------------------------------------------------------------------
// Storage availability (SSR / private mode / quota)
// ---------------------------------------------------------------------------

let storageAvailable = true;

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    window.localStorage.setItem("_probe", "1");
    window.localStorage.removeItem("_probe");
    return window.localStorage;
  } catch {
    storageAvailable = false;
    return null;
  }
}

// In-memory fallback when localStorage is unavailable
let memoryProgress: ModelingProgress = { ...DEFAULT_PROGRESS };
let memorySalary = 0;

// ---------------------------------------------------------------------------
// Safe parse helpers
// ---------------------------------------------------------------------------

function safeParseProgress(raw: string | null): ModelingProgress {
  if (raw == null || raw === "") return { ...DEFAULT_PROGRESS };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_PROGRESS };
    const p = parsed as Record<string, unknown>;
    const completedNodeIds = Array.isArray(p.completedNodeIds)
      ? (p.completedNodeIds as string[]).filter((id): id is string => typeof id === "string")
      : [];
    return { completedNodeIds };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function safeParseSalary(raw: string | null): number {
  if (raw == null || raw === "") return 0;
  try {
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? Math.min(n, SALARY_CAP) : 0;
  } catch {
    return 0;
  }
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------

export function getProgress(): ModelingProgress {
  const storage = getStorage();
  if (!storageAvailable || !storage) return { ...memoryProgress };
  try {
    const raw = storage.getItem(STORAGE_KEY_PROGRESS);
    const progress = safeParseProgress(raw);
    memoryProgress = progress;
    return progress;
  } catch {
    storageAvailable = false;
    return { ...memoryProgress };
  }
}

/**
 * Snapshot of progress for use after client mount only.
 * Returns defaults (empty progress) if window/localStorage unavailable. Does not throw.
 */
export function getProgressSnapshot(): ModelingProgress {
  try {
    return getProgress();
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function markNodeComplete(nodeId: string): void {
  const progress = getProgress();
  if (progress.completedNodeIds.includes(nodeId)) return;
  const next: ModelingProgress = {
    completedNodeIds: [...progress.completedNodeIds, nodeId],
  };
  memoryProgress = next;
  const storage = getStorage();
  if (storageAvailable && storage) {
    try {
      storage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(next));
    } catch {
      storageAvailable = false;
    }
  }
}

export function isNodeComplete(nodeId: string): boolean {
  return getProgress().completedNodeIds.includes(nodeId);
}

export function resetProgress(): void {
  memoryProgress = { ...DEFAULT_PROGRESS };
  const storage = getStorage();
  if (storageAvailable && storage) {
    try {
      storage.removeItem(STORAGE_KEY_PROGRESS);
    } catch {
      storageAvailable = false;
    }
  }
}

// ---------------------------------------------------------------------------
// Salary
// ---------------------------------------------------------------------------

export function getSalaryEarned(): number {
  const storage = getStorage();
  if (!storageAvailable || !storage) return memorySalary;
  try {
    const raw = storage.getItem(STORAGE_KEY_SALARY);
    const salary = safeParseSalary(raw);
    memorySalary = salary;
    return salary;
  } catch {
    storageAvailable = false;
    return memorySalary;
  }
}

/**
 * Snapshot of salary for use after client mount only.
 * Returns 0 if window/localStorage unavailable. Does not throw.
 */
export function getSalarySnapshot(): number {
  try {
    return getSalaryEarned();
  } catch {
    return 0;
  }
}

export function addSalary(amount: number): number {
  const current = getSalaryEarned();
  const added = Number.isFinite(amount) && amount >= 0 ? amount : 0;
  const next = Math.min(SALARY_CAP, current + added);
  memorySalary = next;
  const storage = getStorage();
  if (storageAvailable && storage) {
    try {
      storage.setItem(STORAGE_KEY_SALARY, String(next));
    } catch {
      storageAvailable = false;
    }
  }
  return next;
}

export function resetSalary(): void {
  memorySalary = 0;
  const storage = getStorage();
  if (storageAvailable && storage) {
    try {
      storage.removeItem(STORAGE_KEY_SALARY);
    } catch {
      storageAvailable = false;
    }
  }
}
