"use client";

import Link from "next/link";
import { WORLDS } from "@/lib/worlds";
import type { World } from "@/lib/worlds";
import { getProgressSnapshot } from "@/lib/worlds/progress";
import { SalaryHUD } from "@/components/worlds/SalaryHUD";
import { useMounted } from "@/hooks/useMounted";

function WorldCard({
  world,
  completedCount,
}: {
  world: World;
  completedCount: number | null;
}) {
  const totalCount = world.nodes.length;
  const progressLabel =
    completedCount === null
      ? `Progress: — / ${totalCount} nodes`
      : `Progress: ${completedCount} / ${totalCount} nodes`;

  return (
    <article className="flex flex-col rounded-2xl border-2 border-black/10 bg-surface-raised p-5 shadow-card transition-all duration-200 hover:border-brand-primary/30 hover:shadow-elevated">
      <h2 className="font-display text-lg font-bold text-brand-primary">
        {world.title}
      </h2>
      <p className="mt-2 flex-1 text-sm text-text-secondary">
        {world.description}
      </p>
      <p className="mt-3 text-sm font-medium text-text-primary">
        {progressLabel}
      </p>
      <Link
        href={`/worlds/${world.slug}`}
        className="mt-4 inline-flex w-full justify-center rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
      >
        Continue
      </Link>
    </article>
  );
}

export default function WorldsPage() {
  const mounted = useMounted();
  const hasWorlds = WORLDS.length > 0;
  const progress = mounted ? getProgressSnapshot() : null;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-brand-primary">
        Worlds
      </h1>
      <p className="mt-1 text-text-secondary">
        One long path. Master financial modeling step-by-step.
      </p>

      <div className="mt-4">
        <SalaryHUD />
      </div>

      {hasWorlds ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORLDS.map((world) => (
            <li key={world.id}>
              <WorldCard
                world={world}
                completedCount={
                  progress === null
                    ? null
                    : world.nodes.filter((n) =>
                        progress.completedNodeIds.includes(n.id)
                      ).length
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-black/10 bg-surface-base p-10 text-center">
          <p className="text-text-secondary">
            No worlds yet. Check back soon — new content is on the way.
          </p>
        </div>
      )}
    </div>
  );
}
