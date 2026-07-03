import type { Metadata } from "next";
import { I, ICON_SIZE } from "@/components/Icon";
import { BLOG_POSTS } from "../site";
import { SectionLabel } from "../ui";

export const metadata: Metadata = {
  title: "Bali, Gili & Nusa Penida Travel Blog",
  description:
    "Practical travel tips for fast boat schedules, Gili Islands, Nusa Penida and Bali day tours — written by a local team.",
};

const CATEGORY_STYLE: Record<string, string> = {
  "Fast Boat":    "bg-sky-50 text-sky-700 ring-sky-200",
  "Gili Islands": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Nusa Penida":  "bg-violet-50 text-violet-700 ring-violet-200",
  "Bali Tour":    "bg-amber-50 text-amber-800 ring-amber-200",
  "Travel Tips":  "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionLabel>From a local team</SectionLabel>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-5xl">
            Travel Tips for Bali, Gili &amp; Nusa Penida
          </h1>
          <p className="mt-3 max-w-xl text-[var(--fg-soft)]">
            Short, practical guides to help you plan your fast boat crossing, island
            day trip, or Bali tour.
          </p>
        </div>
      </section>

      {/* Listing */}
      <section aria-label="Articles" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <li key={post.title}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${CATEGORY_STYLE[post.category]}`}
                  >
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs tabular-nums text-[var(--fg-mute)]">
                    <I.clock size={ICON_SIZE.sm} aria-hidden />
                    {post.readMin} min read
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-[var(--fg-soft)]">{post.excerpt}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--fg-mute)]">
                  <I.calendar size={ICON_SIZE.sm} aria-hidden />
                  Publishing soon
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
