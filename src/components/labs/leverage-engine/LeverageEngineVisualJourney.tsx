"use client";

import { VisualJourney } from "@/components/labs/journey/VisualJourney";
import type { JourneySection } from "@/components/labs/journey/VisualJourney";

export type LeverageEngineVisualJourneyProps = {
  sections: JourneySection[];
  title?: string;
};

export function LeverageEngineVisualJourney({
  sections,
  title,
}: LeverageEngineVisualJourneyProps) {
  return (
    <VisualJourney
      sections={sections}
      title={title ?? "Leverage Engine Journey"}
    />
  );
}
