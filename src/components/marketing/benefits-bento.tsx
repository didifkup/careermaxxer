import {
  Brain,
  Compass,
  DollarSign,
  ShieldCheck,
  Timer,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const headline = "Investment banking, without the confusion.";
const subheadline =
  "CareerMaxxer turns IB prep into a clear, finishable path — explained simply, reinforced daily, and built to compound.";

const cards = [
  {
    name: "Know exactly what to study",
    description:
      "No guessing. No rabbit holes. No wasted time.",
    cta: "See the path",
    href: "/practice",
    Icon: Compass,
    background: (
      <>
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute bottom-8 left-8 h-24 w-24 rounded-full bg-foreground/5 blur-2xl" />
      </>
    ),
    className:
      "col-span-1 lg:col-span-1 lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    name: "Understand it the first time",
    description:
      "If you can't explain it simply, you don't understand it. CareerMaxxer fixes that.",
    cta: "View a lesson",
    href: "/learn",
    Icon: Brain,
    background: (
      <>
        <div className="absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute -bottom-4 left-12 h-20 w-20 rounded-full bg-foreground/5 blur-2xl" />
      </>
    ),
    className:
      "col-span-1 lg:col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    name: "Make progress in minutes",
    description:
      "Five minutes still counts. Every session moves you forward.",
    cta: "Start a floor",
    href: "/practice",
    Icon: Timer,
    background: (
      <>
        <div className="absolute right-8 -top-8 h-28 w-28 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute bottom-12 -left-4 h-16 w-16 rounded-full bg-foreground/5 blur-2xl" />
      </>
    ),
    className:
      "col-span-1 lg:col-span-1 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    name: "Walk into interviews calm",
    description:
      "Answers feel obvious when you actually understand them.",
    cta: "Try a quiz",
    href: "/quiz",
    Icon: ShieldCheck,
    background: (
      <>
        <div className="absolute -right-16 top-8 h-36 w-36 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute bottom-8 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-foreground/5 blur-2xl" />
      </>
    ),
    className:
      "col-span-1 lg:col-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    name: "Watch your progress grow",
    description:
      "Every correct answer raises your starting analyst salary.",
    cta: "See salary bar",
    href: "/practice",
    Icon: DollarSign,
    background: (
      <>
        <div className="absolute right-4 bottom-4 h-32 w-32 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-foreground/5 blur-2xl" />
      </>
    ),
    className:
      "col-span-1 lg:col-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
];

export function BenefitsBento() {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {subheadline}
        </p>
        <BentoGrid
          className="mt-10 grid-cols-1 auto-rows-auto gap-4 lg:grid-cols-3 lg:auto-rows-[22rem]"
        >
          {cards.map((card) => (
            <BentoCard key={card.name} {...card} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
