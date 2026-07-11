"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CornerBubbleAccent, FoamDivider } from "./Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function FinalCTA() {
  return (
    <section className="px-6 md:px-10 pb-24 max-w-5xl mx-auto">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#08111F] border border-[#38BDF8]/15 px-8 md:px-14 py-16 md:py-20 text-center"
      >
        <CornerBubbleAccent />
        <h2 className="font-sans text-[28px] md:text-[42px] font-bold text-white mb-4 leading-tight max-w-2xl mx-auto">
          Ready to Modernize Your Laundry Business?
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 max-w-xl mx-auto leading-[1.8] mb-9">
          Give your customers a better booking experience while making your daily operations simpler with a professional website and an easy-to-use Laundry Management System.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.cyberussell.com/portfolio/laundryflow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(56,189,248,0.4)] transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
          >
            View Laundry Portfolio <ArrowRight size={16} />
          </a>
          <a
            href="/services/inquire?service=Laundry+Management+System"
            className="inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
          >
            Start Now
          </a>
        </div>
      </motion.div>

      <FoamDivider seed={103} count={90} height={140} className="mt-4" />
    </section>
  );
}
