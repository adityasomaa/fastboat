"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { I, ICON_SIZE } from "@/components/Icon";
import { WA_GENERAL } from "./site";

const LINKS = [
  { href: "/mydaygili", label: "Home" },
  { href: "/mydaygili/fast-boat-tickets", label: "Fast Boat Tickets" },
  { href: "/mydaygili/day-trips", label: "Day Trips" },
  { href: "/mydaygili/bali-tours", label: "Bali Tours" },
  { href: "/mydaygili/blog", label: "Blog" },
  { href: "/mydaygili/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/mydaygili" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/mydaygili"
          className="tap-target inline-flex items-center px-1"
          aria-label="My Day Gili home"
        >
          <Image
            src="/mydaygili/logo.png"
            alt="My Day Gili — Fastboat and Bali Tour"
            width={123}
            height={60}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Primary" className="hidden gap-0.5 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`tap-target relative inline-flex items-center rounded-md px-3 text-sm font-semibold transition ${
                isActive(l.href)
                  ? "text-[#0a4290]"
                  : "text-[#08265a] hover:text-[#0a4290]"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-[#0a4290]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WA_GENERAL}
            className="tap-target hidden items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-bold text-white shadow-sm transition hover:brightness-95 sm:inline-flex"
          >
            <I.message size={ICON_SIZE.md} aria-hidden />
            WhatsApp
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="tap-target grid h-11 w-11 place-items-center rounded-lg text-[#08265a] hover:bg-[var(--bg-mute)] lg:hidden"
          >
            {open ? <I.close size={ICON_SIZE.lg} aria-hidden /> : <I.menu size={ICON_SIZE.lg} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-[var(--border)] bg-white lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`tap-target flex items-center justify-between rounded-lg px-3 text-base font-semibold ${
                    isActive(l.href) ? "text-[#0a4290]" : "text-[#08265a]"
                  }`}
                >
                  {l.label}
                  <I.chevronRight size={ICON_SIZE.md} aria-hidden className="text-[var(--fg-mute)]" />
                </Link>
              </li>
            ))}
            <li className="py-2">
              <a
                href={WA_GENERAL}
                className="tap-target flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white"
              >
                <I.message size={ICON_SIZE.md} aria-hidden />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
