import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClaudeGuide from "@/components/ClaudeGuide";

export const metadata: Metadata = {
  title: "How to Use Claude AI to Start Earning Online — Cyberussell",
  description:
    "A real Filipino's guide to using Claude AI to find direction, build a business strategy, and start earning online. Real prompts. Honest story. Free.",
  openGraph: {
    title: "How to Use Claude AI to Start Earning Online — Cyberussell",
    description:
      "A real Filipino's guide to using Claude AI to find direction, build a business strategy, and start earning online.",
    url: "https://www.cyberussell.com/guides/claude-ai",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ClaudeAIGuidePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
        <ClaudeGuide />
      </main>
      <Footer />
    </>
  );
}
