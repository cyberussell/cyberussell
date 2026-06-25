import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillWorksheet from "@/components/SkillWorksheet";

export const metadata: Metadata = {
  title: "Skill-to-Income Worksheet — Cyberussell",
  description: "Identify your marketable skills and get a personalized income path recommendation. Free, no email required.",
  openGraph: {
    title: "Skill-to-Income Worksheet — Cyberussell",
    description: "Identify your marketable skills and get a personalized income path recommendation.",
    url: "https://www.cyberussell.com/guides/worksheet",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function WorksheetPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-block bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Free Interactive Worksheet
            </span>
          </div>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight">
            Skill-to-Income Worksheet
          </h1>
        </div>

        <SkillWorksheet />

        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 md:p-8 text-center">
            <p className="font-sans text-[20px] font-bold text-white mb-2">Want the full breakdown?</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-5">
              See detailed guides, tools, and platforms for all 8 income paths.
            </p>
            <a href="/guides/8-ways" className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all">
              Explore 8 Ways to Earn →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
