"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SATISFACTION, PHOTOS } from "./data";
import { fadeUp } from "./motion";

export default function Satisfaction() {
  return (
    <section className="px-6 pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-black tracking-[2px] text-[#B98900] mb-2.5">{SATISFACTION.eyebrow}</p>
          <h2 className="font-sans font-black text-[26px] md:text-[30px] text-[#14181F] leading-[1.1] mb-3.5">{SATISFACTION.heading}</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] text-[#14181F]/60 max-w-[440px] mb-6">{SATISFACTION.body}</p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href="/demo/laundryflow/book-a-pickup"
              className="bg-[#FFC629] text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 px-6 rounded-lg hover:opacity-90 transition-all"
            >
              {SATISFACTION.ctaPrimary}
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 border-b-2 border-[#14181F]"
            >
              {SATISFACTION.ctaSecondary} <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden"
        >
          <Image
            src={PHOTOS.attendantFolding}
            alt="Attendant folding fresh laundry"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-top"
          />
        </motion.div>
      </div>
    </section>
  );
}
