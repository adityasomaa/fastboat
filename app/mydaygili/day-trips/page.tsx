import type { Metadata } from "next";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import {
  FAQ_DAYTRIPS,
  GILI_EXTRA_COSTS,
  GILI_INCLUDES,
  GILI_ITINERARY,
  GILI_TRIP_JSONLD,
  WA_GILI_TRIP,
  WA_PENIDA,
} from "../site";
import { FaqSection, SectionLabel, WaButton } from "../ui";

export const metadata: Metadata = {
  title: "Gili Islands & Nusa Penida Day Trip from Bali",
  description:
    "One-day snorkeling trip to Gili Trawangan, Gili Air & Gili Meno, or Nusa Penida — hotel pickup, return boat, snorkeling & photos included.",
};

export default function DayTripsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GILI_TRIP_JSONLD) }}
      />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <div className="relative h-[46vh] min-h-[380px] w-full overflow-hidden">
          <Image
            src="/mydaygili/hero-daytrips.jpg"
            alt="Turquoise water and boats at the beach"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#08265a]/60 via-[#08265a]/35 to-[#08265a]/70" />
          <div className="absolute inset-0 flex items-end px-4 pb-10 sm:px-6">
            <div className="mx-auto w-full max-w-6xl text-white">
              <SectionLabel tone="light">Back at your villa by evening</SectionLabel>
              <h1 id="hero-title" className="mt-1 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Day Trips to Gili Islands &amp; Nusa Penida
              </h1>
              <p className="mt-3 max-w-lg text-white/90">
                No need to book a hotel — see the best of Gili or Nusa Penida and be
                back at your villa by evening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gili Day Trip */}
      <section id="gili" aria-labelledby="gili-title" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
        <SectionLabel>Gili day trip</SectionLabel>
        <h2 id="gili-title" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Gili Day Trip — 3 islands, 1 day
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Timeline */}
          <ol className="relative space-y-0 border-l-2 border-[#c3d5f2] pl-6">
            {GILI_ITINERARY.map((step, i) => (
              <li key={step.time} className="relative pb-7 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full ring-4 ring-white ${
                    i === 0 || i === GILI_ITINERARY.length - 1 ? "bg-[#0a4290]" : "bg-[#6f9ce0]"
                  }`}
                />
                <div className="text-sm font-bold tabular-nums text-[#0a4290]">{step.time}</div>
                <p className="mt-1 text-[15px] leading-relaxed text-[var(--fg-soft)]">{step.activity}</p>
              </li>
            ))}
          </ol>

          {/* Includes / extra costs */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--fg-mute)]">Includes</h3>
              <ul className="mt-3 space-y-2.5">
                {GILI_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px]">
                    <I.checkCircle size={ICON_SIZE.md} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--bg-soft)] p-6 ring-1 ring-[var(--border)]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--fg-mute)]">
                Additional cost (not included)
              </h3>
              <ul className="mt-3 space-y-2.5">
                {GILI_EXTRA_COSTS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] text-[var(--fg-soft)]">
                    <I.plus size={ICON_SIZE.md} className="mt-0.5 shrink-0 text-[var(--fg-mute)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <WaButton href={WA_GILI_TRIP}>Book Gili Day Trip on WhatsApp</WaButton>
          </div>
        </div>
      </section>

      {/* Nusa Penida */}
      <section id="nusa-penida" aria-labelledby="penida-title" className="scroll-mt-24 bg-[var(--bg-soft)]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--bg-mute)]">
            <Image
              src="/mydaygili/penida-boats.jpg"
              alt="Traditional boats on clear turquoise water near Nusa Penida"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionLabel>Different island, different landscape</SectionLabel>
            <h2 id="penida-title" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Nusa Penida Day Trip
            </h2>
            <p className="mt-4 text-[var(--fg-soft)]">
              Cross to a different island with a completely different landscape — Nusa
              Penida's dramatic cliffs and clear-water snorkeling spots. Itinerary and
              pricing depend on which beaches and viewpoints you want to visit.
            </p>
            <div className="mt-6">
              <WaButton href={WA_PENIDA}>Get the Full Nusa Penida Itinerary</WaButton>
            </div>
          </div>
        </div>
      </section>

      <FaqSection title="Day trip FAQ" faqs={FAQ_DAYTRIPS} />
    </>
  );
}
