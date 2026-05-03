import Link from "next/link";
import Image from "next/image";
import { getRoutes } from "@/lib/data/queries";
import { formatIDR } from "@/lib/format";
import { I, ICON_SIZE } from "@/components/Icon";

export const metadata = { title: "Tourex Bali — A Travel Agency" };

// Design 2 — Tourex inspired.
// • Cinematic hero with carousel arrows + decorative line under destination
// • Multi-tab booking row (Fastboat / Charter / Tour / Snorkel / Car / Day Trip)
// • Color: indigo/purple primary, orange secondary, dark navy
// Skill rules preserved: skip-link, .tap-target ≥44px, focus rings via globals.

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#6d28d9",       // violet-700
  ["--primary" as string]: "#5b21b6",
  ["--primary-fg" as string]: "#ffffff",
};

const TABS = [
  { id: "tour",     label: "Fastboat", icon: "ship" },
  { id: "charter",  label: "Charter",  icon: "anchor" },
  { id: "tour2",    label: "Tour",     icon: "pin" },
  { id: "snorkel",  label: "Snorkel",  icon: "waves" },
  { id: "rental",   label: "Rental",   icon: "ticket" },
  { id: "daytrip",  label: "Day trip", icon: "sun" },
] as const;

export default async function Design2() {
  const routes = await getRoutes();
  const featured = routes[0];

  return (
    <main className="min-h-screen bg-white text-[#0b1d39]" style={ACCENT}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--primary-fg)]"
      >
        Skip to content
      </a>

      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link
            href="/design-2"
            className="tap-target inline-flex items-center gap-2 px-1 text-lg font-bold text-white"
            aria-label="Tourex home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-600 text-white">
              <I.ship size={ICON_SIZE.md} aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-white">Tourex</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">A Travel Agency</span>
            </span>
          </Link>
          <nav aria-label="Primary" className="hidden gap-1 lg:flex">
            {[
              ["Home", "#", true],
              ["Routes", "#routes", false],
              ["Charters", "#book", false],
              ["About", "#about", false],
              ["Contact", "#contact", false],
            ].map(([label, href, active]) => (
              <a
                key={String(label)}
                href={String(href)}
                aria-current={active ? "page" : undefined}
                className="tap-target inline-flex items-center rounded-md px-3 text-sm font-medium text-white/90 hover:text-white"
              >
                {label}
                {active && <I.chevronDown size={14} aria-hidden className="ml-1 opacity-70" />}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-white/90 sm:inline-flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                <I.phone size={ICON_SIZE.md} aria-hidden />
              </span>
              <span className="text-xs leading-tight">
                <span className="block text-white/70">Call us:</span>
                <span className="block font-bold tabular-nums">+62 812-3456-7890</span>
              </span>
            </span>
            <a
              href="https://wa.me/6281234567890"
              className="tap-target inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/20"
            >
              <I.user size={ICON_SIZE.md} aria-hidden />
              Login
            </a>
          </div>
        </div>
      </header>

      <div id="main">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="relative isolate">
          <div className="relative h-[100vh] min-h-[680px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=2200"
              alt={`${featured?.destination ?? "Bali"} coastline`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/65" />
            {/* Decorative S-curve line */}
            <svg
              aria-hidden
              viewBox="0 0 1440 800"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
              preserveAspectRatio="none"
            >
              <path d="M-100,500 C200,300 600,700 900,400 S1500,300 1700,500" fill="none" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Carousel arrows (decorative — single-slide demo) */}
            <button
              type="button"
              aria-label="Previous"
              className="tap-target absolute left-3 top-1/2 hidden -translate-y-1/2 grid place-items-center h-12 w-12 rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 lg:grid"
            >
              <I.chevronRight size={ICON_SIZE.md} className="rotate-180" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="tap-target absolute right-3 top-1/2 hidden -translate-y-1/2 grid place-items-center h-12 w-12 rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 lg:grid"
            >
              <I.chevronRight size={ICON_SIZE.md} aria-hidden />
            </button>

            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <div className="max-w-3xl text-white">
                <p className="text-sm font-medium tracking-widest text-white/85">
                  ★ This offer valid till 22 August
                </p>
                <h1
                  id="hero-title"
                  className="mt-3 inline-block text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
                >
                  {featured?.destination ?? "Maldives island"}
                  <span aria-hidden className="mt-3 block h-[3px] bg-white/80" />
                </h1>
                <p className="mx-auto mt-5 max-w-md text-sm text-white/90 sm:text-base">
                  When the wind is right and the sea is calm, every crossing
                  becomes the best part of the trip.
                </p>
                <p className="mt-6 text-lg text-white/95">
                  Booking starts from{" "}
                  <span className="text-3xl font-bold tabular-nums text-orange-400">
                    {featured ? formatIDR(featured.base_price_idr) : "—"}
                  </span>
                  <span className="text-white/80">/pax</span>
                </p>
                <a
                  href="#book"
                  className="tap-target mt-7 inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:bg-violet-700"
                >
                  Take a tour
                  <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                </a>
              </div>
            </div>
          </div>

          {/* Multi-tab booking row */}
          <div id="book" className="relative -mt-14 px-4 sm:-mt-16 sm:px-6">
            <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
              {/* Tabs */}
              <div role="tablist" aria-label="Booking type" className="flex flex-wrap gap-1 border-b border-[var(--border)] px-3 pt-3">
                {TABS.map((t, i) => {
                  const Icon = I[t.icon as keyof typeof I];
                  const active = i === 0;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      className={`tap-target relative inline-flex items-center gap-2 rounded-t-lg px-4 text-sm font-semibold transition ${
                        active
                          ? "text-violet-700"
                          : "text-[var(--fg-soft)] hover:text-[var(--fg)]"
                      }`}
                    >
                      <Icon size={ICON_SIZE.md} aria-hidden />
                      {t.label}
                      {active && <span aria-hidden className="absolute inset-x-3 -bottom-px h-0.5 bg-violet-600" />}
                    </button>
                  );
                })}
              </div>

              <form
                action="#"
                className="grid gap-0 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"
                aria-label="Search fastboat tickets"
              >
                <SearchField label="Destinations" hint="Where to?"  icon="pin" />
                <SearchField label="Check in"     hint="dd/mm/yyyy" icon="calendar" />
                <SearchField label="Check out"    hint="dd/mm/yyyy" icon="calendar" />
                <SearchField label="Guest"        hint="2 adults"   icon="users" />
                <button
                  type="submit"
                  className="tap-target m-3 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 text-sm font-bold uppercase tracking-widest text-white shadow-md hover:bg-orange-600"
                >
                  Search
                  <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Routes */}
        <section id="routes" aria-labelledby="routes-title" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">— Available routes</p>
              <h2 id="routes-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Pick your crossing
              </h2>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => (
                <li key={r.id}>
                  <a
                    href="https://wa.me/6281234567890"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)] transition duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="relative h-44 overflow-hidden bg-[var(--bg-mute)]">
                      {r.hero_image && (
                        <Image
                          src={r.hero_image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                        />
                      )}
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-violet-600 px-2.5 py-1 text-xs font-semibold tabular-nums text-white">
                        <I.clock size={ICON_SIZE.sm} aria-hidden />
                        {r.duration_minutes} min
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="text-xs font-semibold uppercase tracking-widest text-[var(--fg-mute)]">{r.origin}</div>
                      <div className="mt-1 text-xl font-bold tracking-tight">→ {r.destination}</div>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--fg-soft)]">{r.description}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--fg-mute)]">From</div>
                          <div className="text-lg font-bold tabular-nums text-violet-700">{formatIDR(r.base_price_idr)}</div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-2 text-xs font-bold text-white shadow group-hover:bg-orange-600">
                          Book now
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

        <footer id="contact" className="bg-[#0b1d39] py-14 text-white/85">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm sm:px-6">
            <div className="text-base font-bold text-white">Tourex Bali</div>
            <p className="mt-2 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5"><I.phone size={ICON_SIZE.sm} aria-hidden /> +62 812-3456-7890</span>
              <span className="inline-flex items-center gap-1.5"><I.mail  size={ICON_SIZE.sm} aria-hidden /> hello@tourex.example</span>
            </p>
            <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Tourex. All rights reserved.</p>
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
