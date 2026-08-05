import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Next.js's default Server Action body limit is 1MB — far below the 5MB the Territory
  // Management System's map-upload UI already advertises ("JPG or PNG — up to 5MB"), and below
  // that app-level check's own MAP_MAX_BYTES constant. A file over 1MB never even reached that
  // check; the framework itself rejected the whole request with a raw 413 before the Server
  // Action ran, surfacing as an unhelpful "Something went wrong" error boundary instead of the
  // friendly "Map image must be under 5MB." message the action already returns. This is a
  // global setting (Next.js has no per-route body limit), so it raises the ceiling for every
  // Server Action across all products — the existing 5MB app-level check is still what actually
  // enforces the real limit.
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  images: {
    remotePatterns: [
      // Covers any Supabase project's public storage URLs (LMS business
      // logos, etc.) without hardcoding one project ref.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  async rewrites() {
    // Multi-zone proxy for the Appointment System, now a standalone Next.js
    // app (cyberussellofficial-ctrl/appointmentsystems) deployed on its own
    // Vercel project. Gated on an env var so that until it's set (e.g. in a
    // preview deployment for testing, then production), this app keeps
    // serving its own local src/app/appointments/** unchanged — the rewrite
    // only takes over once APPOINTMENTS_ZONE_URL is configured. Uses
    // beforeFiles (checked before local pages/static files) rather than the
    // default afterFiles behavior specifically so it can take priority over
    // the local appointment-system pages that still exist here during the
    // transition, without needing to delete them first.
    const zoneUrl = process.env.APPOINTMENTS_ZONE_URL
    if (!zoneUrl) return { beforeFiles: [] }
    return {
      beforeFiles: [
        { source: "/appointments", destination: `${zoneUrl}/appointments` },
        { source: "/appointments/:path+", destination: `${zoneUrl}/appointments/:path+` },
        { source: "/appointments-assets/:path+", destination: `${zoneUrl}/appointments-assets/:path+` },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: "/platforms",
        destination: "/earn/freelance-platforms",
        permanent: true,
      },
      {
        source: "/demo/booklypro",
        destination: "/demo/appointment-system",
        permanent: true,
      },
      {
        source: "/portfolio/booklypro",
        destination: "/portfolio/appointment-system",
        permanent: true,
      },
      {
        source: "/tms",
        destination: "/territory-management-system/login",
        permanent: true,
      },
      {
        source: "/tms/:path*",
        destination: "/territory-management-system/:path*",
        permanent: true,
      },
      {
        source: "/laundry-management-system",
        destination: "/lms",
        permanent: true,
      },
      {
        source: "/laundry-management-system/:path*",
        destination: "/lms/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/:path*.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
