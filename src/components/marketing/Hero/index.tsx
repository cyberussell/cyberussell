import Link from "next/link";
import GlowBackground from "@/components/marketing/GlowBackground";
import FloatingServiceCards from "@/components/marketing/FloatingServiceCards";
import { ParallaxProvider } from "@/components/marketing/Hero/ParallaxProvider";
import { heroServices } from "@/components/marketing/heroServices.data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0E1C] via-[#08090F] to-[#07070B] px-6 pb-16 pt-20 md:flex md:min-h-screen md:flex-col md:px-10 md:pb-14 md:pt-24">
      <ParallaxProvider>
      <GlowBackground />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF7A1A]/25 bg-[#FF7A1A]/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF7A1A]" />
          <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px] text-[#FF7A1A]">
            Websites · AI · Mobile · Consulting
          </span>
        </span>

        <h1 className="mb-6 font-sans text-[32px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[56px]">
          Build a Business That Runs
          <br className="hidden sm:block" /> on{" "}
          <span className="text-[#FF7A1A]">Modern Technology.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-[600px] font-[family-name:var(--font-inter)] text-[16px] leading-[1.8] text-white/60 md:text-[19px]">
          Cyberussell designs and builds websites, mobile apps, and AI-powered systems for
          business owners who want a technology partner they can trust — not just another
          freelancer.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/services/inquire?service=Build%20With%20Us"
            className="w-full rounded-xl bg-[#FF7A1A] px-8 py-4 font-[family-name:var(--font-inter)] text-[16px] font-bold text-[#07070B] shadow-[0_8px_30px_rgba(255,122,26,0.25)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:scale-[1.02] hover:bg-[#FF8C3D] hover:shadow-[0_16px_46px_rgba(255,122,26,0.45)] active:scale-[0.99] sm:w-auto"
          >
            Start Your Project
          </Link>
          <Link
            href="/portfolio"
            className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-8 py-4 font-[family-name:var(--font-inter)] text-[16px] font-bold text-white transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-white/25 hover:bg-white/[0.09] hover:shadow-[0_10px_30px_rgba(255,255,255,0.06)] active:scale-[0.99] sm:w-auto"
          >
            View Our Work
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-14 w-full max-w-[420px] sm:max-w-[680px] lg:max-w-5xl">
        <FloatingServiceCards services={heroServices} />
      </div>
      </ParallaxProvider>
    </section>
  );
}
