// In-memory fallback data used when Supabase env is not configured.
// Mirrors supabase/seed.sql so the previews work end-to-end without DB.
//
// Note: under Turbopack, route handlers and RSC pages can resolve this module
// to separate instances. We hoist the mutable bookings array onto globalThis so
// every copy shares the same store. Read-only data can stay as plain consts.
import type { Booking, Route, Schedule } from "@/lib/types";

export const mockRoutes: Route[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    origin: "Sanur",
    destination: "Nusa Penida",
    duration_minutes: 45,
    base_price_idr: 450000,
    description: "The most popular crossing to the dramatic cliffs of Nusa Penida.",
    hero_image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    origin: "Sanur",
    destination: "Nusa Lembongan",
    duration_minutes: 40,
    base_price_idr: 400000,
    description: "Quick hop to the laid-back island paradise of Lembongan.",
    hero_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    origin: "Padangbai",
    destination: "Gili Trawangan",
    duration_minutes: 90,
    base_price_idr: 650000,
    description: "Direct service to the largest of the three Gili Islands.",
    hero_image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    origin: "Serangan",
    destination: "Nusa Lembongan",
    duration_minutes: 35,
    base_price_idr: 375000,
    description: "A scenic route departing from Serangan harbour, south Bali.",
    hero_image: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=1600",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    origin: "Padangbai",
    destination: "Gili Air",
    duration_minutes: 90,
    base_price_idr: 650000,
    description: "Reach the quietest of the Gili Islands in under two hours.",
    hero_image: "https://images.unsplash.com/photo-1502209524164-acea936639a2?auto=format&fit=crop&w=1600",
  },
];

export const mockSchedules: Schedule[] = [
  { id: "s-001", route_id: "11111111-1111-1111-1111-111111111111", departure_time: "08:00", arrival_time: "08:45", boat_name: "Ocean Express I",  capacity: 60, active: true },
  { id: "s-002", route_id: "11111111-1111-1111-1111-111111111111", departure_time: "10:30", arrival_time: "11:15", boat_name: "Ocean Express II", capacity: 60, active: true },
  { id: "s-003", route_id: "11111111-1111-1111-1111-111111111111", departure_time: "13:00", arrival_time: "13:45", boat_name: "Ocean Express I",  capacity: 60, active: true },
  { id: "s-004", route_id: "11111111-1111-1111-1111-111111111111", departure_time: "16:00", arrival_time: "16:45", boat_name: "Ocean Express II", capacity: 60, active: true },
  { id: "s-005", route_id: "22222222-2222-2222-2222-222222222222", departure_time: "09:00", arrival_time: "09:40", boat_name: "Blue Wave",        capacity: 50, active: true },
  { id: "s-006", route_id: "22222222-2222-2222-2222-222222222222", departure_time: "12:30", arrival_time: "13:10", boat_name: "Blue Wave",        capacity: 50, active: true },
  { id: "s-007", route_id: "22222222-2222-2222-2222-222222222222", departure_time: "15:30", arrival_time: "16:10", boat_name: "Blue Wave Pro",    capacity: 55, active: true },
  { id: "s-008", route_id: "33333333-3333-3333-3333-333333333333", departure_time: "09:30", arrival_time: "11:00", boat_name: "Gili Cat",         capacity: 80, active: true },
  { id: "s-009", route_id: "33333333-3333-3333-3333-333333333333", departure_time: "13:30", arrival_time: "15:00", boat_name: "Gili Cat",         capacity: 80, active: true },
  { id: "s-010", route_id: "44444444-4444-4444-4444-444444444444", departure_time: "10:00", arrival_time: "10:35", boat_name: "Coral Express",    capacity: 45, active: true },
  { id: "s-011", route_id: "44444444-4444-4444-4444-444444444444", departure_time: "14:00", arrival_time: "14:35", boat_name: "Coral Express",    capacity: 45, active: true },
  { id: "s-012", route_id: "55555555-5555-5555-5555-555555555555", departure_time: "09:30", arrival_time: "11:00", boat_name: "Gili Cat",         capacity: 80, active: true },
  { id: "s-013", route_id: "55555555-5555-5555-5555-555555555555", departure_time: "13:30", arrival_time: "15:00", boat_name: "Gili Cat",         capacity: 80, active: true },
];

const today = new Date();
const day = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};
const ago = (hours: number) => new Date(Date.now() - hours * 3600_000).toISOString();

const seedBookings = (): Booking[] => [
  { id: "b-01", booking_code: "FB-2026-0001", route_id: "11111111-1111-1111-1111-111111111111", schedule_id: "s-001", travel_date: day(2),  customer_name: "Olivia Bennett",  customer_email: "olivia.b@example.com",  customer_phone: "+61 412 345 678", adult_count: 2, child_count: 0, total_amount_idr:  900000, status: "paid",      payment_method: "XENDIT_VA",      xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(72),  updated_at: ago(72)  },
  { id: "b-02", booking_code: "FB-2026-0002", route_id: "22222222-2222-2222-2222-222222222222", schedule_id: "s-006", travel_date: day(5),  customer_name: "Marco Rossi",     customer_email: "marco.r@example.it",     customer_phone: "+39 333 1122334", adult_count: 4, child_count: 1, total_amount_idr: 1800000, status: "paid",      payment_method: "XENDIT_CARD",    xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(48),  updated_at: ago(48)  },
  { id: "b-03", booking_code: "FB-2026-0003", route_id: "33333333-3333-3333-3333-333333333333", schedule_id: "s-008", travel_date: day(1),  customer_name: "Sofie Larsen",    customer_email: "sofie.l@example.dk",     customer_phone: "+45 22 33 44 55", adult_count: 2, child_count: 0, total_amount_idr: 1300000, status: "pending",   payment_method: "XENDIT_INVOICE", xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(6),   updated_at: ago(6)   },
  { id: "b-04", booking_code: "FB-2026-0004", route_id: "44444444-4444-4444-4444-444444444444", schedule_id: "s-010", travel_date: day(7),  customer_name: "Hiroshi Tanaka",  customer_email: "h.tanaka@example.jp",    customer_phone: "+81 90 1234 5678",adult_count: 1, child_count: 0, total_amount_idr:  375000, status: "paid",      payment_method: "XENDIT_QRIS",    xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(24),  updated_at: ago(24)  },
  { id: "b-05", booking_code: "FB-2026-0005", route_id: "11111111-1111-1111-1111-111111111111", schedule_id: "s-001", travel_date: day(3),  customer_name: "Emma Schmidt",    customer_email: "emma.s@example.de",      customer_phone: "+49 151 2233445", adult_count: 2, child_count: 1, total_amount_idr: 1125000, status: "paid",      payment_method: "XENDIT_VA",      xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(96),  updated_at: ago(96)  },
  { id: "b-06", booking_code: "FB-2026-0006", route_id: "55555555-5555-5555-5555-555555555555", schedule_id: "s-013", travel_date: day(10), customer_name: "Liam OConnor",    customer_email: "liam@example.ie",        customer_phone: "+353 87 1234567", adult_count: 3, child_count: 0, total_amount_idr: 1950000, status: "pending",   payment_method: "XENDIT_INVOICE", xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(2),   updated_at: ago(2)   },
  { id: "b-07", booking_code: "FB-2026-0007", route_id: "22222222-2222-2222-2222-222222222222", schedule_id: "s-006", travel_date: day(-2), customer_name: "Yui Nakamura",    customer_email: "yui@example.jp",         customer_phone: "+81 80 9876 5432",adult_count: 2, child_count: 0, total_amount_idr:  800000, status: "paid",      payment_method: "XENDIT_QRIS",    xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(168), updated_at: ago(168) },
  { id: "b-08", booking_code: "FB-2026-0008", route_id: "11111111-1111-1111-1111-111111111111", schedule_id: "s-001", travel_date: day(14), customer_name: "James Wilson",    customer_email: "jw@example.com",         customer_phone: "+1 415 555 0123", adult_count: 6, child_count: 2, total_amount_idr: 3600000, status: "paid",      payment_method: "XENDIT_CARD",    xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(12),  updated_at: ago(12)  },
  { id: "b-09", booking_code: "FB-2026-0009", route_id: "33333333-3333-3333-3333-333333333333", schedule_id: "s-008", travel_date: day(4),  customer_name: "Chloe Dubois",    customer_email: "chloe.d@example.fr",     customer_phone: "+33 6 12 34 56 78",adult_count:2, child_count: 0, total_amount_idr: 1300000, status: "cancelled", payment_method: "XENDIT_VA",      xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(120), updated_at: ago(120) },
  { id: "b-10", booking_code: "FB-2026-0010", route_id: "44444444-4444-4444-4444-444444444444", schedule_id: "s-010", travel_date: day(6),  customer_name: "Andre Silva",     customer_email: "andre@example.br",       customer_phone: "+55 11 99887 6655",adult_count:2, child_count: 1, total_amount_idr: 1125000, status: "paid",      payment_method: "XENDIT_VA",      xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(8),   updated_at: ago(8)   },
  { id: "b-11", booking_code: "FB-2026-0011", route_id: "22222222-2222-2222-2222-222222222222", schedule_id: "s-006", travel_date: day(9),  customer_name: "Mei Lin",         customer_email: "mei.lin@example.sg",     customer_phone: "+65 9123 4567",   adult_count: 2, child_count: 0, total_amount_idr:  800000, status: "pending",   payment_method: "XENDIT_INVOICE", xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(1),   updated_at: ago(1)   },
  { id: "b-12", booking_code: "FB-2026-0012", route_id: "11111111-1111-1111-1111-111111111111", schedule_id: "s-001", travel_date: day(12), customer_name: "Carlos Mendoza",  customer_email: "carlos@example.es",      customer_phone: "+34 612 345 678", adult_count: 4, child_count: 0, total_amount_idr: 1800000, status: "paid",      payment_method: "XENDIT_CARD",    xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(10),  updated_at: ago(10)  },
  { id: "b-13", booking_code: "FB-2026-0013", route_id: "55555555-5555-5555-5555-555555555555", schedule_id: "s-013", travel_date: day(15), customer_name: "Anna Kowalski",   customer_email: "anna.k@example.pl",      customer_phone: "+48 600 123 456", adult_count: 2, child_count: 0, total_amount_idr: 1300000, status: "paid",      payment_method: "XENDIT_VA",      xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(15),  updated_at: ago(15)  },
  { id: "b-14", booking_code: "FB-2026-0014", route_id: "11111111-1111-1111-1111-111111111111", schedule_id: "s-001", travel_date: day(-5), customer_name: "Thomas Becker",   customer_email: "t.becker@example.at",    customer_phone: "+43 660 1234567", adult_count: 3, child_count: 0, total_amount_idr: 1350000, status: "paid",      payment_method: "XENDIT_QRIS",    xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(336), updated_at: ago(336) },
  { id: "b-15", booking_code: "FB-2026-0015", route_id: "33333333-3333-3333-3333-333333333333", schedule_id: "s-008", travel_date: day(8),  customer_name: "Sophia Martinez", customer_email: "sophia@example.mx",      customer_phone: "+52 55 1234 5678",adult_count: 2, child_count: 1, total_amount_idr: 1625000, status: "pending",   payment_method: "XENDIT_INVOICE", xendit_invoice_id: null, xendit_invoice_url: null, notes: null, created_at: ago(0.5), updated_at: ago(0.5) },
];

// Stable singleton across module-instance duplication (Turbopack/dev HMR).
const g = globalThis as unknown as { __fbBookings?: Booking[] };
if (!g.__fbBookings) g.__fbBookings = seedBookings();
export const mockBookings: Booking[] = g.__fbBookings;
