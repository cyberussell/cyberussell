import type { Metadata } from "next";
import { Search, ShieldCheck, Bot, Map, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Resources for Filipinos — PDFs, Templates & Guides | Cyberussell",
  description:
    "Free downloadable resources for Filipinos who want to earn online — PDFs, worksheets, checklists, templates, and prompt packs.",
  alternates: { canonical: "https://www.cyberussell.com/resources" },
  openGraph: {
    title: "Free Resources — PDFs, Templates & Guides | Cyberussell",
    description:
      "Free downloadable resources for Filipinos — PDFs, worksheets, checklists, templates, and prompt packs.",
    url: "https://www.cyberussell.com/resources",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
};

const resources: Array<{ icon: LucideIcon; title: string; desc: string; type: string; href: string; cta: string }> = [
  { icon: Search, title: "Skill Discovery Worksheet", desc: "A guided worksheet to help you identify your transferable skills and match them to online earning opportunities.", type: "Worksheet", href: "/guides/worksheet", cta: "Open Worksheet" },
  { icon: ShieldCheck, title: "How to Spot Online Scams (Guide)", desc: "A practical guide to identifying fake job offers, investment scams, and online fraud targeting Filipinos.", type: "Guide", href: "/guides/scam-checker", cta: "Read Guide" },
  { icon: Bot, title: "How to Use Claude AI (Guide)", desc: "Step-by-step guide on how to use Claude AI for freelancing, business research, content creation, and more.", type: "Guide", href: "/guides/claude-ai", cta: "Read Guide" },
  { icon: Map, title: "8 Ways to Earn Online as a Filipino", desc: "A complete overview of the eight most accessible and legitimate ways Filipinos can earn money online.", type: "Guide", href: "/guides/8-ways", cta: "Read Guide" },
];

const TYPE_STYLES: Record<string, string> = {
  PDF: "text-[#E8373A] bg-[#E8373A]/10 border-[#E8373A]/20",
  Worksheet: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  Guide: "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20",
  Template: "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20",
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 md:px-10 py-16 max-w-4xl mx-auto">
        <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-5">
          <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
            Free Resources
          </span>
        </div>
        <h1 className="font-sans text-[32px] md:text-[44px] font-bold text-white mb-4 leading-tight">
          Free Downloads & Resources
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.8] mb-12 max-w-2xl">
          PDFs, worksheets, guides, and templates to help you earn online as a Filipino.
          All free. No sign-up required.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {resources.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target={r.href.endsWith(".pdf") ? "_blank" : undefined}
              rel={r.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <r.icon size={20} className="text-white/70" strokeWidth={1.8} />
                </div>
                <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold border px-2 py-0.5 rounded-full shrink-0 ${TYPE_STYLES[r.type] ?? TYPE_STYLES.Guide}`}>
                  {r.type}
                </span>
              </div>
              <h2 className="text-white text-[16px] font-bold mb-2 group-hover:text-[#FFD23F] transition-colors leading-tight">
                {r.title}
              </h2>
              <p className="text-white/50 text-[13px] leading-[1.6] font-[family-name:var(--font-inter)] flex-1 mb-4">
                {r.desc}
              </p>
              <span className="text-[13px] font-bold font-[family-name:var(--font-inter)] text-[#FFD23F] group-hover:text-white transition-colors">
                {r.cta} →
              </span>
            </a>
          ))}
        </div>

        <div className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-8 text-center">
          <h3 className="font-sans text-[20px] font-bold text-white mb-2">More resources coming soon</h3>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-5">
            Templates, prompt packs, and checklists are in progress. Join the newsletter to get notified.
          </p>
          <a
            href="/#subscribe"
            className="inline-block bg-[#E8373A] text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-6 py-3 rounded-lg hover:opacity-90 transition-all"
          >
            Notify Me →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
