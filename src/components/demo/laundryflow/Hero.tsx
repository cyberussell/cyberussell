"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO, PHOTOS } from "./data";
import { fadeUp } from "./motion";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] sm:min-h-[800px] overflow-hidden bg-white">
      {/* Full-bleed scene photo */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={PHOTOS.hero}
          alt="A woman overwhelmed by a towering pile of laundry at home"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-top"
        />
      </motion.div>

      {/* Dark scrim for text legibility over the photo */}
      <div className="absolute inset-0 bg-black/50" aria-hidden />

      <div className="relative z-10 flex flex-col justify-center min-h-[760px] sm:min-h-[800px] px-6 md:px-16 py-24">
        <div className="max-w-md">
          {/* Bold poster headline */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0} className="font-sans leading-[0.95] tracking-tight mb-4">
            {HERO.headline.map((line) => (
              <span key={line.text} className={`block text-[44px] md:text-[52px] ${line.weight} text-white`}>
                {line.text}
              </span>
            ))}
          </motion.h1>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="bg-[#2563EB] rounded-2xl px-5 py-4 mb-8 inline-block">
            <p className="font-sans font-black text-[26px] md:text-[30px] text-white leading-tight">{HERO.highlight}</p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-white/80 uppercase tracking-wide mt-1">{HERO.tagline}</p>
          </motion.div>

          {/* Icon feature rows */}
          <div className="flex flex-col gap-3 mb-9">
            {HERO.features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} initial="hidden" animate="show" custom={2 + i * 0.4} className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-white" />
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white">
                  <span className="font-bold">{f.title}</span> <span className="text-white/70">{f.sub}</span>
                </p>
              </motion.div>
            ))}
          </div>

          <motion.a
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#2563EB] text-white font-[family-name:var(--font-inter)] font-black text-[16px] py-4 rounded-full hover:opacity-90 hover:-translate-y-[1px] transition-all"
          >
            Schedule a Pickup Today <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
