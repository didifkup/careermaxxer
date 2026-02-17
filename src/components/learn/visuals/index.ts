import type { ReactElement } from "react";
import type { LearnCategory } from "@/content/learn";
import { LabVisualFrame } from "./LabVisualFrame";
import { CareerLabVisual } from "./CareerLabVisual";
import { LifeLabVisual } from "./LifeLabVisual";
import { CultureLabVisual } from "./CultureLabVisual";
import { NewsLabVisual } from "./NewsLabVisual";
import { RecruitingLabVisual } from "./RecruitingLabVisual";
import { CompensationLabVisual } from "./CompensationLabVisual";
import { ExitsLabVisual } from "./ExitsLabVisual";
import { StudentStrategyLabVisual } from "./StudentStrategyLabVisual";

export { LabVisualFrame } from "./LabVisualFrame";
export { CareerLabVisual } from "./CareerLabVisual";
export { LifeLabVisual } from "./LifeLabVisual";
export { CultureLabVisual } from "./CultureLabVisual";
export { NewsLabVisual } from "./NewsLabVisual";
export { RecruitingLabVisual } from "./RecruitingLabVisual";
export { CompensationLabVisual } from "./CompensationLabVisual";
export { ExitsLabVisual } from "./ExitsLabVisual";
export { StudentStrategyLabVisual } from "./StudentStrategyLabVisual";

export type LabVisualComponent = () => ReactElement;

export const VISUALS: Record<LearnCategory["id"], LabVisualComponent> = {
  "investment-banking-career": CareerLabVisual,
  "investment-banking-life": LifeLabVisual,
  "investment-banking-culture": CultureLabVisual,
  "investment-banking-news": NewsLabVisual,
  recruiting: RecruitingLabVisual,
  compensation: CompensationLabVisual,
  exits: ExitsLabVisual,
  "student-strategy": StudentStrategyLabVisual,
};
