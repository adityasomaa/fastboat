import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { I, ICON_SIZE } from "@/components/Icon";
import { formatDate } from "@/lib/format";
import { BUSINESS, WA_GENERAL } from "../../site";
import { WaButton } from "../../ui";
import { BLOG_POSTS, getPost, type BlogTable } from "../posts";

// Pre-render every post at build time.
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.excerpt,
    openGraph: {
      title: post.metaTitle,
      description: post.excerpt,
      images: [post.heroImage],
      type: "article",
    },
  };
}

const CATEGORY_STYLE: Record<string, string> = {
  "Fast Boat":    "bg-sky-50 text-sky-700 ring-sky-200",
  "Gili Islands": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Nusa Penida":  "bg-violet-50 text-violet-700 ring-violet-200",
  "Bali Tour":    "bg-amber-50 text-amber-800 ring-amber-200",
  "Travel Tips":  "bg-rose-50 text-rose-700 ring-rose-200",
};

// Renders one section body. Blocks are blank-line separated; a block whose
// lines all start with "- " becomes a bullet list, "1. " a numbered list.
function SectionBody({ text }: { text: string }) {
  const blocks = text.split("\n\n").map((b) => b.trim()).filter(Boolean);

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="mt-3 space-y-2">
              {lines.map((l) => (
                <li
                  key={l}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--fg-soft)]"
                >
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a4290]" />
                  {l.replace(/^-\s+/, "")}
                </li>
              ))}
            </ul>
          );
        }

        if (lines.every((l) => /^\d+\.\s/.test(l))) {
          return (
            <ol key={i} className="mt-3 space-y-2.5">
              {lines.map((l, n) => (
                <li
                  key={l}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--fg-soft)]"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e8effc] text-[11px] font-bold tabular-nums text-[#0a4290]"
                  >
                    {n + 1}
                  </span>
                  {l.replace(/^\d+\.\s+/, "")}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={i} className="mt-3 text-[15px] leading-relaxed text-[var(--fg-soft)]">
            {block}
          </p>
        );
      })}
    </>
  );
}

// Optional comparison table under a section (scrolls on narrow screens).
function SectionTable({ table }: { table: BlogTable }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl ring-1 ring-[var(--border)]">
      <table className="min-w-full text-sm">
        <thead className="bg-[#0a4290] text-left text-white">
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)] bg-white">
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={
                    i === 0
                      ? "whitespace-nowrap px-4 py-3 font-bold text-[#08265a]"
                      : "px-4 py-3 text-[var(--fg-soft)]"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);
  const fallback = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const more = related.length >= 2 ? related : fallback;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: BUSINESS.name },
    articleSection: post.category,
    keywords: post.keyword,
  };

  // Every article ships an FAQ block, so emit FAQPage schema for rich results.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <header className="relative isolate">
        <div className="relative min-h-[360px] w-full overflow-hidden sm:min-h-[420px]">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#08265a]/85 via-[#08265a]/45 to-[#08265a]/25" />
          <div className="absolute inset-0 flex items-end px-4 pb-10 sm:px-6">
            <div className="mx-auto w-full max-w-3xl text-white">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${CATEGORY_STYLE[post.category]}`}>
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/85">
                  <I.calendar size={ICON_SIZE.sm} aria-hidden />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs tabular-nums text-white/85">
                  <I.clock size={ICON_SIZE.sm} aria-hidden />
                  {post.readMin} min read
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--fg-mute)]">
          <Link href="/mydaygili/blog" className="inline-flex items-center gap-1 font-medium hover:text-[#0a4290]">
            <I.chevronRight size={ICON_SIZE.sm} className="rotate-180" aria-hidden />
            All articles
          </Link>
        </nav>

        {/* Lead */}
        <p className="text-lg font-medium leading-relaxed text-[#0b1d39]">{post.lead}</p>

        {/* Body sections */}
        <div className="mt-8 space-y-8">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-bold tracking-tight text-[#0a4290]">{s.heading}</h2>
              <SectionBody text={s.body} />
              {s.table ? <SectionTable table={s.table} /> : null}
            </section>
          ))}
        </div>

        {/* FAQ — authored per article; also emitted above as FAQPage schema */}
        <section aria-labelledby="faq-title" className="mt-10">
          <h2 id="faq-title" className="text-xl font-bold tracking-tight text-[#0a4290]">
            Frequently Asked Questions
          </h2>
          <dl className="mt-4 divide-y divide-[#c3d5f2] rounded-2xl bg-[#eef4fc] px-6 ring-1 ring-[#c3d5f2]">
            {post.faqs.map((f) => (
              <div key={f.q} className="py-4">
                <dt className="text-[15px] font-bold text-[#08265a]">{f.q}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-[var(--fg-soft)]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Closing note that ends every article */}
        <p className="mt-8 border-l-2 border-[#0a4290] pl-4 text-[15px] leading-relaxed text-[var(--fg-soft)]">
          {post.closing}
        </p>

        {/* CTA — WhatsApp + related landing page (client pattern) */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-[#0a4290] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Ready to plan your trip?</h2>
            <p className="mt-1 text-sm text-white/80">
              Message us on WhatsApp — we reply within minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WaButton href={WA_GENERAL}>Chat on WhatsApp</WaButton>
            <Link
              href={post.related.href}
              className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#0a4290] hover:bg-[#e8effc]"
            >
              {post.related.label}
              <I.arrowRight size={ICON_SIZE.md} aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* More articles */}
      <section aria-label="More articles" className="border-t border-[var(--border)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">More articles</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/mydaygili/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)] transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden bg-[var(--bg-mute)]">
                    <Image
                      src={p.heroImage}
                      alt={p.heroAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${CATEGORY_STYLE[p.category]}`}>
                      {p.category}
                    </span>
                    <h3 className="mt-2 text-base font-bold leading-snug group-hover:text-[#0a4290]">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
