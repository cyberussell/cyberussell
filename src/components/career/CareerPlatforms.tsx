import { ExternalLink } from "lucide-react";
import type { Platform } from "@/lib/careers/types";

export default function CareerPlatforms({ platforms }: { platforms: Platform[] }) {
  return (
    <section className="bg-[#0F0F1A] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
          Where to Find Work
        </span>
        <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-white leading-tight mb-4">
          Start applying here.
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 mb-10">
          These platforms have real jobs for this skill. Sign up today.
        </p>

        <div className="flex flex-col gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#18181F] border border-white/[0.08] rounded-xl p-5 flex items-start gap-4 hover:border-white/[0.15] transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-sans text-[16px] font-bold text-white group-hover:text-[#FFD23F] transition-colors">
                    {p.name}
                  </h3>
                  <ExternalLink size={13} className="text-white/20 group-hover:text-[#FFD23F]/60 transition-colors" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.05em] text-[#FFD23F]/60 bg-[#FFD23F]/[0.06] border border-[#FFD23F]/10 px-2 py-0.5 rounded-full ml-auto">
                    {p.best_for}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">
                  {p.why}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
