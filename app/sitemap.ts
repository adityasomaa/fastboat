import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/posts";
import { SITE_URL } from "./site";

// Landing pages first, then every blog post. Keeps Google from having to
// discover the articles by crawling alone — each one targets its own keyword.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                        changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE_URL}/fast-boat-tickets`, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/day-trips`,         changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/bali-tours`,        changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/blog`,              changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/contact`,           changeFrequency: "monthly", priority: 0.5 },
  ];

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
