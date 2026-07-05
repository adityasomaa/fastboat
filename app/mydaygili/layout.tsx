import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { SiteNav } from "./nav";
import {
  BUSINESS,
  LOCAL_BUSINESS_JSONLD,
  TRIPADVISOR_URL,
  WA_GENERAL,
  WA_NUMBER,
} from "./site";

export const metadata: Metadata = {
  title: {
    default: "My Day Gili | Fast Boat to Gili & Lombok from IDR 375K",
    template: "%s | My Day Gili",
  },
  description:
    "Book fast boat tickets from Bali to Gili Trawangan, Gili Air, Lombok & Nusa Penida. Day trips & Bali tours. 5★ rated on TripAdvisor. Trusted since 2017.",
};

const ACCENT: React.CSSProperties = {
  ["--ring" as string]: "#0a4290",
  ["--primary" as string]: "#0a4290",
  ["--primary-fg" as string]: "#ffffff",
};

export default function MyDayGiliLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#08265a]" style={ACCENT}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSONLD) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--primary-fg)]"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main">{children}</main>

      {/* Sticky WhatsApp button — required on every page (client brief) */}
      <a
        href={WA_GENERAL}
        aria-label="Chat with My Day Gili on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
      >
        <I.message size={26} aria-hidden />
      </a>

      {/* Footer */}
      <footer className="bg-[#08265a] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src="/mydaygili/logo-white.png"
              alt="My Day Gili — Fastboat and Bali Tour"
              width={144}
              height={70}
              className="h-14 w-auto"
            />
            <p className="mt-3 max-w-sm text-sm text-white/70">
              {BUSINESS.tagline}. Comfortable, safe crossings on real fast ferries —
              trusted by travelers since {BUSINESS.since}.
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-white/70">
              <I.pin size={ICON_SIZE.sm} className="mt-0.5" aria-hidden />
              {BUSINESS.location}
            </p>
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              <I.star size={ICON_SIZE.sm} className="fill-emerald-400 text-emerald-400" aria-hidden />
              {BUSINESS.rating} / 5 on TripAdvisor · {BUSINESS.reviewCount} reviews
            </a>
          </div>
          <nav aria-label="Footer" className="text-sm">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9cc4ff]">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-white/85">
              <li><Link href="/mydaygili/fast-boat-tickets" className="hover:text-white hover:underline">Fast Boat Tickets</Link></li>
              <li><Link href="/mydaygili/day-trips" className="hover:text-white hover:underline">Gili & Nusa Penida Day Trips</Link></li>
              <li><Link href="/mydaygili/bali-tours" className="hover:text-white hover:underline">Bali Tours & Transfer</Link></li>
              <li><Link href="/mydaygili/blog" className="hover:text-white hover:underline">Travel Blog</Link></li>
              <li><Link href="/mydaygili/contact" className="hover:text-white hover:underline">Contact</Link></li>
            </ul>
          </nav>
          <div className="text-sm">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9cc4ff]">
              Book & Ask
            </h3>
            <p className="mt-3 inline-flex items-center gap-2 text-white/85">
              <I.message size={ICON_SIZE.sm} aria-hidden />
              WhatsApp +{WA_NUMBER}
            </p>
            <a
              href={WA_GENERAL}
              className="tap-target mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white hover:brightness-95"
            >
              <I.message size={ICON_SIZE.md} aria-hidden />
              Chat with us
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/50 sm:px-6">
          © {new Date().getFullYear()} {BUSINESS.name} · {BUSINESS.location}
        </div>
      </footer>
    </div>
  );
}
