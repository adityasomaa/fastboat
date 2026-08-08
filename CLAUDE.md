@AGENTS.md

# My Day Gili — project context

Production website for a real Bali fastboat operator. It is **live and the
client reviews it daily**, so treat `main` as production: typecheck, build,
push, then verify on the deployed URL before calling anything done.

- Live: https://fastboat-tau.vercel.app/mydaygili (`/` redirects there)
- Deploys automatically from `main`. Vercel occasionally does not pick up a
  push — if the live page still serves the old build after ~5 minutes, an
  empty commit re-triggers it.
- Everything lives under `app/mydaygili/`. There is no database and no payment
  gateway: bookings go out over WhatsApp.

## Who asks for what

- **Made Swadarma** (owner) — routes, operators, prices, WhatsApp number.
  Number in use: `+62 819-9977-9177` (`WA_NUMBER` in `site.ts`).
- **Meri — Aligna Hospitality** (agency) — design, photography, copy.

Requests arrive as WhatsApp screenshots. They are often in Indonesian and
sometimes correct an earlier instruction, so read the whole thread before
acting on one message.

## Conventions that matter

**Single source of truth.** `app/mydaygili/site.ts` holds business data,
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

**Blog.** All ten articles were written by the client. `blog/posts.ts` uses one
fixed schema (Meta Title / Meta Description / Category / Target Keyword / Read
time → lead → sections → FAQ → closing) that mirrors how they author, because a
CMS panel will map onto it later. Keep every post on that shape.

**Photography.** The client considers their own photos weak: everything is
stock from Pexels (free commercially, no attribution line) **except the six
snorkelling shots**, which are theirs and stay. Two rules learned the hard way:
never use a frame showing a rival operator's branding, and keep the heroes on
passenger ferries rather than speedboats — the copy beside them reads "real
fast ferries, not small fastboats".

**Video hero.** The home hero plays the client's own drone footage of their
green-and-white Wahana Virendra ferry. Two clips sit behind an A/B switcher in
the corner so the client can compare them live and pick one; deleting the
losing entry from `HERO_CLIPS` in `page.tsx` removes the switcher by itself.
Sources were 4K HEVC at ~460 MB, so each is cut to 12 s / 1080p / no audio and
written with `+faststart` (~4 MB) — keep any replacement to that recipe, and
never point `HERO_CLIPS` at a file that isn't in `public/` yet or the hero
renders blank.

## Open items

- **Meri's WhatsApp number** — Contact page renders `WA_CONTACTS`; adding a
  second entry is all it takes. Booking forms stay on Made's number only.
- **Booking email address** — `CONTACT_EMAIL` is empty, which deliberately
  hides the "send by email" button until there is an inbox to send to.
- **TripAdvisor** — `TRIPADVISOR_URL` is still a search link, not the real
  listing.
