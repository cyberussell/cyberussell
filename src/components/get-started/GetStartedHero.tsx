import Link from "next/link";
import { Sparkles, Zap, Globe, TrendingUp } from "lucide-react";

const BADGES = [
  { icon: Sparkles, label: "AI Consulting", top: "6%", left: "2%" },
  { icon: Zap, label: "Automation", top: "58%", left: "0%" },
  { icon: Globe, label: "Websites", top: "10%", left: "78%" },
  { icon: TrendingUp, label: "Growth", top: "62%", left: "80%" },
];

export default function GetStartedHero() {
  return (
    <section className="relative bg-[#0F0F1A] overflow-hidden px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-28">
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px]"
        style={{ background: "radial-gradient(circle at center, rgba(232,55,58,0.10) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
        <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
            AI · Automation · Websites · Growth
          </span>
        </div>

        <h1 className="font-sans text-[32px] md:text-[54px] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
          Get More Done.
          <br />
          Spend Less Time.
          <br />
          <span className="text-[#E8373A]">Grow Faster.</span>
        </h1>

        <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[19px] text-white/65 max-w-[560px] mx-auto leading-[1.8] mb-10">
          Cyberussell helps small businesses and professionals use practical AI and modern
          technology to save time, work smarter, and win more customers — without the tech jargon.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services/inquire?service=Free%20Consultation"
            className="w-full sm:w-auto bg-[#E8373A] hover:bg-[#FF4A4D] text-white font-[family-name:var(--font-inter)] font-bold text-[16px] py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-[2px]"
            style={{ boxShadow: "0 8px 30px rgba(232,55,58,0.2)" }}
          >
            Book a Free Consultation
          </Link>
          <Link
            href="#audit"
            className="w-full sm:w-auto bg-[#FFD23F] hover:bg-[#FFD23F]/90 text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[16px] py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-[2px]"
          >
            Get My Free AI Business Audit
          </Link>
        </div>
      </div>

      {/* Abstract visual: dashboard card + floating capability badges */}
      <div className="relative z-10 max-w-3xl mx-auto mt-16 md:mt-20 reveal reveal-delay-2">
        <div className="relative">
          {BADGES.map(({ icon: Icon, label, top, left }) => (
            <div
              key={label}
              className="hidden md:flex absolute items-center gap-2 bg-[#18181F] border border-white/[0.12] rounded-xl px-4 py-2.5 shadow-lg"
              style={{ top, left }}
            >
              <Icon size={14} className="text-[#FFD23F]" strokeWidth={2} />
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/80 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}

          <div className="relative bg-[#18181F] border border-white/[0.10] rounded-2xl p-6 md:p-10 mx-4 md:mx-24">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8373A]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD23F]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C97A]/60" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Hours saved / week", value: "12+", color: "#E8373A" },
                { label: "Faster response time", value: "5x", color: "#FFD23F" },
                { label: "More leads captured", value: "38%", color: "#00C97A" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-[#0F0F1A] border border-white/[0.08] rounded-xl p-5 flex flex-col gap-1">
                  <span className="font-sans text-[26px] font-extrabold" style={{ color }}>
                    {value}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
