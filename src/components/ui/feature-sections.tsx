"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Award, Timer, Zap } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const FEATURES: Feature[] = [
  {
    title: "Short lessons",
    description:
      "Each lesson takes a few minutes. You can do one every day and still keep up.",
    icon: Timer,
  },
  {
    title: "Practice like the real thing",
    description:
      "You answer questions the way they ask them in real interviews. No surprises.",
    icon: Zap,
  },
  {
    title: "Feel ready on interview day",
    description:
      "You practice until you know the answers. When the day comes, you know what to say.",
    icon: Award,
  },
];

export function FeatureSections({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("w-full bg-background py-16 sm:py-24", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why CareerMaxxer works
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Most prep tools give you too much information. CareerMaxxer shows you
            only what interviews actually test.
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">
            You&apos;ll feel the difference after your{" "}
            <span className="font-semibold text-primary">first 3 floors</span>.
          </p>
        </div>

        {/* Grid wrapper */}
        <div className="relative mx-auto max-w-6xl">
          {/* Background glow blob (theme-safe) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Built to feel easy. Designed to make you dangerous.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      {/* Card hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
      />

      {/* Icon bubble */}
      <div className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="relative text-lg font-semibold tracking-tight text-foreground">
        {feature.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </div>
  );
}
