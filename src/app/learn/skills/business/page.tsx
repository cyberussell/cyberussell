import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Business with AI — Build Real Skills | Cyberussell",
  description: "Validate, launch, and grow a business using AI. From idea validation to pricing, marketing, and scaling — practical business skills for Filipino entrepreneurs.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/business" },
  openGraph: { title: "Business with AI | Cyberussell", description: "Validate, launch, and grow a business using AI tools and frameworks.", url: "https://www.cyberussell.com/learn/skills/business", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const lessons = [
  { title: "Validating Your Business Idea with AI (Before You Invest Anything)", desc: "Use ChatGPT to stress-test your idea against real market conditions before you commit.", href: "/learn/skills/business/validating-your-business-idea" },
  { title: "Writing a Business Plan with AI", desc: "Structure and draft a business plan that makes sense — without hiring a consultant.", href: "/learn/skills/business/writing-a-business-plan" },
  { title: "Pricing Your Product or Service", desc: "How to use AI to research competitors, understand value, and set a price that sells.", href: "/learn/skills/business/pricing-your-product-or-service" },
  { title: "Finding Your First Customers with AI", desc: "Practical outreach, positioning, and lead generation strategies built with AI.", href: "/learn/skills/business/finding-your-first-customers" },
  { title: "Financial Basics: Revenue, Expenses, and Profit", desc: "Use AI to build simple financial models and understand your numbers.", href: "/learn/skills/business/financial-basics" },
  { title: "Running Day-to-Day Operations with AI", desc: "AI tools for managing tasks, communicating with clients, and staying organized.", href: "/learn/skills/business/running-day-to-day-operations" },
  { title: "Scaling: When and How to Grow", desc: "Signs your business is ready to scale — and how to use AI to plan that next phase.", href: "/learn/skills/business/scaling-when-and-how-to-grow" },
];

export default function BusinessSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <span className="text-white/60">Business</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 · Business</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">Business</h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Skills are only as valuable as the business that delivers them. This track teaches you the core business fundamentals — validation, pricing, customer acquisition, and operations — using AI to accelerate every step.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50"><span className="text-white/70 font-bold">Outcome:</span> You launch and operate a business using AI as your advisor at every stage.</p>
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
