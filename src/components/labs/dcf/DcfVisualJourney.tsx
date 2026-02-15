"use client";

import { VisualJourney } from "@/components/labs/journey/VisualJourney";
import type { JourneySection } from "@/components/labs/journey/VisualJourney";

export type DcfVisualJourneyProps = {
  sections: JourneySection[];
  title?: string;
};

export function DcfVisualJourney({ sections, title }: DcfVisualJourneyProps) {
  return (
    <VisualJourney
      sections={sections}
      title={title ?? "DCF Journey"}
    />
  );
}
