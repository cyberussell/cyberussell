"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "./motion";

export default function About() {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 bg-[#f6f1e9]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col justify-center px-[8%] md:px-[10%] py-16 md:py-[110px]"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-3">
          We believe
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[44px] leading-[1.1] text-[#241f1a] mb-[22px]">
          Confidence Starts With Great Hair
        </h2>
        <p className="text-[15px] leading-[1.8] text-[#5c5650] font-light max-w-[420px] mb-[30px]">
          Founded by master colorist Isabela Cruz, Ganda Beauty Salon brings together stylists trained across Manila
          and Cebu, working from a calm, private studio designed for a slower kind of luxury. Every visit begins
          with a conversation, not a clock.
        </p>
        <a
          href="#stylists"
          className="inline-flex items-center gap-2 px-[26px] py-[14px] border border-[#241f1a] text-[#241f1a] text-[12px] tracking-[1.5px] uppercase w-fit hover:bg-[#241f1a] hover:text-[#f6f1e9] transition-colors"
        >
          Meet the Team <span>↗</span>
        </a>
      </motion.div>
      <div className="relative min-h-[320px] md:min-h-[520px]">
        <Image
          src="/demo/ganda-beauty-salon/photos/about.jpg"
          alt="Salon styling stations, warm vanity lighting"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
