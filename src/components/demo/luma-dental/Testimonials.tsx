"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "./data";
import { fadeUp } from "./motion";

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 md:px-10 py-20 md:py-28 bg-[#F2F7F6]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#0D9488] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Patient Stories
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            Don&apos;t just take our word for it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="bg-white rounded-2xl p-7 border border-[#0B1220]/[0.06] flex flex-col gap-4"
            >
              <Quote size={22} className="text-[#0D9488]/30" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={13} className="fill-[#FFB020] text-[#FFB020]" />
                ))}
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#0B1220]/70 leading-[1.7] flex-grow">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-sans text-[14px] font-bold text-[#0B1220]">{t.author}</p>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#0B1220]/45">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
