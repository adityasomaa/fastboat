-- ============================================================
-- Dummy data: routes, schedules, bookings, passengers
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- Clean slate (idempotent re-seed)
truncate table public.passengers, public.bookings, public.schedules, public.routes
  restart identity cascade;

-- ─── Routes ──────────────────────────────────────────────
insert into public.routes (id, origin, destination, duration_minutes, base_price_idr, description, hero_image) values
  ('11111111-1111-1111-1111-111111111111', 'Sanur',     'Nusa Penida',   45,  450000, 'The most popular crossing to the dramatic cliffs of Nusa Penida.',                'https://images.unsplash.com/photo-1540541338287-41700207dee6'),
  ('22222222-2222-2222-2222-222222222222', 'Sanur',     'Nusa Lembongan',40,  400000, 'Quick hop to the laid-back island paradise of Lembongan.',                       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
  ('33333333-3333-3333-3333-333333333333', 'Padangbai', 'Gili Trawangan',90,  650000, 'Direct service to the largest of the three Gili Islands.',                       'https://images.unsplash.com/photo-1559827260-dc66d52bef19'),
  ('44444444-4444-4444-4444-444444444444', 'Serangan',  'Nusa Lembongan',35,  375000, 'A scenic route departing from Serangan harbour, south Bali.',                    'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d'),
  ('55555555-5555-5555-5555-555555555555', 'Padangbai', 'Gili Air',      90,  650000, 'Reach the quietest of the Gili Islands in under two hours.',                     'https://images.unsplash.com/photo-1502209524164-acea936639a2');

-- ─── Schedules ──────────────────────────────────────────
insert into public.schedules (route_id, departure_time, arrival_time, boat_name, capacity) values
  -- Sanur → Nusa Penida (4 daily)
  ('11111111-1111-1111-1111-111111111111', '08:00', '08:45', 'Ocean Express I',  60),
  ('11111111-1111-1111-1111-111111111111', '10:30', '11:15', 'Ocean Express II', 60),
  ('11111111-1111-1111-1111-111111111111', '13:00', '13:45', 'Ocean Express I',  60),
  ('11111111-1111-1111-1111-111111111111', '16:00', '16:45', 'Ocean Express II', 60),
  -- Sanur → Lembongan (3 daily)
  ('22222222-2222-2222-2222-222222222222', '09:00', '09:40', 'Blue Wave',        50),
  ('22222222-2222-2222-2222-222222222222', '12:30', '13:10', 'Blue Wave',        50),
  ('22222222-2222-2222-2222-222222222222', '15:30', '16:10', 'Blue Wave Pro',    55),
  -- Padangbai → Gili Trawangan (2 daily)
  ('33333333-3333-3333-3333-333333333333', '09:30', '11:00', 'Gili Cat',         80),
  ('33333333-3333-3333-3333-333333333333', '13:30', '15:00', 'Gili Cat',         80),
  -- Serangan → Lembongan (2 daily)
  ('44444444-4444-4444-4444-444444444444', '10:00', '10:35', 'Coral Express',    45),
  ('44444444-4444-4444-4444-444444444444', '14:00', '14:35', 'Coral Express',    45),
  -- Padangbai → Gili Air
  ('55555555-5555-5555-5555-555555555555', '09:30', '11:00', 'Gili Cat',         80),
  ('55555555-5555-5555-5555-555555555555', '13:30', '15:00', 'Gili Cat',         80);

-- ─── Dummy bookings ─────────────────────────────────────
do $$
declare
  r_sanur_penida   uuid := '11111111-1111-1111-1111-111111111111';
  r_sanur_lembo    uuid := '22222222-2222-2222-2222-222222222222';
  r_padang_gilit   uuid := '33333333-3333-3333-3333-333333333333';
  r_serangan_lembo uuid := '44444444-4444-4444-4444-444444444444';
  r_padang_gilia   uuid := '55555555-5555-5555-5555-555555555555';
  s1 uuid; s2 uuid; s3 uuid; s4 uuid; s5 uuid;
  b_id uuid;
begin
  select id into s1 from public.schedules where route_id = r_sanur_penida   and departure_time = '08:00' limit 1;
  select id into s2 from public.schedules where route_id = r_sanur_lembo    and departure_time = '12:30' limit 1;
  select id into s3 from public.schedules where route_id = r_padang_gilit   and departure_time = '09:30' limit 1;
  select id into s4 from public.schedules where route_id = r_serangan_lembo and departure_time = '10:00' limit 1;
  select id into s5 from public.schedules where route_id = r_padang_gilia   and departure_time = '13:30' limit 1;

  insert into public.bookings (booking_code, route_id, schedule_id, travel_date, customer_name, customer_email, customer_phone, adult_count, child_count, total_amount_idr, status, payment_method, created_at) values
    ('FB-2026-0001', r_sanur_penida,   s1, current_date + 2,  'Olivia Bennett',  'olivia.b@example.com',   '+61 412 345 678', 2, 0,  900000, 'paid',      'XENDIT_VA',     now() - interval '3 days'),
    ('FB-2026-0002', r_sanur_lembo,    s2, current_date + 5,  'Marco Rossi',     'marco.r@example.it',     '+39 333 1122334', 4, 1, 1800000, 'paid',      'XENDIT_CARD',   now() - interval '2 days'),
    ('FB-2026-0003', r_padang_gilit,   s3, current_date + 1,  'Sofie Larsen',    'sofie.l@example.dk',     '+45 22 33 44 55', 2, 0, 1300000, 'pending',   'XENDIT_INVOICE',now() - interval '6 hours'),
    ('FB-2026-0004', r_serangan_lembo, s4, current_date + 7,  'Hiroshi Tanaka',  'h.tanaka@example.jp',    '+81 90 1234 5678',1, 0,  375000, 'paid',      'XENDIT_QRIS',   now() - interval '1 day'),
    ('FB-2026-0005', r_sanur_penida,   s1, current_date + 3,  'Emma Schmidt',    'emma.s@example.de',      '+49 151 2233445', 2, 1, 1125000, 'paid',      'XENDIT_VA',     now() - interval '4 days'),
    ('FB-2026-0006', r_padang_gilia,   s5, current_date + 10, 'Liam OConnor',    'liam@example.ie',        '+353 87 1234567', 3, 0, 1950000, 'pending',   'XENDIT_INVOICE',now() - interval '2 hours'),
    ('FB-2026-0007', r_sanur_lembo,    s2, current_date - 2,  'Yui Nakamura',    'yui@example.jp',         '+81 80 9876 5432',2, 0,  800000, 'paid',      'XENDIT_QRIS',   now() - interval '7 days'),
    ('FB-2026-0008', r_sanur_penida,   s1, current_date + 14, 'James Wilson',    'jw@example.com',         '+1 415 555 0123', 6, 2, 3600000, 'paid',      'XENDIT_CARD',   now() - interval '12 hours'),
    ('FB-2026-0009', r_padang_gilit,   s3, current_date + 4,  'Chloe Dubois',    'chloe.d@example.fr',     '+33 6 12 34 56 78',2, 0, 1300000, 'cancelled', 'XENDIT_VA',     now() - interval '5 days'),
    ('FB-2026-0010', r_serangan_lembo, s4, current_date + 6,  'Andre Silva',     'andre@example.br',       '+55 11 99887 6655',2, 1, 1125000, 'paid',      'XENDIT_VA',     now() - interval '8 hours'),
    ('FB-2026-0011', r_sanur_lembo,    s2, current_date + 9,  'Mei Lin',         'mei.lin@example.sg',     '+65 9123 4567',   2, 0,  800000, 'pending',   'XENDIT_INVOICE',now() - interval '1 hour'),
    ('FB-2026-0012', r_sanur_penida,   s1, current_date + 12, 'Carlos Mendoza',  'carlos@example.es',      '+34 612 345 678', 4, 0, 1800000, 'paid',      'XENDIT_CARD',   now() - interval '10 hours'),
    ('FB-2026-0013', r_padang_gilia,   s5, current_date + 15, 'Anna Kowalski',   'anna.k@example.pl',      '+48 600 123 456', 2, 0, 1300000, 'paid',      'XENDIT_VA',     now() - interval '15 hours'),
    ('FB-2026-0014', r_sanur_penida,   s1, current_date - 5,  'Thomas Becker',   't.becker@example.at',    '+43 660 1234567', 3, 0, 1350000, 'paid',      'XENDIT_QRIS',   now() - interval '14 days'),
    ('FB-2026-0015', r_padang_gilit,   s3, current_date + 8,  'Sophia Martinez', 'sophia@example.mx',      '+52 55 1234 5678',2, 1, 1625000, 'pending',   'XENDIT_INVOICE',now() - interval '30 minutes');

  -- Add 1 passenger record per booking (lead pax) for the first 5 bookings
  for b_id in select id from public.bookings order by created_at desc limit 5 loop
    insert into public.passengers (booking_id, full_name, passport_no, nationality, is_child)
    select b_id, customer_name, 'P' || substr(md5(random()::text), 1, 8), 'AU', false
    from public.bookings where id = b_id;
  end loop;
end $$;
