// next.config.ts
import type { NextConfig } from "next";

// Sentry will be imported here once @sentry/nextjs is installed
// import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Enable Turbopack explicitly
  turbopack: {},

  // REMOVE webpack() completely — Turbopack will error if it exists
  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;

// TODO: Uncomment and update once @sentry/nextjs is installed
// module.exports = withSentryConfig(nextConfig, {
//   org: process.env.SENTRY_ORG,
//   project: process.env.SENTRY_PROJECT,
//   authToken: process.env.SENTRY_AUTH_TOKEN,
// });
