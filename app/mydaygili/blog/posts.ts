// ============================================================
// Blog posts — SINGLE FIXED SCHEMA for every article.
//
// This is the content model a future admin panel/CMS will fill in.
// Every post has the exact same fields; the [slug] template renders
// them identically. To add a post, append one object with all fields.
// ============================================================

export type BlogCategory =
  | "Fast Boat"
  | "Gili Islands"
  | "Nusa Penida"
  | "Bali Tour"
  | "Travel Tips";

export type BlogSection = {
  heading: string;
  body: string; // paragraphs separated by a blank line ("\n\n")
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;        // card summary + meta description
  metaTitle: string;      // ≤60 chars ideally
  heroImage: string;      // /public path
  heroAlt: string;
  publishedAt: string;    // ISO date (YYYY-MM-DD)
  readMin: number;
  author: string;
  lead: string;           // opening paragraph, direct-answer style for SEO
  sections: BlogSection[];
  keyTakeaways: string[];
  related: { label: string; href: string };
};

const AUTHOR = "My Day Gili Team";

// Category → hero image (reuses existing client photos in /public/mydaygili)
export const CATEGORY_HERO: Record<BlogCategory, { src: string; alt: string }> = {
  "Fast Boat":    { src: "/mydaygili/hero-fastboat-v2.jpg", alt: "Fast ferry cruising toward the Gili Islands" },
  "Gili Islands": { src: "/mydaygili/gili-boats.jpg",       alt: "Boats on clear turquoise water at the Gili Islands" },
  "Nusa Penida":  { src: "/mydaygili/penida-boats.jpg",     alt: "Traditional boats on turquoise water near Nusa Penida" },
  "Bali Tour":    { src: "/mydaygili/hero-balitours.jpg",   alt: "Travelers at the Gates of Heaven, Lempuyang Temple" },
  "Travel Tips":  { src: "/mydaygili/hero-daytrips.jpg",    alt: "Turquoise water and boats at a Bali harbour" },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fast-boat-bali-to-gili-trawangan-schedule-price-2026",
    title: "Fast Boat from Bali to Gili Trawangan: Schedule & Price 2026",
    category: "Fast Boat",
    excerpt:
      "Compare departure times and prices for fast boats from Padang Bai to Gili Trawangan in 2026.",
    metaTitle: "Fast Boat Bali to Gili Trawangan: Schedule & Price",
    heroImage: CATEGORY_HERO["Fast Boat"].src,
    heroAlt: CATEGORY_HERO["Fast Boat"].alt,
    publishedAt: "2026-01-12",
    readMin: 5,
    author: AUTHOR,
    lead:
      "Fast boat tickets from Bali to Gili Trawangan start from IDR 375,000 one way, with daily departures from Padang Bai Harbour in East Bali. The crossing takes roughly 1.5 to 2 hours on a large, stable fast ferry.",
    sections: [
      {
        heading: "Departure times & prices in 2026",
        body:
          "We book four trusted fast ferry operators from Padang Bai to Gili Trawangan. D'Camel departs at 10:30 from IDR 375,000. Wijaya Tramena runs twice daily at 09:15 and 13:45 from IDR 400,000. Wahana Virendra Cantika offers a morning and afternoon option at 08:30 and 13:15 from IDR 425,000. Ekajaya is the most frequent with four daily departures at 08:00, 09:00, 12:30 and 13:00 from IDR 660,000.\n\nPrices are per adult, one way, and can change without notice — always confirm today's rate with us on WhatsApp before you travel.",
      },
      {
        heading: "How long does the crossing take?",
        body:
          "From Padang Bai it takes about 1.5 to 2 hours to reach Gili Trawangan. Sea conditions can occasionally affect journey times, especially during the rainy season from November to February.\n\nAll four operators we book are classified as fast ferries rather than small fastboats — larger vessels mean a smoother, safer crossing.",
      },
      {
        heading: "What's not included in the ticket price",
        body:
          "A harbour or retribution tax of IDR 10,000–20,000 per person is paid in cash at the port, separate from the ticket. Infants under 2 years old travel free on a parent's lap, and luggage allowance is 20kg per passenger (surfboards are IDR 50,000 per piece, payable at check-in).",
      },
    ],
    keyTakeaways: [
      "Tickets start from IDR 375,000 one way (D'Camel, 10:30).",
      "Most boats leave Padang Bai; crossing takes ~1.5–2 hours.",
      "Budget IDR 10,000–20,000 cash for harbour tax at the port.",
      "Book direct on WhatsApp for the best confirmed rate.",
    ],
    related: { label: "See full schedule & prices", href: "/mydaygili/fast-boat-tickets" },
  },
  {
    slug: "gili-trawangan-vs-gili-air-vs-gili-meno",
    title: "Gili Trawangan vs Gili Air vs Gili Meno: Which Island to Visit",
    category: "Gili Islands",
    excerpt:
      "A side-by-side comparison of the three Gili Islands to help you choose where to stay or visit.",
    metaTitle: "Gili Trawangan vs Gili Air vs Gili Meno Compared",
    heroImage: CATEGORY_HERO["Gili Islands"].src,
    heroAlt: CATEGORY_HERO["Gili Islands"].alt,
    publishedAt: "2026-01-20",
    readMin: 6,
    author: AUTHOR,
    lead:
      "Gili Trawangan is the liveliest of the three Gili Islands, Gili Air balances beaches with a relaxed local feel, and Gili Meno is the quietest — ideal for couples and snorkelers. All three are car-free and reachable by fast boat from Bali.",
    sections: [
      {
        heading: "Gili Trawangan — the social island",
        body:
          "Gili T is the largest and most popular, known for its beach bars, restaurants, dive schools and sunset spots. It suits travellers who want nightlife, a wide choice of accommodation, and plenty to do between snorkel trips.",
      },
      {
        heading: "Gili Air — the balanced choice",
        body:
          "Gili Air is a favourite for travellers who want good beaches and cafés without the party scene. It has a strong local community, easy snorkeling straight off the shore, and a calmer pace than Gili T.",
      },
      {
        heading: "Gili Meno — the quiet escape",
        body:
          "Gili Meno is the smallest and most peaceful, popular with honeymooners. It's home to the famous underwater statues and some of the best snorkeling of the three islands. Bring what you need — facilities are limited.",
      },
    ],
    keyTakeaways: [
      "Gili Trawangan: nightlife, dining, most accommodation.",
      "Gili Air: relaxed, good beaches, local feel.",
      "Gili Meno: quietest, underwater statues, honeymoon vibe.",
      "All three are car-free and reachable by fast boat.",
    ],
    related: { label: "Do a Gili day trip", href: "/mydaygili/day-trips#gili" },
  },
  {
    slug: "how-to-avoid-fast-boat-scams-padang-bai",
    title: "How to Avoid Fast Boat Scams in Padang Bai",
    category: "Travel Tips",
    excerpt:
      "Practical tips for booking a safe, legitimate fast boat ticket from Padang Bai Harbour.",
    metaTitle: "How to Avoid Fast Boat Scams in Padang Bai",
    heroImage: CATEGORY_HERO["Travel Tips"].src,
    heroAlt: CATEGORY_HERO["Travel Tips"].alt,
    publishedAt: "2026-02-02",
    readMin: 4,
    author: AUTHOR,
    lead:
      "To avoid fast boat scams in Padang Bai, book with an established operator, confirm the exact price and departure in writing before you pay, and never hand cash to touts at the harbour promising a cheaper 'same boat' deal.",
    sections: [
      {
        heading: "Book before you arrive at the port",
        body:
          "The safest approach is to confirm your operator, price and departure time in advance — by WhatsApp or a reputable agent — rather than buying from whoever approaches you at the harbour. A written confirmation protects you if there's a dispute.",
      },
      {
        heading: "Know the real price",
        body:
          "Legitimate one-way tickets to the Gili Islands start from around IDR 375,000. Online travel agents often show higher all-in prices because of platform fees. If someone offers a price that seems too good to be true, it usually is.",
      },
      {
        heading: "Check the boat, not just the ticket",
        body:
          "Ask which vessel you're actually boarding. We only book larger fast ferries — not small overloaded speedboats — and can tell you the boat name in advance. Life jackets should be available on board for every passenger.",
      },
    ],
    keyTakeaways: [
      "Confirm operator, price and time in writing before paying.",
      "Real one-way Gili tickets start ~IDR 375,000.",
      "Avoid cash deals from touts at the harbour.",
      "Ask the boat name and check life jackets are on board.",
    ],
    related: { label: "Book a trusted operator", href: "/mydaygili/fast-boat-tickets" },
  },
  {
    slug: "bali-to-lombok-by-fast-boat-guide",
    title: "Bali to Lombok by Fast Boat: Complete Travel Guide",
    category: "Fast Boat",
    excerpt:
      "Everything you need to know about crossing from Bali to Lombok by fast ferry.",
    metaTitle: "Bali to Lombok by Fast Boat: Complete Guide",
    heroImage: CATEGORY_HERO["Fast Boat"].src,
    heroAlt: CATEGORY_HERO["Fast Boat"].alt,
    publishedAt: "2026-02-10",
    readMin: 7,
    author: AUTHOR,
    lead:
      "Fast ferries from Bali to Lombok depart from Padang Bai and typically stop at Gili Trawangan and Gili Air before continuing to Bangsal Port on mainland Lombok. It's the quickest sea route between the two islands.",
    sections: [
      {
        heading: "The route and stops",
        body:
          "Bali–Lombok fast ferries usually run Padang Bai → Gili Trawangan → Gili Air → Bangsal (Lombok), with about 5–10 minutes at each stop. Some services also reach Senggigi. This means you can combine a Gili visit with your Lombok crossing on a single ticket.",
      },
      {
        heading: "What to expect on board",
        body:
          "You'll travel on a large, stable fast ferry with onboard crew — not a small speedboat. Arrive at least 60 minutes before departure for check-in. Schedules can shift with sea conditions, which is standard across all operators on this route.",
      },
      {
        heading: "Fees and luggage",
        body:
          "Budget IDR 10,000–20,000 cash per person for harbour tax at the relevant ports. Standard luggage allowance is 20kg per passenger; surfboards carry a IDR 50,000 per-piece fee paid at check-in. Ask us about return tickets for a better combined price.",
      },
    ],
    keyTakeaways: [
      "Route: Padang Bai → Gili T → Gili Air → Bangsal (Lombok).",
      "Large fast ferries with crew, not small speedboats.",
      "Arrive 60 minutes early; schedules shift with the sea.",
      "Harbour tax IDR 10,000–20,000 cash per person.",
    ],
    related: { label: "Book your Bali–Lombok crossing", href: "/mydaygili/fast-boat-tickets" },
  },
  {
    slug: "nusa-penida-day-trip-what-to-expect",
    title: "Nusa Penida Day Trip: What to Expect",
    category: "Nusa Penida",
    excerpt:
      "A first-timer's guide to a one-day snorkeling and sightseeing trip to Nusa Penida.",
    metaTitle: "Nusa Penida Day Trip: What to Expect",
    heroImage: CATEGORY_HERO["Nusa Penida"].src,
    heroAlt: CATEGORY_HERO["Nusa Penida"].alt,
    publishedAt: "2026-02-18",
    readMin: 5,
    author: AUTHOR,
    lead:
      "A Nusa Penida day trip combines dramatic clifftop viewpoints with clear-water snorkeling, all in a single day from Bali. The exact itinerary and price depend on which beaches and viewpoints you want to see.",
    sections: [
      {
        heading: "Snorkeling vs sightseeing",
        body:
          "Nusa Penida offers two very different experiences. Snorkeling trips visit clear-water spots known for vibrant marine life. Sightseeing trips focus on the island's famous cliffside viewpoints and beaches. Many visitors combine a bit of both — tell us your priorities and we'll shape the day.",
      },
      {
        heading: "How the day works",
        body:
          "You cross from Bali by fast boat and travel around the island by private vehicle. Roads on Nusa Penida can be rough, so a full day lets you enjoy the highlights without rushing. We plan pickup times around your crossing so you're back at your villa by evening.",
      },
      {
        heading: "What to bring",
        body:
          "Bring reef-safe sunscreen, a swimsuit, a towel and cash for entrance fees. Check with us about snorkeling gear inclusion when you book, since it varies by itinerary.",
      },
    ],
    keyTakeaways: [
      "Choose snorkeling, sightseeing, or a mix of both.",
      "Cross by fast boat, tour the island by private vehicle.",
      "Roads are rough — a full day avoids rushing.",
      "Message us for the itinerary and current price.",
    ],
    related: { label: "Ask about the Nusa Penida trip", href: "/mydaygili/day-trips#nusa-penida" },
  },
  {
    slug: "gili-day-trip-vs-overnight-stay",
    title: "Gili Islands Day Trip vs Overnight Stay: Which Is Better?",
    category: "Gili Islands",
    excerpt:
      "Weighing the pros and cons of a day trip to the Gili Islands versus staying overnight.",
    metaTitle: "Gili Day Trip vs Overnight Stay: Which Is Better?",
    heroImage: CATEGORY_HERO["Gili Islands"].src,
    heroAlt: CATEGORY_HERO["Gili Islands"].alt,
    publishedAt: "2026-02-25",
    readMin: 5,
    author: AUTHOR,
    lead:
      "A Gili day trip is best if you're short on time and want to snorkel three islands without booking a hotel, while an overnight stay suits travellers who want sunsets, nightlife and a slower pace. Both start with a fast boat from Bali.",
    sections: [
      {
        heading: "When a day trip wins",
        body:
          "If your Bali schedule is tight, a Gili day trip lets you snorkel Gili Trawangan, Gili Air and Gili Meno and be back at your villa by evening — with hotel pickup, return ferry and snorkeling gear included. No packing, no extra hotel booking.",
      },
      {
        heading: "When to stay overnight",
        body:
          "An overnight stay makes sense if you want to experience Gili sunsets, dine on the beach, or dive over multiple days. You'll trade the convenience of a day trip for a more relaxed, immersive island experience.",
      },
      {
        heading: "You can do both",
        body:
          "Many travellers take a day trip first to decide which island they like, then return for an overnight stay later in their trip. Message us and we'll help you plan the combination around your dates.",
      },
    ],
    keyTakeaways: [
      "Day trip: three islands, no hotel, back by evening.",
      "Overnight: sunsets, nightlife, diving, slower pace.",
      "Day trips include pickup, return ferry and gear.",
      "Not sure? Do a day trip first, then return.",
    ],
    related: { label: "See the Gili day trip", href: "/mydaygili/day-trips#gili" },
  },
  {
    slug: "gili-islands-harbour-tax-hidden-fees",
    title: "Harbour Tax & Hidden Fees When Traveling to the Gili Islands",
    category: "Travel Tips",
    excerpt:
      "A breakdown of the extra fees travelers should budget for beyond the boat ticket price.",
    metaTitle: "Gili Islands Harbour Tax & Hidden Fees Explained",
    heroImage: CATEGORY_HERO["Travel Tips"].src,
    heroAlt: CATEGORY_HERO["Travel Tips"].alt,
    publishedAt: "2026-03-04",
    readMin: 4,
    author: AUTHOR,
    lead:
      "Beyond your fast boat ticket, budget IDR 10,000–20,000 per person for harbour tax paid in cash at the port. Other optional costs include luggage surcharges, bicycle rental on the islands, and entrance fees on day trips.",
    sections: [
      {
        heading: "Harbour / retribution tax",
        body:
          "A harbour tax of IDR 10,000–20,000 per person is collected in cash at the port for routes to and from Padang Bai, Serangan, Gili Trawangan, Gili Meno, Gili Air, Bangsal and Senggigi. It's separate from your ticket, so keep small notes handy.",
      },
      {
        heading: "Luggage and equipment",
        body:
          "Standard allowance is 20kg per passenger. Surfboards carry a IDR 50,000 per-piece fee, payable at check-in. If you're travelling with extra or oversized bags, mention it when booking so there are no surprises at the port.",
      },
      {
        heading: "On-island and day-trip extras",
        body:
          "On a Gili day trip, entering the islands can carry a harbour tax of around IDR 50,000 per person, and bicycle rental is about IDR 50,000 per bike. Food, drinks and optional activities are paid as you go.",
      },
    ],
    keyTakeaways: [
      "Harbour tax: IDR 10,000–20,000 cash per person.",
      "Surfboards: IDR 50,000 per piece at check-in.",
      "Gili day-trip harbour entry ~IDR 50,000 per person.",
      "Carry small cash notes for port fees.",
    ],
    related: { label: "Check what's included", href: "/mydaygili/fast-boat-tickets" },
  },
  {
    slug: "best-snorkeling-spots-gili-meno",
    title: "Best Snorkeling Spots Around Gili Meno",
    category: "Gili Islands",
    excerpt: "A guide to the underwater statues and reef spots near Gili Meno.",
    metaTitle: "Best Snorkeling Spots Around Gili Meno",
    heroImage: CATEGORY_HERO["Gili Islands"].src,
    heroAlt: CATEGORY_HERO["Gili Islands"].alt,
    publishedAt: "2026-03-11",
    readMin: 4,
    author: AUTHOR,
    lead:
      "Gili Meno is the best of the three Gili Islands for snorkeling, home to the famous underwater statues and healthy reef with regular turtle sightings. Most day trips include a stop here.",
    sections: [
      {
        heading: "The underwater statues",
        body:
          "Gili Meno's ring of underwater statues is the island's signature snorkel and free-dive spot. The figures sit in shallow, clear water, making them accessible for snorkelers and popular for photos.",
      },
      {
        heading: "Reef and turtle spots",
        body:
          "The reefs around Gili Meno support colourful coral and marine life, and the waters between Meno and Gili Air are known for green sea turtles. Our Gili day trip includes snorkeling at all three islands so you get the best of each.",
      },
      {
        heading: "Tips for a good snorkel",
        body:
          "Use reef-safe sunscreen, never touch or stand on coral, and keep a respectful distance from turtles. Snorkeling gear is included on our Gili day trip; a photographer and videographer come along to capture the day.",
      },
    ],
    keyTakeaways: [
      "Gili Meno has the best snorkeling of the three islands.",
      "Don't miss the shallow underwater statues.",
      "Turtles are common between Meno and Gili Air.",
      "Our Gili day trip covers all three islands.",
    ],
    related: { label: "Book the Gili day trip", href: "/mydaygili/day-trips#gili" },
  },
  {
    slug: "unique-bali-day-tours-beyond-tourist-route",
    title: "Unique Bali Day Tours Beyond the Usual Tourist Route",
    category: "Bali Tour",
    excerpt:
      "Ideas for Bali day tours focused on culture, textiles, and hidden destinations.",
    metaTitle: "Unique Bali Day Tours Beyond the Tourist Route",
    heroImage: CATEGORY_HERO["Bali Tour"].src,
    heroAlt: CATEGORY_HERO["Bali Tour"].alt,
    publishedAt: "2026-03-18",
    readMin: 6,
    author: AUTHOR,
    lead:
      "The best Bali day tours are built around what you actually want to see — from traditional textile villages and temples to waterfalls and off-the-beaten-path spots most tourists never reach. Every tour is private with your own car and driver.",
    sections: [
      {
        heading: "Culture and craft",
        body:
          "Beyond the famous temples, Bali's ikat and batik weaving villages give you a close look at traditional craft and a chance to meet local artisans. Pair a temple visit with a village stop for a fuller picture of Balinese culture.",
      },
      {
        heading: "Adventure and nature",
        body:
          "If you'd rather be outdoors, we can plan a day around waterfalls, rice-terrace treks, rafting or off-road routes. These trips work well for families and small groups who want a mix of activity and scenery.",
      },
      {
        heading: "Design your own day",
        body:
          "Because tours are private, you set the pace and the route. Tell us the theme — culture, adventure, textiles, or hidden spots — and we'll build the itinerary around it, with island-wide private transfer included.",
      },
    ],
    keyTakeaways: [
      "Private tours built around your interests.",
      "Options: culture, textiles, adventure, hidden spots.",
      "Great for families and small groups.",
      "Island-wide private car and driver included.",
    ],
    related: { label: "Plan a Bali tour", href: "/mydaygili/bali-tours" },
  },
  {
    slug: "padang-bai-harbour-first-time-guide",
    title: "Padang Bai Harbour: Complete Guide for First-Time Travelers",
    category: "Travel Tips",
    excerpt:
      "What to expect at Padang Bai Harbour, from check-in to boarding your fast boat.",
    metaTitle: "Padang Bai Harbour: First-Time Traveler's Guide",
    heroImage: CATEGORY_HERO["Travel Tips"].src,
    heroAlt: CATEGORY_HERO["Travel Tips"].alt,
    publishedAt: "2026-03-25",
    readMin: 5,
    author: AUTHOR,
    lead:
      "Padang Bai is the main departure harbour in East Bali for fast boats to the Gili Islands and Lombok. Arrive at least 60 minutes before departure, keep cash ready for harbour tax, and check in with your operator to get your boarding details.",
    sections: [
      {
        heading: "Getting there and checking in",
        body:
          "Padang Bai is roughly 1.5–2 hours by road from south Bali, depending on traffic. We arrange hotel pickup and transfer so you reach the harbour on time. On arrival, check in with your operator to confirm your boat and boarding point.",
      },
      {
        heading: "At the port",
        body:
          "Expect a busy harbour with several operators. Keep IDR 10,000–20,000 in cash per person for the harbour tax, and have your booking confirmation ready. Boarding is by e-ticket with instant confirmation once you've booked.",
      },
      {
        heading: "Boarding and departure",
        body:
          "Fast ferries load luggage first, then passengers. Follow your operator's crew to the correct vessel — this is why we confirm your boat name in advance. Schedules can shift with sea conditions, so build a little buffer into your plans.",
      },
    ],
    keyTakeaways: [
      "Padang Bai is ~1.5–2 hours from south Bali.",
      "Arrive at least 60 minutes before departure.",
      "Keep IDR 10,000–20,000 cash for harbour tax.",
      "We arrange pickup and confirm your boat name.",
    ],
    related: { label: "See departures from Padang Bai", href: "/mydaygili/fast-boat-tickets" },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
