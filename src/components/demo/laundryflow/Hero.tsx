"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO, HERO_BADGES, PHOTOS } from "./data";
import { fadeUp } from "./motion";

export default function Hero() {
  return (
    <section className="relative h-[560px] md:h-[640px] overflow-hidden">
      <Image src={PHOTOS.hero} alt="Freshly washed and folded laundry" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#14181F]/90 via-[#14181F]/55 to-[#14181F]/15" />

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 lg:px-10 flex flex-col justify-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-[family-name:var(--font-inter)] text-[12px] font-black tracking-[2px] text-[#FFC629] mb-3"
        >
          {HERO.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-sans font-black text-[36px] md:text-[52px] leading-[1.08] text-white max-w-xl mb-5"
        >
          {HERO.headline}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] leading-[1.7] text-white/80 max-w-[420px] mb-8"
        >
          {HERO.body}
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
          <a
            href="/demo/laundryflow/book-a-pickup"
            className="inline-flex items-center gap-2 bg-[#FFC629] text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[15px] py-3.5 px-7 rounded-full hover:opacity-90 transition-all"
          >
            {HERO.cta} <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex gap-8 mt-10">
          {HERO_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shrink-0">
                <badge.icon size={16} className="text-[#FFC629]" />
              </span>
              <span className="text-[12.5px] font-bold text-white/90 leading-tight">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
