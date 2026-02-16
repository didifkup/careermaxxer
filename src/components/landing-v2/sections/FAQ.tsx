"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { q: "Is Market Value real money?", a: "No — it's a performance metric that makes progress visible. It tracks improvement from reps, grading, and consistency." },
  { q: "Do I need hours per day?", a: "No. Most users start with 10–15 minutes. The system is designed for fast reps." },
  { q: "Is this only for target schools?", a: "No. Rankings include everyone — global and within your school." },
  { q: "What's free vs paid?", a: "Free gets you started. Pro unlocks deeper drills, more mocks, and advanced insights." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">FAQ</h2>
        <div className="space-y-2">
          {ITEMS.map((item, i) => (
            <div key={i} className="rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden">
              <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-foreground hover:bg-black/[0.02]">
                {item.q}
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open === i && "rotate-180")} />
              </button>
              {open === i && <div className="border-t border-black/5 px-4 py-3 text-muted-foreground text-sm">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
