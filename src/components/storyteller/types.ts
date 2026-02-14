export type StorytellerResponse = {
  story_title: string;
  story: string;
  analogy_map: Array<{ concept: string; analogy: string }>;
  reality_check: string[];
  mini_quiz: Array<{ q: string; a?: string }>;
  takeaway: string;
};

export type ToneOption = "fun" | "chill" | "serious";
export type LengthOption = "short" | "medium" | "long";
