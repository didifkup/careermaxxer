"use client";

import { Marquee } from "../ui/Marquee";
import { FadeUp } from "../ui/Motion";

const PILLS = [
  "wallstwolf (Harvard) gained +$4,200 in Arena",
  "ibgrind (Wharton) increased to $812,300",
  "dcfking (Stern) moved up 8 spots",
  "tigerbanker (Clemson) completed M&A Lab",
  "analystmode (UCLA) cut filler words by 55%",
  "lbojunkie (Texas) gained +$2,000 today",
];

export function LiveMarketFeed() {
  return (
    <section className="relative border-y border-black/5 bg-white/50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-foreground">Live Market Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">Serious candidates are training right now.</p>
        </FadeUp>
        <Marquee speed={45} className="w-full">
          {PILLS.map((text, i) => (
            <span
              key={i}
              className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-muted-foreground shadow-sm"
            >
              {text}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
