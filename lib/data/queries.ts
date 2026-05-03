// Unified data layer: uses Supabase when configured, falls back to mock data otherwise.
import { getServerClient, getServiceClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { mockBookings, mockRoutes, mockSchedules } from "@/lib/data/mock";
import type { Booking, BookingWithRoute, Route, Schedule } from "@/lib/types";

export async function getRoutes(): Promise<Route[]> {
  const sb = getServerClient();
  if (!sb) return mockRoutes;
  const { data, error } = await sb.from("routes").select("*").order("origin");
  if (error || !data) return mockRoutes;
  return data as Route[];
}

export async function getRoute(id: string): Promise<Route | null> {
  const sb = getServerClient();
  if (!sb) return mockRoutes.find((r) => r.id === id) ?? null;
  const { data } = await sb.from("routes").select("*").eq("id", id).single();
  return (data as Route) ?? null;
}

export async function getSchedules(routeId?: string): Promise<Schedule[]> {
  const sb = getServerClient();
  if (!sb) {
    return routeId
      ? mockSchedules.filter((s) => s.route_id === routeId)
      : mockSchedules;
  }
  let q = sb.from("schedules").select("*").eq("active", true);
  if (routeId) q = q.eq("route_id", routeId);
  const { data, error } = await q;
  if (error || !data) {
    return routeId ? mockSchedules.filter((s) => s.route_id === routeId) : mockSchedules;
  }
  return data as Schedule[];
}

export async function getBookings(): Promise<BookingWithRoute[]> {
  const sb = getServiceClient();
  if (!sb) {
    // Build joined view from mocks
    return mockBookings
      .map((b) => {
        const route = mockRoutes.find((r) => r.id === b.route_id)!;
        const schedule = mockSchedules.find((s) => s.id === b.schedule_id)!;
        return {
          ...b,
          route: { origin: route.origin, destination: route.destination },
          schedule: {
            departure_time: schedule.departure_time,
            arrival_time: schedule.arrival_time,
            boat_name: schedule.boat_name,
          },
        };
      })
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }
  const { data, error } = await sb
    .from("bookings")
    .select("*, route:routes(origin,destination), schedule:schedules(departure_time,arrival_time,boat_name)")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as unknown as BookingWithRoute[];
}

export async function createBooking(input: Omit<Booking, "id" | "booking_code" | "status" | "xendit_invoice_id" | "xendit_invoice_url" | "created_at" | "updated_at" | "payment_method" | "notes">): Promise<Booking> {
  const code = "FB-" + new Date().getFullYear() + "-" + String(Math.floor(1000 + Math.random() * 9000));
  const now = new Date().toISOString();
  const draft: Booking = {
    id: crypto.randomUUID(),
    booking_code: code,
    status: "pending",
    payment_method: null,
    xendit_invoice_id: null,
    xendit_invoice_url: null,
    notes: null,
    created_at: now,
    updated_at: now,
    ...input,
  };

  const sb = getServiceClient();
  if (!sb) {
    mockBookings.unshift(draft);
    return draft;
  }
  const { data, error } = await sb.from("bookings").insert(draft).select("*").single();
  if (error || !data) throw new Error(error?.message ?? "Failed to create booking");
  return data as Booking;
}

export function dataSourceLabel(): string {
  return isSupabaseConfigured() ? "Supabase (live)" : "Mock data (set Supabase env to switch)";
}
