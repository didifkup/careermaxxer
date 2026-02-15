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

export const dynamic = "force-dynamic";

const arenaPageBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

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
    <div
      className="min-h-screen px-4 py-12 md:py-16"
      style={arenaPageBg}
    >
      <div className="mx-auto max-w-[900px] space-y-8">
        <header>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-semibold text-slate-800 md:text-5xl">
              Arena
            </h1>
            <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              Ranked
            </span>
          </div>
          <p className="mt-2 text-base text-slate-500 md:text-lg">
            Ranked sprints. Climb the ladder.
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Run sprints. Earn market value. Compete globally and at your school.
          </p>
        </header>

        <ArenaPrestigePanel />

        <div className="rounded-3xl border border-blue-100/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800"
              aria-label={`Title: ${title}`}
            >
              {title}
            </span>
            <span className="text-lg font-semibold text-slate-800 tabular-nums">
              {formatMoney(marketValue)}
            </span>
          </div>

          {nextTitle != null && nextThreshold != null && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Progress to {nextTitle}</span>
                <span>
                  {formatMoney(currentThreshold)} → {formatMoney(nextThreshold)}
                </span>
              </div>
              <div
                className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <ArenaDashboardClient />
          </div>
        </div>

        <p className="text-center text-sm text-slate-500">
          <Link href="/account" className="text-blue-600 hover:underline">
            Account
          </Link>
          {" · "}
          <Link href="/leaderboard" className="text-blue-600 hover:underline">
            Leaderboards
          </Link>
          {" · "}
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
