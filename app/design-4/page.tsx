import Link from "next/link";
import Image from "next/image";
import { getRoutes } from "@/lib/data/queries";
import { formatIDR } from "@/lib/format";
import { I, ICON_SIZE } from "@/components/Icon";
import { BookingSearch } from "./booking-search";

export const metadata = { title: "Tevily Bali — Travel & Adventures" };

// Design 4 — Tevily inspired.
// • Top dark utility bar + coral CTA
// • White nav with active underline + search circle + user circle
// • Hero with BIG handwritten coral headline over desaturated photo
// • 3-field booking card overlapping hero
// • Destination cards with script tag overlay
// Color: coral (#ff5946) + dark navy (#1f2440) + cream

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#ff5946",
  ["--primary" as string]: "#1f2440",
  ["--primary-fg" as string]: "#ffffff",
};

export default async function Design4() {
  const routes = await getRoutes();

  return (
    <main className="min-h-screen bg-white text-[#1f2440]" style={ACCENT}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--primary-fg)]"
      >
        Skip to content
      </a>

      {/* Top utility bar */}
      <div className="bg-[#1f2440] text-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
          <div className="flex items-center gap-5">
            <a href="tel:+6281234567890" className="tap-target inline-flex items-center gap-1.5 hover:text-[#ff5946]">
              <I.phone size={14} className="text-[#ff5946]" aria-hidden />
              <span className="tabular-nums">+62 812 3456 7890</span>
            </a>
            <a href="mailto:hello@tevily.example" className="tap-target hidden items-center gap-1.5 hover:text-[#ff5946] sm:inline-flex">
              <I.mail size={14} className="text-[#ff5946]" aria-hidden />
              hello@tevily.example
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-white/60 sm:flex">
              <a href="#" aria-label="Facebook"  className="tap-target grid place-items-center hover:text-white"><I.users size={14} aria-hidden /></a>
              <a href="#" aria-label="Twitter"   className="tap-target grid place-items-center hover:text-white"><I.message size={14} aria-hidden /></a>
              <a href="#" aria-label="Instagram" className="tap-target grid place-items-center hover:text-white"><I.star size={14} aria-hidden /></a>
            </div>
            <Link
              href="/design-4/admin"
              className="tap-target inline-flex items-center gap-1.5 rounded-md bg-[#ff5946] px-4 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#e04733]"
            >
              <I.shield size={12} aria-hidden />
              Become a local guide
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/design-4"
            className="tap-target inline-flex items-center gap-2 px-1 text-2xl font-extrabold tracking-tight"
            aria-label="Tevily home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#ff5946] text-white">
              <I.ship size={ICON_SIZE.lg} aria-hidden />
            </span>
            <span className="font-display italic">Tevily</span>
          </Link>
          <nav aria-label="Primary" className="hidden gap-1 lg:flex">
            {[
              ["Home", "#", true],
              ["Routes", "#routes", false],
              ["Tours", "#tours", false],
              ["Pages", "#pages", false],
              ["News", "#news", false],
              ["Contact", "#contact", false],
            ].map(([label, href, active]) => (
              <a
                key={String(label)}
                href={String(href)}
                aria-current={active ? "page" : undefined}
                className="tap-target relative inline-flex items-center rounded-md px-4 text-sm font-semibold text-[#1f2440] hover:text-[#ff5946]"
              >
                {label}
                {active && <span aria-hidden className="absolute inset-x-3 -bottom-1 h-0.5 bg-[#ff5946]" />}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="tap-target grid place-items-center rounded-full bg-[var(--bg-mute)] hover:bg-[var(--border)] h-11 w-11"
            >
              <I.search size={ICON_SIZE.md} aria-hidden />
            </button>
            <Link
              href="/design-4/admin"
              aria-label="Admin"
              className="tap-target grid place-items-center rounded-full bg-[var(--bg-mute)] hover:bg-[var(--border)] h-11 w-11"
            >
              <I.user size={ICON_SIZE.md} aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      <div id="main">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="relative isolate">
          <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200"
              alt="Bali coastline"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#1f2440]/55 via-[#1f2440]/35 to-[#1f2440]/45" />
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <div className="max-w-4xl">
                <h1 id="hero-title" className="font-script text-7xl text-[#ff5946] sm:text-8xl md:text-9xl">
                  Travel &amp; Adventures
                </h1>
                <p className="mx-auto mt-2 max-w-2xl text-2xl font-medium text-white sm:text-3xl">
                  Where would you like to go?
                </p>
              </div>
            </div>

            {/* Carousel arrows (decorative single-slide) */}
            <button type="button" aria-label="Previous"
              className="tap-target absolute left-3 top-1/2 hidden -translate-y-1/2 grid place-items-center h-12 w-12 rounded-full border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 lg:grid">
              <I.chevronRight size={ICON_SIZE.md} className="rotate-180" aria-hidden />
            </button>
            <button type="button" aria-label="Next"
              className="tap-target absolute right-3 top-1/2 hidden -translate-y-1/2 grid place-items-center h-12 w-12 rounded-full border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 lg:grid">
              <I.chevronRight size={ICON_SIZE.md} aria-hidden />
            </button>
          </div>

          {/* Booking card overlapping bottom of hero */}
          <div id="book" className="relative -mt-12 px-4 sm:-mt-16 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <BookingSearch routes={routes} variant="tevily" />
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section id="routes" aria-labelledby="dest-title" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-3xl text-[#ff5946] sm:text-4xl">Destination lists</p>
              <h2 id="dest-title" className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Go exotic places
              </h2>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {routes.slice(0, 6).map((r, i) => (
                <li key={r.id}>
                  <Link
                    href={`/design-4/booking?route=${r.id}`}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--bg-mute)]"
                    aria-label={`Book ${r.origin} to ${r.destination}, from ${formatIDR(r.base_price_idr)}`}
                  >
                    {r.hero_image && (
                      <Image
                        src={r.hero_image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.05]"
                      />
                    )}
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1f2440]/85 via-[#1f2440]/30 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 text-white">
                      <p className="font-script text-2xl text-[#ff8a78]">
                        {["Wildlife", "Crossing", "Adventure", "Sunset", "Snorkel", "Charter"][i % 6]}
                      </p>
                      <div className="mt-1 text-3xl font-extrabold tracking-tight">{r.destination}</div>
                      <div className="mt-1 inline-flex items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-1 text-white/85"><I.pin size={ICON_SIZE.sm} aria-hidden /> {r.origin}</span>
                        <span className="tabular-nums text-[#ff8a78]">{formatIDR(r.base_price_idr)}</span>
                      </div>
                    </div>
                    <span aria-hidden className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#ff5946] text-white shadow-lg transition-transform group-hover:translate-x-1">
                      <I.arrowUpRight size={ICON_SIZE.md} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About strip */}
        <section id="tours" aria-labelledby="why-title" className="bg-[var(--bg-soft)] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-3xl text-[#ff5946] sm:text-4xl">Why Tevily</p>
              <h2 id="why-title" className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built for the adventurer in you
              </h2>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "ship",     title: "Modern fleet",       body: "Twin-engine boats, capacity capped for comfort." },
                { icon: "shield",   title: "Always covered",     body: "Life jackets, briefings, trained crew." },
                { icon: "pin",      title: "Free pickup",        body: "Door-to-harbour transfers across south Bali." },
                { icon: "calendar", title: "Daily departures",   body: "Multiple departures per route, every day." },
              ].map(({ icon, title, body }) => {
                const Icon = I[icon as keyof typeof I];
                return (
                  <li key={title} className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#ff5946]/10 text-[#ff5946]">
                      <Icon size={ICON_SIZE.lg} aria-hidden />
                    </span>
                    <div className="mt-4 text-base font-extrabold">{title}</div>
                    <p className="mt-1.5 text-sm text-[var(--fg-soft)]">{body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <footer id="contact" className="bg-[#1f2440] py-14 text-white/85">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm sm:px-6">
            <div className="inline-flex items-center gap-2 text-2xl font-extrabold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[#ff5946]">
                <I.ship size={ICON_SIZE.lg} aria-hidden />
              </span>
              <span className="font-display italic">Tevily</span>
            </div>
            <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5"><I.phone size={ICON_SIZE.sm} aria-hidden /> +62 812 3456 7890</span>
              <span className="inline-flex items-center gap-1.5"><I.mail  size={ICON_SIZE.sm} aria-hidden /> hello@tevily.example</span>
            </p>
            <p className="mt-6 text-xs text-white/50">
              © {new Date().getFullYear()} Tevily ·{" "}
              <Link href="/design-4/admin" className="text-[#ff8a78] hover:underline">Admin</Link>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
