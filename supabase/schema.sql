-- ============================================================
-- descubre — Colombia Discovery Platform
-- Database Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

create table public.profiles (
  id uuid references auth.users primary key,
  display_name text not null,
  avatar_url text,
  bio text,
  city text,
  is_business_owner boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  city text not null,
  neighborhood text,
  category text not null,
  cuisine text,
  price_level text check (price_level in ('$', '$$', '$$$', '$$$$')),
  hours text,
  phone text,
  website text,
  instagram text,
  address text,
  latitude double precision,
  longitude double precision,
  cover_image_url text,
  is_featured boolean default false,
  is_claimed boolean default false,
  claimed_by uuid references public.profiles(id),
  avg_rating numeric(2,1) default 0,
  review_count integer default 0,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.place_images (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references public.places(id) on delete cascade,
  image_url text not null,
  caption text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references public.places(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  text text,
  helpful_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(place_id, user_id)
);

create table public.review_images (
  id uuid primary key default gen_random_uuid(),
  review_id uuid references public.reviews(id) on delete cascade,
  image_url text not null,
  created_at timestamptz default now()
);

create table public.helpful_votes (
  user_id uuid references public.profiles(id) on delete cascade,
  review_id uuid references public.reviews(id) on delete cascade,
  primary key (user_id, review_id)
);

create table public.saved_places (
  user_id uuid references public.profiles(id) on delete cascade,
  place_id uuid references public.places(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, place_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

create index idx_places_city on public.places(city);
create index idx_places_category on public.places(category);
create index idx_places_slug on public.places(slug);
create index idx_places_is_featured on public.places(is_featured);
create index idx_places_avg_rating on public.places(avg_rating desc);
create index idx_reviews_place_id on public.reviews(place_id);
create index idx_reviews_user_id on public.reviews(user_id);
create index idx_saved_places_user_id on public.saved_places(user_id);
create index idx_place_images_place_id on public.place_images(place_id);

-- ============================================================
-- TRIGGERS — Update avg_rating and review_count on places
-- ============================================================

create or replace function update_place_rating()
returns trigger as $$
declare
  new_avg numeric(2,1);
  new_count integer;
begin
  select
    coalesce(round(avg(rating)::numeric, 1), 0),
    count(*)
  into new_avg, new_count
  from public.reviews
  where place_id = coalesce(new.place_id, old.place_id);

  update public.places
  set
    avg_rating = new_avg,
    review_count = new_count,
    updated_at = now()
  where id = coalesce(new.place_id, old.place_id);

  return coalesce(new, old);
end;
$$ language plpgsql security definer;

create trigger after_review_insert
  after insert on public.reviews
  for each row execute function update_place_rating();

create trigger after_review_update
  after update on public.reviews
  for each row execute function update_place_rating();

create trigger after_review_delete
  after delete on public.reviews
  for each row execute function update_place_rating();

-- ============================================================
-- TRIGGERS — Update helpful_count on reviews
-- ============================================================

create or replace function update_helpful_count()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update public.reviews set helpful_count = helpful_count + 1
    where id = new.review_id;
    return new;
  elsif (TG_OP = 'DELETE') then
    update public.reviews set helpful_count = greatest(helpful_count - 1, 0)
    where id = old.review_id;
    return old;
  end if;
end;
$$ language plpgsql security definer;

create trigger after_helpful_vote_insert
  after insert on public.helpful_votes
  for each row execute function update_helpful_count();

create trigger after_helpful_vote_delete
  after delete on public.helpful_votes
  for each row execute function update_helpful_count();

-- ============================================================
-- TRIGGERS — Auto-create profile on user signup
-- ============================================================

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- TRIGGERS — Updated_at timestamp
-- ============================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function set_updated_at();

create trigger places_updated_at
  before update on public.places
  for each row execute function set_updated_at();

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.places enable row level security;
alter table public.place_images enable row level security;
alter table public.reviews enable row level security;
alter table public.review_images enable row level security;
alter table public.helpful_votes enable row level security;
alter table public.saved_places enable row level security;

-- Profiles
create policy "Profiles are publicly readable"
  on public.profiles for select using (true);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Places
create policy "Places are publicly readable"
  on public.places for select using (true);

create policy "Authenticated users can insert places"
  on public.places for insert
  with check (auth.uid() is not null);

create policy "Claimed owners can update their places"
  on public.places for update
  using (auth.uid() = claimed_by);

-- Place Images
create policy "Place images are publicly readable"
  on public.place_images for select using (true);

create policy "Authenticated users can add place images"
  on public.place_images for insert
  with check (auth.uid() = uploaded_by);

create policy "Image uploaders can delete their images"
  on public.place_images for delete
  using (auth.uid() = uploaded_by);

-- Reviews
create policy "Reviews are publicly readable"
  on public.reviews for select using (true);

create policy "Authenticated users can insert own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);

-- Review Images
create policy "Review images are publicly readable"
  on public.review_images for select using (true);

-- Helpful Votes
create policy "Helpful votes are publicly readable"
  on public.helpful_votes for select using (true);

create policy "Authenticated users can vote helpful"
  on public.helpful_votes for insert
  with check (auth.uid() = user_id);

create policy "Users can remove their helpful votes"
  on public.helpful_votes for delete
  using (auth.uid() = user_id);

-- Saved Places
create policy "Users can view own saved places"
  on public.saved_places for select
  using (auth.uid() = user_id);

create policy "Users can save places"
  on public.saved_places for insert
  with check (auth.uid() = user_id);

create policy "Users can unsave places"
  on public.saved_places for delete
  using (auth.uid() = user_id);

-- ============================================================
-- FEATURED PLACEMENTS — Monetization system
-- ============================================================

alter table public.places add column if not exists owner_email text;
alter table public.places add column if not exists owner_phone text;

create table public.featured_placements (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references public.places(id) on delete cascade not null,
  city text,
  category text,
  placement_type text not null check (placement_type in ('category_top', 'city_spotlight', 'homepage_featured', 'curated_list', 'search_boost')),
  label_text text default 'Destacado',
  is_active boolean default false,
  start_at timestamptz not null,
  end_at timestamptz not null,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'expired', 'cancelled')),
  plan_type text default 'monthly' check (plan_type in ('monthly', 'quarterly', 'founding_partner', 'custom')),
  price_paid numeric(10,2),
  rank_priority integer default 1 check (rank_priority between 1 and 10),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.featured_analytics (
  id uuid primary key default gen_random_uuid(),
  placement_id uuid references public.featured_placements(id) on delete cascade,
  place_id uuid references public.places(id) on delete cascade not null,
  event_type text not null check (event_type in ('impression', 'card_click', 'profile_view', 'save', 'share', 'directions_click', 'website_click', 'instagram_click', 'phone_click')),
  surface text check (surface in ('homepage', 'category_page', 'city_page', 'search_results', 'curated_list')),
  user_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Indexes
create index idx_featured_active on public.featured_placements(is_active, start_at, end_at) where is_active = true;
create index idx_featured_place on public.featured_placements(place_id);
create index idx_featured_city on public.featured_placements(city) where is_active = true;
create index idx_featured_category on public.featured_placements(category) where is_active = true;
create index idx_analytics_placement on public.featured_analytics(placement_id, created_at desc);
create index idx_analytics_place on public.featured_analytics(place_id, event_type);

-- RLS
alter table public.featured_placements enable row level security;
create policy "Public read active placements" on public.featured_placements
  for select using (is_active = true and now() between start_at and end_at);
create policy "Admin full access to placements" on public.featured_placements
  for all using (auth.jwt() ->> 'role' = 'admin');

alter table public.featured_analytics enable row level security;
create policy "Anyone can insert analytics" on public.featured_analytics
  for insert with check (true);
create policy "Admin read analytics" on public.featured_analytics
  for select using (auth.jwt() ->> 'role' = 'admin');

-- Auto-deactivate expired placements
create or replace function deactivate_expired_placements()
returns void as $$
begin
  update public.featured_placements
  set is_active = false, payment_status = 'expired', updated_at = now()
  where is_active = true and end_at < now();
end;
$$ language plpgsql;
