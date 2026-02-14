"use client";

import type { StorytellerResponse } from "./types";
import { CopyButton } from "./CopyButton";

export function StorytellerResponseCards({ data }: { data: StorytellerResponse }) {
  const cards: Array<{ title: string; content: string | null; bullets?: string[] }> = [
    {
      title: "The Story",
      content: data.story_title ? `${data.story_title}\n\n${data.story}` : data.story,
    },
    {
      title: "Analogy Map",
      content: (data.analogy_map ?? [])
        .map(({ concept, analogy }) => `${concept}: ${analogy}`)
        .join("\n\n"),
    },
    {
      title: "Reality Check",
      content: null,
      bullets: Array.isArray(data.reality_check) ? data.reality_check : [String(data.reality_check ?? "")],
    },
    {
      title: "Mini Quiz",
      content: (data.mini_quiz ?? [])
        .map((item) => {
          const q = item.q ?? "";
          const a = item.a ?? "";
          return a ? `Q: ${q}\nA: ${a}` : `Q: ${q}`;
        })
        .join("\n\n"),
    },
    {
      title: "One-Liner",
      content: data.takeaway ?? "",
    },
  ];

  return (
    <div className="mt-6 space-y-4">
      {cards.map((card) => {
        const copyText = card.bullets ? card.bullets.join("\n") : (card.content ?? "");
        return (
          <section
            key={card.title}
            className="rounded-xl border border-black/10 bg-surface-raised p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
                {card.title}
              </h3>
              <CopyButton text={copyText} />
            </div>
            {card.bullets ? (
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-primary">
                {card.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <div className="mt-2 whitespace-pre-wrap text-sm text-text-primary">
                {card.content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
