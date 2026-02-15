"use client";

import { VisualJourney } from "@/components/labs/journey/VisualJourney";
import type { JourneySection } from "@/components/labs/journey/VisualJourney";

export type MaVisualJourneyProps = {
  sections: JourneySection[];
  title?: string;
};

export function MaVisualJourney({ sections, title }: MaVisualJourneyProps) {
  return (
    <VisualJourney
      sections={sections}
      title={title ?? "M&A Journey"}
    />
  );
}
