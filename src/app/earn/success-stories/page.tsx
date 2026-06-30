import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Filipino Online Success Stories | Cyberussell",
  description: "Real stories from Filipinos who earn online — freelancers, remote workers, digital product sellers, and entrepreneurs.",
  alternates: { canonical: "https://www.cyberussell.com/earn/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 md:px-10 py-16 max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <a href="/earn" className="hover:text-white transition-colors">Earn</a>
          <span>/</span>
          <span className="text-white/60">Success Stories</span>
        </nav>
        <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-5">
          <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">💼 Earn</span>
        </div>
        <h1 className="font-sans text-[32px] md:text-[44px] font-bold text-white mb-4 leading-tight">Success Stories</h1>
        <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.8] mb-10 max-w-2xl">
          Real stories from Filipinos who earn online. Freelancers, remote workers, digital product creators,
          and online entrepreneurs sharing how they got started and how much they earn.
        </p>
        <div className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-8 text-center">
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50">
            Stories coming soon. Join the newsletter to be notified.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
