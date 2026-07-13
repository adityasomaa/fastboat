import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { I, ICON_SIZE } from "@/components/Icon";
import { formatDate } from "@/lib/format";
import { BUSINESS, WA_GENERAL } from "../../site";
import { WaButton } from "../../ui";
import { BLOG_POSTS, getPost } from "../posts";

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
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
              {s.body.split("\n\n").map((para, i) => (
                <p key={i} className="mt-3 text-[15px] leading-relaxed text-[var(--fg-soft)]">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Key takeaways */}
        <div className="mt-10 rounded-2xl bg-[#eef4fc] p-6 ring-1 ring-[#c3d5f2]">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#0a4290]">Key takeaways</h2>
          <ul className="mt-3 space-y-2.5">
            {post.keyTakeaways.map((k) => (
              <li key={k} className="flex items-start gap-2 text-[15px]">
                <I.checkCircle size={ICON_SIZE.md} className="mt-0.5 shrink-0 text-[#0a4290]" aria-hidden />
                {k}
              </li>
            ))}
          </ul>
        </div>

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
