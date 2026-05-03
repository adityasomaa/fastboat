import Link from "next/link";
import { getBookings } from "@/lib/data/queries";
import { formatDate, formatDateTime, formatIDR } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { I, ICON_SIZE } from "@/components/Icon";
import type { BookingStatus } from "@/lib/types";

type Variant = "tevily" | "travo";
const TONE = {
  tevily: { ring: "#ff5946", text: "text-[#ff5946]", chip: "bg-[#ff5946]/10 text-[#ff5946]", logo: "bg-[#ff5946]" },
  travo:  { ring: "#ff6b3d", text: "text-[#ff6b3d]", chip: "bg-[#ff6b3d]/10 text-[#ff6b3d]", logo: "bg-[#ff6b3d]" },
};
const BRAND = {
  tevily: { name: "Tevily", italic: true,  primaryDark: "#1f2440" },
  travo:  { name: "Travo",  italic: false, primaryDark: "#1a1c2c" },
};

const STATUS_STYLE: Record<BookingStatus, string> = {
  paid:      "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
  pending:   "bg-amber-50 text-amber-900 ring-1 ring-amber-200",
  cancelled: "bg-rose-50 text-rose-800 ring-1 ring-rose-200",
  expired:   "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};
const STATUS_DOT: Record<BookingStatus, string> = {
  paid: "bg-emerald-500", pending: "bg-amber-500", cancelled: "bg-rose-500", expired: "bg-slate-400",
};

export async function AdminDashboard({
  variant,
  designSlug,
}: {
  variant: Variant;
  designSlug: "design-4" | "design-5";
}) {
  const bookings = await getBookings();
  const tone = TONE[variant];
  const brand = BRAND[variant];

  const totalPaid    = bookings.filter((b) => b.status === "paid").reduce((s, b) => s + b.total_amount_idr, 0);
  const totalPending = bookings.filter((b) => b.status === "pending").reduce((s, b) => s + b.total_amount_idr, 0);
  const upcoming     = bookings.filter((b) => new Date(b.travel_date) >= new Date(new Date().toDateString())).length;

  return (
    <main
      className="min-h-screen bg-[var(--bg-soft)]"
      style={{ ["--ring" as string]: tone.ring }}
    >
      {/* Top utility bar (matching reference brand pattern) */}
      <div className="bg-[#1f2440] py-2 text-xs text-white/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5">
            <I.shield size={12} className={tone.text} aria-hidden />
            Admin console — for staff only
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 tabular-nums">
            <I.clock size={12} aria-hidden />
            {new Date().toLocaleString("en-US", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href={`/${designSlug}`}
              className="tap-target inline-flex items-center gap-2 px-1 text-xl font-extrabold"
              aria-label={`Back to ${brand.name} site`}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-md ${tone.logo} text-white`}>
                <I.ship size={ICON_SIZE.md} aria-hidden />
              </span>
              <span className={brand.italic ? "font-display italic" : ""}>{brand.name}</span>
            </Link>
            <span className="hidden text-[var(--fg-mute)] sm:inline">/</span>
            <h1 className="hidden text-base font-bold sm:block">Admin · Bookings</h1>
            <span className={`hidden rounded-full px-2 py-0.5 text-[11px] font-semibold lg:inline ${tone.chip}`}>
              {designSlug}
            </span>
          </div>
          <form action={`/api/admin/logout?back=/${designSlug}/admin`} method="post">
            <button
              type="submit"
              className="tap-target inline-flex items-center gap-1.5 rounded-md px-3 text-sm font-medium text-[var(--fg-soft)] hover:text-[var(--fg)]"
            >
              <I.logout size={ICON_SIZE.md} aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-baseline gap-3">
          <p className={`font-script text-3xl ${tone.text}`}>Today's overview</p>
          <span className="text-xs uppercase tracking-widest text-[var(--fg-mute)]">live data</span>
        </div>
        <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Bookings dashboard</h2>

        {/* KPIs — primary KPI emphasised, others subordinate */}
        <ul className="mt-6 grid gap-4 md:grid-cols-4">
          <Kpi label="Paid revenue"        value={formatIDR(totalPaid)}    icon="trending"  primary  accentText={tone.text} />
          <Kpi label="Total bookings"      value={String(bookings.length)} icon="ticket" />
          <Kpi label="Pending payment"     value={formatIDR(totalPending)} icon="clock" />
          <Kpi label="Upcoming departures" value={String(upcoming)}        icon="calendar" />
        </ul>

        {!isSupabaseConfigured() && (
          <div role="status" className="mt-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <I.shield size={ICON_SIZE.md} className="mt-0.5 shrink-0" aria-hidden />
            <div>
              <div className="font-semibold">Mock mode — in-memory data</div>
              <p className="mt-1 text-amber-800">
                Showing local data because Supabase env is not configured. Set the env vars in{" "}
                <code className="rounded bg-amber-100 px-1.5 py-0.5">.env.local</code>, then run{" "}
                <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/schema.sql</code> +{" "}
                <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/seed.sql</code>.
              </p>
            </div>
          </div>
        )}

        <section className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)]">
          <header className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-5 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-mute)]">
              Recent bookings
            </h2>
            <span className="text-xs tabular-nums text-[var(--fg-mute)]">{bookings.length} total</span>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border)] text-sm">
              <thead className="bg-[var(--bg-soft)] text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-mute)]">
                <tr>
                  <th scope="col" className="px-5 py-3">Code</th>
                  <th scope="col" className="px-5 py-3">Customer</th>
                  <th scope="col" className="px-5 py-3">Route</th>
                  <th scope="col" className="px-5 py-3">Travel</th>
                  <th scope="col" className="px-5 py-3">Pax</th>
                  <th scope="col" className="px-5 py-3 text-right">Total</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                  <th scope="col" className="px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[var(--bg-soft)]">
                    <td className="px-5 py-3 font-mono text-xs font-bold tabular-nums">{b.booking_code}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium">{b.customer_name}</div>
                      <div className="text-xs text-[var(--fg-mute)]">{b.customer_email}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium">{b.route.origin} → {b.route.destination}</div>
                      <div className="text-xs text-[var(--fg-mute)]">{b.schedule.departure_time} · {b.schedule.boat_name}</div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">{formatDate(b.travel_date)}</td>
                    <td className="px-5 py-3 tabular-nums">
                      {b.adult_count}A{b.child_count > 0 ? ` + ${b.child_count}C` : ""}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold tabular-nums">{formatIDR(b.total_amount_idr)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[b.status]}`}>
                        <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[b.status]}`} />
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-xs text-[var(--fg-mute)]">{formatDateTime(b.created_at)}</td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center">
                      <div className="mx-auto inline-flex flex-col items-center text-[var(--fg-mute)]">
                        <I.ticket size={32} aria-hidden className="opacity-50" />
                        <p className="mt-3 text-sm">No bookings yet.</p>
                        <Link href={`/${designSlug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--fg)] hover:underline">
                          Create one
                          <I.arrowRight size={ICON_SIZE.sm} aria-hidden />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-[var(--fg-mute)]">
          <I.checkCircle size={ICON_SIZE.sm} aria-hidden />
          Tip: Create a test booking from{" "}
          <Link href={`/${designSlug}`} className="ml-0.5 underline-offset-2 hover:underline">
            /{designSlug}
          </Link>
          {" "}— it will show up at the top of this list.
        </p>
      </div>
    </main>
  );
}

function Kpi({
  label,
  value,
  icon,
  primary,
  accentText,
}: {
  label: string;
  value: string;
  icon: keyof typeof I;
  primary?: boolean;
  accentText?: string;
}) {
  const Icon = I[icon];
  return (
    <li className={`rounded-2xl bg-white p-5 ring-1 ring-[var(--border)] ${primary ? "shadow-sm" : ""}`}>
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--bg-mute)] text-[var(--fg-soft)]">
          <Icon size={ICON_SIZE.md} aria-hidden />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-mute)]">
          {label}
        </span>
      </div>
      <div className={`mt-3 tabular-nums ${primary ? `text-3xl font-extrabold ${accentText ?? "text-[var(--fg)]"}` : "text-2xl font-bold text-[var(--fg)]"}`}>
        {value}
      </div>
    </li>
  );
}
