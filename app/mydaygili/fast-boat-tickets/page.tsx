import type { Metadata } from "next";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { formatIDR } from "@/lib/format";
import {
  ADDON_TICKETS,
  FAQ_FASTBOAT,
  MAIN_CROSSINGS,
  OPERATOR_OFFERS_JSONLD,
  OPERATORS,
  TRAVEL_INFO,
  waBookOperator,
} from "../site";
import { FaqSection, PriceNote, WaButton } from "../ui";

export const metadata: Metadata = {
  title: "Fast Boat Bali to Gili & Lombok | Schedule & Price 2026",
  description:
    "Compare 4 fast ferry operators from Padang Bai to Gili Trawangan, Gili Air, Gili Meno & Lombok. Prices from IDR 375K. Instant booking via WhatsApp.",
};

export default function FastBoatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OPERATOR_OFFERS_JSONLD) }}
      />

      {/* Hero — boat kept clear of the text (client request) */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <div className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[460px]">
          <Image
            src="/mydaygili/hero-fastboat-v2.jpg"
            alt="Fast ferry cruising toward the Gili Islands"
            fill
            sizes="100vw"
            priority
            className="object-cover object-[25%_70%]"
          />
          {/* Text sits right; boat stays visible on the left */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-l from-[#08265a]/85 via-[#08265a]/45 to-[#08265a]/10" />
          <div className="absolute inset-0 flex items-center px-4 sm:px-6">
            <div className="mx-auto w-full max-w-6xl">
              <div className="ml-auto max-w-xl text-white sm:text-left">
                <h1 id="hero-title" className="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
                  Fast Boat Tickets —<br />Bali to Gili Islands &amp; Lombok
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
                  Crossing to the Gili Islands is easy with our fast ferry partners —
                  large, stable vessels (not small fastboats), departing daily from
                  Padang Bai Harbour. Tickets start from IDR 375,000 one way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table — card with blue header row (client layout) */}
      <section aria-labelledby="table-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="table-title" className="text-center text-2xl font-bold tracking-tight text-[#0a4290] sm:text-3xl">
            Routes from Padang Bai to Gili Trawangan
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl shadow-sm ring-1 ring-[var(--border)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[#0a4290] text-left text-white">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Operator</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Departure Time</th>
                    <th scope="col" className="px-5 py-3.5 text-right font-semibold">Price (One Way)</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-white">
                  {OPERATORS.map((o) => (
                    <tr key={o.slug} className="hover:bg-[var(--bg-soft)]">
                      <td className="px-5 py-4 font-bold">{o.name}</td>
                      <td className="px-5 py-4 tabular-nums">{o.times.join(" / ")}</td>
                      <td className="px-5 py-4 text-right font-bold tabular-nums text-[#0a4290]">
                        {formatIDR(o.priceIdr)}
                      </td>
                      <td className="px-5 py-4 text-[var(--fg-soft)]">{o.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <PriceNote />
          <div className="mt-6 text-center">
            <WaButton href={waBookOperator("a fast boat")}>Book on WhatsApp</WaButton>
          </div>
        </div>
      </section>

      {/* Booking & travel info — compact icon grid (distinct background) */}
      <section aria-labelledby="info-title" className="bg-[#eef4fc]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="info-title" className="text-center text-2xl font-bold tracking-tight text-[#0a4290] sm:text-3xl">
            What You Need to Know Before You Travel
          </h2>
          <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRAVEL_INFO.map(({ icon, title, body }) => {
              const Icon = I[icon];
              return (
                <li key={title} className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#0a4290] ring-1 ring-[#c3d5f2]">
                    <Icon size={ICON_SIZE.md} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--fg-soft)]">{body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Routes we cover — crossing flow + add-on card (client layout) */}
      <section aria-labelledby="routes-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="routes-title" className="text-center text-2xl font-bold tracking-tight text-[#0a4290] sm:text-3xl">
            All the Crossings We Can Book For You
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--fg-soft)]">
            Every route runs <strong className="text-[#0a4290]">both directions</strong> — we
            book your outbound (Padang Bai → Gili) and your return (Gili → Padang Bai).
          </p>
          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.6fr_1fr]">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-2xl bg-[var(--bg-soft)] p-6 ring-1 ring-[var(--border)] sm:grid-cols-4">
              {MAIN_CROSSINGS.map((r) => (
                <li key={r.to} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#0a4290] ring-1 ring-[#c3d5f2]">
                    <I.ship size={ICON_SIZE.lg} aria-hidden />
                  </span>
                  <span className="flex flex-col items-center text-xs font-bold leading-snug">
                    <span>{r.from}</span>
                    <span className="my-1 inline-flex items-center gap-1 rounded-full bg-[#e8effc] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#0a4290]">
                      <I.arrowUpDown size={11} aria-hidden />
                      round trip
                    </span>
                    <span>{r.to}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-center rounded-2xl bg-[#eef4fc] p-6 ring-1 ring-[#c3d5f2]">
              <div className="inline-flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a4290] ring-1 ring-[#c3d5f2]">
                  <I.ticket size={ICON_SIZE.md} aria-hidden />
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0a4290]">
                  Add-on Tickets
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5">
                {ADDON_TICKETS.map((a) => (
                  <li key={a} className="text-sm font-semibold text-[#08265a]">{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mini FAQ — full left (client), distinct background */}
      <div className="bg-[var(--bg-soft)]">
        <FaqSection title="Mini FAQ" faqs={FAQ_FASTBOAT} wide />
      </div>
    </>
  );
}
