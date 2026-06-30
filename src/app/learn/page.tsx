import type { Metadata } from "next";
import { Zap, Users, Code, TrendingUp, Lightbulb, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Learn — Free Guides for Filipino Online Workers | Cyberussell",
  description:
    "Free guides, tutorials, and courses. Learn AI, freelancing, website creation, SEO, and more — all for Filipinos earning online.",
  alternates: { canonical: "https://www.cyberussell.com/learn" },
  openGraph: {
    title: "Learn | Cyberussell",
    description:
      "Free guides and courses for Filipinos who want to learn skills and earn online.",
    url: "https://www.cyberussell.com/learn",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
};

const categories: Array<{
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
}> = [
  {
    icon: Zap,
    title: "AI Tools & Prompts",
    desc: "Learn how to use ChatGPT, Claude, and Gemini to work faster, smarter, and earn more.",
    href: "/learn/ai",
  },
  {
    icon: Users,
    title: "Freelancing",
    desc: "From profile setup to landing clients — everything you need to start a freelance career.",
    href: "/learn/freelancing",
  },
  {
    icon: Code,
    title: "Website Creation",
    desc: "Build and sell websites without coding. No capital, high earning potential.",
    href: "/learn/website-creation",
  },
  {
    icon: TrendingUp,
    title: "SEO",
    desc: "Get organic traffic and rank on Google. Learn the fundamentals of SEO.",
    href: "/learn/seo",
  },
  {
    icon: Lightbulb,
    title: "Online Jobs",
    desc: "Remote work opportunities, legitimate platforms, and how to land positions.",
    href: "/learn/online-jobs",
  },
];

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        {/* Hero */}
        <section className="px-6 md:px-10 pt-20 pb-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
                Learn
              </span>
            </div>
            <h1 className="font-sans text-[40px] md:text-[56px] font-bold text-white mb-5 leading-tight">
              Free Guides for Earning Online
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/60 max-w-2xl mx-auto leading-[1.8]">
              Learn the skills you need to succeed online. AI, freelancing, website creation, SEO, and more — all free, all for Filipinos.
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.href}
                  href={cat.href}
                  className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4">
                    <Icon size={20} className="text-white/70" />
                  </div>
                  <h3 className="font-sans text-[17px] font-bold text-white mb-2 group-hover:text-[#FFD23F] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.6] flex-1">
                    {cat.desc}
                  </p>
                  <span className="mt-4 text-[13px] font-bold font-[family-name:var(--font-inter)] text-[#FFD23F] group-hover:text-white transition-colors">
                    Learn More →
                  </span>
                </a>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
