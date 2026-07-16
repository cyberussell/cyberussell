"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

const FAQS = [
  { q: "Is the subscription per branch?", a: "Yes. Each physical laundry branch requires its own subscription." },
  { q: "Is hosting included?", a: "Yes. Hosting, SSL, maintenance, and system updates are included." },
  { q: "Do customers need to install an app?", a: "No. Customers simply book online and receive a QR Code." },
  { q: "Can staff use mobile phones?", a: "Yes. The system is fully responsive and works on phones, tablets, and desktops." },
  { q: "How are monthly change requests handled?", a: "Change requests cover minor website and system updates. Larger feature requests are quoted separately." },
  { q: "Why isn't this a free app?", a: "Free laundry apps are usually generic templates with no dedicated support. Your subscription includes a professional website, hosting, ongoing maintenance, and monthly change requests — a real system built and supported for your business, not a shared app." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 md:px-10 py-20 max-w-2xl mx-auto scroll-mt-24">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0F766E] uppercase tracking-[3px]">FAQ</span>
        <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-[#0B1B33] mt-2">Frequently Asked Questions</h2>
      </motion.div>

      <div className="flex flex-col gap-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={faq.q}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="bg-white/70 backdrop-blur-md border border-[#22D3EE]/20 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-sans text-[14.5px] font-bold text-[#0B1B33]">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#0B1B33]/40 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5">
                  <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-[#0B1B33]/60 leading-[1.8]">{faq.a}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
