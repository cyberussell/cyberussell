import { CheckCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative bg-[#111118] overflow-hidden py-[72px] md:py-[100px] px-6 md:px-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(232,55,58,0.12) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-6 block">
          YOUR NEXT STEP
        </span>

        <h2 className="font-[family-name:var(--font-syne)] text-[28px] md:text-[48px] font-bold mb-6 flex flex-col gap-2 leading-[1.1]">
          <span className="text-white">Stop Hesitating.</span>
          <span className="text-[#FFD23F]">It&apos;s Free.</span>
          <span className="text-[#E8373A]">Download Now.</span>
        </h2>

        <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/60 max-w-[480px] mb-10 leading-[1.8]">
          5 free PDF guides. No email needed. No payment now or ever. Share them
          with people you know who need this.
        </p>

        <a
          href="#downloads"
          className="w-full md:w-auto md:max-w-[380px] bg-[#E8373A] hover:bg-[#FF4A4D] text-white font-[family-name:var(--font-inter)] font-bold text-[17px] py-[18px] px-12 rounded-[10px] min-h-[52px] flex items-center justify-center transition-all duration-300 hover:-translate-y-[2px] mb-8"
          style={{ boxShadow: "0 8px 30px rgba(232,55,58,0.2)" }}
        >
          ↓ Get the 5 Free PDF Guides
        </a>

        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
          {["Free", "No sign-up", "No payment", "Share with everyone"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle size={15} color="#00C97A" strokeWidth={2.5} className="shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
