import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Learn Freelancing — Free Guides for Filipinos | Cyberussell",
  description:
    "Free guides on how to start freelancing as a Filipino — platforms, profiles, proposals, pricing, and getting your first client.",
  alternates: { canonical: "https://www.cyberussell.com/learn/freelancing" },
};

export default function LearnFreelancingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 md:px-10 py-16 max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <span className="text-white/60">Learn</span>
          <span>/</span>
          <span className="text-white/60">Freelancing</span>
        </nav>
        <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-5">
          <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
            📚 Learn
          </span>
        </div>
        <h1 className="font-sans text-[32px] md:text-[44px] font-bold text-white mb-4 leading-tight">
          Learn Freelancing
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.8] mb-10 max-w-2xl">
          Step-by-step guides for Filipinos who want to start or grow a freelancing career online —
          from choosing a skill to landing your first paying client.
        </p>
        <div className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-8 text-center">
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 mb-4">
            Guides are being organized. Start here while you wait:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/earn/freelance-platforms" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Best Freelance Platforms →
            </a>
            <a href="/tools/bio-generator" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Generate Your Freelancer Bio →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
