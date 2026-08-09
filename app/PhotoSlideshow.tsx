"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { I } from "@/components/Icon";

export type Slide = { src: string; alt: string };

const AUTOPLAY_MS = 4500;

// Photo slideshow used by the tours, day-trips and fast-boat pages.
// One photo at a time, sliding track, auto-advance that pauses on hover/
// focus and stops entirely when the user prefers reduced motion.
//
// No caption is drawn over the photo — the client asked for the corner
// text to come off every slide ("hilangkan tulisan pojok kiri bawah di
// semua foto"), so `alt` carries the description for screen readers only.
export function PhotoSlideshow({ slides, label }: { slides: Slide[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Respect prefers-reduced-motion: no autoplay, no slide transition.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-advance.
  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <div
      className="group relative w-full"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-[var(--bg-mute)] ring-1 ring-[var(--border)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`flex ${reduced ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[16/9]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${s.alt}`}
              aria-hidden={i !== index}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Prev / next */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#0a4290] shadow-md ring-1 ring-black/5 backdrop-blur transition hover:bg-white focus-visible:opacity-100"
        >
          <I.chevronRight size={22} className="rotate-180" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#0a4290] shadow-md ring-1 ring-black/5 backdrop-blur transition hover:bg-white focus-visible:opacity-100"
        >
          <I.chevronRight size={22} aria-hidden />
        </button>

        {/* Position counter — replaces the caption the client asked us to drop */}
        <span className="absolute bottom-3 right-3 rounded-full bg-[#08265a]/70 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white backdrop-blur-sm">
          {index + 1} / {count}
        </span>
      </div>

      {/* Dots — a long set would wrap into a wall, so only show them for
          short galleries; the counter above covers the rest. */}
      {count <= 8 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-[#0a4290]" : "w-2.5 bg-[#0a4290]/30 hover:bg-[#0a4290]/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
