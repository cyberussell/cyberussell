import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClaudeGuide from "@/components/ClaudeGuide";

export const metadata: Metadata = {
  title: "How to Use Claude AI to Start Earning Online — Cyberussell",
  description: "7 steps with 10 copy-ready prompts. A real Filipino's guide to using Claude AI to find direction and earn.",
  alternates: { canonical: "https://www.cyberussell.com/guides/claude-ai" },
  openGraph: {
    title: "How to Use Claude AI to Start Earning Online — Cyberussell",
    description: "7 steps with 10 copy-ready prompts. A real Filipino's guide to using Claude AI to find direction and earn.",
    url: "https://www.cyberussell.com/guides/claude-ai",
    siteName: "Cyberussell",
    images: [{ url: "https://www.cyberussell.com/og/og-claude-guide.jpg", width: 1200, height: 630, alt: "How to Use Claude AI to Start Earning Online — Cyberussell" }],
    locale: "fil_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Use Claude AI to Start Earning Online — Cyberussell",
    description: "7 steps with 10 copy-ready prompts. A real Filipino's guide to using Claude AI to find direction and earn.",
    images: ["https://www.cyberussell.com/og/og-claude-guide.jpg"],
  },
};

export default function ClaudeAIGuidePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.cyberussell.com/guides" },
      { "@type": "ListItem", position: 3, name: "How to Use Claude AI to Start Earning Online", item: "https://www.cyberussell.com/guides/claude-ai" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
        <ClaudeGuide />
      </main>
      <Footer />
    </>
  );
}
