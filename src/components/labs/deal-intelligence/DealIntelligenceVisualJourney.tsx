"use client";

import { VisualJourney } from "@/components/labs/journey/VisualJourney";
import type { JourneySection } from "@/components/labs/journey/VisualJourney";

export type DealIntelligenceVisualJourneyProps = {
  sections: JourneySection[];
  title?: string;
};

export function DealIntelligenceVisualJourney({
  sections,
  title,
}: DealIntelligenceVisualJourneyProps) {
  return (
    <VisualJourney
      sections={sections}
      title={title ?? "Deal Intelligence Journey"}
    />
  );
}
