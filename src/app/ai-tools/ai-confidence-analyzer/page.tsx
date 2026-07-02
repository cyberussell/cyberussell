import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIConfidenceAnalyzer from "@/components/AIConfidenceAnalyzer";

export const metadata: Metadata = {
  title: "AI Confidence Analyzer — Real AI Skills Test | Cyberussell",
  description:
    "Write real prompts graded by AI, spot a hallucination, compare AI responses — a practical test of how well you actually use AI, not trivia. Get your score and career matches. Free.",
  alternates: { canonical: "https://www.cyberussell.com/ai-tools/ai-confidence-analyzer" },
  openGraph: {
    title: "AI Confidence Analyzer — Real AI Skills Test",
    description:
      "Write real prompts graded by AI, spot a hallucination, compare AI responses. Get your AI Confidence Score and career matches.",
    url: "https://www.cyberussell.com/ai-tools/ai-confidence-analyzer",
    siteName: "Cyberussell",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Confidence Analyzer — Real AI Skills Test",
    description:
      "Not trivia — real tasks. Get your AI Confidence Score, strengths, weaknesses, and career matches.",
    images: ["/api/og"],
  },
};

export default function AIConfidenceAnalyzerPage() {
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
              AI Confidence Analyzer
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/50 max-w-xl mx-auto leading-[1.7]">
              Real tasks, not trivia. See how well you actually use AI — and get your prompts graded.
            </p>
          </div>

          <AIConfidenceAnalyzer />
        </div>
      </main>
      <Footer />
    </>
  );
}
