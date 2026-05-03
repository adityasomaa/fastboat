export type Route = {
  id: string;
  origin: string;
  destination: string;
  duration_minutes: number;
  base_price_idr: number;
  description: string | null;
  hero_image: string | null;
};

export type Schedule = {
  id: string;
  route_id: string;
  departure_time: string;
  arrival_time: string;
  boat_name: string | null;
  capacity: number;
  active: boolean;
};

export type BookingStatus = "pending" | "paid" | "cancelled" | "expired";

export type Booking = {
  id: string;
  booking_code: string;
  route_id: string;
  schedule_id: string;
  travel_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  adult_count: number;
  child_count: number;
  total_amount_idr: number;
  status: BookingStatus;
  payment_method: string | null;
  xendit_invoice_id: string | null;
  xendit_invoice_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type BookingWithRoute = Booking & {
  route: Pick<Route, "origin" | "destination">;
  schedule: Pick<Schedule, "departure_time" | "arrival_time" | "boat_name">;
};
