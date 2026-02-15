-- Mock Interview: questions + attempts (no video storage)
-- Only transcript, scores, feedback, filler metrics, next_best_fix are persisted.

-- ---------------------------------------------------------------------------
-- TABLE: mock_questions
-- ---------------------------------------------------------------------------
create table if not exists public.mock_questions (
  id uuid primary key default gen_random_uuid(),
  track text not null check (track in ('technical','behavioral')),
  difficulty int not null check (difficulty between 1 and 3),
  tags text[] not null default '{}',
  prompt text not null,
  ideal_answer text not null,
  rubric_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_mock_questions_track on public.mock_questions(track);
create index if not exists idx_mock_questions_difficulty on public.mock_questions(difficulty);

-- ---------------------------------------------------------------------------
-- TABLE: mock_attempts
-- ---------------------------------------------------------------------------
create table if not exists public.mock_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.mock_questions(id) on delete cascade,
  track text not null check (track in ('technical','behavioral')),
  difficulty int,
  transcript_text text not null,
  filler_counts jsonb not null default '{}'::jsonb,
  scores_json jsonb not null,
  feedback_json jsonb not null,
  next_best_fix jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_mock_attempts_user_created on public.mock_attempts(user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.mock_questions enable row level security;
alter table public.mock_attempts enable row level security;

-- Questions: readable by authenticated
create policy "mock_questions_select_authenticated" on public.mock_questions
  for select to authenticated using (true);

-- Attempts: user can only access own rows
create policy "mock_attempts_select_own" on public.mock_attempts
  for select using (auth.uid() = user_id);
create policy "mock_attempts_insert_own" on public.mock_attempts
  for insert with check (auth.uid() = user_id);
