/**
 * Deterministic finalize math for ranked runs.
 * No floors; users can lose market_value and demote.
 */

import { getTitleFromMarketValue } from "./ladder";

function clamp(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

/**
 * accuracy = questions_correct / questions_answered
 * If questions_answered === 0, accuracy = 0.
 */
export function getAccuracy(
  questionsCorrect: number,
  questionsAnswered: number
): number {
  if (questionsAnswered <= 0) return 0;
  return questionsCorrect / questionsAnswered;
}

/**
 * performance = total_money * (0.85 + 0.3 * accuracy) * (0.9 + 0.1 * (avg_difficulty / 3))
 */
export function getPerformance(
  totalMoney: number,
  accuracy: number,
  avgDifficulty: number
): number {
  return (
    totalMoney *
    (0.85 + 0.3 * accuracy) *
    (0.9 + 0.1 * (avgDifficulty / 3))
  );
}

/**
 * expected = market_value * 0.18
 */
export function getExpected(marketValue: number): number {
  return marketValue * 0.18;
}

/**
 * compensation_delta = clamp(round((performance - expected) / 2000), -40000, +40000)
 */
export function getCompensationDelta(
  performance: number,
  expected: number
): number {
  const raw = (performance - expected) / 2000;
  return clamp(Math.round(raw), -40_000, 40_000);
}

const MARKET_VALUE_MIN = 60_000;
const MARKET_VALUE_MAX = 1_500_000;

/**
 * new market_value = clamp(market_value + compensation_delta, 60000, 1500000)
 */
export function getNewMarketValue(
  currentMarketValue: number,
  compensationDelta: number
): number {
  return clamp(
    currentMarketValue + compensationDelta,
    MARKET_VALUE_MIN,
    MARKET_VALUE_MAX
  );
}

/**
 * peak_market_value = max(previous_peak, market_value)
 */
export function getNewPeak(
  previousPeak: number,
  newMarketValue: number
): number {
  return Math.max(previousPeak, newMarketValue);
}

/**
 * Full finalize computation. Returns values to persist and the new title.
 */
export function computeFinalize(
  totalMoney: number,
  questionsCorrect: number,
  questionsAnswered: number,
  avgDifficulty: number,
  currentMarketValue: number,
  currentPeak: number
): {
  compensationDelta: number;
  newMarketValue: number;
  newTitle: string;
  newPeak: number;
} {
  const accuracy = getAccuracy(questionsCorrect, questionsAnswered);
  const performance = getPerformance(totalMoney, accuracy, avgDifficulty);
  const expected = getExpected(currentMarketValue);
  const compensationDelta = getCompensationDelta(performance, expected);
  const newMarketValue = getNewMarketValue(currentMarketValue, compensationDelta);
  const newTitle = getTitleFromMarketValue(newMarketValue);
  const newPeak = getNewPeak(currentPeak, newMarketValue);
  return {
    compensationDelta,
    newMarketValue,
    newTitle,
    newPeak,
  };
}
