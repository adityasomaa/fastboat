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
  WA_GENERAL,
} from "./site";
import { HomeFaqSection, SectionLabel, WaButton } from "./ui";

export const metadata: Metadata = {
  title: "My Day Gili | Fast Boat to Gili & Lombok from IDR 375K",
  description:
    "Book fast boat tickets from Bali to Gili Trawangan, Gili Air, Lombok & Nusa Penida. Day trips & Bali tours. 5★ rated on TripAdvisor. Trusted since 2017.",
  alternates: { canonical: "/mydaygili" },
};

export default function HomePage() {
  return (
    <>
      {/* Hero — cinematic full-bleed drone shot of the actual fast ferry */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          <Image
            src="/mydaygili/hero-home-v2.jpg"
            alt="Fast ferry cruising from Bali to the Gili Islands"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Horizontal scrim: dark on the text side, clear over the boat (client request) */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#08265a]/85 via-[#08265a]/45 to-[#08265a]/10" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08265a]/50 to-transparent sm:hidden" />
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

      {/* Trips & tours — 3 cards in a row on desktop, stacked on mobile (client rev) */}
      <section aria-label="Day trips and tours" className="bg-[var(--bg-soft)]">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3">
          {[
            {
              eyebrow: "Gili Day Trip",
              title: "Don't Have Time to Stay Overnight?",
              body: "Visit all 3 Gili Islands in one day — snorkel with turtles, see the underwater statues at Gili Meno, and relax on white-sand beaches. Hotel pickup, return ferry, and snorkeling gear all included.",
              img: "/mydaygili/gili-boats.jpg",
              alt: "Boats on clear turquoise water at the Gili Islands",
              cta: "See Gili Day Trip",
              href: "/mydaygili/day-trips#gili",
            },
            {
              eyebrow: "Nusa Penida Day Trip",
              title: "Explore Nusa Penida in a Day",
              body: "Different islands, different beaches — snorkel Nusa Penida's clear water and visit its famous cliffside viewpoints. Ask us for the full itinerary and current price.",
              img: "/mydaygili/penida-boats.jpg",
              alt: "Traditional boats on turquoise water near Nusa Penida",
              cta: "View Nusa Penida Trip",
              href: "/mydaygili/day-trips#nusa-penida",
            },
            {
              eyebrow: "Bali Tours & Transfer",
              title: "Bali Day Tours & Airport Transfer",
              body: "From cultural temples to adventure activities and traditional textile villages — we design Bali day tours around what you actually want to see. Private car transfer also available island-wide.",
              img: "/mydaygili/hero-balitours.jpg",
              alt: "Travelers at the Gates of Heaven, Lempuyang Temple",
              cta: "Explore Bali Tours",
              href: "/mydaygili/bali-tours",
            },
          ].map((c) => (
            <li key={c.eyebrow}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)]">
                <div className="relative h-44 overflow-hidden bg-[var(--bg-mute)]">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a4290]">
                    {c.eyebrow}
                  </p>
                  <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight">{c.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg-soft)]">{c.body}</p>
                  <Link
                    href={c.href}
                    className="tap-target mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#0a4290] hover:underline"
                  >
                    {c.cta}
                    <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
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
