import type { Metadata } from "next";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { BALI_TOUR_JSONLD, FAQ_BALITOURS } from "../site";
import { FaqSection, SectionLabel } from "../ui";
import { BookingButton } from "../booking/BookingButton";
import { PhotoSlideshow, type Slide } from "../PhotoSlideshow";

// The client's tour photos, in the order they numbered them in Drive. The
// swing shot is theirs from the old set and they asked to keep it, sitting
// right after the coffee tasting ("foto swing keep taruh sesudah gambar kopi").
const TOUR_PHOTOS: Slide[] = [
  { src: "/mydaygili/tour-slide-01.jpg", alt: "Twin waterfall falling into a jungle pool, with a visitor below" },
  { src: "/mydaygili/tour-slide-02.jpg", alt: "Swimmer in a river pool at the foot of a jungle gorge" },
  { src: "/mydaygili/tour-slide-03.jpg", alt: "Two riders on horseback along the wet sand at sunset" },
  { src: "/mydaygili/tour-slide-04.jpg", alt: "Silversmith shaping a ring at her workbench" },
  { src: "/mydaygili/tour-slide-05.jpg", alt: "A guest's hands with the silver ring they have just finished" },
  { src: "/mydaygili/tour-slide-06.jpg", alt: "Balinese priest leading a melukat water blessing for a family" },
  { src: "/mydaygili/tour-slide-07.jpg", alt: "Guests on a jeep looking out over the misty highlands" },
  { src: "/mydaygili/tour-slide-08.jpg", alt: "Guest riding an ATV through a muddy jungle track" },
  { src: "/mydaygili/tour-slide-09.jpg", alt: "Batik artisan drawing hot wax onto white cloth" },
  { src: "/mydaygili/tour-slide-10.jpg", alt: "Finished songket cloth on a traditional handloom" },
  { src: "/mydaygili/tour-slide-11.jpg", alt: "Ulun Danu Beratan temple across the flowers on Lake Bratan" },
  { src: "/mydaygili/tour-slide-12.jpg", alt: "Visitors framed by the Gates of Heaven at Pura Lempuyang" },
  { src: "/mydaygili/tour-slide-13.jpg", alt: "Boat of visitors under the arch at Broken Beach" },
  { src: "/mydaygili/tour-slide-14.jpg", alt: "Guest standing on a jeep watching sunrise over the highlands" },
  { src: "/mydaygili/tour-slide-15.jpg", alt: "Guest on a tree platform looking across to the volcano" },
  { src: "/mydaygili/tour-slide-16.jpg", alt: "Guests on ATVs at the statue by the track entrance" },
  { src: "/mydaygili/tour-slide-17.jpg", alt: "Tall waterfall dropping through dense green jungle" },
  { src: "/mydaygili/tour-slide-18.jpg", alt: "Row of Balinese coffee and tea tasting cups" },
  { src: "/mydaygili/tour-swing.jpg", alt: "Swing over the rice terraces near Ubud" },
  { src: "/mydaygili/tour-slide-19.jpg", alt: "Tanah Lot temple on its rock at the water's edge" },
  { src: "/mydaygili/tour-slide-20.jpg", alt: "Palm tree silhouetted against the sunset over the sea" },
];

export const metadata: Metadata = {
  title: "Bali Day Tours — Adventure, Culture & Hidden Spots",
  description:
    "Custom Bali day tours and private transfer — adventure, culture, textile villages & unique destinations. Tell us your idea, we'll build the itinerary.",
  alternates: { canonical: "/bali-tours" },
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
          {/* The client chose this shot knowing it is only 640px wide, so it
              renders soft at full bleed. Its bottom strip is cropped off:
              another tour operator's watermark sat in that corner. */}
          <Image
            src="/mydaygili/hero-bali-tours.jpg"
            alt="The Handara Gate framing the road into the Bedugul highlands"
            fill
            sizes="100vw"
            preload
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#08265a]/60 via-[#08265a]/35 to-[#08265a]/70" />
          <div className="absolute inset-0 flex items-end px-4 pb-10 sm:px-6">
            <div className="mx-auto w-full max-w-6xl text-white">
              <SectionLabel tone="light">Beyond the usual tourist route</SectionLabel>
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
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#e8effc] text-[#0a4290]">
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
          <BookingButton form="BALI_TOUR">Tell Us Your Idea</BookingButton>
        </div>

        {/* Real guest photos — slideshow (client request) */}
        <div className="mt-10">
          <PhotoSlideshow slides={TOUR_PHOTOS} label="Bali tour photos" />
        </div>
      </section>

      {/* Transfer */}
      <section aria-labelledby="transfer-title" className="bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid items-center gap-8 rounded-3xl bg-[#08265a] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_auto]">
            <div>
              <h2 id="transfer-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Private transfer, island-wide
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Airport pickup/drop-off, hotel-to-hotel transfer, or point-to-point
                rides anywhere in Bali — private car with driver.
              </p>
            </div>
            <BookingButton form="TRANSFER">Ask for a Transfer Quote</BookingButton>
          </div>
        </div>
      </section>

      <FaqSection title="Bali tour FAQ" faqs={FAQ_BALITOURS} />
    </>
  );
}
