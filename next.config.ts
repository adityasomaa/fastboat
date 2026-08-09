import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's image optimizer answers every /_next/image request on this
    // account with 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED — the plan's
    // transformation quota is used up, which broke every photo on the live
    // site at once, old ones included. Serving the files straight from
    // public/ sidesteps the optimizer entirely, so they are all pre-sized and
    // compressed for the slot they render in. Flip this back to optimized if
    // the plan ever gains the quota for it.
    unoptimized: true,
  },

  // The site used to live under /mydaygili; on its own domain that prefix is
  // just noise, so everything moved to the root. These keep the old links
  // working — the client, their WhatsApp threads and Google all still point
  // at the prefixed URLs.
  //
  // Listed one by one on purpose. Redirects are checked before /public, so a
  // catch-all `/mydaygili/:path*` would swallow every image request too and
  // send it somewhere that does not exist.
  async redirects() {
    const routes = [
      "fast-boat-tickets",
      "day-trips",
      "bali-tours",
      "blog",
      "contact",
    ];
    return [
      { source: "/mydaygili", destination: "/", permanent: true },
      ...routes.map((r) => ({
        source: `/mydaygili/${r}`,
        destination: `/${r}`,
        permanent: true,
      })),
      { source: "/mydaygili/blog/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
