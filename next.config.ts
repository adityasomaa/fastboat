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
};

export default nextConfig;
