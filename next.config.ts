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
    // Multi-zone proxies for products that have been extracted into their own
    // standalone Next.js apps/repos, each deployed on its own Vercel project.
    // Each is independently gated on its own env var so that until it's set
    // (e.g. in a preview deployment for testing, then production), this app
    // keeps serving its own local pages for that product unchanged — the
    // rewrite only takes over once the zone URL is configured. Uses
    // beforeFiles (checked before local pages/static files) rather than the
    // default afterFiles behavior specifically so it can take priority over
    // local pages that still exist here during a transition, without needing
    // to delete them first.
    const beforeFiles: { source: string; destination: string }[] = []

    // Appointment System — cyberussellofficial-ctrl/appointmentsystems
    const appointmentsZoneUrl = process.env.APPOINTMENTS_ZONE_URL
    if (appointmentsZoneUrl) {
      beforeFiles.push(
        { source: "/appointments", destination: `${appointmentsZoneUrl}/appointments` },
        { source: "/appointments/:path+", destination: `${appointmentsZoneUrl}/appointments/:path+` },
        { source: "/appointments-assets/:path+", destination: `${appointmentsZoneUrl}/appointments-assets/:path+` },
      )
    }

    // Laundry Management System — cyberussellofficial-ctrl/laundrymanagementsystem
    const lmsZoneUrl = process.env.LMS_ZONE_URL
    if (lmsZoneUrl) {
      beforeFiles.push(
        { source: "/lms", destination: `${lmsZoneUrl}/lms` },
        { source: "/lms/:path+", destination: `${lmsZoneUrl}/lms/:path+` },
        { source: "/lms-assets/:path+", destination: `${lmsZoneUrl}/lms-assets/:path+` },
      )
    }

    // Territory Management System — cyberussellofficial-ctrl/territorymanagementsystem
    const tmsZoneUrl = process.env.TMS_ZONE_URL
    if (tmsZoneUrl) {
      beforeFiles.push(
        { source: "/tms", destination: `${tmsZoneUrl}/tms` },
        { source: "/tms/:path+", destination: `${tmsZoneUrl}/tms/:path+` },
        { source: "/tms-assets/:path+", destination: `${tmsZoneUrl}/tms-assets/:path+` },
      )
    }

    return { beforeFiles }
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
        source: "/territory-management-system",
        destination: "/tms/login",
        permanent: true,
      },
      {
        source: "/territory-management-system/:path*",
        destination: "/tms/:path*",
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
