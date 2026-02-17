"use client";

import { getCategories } from "@/content/learn";
import { LearnCard } from "@/components/learn/LearnCard";
import { Reveal } from "@/components/learn/Reveal";
import { VISUALS } from "@/components/learn/visuals";
import { learnStyles } from "@/components/learn/learnStyles";

export function LearnLandingClient() {
  const categories = getCategories();

  return (
    <div className={learnStyles.container}>
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className={learnStyles.pageTitle}>Reading Lab</h1>
          <span className={learnStyles.pill}>Adds to Market Value</span>
        </div>
        <p className={learnStyles.pageSubtitle}>
          Career, culture, recruiting, news — distilled into fast, high-signal guides.
        </p>
        <p className={learnStyles.pageSubtext}>
          Pick a lab. Explore guides. Build intuition.
        </p>

        {/* Premium search bar — disabled for now */}
        <div className="mt-6">
          <input
            type="search"
            placeholder="Search guides (coming soon)"
            disabled
            aria-label="Search guides (coming soon)"
            className={learnStyles.inputLike + " cursor-not-allowed opacity-70"}
          />
        </div>
      </header>

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((cat, i) => {
          const Visual = VISUALS[cat.id];
          return (
            <li key={cat.id}>
              <Reveal delay={i * 80}>
                <LearnCard
                  href={`/learn/${cat.id}`}
                  title={cat.title}
                  hook={cat.hook}
                  visual={Visual ? <Visual /> : null}
                  guidesLabel="Guides: Coming soon"
                />
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
