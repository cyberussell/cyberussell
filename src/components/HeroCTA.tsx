"use client";

export default function HeroCTA() {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="relative w-full md:max-w-[380px]">
        <a
          href="/resources"
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
    </div>
  );
}
