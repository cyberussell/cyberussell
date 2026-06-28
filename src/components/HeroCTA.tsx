"use client";

export default function HeroCTA({ ctaBelow }: { ctaBelow: string }) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <p className="block md:hidden font-[family-name:var(--font-inter)] text-[13px] text-white/60 text-center">
        👇 Start here — it&apos;s free
      </p>
      <div className="relative w-full md:max-w-[380px]">
        <div className="absolute inset-0 rounded-[10px] border-2 border-[#E8373A]/40 pointer-events-none" />
        <a
          href="#downloads"
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "cta_click", { location: "hero" });
            }
          }}
          className="relative bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[17px] py-[18px] px-9 rounded-[10px] w-full min-h-[56px] flex justify-center items-center gap-2 hover:opacity-90 transition-all"
          style={{ boxShadow: "0 0 20px rgba(232,55,58,0.3)" }}
        >
          ↓ Or grab the Free Starter Guide
        </a>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/60 text-center md:text-left md:max-w-[380px]">
        {ctaBelow}
      </p>

      <a
        href="/shop"
        className="group flex items-center gap-2 mt-2 md:max-w-[380px]"
      >
        <span className="shrink-0 text-[9px] font-bold font-[family-name:var(--font-inter)] tracking-[0.08em] uppercase bg-[#FFD23F]/12 border border-[#FFD23F]/20 text-[#FFD23F] px-2 py-0.5 rounded">
          What&apos;s New
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 group-hover:text-white/60 transition-colors truncate">
          Shop — eBooks & templates for Filipino freelancers
        </span>
      </a>
    </div>
  );
}
