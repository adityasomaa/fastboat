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
  "Fast Boat":    { src: "/mydaygili/hero-fastboat-v2.jpg", alt: "Fast ferry cruising toward the Gili Islands" },
  "Gili Islands": { src: "/mydaygili/gili-boats.jpg",       alt: "Boats on clear turquoise water at the Gili Islands" },
  "Nusa Penida":  { src: "/mydaygili/penida-boats.jpg",     alt: "Traditional boats on turquoise water near Nusa Penida" },
  "Bali Tour":    { src: "/mydaygili/hero-balitours.jpg",   alt: "Travelers at the Gates of Heaven, Lempuyang Temple" },
  "Travel Tips":  { src: "/mydaygili/hero-daytrips.jpg",    alt: "Turquoise water and boats at a Bali harbour" },
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
    heroImage: CATEGORY_HERO["Fast Boat"].src,
    heroAlt: CATEGORY_HERO["Fast Boat"].alt,
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
    heroImage: CATEGORY_HERO["Gili Islands"].src,
    heroAlt: CATEGORY_HERO["Gili Islands"].alt,
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
    heroImage: CATEGORY_HERO["Travel Tips"].src,
    heroAlt: CATEGORY_HERO["Travel Tips"].alt,
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
    heroImage: CATEGORY_HERO["Fast Boat"].src,
    heroAlt: CATEGORY_HERO["Fast Boat"].alt,
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
    heroImage: CATEGORY_HERO["Nusa Penida"].src,
    heroAlt: CATEGORY_HERO["Nusa Penida"].alt,
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
    heroImage: CATEGORY_HERO["Gili Islands"].src,
    heroAlt: CATEGORY_HERO["Gili Islands"].alt,
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
    heroImage: CATEGORY_HERO["Travel Tips"].src,
    heroAlt: CATEGORY_HERO["Travel Tips"].alt,
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
    heroImage: CATEGORY_HERO["Gili Islands"].src,
    heroAlt: CATEGORY_HERO["Gili Islands"].alt,
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
    heroImage: CATEGORY_HERO["Bali Tour"].src,
    heroAlt: CATEGORY_HERO["Bali Tour"].alt,
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
    heroImage: CATEGORY_HERO["Travel Tips"].src,
    heroAlt: CATEGORY_HERO["Travel Tips"].alt,
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
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
