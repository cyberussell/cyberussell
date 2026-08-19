"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "./motion";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[620px] h-[88vh]">
      <Image
        src="/demo/ganda-beauty-salon/photos/hero.png"
        alt="Salon interior, warm ambient light"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,12,10,0.86) 0%, rgba(15,12,10,0.55) 45%, rgba(15,12,10,0.2) 75%)",
        }}
      />
      <div className="relative z-[2] self-end px-[8%] pb-[6%] max-w-[640px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-[family-name:var(--font-playfair)] italic text-[26px] md:text-[30px] text-[#c9a15a] mb-1.5"
        >
          Your Hair,
        </motion.div>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-[family-name:var(--font-cormorant)] font-semibold text-[52px] md:text-[76px] leading-[1.02] text-[#f8f4ec] mb-[22px]"
        >
          Your<br />Crown
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-[15px] md:text-[16px] leading-[1.7] text-[#dcd5c8] font-light max-w-[420px] mb-[34px]"
        >
          Premium hair and beauty care in the heart of Makati. Because you deserve to look — and feel — extraordinary.
        </motion.p>
        <motion.a
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          href="#book"
          className="inline-flex items-center gap-2.5 px-[30px] py-[16px] bg-[#c9a15a] text-[#141110] text-[13px] tracking-[2px] uppercase font-medium hover:bg-[#e0be82] transition-colors"
        >
          Book Your Experience <span>↗</span>
        </motion.a>
      </div>
    </section>
  );
}
