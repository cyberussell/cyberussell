import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MistakesGuide from "@/components/MistakesGuide";

export const metadata: Metadata = {
  title: "5 Reasons Filipinos Fail at Earning Online — Cyberussell",
  description: "The honest mistakes that kill most online income attempts before they start — and exactly how to avoid each one.",
  openGraph: {
    title: "5 Reasons Filipinos Fail at Earning Online — Cyberussell",
    description: "The honest mistakes that kill most online income attempts before they start — and exactly how to avoid each one.",
    url: "https://cyberussell.com/guides/mistakes",
    siteName: "Cyberussell",
    images: [{ url: "https://cyberussell.com/og/og-mistakes.png", width: 1200, height: 630, alt: "5 Reasons Filipinos Fail at Earning Online — Cyberussell" }],
    locale: "fil_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Reasons Filipinos Fail at Earning Online — Cyberussell",
    description: "The honest mistakes that kill most online income attempts before they start — and exactly how to avoid each one.",
    images: ["https://cyberussell.com/og/og-mistakes.png"],
  },
};

export default function MistakesGuidePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] px-6 py-16 md:py-24">
        <div className="max-w-[780px] mx-auto mb-10">
          <span className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/25 text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold tracking-[2.5px] uppercase px-3 py-1.5 rounded-full mb-5">
            FREE GUIDE
          </span>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight mb-4">
            5 Reasons Filipinos{" "}
            <span className="text-[#E8373A]">Fail</span> at Earning Online
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.8] mb-6">
            Hindi ito motivational speech. Ito ay honest na data mula sa
            totoong Filipino freelancers — at kung paano mo maiiwasan ang bawat
            pagkakamali.
          </p>
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[10px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#FFD23F]/80 leading-[1.8]">
              <strong className="text-[#FFD23F]">Honest note:</strong> This
              guide was written by someone who made all five of these mistakes.
              It took three failed attempts before finding what actually works.
              Everything here is based on real experience and real Philippine
              data.
            </p>
          </div>
        </div>
        <MistakesGuide />
      </main>
      <Footer />
    </>
  );
}
