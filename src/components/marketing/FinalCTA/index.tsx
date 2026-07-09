import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#07070B] px-6 py-[72px] md:px-10 md:py-[100px]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at center, rgba(255,122,26,0.16) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-6 block font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] text-[#FF7A1A]">
          Ready When You Are
        </span>

        <h2 className="mb-6 font-sans text-[28px] font-bold leading-[1.15] text-white md:text-[46px]">
          Let&apos;s Build Something That Runs Your Business Better.
        </h2>

        <p className="mb-10 max-w-[520px] font-[family-name:var(--font-inter)] text-[17px] leading-[1.8] text-white/60">
          Tell me about your business and what you need — I&apos;ll get back to you personally with
          next steps.
        </p>

        <Link
          href="/services/inquire?service=Build%20With%20Us"
          className="mb-8 flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#FF7A1A] px-12 py-[18px] font-[family-name:var(--font-inter)] text-[16px] font-bold text-[#07070B] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:scale-[1.02] hover:bg-[#FF8C3D] active:scale-[0.99] sm:w-auto sm:max-w-[380px]"
          style={{ boxShadow: "0 8px 30px rgba(255,122,26,0.25)" }}
        >
          Start Your Project
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-[family-name:var(--font-inter)] text-[14px] text-white/60">
          {["No obligation", "No sales pressure", "Straightforward pricing"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle size={15} className="shrink-0 text-[#00C97A]" strokeWidth={2.5} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
