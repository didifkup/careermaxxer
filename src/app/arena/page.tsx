import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  getTitleFromMarketValue,
  getNextTitleAndThreshold,
  getThresholdForTitle,
  formatMoney,
} from "@/lib/arena/ladder";
import { ArenaDashboardClient } from "./ArenaDashboardClient";
import { ArenaPrestigePanel } from "./ArenaPrestigePanel";

export default async function ArenaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: rating } = await supabase
    .from("ratings")
    .select("market_value, title")
    .eq("user_id", user.id)
    .maybeSingle();

  const marketValue = rating?.market_value ?? 60_000;
  const title = rating?.title ?? getTitleFromMarketValue(60_000);
  const { nextTitle, nextThreshold } = getNextTitleAndThreshold(title);
  const currentThreshold = getThresholdForTitle(title) ?? 60_000;
  const progress =
    nextThreshold != null && nextThreshold > currentThreshold
      ? Math.min(
          1,
          Math.max(
            0,
            (marketValue - currentThreshold) / (nextThreshold - currentThreshold)
          )
        )
      : 1;

  return (
    <div className="mx-auto max-w-xl space-y-8 py-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-primary">
          Arena
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Ranked sprints. Climb the ladder.
        </p>
      </div>

      <ArenaPrestigePanel />

      <div className="rounded-xl border border-black/10 bg-surface-raised p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary"
            aria-label={`Title: ${title}`}
          >
            {title}
          </span>
          <span className="text-lg font-semibold text-text-primary">
            {formatMoney(marketValue)}
          </span>
        </div>

        {nextTitle != null && nextThreshold != null && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Progress to {nextTitle}</span>
              <span>
                {formatMoney(currentThreshold)} → {formatMoney(nextThreshold)}
              </span>
            </div>
            <div
              className="mt-1 h-2 w-full overflow-hidden rounded-full bg-black/10"
              role="progressbar"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-brand-accent transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-6">
          <ArenaDashboardClient />
        </div>
      </div>

      <p className="text-center text-sm text-text-secondary">
        <Link href="/account" className="text-brand-primary hover:underline">
          Account
        </Link>
        {" · "}
        <Link href="/" className="text-brand-primary hover:underline">
          Home
        </Link>
      </p>
    </div>
  );
}
