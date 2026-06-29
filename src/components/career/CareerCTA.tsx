"use client";

import { ArrowLeft } from "lucide-react";

export default function CareerCTA({ skill }: { skill: string }) {
  return (
    <section className="bg-[#111118] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-white mb-4">
          Ready to start earning from {skill}?
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 mb-8 max-w-[480px] mx-auto">
          Go back to Phase 1 and complete the first step today. Not tomorrow. Today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="bg-[#E8373A] hover:bg-[#FF4A4D] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3.5 px-8 rounded-xl min-h-[48px] flex items-center justify-center gap-2 transition-colors"
          >
            ↑ Start from Phase 1
          </a>
          <a
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-medium text-white/40 hover:text-white/60 transition-colors py-3.5 px-6"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Try a different skill
          </a>
        </div>
      </div>
    </section>
  );
}
