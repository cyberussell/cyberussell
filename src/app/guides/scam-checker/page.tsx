import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScamChecker from "@/components/ScamChecker";

export const metadata: Metadata = {
  title: "Online Scam Checker — Cyberussell",
  description: "Is that earn-online opportunity real or fake? Check it against known Philippine scam patterns. Free. Instant. No email.",
  openGraph: {
    title: "Online Scam Checker — Cyberussell",
    description: "Is that earn-online opportunity real or fake? Check it against known Philippine scam patterns. Free. Instant. No email.",
    url: "https://www.cyberussell.com/guides/scam-checker",
    siteName: "Cyberussell",
    images: [{ url: "https://www.cyberussell.com/og/og-scam-checker.jpg", width: 1200, height: 630, alt: "Online Scam Checker — Cyberussell" }],
    locale: "fil_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Scam Checker — Cyberussell",
    description: "Is that earn-online opportunity real or fake? Check it against known Philippine scam patterns. Free. Instant. No email.",
    images: ["https://www.cyberussell.com/og/og-scam-checker.jpg"],
  },
};

export default function ScamCheckerPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] px-6 py-16 md:py-24">
        <div className="max-w-[760px] mx-auto mb-10">
          <span className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/25 text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold tracking-[2.5px] uppercase px-3 py-1.5 rounded-full mb-5">
            FREE TOOL
          </span>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight mb-4">
            Online Scam Checker —{" "}
            <span className="text-[#FFD23F]">Is This Opportunity Real?</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.8] mb-6">
            Bago ka mag-click, magbayad, o mag-share ng personal information —
            i-check muna dito. Ino-compare namin ang opportunity na nakita mo sa
            known Philippine online scam patterns.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#E8373A]/10 border border-[#E8373A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              70% ng mga Pilipino ang naabuso ng online scam at fake jobs
            </span>
            <span className="bg-[#E8373A]/10 border border-[#E8373A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              ₱2.4B ang nawala sa Pilipinas sa online scams noong 2024
            </span>
            <span className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Free Walang sign-up. Walang bayad.
            </span>
          </div>
        </div>
        <ScamChecker />
      </main>
      <Footer />
    </>
  );
}
