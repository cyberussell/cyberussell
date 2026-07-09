"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Pulled directly from the existing service catalog (src/data/services/*.json)
// — each answer is tied to the specific service it actually applies to.
const FAQS = [
  {
    q: "Do I need to know how to code?",
    a: "Not at all. I handle everything technical — you provide content and feedback, and I deliver a ready-to-use, SEO-ready website.",
    source: "Website Design & Development",
  },
  {
    q: "How long does a website take?",
    a: "Most business websites launch in 5–7 business days after I receive your content. Larger e-commerce or membership sites take longer, scoped upfront.",
    source: "Website Design & Development",
  },
  {
    q: "What kinds of tasks can be automated?",
    a: "Common examples: follow-up messages to leads, weekly reports from Google Sheets, auto-posting to social media, processing inquiry forms, and scheduling reminders.",
    source: "AI Automation Solutions",
  },
  {
    q: "How is custom software different from buying off-the-shelf?",
    a: "Generic tools like Shopify or generic CRMs have features you don't need and lack ones specific to your business. Custom software fits your exact workflow, reducing friction and training time.",
    source: "Custom Web Applications",
  },
  {
    q: "Should I build a PWA or a native-feeling mobile app?",
    a: "If you want speed, no app-store approval wait, and instant updates, a PWA is usually the better first step. If you need deep device features or app-store presence, a React Native/Expo build is the way to go.",
    source: "Mobile App Development",
  },
  {
    q: "Do participants need prior AI experience for training?",
    a: "No. Training starts from the basics and progresses to practical business applications within the same session.",
    source: "AI & Technology Consulting",
  },
  {
    q: "Can I cancel ongoing website maintenance anytime?",
    a: "Yes — hosting and maintenance is a month-to-month service. Cancel anytime with 30 days notice.",
    source: "Website Hosting & Maintenance",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-gradient-to-b from-[#07070B] via-[#0B0E1C] to-[#07070B] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <span className="mb-4 block font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] text-[#FF7A1A]">
            Common Questions
          </span>
          <h2 className="font-sans text-[28px] font-bold leading-tight tracking-tight text-white md:text-[38px]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-[#FF7A1A]/20 bg-white/[0.03] backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/85">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="mb-2 font-[family-name:var(--font-inter)] text-[14px] leading-[1.8] text-white/60">
                      {faq.a}
                    </p>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-[#FF7A1A]/70">
                      {faq.source}
                    </span>
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
