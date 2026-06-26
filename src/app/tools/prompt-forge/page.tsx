import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromptForge from "@/components/PromptForge";

export const metadata: Metadata = {
  title: "Prompt Trainer — Learn to Write Better AI Prompts | Cyberussell",
  description:
    "Free AI-powered tool that scores your prompts, explains what's weak, and gives you specific tips to improve. Powered by Claude AI.",
  alternates: { canonical: "https://www.cyberussell.com/tools/prompt-forge" },
  openGraph: {
    title: "Prompt Trainer — Learn to Write Better AI Prompts",
    description:
      "Paste any prompt. Get an AI-powered score, detailed breakdown, and specific tips to improve — free.",
    url: "https://www.cyberussell.com/tools/prompt-forge",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-prompt-forge.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function PromptForgePage() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/25 px-3 py-1 rounded-full mb-4 font-[family-name:var(--font-inter)]">
            Free Tool
          </div>
          <h1 className="font-sans text-[32px] md:text-[42px] font-bold text-white leading-[1.1] mb-3">
            Turn weak prompts into{" "}
            <span className="text-[#FFD23F]">strong</span> instructions.
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/45 leading-[1.6]">
            Paste anything — even a lazy one-liner. Claude AI scores it,
            explains exactly what&apos;s wrong, and tells you how to fix it.
            10 free analyses per day.
          </p>
        </div>
        <PromptForge />
      </main>
      <Footer />
    </>
  );
}
