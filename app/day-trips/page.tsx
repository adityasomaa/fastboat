import type { Metadata } from "next";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import {
  FAQ_DAYTRIPS,
  GILI_EXTRA_COSTS,
  GILI_INCLUDES,
  GILI_ITINERARY,
  GILI_TRIP_JSONLD,
} from "../site";
import { FaqSection } from "../ui";
import { BookingButton } from "../booking/BookingButton";
import { PhotoSlideshow, type Slide } from "../PhotoSlideshow";

// The client's own trip photos, in the order they numbered them in Drive.
const SNORKEL_PHOTOS: Slide[] = [
  { src: "/mydaygili/trip-slide-01.jpg", alt: "Snorkeller swimming just above a green sea turtle on the reef" },
  { src: "/mydaygili/trip-slide-02.jpg", alt: "Two snorkellers watching a turtle graze the shallow reef" },
  { src: "/mydaygili/trip-slide-03.jpg", alt: "Guest giving a thumbs-up next to a sea turtle underwater" },
  { src: "/mydaygili/trip-slide-04.jpg", alt: "Green sea turtle on the reef with a snorkeller in the water above" },
  { src: "/mydaygili/trip-slide-05.jpg", alt: "Snorkeller above The Nest underwater statues off Gili Meno" },
  { src: "/mydaygili/trip-slide-06.jpg", alt: "Group snorkelling over the circle of statues at Gili Meno" },
  { src: "/mydaygili/trip-slide-07.jpg", alt: "Snorkeller gliding above a field of staghorn coral" },
  { src: "/mydaygili/trip-slide-08.jpg", alt: "Snorkellers surrounded by a shoal of butterflyfish" },
];

// Nusa Penida section, same source and ordering.
const PENIDA_PHOTOS: Slide[] = [
  { src: "/mydaygili/penida-slide-01.jpg", alt: "Tree house perched above the Thousand Islands viewpoint, Nusa Penida" },
  { src: "/mydaygili/penida-slide-02.jpg", alt: "Cliff pathway down to a hidden turquoise bay on Nusa Penida" },
  { src: "/mydaygili/penida-slide-03.jpg", alt: "Snorkeller over the reef in the clear water off Nusa Penida" },
];

export const metadata: Metadata = {
  title: "Gili Islands & Nusa Penida Day Trip from Bali",
  description:
    "One-day snorkeling trip to Gili Trawangan, Gili Air & Gili Meno, or Nusa Penida — hotel pickup, return boat, snorkeling & photos included.",
  alternates: { canonical: "/day-trips" },
};

export default function DayTripsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GILI_TRIP_JSONLD) }}
      />

      {/* Hero — title left, image kept clear on the right (client request) */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <div className="relative min-h-[400px] w-full overflow-hidden sm:min-h-[440px]">
          <Image
            src="/mydaygili/hero-daytrips.jpg"
            alt="Snorkellers swimming among tropical reef fish on a day trip"
            fill
            sizes="100vw"
            preload
            className="object-cover object-[center_55%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#08265a]/85 via-[#08265a]/45 to-[#08265a]/10" />
          <div className="absolute inset-0 flex items-center px-4 sm:px-6">
            <div className="mx-auto w-full max-w-6xl">
              <div className="max-w-xl text-white">
                <h1 id="hero-title" className="text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
                  Day Trips to<br />Gili Islands &amp;<br className="sm:hidden" /> Nusa Penida
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                  No need to book a hotel — see the best of Gili or Nusa Penida and be
                  back at your villa by evening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gili Day Trip — white background */}
      <section id="gili" aria-labelledby="gili-title" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="gili-title" className="inline-block text-3xl font-bold tracking-tight text-[#0a4290] sm:text-4xl">
            Gili Day Trip — 3 Islands, 1 Day
            <span aria-hidden className="mt-2 block h-1 w-24 rounded bg-[#0a4290]" />
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Timeline + CTA below (client layout) */}
            <div>
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
              <div className="mt-8">
                <BookingButton form="GILI_TRIP">Book Gili Day Trip</BookingButton>
              </div>
            </div>

            {/* Includes / Not included cards */}
            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-[#eefaf2] p-6 ring-1 ring-emerald-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">Includes</h3>
                <ul className="mt-3 space-y-2.5">
                  {GILI_INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[15px]">
                      <I.checkCircle size={ICON_SIZE.md} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#fdf1f0] p-6 ring-1 ring-rose-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700">Not Included</h3>
                <ul className="mt-3 space-y-2.5">
                  {GILI_EXTRA_COSTS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[15px] text-[var(--fg-soft)]">
                      <I.plus size={ICON_SIZE.md} className="mt-0.5 shrink-0 text-rose-500" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Guest photos — the client's own, which sell the trip better than
              any stock shot: real people, real reef, recognisable sites. */}
          <div className="mt-14">
            <h3 className="text-xl font-bold tracking-tight text-[#0a4290]">
              Photos from our trips
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm text-[var(--fg-soft)]">
              Taken by our guests and guides on the Gili snorkeling route — including
              The Nest, the underwater statues off Gili Meno.
            </p>
            <div className="mt-6">
              <PhotoSlideshow slides={SNORKEL_PHOTOS} label="Photos from our Gili snorkeling trips" />
            </div>
          </div>
        </div>
      </section>

      {/* Nusa Penida — distinct background colour (client request) */}
      <section id="nusa-penida" aria-labelledby="penida-title" className="scroll-mt-24 bg-[#eef4fc]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <PhotoSlideshow slides={PENIDA_PHOTOS} label="Nusa Penida day trip photos" />
          <div>
            <h2 id="penida-title" className="inline-block text-3xl font-bold tracking-tight text-[#0a4290] sm:text-4xl">
              Nusa Penida Day Trip
              <span aria-hidden className="mt-2 block h-1 w-24 rounded bg-[#0a4290]" />
            </h2>
            <p className="mt-4 text-[var(--fg-soft)]">
              Cross to a different island with a completely different landscape — Nusa
              Penida's dramatic cliffs and clear-water snorkeling spots. Itinerary and
              pricing depend on which beaches and viewpoints you want to visit.
            </p>
            <div className="mt-6">
              <BookingButton form="PENIDA">Book Nusa Penida Trip</BookingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Mini FAQ — full left (client) */}
      <FaqSection title="Mini FAQ" faqs={FAQ_DAYTRIPS} wide />
    </>
  );
}
