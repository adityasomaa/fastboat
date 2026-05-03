import Link from "next/link";
import Image from "next/image";
import { getRoutes } from "@/lib/data/queries";
import { formatIDR } from "@/lib/format";
import { I, ICON_SIZE } from "@/components/Icon";

export const metadata = { title: "Tripix Bali — Tours & Adventures" };

// Design 3 — Tripix inspired.
// • Top utility bar (dark) + angled orange social bar
// • White nav with logo + menu + search circle + orange "LET'S PLAN" CTA
// • Full-bleed adventure hero with map overlay
// • Color: navy + orange + cream

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#f59e0b",       // amber-500
  ["--primary" as string]: "#0f1f2e",
  ["--primary-fg" as string]: "#ffffff",
};

export default async function Design3() {
  const routes = await getRoutes();

  return (
    <main className="min-h-screen bg-[#fefcf7] text-[#0f1f2e]" style={ACCENT}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--primary-fg)]"
      >
        Skip to content
      </a>

      {/* Top utility bar */}
      <div className="hidden bg-[#0f1f2e] text-white lg:block">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2.5 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+13334568890" className="tap-target inline-flex items-center gap-2 hover:text-amber-300">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-500 text-[#0f1f2e]">
                <I.phone size={12} aria-hidden />
              </span>
              <span className="font-semibold tabular-nums">+1 333.456.8890</span>
            </a>
            <a href="mailto:info@tripix.example" className="tap-target inline-flex items-center gap-2 hover:text-amber-300">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-500 text-[#0f1f2e]">
                <I.mail size={12} aria-hidden />
              </span>
              info@tripix.example
            </a>
          </div>
          {/* Angled orange section */}
          <div
            className="absolute right-0 top-0 flex h-full items-center gap-3 bg-amber-500 pl-10 pr-6 text-[#0f1f2e]"
            style={{ clipPath: "polygon(20px 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Follow:</span>
            <a href="#" aria-label="Twitter"  className="tap-target grid place-items-center"><I.message size={14} aria-hidden /></a>
            <a href="#" aria-label="Facebook" className="tap-target grid place-items-center"><I.users   size={14} aria-hidden /></a>
            <a href="#" aria-label="Instagram"className="tap-target grid place-items-center"><I.star    size={14} aria-hidden /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/design-3"
            className="tap-target inline-flex items-center gap-2 px-1 text-2xl font-extrabold tracking-tight"
            aria-label="Tripix home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-md bg-amber-500 text-white">
              <I.ship size={ICON_SIZE.lg} aria-hidden />
            </span>
            <span>Trip<span className="text-amber-500">ix</span></span>
          </Link>
          <nav aria-label="Primary" className="hidden gap-1 lg:flex">
            {[
              ["Home", "#", true],
              ["Routes", "#routes", false],
              ["Charters", "#charters", false],
              ["About", "#about", false],
              ["FAQ's", "#faq", false],
              ["Contact", "#contact", false],
            ].map(([label, href, active]) => (
              <a
                key={String(label)}
                href={String(href)}
                aria-current={active ? "page" : undefined}
                className={`tap-target inline-flex items-center rounded-md px-3 text-sm font-bold uppercase tracking-wider transition ${
                  active ? "text-amber-500" : "text-[#0f1f2e] hover:text-amber-500"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="tap-target grid place-items-center rounded-full text-[#0f1f2e] hover:bg-[var(--bg-mute)]"
            >
              <I.search size={ICON_SIZE.lg} aria-hidden />
            </button>
            <a
              href="#contact"
              className="tap-target inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 text-sm font-bold uppercase tracking-widest text-white shadow hover:bg-amber-600"
            >
              <I.arrowRight size={ICON_SIZE.md} aria-hidden />
              Let's plan
            </a>
          </div>
        </div>
      </header>

      <div id="main">
        {/* Hero — adventure photo with map overlay */}
        <section aria-labelledby="hero-title" className="relative isolate">
          <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1502209524164-acea936639a2?auto=format&fit=crop&w=2200"
              alt="Bali sea at golden hour"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            {/* Map silhouette overlay */}
            <svg
              aria-hidden
              viewBox="0 0 200 120"
              className="pointer-events-none absolute left-6 top-10 hidden h-44 w-72 text-white/15 sm:block"
            >
              <path
                fill="currentColor"
                d="M30 70 q-10 -25 15 -45 q20 -15 50 -10 q15 -5 30 5 q25 10 40 35 q-5 25 -25 30 q-30 8 -55 -5 q-15 5 -30 0 q-20 -5 -25 -10z"
              />
              <circle cx="60"  cy="55" r="3" fill="white" />
              <circle cx="100" cy="48" r="3" fill="white" />
              <circle cx="135" cy="60" r="3" fill="white" />
            </svg>

            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0f1f2e]/55 via-[#0f1f2e]/25 to-transparent" />

            <div className="absolute inset-0 flex items-center px-6">
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-xl text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-300">— Tour & travel agency</p>
                  <h1 id="hero-title" className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                    Adventure<br />on the Bali Strait
                  </h1>
                  <p className="mt-5 max-w-md text-base text-white/90">
                    Fastboat crossings to Nusa Penida, Lembongan, and the Gilis —
                    plus private charters for the day.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#routes"
                      className="tap-target inline-flex items-center gap-2 rounded-md bg-amber-500 px-7 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:bg-amber-600"
                    >
                      Plan your trip
                      <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                    </a>
                    <a
                      href="#about"
                      className="tap-target inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-7 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured routes */}
        <section id="routes" aria-labelledby="routes-title" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-end gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">— Featured routes</p>
                <h2 id="routes-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Crossings worth taking
                </h2>
              </div>
              <p className="text-[var(--fg-soft)] md:text-right">
                Daily scheduled departures across our standing routes.
              </p>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => (
                <li key={r.id}>
                  <a
                    href="https://wa.me/6281234567890"
                    className="group flex h-full flex-col overflow-hidden rounded-md bg-white ring-1 ring-[var(--border)] transition hover:-translate-y-0.5 hover:shadow-xl"
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
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f1f2e]/70 via-transparent to-transparent" />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-amber-500 px-2.5 py-1 text-xs font-bold tabular-nums text-white">
                        <I.clock size={ICON_SIZE.sm} aria-hidden />
                        {r.duration_minutes} min
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-amber-300">{r.origin}</div>
                        <div className="text-2xl font-extrabold tracking-tight">{r.destination}</div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="line-clamp-2 flex-1 text-sm text-[var(--fg-soft)]">{r.description}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-dashed border-[var(--border)] pt-4">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--fg-mute)]">From</div>
                          <div className="text-lg font-extrabold tabular-nums">{formatIDR(r.base_price_idr)}</div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#0f1f2e] px-3 py-2 text-xs font-bold uppercase tracking-widest text-white group-hover:bg-amber-500">
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

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="bg-[#0f1f2e] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">— Why Tripix</p>
              <h2 id="about-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Adventure starts with a good crew
              </h2>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "ship",     title: "Modern fleet",   body: "Twin-engine boats, capacity capped for comfort." },
                { icon: "shield",   title: "Safety first",   body: "Life jackets and full briefings on every crossing." },
                { icon: "pin",      title: "Free pickup",    body: "Door-to-harbour transfers across south Bali." },
                { icon: "calendar", title: "Daily departures", body: "Multiple departures per route, every day." },
              ].map(({ icon, title, body }) => {
                const Icon = I[icon as keyof typeof I];
                return (
                  <li key={title} className="rounded-md border border-white/10 bg-white/5 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-amber-500 text-[#0f1f2e]">
                      <Icon size={ICON_SIZE.lg} aria-hidden />
                    </span>
                    <div className="mt-4 text-base font-bold">{title}</div>
                    <p className="mt-1.5 text-sm text-white/70">{body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <footer id="contact" className="bg-[#0a1521] py-14 text-white/85">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm sm:px-6">
            <div className="inline-flex items-center gap-2 text-xl font-extrabold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-amber-500">
                <I.ship size={ICON_SIZE.lg} aria-hidden />
              </span>
              Trip<span className="text-amber-400">ix</span>
            </div>
            <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5"><I.phone size={ICON_SIZE.sm} aria-hidden /> +1 333.456.8890</span>
              <span className="inline-flex items-center gap-1.5"><I.mail  size={ICON_SIZE.sm} aria-hidden /> info@tripix.example</span>
            </p>
            <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Tripix. Adventure responsibly.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
