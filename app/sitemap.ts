import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./mydaygili/blog/posts";
import { SITE_URL } from "./mydaygili/site";

// Landing pages first, then every blog post. Keeps Google from having to
// discover the articles by crawling alone — each one targets its own keyword.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/mydaygili`,                   changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE_URL}/mydaygili/fast-boat-tickets`, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/mydaygili/day-trips`,         changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/mydaygili/bali-tours`,        changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/mydaygili/blog`,              changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/mydaygili/contact`,           changeFrequency: "monthly", priority: 0.5 },
  ];

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/mydaygili/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
