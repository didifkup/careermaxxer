/** Question format from DB. */
export type QuestionFormat = "mcq" | "multi" | "fill" | "drag";

export interface ArenaQuestion {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: number;
  format: QuestionFormat;
  prompt: string;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  correct_answer: string;
  explanation: string;
  expected_time_sec: number;
  tags: string[] | null;
}

export interface ArenaRating {
  user_id: string;
  market_value: number;
  peak_market_value: number;
  title: string;
  placement_runs_completed: number;
}

export interface ArenaRun {
  id: string;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  duration_sec: number;
  lives_total: number;
  lives_remaining: number;
  current_difficulty: number;
  streak: number;
  total_money: number;
  questions_answered: number;
  questions_correct: number;
  highest_difficulty: number;
  avg_difficulty: number;
  compensation_delta: number;
  status: "active" | "completed" | "expired";
}
