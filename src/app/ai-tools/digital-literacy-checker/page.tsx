import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DigitalLiteracyChecker from "@/components/DigitalLiteracyChecker";

export const metadata: Metadata = {
  title: "AI Digital Literacy Checker — Free Skills Assessment | Cyberussell",
  description:
    "Test your digital literacy across internet, email, cloud files, video calls, and online security. Get an AI-powered score, strengths, weaknesses, and career matches. Free.",
  alternates: { canonical: "https://www.cyberussell.com/ai-tools/digital-literacy-checker" },
  openGraph: {
    title: "AI Digital Literacy Checker — Free Skills Assessment",
    description:
      "Answer questions that adapt to your skill level. Get your Digital Literacy Score, a personalized breakdown, and the online careers that match you best.",
    url: "https://www.cyberussell.com/ai-tools/digital-literacy-checker",
    siteName: "Cyberussell",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Digital Literacy Checker — Free Skills Assessment",
    description:
      "Answer questions that adapt to your skill level. Get your Digital Literacy Score and see which online careers match you best.",
    images: ["/api/og"],
  },
};

export default function DigitalLiteracyCheckerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#4F8EF7] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
                AI-Powered Assessment
              </span>
            </div>
            <h1 className="font-sans text-[32px] md:text-[42px] font-bold text-white mb-3">
              AI Digital Literacy Checker
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/50 max-w-xl mx-auto leading-[1.7]">
              Find out how ready you are for online work — and which careers fit your current skills.
            </p>
          </div>

          <DigitalLiteracyChecker />
        </div>
      </main>
      <Footer />
    </>
  );
}
