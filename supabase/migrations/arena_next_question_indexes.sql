-- Indexes for next-question selection.
-- Composite for candidate lookup: difficulty + is_active.
create index if not exists idx_questions_difficulty_is_active
  on public.questions(difficulty, is_active)
  where is_active = true;

-- question_history: (user_id, last_seen_at) already covered by
-- idx_question_history_user_last_seen for "recently seen" filter.
