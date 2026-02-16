"use client";

import { FinalCTA } from "@/components/ui/cta-with-text-marquee";
import { FeatureSections } from "@/components/ui/feature-sections";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { HowItWorks } from "@/components/ui/how-it-works";
import { QuantOutcomesStats } from "@/components/ui/stats-section-with-text";
import { LandingFooter } from "@/components/landing/LandingFooter";
import type { FloatingIconsHeroProps } from "@/components/ui/floating-icons-hero-section";
import {
  IconGoldman,
  IconJPM,
  IconMorganStanley,
  IconBofA,
  IconCiti,
  IconBarclays,
  IconUBS,
  IconDeutsche,
  IconEvercore,
  IconLazard,
  IconMoelis,
  IconJefferies,
  IconRBC,
  IconWells,
  IconHoulihan,
  IconPJT,
} from "@/components/marketing/bank-abbrev-icons";

const icons: FloatingIconsHeroProps["icons"] = [
  { id: 1, icon: IconGoldman, className: "top-[10%] left-[10%]" },
  { id: 2, icon: IconJPM, className: "top-[20%] right-[8%]" },
  { id: 3, icon: IconMorganStanley, className: "top-[80%] left-[10%]" },
  { id: 4, icon: IconBofA, className: "bottom-[10%] right-[10%]" },
  { id: 5, icon: IconCiti, className: "top-[5%] left-[30%]" },
  { id: 6, icon: IconBarclays, className: "top-[5%] right-[30%]" },
  { id: 7, icon: IconUBS, className: "bottom-[8%] left-[25%]" },
  { id: 8, icon: IconDeutsche, className: "top-[40%] left-[15%]" },
  { id: 9, icon: IconEvercore, className: "top-[75%] right-[25%]" },
  { id: 10, icon: IconLazard, className: "top-[90%] left-[70%]" },
  { id: 11, icon: IconMoelis, className: "top-[50%] right-[5%]" },
  { id: 12, icon: IconJefferies, className: "top-[55%] left-[5%]" },
  { id: 13, icon: IconRBC, className: "top-[5%] left-[55%]" },
  { id: 14, icon: IconWells, className: "bottom-[5%] right-[45%]" },
  { id: 15, icon: IconHoulihan, className: "top-[25%] right-[20%]" },
  { id: 16, icon: IconPJT, className: "top-[60%] left-[30%]" },
];

export default function LandingOldPage() {
  return (
    <>
      <FloatingIconsHero
        title="Prepare faster. Interview better."
        subtitle="CareerMaxxer is the first platform built to save you time. You learn exactly what interviews ask, practice the right way, and walk in confident."
        ctaText="Start training now"
        ctaHref="/practice"
        icons={icons}
      />
      <HowItWorks />
      <FeatureSections />
      <QuantOutcomesStats />
      <FinalCTA />
      <LandingFooter />
    </>
  );
}
