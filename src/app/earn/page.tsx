import type { Metadata } from "next";
import { Briefcase, Users, Link2, Package, Globe, Zap, type LucideIcon } from "lucide-react";
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

const earnPaths: Array<{
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  tag: string;
}> = [
  {
    icon: Users,
    title: "Remote Jobs",
    desc: "Full-time and part-time remote positions you can do from the Philippines — no office, no commute.",
    href: "/earn/remote-jobs",
    tag: "Stable income",
  },
  {
    icon: Link2,
    title: "Affiliate Marketing",
    desc: "Earn commission by promoting products on Facebook, TikTok, or your blog. No capital required.",
    href: "/earn/affiliate-marketing",
    tag: "Low barrier",
  },
  {
    icon: Package,
    title: "Digital Products",
    desc: "Sell ebooks, templates, prompt packs, and courses online. Earn while you sleep.",
    href: "/earn/digital-products",
    tag: "Passive income",
  },
  {
    icon: Globe,
    title: "Website Business",
    desc: "Build and sell websites, run a web design service, or monetize your own site.",
    href: "/earn/website-business",
    tag: "High ceiling",
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
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-20 pb-12 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8373A] animate-pulse" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Earn
            </span>
          </div>
          <h1 className="font-sans text-[40px] md:text-[58px] font-bold text-white mb-5 leading-tight">
            Ways to Earn Online as a{" "}
            <span className="text-[#FFD23F]">Filipino</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/55 max-w-xl mx-auto leading-[1.8]">
            Every legitimate path to earning online — researched, organized, and explained for Filipinos.
            Pick your path and start from there.
          </p>
        </section>
        <div className="px-6 md:px-10 pb-16 max-w-5xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnPaths.map((path) => {
            const Icon = path.icon;
            return (
            <a
              key={path.href}
              href={path.href}
              className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-3">
                <Icon size={20} className="text-white/70" />
              </div>
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
            );
          })}
        </div>

        {/* Suggested sections */}
        <div className="mt-12 flex flex-col gap-4">
          <div className="bg-gradient-to-r from-blue-500/5 to-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-blue-400 uppercase tracking-[1px] mb-3">
              Also Explore
            </p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-[18px] font-bold text-white mb-1">
                  Where to Apply & Earn
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60">
                  Discover the best platforms where Filipinos find clients and earn money.
                </p>
              </div>
              <a
                href="/earn/freelance-platforms"
                className="inline-block bg-blue-500/20 border border-blue-500/40 text-white font-bold font-[family-name:var(--font-inter)] text-[13px] px-5 py-2.5 rounded-lg hover:bg-blue-500/30 hover:border-blue-500/60 transition-all shrink-0"
              >
                Explore →
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/5 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
            <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-purple-400 uppercase tracking-[1px] mb-3">
              Get Inspired
            </p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-sans text-[18px] font-bold text-white mb-1">
                  Success Stories
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60">
                  Real stories from Filipinos who earn online. Freelancers, remote workers, and entrepreneurs sharing their journey.
                </p>
              </div>
              <a
                href="/earn/success-stories"
                className="inline-block bg-purple-500/20 border border-purple-500/40 text-white font-bold font-[family-name:var(--font-inter)] text-[13px] px-5 py-2.5 rounded-lg hover:bg-purple-500/30 hover:border-purple-500/60 transition-all shrink-0"
              >
                Read →
              </a>
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
