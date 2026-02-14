/**
 * Deterministic scoring for ranked runs. Pure functions only.
 * No AI; all grading is rule-based.
 */

import type { QuestionFormat } from "./types";

function clamp(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

function normalizeToken(s: string): string {
  return s.trim().toLowerCase();
}

/** Parse comma-separated into sorted array of normalized tokens. */
function parseList(s: string): string[] {
  return s
    .split(",")
    .map((x) => normalizeToken(x))
    .filter(Boolean)
    .sort();
}

/** Parse comma-separated into array of normalized tokens (order preserved). */
function parseOrdered(s: string): string[] {
  return s
    .split(",")
    .map((x) => normalizeToken(x))
    .filter(Boolean);
}

/**
 * Returns correctness score in [0, 1].
 * - mcq/fill: 1 if exact match else 0.
 * - multi: clamp((num_correct_selected - num_wrong_selected) / total_correct, 0, 1).
 * - drag: clamp(num_correct_positions / total_positions, 0, 1).
 */
export function computeScore(
  format: QuestionFormat,
  correctAnswer: string,
  response: string
): number {
  const correct = correctAnswer.trim();
  const resp = response.trim();
  if (!correct) return 0;

  if (format === "mcq" || format === "fill") {
    return normalizeToken(correct) === normalizeToken(resp) ? 1 : 0;
  }

  if (format === "multi") {
    const correctSet = new Set(parseList(correct));
    const totalCorrect = correctSet.size;
    if (totalCorrect === 0) return 0;
    const selectedSet = new Set(parseList(resp));
    let numCorrectSelected = 0;
    let numWrongSelected = 0;
    for (const sel of selectedSet) {
      if (correctSet.has(sel)) numCorrectSelected++;
      else numWrongSelected++;
    }
    const raw =
      (numCorrectSelected - numWrongSelected) / totalCorrect;
    return clamp(raw, 0, 1);
  }

  if (format === "drag") {
    const correctOrder = parseOrdered(correct);
    const userOrder = parseOrdered(resp);
    const totalPositions = correctOrder.length;
    if (totalPositions === 0) return 0;
    let numCorrectPositions = 0;
    const len = Math.min(correctOrder.length, userOrder.length);
    for (let i = 0; i < len; i++) {
      if (correctOrder[i] === userOrder[i]) numCorrectPositions++;
    }
    return clamp(numCorrectPositions / totalPositions, 0, 1);
  }

  return 0;
}

const BASE_MONEY_MULTIPLIER = 500;

/** BaseMoney = 500 * difficulty. */
export function getBaseMoney(difficulty: number): number {
  return BASE_MONEY_MULTIPLIER * difficulty;
}

/**
 * Speed bonus (only when score > 0). Capped at +20%.
 * If time_taken_sec <= expected_time_sec: min(0.20, ((expected - taken) / expected) * 0.20)
 * Else: 0.
 */
export function getSpeedBonus(
  timeTakenSec: number,
  expectedTimeSec: number
): number {
  if (expectedTimeSec <= 0) return 0;
  if (timeTakenSec > expectedTimeSec) return 0;
  const ratio = (expectedTimeSec - timeTakenSec) / expectedTimeSec;
  return Math.min(0.2, ratio * 0.2);
}

/**
 * Streak bonus (only when score > 0). Capped at +25%.
 * streakBonus = min(0.25, consecutive_correct_before * 0.05)
 */
export function getStreakBonus(consecutiveCorrectBefore: number): number {
  return Math.min(0.25, consecutiveCorrectBefore * 0.05);
}

/**
 * money_awarded = round(BaseMoney * score * (1 + speedBonus) * (1 + streakBonus))
 * Bonuses only apply when score > 0.
 */
export function computeMoneyAwarded(
  score: number,
  difficulty: number,
  timeTakenSec: number,
  expectedTimeSec: number,
  streakBefore: number
): number {
  const baseMoney = getBaseMoney(difficulty);
  if (score <= 0) return 0;
  const speedBonus = getSpeedBonus(timeTakenSec, expectedTimeSec);
  const streakBonus = getStreakBonus(streakBefore);
  const value =
    baseMoney * score * (1 + speedBonus) * (1 + streakBonus);
  return Math.round(value);
}

/**
 * Wrong-answer penalty (only when score === 0).
 * penaltyRate = 0.12 + (0.06 * difficulty) + min(0.18, consecutive_correct_before * 0.03)
 * penaltyRate = clamp(penaltyRate, 0.15, 0.55)
 * If title === "Intern": penaltyRate = min(penaltyRate, 0.25)
 * money_penalty = round(BaseMoney * penaltyRate)
 * Else (score > 0): money_penalty = 0.
 */
export function computeMoneyPenalty(
  score: number,
  difficulty: number,
  streakBefore: number,
  userTitle: string
): number {
  if (score > 0) return 0;
  const baseMoney = getBaseMoney(difficulty);
  let penaltyRate =
    0.12 +
    0.06 * difficulty +
    Math.min(0.18, streakBefore * 0.03);
  penaltyRate = clamp(penaltyRate, 0.15, 0.55);
  if (userTitle.trim().toLowerCase() === "intern") {
    penaltyRate = Math.min(penaltyRate, 0.25);
  }
  return Math.round(baseMoney * penaltyRate);
}

/**
 * Run state after answering:
 * - If score == 0: lives_remaining -= 1, streak = 0, difficulty = max(1, difficulty - 1)
 * - Else: streak += 1; if streak >= 2: difficulty = min(5, difficulty + 1), streak = 0
 */
export function getNextRunState(
  score: number,
  currentLives: number,
  currentStreak: number,
  currentDifficulty: number
): {
  livesRemaining: number;
  streak: number;
  currentDifficulty: number;
} {
  if (score <= 0) {
    return {
      livesRemaining: Math.max(0, currentLives - 1),
      streak: 0,
      currentDifficulty: Math.max(1, currentDifficulty - 1),
    };
  }
  const newStreak = currentStreak + 1;
  if (newStreak >= 2) {
    return {
      livesRemaining: currentLives,
      streak: 0,
      currentDifficulty: Math.min(5, currentDifficulty + 1),
    };
  }
  return {
    livesRemaining: currentLives,
    streak: newStreak,
    currentDifficulty: currentDifficulty,
  };
}
