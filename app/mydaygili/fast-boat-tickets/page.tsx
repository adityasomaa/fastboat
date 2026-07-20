import type { Metadata } from "next";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { formatIDR } from "@/lib/format";
import {
  FAQ_FASTBOAT,
  OPERATOR_OFFERS_JSONLD,
  OPERATORS,
  ROUTE_GROUPS,
  TRAVEL_INFO,
  waBookOperator,
} from "../site";
import { FaqSection, PriceNote, WaButton } from "../ui";

export const metadata: Metadata = {
  title: "Fast Boat Bali to Gili & Lombok | Schedule & Price 2026",
  description:
    "Compare 4 fast ferry operators from Padang Bai to Gili Trawangan, Gili Air, Gili Meno & Lombok. Prices from IDR 375K. Instant booking via WhatsApp.",
  alternates: { canonical: "/mydaygili/fast-boat-tickets" },
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

      {/* Routes we cover — grouped, both-directions overview (client's full list) */}
      <section aria-labelledby="routes-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="routes-title" className="text-center text-2xl font-bold tracking-tight text-[#0a4290] sm:text-3xl">
            All the Crossings We Can Book For You
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[var(--fg-soft)]">
            <span className="inline-flex items-center gap-1 font-semibold text-[#0a4290]">
              <I.arrowUpDown size={14} className="rotate-90" aria-hidden />
              both directions
            </span>{" "}
            — every route can be booked one way or round trip, outbound or return.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {ROUTE_GROUPS.map((g) => {
              const Icon = I[g.icon];
              return (
                <div key={g.title} className="flex flex-col rounded-2xl bg-[var(--bg-soft)] p-6 ring-1 ring-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#0a4290] ring-1 ring-[#c3d5f2]">
                      <Icon size={ICON_SIZE.lg} aria-hidden />
                    </span>
                    <h3 className="text-base font-bold leading-snug text-[#0a4290]">{g.title}</h3>
                  </div>
                  <ul className="mt-4 flex-1 space-y-2 border-t border-[var(--border)] pt-4">
                    {g.routes.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm font-semibold text-[#08265a]">
                        <I.chevronRight size={14} className="mt-0.5 shrink-0 text-[#0a4290]" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-[var(--fg-mute)]">{g.note}</p>
                </div>
              );
            })}
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
