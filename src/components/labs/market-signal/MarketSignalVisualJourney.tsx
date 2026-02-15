"use client";

import { VisualJourney } from "@/components/labs/journey/VisualJourney";
import type { JourneySection } from "@/components/labs/journey/VisualJourney";

export type MarketSignalVisualJourneyProps = {
  sections: JourneySection[];
  title?: string;
};

export function MarketSignalVisualJourney({
  sections,
  title,
}: MarketSignalVisualJourneyProps) {
  return (
    <VisualJourney
      sections={sections}
      title={title ?? "Market Signal Journey"}
    />
  );
}
