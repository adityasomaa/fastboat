import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/client";
import { mockBookings } from "@/lib/data/mock";

// Xendit Invoice webhook: marks bookings as paid/expired/etc.
// Configure: Xendit Dashboard → Settings → Webhooks
// Verification: header "x-callback-token" must match XENDIT_WEBHOOK_TOKEN

export async function POST(req: Request) {
  const expected = process.env.XENDIT_WEBHOOK_TOKEN ?? "";
  const got = req.headers.get("x-callback-token") ?? "";
  if (expected && expected !== got) {
    return NextResponse.json({ error: "Invalid callback token" }, { status: 401 });
  }

  const payload = (await req.json().catch(() => ({}))) as {
    external_id?: string;
    status?: string;
    payment_method?: string;
  };
  const { external_id, status, payment_method } = payload;
  if (!external_id || !status) {
    return NextResponse.json({ error: "Missing external_id/status" }, { status: 400 });
  }

  const newStatus =
    status === "PAID" || status === "SETTLED" ? "paid" :
    status === "EXPIRED" ? "expired" :
    status === "PENDING" ? "pending" :
    "pending";

  const sb = getServiceClient();
  if (sb) {
    await sb
      .from("bookings")
      .update({ status: newStatus, payment_method: payment_method ?? null })
      .eq("booking_code", external_id);
  } else {
    const b = mockBookings.find((b) => b.booking_code === external_id);
    if (b) {
      b.status = newStatus as typeof b.status;
      if (payment_method) b.payment_method = payment_method;
    }
  }

  return NextResponse.json({ ok: true });
}
