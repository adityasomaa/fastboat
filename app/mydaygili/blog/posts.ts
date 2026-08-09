// ============================================================
// Blog posts — SINGLE FIXED SCHEMA for every article.
//
// The field set mirrors exactly how the client authors an article
// (Meta Title / Meta Description / Category / Target Keyword /
// Read time, then lead → sections → FAQ → closing), so a future
// admin panel can map 1:1 onto this model with no reshaping.
//
// Every post has the same fields; the [slug] template renders them
// identically. To add a post, append one object with all fields.
//
// `body` is plain text. Blocks are separated by a blank line:
//   • a block whose lines all start with "- "   → bullet list
//   • a block whose lines all start with "1. "  → numbered list
//   • anything else                              → paragraph
// ============================================================

export type BlogCategory =
  | "Fast Boat"
  | "Gili Islands"
  | "Nusa Penida"
  | "Bali Tour"
  | "Travel Tips";

export type BlogTable = {
  headers: string[];
  rows: string[][];
};

export type BlogSection = {
  heading: string;
  body: string;        // blocks separated by a blank line (see note above)
  table?: BlogTable;   // optional comparison table rendered under the body
};

export type BlogFaq = {
  q: string;
  a: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;        // = client's "Meta Description" (also the card summary)
  metaTitle: string;      // = client's "Meta Title"
  keyword: string;        // = client's "Target Keyword"
  heroImage: string;      // /public path
  heroAlt: string;
  publishedAt: string;    // ISO date (YYYY-MM-DD)
  readMin: number;        // = client's "Read time"
  author: string;
  lead: string;           // opening paragraph, direct-answer style for SEO
  sections: BlogSection[];
  faqs: BlogFaq[];        // rendered as an FAQ block + FAQPage structured data
  closing: string;        // client's sign-off paragraph
  related: { label: string; href: string };
};

const AUTHOR = "My Day Gili Team";

// Category → hero image (reuses existing client photos in /public/mydaygili)
export const CATEGORY_HERO: Record<BlogCategory, { src: string; alt: string }> = {
  "Fast Boat":    { src: "/mydaygili/hero-fastboat.jpg", alt: "Fast catamaran ferry cruising across open sea" },
  "Gili Islands": { src: "/mydaygili/gili-islands-beach.jpg",       alt: "Boats moored off a Gili island beach with Lombok behind" },
  "Nusa Penida":  { src: "/mydaygili/penida-cliffs.jpg",     alt: "Kelingking Beach cliffs and turquoise water, Nusa Penida" },
  "Bali Tour":    { src: "/mydaygili/bali-gates.jpg",   alt: "The Gates of Heaven at Pura Lempuyang framing Mount Agung" },
  "Travel Tips":  { src: "/mydaygili/harbour-boats.jpg",    alt: "Traditional outrigger boats moored at an Indonesian harbour" },
};

export const BLOG_POSTS: BlogPost[] = [
  // ---------------------------------------------------------- 01
  {
    slug: "fast-boat-bali-to-gili-trawangan-schedule-price-2026",
    title: "Fast Boat from Bali to Gili Trawangan: Schedule & Price (2026)",
    category: "Fast Boat",
    metaTitle: "Fast Boat from Bali to Gili Trawangan: Schedule & Price 2026",
    excerpt:
      "Compare departure times and prices for fast boats from Padang Bai to Gili Trawangan in 2026, plus tips on booking, boarding, and what to expect.",
    keyword: "fast boat bali to gili trawangan",
    heroImage: "/mydaygili/hero-fastboat.jpg",
    heroAlt: "Fast ferry cruising toward the Gili Islands",
    publishedAt: "2026-07-17",
    readMin: 7,
    author: AUTHOR,
    lead: "If you're heading from Bali to Gili Trawangan, the fast boat from Padang Bai Harbour is the quickest and most reliable way to cross the Lombok Strait. Here's what the crossing actually looks like, what operators charge, and how to book without overpaying.",
    sections: [
      {
        heading: "Where the Boats Leave From",
        body: `Most fast boats to Gili Trawangan depart from Padang Bai Harbour on Bali's east coast, roughly 1.5 hours by car from the Kuta/Seminyak area and about 1 hour from Ubud. A smaller number of operators also run from Sanur and Serangan Harbour in South Bali, but Padang Bai remains the main gateway for Gili-bound travelers because it offers the shortest crossing.`,
      },
      {
        heading: "How Long Does It Take?",
        body: `The crossing from Padang Bai to Gili Trawangan typically takes around 1.5 to 2 hours, depending on sea conditions, the boat's speed, and how many stops it makes at the other Gili Islands along the way. Morning departures generally have calmer seas than afternoon sailings, so if you're prone to seasickness, book the earliest boat you can.`,
      },
      {
        heading: "Fast Boat Operators, Prices & Departure Times",
        body: `Prices and schedules vary by operator and season, and they do change, so always confirm at the time of booking. As a general guide, one-way fares from Padang Bai to the Gili Islands typically run from around IDR 375,000 up to IDR 575,000+ per person, depending on the boat, amenities, and number of daily departures:

- Budget-to-mid-range operators with a single daily departure (typically mid-morning) tend to sit at the lower end of the price range.
- Operators with two departures a day (morning and early afternoon) sit in the mid-range.
- Larger, more established operators running multiple daily sailings (four or more times a day) usually charge a premium for the added flexibility and bigger, more stable boats — useful if the Lombok Strait is choppy.

Because fares shift with season, fuel costs, and promotions, it's worth comparing two or three operators before you book rather than locking in the first price you see.`,
      },
      {
        heading: "What's Included (and What Isn't)",
        body: `A standard one-way ticket covers your seat and life jacket. It usually does not include:

- Hotel transfer to/from Padang Bai (often offered as an add-on).
- Harbour tax and Gili entry fees, paid in cash at the port — budget roughly IDR 50,000–80,000 per person round trip across the various checkpoints, since fees are collected in small increments (typically IDR 10,000–30,000 each) at departure and arrival.
- Return transport once you're on Gili Trawangan (most of the island is walkable or reachable by bicycle or cidomo horse cart, since motorized vehicles are banned).`,
      },
      {
        heading: "Booking Tips",
        body: `1. Book online in advance, especially in peak season (July–August and the December holidays), when popular morning departures sell out.
2. Arrive at least 60 minutes before departure to check in, since boarding is done via lanyard/boarding pass and boats can fill up fast.
3. Bring cash in small denominations for harbour taxes and fees — card payment is rarely available at the port.
4. Confirm your exact departure pier, since several ticket offices operate out of Padang Bai and it's easy to walk into the wrong one.
5. If you're doing a round trip with an open return date, most operators require you to reconfirm your return sailing at their office on Gili Trawangan at least a day in advance.`,
      },
      {
        heading: "Best Time to Travel",
        body: `The Lombok Strait can get rough, particularly during the wet season (roughly November to March). If you want the smoothest ride, choose an early morning departure and, where possible, a larger boat — bigger vessels handle chop noticeably better than smaller speedboats.`,
      },
    ],
    faqs: [
      {
        q: "How long is the fast boat from Bali to Gili Trawangan?",
        a: "Around 1.5 to 2 hours from Padang Bai, depending on conditions and stops.",
      },
      {
        q: "Which harbour do I leave from?",
        a: "Padang Bai Harbour is the main departure point for the shortest crossing; Sanur and Serangan also run services but with longer sailing times.",
      },
      {
        q: "Do I need to pay extra fees on top of my ticket?",
        a: "Yes. Harbour tax and a Gili entry fee are collected in cash at the port and are not included in your ticket price.",
      },
      {
        q: "Is it better to book online or at the port?",
        a: "Booking online in advance is generally safer and helps you avoid inflated on-the-spot pricing, especially in peak season.",
      },
    ],
    closing:
      "This guide is provided by My Day Gili, a local fast boat and day trip service based in Klungkung, Bali. For current schedules and to check availability, get in touch with our team directly.",
    related: { label: "See departures from Padang Bai", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 02
  {
    slug: "gili-trawangan-vs-gili-air-vs-gili-meno",
    title: "Gili Trawangan vs Gili Air vs Gili Meno: Which Island Should You Visit?",
    category: "Gili Islands",
    metaTitle: "Gili Trawangan vs Gili Air vs Gili Meno: Which Island to Visit?",
    excerpt:
      "A side-by-side comparison of the three Gili Islands to help you choose where to stay or visit on your Bali island trip.",
    keyword: "gili trawangan vs gili air",
    heroImage: "/mydaygili/gili-islands-beach.jpg",
    heroAlt: "Boats on clear turquoise water at the Gili Islands",
    publishedAt: "2026-07-10",
    readMin: 6,
    author: AUTHOR,
    lead: "The three Gili Islands sit just off the northwest coast of Lombok, only a short boat hop apart, yet each one has a completely different personality. Here's how to choose the right island (or islands) for your trip.",
    sections: [
      {
        heading: "The Quick Answer",
        body: `Choose Gili Trawangan if you want nightlife, the widest choice of restaurants and dive shops, and the easiest first-time base. Choose Gili Air if you want a balance of relaxed cafés, snorkeling, and a bit of evening energy without the party scene. Choose Gili Meno if you want quiet, romance, and slow beach days with minimal distractions.

If you can't decide, the good news is that the islands are only about 10–15 minutes apart by public or chartered boat, so island-hopping for a day is easy.`,
      },
      {
        heading: "Gili Trawangan: The Social Island",
        body: `Gili Trawangan ("Gili T") is the largest and busiest of the three, roughly 1.5 km across. It has the most accommodation options, the biggest spread of restaurants and beach bars, and the most dive shops on the Gilis — making it a strong choice for anyone doing a diving course or wanting a wide pool of instructors. Its harbour area is lively, and the east-side strip gets genuinely loud after dark with sunset bars and late-night music.

Best for: first-time visitors who want variety, groups, divers, travelers who want an active social scene alongside beach time.

Trade-off: it's the least quiet of the three, and the beaches near the main strip get busy in high season.`,
      },
      {
        heading: "Gili Air: The Balanced Middle Ground",
        body: `Gili Air sits between Trawangan and Meno, both geographically and in atmosphere. It has a good spread of cafés, yoga studios, small beach bars, and snorkeling spots, with a noticeably calmer pace than Trawangan but more going on than Meno. It also has a stronger sense of local Indonesian village life than Trawangan.

Best for: travelers who want a single base for a longer stay, couples who want some activity without full-on nightlife, friends traveling together who can't agree between Trawangan and Meno.

Trade-off: fewer late-night options than Trawangan, and a smaller restaurant scene.`,
      },
      {
        heading: "Gili Meno: The Quiet Island",
        body: `Gili Meno is the smallest and least developed of the three, with a saltwater lake in its interior, mangroves, and long stretches of quiet beach. It has far fewer hotels and restaurants than the other two islands, and evenings are genuinely low-key. It's also home to the Gili Islands' best-known underwater attraction, a circle of submerged human statues just off the west coast.

Best for: honeymooners, couples wanting solitude, families with young children who want a slower, quieter environment, repeat visitors who've already done Trawangan and want the opposite experience.

Trade-off: very limited nightlife and restaurant variety on the island itself — though day trips to the other Gilis are simple to arrange.`,
      },
      {
        heading: "Comparison at a Glance",
        body: ``,
        table: {
          headers: ["", "Gili Trawangan", "Gili Air", "Gili Meno"],
          rows: [
            ["Size", "~1.5 km across", "~2 km x 1 km", "Smallest of the three"],
            ["Vibe", "Lively, social", "Balanced, relaxed", "Quiet, romantic"],
            ["Nightlife", "Most options, late bars", "Limited, low-key", "Minimal"],
            ["Accommodation", "Widest range", "Good range", "Fewest options"],
            ["Diving / snorkeling", "Most dive shops", "Good snorkeling", "Underwater statues, calm reefs"],
            ["Best for", "First-timers, groups, divers", "Couples, longer stays", "Honeymoons, total quiet"],
          ],
        },
      },
      {
        heading: "Can You Visit All Three in One Trip?",
        body: `Yes — many travelers base themselves on one island and take a short boat over to the others for a half-day visit, since the crossings between islands run around 10–15 minutes. If your schedule allows it, splitting a few nights between two islands (for example, a lively stretch on Trawangan followed by a quiet finish on Meno) is a popular way to get the best of both.`,
      },
    ],
    faqs: [
      {
        q: "Which Gili Island is best for first-time visitors?",
        a: "Gili Trawangan is usually recommended as a first base because of its wider range of accommodation, restaurants, and easy onward transport.",
      },
      {
        q: "Which Gili Island is quietest?",
        a: "Gili Meno, by a clear margin — it has the fewest hotels and the least nightlife of the three.",
      },
      {
        q: "How do I get between the Gili Islands?",
        a: "Public boats and chartered fast boats run between all three islands, with crossings typically taking 10–15 minutes.",
      },
      {
        q: "Is Gili Trawangan still a party island?",
        a: "It has more nightlife than Gili Air or Gili Meno, but it also has plenty of quiet beaches, calm restaurants, and daytime snorkeling if you're not looking for a party trip.",
      },
    ],
    closing:
      "My Day Gili runs fast boat transfers and day trips to all three Gili Islands from Bali. Get in touch with our team to plan your route.",
    related: { label: "Book a Gili Islands transfer", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 03
  {
    slug: "how-to-avoid-fast-boat-scams-padang-bai",
    title: "How to Avoid Fast Boat Scams in Padang Bai",
    category: "Travel Tips",
    metaTitle: "How to Avoid Fast Boat Scams in Padang Bai",
    excerpt:
      "Practical tips for booking a safe, legitimate fast boat ticket from Padang Bai Harbour, and how to spot the most common scams before they cost you.",
    keyword: "padang bai fast boat scams",
    heroImage: "/mydaygili/harbour-boats.jpg",
    heroAlt: "Boats waiting at a Bali harbour",
    publishedAt: "2026-07-03",
    readMin: 6,
    author: AUTHOR,
    lead: "Padang Bai Harbour is the main gateway from Bali to the Gili Islands and Lombok, and it's also where most fast boat scam stories originate. The good news: the scams are predictable and easy to avoid once you know what to look for.",
    sections: [
      {
        heading: `The Most Common Scam: Fake "Staff" at the Port`,
        body: `The single most reported problem at Padang Bai is people posing as boat company staff who approach travelers before they reach the official ticket counter. They may wear a shirt similar to a legitimate operator's uniform, offer to "help" with your ticket, or ask to hold your ticket or boarding pass "to check you in."

Never hand your ticket, boarding pass, or cash to anyone outside the official ticket office. Legitimate staff will not need to take your ticket away from you before boarding. If someone intercepts you before you've reached the counter with the operator's proper signage, walk past them and go directly to the official office.`,
      },
      {
        heading: `The "Shuttle Bus" Bait-and-Switch`,
        body: `Many tickets are sold with a bundled hotel transfer or shuttle service. A recurring complaint is travelers being told the transfer takes 1–1.5 hours, then finding themselves on a shared shuttle making multiple stops that stretches the trip to 3 hours or more — or being redirected to an expensive private taxi at the last minute.

How to protect yourself:

- Ask specifically whether your transfer is private or shared before you pay.
- Get the estimated transfer time in writing (a screenshot of a chat message is enough).
- If you're pressured into an expensive "upgrade" to a taxi at the port, it's reasonable to decline and arrange your own transport (a ride-hailing app is usually far cheaper).`,
      },
      {
        heading: "Overpriced Walk-Up Tickets",
        body: `Buying a ticket in person at the port, on the day, is where prices vary the most — some travelers report paying two to three times what others paid for the same route. Prices quoted to different travelers standing at the same counter can differ significantly depending on how the sale is negotiated.

How to protect yourself:

- Book online in advance through the operator's official website wherever possible. Online prices are typically fixed and transparent.
- If you must book at the port, ask a couple of different counters for their price before committing, and don't be afraid to negotiate.`,
      },
      {
        heading: "Vendors Swarming the Boat on Arrival",
        body: `At Gili and Lombok ports, it's common for a crowd of unofficial "helpers" to approach arriving boats claiming to represent the company you booked with, offering transfers or accommodation. Some will attempt to take your ticket directly through the boat window before you've even disembarked.

How to protect yourself:

- Wait until you're fully off the boat and hold onto your ticket and belongings.
- Only follow staff who can point you to a proper, signed company office — not someone in plain clothes claiming affiliation.
- If in doubt, ask boat crew (not shore-side touts) which office is legitimate.`,
      },
      {
        heading: "General Rules for a Smooth Departure",
        body: `1. Book with an operator that has a clearly signed, permanent office at Padang Bai — avoid anyone selling tickets from a stall with no fixed branding.
2. Arrive at least an hour before departure so you have time to check in calmly rather than rushing and being an easier target for touts.
3. Carry small cash for harbour taxes, which are separate from your ticket and paid at checkpoints.
4. Keep your ticket and boarding pass with you at all times until a uniformed staff member scans or checks it at the boarding gate itself.
5. Read recent reviews of your chosen operator before booking — patterns of complaints (or praise) tend to repeat consistently per company.`,
      },
    ],
    faqs: [
      {
        q: "Is Padang Bai Harbour safe to travel through?",
        a: "Yes — thousands of travelers pass through daily without issue. The scams that do occur are opportunistic and avoidable if you stick to official counters and keep hold of your documents.",
      },
      {
        q: "Should I book my fast boat ticket online or at the port?",
        a: "Booking online in advance is generally the safer and more transparent option, since prices are fixed and you have a confirmation record.",
      },
      {
        q: "What should I do if someone tries to take my ticket?",
        a: "Politely but firmly refuse and walk to the official ticket office or boarding gate yourself. Do not hand your ticket to anyone who isn't checking you in at the actual boarding point.",
      },
    ],
    closing:
      "My Day Gili operates from a fixed office with transparent pricing. If you're unsure about a booking, our team is happy to confirm details before you travel.",
    related: { label: "Book with a fixed-office operator", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 04
  {
    slug: "bali-to-lombok-fast-boat-complete-guide",
    title: "Bali to Lombok by Fast Boat: Complete Travel Guide",
    category: "Fast Boat",
    metaTitle: "Bali to Lombok by Fast Boat: Complete Travel Guide",
    excerpt:
      "Everything you need to know about crossing from Bali to Lombok by fast ferry, including harbours, routes, crossing times, and what to budget.",
    keyword: "bali to lombok fast boat",
    heroImage: "/mydaygili/sea-crossing.jpg",
    heroAlt: "Boat crossing open water between Bali and Lombok",
    publishedAt: "2026-06-26",
    readMin: 7,
    author: AUTHOR,
    lead: "Crossing the Lombok Strait by fast boat is the quickest way to get from Bali to Lombok, cutting a journey that takes 4–6 hours by public ferry down to roughly 1.5–3 hours depending on the route. Here's how the routes, harbours, and timing all fit together.",
    sections: [
      {
        heading: "Which Harbours Connect Bali and Lombok?",
        body: `Several Bali harbours run fast boat services to Lombok, each landing at a different point on the Lombok side:

- Padang Bai → Bangsal — the classic route, and usually the one with the shortest crossing time, typically around 2–2.5 hours. Bangsal is the main gateway for onward travel to the Gili Islands.
- Padang Bai → Senggigi — a more recently established direct route that lands you straight into Lombok's main west-coast resort strip, cutting out the need for onward ground transport if you're staying in Senggigi. Crossing time is roughly 1.5–3 hours.
- Sanur → Bangsal — a longer crossing, generally 4.5–5 hours, popular with travelers based in South Bali who prefer the more convenient Sanur departure point over the drive to Padang Bai.
- Serangan → Bangsal — another South Bali departure option, with a similar crossing profile to the Sanur route.

If your priority is the shortest possible crossing, Padang Bai is the better departure point. If you're staying in South Bali and don't want the 1.5-hour drive out to Padang Bai, sailing from Sanur or Serangan trades a longer boat ride for a shorter road trip.`,
      },
      {
        heading: "How Long Does the Crossing Take?",
        body: `Crossing times vary meaningfully by operator, route, and sea conditions:

- Padang Bai to Senggigi: roughly 1.5 to 2 hours on the more direct services.
- Padang Bai to Bangsal: roughly 2 to 2.5 hours, sometimes longer if the boat stops at the Gili Islands first to drop passengers.
- Sanur/Serangan to Bangsal: roughly 4.5 to 5 hours.

Always check your specific operator's stated crossing time when booking, as some routes include a stop at the Gili Islands that adds time.`,
      },
      {
        heading: "What Does It Cost?",
        body: `Fares vary by operator, route, and season. As a rough guide, one-way fares from Padang Bai tend to start from around IDR 395,000, while Sanur departures often start somewhat higher due to the longer crossing. Treat these as a starting reference rather than a fixed price — always confirm the current fare when you book.`,
      },
      {
        heading: "Is There a Cheaper Option?",
        body: `Yes. A public slow ferry runs between Padang Bai and Lembar Harbour in southwest Lombok roughly every hour, 24/7, and is by far the most budget-friendly way to cross. The trade-off is time: this crossing takes 4 to 6 hours, and Lembar is located about 90 minutes south of Senggigi or Bangsal, so you'll need additional ground transport on arrival. It's a solid backup option if bad weather grounds the smaller fast boats.`,
      },
      {
        heading: "Choosing the Right Route for Your Destination",
        body: `- Heading to the Gili Islands or North Lombok? Take a fast boat to Bangsal — it's the main departure point for onward boats to Gili Trawangan, Gili Air, and Gili Meno.
- Staying in Senggigi or West Lombok? The direct Padang Bai–Senggigi route drops you right where you need to be, without an onward transfer.
- Heading to Kuta Lombok or Mandalika? Check whether your operator serves Mandalika directly, as some newer routes are reducing the need for a long overland transfer from Senggigi or Bangsal.`,
      },
      {
        heading: "Booking & Boarding Tips",
        body: `1. Most fast boats depart in the morning, generally between 8:00 AM and 1:00 PM, so plan your onward Lombok arrangements around an afternoon arrival.
2. Book in advance, especially in peak season, since morning departures with the shortest crossing times fill up first.
3. Bring motion sickness precautions if you're prone to it — the Lombok Strait can be choppy, especially outside the dry season.
4. Expect to pay small harbour taxes in cash at departure and arrival, separate from your ticket price.`,
      },
    ],
    faqs: [
      {
        q: "What's the fastest way from Bali to Lombok?",
        a: "A fast boat from Padang Bai to Senggigi typically offers the shortest crossing time, often under 2 hours.",
      },
      {
        q: "Can I do a Bali to Lombok day trip?",
        a: "Yes, it's possible with an early departure, though most travelers treat the crossing as the start of a longer Lombok stay rather than a same-day round trip.",
      },
      {
        q: "Is the fast boat safe in rough weather?",
        a: "Fast boats can be cancelled or delayed in poor sea conditions. The public slow ferry to Lembar runs 24/7 and is a reliable backup if fast boats are grounded.",
      },
      {
        q: "Do I need a visa or ID check between Bali and Lombok?",
        a: "No — both islands are part of Indonesia, so it's a domestic crossing with no immigration formalities.",
      },
    ],
    closing:
      "My Day Gili arranges fast boat tickets and transfers between Bali and Lombok. Contact our team for current schedules and route recommendations based on where you're staying.",
    related: { label: "See Bali–Lombok routes", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 05
  {
    slug: "nusa-penida-day-trip-what-to-expect",
    title: "Nusa Penida Day Trip: What to Expect",
    category: "Nusa Penida",
    metaTitle: "Nusa Penida Day Trip: What to Expect",
    excerpt:
      "A first-timer's guide to a one-day snorkeling and sightseeing trip to Nusa Penida, covering the boat crossing, top sights, and a realistic timeline.",
    keyword: "nusa penida day trip",
    heroImage: "/mydaygili/penida-kelingking.jpg",
    heroAlt: "Kelingking Beach cliff and turquoise bay on Nusa Penida",
    publishedAt: "2026-06-19",
    readMin: 8,
    author: AUTHOR,
    lead: "Nusa Penida sits just off Bali's southeast coast and has become one of the island's most photographed destinations, thanks to its dramatic limestone cliffs, turquoise water, and a coastline that looks almost unreal in photos. A day trip is entirely doable, but it's a long, ambitious day — here's exactly what to expect.",
    sections: [
      {
        heading: "Getting There",
        body: `Nusa Penida is reached by boat from Bali, most commonly from Sanur, with the crossing taking roughly 30 to 45 minutes depending on the operator and sea conditions. Most day tours depart early, with check-in required around an hour before boarding — so an early alarm is part of the deal.`,
      },
      {
        heading: "Is Nusa Penida Worth a Day Trip?",
        body: `Yes, with the right expectations. The island is larger than it looks on the map, the roads are rough and winding, and you're working against the clock to catch your return boat — so a day trip means covering the highlights efficiently rather than seeing everything. Most first-timers focus on the west coast, which holds the island's most iconic sights within reasonable driving distance of each other.`,
      },
      {
        heading: "A Typical Day Trip Itinerary",
        body: `While exact timing depends on your tour operator and tide conditions, a standard one-day West Nusa Penida itinerary looks something like this:

1. Early morning departure from Sanur, arriving at Nusa Penida's Banjar Nyuh port by mid-morning.
2. Kelingking Beach (T-Rex Viewpoint) — the island's most famous spot, named for a cliff formation that resembles a dinosaur bending toward the ocean. The main viewpoint is a short walk from the parking area; hiking down to the beach itself is steep, exposed, and takes roughly 45–60 minutes each way, so many day-trippers stick to the viewpoint to save time.
3. Broken Beach (Pasih Uug) — a dramatic circular cove formed by a collapsed cliff, with a natural stone arch where the ocean flows in and out. This is a photo stop only — you cannot access the water here, and the drop from the rim is higher and rougher than it looks.
4. Angel's Billabong — a striking natural rock pool next to the ocean. Swimming is possible only when conditions and tides allow, and rogue waves have swept people out to sea here in the past, so always follow posted signs and local guidance rather than entering the pool unsupervised.
5. Lunch at a local warung, usually not included in the tour price.
6. Optional snorkeling — if your day trip includes it, boats typically visit two to three sites such as Manta Bay, Gamat Bay, Crystal Bay, or Turtle Point, with roughly two hours in the water.
7. Return boat to Bali, usually mid-to-late afternoon.`,
      },
      {
        heading: "What to Bring",
        body: `- Comfortable, closed-toe shoes — the paths at Broken Beach, Angel's Billabong, and the Kelingking hike are uneven and can be slippery.
- Sun protection — there's very little shade at most viewpoints, and the day involves long stretches outdoors.
- Cash — for lunch, entrance fees at individual sites, and any drinks or souvenirs along the way, since card payment is rare outside the main towns.
- A dry bag or waterproof phone case if you're snorkeling.
- Motion sickness remedy if you're prone to seasickness, since both the boat crossing and Nusa Penida's winding roads can be rough.`,
      },
      {
        heading: "Safety Notes",
        body: `- Angel's Billabong looks calmer than it is — rogue waves have caused fatalities here, and there are now signs advising against entering the pool. Treat any local warnings as final.
- Broken Beach has no barriers in places — stay well back from the edge for photos.
- The Kelingking hike down to the beach is genuinely strenuous, with loose gravel sections; wear proper footwear and carry water.
- Roads on Nusa Penida are narrow, unpaved in places, and often shared with scooters and local traffic — if you're self-driving a scooter, go slowly and be aware this is a common source of tourist injuries in the area.`,
      },
      {
        heading: "Is One Day Enough?",
        body: `For the west coast highlights (Kelingking, Broken Beach, Angel's Billabong, and optionally Crystal Bay or snorkeling), one day is workable, especially with a private driver who knows the route and timing. If you also want to see the island's east side (Atuh Beach, Diamond Beach, Rumah Pohon) or want a slower pace without racing the return boat, an overnight stay gives you far more breathing room.`,
      },
    ],
    faqs: [
      {
        q: "How long does the boat to Nusa Penida take?",
        a: "Around 30 to 45 minutes from Sanur, depending on the operator and sea conditions.",
      },
      {
        q: "Can you see all of Nusa Penida in one day?",
        a: "Realistically, no — most day trips focus on the west coast highlights. Seeing the east side as well usually requires an overnight stay.",
      },
      {
        q: "Is Angel's Billabong safe to swim in?",
        a: "Only under the right tide conditions, and even then caution is essential — rogue waves have occurred here. Always follow posted warnings and local guidance.",
      },
      {
        q: "Do I need a guide or can I explore independently?",
        a: "Both are possible. A driver-guide who knows the roads, tides, and timing makes a day trip significantly more efficient, especially given how spread out the sights are.",
      },
    ],
    closing:
      "My Day Gili runs day trips to Nusa Penida from Bali, including transport and a planned itinerary. Get in touch with our team to check availability.",
    related: { label: "See Nusa Penida day trips", href: "/mydaygili/day-trips" },
  },

  // ---------------------------------------------------------- 06
  {
    slug: "gili-islands-day-trip-vs-overnight-stay",
    title: "Gili Islands Day Trip vs Overnight Stay: Which Is Better?",
    category: "Gili Islands",
    metaTitle: "Gili Islands Day Trip vs Overnight Stay: Which Is Better?",
    excerpt:
      "Weighing the pros and cons of a day trip to the Gili Islands versus staying overnight, so you can decide what fits your Bali itinerary.",
    keyword: "gili islands day trip",
    heroImage: "/mydaygili/gili-quiet-beach.jpg",
    heroAlt: "Quiet island beach with wooden boats and calm shallows",
    publishedAt: "2026-06-12",
    readMin: 6,
    author: AUTHOR,
    lead: "The Gili Islands are close enough to Bali that a day trip is genuinely possible — but is it the right call, or are you better off staying at least one night? Here's how the two options actually compare.",
    sections: [
      {
        heading: "The Case for a Day Trip",
        body: `A day trip works well if you're short on time or already have accommodation booked elsewhere in Bali that you don't want to give up for a night.

Pros:

- No need to pack, check out, or arrange overnight accommodation on the Gilis.
- You still get to experience the turquoise water, snorkeling, and car-free island atmosphere.
- It's an easy way to sample the Gilis if you're unsure whether you'll like the laid-back island pace.
- Works well if your Bali itinerary is already tightly scheduled around other regions.

Cons:

- The fast boat crossing (roughly 1.5–2 hours each way from Padang Bai) eats a significant chunk of your day, leaving a shorter window actually on the island.
- You'll likely only have time to see one island properly, rather than exploring more than one at a leisurely pace.
- You miss the Gilis' best moments — sunrise on the beach, sunset without a boat schedule pressing on you, and the change in atmosphere once day-trippers leave in the late afternoon.
- If sea conditions delay your return boat, a day trip leaves very little buffer.`,
      },
      {
        heading: "The Case for an Overnight Stay",
        body: `Pros:

- You get to experience the islands at their quietest — early morning and after the last day-tripper boats have left, which is when many visitors say the Gilis feel most like the "paradise" reputation they're known for.
- More time to properly explore multiple snorkeling spots, or hop between islands (Trawangan, Air, and Meno are only 10–15 minutes apart by boat).
- No rush — you're not watching the clock for a return crossing.
- You get to experience each island's distinct personality properly, rather than a rushed few hours on one.

Cons:

- Requires packing and organizing accommodation, which adds planning overhead.
- Slightly higher overall cost once you factor in a night's stay.
- If you're short on total trip days, an overnight Gili stop takes a bigger bite out of your Bali itinerary.`,
      },
      {
        heading: "So Which Should You Choose?",
        body: `Choose a day trip if:

- You have limited time in Bali and want a taste of the Gilis without restructuring your itinerary.
- You're mainly interested in snorkeling and beach time rather than the islands' atmosphere after dark.
- You're traveling with a group whose schedule doesn't allow flexibility.

Choose an overnight stay (or longer) if:

- You want to properly experience the car-free island pace, not just a few rushed hours.
- You're interested in diving, which often requires more time than a day trip allows.
- You want to visit more than one Gili Island without feeling rushed.
- You value quiet mornings and sunsets over squeezing in maximum sightseeing per day.`,
      },
      {
        heading: "A Middle Ground: One Night, Two Islands",
        body: `If you can spare it, a popular compromise is one night on Gili Trawangan or Gili Air, combined with a half-day boat hop to a second island before heading back to Bali. This gives you the calm early-morning and late-evening experience without committing multiple days, while still letting you compare two islands' atmospheres directly.`,
      },
    ],
    faqs: [
      {
        q: "Can you do a Gili Islands day trip from Bali?",
        a: "Yes — a fast boat from Padang Bai takes roughly 1.5–2 hours each way, leaving a workable but limited window on the island itself.",
      },
      {
        q: "Is one night enough on the Gili Islands?",
        a: "One night gives you a noticeably better experience than a day trip, particularly for sunrise, sunset, and the quieter evening atmosphere, though a longer stay is better if you want to explore more than one island.",
      },
      {
        q: "Which Gili Island is best for a day trip?",
        a: "Gili Trawangan is the most practical choice for a day trip, since it has the most infrastructure and easiest connections back to Bali.",
      },
      {
        q: "Is the boat crossing worth it for just a few hours on the island?",
        a: "It depends on your priorities — if snorkeling and photos are the goal, yes. If you want to experience the islands' atmosphere fully, an overnight stay is a better use of the crossing time.",
      },
    ],
    closing:
      "My Day Gili offers both day trips and fast boat transfers to the Gili Islands, so you can choose the option that fits your schedule. Contact our team to plan your trip.",
    related: { label: "See Gili Islands day trips", href: "/mydaygili/day-trips" },
  },

  // ---------------------------------------------------------- 07
  {
    slug: "harbour-tax-hidden-fees-gili-islands",
    title: "Harbour Tax & Hidden Fees When Traveling to the Gili Islands",
    category: "Travel Tips",
    metaTitle: "Harbour Tax & Hidden Fees When Traveling to the Gili Islands",
    excerpt:
      "A breakdown of the extra fees travelers should budget for beyond the boat ticket price when crossing from Bali to the Gili Islands.",
    keyword: "gili islands harbour tax",
    heroImage: "/mydaygili/rupiah-cash.jpg",
    heroAlt: "Indonesian rupiah banknotes in small denominations",
    publishedAt: "2026-06-05",
    readMin: 5,
    author: AUTHOR,
    lead: "Your fast boat ticket price is rarely the full cost of the journey. Several small government and local fees are collected separately, in cash, at different points along the route. None of them are large individually, but it's worth knowing about them in advance so you're not caught without cash at the port.",
    sections: [
      {
        heading: "Why These Fees Exist",
        body: `Harbour and village taxes at Padang Bai, Gili Trawangan, Gili Air, and Gili Meno are locally administered fees, separate from your boat ticket. They typically fund port infrastructure and local village administration. Because they're set locally rather than by the boat operator, the exact amount can vary somewhat between checkpoints and does change over time — so treat the figures below as a general planning guide rather than a fixed price, and always keep some flexibility in your cash budget.`,
      },
      {
        heading: "What to Budget For",
        body: `Based on current traveler reports and operator information, expect small cash fees at each of these points:

- Departure from Padang Bai — a harbour or village tax, generally in the range of IDR 10,000–30,000 per person, paid before boarding.
- Arrival at the Gili Islands — a separate entry or "tourist" fee, generally in the range of IDR 10,000–20,000 per person, collected on arrival.
- Return leg — the same fees are typically charged again in the opposite direction (departure fee from the Gilis, arrival fee back at Padang Bai), so double the above for a round trip.
- Gili Meno shuttle boat — if you're traveling to or from Gili Meno, larger fast boats often can't dock directly at the beach to protect the coral reef, so a smaller shuttle boat may be used for the final stretch, sometimes with its own small fee.

As a rough round-trip planning figure, budgeting IDR 50,000–100,000 per person in cash for harbour taxes and entry fees (on top of your ticket) is a sensible cushion, though your actual total may come in lower.`,
      },
      {
        heading: "Other Costs That Aren't Included in Your Ticket",
        body: `- Hotel transfer to/from the harbour — often sold separately or as an add-on package.
- Inter-island transport once you're on the Gilis — public ferries between islands typically cost in the range of IDR 35,000–50,000 per person one-way, while chartered fast boats between islands cost more, often in the range of IDR 100,000–150,000 per person.
- Tourist attraction entrance fees on land, where applicable — generally modest, in the range of roughly IDR 10,000–25,000 per site.
- Bali's tourism levy — foreign visitors to Bali pay a one-time entry tourism levy on arrival to the island (separate from harbour taxes, and not required again when moving between Bali and the Gilis or Nusa Penida).`,
      },
      {
        heading: "Tips for Managing These Costs",
        body: `1. Always carry cash in small denominations. Card payment is rarely available at ports, and vendors often can't break large notes.
2. Ask your operator upfront exactly what's included in your ticket price and what isn't — reputable companies will tell you clearly.
3. Keep your boarding pass and receipts until you're fully clear of the port, in case you're asked to show proof of payment.
4. Don't assume "all-inclusive" packages cover everything — confirm whether harbour tax is bundled in or paid separately on the day.`,
      },
    ],
    faqs: [
      {
        q: "Are harbour taxes included in my fast boat ticket price?",
        a: "Usually not. They're collected separately in cash, at the port, both at departure and arrival.",
      },
      {
        q: "How much should I budget for fees beyond my ticket?",
        a: "As a rough guide, IDR 50,000–100,000 per person round trip covers most harbour tax and entry fee scenarios, though it's worth carrying a bit extra.",
      },
      {
        q: "Can I pay harbour taxes by card?",
        a: "No — these fees are cash-only at the port.",
      },
      {
        q: "Do I pay the Bali tourism levy again when I return from the Gilis?",
        a: "No — the Bali entry levy is a one-time fee on arrival to Bali and isn't charged again for onward trips to the Gilis or Nusa Penida.",
      },
    ],
    closing:
      "My Day Gili is upfront about what's included in every fast boat and day trip package. Contact our team if you'd like a clear cost breakdown before you book.",
    related: { label: "See what's included in our tickets", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 08
  {
    slug: "best-snorkeling-spots-gili-meno",
    title: "Best Snorkeling Spots Around Gili Meno",
    category: "Gili Islands",
    metaTitle: "Best Snorkeling Spots Around Gili Meno",
    excerpt:
      "A guide to the underwater statues and reef spots near Gili Meno, including depth, location, and tips for the best visibility.",
    keyword: "snorkeling gili meno",
    heroImage: "/mydaygili/gili-meno-statues.jpg",
    heroAlt: "Snorkeller above The Nest underwater statues off Gili Meno",
    publishedAt: "2026-05-29",
    readMin: 6,
    author: AUTHOR,
    lead: "Gili Meno is the quietest of the three Gili Islands, and that quiet extends underwater too — its reefs and snorkeling sites are calmer and less crowded than Trawangan's busier spots. Here are the standout locations to snorkel around the island.",
    sections: [
      {
        heading: "The Nest (Gili Meno Underwater Statues)",
        body: `The best-known snorkeling attraction on Gili Meno is "The Nest", an underwater sculpture installation created by British artist Jason deCaires Taylor and installed in 2017. It consists of 48 life-size human figures arranged in a circle on the sandy seabed, designed to act as an artificial reef base that corals gradually grow onto over time.

- Location: off Gili Meno's west coast, near the BASK resort, roughly 50–100 metres offshore.
- Depth: approximately 3 to 6 metres, making it accessible to confident snorkelers as well as divers — some visitors are able to see the statues clearly from the surface on calm, clear days.
- How to reach it: you can swim directly out from the beach near BASK if you're staying close by, or join a snorkeling boat trip that stops at the site (common if you're staying on Trawangan or Air and visiting for the day).
- Best time to visit: early morning, ideally close to low tide, when the water tends to be calmest and clearest and the site is least crowded — it gets busy from around mid-morning onward.

Etiquette note: the corals and sponges growing on the statues are fragile. Look and photograph, but don't touch or stand on the figures.`,
      },
      {
        heading: "The Surrounding Reef",
        body: `Beyond the statues, Gili Meno's coastline offers snorkeling almost all the way around the island, with a healthy coral reef running along much of the shore. A typical entry from the beach takes you across a stretch of sandy shallows and seagrass, then over coral in slightly deeper water, before reaching a reef drop-off further out. This broader area is known for:

- Sea turtles — both green sea turtles and hawksbill turtles are regularly spotted along Gili Meno's reef.
- Turtle Point, on the island's northeast side, is a commonly cited spot for turtle sightings, though it tends to attract more boat traffic than the statue site.`,
      },
      {
        heading: "Tips for a Good Snorkeling Session",
        body: `1. Go early. Morning light, calmer water, and fewer boats make a real difference at both the statues and the surrounding reef.
2. Check the tide. Low tide generally offers clearer water and easier access from the beach.
3. Bring your own gear if you can, or confirm rental quality in advance — fit matters more than most people expect for a good experience.
4. Respect the reef and the statues. Avoid standing on coral or the sculptures, and keep sunscreen reef-safe where possible.
5. Watch for boat traffic, particularly around the statues, where snorkeling boats anchor close together during busier hours.`,
      },
      {
        heading: "Do You Need a Guide?",
        body: `Snorkeling at The Nest and along the nearby reef is manageable independently if you're a confident swimmer and staying close to the site, since the water is shallow and calm most days. If you'd rather not navigate on your own, a guided snorkeling trip (either a short local boat trip if you're staying on Gili Meno, or a stop included on a Gili Islands day tour from Bali) takes care of the logistics and often adds a couple of additional reef stops around Gili Air or Gili Trawangan.`,
      },
    ],
    faqs: [
      {
        q: "How deep are the Gili Meno underwater statues?",
        a: "Roughly 3 to 6 metres, making them accessible to snorkelers as well as divers.",
      },
      {
        q: "Where exactly is The Nest located?",
        a: "Off the west coast of Gili Meno, near the BASK resort, around 50–100 metres offshore.",
      },
      {
        q: "Is Gili Meno good for snorkeling compared to Gili Trawangan or Gili Air?",
        a: "Yes — it's generally considered calmer and less crowded, with the added draw of the underwater statue installation, which isn't found on the other two islands.",
      },
      {
        q: "Can beginners snorkel at the Gili Meno statues?",
        a: "Yes, with reasonable swimming confidence — the site is shallow and calm on most days, though joining a guided trip is a good option if you're less experienced in open water.",
      },
    ],
    closing:
      "My Day Gili's Gili Islands trips can include a stop at Gili Meno's snorkeling sites. Get in touch with our team to add this to your itinerary.",
    related: { label: "See Gili Islands day trips", href: "/mydaygili/day-trips" },
  },

  // ---------------------------------------------------------- 09
  {
    slug: "unique-bali-day-tours-beyond-tourist-route",
    title: "Unique Bali Day Tours Beyond the Usual Tourist Route",
    category: "Bali Tour",
    metaTitle: "Unique Bali Day Tours Beyond the Usual Tourist Route",
    excerpt:
      "Ideas for Bali day tours focused on culture, textiles, and hidden destinations beyond Ubud's rice terraces and the usual south Bali route.",
    keyword: "unique bali day tour",
    heroImage: "/mydaygili/bali-rice-terrace.jpg",
    heroAlt: "Terraced rice fields and palms in the Bali highlands",
    publishedAt: "2026-05-22",
    readMin: 7,
    author: AUTHOR,
    lead: "Ubud's rice terraces, Uluwatu's cliffside temple, and Tanah Lot at sunset are Bali classics for a reason — but if you've done the standard route before, or simply want to see a different side of the island, there's a lot more to explore. Here are day trip ideas that go beyond the well-worn path.",
    sections: [
      {
        heading: "Sidemen: Weaving Villages and Quiet Rice Fields",
        body: `Tucked in East Bali beneath Mount Agung, Sidemen is known for its songket and ikat weaving traditions, where local artisans still hand-weave intricate textiles using techniques passed down through generations. The valley's rice terraces are less visited than Tegallalang's, which means quieter walking trails with equally striking views. It's a strong choice if you want a cultural, slower-paced alternative to Ubud's more crowded terraces.`,
      },
      {
        heading: "Tenganan: An Ancient Bali Aga Village",
        body: `Near Sidemen and Candidasa, Tenganan is one of Bali's oldest villages, home to the Bali Aga — descendants of Bali's pre-Hindu Majapahit-era inhabitants, who maintain distinct customs, architecture, and social structures from the rest of the island. The village is also known for its rare double-ikat weaving technique, found in very few other places in the world. It's a good stop for travelers interested in Bali's cultural history beyond temple visits.`,
      },
      {
        heading: "Jembrana: Buffalo Racing and West Bali Traditions",
        body: `Jembrana, in West Bali, is far less touristed than the island's south and center. It's known for Makepung, traditional buffalo races where pairs of decorated water buffalo are driven through fields by local farmers — a deeply rooted agricultural tradition rather than a tourist performance. The district also has rice terraces and coastal areas that see a fraction of the visitor traffic of Ubud or Canggu.`,
      },
      {
        heading: "Amed: A Submerged Temple Underwater",
        body: `On Bali's northeast coast, Amed is better known among divers than day-trippers, but it holds one of the island's most unusual sights: a submerged Buddha temple, where statues and shrine structures have been gradually claimed by coral and marine life underwater. It's an offbeat alternative to Bali's land-based temples, and a good reason to pair a day trip with snorkeling or diving.`,
      },
      {
        heading: "Tirta Gangga: A Royal Water Palace",
        body: `Also in East Bali, Tirta Gangga is a former royal water palace with ornamental pools, fountains, and stepping stones across koi-filled ponds, set against a backdrop of rice terraces. It draws a fraction of the crowds of Ubud's palace sites, making it a peaceful stop for photography and a slower pace.`,
      },
      {
        heading: "Penglipuran Village",
        body: `Penglipuran, in Bangli regency, is a traditional Balinese village known for its uniform, well-preserved architecture and car-free main street lined with identical family compounds. It offers a look at traditional Balinese community layout and daily life, and is often combined with nearby temple visits like Tirta Empul or Gunung Kawi for a fuller East Bali cultural day.`,
      },
      {
        heading: "Bedugul and Lake Bratan",
        body: `North of Ubud, the Bedugul highlands offer a cooler climate, coffee and orange plantations, and Lake Bratan, home to the iconic Ulun Danu Beratan Temple. A scenic drive or cycle around the lake takes you past hidden waterfalls and quiet mountain villages — a good option if you want Bali's cooler, greener side rather than another beach or rice-terrace stop.`,
      },
      {
        heading: "How to Build a Unique Day Tour",
        body: `Most of these destinations sit in East, West, or Central-North Bali, away from the well-covered Ubud–Uluwatu–Canggu triangle, so they work best with a private driver who can plan an efficient route rather than trying to self-navigate between several rural areas in one day. Pairing two or three of these stops (for example, Sidemen weaving + Tenganan village + Tirta Gangga, all in East Bali) makes for a full, culturally rich day without retracing the standard tourist route.`,
      },
    ],
    faqs: [
      {
        q: "What's a good alternative to Ubud's rice terraces?",
        a: "Sidemen, in East Bali, offers similarly scenic rice terraces with fewer crowds, plus traditional weaving villages nearby.",
      },
      {
        q: "Are these destinations easy to reach independently?",
        a: "They're accessible by private car or scooter, but a driver familiar with the routes makes for a smoother, more efficient day given how spread out some of these sites are.",
      },
      {
        q: "Can I combine several of these stops in one day?",
        a: "Yes — destinations within the same region (for example, Sidemen, Tenganan, and Tirta Gangga in East Bali) can realistically be combined into a single day tour.",
      },
      {
        q: "Is Amed worth visiting just for the submerged temple?",
        a: "It's best combined with snorkeling or diving more broadly, since Amed's underwater sites and relaxed coastal atmosphere make for a fuller day beyond the temple alone.",
      },
    ],
    closing:
      "My Day Gili arranges custom Bali day tours beyond the standard tourist circuit. Contact our team to build an itinerary around East or West Bali's cultural highlights.",
    related: { label: "See our Bali tours", href: "/mydaygili/bali-tours" },
  },

  // ---------------------------------------------------------- 10
  {
    slug: "padang-bai-harbour-complete-guide",
    title: "Padang Bai Harbour: Complete Guide for First-Time Travelers",
    category: "Travel Tips",
    metaTitle: "Padang Bai Harbour: Complete Guide for First-Time Travelers",
    excerpt:
      "What to expect at Padang Bai Harbour, from check-in to boarding your fast boat, including fees, timing, and tips for a smooth departure.",
    keyword: "padang bai harbour guide",
    heroImage: "/mydaygili/padangbai-harbour.jpg",
    heroAlt: "Wooden boats moored along the pier at a Bali harbour",
    publishedAt: "2026-05-15",
    readMin: 6,
    author: AUTHOR,
    lead: "Padang Bai Harbour, on Bali's east coast, is the main departure point for fast boats to the Gili Islands, Lombok, and (via a separate port area) Nusa Penida and Nusa Lembongan. If it's your first time passing through, here's exactly what to expect.",
    sections: [
      {
        heading: "Getting to Padang Bai",
        body: `Padang Bai is roughly 1.5 hours by car from the Kuta/Seminyak/Canggu area, and around 1 hour from Ubud. Most fast boat operators offer a hotel transfer as part of your ticket or as an add-on — check whether yours is a private transfer or a shared shuttle with multiple stops, since this affects how much buffer time you should build in.`,
      },
      {
        heading: "When to Arrive",
        body: `Plan to arrive at the harbour at least 60 minutes before your boat's scheduled departure. This gives you time to:

1. Find your operator's ticket office (several companies operate out of Padang Bai, each with its own counter or office).
2. Check in and receive your boarding pass or lanyard.
3. Pay the harbour tax and any entry fees in cash.
4. Walk to the correct pier and wait for boarding.

Boats can fill up and depart close to schedule, so arriving late risks missing your sailing.`,
      },
      {
        heading: "What Happens at Check-In",
        body: `At the ticket office, you'll typically exchange your printed or digital ticket for a paper slip or boarding pass, sometimes along with a lanyard showing your boat number. Keep this until you've boarded — it's your proof of a valid ticket, and if you're doing a round trip, you may need to keep a portion of it for your return check-in on the other end.`,
      },
      {
        heading: "Fees You'll Pay at the Port",
        body: `Your ticket price generally doesn't include everything. At Padang Bai, expect to pay a small harbour or village tax in cash, typically in the range of IDR 10,000–30,000 per person, separate from your boat ticket. A further entry fee is usually collected on arrival at your destination island. Bring small denominations, as vendors and counters often can't break large notes.`,
      },
      {
        heading: "Boarding Your Boat",
        body: `When your boat is ready, staff will direct you toward the pier — at Padang Bai, boats generally can't dock directly against a jetty for boarding, so you may need to walk out via a floating dock or be assisted onto the boat by staff. Luggage is typically stowed in a dedicated storage area, while smaller bags with valuables are best kept with you inside the cabin.`,
      },
      {
        heading: "While You Wait",
        body: `If you arrive early, Padang Bai has small local cafés and warungs near the port where you can get a coffee or snack before boarding. It's a working harbour town, so don't expect polished tourist infrastructure — but it's straightforward to navigate once you know your operator's office location.`,
      },
      {
        heading: "Avoiding Common Pitfalls",
        body: `- Don't hand your ticket to anyone who approaches you before you've reached your operator's official counter. Unofficial "helpers" and touts operate around the harbour, and the safest rule is to deal only with staff at a clearly signed, permanent office.
- Confirm your exact pier and operator name before you arrive — several companies run similar-sounding services, and it's easy to walk into the wrong office.
- Double-check what's included in your ticket (transfer, harbour tax, luggage allowance) so there are no surprises at check-in.`,
      },
      {
        heading: "Padang Bai for Nusa Penida and Nusa Lembongan",
        body: `While Padang Bai is best known as the Gili/Lombok departure point, some operators also run boats from the same general harbour area to Nusa Penida and Nusa Lembongan — if that's your destination, double-check you're heading to the correct pier and operator, as it's a separate service from the Gili/Lombok routes.`,
      },
    ],
    faqs: [
      {
        q: "How early should I arrive at Padang Bai Harbour?",
        a: "At least 60 minutes before your scheduled departure, to allow time for check-in, fee payment, and boarding.",
      },
      {
        q: "Do I need cash at Padang Bai Harbour?",
        a: "Yes — harbour taxes and entry fees are paid in cash and are not included in most boat tickets.",
      },
      {
        q: "Can I get a hotel transfer to Padang Bai?",
        a: "Most operators offer this as part of the ticket price or as an add-on. Confirm whether it's a private or shared shuttle before you book.",
      },
      {
        q: "Is Padang Bai Harbour only for Gili Islands and Lombok boats?",
        a: "It's the main departure point for those routes, though some services to Nusa Penida and Nusa Lembongan also operate from the same harbour area — confirm your pier and operator carefully.",
      },
    ],
    closing:
      "My Day Gili operates from a fixed office at Padang Bai with clear check-in support for our travelers. Contact our team if you have questions before your trip.",
    related: { label: "See departures from Padang Bai", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 11
  {
    slug: "best-things-to-do-gili-trawangan",
    title: "Best Things to Do on Gili Trawangan (2026 Guide)",
    category: "Gili Islands",
    metaTitle: "Best Things to Do on Gili Trawangan (2026 Guide)",
    excerpt:
      "From snorkeling and diving to sunset bars and bike rides — here's a complete guide to the best things to do on Gili Trawangan.",
    keyword: "things to do gili trawangan",
    heroImage: "/mydaygili/gili-quiet-beach.jpg",
    heroAlt: "Quiet white-sand beach and clear shallows on a Gili island",
    publishedAt: "2026-07-20",
    readMin: 7,
    author: AUTHOR,
    lead: "Gili Trawangan is the largest and liveliest of the three Gili Islands, and it packs a genuinely wide range of things to do into a strip of land you can walk around in about two hours. Whether you're there for a full day or a few nights, here's what's worth your time.",
    sections: [
      {
        heading: "Snorkel Straight Off the Beach",
        body: `You don't need a boat trip to see coral and fish on Gili Trawangan — several spots along the east coast have reef close enough to reach by swimming out from the sand. The water off the northeast side tends to be calmer and clearer in the morning, before boat traffic picks up. Sea turtles are commonly spotted feeding on seagrass in the shallows, especially early in the day.`,
      },
      {
        heading: "Learn to Dive or Add a Fun Dive",
        body: `Gili Trawangan has the highest concentration of dive shops of any of the three Gili Islands, which makes it a practical base if you're doing a PADI Open Water course or want to slot in a couple of fun dives. Dive sites around the island range from gentle reef slopes suited to beginners to current-driven sites better suited to certified divers. Visibility is generally best in the dry season (April to October).`,
      },
      {
        heading: "Circle the Island by Bicycle",
        body: `Since motorized vehicles are banned on Gili Trawangan, cycling is one of the most popular ways to see the whole coastline in a single outing. A full loop takes roughly 1.5 to 2 hours at an easy pace, passing quiet beaches on the west side, the main strip on the east, and small local neighborhoods inland. Bikes are widely available for rent by the day.`,
      },
      {
        heading: "Watch the Sunset From the West Coast",
        body: `Gili Trawangan's west-facing beaches line up for sunset views over Bali's Mount Agung on clear evenings, and a string of beanbag bars along the sand make this the island's default evening activity. It gets busy — arrive with enough daylight left to find a spot before the sky starts to color.`,
      },
      {
        heading: "Hike (or Golf-Cart) to the Viewpoint",
        body: `An inland hill on the south side of the island — often just called "the viewpoint" — gives a wide outlook over the coastline and neighboring islands. It's a short, uphill walk from the main strip, doable at sunrise or sunset, and a good option if you want a view without a boat.`,
      },
      {
        heading: "Day-Trip to Gili Meno's Underwater Statues",
        body: `A short boat ride (10–15 minutes) gets you to Gili Meno, home to a circle of submerged human statues that's become one of the region's best-known snorkeling and diving attractions. Many travelers based on Trawangan add this as a half-day trip rather than staying overnight on Meno itself.`,
      },
      {
        heading: "Experience the Night Market and Beach Bars",
        body: `Gili Trawangan's main strip comes alive after dark, with beachfront restaurants grilling fresh seafood, night market stalls, and a run of bars that range from chilled to genuinely loud, depending on the night and the venue. This is the one aspect of the island that clearly sets it apart from Gili Air and Gili Meno.`,
      },
      {
        heading: "Try a Cidomo Ride",
        body: `The horse-drawn cidomo cart is Gili Trawangan's other form of local transport (alongside bicycles), and a short ride is as much a novelty experience as a practical one for most visitors — a slower, more old-fashioned way to see a stretch of the island.`,
      },
      {
        heading: "Tips for Getting the Most Out of Gili Trawangan",
        body: `1. Go early for snorkeling and the viewpoint — both are noticeably better before the midday heat and crowds.
2. Rent a bike on your first morning; it's the easiest way to get oriented before deciding where to spend your time.
3. If nightlife isn't your priority, base yourself away from the main strip — the west and south sides of the island are much quieter after dark.
4. Bring reef-safe sunscreen and cash in small denominations, since card payment is limited outside larger restaurants.`,
      },
    ],
    faqs: [
      {
        q: "What is Gili Trawangan best known for?",
        a: "It's best known as the liveliest of the three Gili Islands, with the most restaurants, dive shops, and beach bars, plus easy snorkeling and diving right off the coast.",
      },
      {
        q: "How long do you need on Gili Trawangan?",
        a: "A day trip is enough to snorkel and see the main strip, but at least one night lets you experience sunset, dinner on the beach, and a quieter morning before day-trippers arrive.",
      },
      {
        q: "Is Gili Trawangan good for non-partiers?",
        a: "Yes — the west and south coasts are quiet, and most of the island's daytime activities (snorkeling, diving, cycling, the viewpoint) have nothing to do with nightlife.",
      },
      {
        q: "Do I need a boat to snorkel on Gili Trawangan?",
        a: "No — several spots along the coast are reachable by swimming straight out from the beach, though a boat trip covers more sites, including Gili Meno's statues.",
      },
    ],
    closing:
      "My Day Gili runs fast boat transfers and day trips to Gili Trawangan from Bali. Contact our team on WhatsApp to plan your visit.",
    related: { label: "Book a Gili Trawangan transfer", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 12
  {
    slug: "best-things-to-do-gili-air",
    title: "Best Things to Do on Gili Air (2026 Guide)",
    category: "Gili Islands",
    metaTitle: "Best Things to Do on Gili Air (2026 Guide)",
    excerpt:
      "Snorkeling, yoga, cafés, and quiet beaches — here's a complete guide to the best things to do on Gili Air, the middle Gili Island.",
    keyword: "things to do gili air",
    heroImage: "/mydaygili/trip-slide-04.jpg",
    heroAlt: "Green sea turtle on the reef with a snorkeller in the water above",
    publishedAt: "2026-07-22",
    readMin: 6,
    author: AUTHOR,
    lead: "Gili Air sits between busy Gili Trawangan and quiet Gili Meno, and its list of things to do reflects that balance — enough going on to fill a few days, without the late-night crowds of its bigger neighbor. Here's what's worth doing on the island.",
    sections: [
      {
        heading: "Snorkel the East and South Coasts",
        body: `Gili Air's reef is close to shore in several spots, particularly along the east and south coastlines, where calmer water makes for easy snorkeling straight from the beach. Sea turtles are regularly spotted here, and the coral is generally in better condition than the busiest sections of Gili Trawangan's shoreline.`,
      },
      {
        heading: "Take a Yoga or Wellness Class",
        body: `Gili Air has developed a reputation as the more wellness-oriented of the three islands, with several yoga studios running daily drop-in classes, often at sunrise or sunset. It's a natural complement to the island's slower pace — many visitors build a loose routine around a morning class, beach time, and an early dinner.`,
      },
      {
        heading: "Walk or Cycle the Full Loop",
        body: `A walk or bike ride around Gili Air's coastline takes roughly 1.5 hours at an easy pace, passing local village areas, small guesthouses, and quiet stretches of beach that see far less foot traffic than the main strip near the harbour. Since the island has no motorized vehicles, this is also simply the way most people get around.`,
      },
      {
        heading: "Watch the Sunset From the West Side",
        body: `Gili Air's west-facing beaches offer sunset views with Bali's mountains on the horizon, and — unlike Gili Trawangan's louder scene — the vibe here tends to stay relaxed even as the beach bars fill up in the evening.`,
      },
      {
        heading: "Visit a Local Café for Slow Mornings",
        body: `Gili Air has a noticeably strong café scene for an island its size, with several spots known for good coffee, fresh juice, and all-day breakfast menus. Spending a morning working through a book or journal at a beachfront café is a popular, low-key way to spend a few hours here.`,
      },
      {
        heading: "Day-Trip to Gili Meno or Gili Trawangan",
        body: `Public and chartered boats between the three Gili Islands run frequently, with crossings of around 10–15 minutes, making it easy to base yourself on Gili Air and spend a half-day exploring Meno's underwater statues or Trawangan's wider restaurant and bar scene.`,
      },
      {
        heading: "Snorkel or Dive at Nearby Sites",
        body: `Several dive shops on Gili Air run both diving courses and snorkeling trips to nearby sites, including reef areas shared with Gili Trawangan and Gili Meno. It's a good base for divers who want a quieter island to return to after a day underwater.`,
      },
      {
        heading: "Tips for Getting the Most Out of Gili Air",
        body: `1. Choose accommodation near the harbour if you want easy café and restaurant access, or further along the coast for more quiet.
2. Bring a reusable water bottle — several cafés and guesthouses offer refill stations to cut down on plastic.
3. Morning is the best time for both yoga and snorkeling, before the day heats up.
4. If you want a taste of Gili Trawangan's nightlife without staying there, a short evening boat over and back is easy to arrange.`,
      },
    ],
    faqs: [
      {
        q: "What is Gili Air known for?",
        a: "Gili Air is known as the balanced middle option among the Gili Islands — good snorkeling and a growing yoga and café scene, with a calmer pace than Gili Trawangan.",
      },
      {
        q: "Is Gili Air good for couples?",
        a: "Yes — it's a popular choice for couples who want some activity and a good restaurant scene without full nightlife.",
      },
      {
        q: "Can you snorkel directly from the beach on Gili Air?",
        a: "Yes, several spots along the east and south coasts have reef close enough to reach by swimming out from the sand.",
      },
      {
        q: "How do I get from Gili Air to the other Gili Islands?",
        a: "Public and chartered boats run between all three islands, with crossings typically taking 10–15 minutes.",
      },
    ],
    closing:
      "My Day Gili offers fast boat transfers and day trips that include Gili Air. Get in touch with our team on WhatsApp to plan your route.",
    related: { label: "See Gili Air departures", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 13
  {
    slug: "diving-gili-trawangan-courses-sites",
    title: "Diving in Gili Trawangan: Courses, Sites & What to Expect",
    category: "Gili Islands",
    metaTitle: "Diving in Gili Trawangan: Courses, Sites & What to Expect",
    excerpt:
      "A first-timer's guide to diving around the Gili Islands — dive sites, PADI courses, water conditions, and what a day of diving actually looks like.",
    keyword: "diving gili trawangan",
    heroImage: "/mydaygili/snorkel-coral-garden.jpg",
    heroAlt: "Snorkeller drifting over a coral garden full of reef fish",
    publishedAt: "2026-07-24",
    readMin: 7,
    author: AUTHOR,
    lead: "The Gili Islands are one of Indonesia's more accessible diving destinations — warm, generally calm water, a wide spread of dive shops, and sites suited to everyone from first-timers to experienced divers. Here's what to know before you book.",
    sections: [
      {
        heading: "Why the Gili Islands for Diving",
        body: `The three Gili Islands share a network of dive sites, so a dive shop based on any one of them can typically take you to sites near all three. Conditions are generally gentle compared to more current-heavy dive destinations in Indonesia, which makes the area popular both for certification courses and for relaxed fun diving. Turtles are the signature sighting here — green and hawksbill turtles are seen on the large majority of dives.`,
      },
      {
        heading: "Getting Certified: PADI Open Water",
        body: `Gili Trawangan has the highest concentration of dive shops of the three islands, making it the most practical base for a PADI Open Water course. A standard course runs over 3 to 4 days and combines classroom or e-learning theory, confined-water skills practice, and four open-water dives. Most shops offer package pricing that includes equipment, and many also provide accommodation deals for the duration of the course.`,
      },
      {
        heading: "Fun Diving for Certified Divers",
        body: `If you're already certified, most shops offer two-tank fun dive packages, with sites chosen based on conditions and your experience level. Popular sites in the area include gentle slopes with abundant reef fish and turtles, as well as a few current-driven sites better suited to more experienced divers who want a livelier drift.`,
      },
      {
        heading: "What Water Conditions Are Like",
        body: `Visibility and current vary by season and site:

- Dry season (roughly April to October) generally offers the clearest visibility and calmest conditions, making it the most popular window for both courses and fun diving.
- Wet season (roughly November to March) can bring reduced visibility and choppier surface conditions, though diving still continues — some sites are more sheltered than others.
- Water temperature stays warm year-round, typically comfortable in a 3mm shortie or light wetsuit for most divers.`,
      },
      {
        heading: "A Typical Day of Diving",
        body: `Most dive shops run two-tank morning trips, departing by boat from the harbour area, with a surface interval between dives (often a short beach or boat break) before the second dive. Full-day and afternoon options are also common, and courses typically run across consecutive days rather than all in one sitting.`,
      },
      {
        heading: "Snorkeling as an Alternative",
        body: `If you're not diving, most of the same boats and dive shops run snorkeling trips to nearby reef sites and Gili Meno's underwater statues, so non-divers in a group don't need to sit out the day.`,
      },
      {
        heading: "Choosing a Dive Shop",
        body: `A few practical things to check before booking:

- Confirm group size — smaller groups generally mean more individual attention, especially for courses.
- Ask what's included (equipment, boat fees, certification card) versus what's extra.
- If you have known ear or sinus issues, mention this before booking a course, since equalizing is one of the more common early hurdles for new divers.`,
      },
      {
        heading: "Tips for First-Time Divers",
        body: `1. Book your course for the start of your Gili stay, not the end, in case weather pushes a day.
2. Follow standard DAN (Divers Alert Network) guidelines on flying after diving: at least 12 hours after a single no-decompression dive, and at least 18 hours after multiple dives or multiple days of diving. Many divers build in extra buffer beyond this minimum for peace of mind.
3. Bring your own mask if you have one you're used to — fit matters more than most people expect.
4. Stay hydrated; dive days are longer and more physically demanding than they look.`,
      },
    ],
    faqs: [
      {
        q: "Do I need experience to dive at the Gili Islands?",
        a: "No — the Gili Islands are a popular place to learn, with PADI Open Water courses widely available, especially on Gili Trawangan.",
      },
      {
        q: "How long does a PADI Open Water course take?",
        a: "Typically 3 to 4 days, combining theory, confined-water practice, and four open-water dives.",
      },
      {
        q: "What's the best time of year to dive at the Gili Islands?",
        a: "The dry season, roughly April to October, generally offers the clearest visibility and calmest conditions.",
      },
      {
        q: "Can non-divers join a dive boat?",
        a: "Most dive shops also run snorkeling trips on the same boats or a similar schedule, so non-divers can join the outing.",
      },
    ],
    closing:
      "My Day Gili can help connect you with diving and snorkeling options as part of a Gili Islands trip from Bali. Message our team on WhatsApp for details.",
    related: { label: "Plan a Gili Islands trip", href: "/mydaygili/day-trips" },
  },

  // ---------------------------------------------------------- 14
  {
    slug: "bali-tourism-levy-explained",
    title: "Bali Tourism Levy Explained: What Travelers Need to Know (2026)",
    category: "Travel Tips",
    metaTitle: "Bali Tourism Levy Explained: What Travelers Need to Know (2026)",
    excerpt:
      "What the Bali tourism levy is, how much it costs, how to pay it, and whether you need to pay it again for trips to the Gili Islands or Nusa Penida.",
    keyword: "bali tourism levy",
    heroImage: "/mydaygili/rupiah-cash.jpg",
    heroAlt: "Indonesian rupiah banknotes counted out by hand",
    publishedAt: "2026-07-26",
    readMin: 5,
    author: AUTHOR,
    lead: "If you're planning a trip to Bali, you've likely come across mentions of a \"tourism levy\" or \"tourist tax\" that's separate from your visa. Here's what it actually is, what it costs, and how it affects trips onward to the Gili Islands or Nusa Penida.",
    sections: [
      {
        heading: "What Is the Bali Tourism Levy?",
        body: `The Bali tourism levy — officially the Pungutan Wisatawan Asing (PWA), or Foreign Tourist Levy — is a one-time fee of IDR 150,000 (roughly USD 10) charged to foreign travelers entering Bali. It's been in force since February 2024 under Bali Provincial Regulation No. 6 of 2023, and it's separate from Indonesia's visa-on-arrival or e-visa fees, and separate from any harbour taxes or entry fees charged at the Gili Islands or Nusa Penida. The levy goes toward funding environmental protection, cultural preservation, and tourism infrastructure on the island.`,
      },
      {
        heading: "Who Has to Pay It",
        body: `The levy applies to foreign (non-Indonesian) tourists entering Bali; Indonesian citizens are exempt. It's a fixed IDR 150,000 per person, charged once per entry to Bali, regardless of how long you stay. If you leave Bali and return on a separate trip, the levy applies again on re-entry.`,
      },
      {
        heading: "How and Where to Pay",
        body: `Travelers can pay the levy online in advance through the official Love Bali portal (lovebali.baliprov.go.id) or the Love Bali mobile app, or in person on arrival at the airport or major seaports. Paying online ahead of time is generally faster, since it lets you skip the payment counter and go straight through arrival formalities with your QR code confirmation ready. Enforcement has stepped up since the levy launched — spot-checks now happen at major attractions and around the airport, so it's worth paying before you travel rather than assuming you can settle it later. Be cautious of third-party sites or drivers offering to "handle" the payment for a marked-up fee; the official rate is fixed at IDR 150,000, and anything charged well above that is not the real levy.`,
      },
      {
        heading: "Do You Pay Again for the Gili Islands or Nusa Penida?",
        body: `No. The Bali tourism levy is a one-time fee for entering Bali itself — it is not charged again when you take a fast boat onward to the Gili Islands, Lombok, or Nusa Penida, since those are treated as domestic travel within Indonesia once you've already entered the country through Bali. These onward trips do involve their own separate harbour taxes and entry fees, paid in cash at the port, but these are unrelated to the Bali tourism levy and go toward local port and village administration rather than Bali-wide tourism funding.`,
      },
      {
        heading: "What It Doesn't Cover",
        body: `The tourism levy is not a substitute for:

- Your Indonesian visa or visa-on-arrival fee, which is a separate, mandatory immigration charge.
- Harbour taxes and Gili/Nusa Penida entry fees, paid in cash at ports for onward boat travel.
- Site entrance fees at temples, waterfalls, or other attractions around Bali, which are charged individually.`,
      },
      {
        heading: "Tips for a Smooth Arrival",
        body: `1. Pay online before your flight if possible — it's usually quicker than the on-arrival counter.
2. Keep a screenshot or printout of your payment confirmation, since you may be asked to show it.
3. Double-check you're using Bali's official payment channel, since unofficial third-party sites sometimes charge a markup for the same service.
4. Budget for it separately from your visa fee — the two are easy to confuse but are charged and processed independently.`,
      },
    ],
    faqs: [
      {
        q: "How much is the Bali tourism levy?",
        a: "IDR 150,000 (about USD 10) per person, charged once per entry to Bali. Confirm the current rate on the official Love Bali site before you travel, since government fees can be updated.",
      },
      {
        q: "Do I pay the levy every time I enter Bali?",
        a: "Yes — it's charged per visit, so if you leave and re-enter Bali on a separate trip, the levy applies again.",
      },
      {
        q: "Is the tourism levy the same as my visa fee?",
        a: "No — they're separate charges. The visa fee is an immigration requirement; the tourism levy funds local environmental and cultural programs.",
      },
      {
        q: "Do I need to pay the levy again when traveling from Bali to the Gili Islands?",
        a: "No — it's a one-time fee for entering Bali and isn't charged again for onward domestic travel to the Gilis, Lombok, or Nusa Penida.",
      },
    ],
    closing:
      "My Day Gili helps travelers plan onward trips from Bali to the Gili Islands, Lombok, and Nusa Penida. Contact our team on WhatsApp if you have questions before you travel.",
    related: { label: "See fast boat schedules & prices", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 15
  {
    slug: "best-time-to-visit-gili-islands",
    title: "Best Time to Visit the Gili Islands: A Month-by-Month Guide",
    category: "Gili Islands",
    metaTitle: "Best Time to Visit the Gili Islands: A Month-by-Month Guide",
    excerpt:
      "When to visit the Gili Islands for calm seas, good snorkeling visibility, and fewer crowds — a season-by-season breakdown for planning your trip.",
    keyword: "best time to visit gili islands",
    heroImage: "/mydaygili/sea-crossing.jpg",
    heroAlt: "Open sea and sky on the crossing between Bali and the islands",
    publishedAt: "2026-07-28",
    readMin: 6,
    author: AUTHOR,
    lead: "The Gili Islands are a year-round destination, but sea conditions, crowd levels, and snorkeling visibility shift enough across the seasons that timing your trip can meaningfully change the experience. Here's how the year breaks down.",
    sections: [
      {
        heading: "The Quick Answer",
        body: `The dry season, roughly April to October, offers the calmest seas, clearest snorkeling and diving visibility, and the most reliable fast boat schedules. Within that window, the shoulder months of April–June and September–October tend to combine good conditions with smaller crowds than the July–August peak.`,
      },
      {
        heading: "Dry Season (April–October)",
        body: `This is the most popular stretch to visit, for good reason:

- Calmer Lombok Strait crossings, with less chance of fast boats being delayed or cancelled due to weather.
- Clearer water for snorkeling and diving, particularly noticeable at reef sites and Gili Meno's underwater statues.
- Longer stretches of sunshine, which matters if beach time and island-hopping are the priority.

The trade-off is crowds and price. July, August, and the December holiday period are peak season across the Gilis — expect fuller boats, busier beaches, and higher accommodation prices, so booking fast boat tickets and rooms in advance matters more during these windows.`,
      },
      {
        heading: "Wet Season (November–March)",
        body: `The wet season brings a genuinely different experience:

- Rain tends to fall in short, heavy bursts rather than all-day downpours, often leaving plenty of dry hours around a shower.
- Sea conditions can get rougher, particularly on the Lombok Strait crossing, which occasionally leads to fast boat delays or cancellations on the roughest days.
- Fewer travelers overall, which means quieter beaches, easier bookings, and sometimes lower accommodation rates.
- Snorkeling visibility can dip after heavy rain, though it typically recovers within a day or two once conditions settle.

If your schedule is flexible and you don't mind some unpredictability, the wet season can be a genuinely good time to visit — just build a buffer day into your itinerary in case a crossing gets delayed.`,
      },
      {
        heading: "Shoulder Months: The Sweet Spot",
        body: `April, May, June, September, and October often get overlooked in favor of the July–August peak, but they typically offer dry-season conditions — calm seas, good visibility — without the same crowd levels or peak pricing. These months are a strong pick if flexibility allows it.`,
      },
      {
        heading: "How Season Affects Fast Boat Travel",
        body: `Fast boats between Bali and the Gili Islands run year-round, but wet-season sailings are more likely to be delayed, rescheduled, or occasionally cancelled if the Lombok Strait gets too rough for safe crossing. Morning departures generally handle conditions better than afternoon sailings in any season, since seas tend to build through the day.`,
      },
      {
        heading: "Choosing Dates Around Your Priorities",
        body: `- If diving or snorkeling visibility is your top priority, aim for the dry season, ideally outside the July–August peak.
- If budget and quiet beaches matter most, the wet season (with a flexible schedule) can work well.
- If you're combining a Gili trip with other parts of Bali, check the season for those activities too — some, like waterfall visits, are actually more dramatic in the wet season.`,
      },
    ],
    faqs: [
      {
        q: "What is the best month to visit the Gili Islands?",
        a: "April, May, September, and October tend to offer the best balance of dry-season conditions and smaller crowds.",
      },
      {
        q: "Is it worth visiting the Gili Islands in the wet season?",
        a: "Yes, especially if you're flexible with dates — expect occasional rain and rougher crossings, but also fewer crowds and lower prices.",
      },
      {
        q: "Does weather affect the fast boat from Bali to the Gilis?",
        a: "Yes — rough sea conditions, more common in the wet season, can delay or occasionally cancel sailings. Morning departures are generally more reliable.",
      },
      {
        q: "When is peak season at the Gili Islands?",
        a: "July, August, and the December holiday period see the highest visitor numbers and prices.",
      },
    ],
    closing:
      "My Day Gili runs fast boat transfers to the Gili Islands year-round and can advise on current conditions before you book. Message our team on WhatsApp to plan your trip.",
    related: { label: "Check departures & prices", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 16
  {
    slug: "sanur-to-nusa-penida-lembongan-boat-guide",
    title: "Sanur to Nusa Penida & Nusa Lembongan: Complete Boat Guide",
    category: "Nusa Penida",
    metaTitle: "Sanur to Nusa Penida & Nusa Lembongan: Complete Boat Guide",
    excerpt:
      "Everything you need to know about the fast boat from Sanur to Nusa Penida and Nusa Lembongan — crossing time, price, and what to expect at the harbour.",
    keyword: "sanur to nusa penida boat",
    heroImage: "/mydaygili/penida-slide-02.jpg",
    heroAlt: "Cliff pathway down to a hidden turquoise bay on Nusa Penida",
    publishedAt: "2026-07-30",
    readMin: 6,
    author: AUTHOR,
    lead: "Sanur is the main departure point for boats to Nusa Penida and Nusa Lembongan, and the crossing is short enough that both islands work well as a day trip or a longer stay from Bali. Here's what to expect.",
    sections: [
      {
        heading: "Where the Boats Leave From",
        body: `Fast boats to Nusa Penida and Nusa Lembongan depart from Sanur Harbour on Bali's southeast coast, roughly 20–30 minutes from central Sanur accommodation and about 45 minutes to an hour from the Kuta/Seminyak/Canggu area. Sanur is a separate departure point from Padang Bai, which serves the Gili Islands and Lombok routes.`,
      },
      {
        heading: "How Long Is the Crossing?",
        body: `The boat crossing from Sanur to Nusa Penida or Nusa Lembongan typically takes around 30 to 45 minutes, depending on the operator, sea conditions, and which port on the islands you're landing at. This is considerably shorter than the Padang Bai–Gili crossing, which makes both islands realistic for a single-day visit.`,
      },
      {
        heading: "Which Port Should You Choose?",
        body: `Nusa Penida has more than one arrival port, and which one your boat uses affects how far you'll need to travel to reach the island's main sights:

- Boats landing on the island's west side put you closer to popular west-coast spots like Kelingking Beach and Broken Beach.
- Boats landing further from these sights mean more driving time before you reach the main attractions, which matters if you're on a tight day-trip schedule.

If you're booking a day trip through an operator, ask which port they use and how it lines up with the sights you want to see. Nusa Lembongan's harbour area is more compact, with several popular beaches and viewpoints within a shorter drive of the port.`,
      },
      {
        heading: "Fast Boat vs Slower Public Options",
        body: `Most travelers use a fast boat for this crossing, since it's short, frequent, and not meaningfully more expensive than slower alternatives. Departures run multiple times per day during daylight hours, with morning sailings generally offering calmer water.`,
      },
      {
        heading: "What's Included and What Isn't",
        body: `A standard one-way ticket covers your seat and life jacket. As with other Bali–islands crossings, it typically does not include:

- Hotel transfer to/from Sanur Harbour, often available as an add-on.
- Onward transport once you're on Nusa Penida or Nusa Lembongan — most day tours arrange a driver, since public transport options on the islands are limited and the sights are spread out.
- Entrance fees at individual attractions, paid in cash locally.`,
      },
      {
        heading: "Booking Tips",
        body: `1. Book your crossing in advance during peak season (July–August, December holidays), when popular morning departures can sell out.
2. Arrive at least 30–45 minutes before departure for check-in.
3. Confirm which port your boat uses if you're planning your own day, since it affects your driving distance to the main sights.
4. Bring small cash for local fees and lunch, since card payment is limited outside the main towns.`,
      },
      {
        heading: "Combining Nusa Penida and Nusa Lembongan",
        body: `Because the crossing between Bali and either island is short, some travelers combine both islands into a single trip — spending a day or two on Nusa Lembongan's quieter beaches before a short inter-island boat to Nusa Penida for its cliffside viewpoints, or vice versa.`,
      },
    ],
    faqs: [
      {
        q: "How long does the boat from Sanur to Nusa Penida take?",
        a: "Roughly 30 to 45 minutes, depending on the operator and sea conditions.",
      },
      {
        q: "Can I visit Nusa Penida as a day trip from Bali?",
        a: "Yes — the short crossing from Sanur makes a one-day visit realistic, though you'll typically only cover the west-coast highlights given travel time on the island itself.",
      },
      {
        q: "Is Sanur the only departure point for Nusa Penida?",
        a: "It's the main and most common one; some other harbours also run limited services, but Sanur offers the most frequent departures.",
      },
      {
        q: "Do I need a different boat for Nusa Lembongan than Nusa Penida?",
        a: "Boats to each island depart from Sanur, sometimes on the same route with different stops — confirm with your operator which island (or both) your ticket covers.",
      },
    ],
    closing:
      "My Day Gili arranges boat tickets and day trips to Nusa Penida and Nusa Lembongan from Bali. Contact our team on WhatsApp for current schedules.",
    related: { label: "See the Nusa Penida day trip", href: "/mydaygili/day-trips#nusa-penida" },
  },

  // ---------------------------------------------------------- 17
  {
    slug: "nusa-penida-vs-nusa-lembongan",
    title: "Nusa Penida vs Nusa Lembongan: Which Island Should You Visit?",
    category: "Nusa Penida",
    metaTitle: "Nusa Penida vs Nusa Lembongan: Which Island Should You Visit?",
    excerpt:
      "A side-by-side comparison of Nusa Penida and Nusa Lembongan to help you decide which island fits your Bali trip better.",
    keyword: "nusa penida vs nusa lembongan",
    heroImage: "/mydaygili/penida-kelingking.jpg",
    heroAlt: "Kelingking Beach headland and turquoise water, Nusa Penida",
    publishedAt: "2026-08-01",
    readMin: 6,
    author: AUTHOR,
    lead: "Nusa Penida and Nusa Lembongan sit close together off Bali's southeast coast, both reached by a short boat from Sanur, but they offer noticeably different trips. Here's how to choose between them — or whether to do both.",
    sections: [
      {
        heading: "The Quick Answer",
        body: `Choose Nusa Penida if you want dramatic cliffside viewpoints, the island's famous Instagram-spot scenery, and don't mind a longer, bumpier day of driving to reach them.

Choose Nusa Lembongan if you want a smaller, more relaxed island with easy beaches, a walkable main area, and a slower pace suited to a multi-day stay.`,
      },
      {
        heading: "Nusa Penida: Dramatic Scenery, Bigger Distances",
        body: `Nusa Penida is the larger of the two islands, known for limestone cliffs, turquoise water, and viewpoints like Kelingking Beach, Broken Beach, and Angel's Billabong. The scenery is genuinely striking, but the island's roads are rough and winding, and the main sights are spread out across the west coast, which means a full day of driving even for a focused itinerary.

Best for: travelers chasing the island's famous viewpoints, people comfortable with a long, active day, first-time visitors doing a day trip from Bali.

Trade-off: getting between sights takes real time, and a day trip means racing the clock to catch your return boat.`,
      },
      {
        heading: "Nusa Lembongan: Smaller, Easier, More Relaxed",
        body: `Nusa Lembongan is considerably smaller and easier to get around, with a more walkable central area, mangrove forests, and beaches that are simpler to reach without long drives. It has a more developed café and accommodation scene relative to its size, and its snorkeling and surf spots are well known among longer-staying visitors.

Best for: travelers who want a slower pace, surfers, people staying multiple nights rather than doing a single rushed day trip.

Trade-off: it doesn't have Nusa Penida's dramatic cliffside scenery — the appeal here is closer to a classic relaxed island stay.`,
      },
      {
        heading: "Comparison at a Glance",
        body: `- Nusa Penida: Larger island, dramatic cliffs and viewpoints, rough roads, best suited to a full active day or multi-day stay.
- Nusa Lembongan: Smaller island, easier to get around, more relaxed pace, well suited to a shorter or more leisurely visit.`,
      },
      {
        heading: "Can You Visit Both in One Trip?",
        body: `Yes. Both islands are reached from Sanur, and boats also run between Nusa Penida and Nusa Lembongan directly, so a common approach is splitting a few days between the two — a slower stretch on Lembongan followed by an active day covering Nusa Penida's viewpoints, or the reverse.`,
      },
      {
        heading: "Which Is Better for a Day Trip?",
        body: `Nusa Penida is the more common day-trip choice because of its famous viewpoints, but it's also the more demanding one — expect a long day with significant driving time. Nusa Lembongan works well as a day trip too, with a gentler pace, though it doesn't have the same headline sights that draw first-time visitors to Penida.`,
      },
    ],
    faqs: [
      {
        q: "Is Nusa Penida or Nusa Lembongan better for a day trip?",
        a: "Nusa Penida is the more popular day-trip choice for its viewpoints, though it involves more driving. Nusa Lembongan offers an easier, more relaxed day.",
      },
      {
        q: "Can I visit both Nusa Penida and Nusa Lembongan in one trip?",
        a: "Yes — both are reached from Sanur, and boats also connect the two islands directly, making it easy to split time between them.",
      },
      {
        q: "Which island has better beaches, Nusa Penida or Nusa Lembongan?",
        a: "Nusa Lembongan's beaches are generally easier to access and better suited to relaxing, while Nusa Penida's coastline is more about dramatic viewpoints than swimmable beaches.",
      },
      {
        q: "Is Nusa Penida worth it if I don't like long drives?",
        a: "It's still worth considering, but expect a demanding day — the island's main sights require significant driving on rough roads.",
      },
    ],
    closing:
      "My Day Gili arranges boat tickets and day trips to both Nusa Penida and Nusa Lembongan. Get in touch with our team on WhatsApp to plan your route.",
    related: { label: "See the Nusa Penida day trip", href: "/mydaygili/day-trips#nusa-penida" },
  },

  // ---------------------------------------------------------- 18
  {
    slug: "getting-around-gili-trawangan",
    title: "Getting Around Gili Trawangan: Cidomo, Bicycles & Walking",
    category: "Gili Islands",
    metaTitle: "Getting Around Gili Trawangan: Cidomo, Bicycles & Walking",
    excerpt:
      "There are no cars or scooters on Gili Trawangan — here's how to get around the island by bicycle, cidomo, or on foot.",
    keyword: "getting around gili trawangan",
    heroImage: "/mydaygili/gili-islands-beach.jpg",
    heroAlt: "Boats moored off a Gili island beach with Lombok behind",
    publishedAt: "2026-08-03",
    readMin: 5,
    author: AUTHOR,
    lead: "Gili Trawangan has no cars or motorbikes — it's one of the island's defining features, and it changes how you'll get around compared to most other destinations in Indonesia. Here's how travelers actually move around the island.",
    sections: [
      {
        heading: "Why There Are No Motorized Vehicles",
        body: `Gili Trawangan, along with Gili Air and Gili Meno, has banned cars and scooters for years, partly to preserve the islands' quiet, car-free character and partly for practical reasons — the islands are small enough that motorized transport isn't necessary for most trips. The result is a noticeably different pace than mainland Bali, with bicycles, cidomo carts, and walking covering nearly all local transport.`,
      },
      {
        heading: "Walking",
        body: `Gili Trawangan's main strip, where most restaurants, dive shops, and beach bars are concentrated, is entirely walkable, and many travelers staying near the harbour area get around almost exclusively on foot for day-to-day errands. A full walk around the island's coastline takes a few hours at an easy pace.`,
      },
      {
        heading: "Bicycle",
        body: `Renting a bicycle is the most popular way to see the whole island in a single outing. A full loop of the coastline takes roughly 1.5 to 2 hours at a relaxed pace, passing the busy east-side strip, quieter beaches on the west, and small local neighborhoods inland. Bikes are widely available for rent by the day from shops near the harbour and along the main strip, and the island's flat, mostly sandy-paved paths make cycling manageable for most fitness levels.`,
      },
      {
        heading: "Cidomo (Horse Cart)",
        body: `The cidomo is Gili Trawangan's traditional horse-drawn cart and doubles as both a practical transport option — particularly for luggage between the harbour and accommodation — and a novelty ride for visitors. Cidomos can be flagged down near the harbour and main strip, with fares typically negotiated on the spot.`,
      },
      {
        heading: "Getting From the Harbour to Your Accommodation",
        body: `If your accommodation is a short walk from the harbour, you likely won't need transport at all. For anything further, or if you're carrying luggage, a cidomo is usually the easiest option — many guesthouses and hotels can also arrange pickup.`,
      },
      {
        heading: "Tips for Getting Around",
        body: `1. Rent a bike on your first morning to get oriented before deciding where to base your time.
2. Cycle early in the day — the paths get warm and busier by midday.
3. Agree on a cidomo fare before you get in, since prices aren't fixed or metered.
4. Wear closed shoes or sandals with grip for walking on the island's mix of sand and paved paths, especially at night when lighting is limited away from the main strip.`,
      },
    ],
    faqs: [
      {
        q: "Are there cars or scooters on Gili Trawangan?",
        a: "No — motorized vehicles are banned across all three Gili Islands. Getting around is done by bicycle, cidomo (horse cart), or on foot.",
      },
      {
        q: "How do I get around Gili Trawangan?",
        a: "Most visitors either walk (for the main strip) or rent a bicycle to cover more of the island, with cidomo carts available for luggage or longer distances.",
      },
      {
        q: "How long does it take to cycle around Gili Trawangan?",
        a: "A full loop of the coastline takes roughly 1.5 to 2 hours at a relaxed pace.",
      },
      {
        q: "Is Gili Trawangan easy to get around without a bike?",
        a: "Yes, if you're staying near the main strip — it's compact and walkable — though a bike makes it far easier to see the quieter parts of the island.",
      },
    ],
    closing:
      "My Day Gili runs fast boat transfers to Gili Trawangan and can point you toward reliable bike rental once you arrive. Message our team on WhatsApp for tips.",
    related: { label: "Book a Gili Trawangan transfer", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 19
  {
    slug: "how-to-get-to-padang-bai-harbour",
    title: "How to Get to Padang Bai Harbour from Ubud, Kuta, Canggu & Seminyak",
    category: "Travel Tips",
    metaTitle: "How to Get to Padang Bai Harbour from Ubud, Kuta, Canggu & Seminyak",
    excerpt:
      "Travel times, transfer options, and tips for getting to Padang Bai Harbour from Bali's main tourist areas ahead of your fast boat departure.",
    keyword: "padang bai transfer",
    heroImage: "/mydaygili/boat-slide-06.jpg",
    heroAlt: "Passengers boarding the fast ferry at the harbour with their luggage",
    publishedAt: "2026-08-05",
    readMin: 6,
    author: AUTHOR,
    lead: "Padang Bai Harbour is on Bali's east coast, which means most travelers are driving in from somewhere else on the island before their fast boat departs. Here's how long it takes from the main tourist areas, and how to plan the transfer.",
    sections: [
      {
        heading: "Travel Times to Padang Bai",
        body: `- From Ubud: around 1 hour by car, making it the closest of Bali's main tourist hubs to Padang Bai.
- From Kuta or Seminyak: around 1.5 hours by car, depending on traffic.
- From Canggu: around 1.5 to 2 hours by car, since Canggu sits further west and traffic through Denpasar can add time.
- From Sanur: around 1 to 1.5 hours by car.

These are driving times under normal conditions — Bali traffic, particularly around Denpasar and during peak tourist season, can add 20–30 minutes or more, so it's worth building in buffer time rather than cutting it close.`,
      },
      {
        heading: "Transfer Options",
        body: `Private hotel transfer: Many fast boat operators offer a private transfer as part of your ticket or as an add-on. This is the most predictable option, since it's a direct, point-to-point ride without extra stops.

Shared shuttle: A cheaper alternative offered by some operators, but shared shuttles often make multiple pickups before heading to the harbour, which can meaningfully extend the trip. Confirm whether your transfer is private or shared before booking, and get an estimated pickup-to-arrival time in writing.

Ride-hailing apps: A reasonably priced option if you're arranging your own transport, particularly from areas like Ubud or Sanur where the drive is shorter. Availability can be inconsistent for longer trips out to Padang Bai, so it's worth checking ahead rather than assuming a ride will be easy to book last-minute.

Private car with driver: A comfortable, flexible option if you're combining the harbour transfer with sightseeing along the way (East Bali has several worthwhile stops en route from Ubud or South Bali).`,
      },
      {
        heading: "How Early to Leave",
        body: `Work backward from your boat's check-in time, which should be at least 60 minutes before departure. Add your driving time, plus a buffer for traffic — as a general rule:

- From Ubud: leave roughly 1.5 to 2 hours before your boat's departure.
- From Kuta/Seminyak/Sanur: leave roughly 2 to 2.5 hours before departure.
- From Canggu: leave roughly 2.5 to 3 hours before departure to account for the longer drive and Denpasar traffic.`,
      },
      {
        heading: "Combining the Transfer With a Stop",
        body: `Since Padang Bai sits in East Bali, some travelers use the drive out as an opportunity to stop at nearby sights — Tirta Gangga's water palace or the Sidemen valley are both reasonably close to the route from Ubud or South Bali, and can be worked into a private transfer with enough lead time before your boat.`,
      },
      {
        heading: "Tips for a Smooth Transfer",
        body: `1. Confirm pickup time and location with your operator the day before, especially if you're staying somewhere with multiple entrances or a similar-sounding name to another property.
2. Build in extra buffer during peak season (July–August, December) when traffic and harbour check-in lines are busier.
3. Keep your boat ticket and ID accessible before you leave, rather than packed away in checked luggage.
4. If self-driving or using a ride-hailing app, confirm you know which Padang Bai ticket office you're heading to, since several operators run out of the same general harbour area.`,
      },
    ],
    faqs: [
      {
        q: "How far is Padang Bai from Ubud?",
        a: "Around 1 hour by car, making Ubud the closest major tourist area to the harbour.",
      },
      {
        q: "How long does it take to get to Padang Bai from Canggu?",
        a: "Roughly 1.5 to 2 hours by car, depending on traffic through Denpasar.",
      },
      {
        q: "Should I book a private or shared transfer to Padang Bai?",
        a: "A private transfer is more predictable and usually faster, since shared shuttles often make multiple stops before reaching the harbour.",
      },
      {
        q: "How early should I leave for my fast boat departure?",
        a: "Aim to arrive at least 60 minutes before departure, and add your full driving time plus a traffic buffer on top of that.",
      },
    ],
    closing:
      "My Day Gili can arrange your transfer to Padang Bai Harbour alongside your fast boat ticket. Contact our team on WhatsApp to confirm pickup details.",
    related: { label: "See departures from Padang Bai", href: "/mydaygili/fast-boat-tickets" },
  },

  // ---------------------------------------------------------- 20
  {
    slug: "7-day-bali-gili-nusa-penida-itinerary",
    title: "7-Day Bali, Gili Islands & Nusa Penida Itinerary",
    category: "Bali Tour",
    metaTitle: "7-Day Bali, Gili Islands & Nusa Penida Itinerary",
    excerpt:
      "A realistic one-week itinerary combining Bali, the Gili Islands, and Nusa Penida — including how the fast boat crossings fit together.",
    keyword: "bali gili itinerary",
    heroImage: "/mydaygili/bali-rice-terrace.jpg",
    heroAlt: "Terraced rice fields and palms in the Bali highlands",
    publishedAt: "2026-08-07",
    readMin: 8,
    author: AUTHOR,
    lead: "One week is enough to see a genuinely varied slice of Bali and its neighboring islands, as long as the logistics are planned around the boat crossings rather than squeezed in as an afterthought. Here's a realistic 7-day route combining Bali, the Gili Islands, and Nusa Penida.",
    sections: [
      {
        heading: "The Logic Behind This Route",
        body: `This itinerary works because Padang Bai (for the Gilis) and Sanur (for Nusa Penida) are both accessible from South Bali or Ubud without excessive backtracking, and the fast boat crossings themselves are short enough that they don't eat the whole day if you plan around morning departures. The structure below front-loads the islands, since they benefit most from calm morning seas, and leaves Bali-based days more flexible.`,
      },
      {
        heading: "Day 1: Arrive in Bali, Settle In",
        body: `Land in Bali and head to your first base — Ubud or South Bali both work well as a starting point. Keep the day light after a long-haul flight; a short walk, an easy dinner, and an early night set you up for the crossing ahead.`,
      },
      {
        heading: "Day 2: Fast Boat to Gili Trawangan",
        body: `Transfer to Padang Bai Harbour for a morning fast boat departure (roughly 1.5–2 hours crossing). Spend the afternoon settling in, renting a bicycle, and doing a loop of the island before catching sunset from the west coast.`,
      },
      {
        heading: "Day 3: Gili Islands — Snorkeling and Island Hopping",
        body: `Spend the day snorkeling around Gili Trawangan, then take a short inter-island boat (10–15 minutes) to see Gili Meno's underwater statues or spend a few hours on the calmer pace of Gili Air. Return to Trawangan for the evening.`,
      },
      {
        heading: "Day 4: Fast Boat Back to Bali, Transfer to Sanur or South Bali",
        body: `Take a morning fast boat back to Padang Bai, then transfer to Sanur (roughly 1–1.5 hours) to reposition for the Nusa Penida crossing the next day. If you have a driver, consider routing through East Bali for a stop at Tirta Gangga or Sidemen along the way.`,
      },
      {
        heading: "Day 5: Nusa Penida Day Trip",
        body: `Take an early boat from Sanur (roughly 30–45 minutes) to Nusa Penida. Spend the day covering the island's west-coast highlights — Kelingking Beach, Broken Beach, and Angel's Billabong — with a driver who knows the route and timing, since the island's roads are slow and winding. Return to Sanur by evening.`,
      },
      {
        heading: "Day 6: Bali Day Tour — Culture or Adventure",
        body: `With the boat crossings behind you, use this day to explore inland Bali. Depending on your interests, this could be a cultural day around Ubud's temples and rice terraces, an East Bali cultural route through Sidemen and Tenganan, or an adventure day with waterfalls and trekking.`,
      },
      {
        heading: "Day 7: Free Day and Departure",
        body: `Keep the final day flexible for last-minute shopping, a spa visit, or simply relaxing before your flight. If your departure is in the evening, this is also a good day for one more short activity closer to South Bali.`,
      },
      {
        heading: "Tips for Making This Itinerary Work",
        body: `1. Always book morning fast boat departures — they're calmer and give you a full day on arrival at your next stop.
2. Build in a buffer day if you're traveling in the wet season (November–March), since rough seas can occasionally delay crossings.
3. Pack light and keep a day bag separate from your main luggage, since you'll be moving between islands multiple times.
4. Confirm harbour tax and entry fee cash needs before each crossing, since these are paid separately from your ticket at each port.`,
      },
      {
        heading: "Adjusting the Route",
        body: `If a week feels tight, this itinerary can be trimmed by dropping either the Gili Islands or Nusa Penida leg and spending the freed-up days in Bali instead, or extended by adding an extra night on Gili Trawangan or Gili Air for a slower pace on the islands.`,
      },
    ],
    faqs: [
      {
        q: "Can you really fit Bali, the Gili Islands, and Nusa Penida into one week?",
        a: "Yes, with a route built around morning fast boat departures — this itinerary covers roughly 3 days across the two island groups and the rest in Bali.",
      },
      {
        q: "Should I do the Gili Islands or Nusa Penida first?",
        a: "Either order works; this itinerary front-loads the Gilis since the crossing is longer, but reversing the order is just as workable.",
      },
      {
        q: "How many fast boat crossings does this itinerary involve?",
        a: "Four — to and from the Gili Islands via Padang Bai, and to and from Nusa Penida via Sanur.",
      },
      {
        q: "Is this itinerary too rushed?",
        a: "It's a full week with real logistics between stops, so it suits travelers comfortable with some movement. For a slower pace, extend to 9–10 days and add an extra night at each island stop.",
      },
    ],
    closing:
      "My Day Gili can arrange every fast boat crossing and day trip in this itinerary. Contact our team on WhatsApp to build your own version of this route.",
    related: { label: "Explore Bali day tours", href: "/mydaygili/bali-tours" },
  },

  // ---------------------------------------------------------- 21
  {
    slug: "gili-islands-with-kids-family-guide",
    title: "Traveling to the Gili Islands with Kids: A Family Guide",
    category: "Gili Islands",
    metaTitle: "Traveling to the Gili Islands with Kids: A Family Guide",
    excerpt:
      "What families need to know about the fast boat crossing, choosing an island, and keeping kids safe and entertained on a Gili Islands trip.",
    keyword: "gili islands with kids",
    heroImage: "/mydaygili/snorkel-turtle-guest.jpg",
    heroAlt: "Guest snorkelling beside a green sea turtle over the reef",
    publishedAt: "2026-08-08",
    readMin: 6,
    author: AUTHOR,
    lead: "The Gili Islands can work well for a family trip — no cars to dodge, shallow snorkeling spots, and a slower pace than mainland Bali — but a few things are worth planning around before you book. Here's what families should know.",
    sections: [
      {
        heading: "Which Gili Island Suits Families Best?",
        body: `Gili Meno and Gili Air are generally better matches for families than Gili Trawangan. Both offer a calmer pace, quieter beaches, and less late-night noise near accommodation, while still having enough restaurants and activity to keep a trip interesting. Gili Trawangan can still work, especially if you choose accommodation away from the main strip's bars, but its nightlife-driven east side isn't the natural fit for families with younger children.`,
      },
      {
        heading: "The Fast Boat Crossing With Kids",
        body: `The crossing from Padang Bai to the Gili Islands takes roughly 1.5 to 2 hours. A few practical points for traveling with children:

- Infants under 2 years old typically travel free on a parent's lap — confirm this with your operator when booking.
- Morning departures generally have calmer seas, which matters more with kids prone to motion sickness.
- Bring motion sickness remedies suited to your child's age, and keep snacks and a water bottle in your day bag rather than checked luggage.
- If your child is anxious about boats, ask about seating near the front or middle of the vessel, which tends to feel more stable than the back.`,
      },
      {
        heading: "No Cars Means Easier (and Different) Logistics",
        body: `None of the Gili Islands allow cars or scooters, which removes a common family travel stress — no need to worry about traffic near your accommodation. Getting around is by bicycle, cidomo (horse cart), or on foot. Cidomo rides are often a hit with younger kids, and bicycles with child seats are available to rent on the larger islands.`,
      },
      {
        heading: "Snorkeling With Children",
        body: `Shallow, calm snorkeling spots exist on all three islands, particularly close to shore on Gili Air and sections of Gili Meno's reef. For younger or less confident swimmers, look for a shallow, sheltered entry point rather than deeper reef-drop areas, and consider a life vest even for kids who can swim, since currents can pick up further from shore. A guided snorkeling trip is worth considering for families, since a guide can pick calmer sites suited to kids.`,
      },
      {
        heading: "Health and Safety Basics",
        body: `- Sun protection matters more here than almost anywhere else on a Bali trip — there's little natural shade on the beaches and boats, so reef-safe sunscreen, hats, and rash guards are worth packing.
- Bring a basic first-aid kit, since pharmacy access is more limited on the islands than in mainland Bali.
- Tap water isn't safe to drink — stick to bottled or filtered water, including for brushing teeth if your child is young enough that swallowing some is likely.
- Confirm with your accommodation whether the beach directly in front has strong currents, since not every stretch is equally calm for young swimmers.`,
      },
      {
        heading: "Where to Base Yourself",
        body: `Choosing accommodation set back slightly from a busy restaurant or bar strip, but still close enough to walk to food and the beach, tends to work best for families — close enough for convenience, far enough to avoid evening noise disrupting bedtime.`,
      },
      {
        heading: "Tips for a Smoother Family Trip",
        body: `1. Book a morning fast boat departure for calmer seas and to arrive with a full afternoon to settle in.
2. Pack a lightweight rash guard or long-sleeve swimwear for extended snorkeling sessions without reapplying sunscreen constantly.
3. Bring entertainment for the boat crossing — device downloads or books, since onboard wifi isn't guaranteed.
4. Ask your accommodation in advance about kid-friendly amenities like a shallow pool or family rooms, since options vary a lot between properties.`,
      },
    ],
    faqs: [
      {
        q: "Which Gili Island is best for families?",
        a: "Gili Air and Gili Meno are generally better suited to families than Gili Trawangan, thanks to their calmer pace and quieter evenings.",
      },
      {
        q: "Do infants travel free on the fast boat to the Gili Islands?",
        a: "Yes, children under 2 years old typically travel free on a parent's lap — confirm with your operator when booking.",
      },
      {
        q: "Is it safe for kids to snorkel at the Gili Islands?",
        a: "Yes, at the right spots — look for shallow, sheltered entry points and consider a life vest, especially for less confident swimmers.",
      },
      {
        q: "Are the Gili Islands easy to get around with children?",
        a: "Yes — there are no cars or scooters on any of the three islands, and getting around is by bicycle, cidomo cart, or on foot.",
      },
    ],
    closing:
      "My Day Gili can help plan a family-friendly Gili Islands trip, including fast boat tickets and day trip options. Message our team on WhatsApp to get started.",
    related: { label: "See Gili day trips", href: "/mydaygili/day-trips#gili" },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
