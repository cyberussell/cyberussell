"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/lib/careers/types";

export default function CareerFAQ({ faq }: { faq: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0F0F1A] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
          Common Questions
        </span>
        <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-white leading-tight mb-10">
          Before you start — answers to what you&apos;re wondering.
        </h2>

        <div className="flex flex-col gap-2">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-[#18181F] border border-white/[0.08] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/80 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-white/30 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
