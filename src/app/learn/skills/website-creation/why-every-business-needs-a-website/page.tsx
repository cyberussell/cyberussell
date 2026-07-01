import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Every Business Needs a Website in 2025 — Website Creation | Cyberussell",
  description: "The case for building your own web presence — and why AI makes it finally accessible to everyone.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation/why-every-business-needs-a-website" },
  openGraph: {
    title: "Why Every Business Needs a Website in 2025 | Cyberussell",
    description: "The case for building your own web presence — and why AI makes it finally accessible to everyone.",
    url: "https://www.cyberussell.com/learn/skills/website-creation/why-every-business-needs-a-website",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const COLOR = "#E8373A";

export default function LessonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a>
            <span>/</span>
            <a href="/learn/skills/website-creation" className="hover:text-white transition-colors">Website Creation</a>
            <span>/</span>
            <span className="text-white/60">Why Every Business Needs a Website</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]" style={{ backgroundColor: `${COLOR}15`, color: COLOR }}>
              <Wrench size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Mindset Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              8 min
            </span>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Website Creation · Lesson 1 of 7
          </p>
          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Why Every Business Needs a Website in 2025
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            The case for building your own web presence — and why AI makes it finally accessible.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="rounded-[14px] p-5" style={{ backgroundColor: `${COLOR}10`, border: `1px solid ${COLOR}30` }}>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px] mb-2" style={{ color: COLOR }}>
              After This Lesson, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Explain why a website is non-negotiable for any serious business or freelance career — and know what to look for in your first site.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Social media is rented land. Facebook can change its algorithm tomorrow. TikTok can be banned. Instagram can restrict your reach. And none of those platforms belong to you.
            </p>
            <p>
              A website is the one online asset you own completely. Nobody can turn it off, shadow ban it, or change the rules on you mid-game. It works 24/7, it builds trust faster than any social profile, and it compounds — a page that ranks on Google today can bring you clients for years.
            </p>
            <p>
              The barrier used to be real: websites cost money to design and required a developer to build. AI has removed both. You can now plan, write, and publish a professional website in a weekend with zero coding knowledge.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">What a Website Actually Does for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Builds Trust Instantly", body: "Clients Google you before they respond to your pitch. No website = no credibility. A clean, professional site closes more deals than any cover letter." },
              { title: "Works While You Sleep", body: "A page that answers common questions, shows your portfolio, or captures emails keeps working even when you're offline, resting, or with other clients." },
              { title: "Owns Your Audience", body: "Email subscribers from your website belong to you. Social followers don't. One algorithm change and you lose reach — but your email list stays." },
              { title: "Ranks on Google", body: "Social media posts disappear in 24 hours. A well-written page on your site can rank for a keyword and bring in traffic for years." },
            ].map((item) => (
              <div key={item.title} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <p className="font-sans text-[14px] font-bold text-white mb-2">{item.title}</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Common Excuse — and Why It No Longer Holds</h2>
          <div className="space-y-3">
            {[
              { excuse: "\"I don't know how to code.\"", answer: "You don't need to. AI writes code. No-code tools like Framer and Carrd don't require any." },
              { excuse: "\"It's too expensive.\"", answer: "A Carrd site is free or ₱500/year. A domain is ₱700/year. That's less than one freelance hour." },
              { excuse: "\"I don't have time.\"", answer: "With AI writing your copy and a no-code builder, a simple site takes a weekend. Not months." },
              { excuse: "\"My Facebook page is enough.\"", answer: "It isn't. Potential clients, employers, and partners expect a website. Facebook is for discovery — websites are for credibility." },
            ].map((item) => (
              <div key={item.excuse} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/70 mb-1.5 italic">{item.excuse}</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">What Your First Site Should Do</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4 mb-6">
            <p>Your first site doesn't need to be perfect. It needs to do three things:</p>
          </div>
          <div className="space-y-3">
            {[
              { num: "01", title: "Explain who you are and what you do", desc: "In plain language. No jargon. A stranger should understand in 10 seconds." },
              { num: "02", title: "Show proof", desc: "A portfolio, a testimonial, a case study — something that shows you can do what you say you can." },
              { num: "03", title: "Tell them what to do next", desc: "Email you. Book a call. Fill out a form. One clear CTA." },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <span className="font-sans text-[20px] font-bold shrink-0" style={{ color: COLOR }}>{item.num}</span>
                <div>
                  <p className="font-sans text-[15px] font-bold text-white mb-1">{item.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.6]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">5 minutes · ChatGPT or Claude</p>
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Use the prompt below to get AI to help you think through exactly what YOUR first website needs to do.
                </p>
              </div>
              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">Prompt to use</p>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  I want to build my first website. I am [describe what you do or want to do — freelancer, small business owner, student, etc.]. Help me define: 1) The one main goal of my site, 2) Who it's for, 3) The single action I want visitors to take. Ask me questions if you need to.
                </p>
              </div>
              <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckSquare size={14} className="text-[#22C55E]" />
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
                </div>
                <div className="space-y-2">
                  {["I can name the one goal my website needs to achieve", "I know who my target visitor is", "I've defined the single action I want visitors to take"].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                      <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/5 border border-[#A78BFA]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A78BFA]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              Think of the last time you tried to verify if a business or freelancer was legit. Did you Google them? What did you find — or not find? <span className="text-white font-bold">What does that tell you about what your potential clients are doing right now?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Social media is rented. A website is owned. Every serious online career needs both — but the website is the foundation.",
              "A website doesn't need to be complex. It needs one clear goal, proof of your work, and a single call to action.",
              "AI has removed the two main barriers — cost and technical skill. There is no good excuse not to build one anymore.",
              "Websites compound. A page you publish today can bring you leads for years. Social posts disappear in hours.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0" style={{ backgroundColor: COLOR }} />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#F59E0B]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge</span>
            </div>
            <p className="font-sans text-[15px] font-bold text-white mb-2">Google 3 people in your field right now.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Search for 3 freelancers or businesses doing what you want to do. Look at their websites critically: What do they do well? What's missing? What would make YOU choose them — or not? Write down 3 things you want your site to do that theirs doesn't.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">Next Lesson</p>
              <p className="font-sans text-[16px] font-bold text-white">Picking Your Stack: No-Code vs AI-Code vs Traditional</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">Website Creation · Lesson 2 of 7 · 10 min</p>
            </div>
            <a href="/learn/skills/website-creation/picking-your-stack" className="inline-flex items-center gap-2 text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: COLOR }}>
              Next <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
