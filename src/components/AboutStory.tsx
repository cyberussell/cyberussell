import { ArrowRight } from "lucide-react";

export default function AboutStory() {
  return (
    <section id="tungkol" className="bg-[#0F0F1A] py-12 md:py-[72px] px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4 block">
          About Cyberussell
        </span>
        <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-white leading-[1.2] mb-4">
          Built by a Filipino, for Filipinos.
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] max-w-[560px] mx-auto mb-6">
          No tech degree. No connections. Just 7 years of trial and error, hundreds of hours of research, and a belief that every Filipino deserves a clear path to earning online. Everything here is free and based on real data.
        </p>
        <a
          href="/about"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-medium text-[#FFD23F]/70 hover:text-[#FFD23F] transition-colors"
        >
          Read the full story
          <ArrowRight size={15} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
