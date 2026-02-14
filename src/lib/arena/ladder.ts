/**
 * Deterministic ladder utilities for Arena ranked play.
 * Title tiers by market value (compensation thresholds). No external deps.
 */

/** Ordered ladder: [threshold, title]. Threshold is min market value for that title. */
const LADDER: ReadonlyArray<{ threshold: number; title: string }> = [
  { threshold: 60_000, title: "Intern" },
  { threshold: 95_000, title: "Summer Analyst" },
  { threshold: 130_000, title: "Analyst" },
  { threshold: 180_000, title: "Senior Analyst" },
  { threshold: 250_000, title: "Associate" },
  { threshold: 400_000, title: "VP" },
  { threshold: 600_000, title: "Director" },
  { threshold: 850_000, title: "Managing Director" },
  { threshold: 1_000_000, title: "Elite MD" },
] as const;

/**
 * Returns the title for the given market value.
 * Values below the first threshold (60_000) return "Intern".
 */
export function getTitleFromMarketValue(marketValue: number): string {
  let result = LADDER[0].title;
  for (let i = 0; i < LADDER.length; i++) {
    if (marketValue >= LADDER[i].threshold) {
      result = LADDER[i].title;
    }
  }
  return result;
}

/**
 * Returns the threshold (min market value) for a given title, or null if unknown.
 */
export function getThresholdForTitle(title: string): number | null {
  const row = LADDER.find((r) => r.title === title);
  return row ? row.threshold : null;
}

/**
 * Returns the next title and its threshold, or nulls if there is no next tier.
 */
export function getNextTitleAndThreshold(
  title: string
): { nextTitle: string | null; nextThreshold: number | null } {
  const index = LADDER.findIndex((r) => r.title === title);
  if (index < 0 || index === LADDER.length - 1) {
    return { nextTitle: null, nextThreshold: null };
  }
  const next = LADDER[index + 1];
  return { nextTitle: next.title, nextThreshold: next.threshold };
}

/**
 * Formats a number as USD with no fractional digits. Deterministic.
 */
export function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}
