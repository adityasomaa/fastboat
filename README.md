# Bali Fastboat — 5 Design Previews

Five website previews for a Bali fastboat operator. Stack: **Next.js 16** (App Router) · **Supabase** · **Xendit** · **Vercel**.

## What's inside

| Slug         | Title              | Booking | Notes                                  |
| ------------ | ------------------ | ------- | -------------------------------------- |
| `/design-1`  | Modern Minimalist  | —       | Editorial, monochrome accents          |
| `/design-2`  | Tropical Vibrant   | —       | Sun-bleached palette, playful shapes   |
| `/design-3`  | Premium Luxury     | —       | Serif headlines, navy + gold           |
| `/design-4`  | Aqua Booking       | yes     | Teal/cyan. Full booking + `/admin`     |
| `/design-5`  | Sunset Booking     | yes     | Orange/rose. Full booking + `/admin`   |

The root page (`/`) is a gallery listing all five.

## Getting started

```bash
npm install
cp .env.example .env.local   # already filled with placeholders
npm run dev
```

Open <http://localhost:3000>.

By default the app runs in **mock mode** — booking and admin work end-to-end against in-memory data. The dev server shows a banner reminding you to wire Supabase if you want persistence.

## Wiring real services

### Supabase

1. Create a project at supabase.com.
2. SQL Editor → run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Settings → API → copy URL + anon key + service-role key into `.env.local`.

### Xendit

1. Get test keys from Xendit Dashboard → Developers → API Keys.
2. Set `XENDIT_SECRET_KEY` in `.env.local`.
3. Webhooks → callback URL `https://YOUR_DOMAIN/api/xendit/webhook`, verification token → `XENDIT_WEBHOOK_TOKEN`.

### Admin password

Set `ADMIN_PASSWORD` in `.env.local`. Default during dev is `admin123`.

## Deploy

```bash
git push origin main
```

On Vercel: import the repo, add the env vars from `.env.example`, deploy.
Webhook URL once deployed: `https://YOUR_DOMAIN/api/xendit/webhook`.

## Architecture notes

- `lib/data/queries.ts` is a thin abstraction over Supabase that falls back to `lib/data/mock.ts` when env is not set, so previews work offline.
- The booking flow component (`app/design-4/booking/booking-flow.tsx`) is shared by Design 4 and 5 via a `variant` prop — same logic, different palette.
- `app/api/bookings/route.ts` creates a booking + Xendit invoice in one call and returns the redirect URL.
- `app/api/xendit/webhook/route.ts` flips bookings from `pending` → `paid`/`expired` based on Xendit callbacks.
