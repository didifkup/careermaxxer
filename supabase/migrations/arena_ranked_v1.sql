-- arena_ranked_v1: profiles, questions, question_history, ratings, ranked_runs, ranked_run_answers
-- RLS enabled; policies for user-scoped and questions read-only.

-- ---------------------------------------------------------------------------
-- TABLE: profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  school text null,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists school text null;

-- ---------------------------------------------------------------------------
-- TABLE: questions
-- ---------------------------------------------------------------------------
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  subtopic text not null,
  difficulty int not null check (difficulty between 1 and 5),
  format text not null check (format in ('mcq','multi','fill','drag')),
  prompt text not null,
  option_a text null,
  option_b text null,
  option_c text null,
  option_d text null,
  correct_answer text not null,
  explanation text not null,
  expected_time_sec int not null default 30,
  tags text[] null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_questions_topic on public.questions(topic);
create index if not exists idx_questions_subtopic on public.questions(subtopic);
create index if not exists idx_questions_difficulty on public.questions(difficulty);
create index if not exists idx_questions_is_active on public.questions(is_active);

-- ---------------------------------------------------------------------------
-- TABLE: question_history
-- ---------------------------------------------------------------------------
create table if not exists public.question_history (
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  last_seen_at timestamptz not null default now(),
  correct boolean not null,
  difficulty int not null,
  primary key (user_id, question_id)
);

create index if not exists idx_question_history_user_last_seen
  on public.question_history(user_id, last_seen_at desc);

-- ---------------------------------------------------------------------------
-- TABLE: ratings
-- ---------------------------------------------------------------------------
create table if not exists public.ratings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  market_value int not null default 60000,
  peak_market_value int not null default 60000,
  title text not null default 'Intern',
  placement_runs_completed int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- TABLE: ranked_runs
-- ---------------------------------------------------------------------------
create table if not exists public.ranked_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz null,
  duration_sec int not null default 600,
  lives_total int not null default 3,
  lives_remaining int not null default 3,
  current_difficulty int not null default 2,
  streak int not null default 0,
  total_money int not null default 0,
  questions_answered int not null default 0,
  questions_correct int not null default 0,
  highest_difficulty int not null default 2,
  avg_difficulty numeric not null default 2,
  compensation_delta int not null default 0,
  status text not null default 'active' check (status in ('active','completed','expired'))
);

create index if not exists idx_ranked_runs_user_started
  on public.ranked_runs(user_id, started_at desc);

-- ---------------------------------------------------------------------------
-- TABLE: ranked_run_answers
-- ---------------------------------------------------------------------------
create table if not exists public.ranked_run_answers (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.ranked_runs(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  answered_at timestamptz not null default now(),
  correct boolean not null,
  difficulty int not null,
  money_awarded int not null,
  money_penalty int not null,
  time_taken_sec int not null,
  response jsonb not null
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.question_history enable row level security;
alter table public.ratings enable row level security;
alter table public.ranked_runs enable row level security;
alter table public.ranked_run_answers enable row level security;

-- ---------------------------------------------------------------------------
-- POLICIES: profiles — user can only access own row
-- ---------------------------------------------------------------------------
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- POLICIES: questions — readable by authenticated; write via service role only
-- ---------------------------------------------------------------------------
create policy "questions_select_authenticated" on public.questions
  for select to authenticated using (true);
-- No insert/update/delete for role authenticated; service role bypasses RLS.

-- ---------------------------------------------------------------------------
-- POLICIES: question_history — user can only access own rows
-- ---------------------------------------------------------------------------
create policy "question_history_select_own" on public.question_history
  for select using (auth.uid() = user_id);
create policy "question_history_insert_own" on public.question_history
  for insert with check (auth.uid() = user_id);
create policy "question_history_update_own" on public.question_history
  for update using (auth.uid() = user_id);
create policy "question_history_delete_own" on public.question_history
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- POLICIES: ratings — user can only access own row
-- ---------------------------------------------------------------------------
create policy "ratings_select_own" on public.ratings
  for select using (auth.uid() = user_id);
create policy "ratings_insert_own" on public.ratings
  for insert with check (auth.uid() = user_id);
create policy "ratings_update_own" on public.ratings
  for update using (auth.uid() = user_id);
create policy "ratings_delete_own" on public.ratings
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- POLICIES: ranked_runs — user can only access own rows
-- ---------------------------------------------------------------------------
create policy "ranked_runs_select_own" on public.ranked_runs
  for select using (auth.uid() = user_id);
create policy "ranked_runs_insert_own" on public.ranked_runs
  for insert with check (auth.uid() = user_id);
create policy "ranked_runs_update_own" on public.ranked_runs
  for update using (auth.uid() = user_id);
create policy "ranked_runs_delete_own" on public.ranked_runs
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- POLICIES: ranked_run_answers — user can only access own rows (via run ownership)
-- ---------------------------------------------------------------------------
create policy "ranked_run_answers_select_own" on public.ranked_run_answers
  for select using (
    exists (
      select 1 from public.ranked_runs r
      where r.id = ranked_run_answers.run_id and r.user_id = auth.uid()
    )
  );
create policy "ranked_run_answers_insert_own" on public.ranked_run_answers
  for insert with check (
    exists (
      select 1 from public.ranked_runs r
      where r.id = ranked_run_answers.run_id and r.user_id = auth.uid()
    )
  );
create policy "ranked_run_answers_update_own" on public.ranked_run_answers
  for update using (
    exists (
      select 1 from public.ranked_runs r
      where r.id = ranked_run_answers.run_id and r.user_id = auth.uid()
    )
  );
create policy "ranked_run_answers_delete_own" on public.ranked_run_answers
  for delete using (
    exists (
      select 1 from public.ranked_runs r
      where r.id = ranked_run_answers.run_id and r.user_id = auth.uid()
    )
  );
