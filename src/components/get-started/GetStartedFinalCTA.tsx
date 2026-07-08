import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function GetStartedFinalCTA() {
  return (
    <section className="relative bg-[#111118] overflow-hidden py-[72px] md:py-[100px] px-6 md:px-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(232,55,58,0.12) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        <span className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-6 block">
          Ready When You Are
        </span>

        <h2 className="font-sans text-[28px] md:text-[46px] font-bold text-white leading-[1.15] mb-6">
          Let&apos;s Make Your Business Run Better.
        </h2>

        <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/60 max-w-[520px] mb-10 leading-[1.8]">
          Book a free consultation and find out exactly how AI, automation, and modern technology
          can help your business save time and grow.
        </p>

        <Link
          href="/services/inquire?service=Free%20Consultation"
          className="w-full sm:w-auto sm:max-w-[380px] bg-[#E8373A] hover:bg-[#FF4A4D] text-white font-[family-name:var(--font-inter)] font-bold text-[17px] py-[18px] px-12 rounded-[10px] min-h-[52px] flex items-center justify-center transition-all duration-300 hover:-translate-y-[2px] mb-8"
          style={{ boxShadow: "0 8px 30px rgba(232,55,58,0.2)" }}
        >
          Book a Free Consultation
        </Link>

        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 font-[family-name:var(--font-inter)] text-[14px] text-white/60">
          {["No obligation", "No sales pressure", "Straightforward pricing"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#00C97A] shrink-0" strokeWidth={2.5} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
