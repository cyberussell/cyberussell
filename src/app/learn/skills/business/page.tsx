import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Business with AI — Build Real Skills | Cyberussell",
  description:
    "Plan, pitch, and run a business with AI-powered strategy. From idea validation to daily operations — AI at every step.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/business" },
  openGraph: {
    title: "Business with AI | Cyberussell",
    description: "Plan, pitch, and run a business with AI-powered strategy.",
    url: "https://www.cyberussell.com/learn/skills/business",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const lessons = [
  { title: "Validating Your Business Idea with AI (Before You Invest Anything)", desc: "Use ChatGPT to stress-test your idea against real market conditions before you commit.", soon: true },
  { title: "Writing a Business Plan with AI", desc: "Structure and draft a business plan that makes sense — without hiring a consultant.", soon: true },
  { title: "Pricing Your Product or Service", desc: "How to use AI to research competitors, understand value, and set a price that sells.", soon: true },
  { title: "Finding Your First Customers with AI", desc: "Practical outreach, positioning, and lead generation strategies built with AI.", soon: true },
  { title: "Financial Basics: Revenue, Expenses, and Profit", desc: "Use AI to build simple financial models and understand your numbers.", soon: true },
  { title: "Running Day-to-Day Operations with AI", desc: "AI tools for managing tasks, communicating with clients, and staying organized.", soon: true },
  { title: "Scaling: When and How to Grow", desc: "Signs your business is ready to scale — and how to use AI to plan that next phase.", soon: true },
];

export default function BusinessSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a>
            <span>/</span>
            <span className="text-white/60">Business</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 5 · Business
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Business
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            You don&rsquo;t need a business degree to run a business — you need the right tools and
            the ability to think strategically. AI gives you on-demand access to business expertise.
            This track teaches you how to use it at every stage of building and running your venture.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-6">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You launch and run a real business — with AI as your advisor.
            </p>
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-xl px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
              Lessons coming soon. Check back shortly — this track is in active development.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.title}
                className="bg-[#18181F] border border-white/[0.06] rounded-[12px] p-5 flex items-start gap-4 opacity-60"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock size={14} className="text-[#E8373A]/40" />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                  <span className="mt-2 inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
            ← Back to Build Real Skills
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
