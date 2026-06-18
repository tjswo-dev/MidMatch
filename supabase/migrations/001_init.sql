-- ============================================================
-- MidMatch DB Schema — Supabase (PostgreSQL)
-- ============================================================
-- Supabase Auth가 auth.users를 자동 관리하므로
-- 애플리케이션 레벨 프로필은 public 스키마에 별도 구성합니다.
-- ============================================================

-- ----------------------------------------------------------
-- 1. profiles (모든 유저 공통 — auth.users와 1:1)
-- ----------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('BRAND', 'INFLUENCER')),
  created_at  timestamptz default now() not null
);

-- auth.users 가입 시 자동으로 profiles 행 생성하는 트리거
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'INFLUENCER')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------
-- 2. influencer_profiles (인플루언서 전용 프로필 — profiles와 1:1)
-- ----------------------------------------------------------
create table public.influencer_profiles (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null unique references public.profiles(id) on delete cascade,
  name                text,
  phone               text,
  address             text,
  zip_code            text,
  contact_email       text,
  instagram_url       text,
  instagram_followers integer default 0,
  tiktok_url          text,
  tiktok_followers    integer default 0,
  paypal_email        text,
  updated_at          timestamptz default now() not null
);

-- ----------------------------------------------------------
-- 3. brand_profiles (브랜드 전용 프로필 — profiles와 1:1)
-- ----------------------------------------------------------
create table public.brand_profiles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null unique references public.profiles(id) on delete cascade,
  company_name text,
  brand_name   text,
  website      text,
  category     text,
  updated_at   timestamptz default now() not null
);

-- ----------------------------------------------------------
-- 4. campaigns (브랜드가 등록하는 캠페인)
-- ----------------------------------------------------------
create table public.campaigns (
  id                  uuid primary key default gen_random_uuid(),
  brand_id            uuid not null references public.profiles(id) on delete cascade,
  brand_name          text not null,
  product_name        text not null,
  product_description text,
  product_image_url   text,
  target_country      text,
  target_age          text,
  target_gender       text default '전체',
  desired_platform    text,
  reward_amount       integer not null default 0,
  capacity            integer not null default 1,
  recruitment_period  date,
  confirm_date        date,
  shipping_period     date,
  upload_deadline     date,
  guidelines          text,
  status              text not null default 'ACTIVE' check (status in ('ACTIVE', 'CLOSED', 'DRAFT')),
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null
);

-- ----------------------------------------------------------
-- 5. applications (인플루언서 → 캠페인 신청)
-- ----------------------------------------------------------
create table public.applications (
  id              uuid primary key default gen_random_uuid(),
  campaign_id     uuid not null references public.campaigns(id) on delete cascade,
  influencer_id   uuid not null references public.profiles(id) on delete cascade,
  status          text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  message         text,
  agree_secondary boolean default false,
  applied_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null,
  unique (campaign_id, influencer_id)  -- 동일 캠페인 중복 신청 방지
);

-- ----------------------------------------------------------
-- updated_at 자동 갱신 함수 + 트리거
-- ----------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_influencer_profiles_updated_at
  before update on public.influencer_profiles
  for each row execute function public.set_updated_at();

create trigger set_brand_profiles_updated_at
  before update on public.brand_profiles
  for each row execute function public.set_updated_at();

create trigger set_campaigns_updated_at
  before update on public.campaigns
  for each row execute function public.set_updated_at();

create trigger set_applications_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------
-- 인덱스
-- ----------------------------------------------------------
create index idx_campaigns_brand_id    on public.campaigns(brand_id);
create index idx_campaigns_status      on public.campaigns(status);
create index idx_applications_campaign on public.applications(campaign_id);
create index idx_applications_influencer on public.applications(influencer_id);
create index idx_applications_status   on public.applications(status);

-- ----------------------------------------------------------
-- Row Level Security (RLS)
-- ----------------------------------------------------------
alter table public.profiles             enable row level security;
alter table public.influencer_profiles  enable row level security;
alter table public.brand_profiles       enable row level security;
alter table public.campaigns            enable row level security;
alter table public.applications         enable row level security;

-- profiles: 본인만 자신 프로필 조회/수정
create policy "profiles: self read"   on public.profiles for select using (auth.uid() = id);
create policy "profiles: self update" on public.profiles for update using (auth.uid() = id);

-- influencer_profiles: 본인만 수정, 브랜드는 읽기 가능
create policy "inf_profiles: self manage" on public.influencer_profiles
  for all using (auth.uid() = user_id);
create policy "inf_profiles: brand read" on public.influencer_profiles
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'BRAND')
  );

-- brand_profiles: 본인만 관리
create policy "brand_profiles: self manage" on public.brand_profiles
  for all using (auth.uid() = user_id);

-- campaigns: 누구나 ACTIVE 조회, 브랜드만 본인 캠페인 등록/수정
create policy "campaigns: public read" on public.campaigns
  for select using (status = 'ACTIVE');
create policy "campaigns: brand read own" on public.campaigns
  for select using (auth.uid() = brand_id);
create policy "campaigns: brand insert" on public.campaigns
  for insert with check (
    auth.uid() = brand_id and
    exists (select 1 from public.profiles where id = auth.uid() and role = 'BRAND')
  );
create policy "campaigns: brand update own" on public.campaigns
  for update using (auth.uid() = brand_id);

-- applications: 인플루언서 본인 신청/조회, 브랜드는 자신 캠페인 신청자만 조회
create policy "applications: influencer manage own" on public.applications
  for all using (auth.uid() = influencer_id);
create policy "applications: brand read own campaigns" on public.applications
  for select using (
    exists (
      select 1 from public.campaigns c
      where c.id = campaign_id and c.brand_id = auth.uid()
    )
  );
create policy "applications: brand update status" on public.applications
  for update using (
    exists (
      select 1 from public.campaigns c
      where c.id = campaign_id and c.brand_id = auth.uid()
    )
  );
