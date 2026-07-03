import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Marketing with AI — Build Real Skills | Cyberussell",
  description: "Build and run marketing campaigns using AI. From strategy and ads to email and analytics — practical marketing for Filipino businesses.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing" },
  openGraph: { title: "Marketing with AI | Cyberussell", description: "Build and run marketing campaigns with AI.", url: "https://www.cyberussell.com/learn/skills/marketing", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const lessons = [
  { title: "Marketing Fundamentals: What Actually Moves People to Buy", desc: "Psychology, positioning, and offers — the core of any marketing campaign.", href: "/learn/skills/marketing/marketing-fundamentals" },
  { title: "Building a Marketing Strategy with ChatGPT", desc: "Define your audience, message, and channel mix in one focused AI session.", href: "/learn/skills/marketing/building-a-marketing-strategy" },
  { title: "Facebook and Instagram Ads with AI", desc: "Write ad copy, generate image prompts, and structure campaigns with AI assistance.", href: "/learn/skills/marketing/facebook-and-instagram-ads" },
  { title: "Email Marketing: Build Your List and Monetize It", desc: "Set up sequences, write broadcasts, and grow an email list using AI tools.", href: "/learn/skills/marketing/email-marketing" },
  { title: "Organic Social Media Marketing", desc: "Grow your presence without ad spend — using consistent, AI-powered content.", href: "/learn/skills/marketing/organic-social-media-marketing" },
  { title: "Analyzing Campaign Results with AI", desc: "How to read your marketing data and ask AI the right questions to improve.", href: "/learn/skills/marketing/analyzing-campaign-results" },
  { title: "Marketing for Freelancers and Small Businesses", desc: "Practical playbooks for marketing yourself or a local business with limited budget.", href: "/learn/skills/marketing/marketing-for-freelancers-and-small-businesses" },
];

export default function MarketingSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <span className="text-white/60">Marketing</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 · Marketing</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">Marketing</h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Marketing is what turns a great product into a growing business. AI has made it possible for freelancers and small businesses to market like companies with full teams. This track teaches you how.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50"><span className="text-white/70 font-bold">Outcome:</span> You run effective marketing campaigns using AI tools and proven strategies.</p>
          </div>
          <div className="flex flex-col gap-3">
            {lessons.map((lesson, i) => (
              <a key={lesson.title} href={lesson.href} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5 flex items-start gap-4 hover:border-[#E8373A]/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#E8373A] text-[12px] font-bold font-[family-name:var(--font-inter)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[16px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#E8373A]/60 shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">← Back to Build Real Skills</a>
        </section>
      </main>
      <Footer />
    </>
  );
}
