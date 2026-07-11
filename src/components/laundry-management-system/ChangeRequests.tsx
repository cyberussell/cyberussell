"use client";

import { motion } from "framer-motion";
import { Check, X, Info } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

const INCLUDED = [
  "Business hours updates",
  "Contact information updates",
  "Service updates",
  "Pricing updates",
  "Upload new photos",
  "Website text edits",
  "Minor design adjustments",
  "Minor system configuration",
];

const NOT_INCLUDED = [
  "New modules",
  "Major redesigns",
  "Custom integrations",
  "Large feature requests",
  "Complex workflow changes",
];

export default function ChangeRequests() {
  return (
    <section className="px-6 md:px-10 py-20 max-w-4xl mx-auto">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0369A1] uppercase tracking-[3px]">Change Requests</span>
        <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-[#0B1B33] mt-2">What&apos;s Included in a Change Request?</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
          className="bg-white/70 backdrop-blur-md border border-[#38BDF8]/20 rounded-2xl p-7 shadow-sm"
        >
          <h3 className="font-sans text-[15px] font-bold text-[#0B1B33] mb-5">Included</h3>
          <ul className="flex flex-col gap-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-[family-name:var(--font-inter)] text-[13.5px] text-[#0B1B33]/75 leading-[1.6]">
                <Check size={15} className="text-[#2563EB] shrink-0 mt-[2px]" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="bg-white/70 backdrop-blur-md border border-[#38BDF8]/20 rounded-2xl p-7 shadow-sm"
        >
          <h3 className="font-sans text-[15px] font-bold text-[#0B1B33] mb-5">Not Included</h3>
          <ul className="flex flex-col gap-3">
            {NOT_INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-[family-name:var(--font-inter)] text-[13.5px] text-[#0B1B33]/50 leading-[1.6]">
                <X size={15} className="text-[#0B1B33]/30 shrink-0 mt-[2px]" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={2}
        className="flex items-start gap-2.5 bg-[#2563EB]/10 border border-[#38BDF8]/25 rounded-xl px-5 py-4"
      >
        <Info size={16} className="text-[#2563EB] shrink-0 mt-[1px]" />
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1B33]/65 leading-[1.7]">
          Major enhancements are quoted separately as custom development.
        </p>
      </motion.div>
    </section>
  );
}
