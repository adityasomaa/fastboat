import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { I, ICON_SIZE } from "@/components/Icon";
import { formatDate } from "@/lib/format";
import { SectionLabel } from "../ui";
import { BLOG_POSTS } from "./posts";

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
  const posts = [...BLOG_POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );

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
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/mydaygili/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)] transition duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden bg-[var(--bg-mute)]">
                  <Image
                    src={post.heroImage}
                    alt={post.heroAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                  <span
                    className={`absolute left-3 top-3 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${CATEGORY_STYLE[post.category]}`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold leading-snug tracking-tight group-hover:text-[#0a4290]">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-[var(--fg-soft)]">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[var(--fg-mute)]">
                    <span className="inline-flex items-center gap-1.5">
                      <I.calendar size={ICON_SIZE.sm} aria-hidden />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <I.clock size={ICON_SIZE.sm} aria-hidden />
                      {post.readMin} min read
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
