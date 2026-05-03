import Link from "next/link";
import Image from "next/image";
import { getRoutes } from "@/lib/data/queries";
import { formatIDR } from "@/lib/format";
import { I, ICON_SIZE } from "@/components/Icon";
import { BookingSearch } from "../design-4/booking-search";

export const metadata = { title: "Travo Bali — Tour Booking" };

// Design 5 — Travo inspired.
// • Top orange utility bar (slightly angled), email + address + social
// • White nav with bold logo, search circle, hamburger circle, "Request A Quote" CTA
// • Hero: full-bleed photo, cursive orange tagline + HUGE bold headline + 2 CTAs
// • Booking widget: 4 fields with circle icons next to labels + orange Search

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#ff6b3d",
  ["--primary" as string]: "#1a1c2c",
  ["--primary-fg" as string]: "#ffffff",
};

export default async function Design5() {
  const routes = await getRoutes();

  return (
    <main className="min-h-screen bg-white text-[#1a1c2c]" style={ACCENT}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--primary-fg)]"
      >
        Skip to content
      </a>

      {/* Top utility bar (orange, angled corners) */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="flex items-center justify-between gap-4 bg-[#ff6b3d] px-6 py-2 text-xs text-white"
            style={{ clipPath: "polygon(20px 0, calc(100% - 20px) 0, 100% 100%, 0 100%)" }}
          >
            <div className="flex items-center gap-5">
              <a href="mailto:info-help@travo.com" className="tap-target inline-flex items-center gap-1.5 hover:text-white/80">
                <I.mail size={12} aria-hidden /> info-help@travo.com
              </a>
              <span className="inline-flex items-center gap-1.5">
                <I.pin size={12} aria-hidden /> 258 Street Avenue, Berlin, Germany
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/85">
              <a href="#" aria-label="Facebook"  className="tap-target grid place-items-center hover:text-white"><I.users   size={14} aria-hidden /></a>
              <a href="#" aria-label="Twitter"   className="tap-target grid place-items-center hover:text-white"><I.message size={14} aria-hidden /></a>
              <a href="#" aria-label="Instagram" className="tap-target grid place-items-center hover:text-white"><I.star    size={14} aria-hidden /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/design-5"
            className="tap-target inline-flex items-center gap-2 px-1 text-2xl font-extrabold tracking-tight"
            aria-label="Travo home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff6b3d] text-white">
              <I.ship size={ICON_SIZE.lg} aria-hidden />
            </span>
            Travo
          </Link>
          <nav aria-label="Primary" className="hidden gap-1 lg:flex">
            {[
              ["Home", "#", true],
              ["About Us", "#about", false],
              ["Routes", "#routes", false],
              ["Pages", "#pages", false],
              ["Blog", "#blog", false],
              ["Contact Us", "#contact", false],
            ].map(([label, href, active]) => (
              <a
                key={String(label)}
                href={String(href)}
                aria-current={active ? "page" : undefined}
                className={`tap-target inline-flex items-center rounded-md px-3 text-sm font-bold transition ${
                  active ? "text-[#ff6b3d]" : "text-[#1a1c2c] hover:text-[#ff6b3d]"
                }`}
              >
                {label}
                <I.chevronDown size={14} aria-hidden className="ml-1 opacity-60" />
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
              href="/design-5/admin"
              aria-label="Admin"
              className="tap-target hidden grid place-items-center rounded-full bg-[var(--bg-mute)] hover:bg-[var(--border)] h-11 w-11 sm:grid"
            >
              <I.menu size={ICON_SIZE.md} aria-hidden />
            </Link>
            <a
              href="https://wa.me/6281234567890"
              className="tap-target inline-flex items-center gap-2 rounded-full bg-[#ff6b3d] px-5 text-sm font-bold text-white shadow-md hover:bg-[#e0552c]"
            >
              <span className="hidden sm:inline">Request A Quote</span>
              <span className="sm:hidden">Quote</span>
              <I.arrowRight size={ICON_SIZE.md} aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <div id="main">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="relative isolate">
          <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=2200"
              alt="Bali sunset over the sea"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#1a1c2c]/60 via-[#1a1c2c]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6">
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-2xl text-white">
                  <p className="font-script text-3xl text-[#ff8a5e] sm:text-4xl">Experience unmatched delight with us.</p>
                  <h1 id="hero-title" className="mt-2 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                    Where exceptional<br />memories begin
                  </h1>
                  <p className="mt-5 max-w-md text-base text-white/85">
                    Bali fastboat crossings to Nusa Penida, Lembongan, and the Gilis —
                    plus private charters for your group.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#book"
                      className="tap-target inline-flex items-center gap-2 rounded-full bg-[#ff6b3d] px-7 text-sm font-bold text-white shadow-lg hover:bg-[#e0552c]"
                    >
                      Let's get started
                      <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                    </a>
                    <a
                      href="#routes"
                      className="tap-target inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-7 text-sm font-bold text-white hover:bg-white/10"
                    >
                      Discover more
                      <I.arrowRight size={ICON_SIZE.md} aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking card overlapping bottom of hero */}
          <div id="book" className="relative -mt-12 px-4 sm:-mt-16 sm:px-6">
            <div className="mx-auto max-w-6xl rounded-2xl bg-[#fdf3ec] p-6 shadow-xl ring-1 ring-[#ff6b3d]/10 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
                <FieldGroup label="Location" icon="pin">
                  <select className="tap-target w-full appearance-none bg-transparent text-base font-medium text-[#1a1c2c] outline-none">
                    {routes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.origin} → {r.destination}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
                <FieldGroup label="Check In" icon="calendar">
                  <input type="date" defaultValue={new Date(Date.now() + 86400000).toISOString().slice(0,10)} className="tap-target w-full bg-transparent text-base font-medium text-[#1a1c2c] outline-none" />
                </FieldGroup>
                <FieldGroup label="Check Out" icon="calendar">
                  <input type="date" defaultValue={new Date(Date.now() + 2*86400000).toISOString().slice(0,10)} className="tap-target w-full bg-transparent text-base font-medium text-[#1a1c2c] outline-none" />
                </FieldGroup>
                <FieldGroup label="Guests" icon="users">
                  <select className="tap-target w-full appearance-none bg-transparent text-base font-medium text-[#1a1c2c] outline-none">
                    <option>2 adults</option>
                    <option>1 adult</option>
                    <option>3 adults</option>
                    <option>4+ adults</option>
                  </select>
                </FieldGroup>
                <Link
                  href={`/design-5/booking?route=${routes[0]?.id ?? ""}`}
                  className="tap-target inline-flex items-center justify-center gap-2 self-end rounded-full bg-[#ff6b3d] px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-[#e0552c]"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Gateway / About */}
        <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p className="font-script text-3xl text-[#ff6b3d] sm:text-4xl">We care about your happiness</p>
            <h2 id="about-title" className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              We are your gateway to adventure
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--fg-soft)]">
              At Travo Bali, we believe in the transformative power of travel. As avid sailors ourselves,
              we understand the desire to uncover new experiences and forge meaningful memories.
            </p>
          </div>
        </section>

        {/* Routes */}
        <section id="routes" aria-labelledby="routes-title" className="bg-[var(--bg-soft)] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-3xl text-[#ff6b3d] sm:text-4xl">Popular crossings</p>
              <h2 id="routes-title" className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Pick your island
              </h2>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/design-5/booking?route=${r.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)] transition duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-xl"
                    aria-label={`Book ${r.origin} to ${r.destination}, from ${formatIDR(r.base_price_idr)}`}
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
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold tabular-nums text-[#1a1c2c]">
                        <I.clock size={ICON_SIZE.sm} aria-hidden />
                        {r.duration_minutes} min
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="text-xs font-semibold uppercase tracking-widest text-[var(--fg-mute)]">{r.origin}</div>
                      <div className="mt-1 text-xl font-extrabold tracking-tight">→ {r.destination}</div>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--fg-soft)]">{r.description}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--fg-mute)]">From</div>
                          <div className="text-lg font-extrabold tabular-nums text-[#ff6b3d]">{formatIDR(r.base_price_idr)}</div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#1a1c2c] px-3 py-2 text-xs font-bold text-white group-hover:bg-[#ff6b3d]">
                          Book
                          <I.arrowRight size={ICON_SIZE.sm} aria-hidden />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer id="contact" className="bg-[#1a1c2c] py-14 text-white/85">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm sm:px-6">
            <div className="inline-flex items-center gap-2 text-2xl font-extrabold text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff6b3d]">
                <I.ship size={ICON_SIZE.lg} aria-hidden />
              </span>
              Travo
            </div>
            <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5"><I.phone size={ICON_SIZE.sm} aria-hidden /> +62 812 3456 7890</span>
              <span className="inline-flex items-center gap-1.5"><I.mail  size={ICON_SIZE.sm} aria-hidden /> hello@travo.example</span>
            </p>
            <p className="mt-6 text-xs text-white/50">
              © {new Date().getFullYear()} Travo Bali ·{" "}
              <Link href="/design-5/admin" className="text-[#ff8a5e] hover:underline">Admin</Link>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

function FieldGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon: keyof typeof I;
  children: React.ReactNode;
}) {
  const Icon = I[icon];
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--fg-soft)] ring-1 ring-[var(--border)]">
          <Icon size={ICON_SIZE.md} aria-hidden />
        </span>
        <span className="text-sm font-bold text-[#1a1c2c]">{label}</span>
      </div>
      <div className="ml-11 mt-1.5">{children}</div>
    </div>
  );
}
