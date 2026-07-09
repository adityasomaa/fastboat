import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { formatIDR } from "@/lib/format";
import {
  BUSINESS,
  FAQ_HOME,
  OPERATORS,
  REVIEWS,
  TRIPADVISOR_URL,
  WA_BALI_TOUR,
  WA_GENERAL,
  WA_GILI_TRIP,
  WA_PENIDA,
} from "./site";
import { HomeFaqSection, SectionLabel, WaButton } from "./ui";

export const metadata: Metadata = {
  title: "My Day Gili | Fast Boat to Gili & Lombok from IDR 375K",
  description:
    "Book fast boat tickets from Bali to Gili Trawangan, Gili Air, Lombok & Nusa Penida. Day trips & Bali tours. 5★ rated on TripAdvisor. Trusted since 2017.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero — cinematic full-bleed drone shot of the actual fast ferry */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          <Image
            src="/mydaygili/hero-home.jpg"
            alt="Fast ferry cruising from Bali to the Gili Islands"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#08265a]/70 via-[#08265a]/50 to-[#08265a]/80" />
          <div className="absolute inset-0 flex items-center px-4 sm:px-6">
            <div className="mx-auto w-full max-w-6xl">
              <div className="max-w-2xl text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
                  <I.checkCircle size={ICON_SIZE.sm} className="text-[#9cc4ff]" aria-hidden />
                  Trusted by travelers since {BUSINESS.since}
                </span>
                <p className="mt-4 font-script text-3xl text-[#9cc4ff] sm:text-4xl">
                  Bali · Gili Islands · Lombok
                </p>
                <h1 id="hero-title" className="mt-2 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                  Fast Boat to Gili &amp; Lombok,{" "}
                  <span className="text-[#8ab9ff]">starting from IDR 375,000</span>
                </h1>
                <p className="mt-5 max-w-lg text-base text-white/90 sm:text-lg">
                  Comfortable, safe crossings on real fast ferries — not small
                  fastboats. Book your ticket, day trip, or Bali tour in one place.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/mydaygili/fast-boat-tickets"
                    className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-[#0a4290] shadow-lg hover:bg-[#e8effc]"
                  >
                    Check Schedule &amp; Price
                    <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                  </Link>
                  <WaButton href={WA_GENERAL}>Chat on WhatsApp</WaButton>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Fast boat teaser */}
      <section aria-labelledby="fastboat-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionLabel>Fast boat tickets</SectionLabel>
            <h2 id="fastboat-title" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Bali to Gili Islands &amp; Lombok — 4 trusted operators
            </h2>
            <p className="mt-4 text-[var(--fg-soft)]">
              Cross to Gili Trawangan, Gili Air, Gili Meno, or Lombok by fast ferry —
              large, stable vessels with onboard crew, not small speedboats. Tickets
              start from IDR 375,000 one way, with daily departures from Padang Bai.
            </p>
            <Link
              href="/mydaygili/fast-boat-tickets"
              className="tap-target mt-6 inline-flex items-center gap-2 rounded-full bg-[#08265a] px-6 text-sm font-bold text-white hover:opacity-90"
            >
              See Full Schedule &amp; Book
              <I.arrowRight size={ICON_SIZE.md} aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
            {OPERATORS.map((o) => (
              <li key={o.slug}>
                <Link
                  href="/mydaygili/fast-boat-tickets"
                  className="tap-target flex items-center justify-between gap-3 px-5 py-3 hover:bg-[var(--bg-soft)]"
                >
                  <span>
                    <span className="block font-bold">{o.name}</span>
                    <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-[var(--fg-mute)]">
                      <I.clock size={ICON_SIZE.sm} aria-hidden />
                      {o.times.length > 2 ? `${o.times.length}x daily` : o.times.join(" & ")}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[11px] uppercase tracking-widest text-[var(--fg-mute)]">from</span>
                    <span className="font-bold tabular-nums text-[#0a4290]">{formatIDR(o.priceIdr)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Day trip teasers */}
      <section aria-label="Day trips" className="bg-[var(--bg-soft)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
          {/* Gili */}
          <article className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)]">
            <div className="relative h-52 overflow-hidden bg-[var(--bg-mute)]">
              <Image
                src="/mydaygili/gili-boats.jpg"
                alt="Boats on clear turquoise water at the islands"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Don't have time to stay overnight? Do a Gili Day Trip
              </h2>
              <p className="mt-3 flex-1 text-[var(--fg-soft)]">
                Visit all 3 Gili Islands in one day — snorkel with turtles, see the
                underwater statues at Gili Meno, and relax on white-sand beaches. Hotel
                pickup, return ferry, and snorkeling gear all included.
              </p>
              <div className="mt-5">
                <Link
                  href="/mydaygili/day-trips#gili"
                  className="tap-target inline-flex items-center gap-2 rounded-full bg-[#0a4290] px-6 text-sm font-bold text-white hover:bg-[#083572]"
                >
                  See Gili Day Trip Details
                  <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                </Link>
              </div>
            </div>
          </article>

          {/* Nusa Penida */}
          <article className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)]">
            <div className="relative h-52 overflow-hidden bg-[var(--bg-mute)]">
              <Image
                src="/mydaygili/penida-boats.jpg"
                alt="Traditional boats on turquoise water near Nusa Penida"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl font-bold tracking-tight">Explore Nusa Penida in a day</h2>
              <p className="mt-3 flex-1 text-[var(--fg-soft)]">
                Different islands, different beaches — snorkel Nusa Penida's clear
                water and visit its famous cliffside viewpoints. Ask us for the full
                itinerary and current price.
              </p>
              <div className="mt-5">
                <WaButton href={WA_PENIDA} variant="navy">
                  Ask About Nusa Penida Trip
                </WaButton>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Bali tours teaser */}
      <section aria-labelledby="tours-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-8 rounded-3xl bg-[#08265a] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionLabel>Beyond the islands</SectionLabel>
            <h2 id="tours-title" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Bali day tours &amp; airport transfer
            </h2>
            <p className="mt-4 max-w-xl text-white/80">
              From cultural temples to adventure activities and traditional textile
              villages — we design Bali day tours around what you actually want to
              see. Private car transfer also available island-wide.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/mydaygili/bali-tours"
              className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-[#0a4290] px-6 text-sm font-bold text-white hover:bg-[#083572]"
            >
              Explore Bali Tour Ideas
              <I.arrowRight size={ICON_SIZE.md} aria-hidden />
            </Link>
            <WaButton href={WA_BALI_TOUR}>Tell Us Your Idea</WaButton>
          </div>
        </div>
      </section>

      {/* Reviews — editorial testimonial section (warm cream, per client) */}
      <section aria-labelledby="reviews-title" className="bg-[#f6f1e7]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e0673f]">
            What travellers say
          </p>
          <h2 id="reviews-title" className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            <span className="font-bold text-[#0a4290]">{BUSINESS.reviewCount} Reviews</span>
            <span className="text-[#0a4290]"> · </span>
            <span className="italic text-[#2a8f80]">All Five Stars</span>
          </h2>
          <p className="mt-4 max-w-xl text-[var(--fg-soft)]">
            Real words from real travellers on TripAdvisor. We're proud to be ranked{" "}
            {BUSINESS.rankLabel.replace("#2 of 31 Things to Do in ", "#2 in ")}.
          </p>

          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <li key={r.name}>
                <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <I.quote size={28} className="text-[#cdd9cf]" aria-hidden />
                  <div className="mt-2 flex gap-0.5 text-[#e0a63d]" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <I.star key={i} size={ICON_SIZE.md} className="fill-[#e0a63d]" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--fg-soft)]">
                    {r.body}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0a4290] text-xs font-bold text-white">
                      {r.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#0b1d39]">{r.name}</span>
                      <span className="block text-xs text-[var(--fg-mute)]">
                        {[r.location, r.date].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center gap-2 rounded-full bg-[#25a366] px-6 text-sm font-bold text-white shadow-sm hover:brightness-95"
            >
              <I.star size={ICON_SIZE.md} className="fill-white" aria-hidden />
              Read All {BUSINESS.reviewCount} Reviews on TripAdvisor
              <I.arrowUpRight size={ICON_SIZE.md} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <HomeFaqSection faqs={FAQ_HOME} />
    </>
  );
}
