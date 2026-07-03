// ============================================================
// My Day Gili — site-wide data & helpers
// Source of truth: client content draft v1 (handoff PDF).
// ============================================================

// ⚠ PLACEHOLDER — client to confirm the real WhatsApp number.
// Swap this one constant and every CTA on the site updates.
export const WA_NUMBER = "6281234567890";

// ⚠ PLACEHOLDER — replace with the real TripAdvisor listing URL.
// Per client brief this is the ONLY non-WhatsApp external link on the site.
export const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Search?q=My%20Day%20Gili%20Klungkung";

export const BUSINESS = {
  name: "My Day Gili",
  tagline: "Fast Boat Tickets, Day Trips & Bali Tours",
  location: "Klungkung, Bali, Indonesia",
  rating: "5.0",
  reviewCount: 38,
  rankLabel: "#2 of 31 Things to Do in Klungkung",
  since: 2017,
};

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA_GENERAL = waLink("Hi My Day Gili, I want to ask about...");

// Booking template per operator — structure specified in client handoff:
// departure date, morning/afternoon, guest name, pax (adults/kids + ages),
// nationality, one way / return, return date.
export function waBookOperator(operatorName: string): string {
  return waLink(
    `Hi My Day Gili! Thank you for choosing ${operatorName}. I'd like to book a fast boat ticket:\n` +
      `• Departure date: \n` +
      `• Time: Morning / Afternoon\n` +
      `• Guest name: \n` +
      `• Number of pax: __ adults / __ kids (ages: )\n` +
      `• Nationality: \n` +
      `• Service: One way / Return\n` +
      `• Return date (if return): `
  );
}

export const WA_GILI_TRIP = waLink(
  "Hi My Day Gili! I'd like to book the Gili Day Trip:\n" +
    "• Date: \n• Hotel / pickup location: \n• Number of pax: __ adults / __ kids (ages: )\n• Nationality: "
);

export const WA_PENIDA = waLink(
  "Hi My Day Gili! Please send me the full Nusa Penida day trip itinerary and price.\n" +
    "• Preferred date: \n• Number of pax: "
);

export const WA_BALI_TOUR = waLink(
  "Hi My Day Gili! I'd like to plan a private Bali day tour.\n" +
    "• What I want to see / theme: \n• Date: \n• Pickup location: \n• Number of pax: "
);

export const WA_TRANSFER = waLink(
  "Hi My Day Gili! I'd like a private transfer quote.\n" +
    "• From: \n• To: \n• Date & time: \n• Number of pax: "
);

export const WA_COMBINE = waLink(
  "Hi My Day Gili! Can you combine routes for me? e.g. Gili + Nusa Penida in one trip.\n" +
    "• My plan: "
);

// ─── Fast boat operators (Padang Bai → Gili Trawangan) ───
export type Operator = {
  slug: string;
  name: string;
  times: string[];
  priceIdr: number;
  note: string;
};

export const OPERATORS: Operator[] = [
  {
    slug: "dcamel",
    name: "D'Camel",
    times: ["10:30"],
    priceIdr: 375000,
    note: "Most affordable option",
  },
  {
    slug: "wija-tramena",
    name: "Wija Tramena",
    times: ["09:00", "13:30"],
    priceIdr: 400000,
    note: "Two daily departures",
  },
  {
    slug: "wahana-virendra",
    name: "Wahana Virendra Cantika",
    times: ["08:30", "13:15"],
    priceIdr: 425000,
    note: "Morning & afternoon option",
  },
  {
    slug: "ekajaya",
    name: "Ekajaya",
    times: ["08:00", "09:00", "11:00", "12:30", "16:00"],
    priceIdr: 575000,
    note: "Most frequent — 5x daily",
  },
];

export const ROUTES_COVERED = [
  "Padang Bai → Gili Trawangan",
  "Padang Bai → Gili Air",
  "Padang Bai → Gili Meno",
  "Padang Bai → Lombok (Bangsal / Senggigi)",
  "Add-on: Sanur → Nusa Penida",
  "Add-on: Sanur → Nusa Lembongan",
];

// ─── FAQs ────────────────────────────────────────────────
export type Faq = { q: string; a: string };

export const FAQ_HOME: Faq[] = [
  {
    q: "How much is a fast boat ticket from Bali to Gili Trawangan?",
    a: "Tickets start from IDR 375,000 one way, depending on the operator and departure time.",
  },
  {
    q: "Which harbour do fast boats leave from?",
    a: "Most of our fast boats depart from Padang Bai Harbour in East Bali.",
  },
  {
    q: "Do I need to pay extra fees at the harbour?",
    a: "Yes — a harbour/retribution tax of IDR 10,000–20,000 per person is paid in cash at the port, separate from the ticket price.",
  },
  {
    q: "Can infants travel for free?",
    a: "Yes, infants up to 2 years old can ride for free on a parent's lap.",
  },
  {
    q: "Is there a Gili day trip without staying overnight?",
    a: "Yes — our Gili Day Trip includes hotel pickup, return ferry, and snorkeling at three Gili islands in a single day.",
  },
  {
    q: "Do you also arrange Bali tours and airport transfer?",
    a: "Yes, we arrange private Bali day tours and point-to-point transfer across the island.",
  },
];

export const FAQ_FASTBOAT: Faq[] = [
  {
    q: "What's the difference between a fast boat and a fast ferry?",
    a: "A fast ferry is a larger, more stable vessel than a small fastboat — all 4 operators we book are fast ferries.",
  },
  {
    q: "Which operator has the cheapest ticket?",
    a: "D'Camel currently has the lowest one-way fare, from IDR 375,000.",
  },
  {
    q: "Can I get a return ticket?",
    a: "Yes, return tickets are available with most operators — ask us for the combined price.",
  },
];

export const FAQ_DAYTRIPS: Faq[] = [
  {
    q: "How long is the Gili day trip?",
    a: "The Gili Day Trip runs from about 9:00 AM to 5:30 PM, including hotel pickup and return.",
  },
  {
    q: "Is snorkeling gear included?",
    a: "Yes, snorkeling gear is included in the Gili Day Trip; check with us for Nusa Penida gear inclusion.",
  },
  {
    q: "Can I do Nusa Penida and Gili on separate days?",
    a: "Yes — message us on WhatsApp and we'll help you plan both trips around your stay.",
  },
];

export const FAQ_BALITOURS: Faq[] = [
  {
    q: "Are Bali tours private or shared?",
    a: "Tours are private, with itineraries built around your interests and schedule.",
  },
  {
    q: "Can you combine a Bali tour with a Gili trip?",
    a: "Yes — many guests combine a Bali day tour with a Gili or Nusa Penida trip during the same visit.",
  },
];

export const FAQ_CONTACT: Faq[] = [
  {
    q: "How do I book a fast boat to the Gili Islands?",
    a: "Simply send us a WhatsApp message with your travel date, pickup location, and destination (Gili T, Gili Air, or Gili Meno). We'll confirm your seat and boat details within a few hours.",
  },
  {
    q: "How long is the fast boat crossing to Gili T?",
    a: "From Padang Bai it takes approximately 1.5 to 2 hours to reach Gili Trawangan. Sea conditions can occasionally affect journey times, especially during rainy season (Nov–Feb).",
  },
  {
    q: "Do you offer open tickets for flexible travel?",
    a: "Yes! We offer open tickets through several of our partner operators — travel on any available departure within the validity period.",
  },
  {
    q: "Is it safe for families and children?",
    a: "Yes, we regularly assist families with young children. All boats carry life jackets and safety equipment. For snorkelling day trips, we recommend children be comfortable in water.",
  },
];

// ─── Gili Day Trip itinerary ─────────────────────────────
export const GILI_ITINERARY = [
  { time: "09:00", activity: "Depart Padang Bai → Gili Trawangan" },
  { time: "10:30", activity: "Arrive Gili Trawangan, start snorkeling" },
  {
    time: "10:30–14:00",
    activity:
      "Snorkel at Gili Trawangan, Gili Air & Gili Meno — coral reef, underwater statues at Gili Meno, turtle spot. Lunch break at Gili Meno or Gili Air.",
  },
  { time: "14:00–15:00", activity: "Back at Gili Trawangan — free time to relax or cycle the beach" },
  { time: "15:00", activity: "Depart Gili Trawangan → Padang Bai" },
  { time: "17:30", activity: "Arrive Padang Bai, transfer back to your villa" },
];

export const GILI_INCLUDES = [
  "Hotel pickup and return",
  "Return fast boat ticket",
  "Snorkeling at 3 Gili Islands",
  "Photographer & videographer during snorkeling",
];

export const GILI_EXTRA_COSTS = [
  "Harbour tax to enter Gili Islands — IDR 50,000/person, paid at harbour",
  "Food & drinks, if purchased",
  "Bicycle rental — IDR 50,000/bike",
];

// ─── Blog articles (launch list from content draft) ──────
export type BlogPost = {
  title: string;
  excerpt: string;
  category: "Fast Boat" | "Gili Islands" | "Nusa Penida" | "Bali Tour" | "Travel Tips";
  readMin: number;
};

export const BLOG_POSTS: BlogPost[] = [
  { title: "Fast Boat from Bali to Gili Trawangan: Schedule & Price 2026", excerpt: "Compare departure times and prices for fast boats from Padang Bai to Gili Trawangan in 2026.", category: "Fast Boat", readMin: 5 },
  { title: "Gili Trawangan vs Gili Air vs Gili Meno: Which Island to Visit", excerpt: "A side-by-side comparison of the three Gili Islands to help you choose where to stay or visit.", category: "Gili Islands", readMin: 6 },
  { title: "How to Avoid Fast Boat Scams in Padang Bai", excerpt: "Practical tips for booking a safe, legitimate fast boat ticket from Padang Bai Harbour.", category: "Travel Tips", readMin: 4 },
  { title: "Bali to Lombok by Fast Boat: Complete Travel Guide", excerpt: "Everything you need to know about crossing from Bali to Lombok by fast ferry.", category: "Fast Boat", readMin: 7 },
  { title: "Nusa Penida Day Trip: What to Expect", excerpt: "A first-timer's guide to a one-day snorkeling and sightseeing trip to Nusa Penida.", category: "Nusa Penida", readMin: 5 },
  { title: "Gili Islands Day Trip vs Overnight Stay: Which Is Better?", excerpt: "Weighing the pros and cons of a day trip to the Gili Islands versus staying overnight.", category: "Gili Islands", readMin: 5 },
  { title: "Harbour Tax & Hidden Fees When Traveling to the Gili Islands", excerpt: "A breakdown of the extra fees travelers should budget for beyond the boat ticket price.", category: "Travel Tips", readMin: 4 },
  { title: "Best Snorkeling Spots Around Gili Meno", excerpt: "A guide to the underwater statues and reef spots near Gili Meno.", category: "Gili Islands", readMin: 4 },
  { title: "Unique Bali Day Tours Beyond the Usual Tourist Route", excerpt: "Ideas for Bali day tours focused on culture, textiles, and hidden destinations.", category: "Bali Tour", readMin: 6 },
  { title: "Padang Bai Harbour: Complete Guide for First-Time Travelers", excerpt: "What to expect at Padang Bai Harbour, from check-in to boarding your fast boat.", category: "Travel Tips", readMin: 5 },
];

// ─── JSON-LD helpers ─────────────────────────────────────
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  description:
    "Fast boat tickets from Bali to the Gili Islands & Lombok, Gili and Nusa Penida day trips, and private Bali tours.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Klungkung",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating,
    reviewCount: BUSINESS.reviewCount,
  },
  sameAs: [TRIPADVISOR_URL],
};

export const OPERATOR_OFFERS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Fast Boat Ticket — Padang Bai to Gili Trawangan",
  description:
    "One-way fast ferry tickets from Padang Bai (Bali) to Gili Trawangan across 4 trusted operators.",
  offers: OPERATORS.map((o) => ({
    "@type": "Offer",
    name: `${o.name} — Padang Bai to Gili Trawangan`,
    price: o.priceIdr,
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
  })),
};

export const GILI_TRIP_JSONLD = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Gili Day Trip — 3 Islands, 1 Day",
  description:
    "One-day snorkeling trip from Bali to Gili Trawangan, Gili Air & Gili Meno with hotel pickup, return ferry, snorkeling gear and photos included.",
  provider: { "@type": "LocalBusiness", name: BUSINESS.name },
  itinerary: GILI_ITINERARY.map((i) => ({
    "@type": "ItemList",
    name: `${i.time} — ${i.activity}`,
  })),
};

export const BALI_TOUR_JSONLD = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Private Bali Day Tours & Transfer",
  description:
    "Custom private Bali day tours — adventure, culture, textile villages & hidden destinations — plus island-wide private transfer.",
  provider: { "@type": "LocalBusiness", name: BUSINESS.name },
};
