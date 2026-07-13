import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Covers any Supabase project's public storage URLs (LMS business
      // logos, etc.) without hardcoding one project ref.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
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
