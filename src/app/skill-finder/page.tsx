import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SkillFinderWidget from "@/components/SkillFinderWidget";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Discover Your Best Online Skill — Free Skill Finder | Cyberussell",
  description:
    "Answer a few questions and discover the best online skill for your background, time, and income goal. Free, no sign-up required.",
  alternates: { canonical: "https://www.cyberussell.com/skill-finder" },
  openGraph: {
    title: "Discover Your Best Online Skill | Cyberussell",
    description:
      "Take the Skill Finder quiz and discover the best online skill for you.",
    url: "https://www.cyberussell.com/skill-finder",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Your Best Online Skill | Cyberussell",
    description:
      "Take the Skill Finder quiz and discover the best online skill for you.",
    images: ["/og-image.jpg?v=2"],
  },
};

export default function SkillFinderPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "Skill Finder", item: "https://www.cyberussell.com/skill-finder" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] relative overflow-hidden">

        {/* Background gradients */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at top center, rgba(255,210,63,0.08), transparent 60%)" }} />
        <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px]"
          style={{ background: "radial-gradient(circle at top right, rgba(232,55,58,0.08), transparent 55%)" }} />

        {/* Hero copy */}
        <section className="relative px-6 md:px-10 pt-16 pb-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] animate-pulse" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Free Tool · No Sign-up
            </span>
          </div>

          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight mb-4 whitespace-nowrap">
            Type any skill.{" "}
            <span className="text-[#FFD23F]">See how to earn.</span>
          </h1>

          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-white/55 leading-[1.8] mb-3">
            Tell us what you&apos;re good at — cooking, design, video editing, kahit ano.
            We&apos;ll show you <span className="text-white/80 font-medium">realistic income paths</span>, earning ranges in pesos, and your exact first step.
          </p>

          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/35">
            Results appear in seconds. Powered by AI trained on real Filipino freelance data.
          </p>
        </section>

        {/* Widget */}
        <section className="relative px-4 pb-16 flex flex-col items-center">
          <SkillFinderWidget split={true} />
        </section>

      </main>
      <Footer />
    </>
  );
}
