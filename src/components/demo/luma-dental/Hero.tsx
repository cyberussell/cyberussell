"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ArrowRight, CalendarCheck } from "lucide-react";
import { CLINIC } from "./data";
import { fadeUp } from "./motion";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-6 md:px-10">
      {/* Animated background blobs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#0D9488]/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-32 w-[360px] h-[360px] rounded-full bg-[#FF6B57]/10 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 bg-white border border-[#0B1220]/[0.08] rounded-full pl-2 pr-4 py-1.5 shadow-sm">
              <div className="flex -space-x-1.5">
                {["MV", "CR", "AB"].map((initials) => (
                  <span key={initials} className="w-6 h-6 rounded-full bg-[#0D9488] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                    {initials}
                  </span>
                ))}
              </div>
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/70">
                Trusted by 15,000+ patients
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-sans text-[36px] md:text-[54px] font-extrabold text-[#0B1220] leading-[1.08] tracking-tight mb-5"
          >
            {CLINIC.tagline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-[#0B1220]/60 leading-[1.7] max-w-[460px] mb-8"
          >
            {CLINIC.subhead}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 bg-[#FF6B57] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3.5 px-7 rounded-full hover:opacity-90 hover:-translate-y-[1px] transition-all"
            >
              <CalendarCheck size={17} />
              Book an Appointment
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] font-bold text-[15px] text-[#0B1220]/70 hover:text-[#0D9488] transition-colors"
            >
              View Services <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex items-center gap-2 mt-8">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-[#FFB020] text-[#FFB020]" />
              ))}
            </div>
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/50">
              4.9/5 from 500+ Google reviews
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] rounded-3xl border border-[#0B1220]/[0.06] shadow-[0_20px_60px_rgba(13,148,136,0.15)] overflow-hidden"
        >
          <Image
            src="/portfolio/luma-dental/hero-clinic.jpg"
            alt="Bright Smiles Dental Studio clinic interior"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#0D9488]/15 flex items-center justify-center">
              <Star size={16} className="fill-[#FFB020] text-[#FFB020]" />
            </div>
            <div>
              <p className="font-sans text-[14px] font-bold text-[#0B1220] leading-none">4.9 Rating</p>
              <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#0B1220]/45 mt-1">500+ reviews</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
