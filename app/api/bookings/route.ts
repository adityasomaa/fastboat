import { NextResponse } from "next/server";
import { createBooking } from "@/lib/data/queries";
import { createInvoice } from "@/lib/xendit";
import { getServiceClient } from "@/lib/supabase/client";

type Body = {
  route_id: string;
  schedule_id: string;
  travel_date: string;        // YYYY-MM-DD
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  adult_count: number;
  child_count: number;
  total_amount_idr: number;
  design: "design-4" | "design-5";
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["route_id","schedule_id","travel_date","customer_name","customer_email","customer_phone"] as const;
  for (const f of required) {
    if (!body[f]) return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 });
  }

  const booking = await createBooking({
    route_id: body.route_id,
    schedule_id: body.schedule_id,
    travel_date: body.travel_date,
    customer_name: body.customer_name,
    customer_email: body.customer_email,
    customer_phone: body.customer_phone,
    adult_count: body.adult_count ?? 1,
    child_count: body.child_count ?? 0,
    total_amount_idr: body.total_amount_idr,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const successUrl = `${siteUrl}/${body.design}/booking/success?code=${booking.booking_code}`;
  const failureUrl = `${siteUrl}/${body.design}/booking?failed=1`;

  const invoice = await createInvoice({
    externalId: booking.booking_code,
    amount: booking.total_amount_idr,
    payerEmail: booking.customer_email,
    description: `Fastboat ticket — ${booking.booking_code}`,
    successRedirectUrl: successUrl,
    failureRedirectUrl: failureUrl,
  });

  // Persist invoice details (best-effort; only when Supabase is wired up)
  const sb = getServiceClient();
  if (sb) {
    await sb
      .from("bookings")
      .update({
        xendit_invoice_id: invoice.id,
        xendit_invoice_url: invoice.invoice_url,
        payment_method: "XENDIT_INVOICE",
      })
      .eq("id", booking.id);
  } else {
    booking.xendit_invoice_id = invoice.id;
    booking.xendit_invoice_url = invoice.invoice_url;
    booking.payment_method = "XENDIT_INVOICE";
  }

  return NextResponse.json({
    booking_code: booking.booking_code,
    invoice_url: invoice.invoice_url,
    stub: invoice.id.startsWith("stub_"),
  });
}
