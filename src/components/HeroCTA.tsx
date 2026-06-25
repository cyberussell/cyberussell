"use client";

export default function HeroCTA({ ctaBelow }: { ctaBelow: string }) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <p className="block md:hidden font-[family-name:var(--font-inter)] text-[13px] text-white/60 text-center">
        👇 Start here — it&apos;s free
      </p>
      <div className="relative w-full md:max-w-[380px]">
        <div className="absolute inset-0 rounded-[10px] border-2 border-[#E8373A] animate-pulse pointer-events-none" />
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
          ↓ Get the Free Guide
        </a>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 text-center md:text-left md:max-w-[380px]">
        {ctaBelow}
      </p>
    </div>
  );
}
