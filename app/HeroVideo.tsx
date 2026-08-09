"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type HeroClip = {
  src: string;
  poster: string;
  label: string;
  alt: string;
};

// Hero background video, used by the home and fast-boat-ticket pages.
// Pass more than one clip and it grows an A/B switcher so the client can
// compare them on the real page; with a single clip the switcher is gone.
export function HeroVideo({ clips }: { clips: HeroClip[] }) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const clip = clips[index];

  // No autoplaying background video for anyone who asked the OS for less
  // motion — they get the poster frame instead.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Switching source needs an explicit load() + play(); autoplay only fires
  // on first mount.
  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;
    el.load();
    el.play().catch(() => {
      /* autoplay can still be refused; the poster stays visible */
    });
  }, [index, reduced]);

  return (
    <>
      {reduced ? (
        <Image
          src={clip.poster}
          alt={clip.alt}
          fill
          sizes="100vw"
          preload
          className="object-cover"
        />
      ) : (
        <video
          ref={video}
          poster={clip.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={clip.alt}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={clip.src} type="video/mp4" />
        </video>
      )}

      {/* Review control — only worth showing while there's a choice to make */}
      {clips.length > 1 && (
        <div
          role="group"
          aria-label="Choose hero video"
          className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-full bg-[#08265a]/70 p-1 ring-1 ring-white/25 backdrop-blur-sm"
        >
          {clips.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                i === index
                  ? "bg-white text-[#0a4290]"
                  : "text-white/85 hover:bg-white/15"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
