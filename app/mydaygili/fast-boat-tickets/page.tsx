import type { Metadata } from "next";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { formatIDR } from "@/lib/format";
import {
  FAQ_FASTBOAT,
  OPERATOR_OFFERS_JSONLD,
  OPERATORS,
  ROUTES_COVERED,
  WA_COMBINE,
  waBookOperator,
} from "../site";
import { FaqSection, PriceNote, SectionLabel, WaButton } from "../ui";

export const metadata: Metadata = {
  title: "Fast Boat Bali to Gili & Lombok | Schedule & Price 2026",
  description:
    "Compare 4 fast ferry operators from Padang Bai to Gili Trawangan, Gili Air, Gili Meno & Lombok. Prices from IDR 375K. Instant booking via WhatsApp.",
};

const TRAVEL_INFO = [
  { icon: "clock",    text: "Check-in: arrive at least 60 minutes before departure" },
  { icon: "users",    text: "Infants: under 2 years old travel free on a parent's lap" },
  { icon: "ticket",   text: "Luggage: 20kg allowance per passenger; surfboard fee IDR 50,000/piece, payable at check-in" },
  { icon: "pin",      text: "Harbour tax: IDR 10,000–20,000 cash per person, paid at the port for routes to/from Padang Bai, Serangan, Gili Trawangan, Gili Meno, Gili Air, Bangsal, and Senggigi" },
  { icon: "anchor",   text: "Multiple stops: Bali–Lombok routes stop at Gili Trawangan, Gili Air, and Bangsal Port (Lombok) — about 5–10 minutes per stop" },
  { icon: "qr",       text: "E-ticket boarding with instant confirmation after booking" },
  { icon: "shield",   text: "Cancellation: possible on most fares (terms vary by operator — ask us before booking)" },
  { icon: "waves",    text: "Schedules may shift due to weather/sea conditions; this is standard across all operators on the Padang Bai–Gili–Lombok route" },
] as const;

export default function FastBoatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OPERATOR_OFFERS_JSONLD) }}
      />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <div className="relative h-[46vh] min-h-[380px] w-full overflow-hidden">
          {/* ⚠ Placeholder — client photo: ferry cabin interior / departing ferry */}
          <Image
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200"
            alt="Fast ferry on clear water"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b1d39]/60 via-[#0b1d39]/35 to-[#0b1d39]/70" />
          <div className="absolute inset-0 flex items-end px-4 pb-10 sm:px-6">
            <div className="mx-auto w-full max-w-6xl text-white">
              <SectionLabel>Schedule &amp; price 2026</SectionLabel>
              <h1 id="hero-title" className="mt-1 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Fast Boat Tickets — Bali to Gili Islands &amp; Lombok
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Direct-answer intro (GEO/SEO) */}
      <section className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <p className="text-lg leading-relaxed text-[var(--fg-soft)]">
          Crossing to the Gili Islands is easy with our fast ferry partners — large,
          stable vessels (not small fastboats), departing daily from Padang Bai
          Harbour. <strong className="text-[#0b1d39]">Tickets start from IDR 375,000 one way.</strong>{" "}
          All 4 operators we offer are classified as fast ferries rather than
          fastboats because of their larger size, meaning a smoother and safer
          crossing.
        </p>
      </section>

      {/* Comparison table */}
      <section aria-labelledby="table-title" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="table-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Routes from Padang Bai to Gili Trawangan
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
          <table className="min-w-full divide-y divide-[var(--border)] text-sm">
            <thead className="bg-[var(--bg-soft)] text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--fg-mute)]">
              <tr>
                <th scope="col" className="px-5 py-3">Operator</th>
                <th scope="col" className="px-5 py-3">Departure time</th>
                <th scope="col" className="px-5 py-3 text-right">Price (one way)</th>
                <th scope="col" className="px-5 py-3">Notes</th>
                <th scope="col" className="px-5 py-3"><span className="sr-only">Book</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {OPERATORS.map((o) => (
                <tr key={o.slug} className="hover:bg-[var(--bg-soft)]">
                  <td className="px-5 py-4 font-bold">{o.name}</td>
                  <td className="px-5 py-4 tabular-nums">{o.times.join(" / ")}</td>
                  <td className="px-5 py-4 text-right font-bold tabular-nums text-orange-600">
                    {formatIDR(o.priceIdr)}
                  </td>
                  <td className="px-5 py-4 text-[var(--fg-soft)]">{o.note}</td>
                  <td className="px-5 py-4">
                    {/* Book → WhatsApp template per operator (client booking flow) */}
                    <a
                      href={waBookOperator(o.name)}
                      className="tap-target inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 text-xs font-bold text-white hover:brightness-95"
                    >
                      <I.message size={ICON_SIZE.sm} aria-hidden />
                      Book
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PriceNote />
        <div className="mt-6">
          <WaButton href={waBookOperator("a fast boat")}>
            Check Today's Price &amp; Book on WhatsApp
          </WaButton>
        </div>
      </section>

      {/* Booking & travel info */}
      <section aria-labelledby="info-title" className="bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="info-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
            What you need to know before you travel
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {TRAVEL_INFO.map(({ icon, text }) => {
              const Icon = I[icon];
              return (
                <li key={text} className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-[var(--border)]">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600">
                    <Icon size={ICON_SIZE.md} aria-hidden />
                  </span>
                  <p className="text-sm leading-relaxed text-[var(--fg-soft)]">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Routes we cover */}
      <section aria-labelledby="routes-title" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="routes-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          All the crossings we can book for you
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTES_COVERED.map((r) => (
            <li
              key={r}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold ring-1 ring-[var(--border)]"
            >
              <I.ship size={ICON_SIZE.md} className="shrink-0 text-orange-500" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <WaButton href={WA_COMBINE} variant="navy">
            Ask Us to Combine Routes — e.g. Gili + Nusa Penida
          </WaButton>
        </div>
      </section>

      <FaqSection title="Fast boat FAQ" faqs={FAQ_FASTBOAT} />
    </>
  );
}
