"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Heart, MessageCircle, Star, WashingMachine } from "lucide-react";
import { PRICING, PRICING_TRUST, PRICING_BANNER, TESTIMONIALS } from "./data";
import { fadeUp } from "./motion";

const COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
  rose: { bg: "bg-rose-100", text: "text-rose-600" },
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function Pricing() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="pricing" className="bg-[#FDF9F3] px-6 py-16 md:py-20">
      <div className="max-w-md md:max-w-4xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-8">
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-black text-[#2563EB] uppercase tracking-wide mb-2">Pricing</p>
          <h2 className="font-sans font-black text-[32px] md:text-[38px] text-[#0F172A] leading-[0.95] tracking-tight mb-3">Simple, Honest Pricing</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#64748B]">
            Quality laundry at affordable prices. <span className="text-[#2563EB] font-semibold">No hidden fees.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 md:gap-4 mb-6">
          {PRICING.map((item, i) => {
            const c = COLORS[item.color];
            return (
              <motion.div
                key={item.service}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.2}
                className="bg-white rounded-2xl px-2.5 py-4 text-center shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
              >
                <div className={`w-11 h-11 rounded-full ${c.bg} flex items-center justify-center mx-auto mb-2.5`}>
                  <item.icon size={19} className={c.text} />
                </div>
                <p className="font-sans font-black text-[12px] text-[#0F172A] leading-tight mb-1.5">{item.service}</p>
                <p>
                  {item.prefix && <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#64748B] block mb-0.5">{item.prefix}</span>}
                  <span className={`font-sans font-black text-[17px] ${c.text}`}>{item.price}</span>
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[10px] text-[#64748B] mt-0.5">{item.unit}</p>
                {item.badge && (
                  <span className="inline-flex items-center gap-0.5 mt-2 bg-blue-50 text-[#2563EB] text-[8.5px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    <Star size={8} className="fill-[#2563EB]" /> {item.badge}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-5 mb-4 shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
        >
          <div className="grid grid-cols-4 gap-2 mb-5">
            {PRICING_TRUST.map((t) => {
              const c = COLORS[t.color];
              return (
                <div key={t.title} className="flex flex-col items-center text-center gap-2">
                  <div className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center shrink-0`}>
                    <t.icon size={16} className={c.text} />
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] leading-tight text-[#0F172A]">
                    <span className="font-bold block">{t.title}</span>
                    <span className="text-[#64748B]">{t.sub}</span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href="#top"
              className="flex flex-col items-center justify-center gap-2 text-center bg-[#2563EB] text-white font-[family-name:var(--font-inter)] font-bold text-[12.5px] py-5 rounded-2xl hover:opacity-90 transition-all"
            >
              <Calendar size={22} /> Schedule Pickup
            </a>
            <a
              href="#top"
              className="flex flex-col items-center justify-center gap-2 text-center bg-[#2563EB] text-white font-[family-name:var(--font-inter)] font-bold text-[12.5px] py-5 rounded-2xl hover:opacity-90 transition-all"
            >
              <WashingMachine size={22} /> Reserve Machine
            </a>
            <a
              href="#contact"
              className="flex flex-col items-center justify-center gap-2 text-center bg-[#2563EB] text-white font-[family-name:var(--font-inter)] font-bold text-[12.5px] py-5 rounded-2xl hover:opacity-90 transition-all"
            >
              <MessageCircle size={22} /> Inquire
            </a>
          </div>
          <p className="text-center font-[family-name:var(--font-inter)] text-[12px] text-[#64748B] mt-2.5">Quick &bull; Easy &bull; Reliable</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-[#2563EB] rounded-2xl p-5 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
              <Heart size={15} className="fill-[#2563EB] text-[#2563EB]" />
            </span>
          </div>
          <p className="font-sans font-black text-[42px] md:text-[46px] text-white leading-[0.95] tracking-tight">
            {PRICING_BANNER.heading} <span className="text-[#FBBF24]">{PRICING_BANNER.highlight}</span>
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/75 leading-relaxed">{PRICING_BANNER.body}</p>

          <div className="border-t border-white/15 pt-4">
            <div className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous testimonial"
                className="shrink-0 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors mt-1"
              >
                <ChevronLeft size={14} className="text-white" />
              </button>

              <div className="flex-1 min-w-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`w-9 h-9 rounded-full ${COLORS[TESTIMONIALS[testimonialIndex].color].bg} ${COLORS[TESTIMONIALS[testimonialIndex].color].text} flex items-center justify-center text-[12px] font-black shrink-0`}
                      >
                        {getInitials(TESTIMONIALS[testimonialIndex].name)}
                      </span>
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white">{TESTIMONIALS[testimonialIndex].name}</p>
                        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/60">{TESTIMONIALS[testimonialIndex].role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={13} className="fill-[#FBBF24] text-[#FBBF24]" />
                      ))}
                    </div>
                    <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-white leading-relaxed">
                      &ldquo;{TESTIMONIALS[testimonialIndex].quote}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="shrink-0 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors mt-1"
              >
                <ChevronRight size={14} className="text-white" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-4">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  className={`h-1.5 rounded-full transition-all ${i === testimonialIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"}`}
                />
              ))}
            </div>

            <p className="text-center font-[family-name:var(--font-inter)] text-[11.5px] text-white/50 mt-4">{PRICING_BANNER.ratingNote}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
