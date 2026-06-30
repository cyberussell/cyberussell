import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SkillFinderWidget from "@/components/SkillFinderWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Discover Your Best Online Skill — Free Skill Finder | Cyberussell",
  description:
    "Answer a few questions and discover the best online skill for your background, time, and income goal. Free, no sign-up required.",
  alternates: { canonical: "https://www.cyberussell.com/skill-finder" },
  openGraph: {
    title: "Discover Your Best Online Skill | Cyberussell",
    description:
      "Take the Skill Finder quiz and discover the best online skill for you.",
    url: "https://www.cyberussell.com/skill-finder",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Your Best Online Skill | Cyberussell",
    description:
      "Take the Skill Finder quiz and discover the best online skill for you.",
    images: ["/og-image.jpg?v=2"],
  },
};

export default function SkillFinderPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "Skill Finder", item: "https://www.cyberussell.com/skill-finder" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <SkillFinderWidget />
      </main>
      <Footer />
    </>
  );
}
