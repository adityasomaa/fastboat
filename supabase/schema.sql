-- ============================================================
-- Fastboat Bali — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ─── Routes (Sanur ↔ Nusa Penida, etc.) ──────────────────
create table if not exists public.routes (
  id          uuid primary key default gen_random_uuid(),
  origin      text not null,
  destination text not null,
  duration_minutes integer not null,
  base_price_idr   integer not null,
  description text,
  hero_image  text,
  created_at  timestamptz default now()
);

-- ─── Schedules (daily departures per route) ──────────────
create table if not exists public.schedules (
  id            uuid primary key default gen_random_uuid(),
  route_id      uuid not null references public.routes(id) on delete cascade,
  departure_time text not null,                -- e.g. "08:00"
  arrival_time   text not null,                -- e.g. "08:45"
  boat_name     text,
  capacity      integer not null default 50,
  active        boolean default true
);

-- ─── Bookings ─────────────────────────────────────────────
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  booking_code    text unique not null,
  route_id        uuid not null references public.routes(id),
  schedule_id     uuid not null references public.schedules(id),
  travel_date     date not null,
  customer_name   text not null,
  customer_email  text not null,
  customer_phone  text not null,
  adult_count     integer not null default 1,
  child_count     integer not null default 0,
  total_amount_idr integer not null,
  status          text not null default 'pending'
                  check (status in ('pending','paid','cancelled','expired')),
  payment_method  text,
  xendit_invoice_id text,
  xendit_invoice_url text,
  notes           text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists bookings_status_idx     on public.bookings(status);
create index if not exists bookings_travel_date_idx on public.bookings(travel_date);
create index if not exists bookings_created_at_idx  on public.bookings(created_at desc);

-- ─── Passengers (one row per pax on a booking) ──────────
create table if not exists public.passengers (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid not null references public.bookings(id) on delete cascade,
  full_name   text not null,
  passport_no text,
  nationality text,
  is_child    boolean default false
);

-- ─── RLS ─────────────────────────────────────────────────
-- Public read for routes/schedules; bookings only via service role.
alter table public.routes     enable row level security;
alter table public.schedules  enable row level security;
alter table public.bookings   enable row level security;
alter table public.passengers enable row level security;

drop policy if exists "routes_public_read" on public.routes;
create policy "routes_public_read" on public.routes
  for select using (true);

drop policy if exists "schedules_public_read" on public.schedules;
create policy "schedules_public_read" on public.schedules
  for select using (true);

-- bookings + passengers: no anon access; server uses service-role key.
