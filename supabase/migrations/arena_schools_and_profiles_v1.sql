-- Normalized schools + profiles extensions.
-- Safe for existing data.

-- ---------------------------------------------------------------------------
-- TABLE: schools
-- ---------------------------------------------------------------------------
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_schools_is_active on public.schools(is_active);

-- ---------------------------------------------------------------------------
-- SEED: 100 schools (slug = lowercase, spaces -> hyphen, no commas/punctuation)
-- ---------------------------------------------------------------------------
insert into public.schools (name, slug) values
  ('Harvard University', 'harvard-university'),
  ('Stanford University', 'stanford-university'),
  ('University of Pennsylvania', 'university-of-pennsylvania'),
  ('Yale University', 'yale-university'),
  ('Princeton University', 'princeton-university'),
  ('Columbia University', 'columbia-university'),
  ('Cornell University', 'cornell-university'),
  ('Dartmouth College', 'dartmouth-college'),
  ('Brown University', 'brown-university'),
  ('University of Chicago', 'university-of-chicago'),
  ('Northwestern University', 'northwestern-university'),
  ('Duke University', 'duke-university'),
  ('Vanderbilt University', 'vanderbilt-university'),
  ('Georgetown University', 'georgetown-university'),
  ('University of Virginia', 'university-of-virginia'),
  ('University of Michigan', 'university-of-michigan'),
  ('New York University', 'new-york-university'),
  ('Carnegie Mellon University', 'carnegie-mellon-university'),
  ('Emory University', 'emory-university'),
  ('University of Notre Dame', 'university-of-notre-dame'),
  ('University of Texas at Austin', 'university-of-texas-at-austin'),
  ('University of California, Berkeley', 'university-of-california-berkeley'),
  ('University of California, Los Angeles', 'university-of-california-los-angeles'),
  ('University of North Carolina at Chapel Hill', 'university-of-north-carolina-at-chapel-hill'),
  ('Indiana University', 'indiana-university'),
  ('University of Southern California', 'university-of-southern-california'),
  ('University of Washington', 'university-of-washington'),
  ('University of Wisconsin–Madison', 'university-of-wisconsin-madison'),
  ('University of Illinois Urbana-Champaign', 'university-of-illinois-urbana-champaign'),
  ('Ohio State University', 'ohio-state-university'),
  ('Pennsylvania State University', 'pennsylvania-state-university'),
  ('University of Florida', 'university-of-florida'),
  ('University of Georgia', 'university-of-georgia'),
  ('University of Maryland', 'university-of-maryland'),
  ('University of Minnesota', 'university-of-minnesota'),
  ('University of Colorado Boulder', 'university-of-colorado-boulder'),
  ('University of Arizona', 'university-of-arizona'),
  ('Arizona State University', 'arizona-state-university'),
  ('Texas A&M University', 'texas-am-university'),
  ('Michigan State University', 'michigan-state-university'),
  ('Clemson University', 'clemson-university'),
  ('Florida State University', 'florida-state-university'),
  ('University of Miami', 'university-of-miami'),
  ('Auburn University', 'auburn-university'),
  ('University of Alabama', 'university-of-alabama'),
  ('University of Tennessee', 'university-of-tennessee'),
  ('University of Kentucky', 'university-of-kentucky'),
  ('Georgia Tech', 'georgia-tech'),
  ('Wake Forest University', 'wake-forest-university'),
  ('University of South Carolina', 'university-of-south-carolina'),
  ('Ole Miss', 'ole-miss'),
  ('LSU', 'lsu'),
  ('University of Arkansas', 'university-of-arkansas'),
  ('Virginia Tech', 'virginia-tech'),
  ('North Carolina State University', 'north-carolina-state-university'),
  ('Boston College', 'boston-college'),
  ('Boston University', 'boston-university'),
  ('Villanova University', 'villanova-university'),
  ('Rutgers University', 'rutgers-university'),
  ('Fordham University', 'fordham-university'),
  ('University of Pittsburgh', 'university-of-pittsburgh'),
  ('Syracuse University', 'syracuse-university'),
  ('Lehigh University', 'lehigh-university'),
  ('University of Rochester', 'university-of-rochester'),
  ('Providence College', 'providence-college'),
  ('Purdue University', 'purdue-university'),
  ('Marquette University', 'marquette-university'),
  ('Miami University (Ohio)', 'miami-university-ohio'),
  ('DePaul University', 'depaul-university'),
  ('Loyola University Chicago', 'loyola-university-chicago'),
  ('University of Iowa', 'university-of-iowa'),
  ('University of Kansas', 'university-of-kansas'),
  ('University of Missouri', 'university-of-missouri'),
  ('Creighton University', 'creighton-university'),
  ('University of Nebraska', 'university-of-nebraska'),
  ('University of Oregon', 'university-of-oregon'),
  ('University of Utah', 'university-of-utah'),
  ('University of Nevada', 'university-of-nevada'),
  ('University of San Diego', 'university-of-san-diego'),
  ('San Diego State University', 'san-diego-state-university'),
  ('University of California, Irvine', 'university-of-california-irvine'),
  ('University of California, Santa Barbara', 'university-of-california-santa-barbara'),
  ('Santa Clara University', 'santa-clara-university'),
  ('Brigham Young University', 'brigham-young-university'),
  ('Colorado State University', 'colorado-state-university'),
  ('Williams College', 'williams-college'),
  ('Amherst College', 'amherst-college'),
  ('Middlebury College', 'middlebury-college'),
  ('Claremont McKenna College', 'claremont-mckenna-college'),
  ('Washington and Lee University', 'washington-and-lee-university'),
  ('Colgate University', 'colgate-university'),
  ('Hamilton College', 'hamilton-college'),
  ('Bowdoin College', 'bowdoin-college'),
  ('Wesleyan University', 'wesleyan-university'),
  ('Trinity College', 'trinity-college')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- PROFILES: add username, school_id, avatar_url
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists username text unique;
alter table public.profiles add column if not exists school_id uuid references public.schools(id);
alter table public.profiles add column if not exists avatar_url text;

create index if not exists idx_profiles_school_id on public.profiles(school_id);

-- ---------------------------------------------------------------------------
-- RLS: schools
-- ---------------------------------------------------------------------------
alter table public.schools enable row level security;

create policy "schools_select_authenticated" on public.schools
  for select to authenticated using (true);

-- Insert/update only via service role (no policy for authenticated/anon).
