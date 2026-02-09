/**
 * App constants — salary curve, node count, etc.
 * Game system: Rewards (salary), Landings (breathers). See src/types/practice-game.ts.
 */

export const SALARY_MAX = 180_000;
export const SALARY_START = 0;

/** Single key for full progress blob (progress.ts). */
export const STORAGE_KEY_PROGRESS = "ib-academy-progress";

/** Curriculum: 4 floors, 3 nodes per floor. */
export const NODES_PER_FLOOR = 3;
export const FLOOR_COUNT = 4;

/**
 * Landing (psychological breather): after this many nodes in a session, show breather UI.
 * In-memory session count (not persisted). Also triggers calm-mode styling.
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

/**
 * Practice motion: auto-scroll (align with CSS tokens in .practice-tower).
 * Use for scrollIntoView / scroll animations: short, intentional, smooth.
 * Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) — matches --practice-motion-auto-scroll-ease.
 */
export const PRACTICE_AUTO_SCROLL_MS = 480;
