import Link from "next/link";
import { getRoutes, getSchedules } from "@/lib/data/queries";
import { I, ICON_SIZE } from "@/components/Icon";
import { BookingFlow } from "../../design-4/booking/booking-flow";

type SP = Promise<{ route?: string; date?: string; adults?: string; children?: string; failed?: string }>;

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#ff6b3d",
  ["--primary" as string]: "#1a1c2c",
  ["--primary-fg" as string]: "#ffffff",
};

export default async function BookingPage(props: { searchParams: SP }) {
  const sp = await props.searchParams;
  const routes = await getRoutes();
  const selectedRouteId = sp.route ?? routes[0]?.id ?? "";
  const schedules = await getSchedules(selectedRouteId);

  return (
    <main className="min-h-screen bg-[var(--bg-soft)]" style={ACCENT}>
      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/design-5" className="tap-target inline-flex items-center gap-2 px-1 text-xl font-extrabold">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff6b3d] text-white">
              <I.ship size={ICON_SIZE.md} aria-hidden />
            </span>
            Travo
          </Link>
          <Link
            href="/design-5"
            className="tap-target inline-flex items-center gap-1 rounded-md px-3 text-sm font-medium text-[var(--fg-soft)] hover:text-[var(--fg)]"
          >
            <I.chevronRight size={ICON_SIZE.sm} className="rotate-180" aria-hidden />
            Back
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <ol aria-label="Booking steps" className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-widest text-[var(--fg-mute)]">
          {["Trip", "Departure", "Passenger", "Pay"].map((step, i) => (
            <li key={step} className="inline-flex items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] tabular-nums ${
                  i < 3 ? "bg-[#ff6b3d] text-white" : "bg-white text-[var(--fg-mute)] ring-1 ring-[var(--border-strong)]"
                }`}
              >
                {i + 1}
              </span>
              <span className={i < 3 ? "text-[var(--fg)]" : ""}>{step.toUpperCase()}</span>
              {i < 3 && <I.chevronRight size={14} aria-hidden className="text-[var(--fg-mute)]" />}
            </li>
          ))}
        </ol>

        <p className="font-script mt-6 text-3xl text-[#ff6b3d]">Almost there</p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Complete your booking</h1>
        <p className="mt-2 text-[var(--fg-soft)]">
          Pick a departure, review your details, then proceed to secure payment.
        </p>

        {sp.failed === "1" && (
          <div role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            <I.shield size={ICON_SIZE.md} className="mt-0.5" aria-hidden />
            <div>
              <div className="font-semibold">Payment didn't go through.</div>
              <div className="text-rose-700">Your previous payment failed or was cancelled. You can try again below.</div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <BookingFlow
            routes={routes}
            schedules={schedules}
            initialRouteId={selectedRouteId}
            initialDate={sp.date}
            initialAdults={Number(sp.adults ?? 2)}
            initialChildren={Number(sp.children ?? 0)}
            variant="travo"
          />
        </div>
      </div>
    </main>
  );
}
