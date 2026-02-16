-- Resume Lab: resume_submissions + market_value_events
-- Market value lives in existing ratings table; this adds audit trail and resume data.

-- ---------------------------------------------------------------------------
-- TABLE: resume_submissions
-- ---------------------------------------------------------------------------
create table if not exists public.resume_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  original_text text not null,
  tailored_text text not null,
  pitch_30 text not null,
  pitch_60 text not null,
  pitch_90 text not null,
  score_overall int not null check (score_overall between 0 and 100),
  score_breakdown jsonb not null,
  next_best_fix jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_resume_submissions_user_created
  on public.resume_submissions(user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- TABLE: market_value_events
-- ---------------------------------------------------------------------------
create table if not exists public.market_value_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  delta_value int not null,
  reason text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_market_value_events_user_created
  on public.market_value_events(user_id, created_at desc);
create index if not exists idx_market_value_events_reason_created
  on public.market_value_events(user_id, reason, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.resume_submissions enable row level security;
alter table public.market_value_events enable row level security;

create policy "resume_submissions_select_own" on public.resume_submissions
  for select using (auth.uid() = user_id);
create policy "resume_submissions_insert_own" on public.resume_submissions
  for insert with check (auth.uid() = user_id);

create policy "market_value_events_select_own" on public.market_value_events
  for select using (auth.uid() = user_id);
-- Insert only via service role (API) for integrity
create policy "market_value_events_insert_own" on public.market_value_events
  for insert with check (auth.uid() = user_id);
