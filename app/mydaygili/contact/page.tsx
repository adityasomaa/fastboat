import type { Metadata } from "next";
import { I, ICON_SIZE } from "@/components/Icon";
import {
  BUSINESS,
  FAQ_CONTACT,
  TRIPADVISOR_URL,
  WA_GENERAL,
  WA_NUMBER,
} from "../site";
import { FaqSection, SectionLabel, WaButton } from "../ui";

export const metadata: Metadata = {
  title: "Contact My Day Gili — WhatsApp Booking & Questions",
  description:
    "Chat with My Day Gili on WhatsApp for fast boat tickets, Gili & Nusa Penida day trips, and Bali tours. Based in Klungkung, Bali. Fast replies.",
};

const STEPS = [
  {
    title: "Message us on WhatsApp",
    body: "Tell us your travel date, pickup location, and destination (Gili T, Gili Air, Gili Meno, Lombok, or Nusa Penida).",
  },
  {
    title: "We confirm your seat",
    body: "We'll confirm your boat, departure time, and pickup details within a few hours.",
  },
  {
    title: "Pay & travel",
    body: "Payment is made on the day of departure at the harbour. Show your e-ticket and board — that's it.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionLabel>We reply fast</SectionLabel>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-5xl">
            Contact My Day Gili
          </h1>
          <p className="mt-3 max-w-xl text-[var(--fg-soft)]">
            WhatsApp is the fastest way to reach us — for bookings, schedules,
            itineraries, or anything else about your trip.
          </p>
          <div className="mt-6">
            <WaButton href={WA_GENERAL}>Chat on WhatsApp — +{WA_NUMBER}</WaButton>
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section aria-labelledby="how-title" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="how-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          How booking works
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0a4290] text-sm font-bold tabular-nums text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-soft)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Info cards */}
      <section aria-label="Business information" className="bg-[var(--bg-soft)]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:grid-cols-3 sm:px-6">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8effc] text-[#0a4290]">
              <I.pin size={ICON_SIZE.lg} aria-hidden />
            </span>
            <h2 className="mt-4 text-base font-bold">Where we are</h2>
            <p className="mt-1.5 text-sm text-[var(--fg-soft)]">{BUSINESS.location}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
              <I.message size={ICON_SIZE.lg} aria-hidden />
            </span>
            <h2 className="mt-4 text-base font-bold">WhatsApp</h2>
            <p className="mt-1.5 text-sm tabular-nums text-[var(--fg-soft)]">+{WA_NUMBER}</p>
            <p className="mt-1 text-xs text-[var(--fg-mute)]">Real-time booking support, every day</p>
          </div>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <I.star size={ICON_SIZE.lg} className="fill-emerald-600" aria-hidden />
            </span>
            <h2 className="mt-4 text-base font-bold">TripAdvisor</h2>
            <p className="mt-1.5 text-sm text-[var(--fg-soft)]">
              {BUSINESS.rating} / 5 · {BUSINESS.reviewCount} reviews · {BUSINESS.rankLabel}
            </p>
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#0a4290] underline underline-offset-2"
            >
              Read reviews
              <I.arrowUpRight size={ICON_SIZE.sm} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <FaqSection title="Common questions" faqs={FAQ_CONTACT} />
    </>
  );
}
