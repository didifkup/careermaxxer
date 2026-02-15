"use client";

import { VisualJourney } from "@/components/labs/journey/VisualJourney";
import { fsmJourneySections } from "./fsmJourneyContent";

export function FsmVisualJourney() {
  return (
    <VisualJourney
      sections={fsmJourneySections}
      title="FSM Visual Journey"
    />
  );
}
