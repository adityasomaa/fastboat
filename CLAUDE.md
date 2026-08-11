@AGENTS.md

# My Day Gili — project context

Production website for a real Bali fastboat operator. It is **live and the
client reviews it daily**, so treat `main` as production: typecheck, build,
push, then verify on the deployed URL before calling anything done.

- Live: https://mydaygili.com. `www` 308s to the apex, and the old
  fastboat-tau.vercel.app stays as an alias. The domain is registered at
  Hostinger and its DNS is still served by Hostinger's nameservers — just two
  records, `A @ -> 216.198.79.1` and `CNAME www -> <project>.vercel-dns-017.com`
  (both values are per-project and shown in Vercel's Domains settings; the
  76.76.21.21 you find in old tutorials is legacy). There are no MX records.
- Deploys automatically from `main`. Vercel occasionally does not pick up a
  push — if the live page still serves the old build after ~5 minutes, an
  empty commit re-triggers it.
- Pages live at the root of `app/`. They used to sit under `/mydaygili`, so
  `next.config.ts` 308s the old URLs one route at a time — not a catch-all,
  because redirects are checked before `/public` and would eat the images,
  which still live in `public/mydaygili/`. There is no database and no payment
  gateway: bookings go out over WhatsApp.

## Who asks for what

- **Made Swadarma** (owner) — routes, operators, prices, WhatsApp number.
  Number in use: `+62 819-9977-9177` (`WA_NUMBER` in `site.ts`).
- **Meri — Aligna Hospitality** (agency) — design, photography, copy.

Requests arrive as WhatsApp screenshots. They are often in Indonesian and
sometimes correct an earlier instruction, so read the whole thread before
acting on one message.

## Conventions that matter

**Single source of truth.** `app/site.ts` holds business data,
operators, routes, FAQs and WhatsApp helpers. Prices shown to guests are built
from `OPERATORS` so the booking form can never drift from the comparison table.

**Booking flow.** Every booking CTA opens `booking/BookingModal` rather than
linking straight to WhatsApp. One config per CTA in `booking/forms.ts` drives
both the form fields and the outgoing message, so the two cannot fall out of
sync. Each message carries a `🔖 Ref:` line (`FASTBOAT-TICKET`, `PENIDA-TRIP`,
`GILI-TRIP`, `BALI-TOUR`, `TRANSFER`, `COMBINE`, `GENERAL`) so the team can
tell which button the guest used. Note that wa.me text stays editable by the
guest, so this routes most enquiries but is not a guaranteed tracker.

The dropdowns and date picker are custom, not native controls, and render
through a portal so the modal's scrolling body cannot clip them. The whole
date field is the trigger, not just the icon — that was an explicit request.

**Blog.** All twenty-one articles were written by the client and arrive as a
formatted PDF. `blog/posts.ts` uses one fixed schema (Meta Title / Meta
Description / Category / Target Keyword / Read time → lead → sections → FAQ →
closing) that mirrors how they author, because a CMS panel will map onto it
later. Keep every post on that shape. `publishedAt` is the day an article
actually went live — they asked for real dates, not a seeded spread — so a
batch shares one date, and the listing sort has to stay stable for their own
article order to survive.

**No image optimizer.** Vercel 402s every `/_next/image` request on this
account (`OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED`) — the plan's
transformation quota is gone, and when it ran out *every* photo on the live
site broke at once, cached ones included. `next.config.ts` sets
`images.unoptimized`, so whatever is in `public/` is exactly what ships:
size each file for the slot it renders in (table thumbnails ~10 KB, slideshow
frames ≤1400px) rather than leaning on the optimizer.

**Photography.** The client considers their own photos weak: everything is
stock from Pexels (free commercially, no attribution line) **except the six
snorkelling shots**, which are theirs and stay. Two rules learned the hard way:
never use a frame showing a rival operator's branding, and keep the heroes on
passenger ferries rather than speedboats — the copy beside them reads "real
fast ferries, not small fastboats".

**Video hero.** The home and fast-boat-ticket heroes play the client's own
drone footage of their green-and-white Wahana Virendra ferry, through the
shared `HeroVideo`. The home A/B switcher is gone — the client watched both
clips live and picked Video 1 — but passing `HeroVideo` more than one clip
brings it back if they ever want another comparison. Sources are 4K HEVC at
~460 MB, so each is cut to 12 s / 1080p / no audio with `+faststart` (~4 MB);
the busy water needs a two-pass ~3 Mbps encode to land near that size. Never
point a clip at a file that isn't in `public/` yet or the hero renders blank.

**Slideshows.** `PhotoSlideshow` is shared by the tours, day-trips and
fast-boat pages. The client orders these by hand — they screenshot the Drive
folder and write a number on each thumbnail — so slide order is deliberate,
and file order in Drive means nothing. No caption is drawn over a photo
(explicit request); `alt` is for screen readers only.

## Open items

- **Meri's WhatsApp number** — Contact page renders `WA_CONTACTS`; adding a
  second entry is all it takes. Booking forms stay on Made's number only.
- **Google Analytics** — the `GoogleAnalytics` component is wired into the
  root layout but `GA_MEASUREMENT_ID` in `site.ts` is still empty, so no tag
  ships. Paste the GA4 property's `G-…` id there to switch it on.
- **TripAdvisor** — `TRIPADVISOR_URL` is still a search link, not the real
  listing.
