import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScamScanner from "@/components/ScamScanner";

export const metadata: Metadata = {
  title: "Scam Scanner — AI-Powered Job Scam Detector | Cyberussell",
  description:
    "Paste any job posting or online opportunity. AI analyzes it for scam patterns common in the Philippines. Free. Instant. No sign-up.",
  alternates: { canonical: "https://www.cyberussell.com/tools/scam-scanner" },
  openGraph: {
    title: "Scam Scanner — AI-Powered Job Scam Detector",
    description:
      "Paste any job posting. Get an AI-powered scam analysis with red flags, risk score, and actionable advice — free.",
    url: "https://www.cyberussell.com/tools/scam-scanner",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-scam-scanner.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scam Scanner — AI-Powered Job Scam Detector",
    description:
      "Paste any job posting. Get an AI-powered scam analysis with red flags, risk score, and actionable advice — free.",
    images: ["/og/og-scam-scanner.jpg"],
  },
};

export default function ScamScannerPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto">
        <div className="max-w-[760px] mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/25 px-3 py-1 rounded-full mb-4 font-[family-name:var(--font-inter)]">
            Free Tool
          </div>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight mb-3">
            Scam Scanner —{" "}
            <span className="text-[#FFD23F]">AI-Powered Job Scam Detector</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">
            May nakita kang job posting o &quot;opportunity&quot; online? I-paste dito at
            i-analyze ng AI kung legit o scam. Hindi na kailangan mag-guess —
            makikita mo agad ang red flags.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#E8373A]/10 border border-[#E8373A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              AI-powered analysis
            </span>
            <span className="bg-[#FFD23F]/10 border border-[#FFD23F]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Detects PH scam patterns
            </span>
            <span className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Free — walang sign-up
            </span>
          </div>
        </div>
        <ScamScanner />
      </main>
      <Footer />
    </>
  );
}
