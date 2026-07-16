"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroBubbleCluster, FoamDivider } from "./Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 md:px-10 pt-36 pb-20 md:pt-44 md:pb-28">
      <HeroBubbleCluster />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center gap-2 bg-white/70 border border-[#22D3EE]/30 rounded-full px-4 py-1.5 mb-8">
            <Sparkles size={13} className="text-[#0891B2]" />
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0F766E] uppercase tracking-[2px]">
              Laundry Management System
            </span>
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-sans text-[32px] md:text-[54px] lg:text-[60px] font-bold text-[#0B1B33] mb-6 leading-[1.15]"
        >
          Professional Website + Simple Laundry Management System
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="font-[family-name:var(--font-inter)] text-[15px] md:text-[19px] text-[#0B1B33]/60 max-w-2xl mx-auto leading-[1.8] mb-4"
        >
          Everything your laundry business needs in one place — from walk-in order intake and QR check-ins to real-time order tracking and monthly sales reports.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="font-[family-name:var(--font-inter)] text-[14px] md:text-[16px] text-[#0B1B33]/45 mb-10"
        >
          Designed specifically for small and growing laundry businesses in the Philippines.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 bg-white/70 border border-[#0D9488]/20 rounded-full px-5 py-2.5">
            <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#0B1B33]">
              Starting at ₱399/month <span className="text-[#0B1B33]/45 font-medium">per branch</span>
            </span>
          </span>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}>
          <a
            href="https://www.cyberussell.com/portfolio/lms"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0D9488] to-[#22D3EE] hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[15px] px-8 py-4 rounded-full"
          >
            View Laundry Portfolio <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <FoamDivider seed={101} count={80} height={130} />
      </div>
    </section>
  );
}
