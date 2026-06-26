import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BioGenerator from "@/components/BioGenerator";

export const metadata: Metadata = {
  title: "Bio Generator — AI Freelancer Profile Writer | Cyberussell",
  description:
    "Paste your skills and experience. AI generates a professional freelancer bio optimized for Upwork, OnlineJobs.ph, Fiverr, or LinkedIn. Free. Instant.",
  alternates: { canonical: "https://www.cyberussell.com/tools/bio-generator" },
  openGraph: {
    title: "Bio Generator — AI Freelancer Profile Writer",
    description:
      "Paste your skills. Get a ready-to-use freelancer bio optimized for your platform — free.",
    url: "https://www.cyberussell.com/tools/bio-generator",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-bio-generator.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bio Generator — AI Freelancer Profile Writer",
    description:
      "Paste your skills. Get a ready-to-use freelancer bio optimized for your platform — free.",
    images: ["/og/og-bio-generator.jpg"],
  },
};

export default function BioGeneratorPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto">
        <div className="max-w-[760px] mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/25 px-3 py-1 rounded-full mb-4 font-[family-name:var(--font-inter)]">
            Free Tool
          </div>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight mb-3">
            Bio Generator —{" "}
            <span className="text-[#FFD23F]">AI Freelancer Profile Writer</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.8] mb-6">
            Hindi mo kailangang mag-isip kung paano isulat ang profile mo.
            I-paste lang ang skills mo at gagawa ang AI ng professional na bio —
            optimized para sa platform na gusto mo.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#E8373A]/10 border border-[#E8373A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              AI-powered writing
            </span>
            <span className="bg-[#FFD23F]/10 border border-[#FFD23F]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Upwork · OJP · Fiverr · LinkedIn
            </span>
            <span className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Free — 10 bios per day
            </span>
          </div>
        </div>
        <BioGenerator />
      </main>
      <Footer />
    </>
  );
}
