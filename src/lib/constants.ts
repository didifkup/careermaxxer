/**
 * App constants — salary curve, node count, etc.
 */

export const SALARY_MAX = 180_000;
export const SALARY_START = 0;

/** Single key for full progress blob (progress.ts). */
export const STORAGE_KEY_PROGRESS = "ib-academy-progress";

/** Curriculum: 4 floors, 3 nodes per floor. */
export const NODES_PER_FLOOR = 3;
export const FLOOR_COUNT = 4;

/**
 * 15-minute binge session: in-memory session node count (not persisted).
 * Used to show breather after this many nodes and to trigger calm-mode styling.
 */
export const BINGE_BREATHER_AFTER_NODES = 4;

/**
 * After this many nodes in a session we show the "mid-session peak" (Promotion unlocked / floor highlight).
 * Keeps the rhythm: node 1–2 → nextReward, node 3 → peak, node 4 → breather.
 */
export const BINGE_MID_SESSION_PEAK_AFTER_NODES = 3;

/**
 * When session count >= this, post-complete UI uses calmer colors and slower transitions (soft burnout prevention).
 */
export const BINGE_CALM_MODE_AFTER_NODES = 4;
