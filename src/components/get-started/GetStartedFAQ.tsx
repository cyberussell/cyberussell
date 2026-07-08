"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How much does this cost?",
    a: "Every business is different, so pricing depends on scope — that's exactly what the free consultation and audit are for. You'll get clear pricing before any commitment.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most websites launch in 2–6 weeks. Automation and custom applications vary based on complexity, and we always agree on a timeline upfront.",
  },
  {
    q: "I'm not techy. Will I understand what's happening?",
    a: "Yes. We explain everything in plain language and handle the technical side ourselves.",
  },
  {
    q: "Is my business too small for AI?",
    a: "No. Some of the most effective AI wins are for small businesses — automating bookings, replies, and admin work that eats up your time.",
  },
  {
    q: "Do you work with businesses outside your local area?",
    a: "Yes. All consulting, development, and support is done remotely, so location isn't a barrier.",
  },
  {
    q: "What happens after I request the free audit?",
    a: "We review what you share and get back to you personally with a clear improvement plan — no automated sales funnel.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No. We start with a project or a clear scope of work. Long-term partnerships happen because the results speak for themselves, not because you're locked in.",
  },
];

export default function GetStartedFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#111118] px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-4">
            Common Questions
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="bg-[#18181F] border border-white/[0.08] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/85 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-white/40 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
                      {faq.a}
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
