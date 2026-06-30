import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ways to Earn Online as a Filipino | Cyberussell",
  description:
    "Explore every way Filipinos can earn money online — freelancing, remote jobs, affiliate marketing, digital products, and more.",
  alternates: { canonical: "https://www.cyberussell.com/earn" },
  openGraph: {
    title: "Ways to Earn Online as a Filipino | Cyberussell",
    description:
      "Explore every way Filipinos can earn money online — freelancing, remote jobs, affiliate marketing, digital products, and more.",
    url: "https://www.cyberussell.com/earn",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
};

const earnPaths = [
  {
    emoji: "💼",
    title: "Freelance Platforms",
    desc: "Upwork, Fiverr, OnlineJobs.ph, Contra — honest reviews of where to find clients and how much you can make.",
    href: "/earn/freelance-platforms",
    tag: "Best for beginners",
  },
  {
    emoji: "🏢",
    title: "Remote Jobs",
    desc: "Full-time and part-time remote positions you can do from the Philippines — no office, no commute.",
    href: "/earn/remote-jobs",
    tag: "Stable income",
  },
  {
    emoji: "🔗",
    title: "Affiliate Marketing",
    desc: "Earn commission by promoting products on Facebook, TikTok, or your blog. No capital required.",
    href: "/earn/affiliate-marketing",
    tag: "Low barrier",
  },
  {
    emoji: "📦",
    title: "Digital Products",
    desc: "Sell ebooks, templates, prompt packs, and courses online. Earn while you sleep.",
    href: "/earn/digital-products",
    tag: "Passive income",
  },
  {
    emoji: "🌐",
    title: "Website Business",
    desc: "Build and sell websites, run a web design service, or monetize your own site.",
    href: "/earn/website-business",
    tag: "High ceiling",
  },
  {
    emoji: "🗺️",
    title: "Career Blueprints",
    desc: "AI-generated career roadmaps for specific roles — skill paths, income ranges, and first steps.",
    href: "/careers",
    tag: "Step-by-step",
  },
];

export default function EarnPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "Earn", item: "https://www.cyberussell.com/earn" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 md:px-10 py-16 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <span className="text-white/60">Earn</span>
        </nav>

        <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-5">
          <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
            💼 Earn
          </span>
        </div>
        <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
          Ways to Earn Online as a Filipino
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.8] mb-12 max-w-2xl">
          Every legitimate path to earning online — researched, organized, and explained for Filipinos.
          Pick your path and start from there.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnPaths.map((path) => (
            <a
              key={path.href}
              href={path.href}
              className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col"
            >
              <span className="text-[32px] mb-3">{path.emoji}</span>
              <span className="inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.08em] uppercase text-[#00C97A] bg-[#00C97A]/8 border border-[#00C97A]/20 px-2.5 py-1 rounded-full mb-3 w-fit">
                {path.tag}
              </span>
              <h2 className="text-white text-[18px] font-bold mb-2 group-hover:text-[#FFD23F] transition-colors">
                {path.title}
              </h2>
              <p className="text-white/55 text-[14px] leading-[1.6] font-[family-name:var(--font-inter)] flex-1">
                {path.desc}
              </p>
              <span className="mt-4 text-[13px] font-bold font-[family-name:var(--font-inter)] text-[#FFD23F] group-hover:text-white transition-colors">
                Explore →
              </span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
