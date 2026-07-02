import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComputerSkillsAnalyzer from "@/components/ComputerSkillsAnalyzer";

export const metadata: Metadata = {
  title: "AI Computer Skills Analyzer — Hands-On Skills Test | Cyberussell",
  description:
    "13 hands-on simulations that measure your real computer skills — file management, typing, spreadsheets, uploads, word processing. Get an AI score and career matches. Free.",
  alternates: { canonical: "https://www.cyberussell.com/ai-tools/computer-skills-analyzer" },
  openGraph: {
    title: "AI Computer Skills Analyzer — Hands-On Skills Test",
    description:
      "Rename files, sort a spreadsheet, spot the real download button, format text — real simulations, not a quiz. Get your Computer Skills Score and career matches.",
    url: "https://www.cyberussell.com/ai-tools/computer-skills-analyzer",
    siteName: "Cyberussell",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Computer Skills Analyzer — Hands-On Skills Test",
    description:
      "Real simulations, not a quiz. Get your Computer Skills Score, strengths, weaknesses, and career matches.",
    images: ["/api/og"],
  },
};

export default function ComputerSkillsAnalyzerPage() {
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
              AI Computer Skills Analyzer
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/50 max-w-xl mx-auto leading-[1.7]">
              Real hands-on tasks, not a quiz. See how ready your practical computer skills are for online work.
            </p>
          </div>

          <ComputerSkillsAnalyzer />
        </div>
      </main>
      <Footer />
    </>
  );
}
