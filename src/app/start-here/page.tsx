import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, Zap, TrendingUp, Sparkles, BarChart2, Wallet, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Start Here — Begin Your Online Earning Journey | Cyberussell",
  description:
    "Three paths to earning online as a Filipino. Whether you're completely new, already have skills, or ready to earn — find your starting point here.",
  alternates: { canonical: "https://www.cyberussell.com/start-here" },
  openGraph: {
    title: "Start Here | Cyberussell",
    description:
      "Three paths to earning online as a Filipino. Find your starting point.",
    url: "https://www.cyberussell.com/start-here",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
};

const choices = [
  {
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))",
    accentColor: "#60A5FA",
    Icon: Compass,
    step: "01",
    title: "I'm completely new",
    desc: "Just starting your online earning journey? Discover your best skill path with personalized guidance tailored for Filipinos.",
    cta: "Discover Your Path",
    href: "/discover",
    tag: "For Beginners",
    cardClass: "path-card-0",
  },
  {
    gradient: "linear-gradient(135deg, rgba(255,210,63,0.15), rgba(234,179,8,0.05))",
    accentColor: "#FFD23F",
    Icon: Zap,
    step: "02",
    title: "I already have skills",
    desc: "You know what you're good at. Type any skill and we'll show you realistic ways to earn from it online.",
    cta: "Find Your Earning Path",
    href: "/skill-finder",
    tag: "Most Popular",
    cardClass: "path-card-1",
  },
  {
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
    accentColor: "#4ADE80",
    Icon: TrendingUp,
    step: "03",
    title: "I'm ready to earn",
    desc: "Want to start earning now? Explore proven ways Filipinos are making money online today.",
    cta: "Start Earning",
    href: "/earn",
    tag: "Take Action",
    cardClass: "path-card-2",
  },
];

const pillars = [
  {
    Icon: Sparkles,
    title: "No experience needed",
    desc: "We'll help you discover skills you didn't know you had and turn them into real income.",
  },
  {
    Icon: BarChart2,
    title: "Research-backed paths",
    desc: "Every recommendation is tested, verified, and tailored specifically for Filipino workers.",
  },
  {
    Icon: Wallet,
    title: "Real earning potential",
    desc: "Learn realistic timelines, earning ranges, and exactly how to reach your income goal.",
  },
];

export default function StartHerePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] relative overflow-hidden">

        {/* Background gradients */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{ background: "radial-gradient(ellipse at top center, rgba(232,55,58,0.12), transparent 60%)" }} />
        <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px]"
          style={{ background: "radial-gradient(circle at top right, rgba(255,210,63,0.06), transparent 55%)" }} />

        {/* Hero */}
        <section className="relative px-6 md:px-10 pt-20 pb-16 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8373A] animate-pulse" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Start Here
            </span>
          </div>

          <h1 className="font-sans text-[40px] md:text-[58px] font-bold text-white mb-5 leading-tight">
            Where do you want to{" "}
            <span className="text-[#FFD23F]">begin?</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/55 max-w-xl mx-auto leading-[1.8]">
            Pick your starting point. We&apos;ll guide you to the right tools, resources, and opportunities.
          </p>
        </section>

        {/* Path cards */}
        <section className="relative px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <style>{`
          .path-card-0 { border-color: rgba(59,130,246,0.25); }
          .path-card-0:hover { border-color: rgba(59,130,246,0.55); }
          .path-card-1 { border-color: rgba(255,210,63,0.25); }
          .path-card-1:hover { border-color: rgba(255,210,63,0.55); }
          .path-card-2 { border-color: rgba(34,197,94,0.25); }
          .path-card-2:hover { border-color: rgba(34,197,94,0.55); }
        `}</style>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {choices.map((choice, i) => (
              <a
                key={i}
                href={choice.href}
                className={`${choice.cardClass} relative rounded-2xl p-8 flex flex-col group transition-all duration-300 hover:-translate-y-1`}
                style={{ background: choice.gradient, border: "1px solid" }}
              >
                {/* Tag */}
                <div className="absolute top-5 right-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full font-[family-name:var(--font-inter)]"
                    style={{ color: choice.accentColor, background: `${choice.accentColor}18`, border: `1px solid ${choice.accentColor}30` }}
                  >
                    {choice.tag}
                  </span>
                </div>

                {/* Step number */}
                <div className="text-[13px] font-bold font-[family-name:var(--font-inter)] mb-5" style={{ color: `${choice.accentColor}60` }}>
                  Step {choice.step}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${choice.accentColor}15`, border: `1px solid ${choice.accentColor}30` }}
                >
                  <choice.Icon size={24} strokeWidth={1.8} style={{ color: choice.accentColor }} />
                </div>

                <h2 className="font-sans text-[20px] font-bold text-white mb-3 group-hover:text-[#FFD23F] transition-colors leading-snug">
                  {choice.title}
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] mb-8 flex-1">
                  {choice.desc}
                </p>

                <span
                  className="inline-flex items-center gap-2 text-[13px] font-bold font-[family-name:var(--font-inter)] transition-all group-hover:gap-3"
                  style={{ color: choice.accentColor }}
                >
                  {choice.cta}
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Why section */}
        <section className="relative px-6 md:px-10 pb-24 max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="text-center mb-10">
              <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-white mb-3">
                Why Start Here?
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/45">
                Built for Filipinos, by a Filipino from the province.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((p, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFD23F]/10 border border-[#FFD23F]/20 flex items-center justify-center">
                    <p.Icon size={20} strokeWidth={1.8} className="text-[#FFD23F]" />
                  </div>
                  <h3 className="font-sans text-[16px] font-bold text-white">{p.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
