import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Cyberussell",
  description: "Web design, AI automation, and digital strategy — at rates that make sense for growing businesses.",
  alternates: { canonical: "https://www.cyberussell.com/services" },
  openGraph: {
    title: "Your website. Your brand. Built to earn. — Cyberussell",
    description: "Web design, AI automation, and digital strategy — at rates that make sense for growing businesses.",
    url: "https://www.cyberussell.com/services",
    siteName: "Cyberussell",
    images: [
      {
        url: "/api/og/services",
        width: 1200,
        height: 630,
        alt: "Cyberussell Services — Built to earn.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your website. Your brand. Built to earn. — Cyberussell",
    description: "Web design, AI automation, and digital strategy — at rates that make sense for growing businesses.",
    images: ["/api/og/services"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
