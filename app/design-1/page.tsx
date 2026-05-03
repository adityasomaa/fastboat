import Link from "next/link";
import Image from "next/image";
import { getRoutes } from "@/lib/data/queries";
import { formatIDR } from "@/lib/format";
import { I, ICON_SIZE } from "@/components/Icon";

export const metadata = { title: "BaliFast — Find your next island" };

// Design 1 — Tourvisor inspired.
// • Full-bleed ocean hero with translucent glass card overlay
// • Cursive orange tagline + bold navy headline
// • White search card overlapping the hero
// • Destination card carousel
// Skill rules preserved: skip-link, .tap-target ≥44px, focus rings via globals,
// Lucide icons only, semantic tokens, alt text, aria labels.

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#f97316",       // orange-500 (CTA)
  ["--primary" as string]: "#0b1d39",    // navy
  ["--primary-fg" as string]: "#ffffff",
};

export default async function Design1() {
  const routes = await getRoutes();

  return (
    <main className="min-h-screen bg-white text-[#0b1d39]" style={ACCENT}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--primary-fg)]"
      >
        Skip to content
      </a>

      {/* Top nav */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link
            href="/design-1"
            className="tap-target inline-flex items-center gap-2 px-1 text-lg font-bold tracking-tight text-white"
            aria-label="BaliFast home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-white">
              <I.ship size={ICON_SIZE.md} aria-hidden />
            </span>
            <span><span className="text-orange-400">BALI</span>FAST</span>
          </Link>
          <nav aria-label="Primary" className="hidden gap-1 lg:flex">
            {[
              ["Home", "#", true],
              ["Routes", "#routes", false],
              ["About", "#about", false],
              ["Destinations", "#destinations", false],
              ["Contact", "#contact", false],
            ].map(([label, href, active]) => (
              <a
                key={String(label)}
                href={String(href)}
                aria-current={active ? "page" : undefined}
                className="tap-target relative inline-flex items-center rounded-md px-3 text-sm font-medium text-white/90 hover:text-white"
              >
                {label}
                {active && (
                  <span aria-hidden className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-orange-400" />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="tap-target hidden items-center rounded-full border border-white/40 bg-white/10 px-4 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm hover:bg-white/20 sm:inline-flex"
            >
              Become an expert
            </a>
            <a
              href="https://wa.me/6281234567890"
              className="tap-target inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-md hover:bg-orange-600"
            >
              <I.message size={ICON_SIZE.md} aria-hidden />
              <span className="hidden sm:inline">Sign In / Sign Up</span>
              <span className="sm:hidden">Book</span>
            </a>
          </div>
        </div>
      </header>

      <div id="main">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="relative isolate">
          <div className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200"
              alt="Bali coastline at golden hour"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0b1d39]/40 via-[#0b1d39]/20 to-[#0b1d39]/55" />
            <div className="absolute inset-0 grid place-items-center px-4">
              {/* Glass card overlay */}
              <div className="w-full max-w-3xl rounded-3xl bg-white/15 px-6 py-12 text-center text-white shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:px-12 sm:py-16">
                <p className="font-script text-2xl text-orange-300 sm:text-3xl">Explore the islands</p>
                <h1 id="hero-title" className="mt-2 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  Find the next crossing
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm text-white/90 sm:text-base">
                  Premium fastboat transfers between Bali and the surrounding islands —
                  Nusa Penida, Lembongan, and the Gilis.
                </p>
                <a
                  href="#search"
                  className="tap-target mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 text-sm font-semibold text-white shadow-lg hover:bg-orange-600"
                >
                  Take me there
                  <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                </a>
              </div>
            </div>
          </div>

          {/* White search card overlapping hero */}
          <div id="search" className="relative -mt-12 px-4 sm:-mt-16 sm:px-6">
            <form
              action="#"
              className="mx-auto grid max-w-6xl items-end gap-0 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"
              aria-label="Search fastboat tickets"
            >
              <SearchField label="Location"  hint="Where are you going?" icon="pin" />
              <SearchField label="Check in"  hint="Set date"             icon="calendar" />
              <SearchField label="Check out" hint="Set date"             icon="calendar" />
              <SearchField label="Activity"  hint="Fastboat"             icon="ship" />
              <button
                type="submit"
                className="tap-target m-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f3aff] px-7 text-sm font-semibold text-white shadow-md hover:bg-[#1632d6]"
              >
                <I.search size={ICON_SIZE.md} aria-hidden />
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Top destinations */}
        <section id="destinations" aria-labelledby="dest-title" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-2xl text-orange-500 sm:text-3xl">Top destinations</p>
              <h2 id="dest-title" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Explore popular crossings
              </h2>
              <p className="mt-3 text-[var(--fg-soft)]">
                Daily fastboat routes to Bali's most stunning islands.
              </p>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => (
                <li key={r.id}>
                  <a
                    href="https://wa.me/6281234567890"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)] transition duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-lg"
                    aria-label={`Inquire about ${r.origin} to ${r.destination}, from ${formatIDR(r.base_price_idr)}`}
                  >
                    <div className="relative h-48 overflow-hidden bg-[var(--bg-mute)]">
                      {r.hero_image && (
                        <Image
                          src={r.hero_image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                        />
                      )}
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-[#0b1d39]">
                        <I.clock size={ICON_SIZE.sm} aria-hidden />
                        {r.duration_minutes} min
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-baseline gap-2 text-sm text-[var(--fg-soft)]">
                        <I.pin size={ICON_SIZE.sm} aria-hidden />
                        {r.origin}
                      </div>
                      <div className="mt-1 text-xl font-bold tracking-tight">→ {r.destination}</div>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--fg-soft)]">{r.description}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--fg-mute)]">From</div>
                          <div className="text-lg font-bold tabular-nums text-[#0b1d39]">{formatIDR(r.base_price_idr)}</div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-2 text-xs font-bold text-white shadow group-hover:bg-orange-600">
                          Book
                          <I.arrowRight size={ICON_SIZE.sm} aria-hidden />
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About strip */}
        <section id="about" aria-labelledby="about-title" className="bg-[var(--bg-soft)] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-2xl text-orange-500 sm:text-3xl">Why us</p>
              <h2 id="about-title" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Sail with confidence
              </h2>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "ship",     title: "Modern fleet",   body: "Twin-engine boats with capacity capped for comfort." },
                { icon: "shield",   title: "Always covered", body: "Life jackets, safety briefings, trained crew." },
                { icon: "pin",      title: "Free pickup",    body: "Door-to-harbour transfers across south Bali." },
                { icon: "calendar", title: "Daily departures", body: "Multiple departures per route, every day." },
              ].map(({ icon, title, body }) => {
                const Icon = I[icon as keyof typeof I];
                return (
                  <li key={title} className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-600">
                      <Icon size={ICON_SIZE.lg} aria-hidden />
                    </span>
                    <div className="mt-4 text-base font-bold">{title}</div>
                    <p className="mt-1.5 text-sm text-[var(--fg-soft)]">{body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-[#0b1d39] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 text-base font-bold">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-white">
                  <I.ship size={ICON_SIZE.md} aria-hidden />
                </span>
                <span><span className="text-orange-400">BALI</span>FAST</span>
              </div>
              <p className="mt-4 inline-flex items-start gap-2 text-sm text-white/70">
                <I.pin size={ICON_SIZE.sm} className="mt-0.5" aria-hidden />
                Jl. Hang Tuah No. 31, Sanur, Bali 80228
              </p>
            </div>
            <div className="text-sm text-white/85">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-300">Contact</h3>
              <p className="mt-3 inline-flex items-center gap-2"><I.phone size={ICON_SIZE.sm} aria-hidden /> +62 812-3456-7890</p>
              <p className="mt-1 inline-flex items-center gap-2"><I.mail  size={ICON_SIZE.sm} aria-hidden /> hello@balifast.example</p>
            </div>
            <div className="text-sm text-white/85">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-300">Hours</h3>
              <p className="mt-3 inline-flex items-center gap-2"><I.clock   size={ICON_SIZE.sm} aria-hidden /> Daily 06:00–19:00 WITA</p>
              <p className="mt-1 inline-flex items-center gap-2"><I.message size={ICON_SIZE.sm} aria-hidden /> WhatsApp 24/7</p>
            </div>
          </div>
          <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/50 sm:px-6">
            © {new Date().getFullYear()} BaliFast. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}

function SearchField({
  label,
  hint,
  icon,
}: {
  label: string;
  hint: string;
  icon: keyof typeof I;
}) {
  const Icon = I[icon];
  return (
    <label className="block px-5 py-4 sm:border-r sm:border-[var(--border)] sm:last-of-type:border-r-0">
      <span className="block text-xs font-semibold uppercase tracking-wider text-[#0b1d39]">{label}</span>
      <span className="mt-1.5 inline-flex items-center gap-2 text-sm text-[var(--fg-mute)]">
        <Icon size={ICON_SIZE.sm} aria-hidden />
        {hint}
      </span>
    </label>
  );
}
