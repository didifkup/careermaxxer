import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getCategories } from "@/content/learn";
import { VISUALS } from "@/components/learn/visuals";
import { learnStyles } from "@/components/learn/learnStyles";
import { LearnCard } from "@/components/learn/LearnCard";
import { Reveal } from "@/components/learn/Reveal";

type Props = { params: Promise<{ categoryId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.title} | Reading Lab`,
    description: category.description,
    alternates: { canonical: `https://careermaxxer.com/learn/${categoryId}` },
  };
}

export default async function LearnCategoryPage({ params }: Props) {
  const { categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) notFound();

  const otherCategories = getCategories().filter((c) => c.id !== categoryId);
  const CurrentVisual = VISUALS[category.id];

  return (
    <div className={learnStyles.container}>
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className={learnStyles.pageTitle}>{category.title}</h1>
          <span className={learnStyles.pill}>Reading Lab</span>
        </div>
        <p className={learnStyles.pageSubtitle}>{category.hook}</p>
        <p className={learnStyles.pageSubtext}>{category.description}</p>
      </header>

      {/* Pillar CTA — Arena */}
      <Reveal>
        <div
          className={
            "rounded-2xl border border-blue-100/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.08)] " +
            "mb-10"
          }
        >
          <h2 className="font-display text-lg font-semibold text-slate-800">
            Want the fastest way to learn?
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Train in the Arena with ranked sprints and AI-graded mocks.
          </p>
          <Link
            href="/arena"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Enter Arena
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>

      {/* Empty state — no articles yet */}
      <Reveal delay={80}>
        <div
          className={
            "rounded-2xl border border-blue-100/70 bg-white/75 p-8 text-center shadow-[0_20px_60px_rgba(37,99,235,0.08)] " +
            "mb-10"
          }
        >
          {CurrentVisual && (
            <div className="mx-auto mb-4 flex h-[100px] w-full max-w-[320px] items-center justify-center rounded-xl border border-blue-50/80 bg-gradient-to-br from-blue-50/60 to-white/80">
              <CurrentVisual />
            </div>
          )}
          <h2 className="font-display text-xl font-semibold text-slate-800">
            Guides coming soon
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            We&apos;re building high-signal guides for this Lab. Start training now in the Arena.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/arena" className={learnStyles.ctaPrimary}>
              Enter Arena
              <span aria-hidden>→</span>
            </Link>
            <Link href="/learn" className={learnStyles.ctaSecondary}>
              Back to Reading
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Explore other Labs */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-slate-800">
          Explore other Labs
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          More reading labs to browse.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherCategories.slice(0, 6).map((c, i) => {
            const V = VISUALS[c.id];
            return (
              <li key={c.id}>
                <Reveal delay={i * 60}>
                  <LearnCard
                    href={`/learn/${c.id}`}
                    title={c.title}
                    hook={c.hook}
                    visual={V ? <V /> : null}
                    guidesLabel="Guides: Coming soon"
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
