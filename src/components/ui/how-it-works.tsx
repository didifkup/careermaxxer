"use client";

import { cn } from "@/lib/utils";
import { BookOpen, DollarSign, Target } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// The main props for the HowItWorks component
interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

// The props for a single step card
interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

/**
 * A single step card within the "How It Works" section.
 * It displays an icon, title, description, and a list of benefits.
 */
const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-2xl border bg-white p-6 text-foreground transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-foreground/20"
    )}
  >
    {/* Icon */}
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
      {icon}
    </div>
    {/* Title and Description */}
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="mb-6 text-muted-foreground">{description}</p>
    {/* Benefits List */}
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-foreground/10">
            <div className="h-2 w-2 rounded-full bg-foreground/60"></div>
          </div>
          <span className="text-muted-foreground">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * A responsive "How It Works" section that displays a 3-step process.
 * It is styled with shadcn/ui theme variables to support light and dark modes.
 */
export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const salaryCalloutRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const el = salaryCalloutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || entry.intersectionRatio < 0.4) return;

        observer.disconnect();

        const durationMs = 900;
        const from = 0;
        const to = 180000;
        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          const t = Math.min(elapsed / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const value = Math.round(from + (to - from) * eased);
          setDisplayValue(value);

          if (t < 1) {
            rafIdRef.current = requestAnimationFrame(tick);
          } else {
            setDisplayValue(to);
          }
        };

        rafIdRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const stepsData = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Learn what matters",
      description:
        "Read short lessons that explain exactly what interviewers care about.",
      benefits: [],
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Practice the right way",
      description:
        "Answer questions the same way they are asked in real interviews.",
      benefits: [],
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Walk in confident",
      description:
        "When it's interview day, you know what to say and how to say it.",
      benefits: [],
    },
  ];

  return (
    <section
      id="how-it-works"
      className={cn("w-full bg-background py-12 sm:py-16", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How CareerMaxxer works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We break investment banking prep into simple steps so you always know what to do next.
          </p>
        </div>

        {/* Step Indicators with Connecting Line */}
        <div className="relative mx-auto mb-8 w-full max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-border"
          ></div>
          {/* Use grid to align numbers with the card grid below */}
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                // Center the number within its grid column
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-muted font-semibold text-foreground ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>

        {/* Salary callout */}
        <div
          ref={salaryCalloutRef}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border bg-white p-6 text-center shadow-sm"
        >
          <p className="text-sm font-medium text-muted-foreground">Salary</p>
          <p className="mt-2 text-3xl font-bold tracking-tight"><span className="shimmer-sweep-once inline-block animate-pop-in text-emerald-500 font-extrabold tracking-tight [text-shadow:0_0_18px_rgba(16,185,129,0.45)]"><span className={`inline-block ${displayValue === 180000 ? "animate-scale-pulse" : ""}`}>${displayValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span> unlocked</span></p>
          <p className="mt-2 text-sm text-muted-foreground">
            Every correct answer increases your starting salary.
          </p>
        </div>
      </div>
    </section>
  );
};
