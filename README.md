# My Day Gili — Website

Production website for **My Day Gili** (Klungkung, Bali) — fast boat tickets from
Bali to the Gili Islands & Lombok, Gili/Nusa Penida day trips, and private Bali
tours. Built with **Next.js 16** (App Router), deployed on **Vercel**.

Live at `/mydaygili` (root `/` redirects there).

## Pages

| Route | Purpose |
| --- | --- |
| `/mydaygili` | Homepage — hero, trust bar, teasers, reviews, FAQ |
| `/mydaygili/fast-boat-tickets` | Operator comparison table (4 fast ferries), travel info, routes |
| `/mydaygili/day-trips` | Gili Day Trip itinerary + Nusa Penida |
| `/mydaygili/bali-tours` | Tour categories + private transfer |
| `/mydaygili/blog` | Travel article listing (10 launch articles) |
| `/mydaygili/contact` | WhatsApp contact, how booking works, TripAdvisor |

## Key decisions (from client handoff)

- **WhatsApp-first booking** — every Book button opens WhatsApp with a prefilled
  template (departure date, time, guest name, pax, nationality, one-way/return).
  No online payment gateway.
- **Mobile-first** — sticky WhatsApp button on every page, `<details>` FAQ
  accordions, thumb-friendly tap targets (min 44px).
- **SEO/GEO** — direct-answer first sentences, JSON-LD structured data
  (LocalBusiness, FAQPage, Product/Offer, TouristTrip), per-page meta from the
  content draft.
- **TripAdvisor is the only non-WhatsApp external link** (opens in a new tab).

## Placeholders to swap before go-live

All in [app/mydaygili/site.ts](app/mydaygili/site.ts):

1. `WA_NUMBER` — client's real WhatsApp number (currently placeholder).
2. `TRIPADVISOR_URL` — real TripAdvisor listing URL.
3. Hero/section images — client to supply real ferry & snorkeling photos
   (flagged with `⚠ Placeholder` comments in each page).

## Develop

```bash
npm install
npm run dev
```

## Deploy

Push to `main` — Vercel auto-deploys.

> The `supabase/` folder contains schema for a previously-built booking engine
> (kept for reference; the live site books via WhatsApp and does not use it).
