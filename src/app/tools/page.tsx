import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tools, toolCategories } from "@/lib/tools-data";

export const metadata: Metadata = {
  title: "AI Tools for Filipinos — Free Tools to Learn, Work & Earn Online | Cyberussell",
  description:
    "Free AI tools built for Filipinos. Detect scams, improve your prompts, generate freelancer bios, and more. No sign-up required.",
  alternates: { canonical: "https://www.cyberussell.com/tools" },
  openGraph: {
    title: "AI Tools for Filipinos — Cyberussell",
    description:
      "Free AI tools built to help Filipinos learn skills, find work, build websites, and earn online.",
    url: "https://www.cyberussell.com/tools",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools for Filipinos — Cyberussell",
    description:
      "Free AI tools built to help Filipinos learn skills, find work, build websites, and earn online.",
    images: ["/og-image.jpg?v=2"],
  },
};

const STATUS_STYLES: Record<string, string> = {
  Free: "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20",
  Beta: "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20",
  Premium: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  "Coming Soon": "text-white/40 bg-white/5 border-white/10",
};

export default function ToolsPage() {
  const featuredTools = tools.filter((t) => t.featured);
  const comingSoonTools = tools.filter((t) => t.status === "Coming Soon");
  const liveTools = tools.filter((t) => t.status !== "Coming Soon");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cyberussell AI Tools",
    description: "Free AI tools built to help Filipinos learn, work, build websites, and earn online.",
    url: "https://www.cyberussell.com/tools",
    numberOfItems: liveTools.length,
    itemListElement: liveTools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.shortDescription,
      url: `https://www.cyberussell.com/tools/${tool.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        {/* Hero */}
        <section className="px-6 md:px-10 pt-16 pb-12 max-w-7xl mx-auto">
          <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              🤖 AI Tools
            </span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight max-w-3xl">
            Free AI Tools Built for Filipinos
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/60 max-w-2xl leading-[1.8] mb-8">
            Use AI to detect scams, improve your prompts, build your freelancer profile, and more.
            No sign-up. No payment. Just tools that work.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {toolCategories.map((cat) => (
              <span
                key={cat}
                className="font-[family-name:var(--font-inter)] text-[12px] text-white/50 border border-white/10 rounded-full px-3 py-1 hover:border-white/30 hover:text-white/80 transition-colors cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Tools */}
        <section className="px-6 md:px-10 pb-16 max-w-7xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">
            Featured Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[28px]">{tool.icon}</span>
                  <span
                    className={`font-[family-name:var(--font-inter)] text-[10px] font-bold border px-2 py-0.5 rounded-full ${STATUS_STYLES[tool.status]}`}
                  >
                    {tool.status}
                  </span>
                </div>
                <span className="inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/20 px-2.5 py-1 rounded-full mb-3 w-fit">
                  {tool.category}
                </span>
                <h3 className="text-white text-[18px] font-bold mb-2 group-hover:text-[#FFD23F] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-white/55 text-[14px] leading-[1.6] font-[family-name:var(--font-inter)] flex-1">
                  {tool.shortDescription}
                </p>
                <span className="mt-4 text-[13px] font-bold font-[family-name:var(--font-inter)] text-[#FFD23F] group-hover:text-white transition-colors">
                  {tool.ctaLabel} →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* All Live Tools */}
        <section className="px-6 md:px-10 pb-16 max-w-7xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">
            All Tools
          </h2>
          <div className="flex flex-col gap-3">
            {liveTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-[#18181F] border border-white/[0.08] rounded-[12px] px-6 py-4 hover:border-white/20 transition-all group flex items-center gap-4"
              >
                <span className="text-[24px] shrink-0">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-white text-[15px] font-bold group-hover:text-[#FFD23F] transition-colors">
                      {tool.name}
                    </h3>
                    <span
                      className={`font-[family-name:var(--font-inter)] text-[10px] font-bold border px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[tool.status]}`}
                    >
                      {tool.status}
                    </span>
                  </div>
                  <p className="text-white/45 text-[13px] font-[family-name:var(--font-inter)] truncate">
                    {tool.shortDescription}
                  </p>
                </div>
                <span className="text-white/30 group-hover:text-[#FFD23F] transition-colors shrink-0">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        {comingSoonTools.length > 0 && (
          <section id="coming-soon" className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
            <h2 className="font-sans text-[20px] font-bold text-white mb-2">
              Coming Soon
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mb-6">
              Tools currently in development. Join the newsletter to be notified when they launch.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comingSoonTools.map((tool) => (
                <div
                  key={tool.slug}
                  className="bg-[#18181F] border border-white/[0.05] rounded-[14px] p-6 opacity-60"
                >
                  <span className="text-[28px] grayscale">{tool.icon}</span>
                  <h3 className="text-white/60 text-[17px] font-bold mt-3 mb-1">{tool.name}</h3>
                  <p className="text-white/35 text-[13px] leading-[1.6] font-[family-name:var(--font-inter)]">
                    {tool.shortDescription}
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-bold text-white/30 border border-white/10 px-2.5 py-1 rounded-full font-[family-name:var(--font-inter)]">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
