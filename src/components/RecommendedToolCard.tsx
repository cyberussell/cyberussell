"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export type RecommendedTool = {
  title: string;
  logo?: React.ReactNode;
  desktopBanner?: string;
  mobileBanner?: string;
  badges?: string[];
  body: React.ReactNode;
  faq?: { question: string; answer: string }[];
  whoIsItFor?: string[];
  recommendationTitle?: string;
  recommendationBody: React.ReactNode;
  ctaText: string;
  ctaUrl: string;
  disclaimer?: string;
};

export default function RecommendedToolCard({ tool }: { tool: RecommendedTool }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#111118] border border-white/[0.07] rounded-2xl overflow-hidden">
      {/* Mobile banner */}
      {tool.mobileBanner && (
        <a href={tool.ctaUrl} target="_blank" rel="noopener noreferrer sponsored" className="block md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tool.mobileBanner} alt="" className="w-full object-cover" />
        </a>
      )}
      {/* Desktop banner */}
      {tool.desktopBanner && (
        <a href={tool.ctaUrl} target="_blank" rel="noopener noreferrer sponsored" className="hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tool.desktopBanner} alt="" className="w-full object-cover" />
        </a>
      )}
      <div className="flex flex-col lg:flex-row">


        {/* Right — content */}
        <div className="flex-1 p-7 md:p-10 flex flex-col gap-6">

          {/* Title + badges */}
          <div className="flex flex-col gap-2">
            <h3 className="font-sans text-[20px] md:text-[22px] font-bold text-white leading-tight">
              {tool.title}
            </h3>
            {tool.badges && (
              <div className="flex flex-wrap gap-2">
                {tool.badges.map((badge) => (
                  <span
                    key={badge}
                    className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.85] space-y-3">
            {tool.body}
          </div>

          {/* FAQ */}
          {tool.faq && tool.faq.length > 0 && (
            <div className="flex flex-col gap-2">
              {tool.faq.map((item, i) => (
                <div key={i} className="border border-white/[0.07] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-white/75">
                      {item.question}
                    </span>
                    {openFaq === i
                      ? <ChevronUp size={15} className="text-white/30 shrink-0" />
                      : <ChevronDown size={15} className="text-white/30 shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.8] border-t border-white/[0.05]">
                      <p className="pt-3">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Who is this for */}
          {tool.whoIsItFor && (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-3">
                Who is this for?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.whoIsItFor.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#00C97A] shrink-0" strokeWidth={2} />
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/65">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation box */}
          <div className="bg-[#FFD23F]/[0.04] border border-[#FFD23F]/20 rounded-xl p-6 flex flex-col gap-4">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[1.5px]">
              {tool.recommendationTitle || "My Recommendation"}
            </p>
            <div className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.85]">
              {tool.recommendationBody}
            </div>
            <a
              href={tool.ctaUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[14px] px-6 py-3 rounded-xl transition-all w-fit"
            >
              {tool.ctaText} <ExternalLink size={14} />
            </a>
            {tool.disclaimer && (
              <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 leading-[1.7] italic">
                {tool.disclaimer}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
