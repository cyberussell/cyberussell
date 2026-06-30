import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer | Cyberussell",
  description: "Affiliate, earnings, and content disclaimer for Cyberussell.",
  alternates: { canonical: "https://www.cyberussell.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 md:px-10 py-16 max-w-3xl mx-auto">
        <h1 className="font-sans text-[32px] font-bold text-white mb-3">Disclaimer</h1>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-10">Last updated: June 2026</p>

        <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.9] flex flex-col gap-8">
          <section>
            <h2 className="font-sans text-[18px] font-bold text-white mb-3">Affiliate Disclosure</h2>
            <p>Some links on this website are affiliate links. This means we may earn a small commission if you click through and make a purchase — at no additional cost to you. We only recommend platforms, tools, and products we have personally reviewed or believe are genuinely useful for Filipinos.</p>
            <p className="mt-3">Affiliate relationships do not influence our editorial content or honest reviews.</p>
          </section>

          <section>
            <h2 className="font-sans text-[18px] font-bold text-white mb-3">Earnings Disclaimer</h2>
            <p>Income figures mentioned on this website (such as earning ranges for platforms or career paths) are estimates based on publicly available data, community reports, and general market research. They are provided for informational purposes only.</p>
            <p className="mt-3">Individual results vary significantly based on skill level, effort, consistency, market conditions, and many other factors. Cyberussell does not guarantee any specific income outcome. Nothing on this website should be interpreted as a promise or guarantee of earnings.</p>
          </section>

          <section>
            <h2 className="font-sans text-[18px] font-bold text-white mb-3">Content Accuracy</h2>
            <p>We do our best to keep information accurate and up to date. However, online platforms, tools, and earning opportunities change frequently. Always verify current terms, rates, and availability directly with the relevant platform or provider.</p>
          </section>

          <section>
            <h2 className="font-sans text-[18px] font-bold text-white mb-3">AI Tool Disclaimer</h2>
            <p>The AI tools on this website use large language models to generate content. AI-generated outputs may contain errors, inaccuracies, or outdated information. Do not rely solely on AI-generated content for important decisions. Always apply critical thinking and seek professional advice when appropriate.</p>
          </section>

          <section>
            <h2 className="font-sans text-[18px] font-bold text-white mb-3">No Professional Advice</h2>
            <p>Content on this website is for educational and informational purposes only. It does not constitute legal, financial, investment, or professional career advice. Consult a qualified professional before making significant decisions based on information found here.</p>
          </section>

          <section>
            <h2 className="font-sans text-[18px] font-bold text-white mb-3">Questions?</h2>
            <p><a href="/contact" className="text-[#FFD23F] hover:text-white transition-colors">Contact us</a> if you have questions about this disclaimer.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
