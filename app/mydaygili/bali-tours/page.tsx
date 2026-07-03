import type { Metadata } from "next";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { BALI_TOUR_JSONLD, FAQ_BALITOURS, WA_BALI_TOUR, WA_TRANSFER } from "../site";
import { FaqSection, SectionLabel, WaButton } from "../ui";

export const metadata: Metadata = {
  title: "Bali Day Tours — Adventure, Culture & Hidden Spots",
  description:
    "Custom Bali day tours and private transfer — adventure, culture, textile villages & unique destinations. Tell us your idea, we'll build the itinerary.",
};

const CATEGORIES = [
  {
    icon: "waves",
    title: "Adventure",
    body: "Waterfalls, trekking, rafting, off-road.",
  },
  {
    icon: "anchor",
    title: "Culture",
    body: "Temples, rice terraces, traditional villages, ceremonies.",
  },
  {
    icon: "ticket",
    title: "Textile & Craft",
    body: "Ikat and batik weaving villages, local artisan visits.",
  },
  {
    icon: "sun",
    title: "Unique / Hidden Spots",
    body: "Off-the-beaten-path places most tourists never see.",
  },
] as const;

export default function BaliToursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BALI_TOUR_JSONLD) }}
      />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <div className="relative h-[46vh] min-h-[380px] w-full overflow-hidden">
          {/* ⚠ Placeholder — client photo: rice terraces / temple */}
          <Image
            src="https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=2200"
            alt="Bali landscape at golden hour"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b1d39]/60 via-[#0b1d39]/35 to-[#0b1d39]/70" />
          <div className="absolute inset-0 flex items-end px-4 pb-10 sm:px-6">
            <div className="mx-auto w-full max-w-6xl text-white">
              <SectionLabel>Beyond the usual tourist route</SectionLabel>
              <h1 id="hero-title" className="mt-1 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Bali Day Tours &amp; Private Transfer
              </h1>
              <p className="mt-3 max-w-lg text-white/90">
                We build Bali day tours around what actually interests you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section aria-labelledby="cat-title" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="cat-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pick a theme, or mix a few
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ icon, title, body }) => {
            const Icon = I[icon];
            return (
              <li key={title} className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-orange-600">
                  <Icon size={ICON_SIZE.lg} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-1.5 text-sm text-[var(--fg-soft)]">{body}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[var(--fg-soft)]">
          Don't see what you're looking for? Tell us your idea and we'll design a
          private itinerary around it.
        </p>
        <div className="mt-4">
          <WaButton href={WA_BALI_TOUR}>Tell Us Your Idea on WhatsApp</WaButton>
        </div>
      </section>

      {/* Transfer */}
      <section aria-labelledby="transfer-title" className="bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid items-center gap-8 rounded-3xl bg-[#0b1d39] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_auto]">
            <div>
              <h2 id="transfer-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Private transfer, island-wide
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Airport pickup/drop-off, hotel-to-hotel transfer, or point-to-point
                rides anywhere in Bali — private car with driver.
              </p>
            </div>
            <WaButton href={WA_TRANSFER}>Ask for a Transfer Quote</WaButton>
          </div>
        </div>
      </section>

      <FaqSection title="Bali tour FAQ" faqs={FAQ_BALITOURS} />
    </>
  );
}
