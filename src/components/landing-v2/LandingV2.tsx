"use client";

import { GlowGrid } from "./ui/GlowGrid";
import { Hero } from "./sections/Hero";
import { LiveMarketFeed } from "./sections/LiveMarketFeed";
import { Problem } from "./sections/Problem";
import { Ecosystem } from "./sections/Ecosystem";
import { Mechanism } from "./sections/Mechanism";
import { Dominance } from "./sections/Dominance";
import { ComparisonGrid } from "./sections/ComparisonGrid";
import { Testimonials } from "./sections/Testimonials";
import { OnboardingAutoSprint } from "./sections/OnboardingAutoSprint";
import { FAQ } from "./sections/FAQ";
import { FinalCTA } from "./sections/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export function LandingV2() {
  return (
    <div className="relative min-h-screen bg-[hsl(var(--background))]">
      <GlowGrid />
      <main className="relative">
        <Hero />
        <LiveMarketFeed />
        <Problem />
        <Ecosystem />
        <Mechanism />
        <Dominance />
        <ComparisonGrid />
        <Testimonials />
        <OnboardingAutoSprint />
        <FAQ />
        <FinalCTA />
        <LandingFooter />
      </main>
    </div>
  );
}
