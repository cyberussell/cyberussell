import { CheckCircle2 } from "lucide-react";

const REASONS = [
  "15+ years of software development experience",
  "AI-first mindset — practical, not hype",
  "Solutions built around business outcomes, not just technology",
  "Real, working implementations — not theory",
  "Transparent communication at every stage",
  "Remote collaboration, wherever your business is",
  "Built for long-term partnership, not one-off projects",
];

export default function WhyCyberussellSection() {
  return (
    <section id="why-us" className="bg-[#0F0F1A] px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="block text-[#FFD23F] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-4">
            Why Work With Us
          </span>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-tight">
            Why Business Owners Choose Cyberussell
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {REASONS.map((reason) => (
            <div key={reason} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#00C97A] shrink-0 mt-0.5" strokeWidth={2} />
              <span className="font-[family-name:var(--font-inter)] text-[15px] text-white/75 leading-[1.7]">
                {reason}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
