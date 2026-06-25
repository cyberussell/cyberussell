import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EightWaysGuide from "@/components/EightWaysGuide";

export const metadata: Metadata = {
  title: "8 Ways to Earn Online as a Filipino — Cyberussell",
  description: "Real income data, exact tools, and honest reality checks for 8 proven ways Filipinos earn online. Free. No email.",
  openGraph: {
    title: "8 Ways to Earn Online as a Filipino — Cyberussell",
    description: "Real income data, exact tools, and honest reality checks for 8 proven ways Filipinos earn online. Free. No email.",
    url: "https://www.cyberussell.com/guides/8-ways",
    siteName: "Cyberussell",
    images: [{ url: "https://www.cyberussell.com/og/og-8ways.png", width: 1200, height: 630, alt: "8 Ways to Earn Online as a Filipino — Cyberussell" }],
    locale: "fil_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "8 Ways to Earn Online as a Filipino — Cyberussell",
    description: "Real income data, exact tools, and honest reality checks for 8 proven ways Filipinos earn online. Free. No email.",
    images: ["https://www.cyberussell.com/og/og-8ways.png"],
  },
};

export default function EightWaysPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
        {/* Page title */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Free Interactive Guide
            </span>
          </div>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight">
            8 Ways to Earn Online as a Filipino
          </h1>
        </div>

        <EightWaysGuide />

        {/* Affiliate disclosure */}
        <div className="max-w-4xl mx-auto mt-12 pt-6 border-t border-white/[0.06]">
          <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 leading-[1.7]">
            Some links on this page are affiliate links. If you sign up through our link we may earn a small commission at no extra cost to you. This helps keep Cyberussell free for everyone.
          </p>
        </div>

        {/* Footer CTA */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 md:p-8 text-center">
            <p className="font-sans text-[20px] font-bold text-white mb-2">Find your personal income path</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-5">
              Not sure which of these 8 paths fits you best? Use our free Skill Finder tool.
            </p>
            <a href="/#skill-finder" className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all">
              Try the Free Skill Finder →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
