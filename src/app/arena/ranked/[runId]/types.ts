/** Question as returned from next-question API (no correct_answer). */
export interface RunQuestion {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: number;
  format: "mcq" | "multi" | "fill" | "drag";
  prompt: string;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  /** Omitted on sprint start/next for fast load; can be loaded on submit if needed. */
  explanation?: string;
  expected_time_sec: number;
  tags: string[] | null;
}
