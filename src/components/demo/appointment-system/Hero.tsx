"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, CheckCircle2, ArrowRight, MonitorPlay } from "lucide-react";
import { PRODUCT } from "./data";
import { fadeUp } from "./motion";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-6 md:px-10">
      {/* Animated background blobs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#3B5BFF]/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-32 w-[360px] h-[360px] rounded-full bg-[#14B8A6]/10 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 bg-white border border-[#0B1220]/[0.08] rounded-full pl-3 pr-4 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/70">
                Portfolio Concept — Cyberussell
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-sans text-[34px] md:text-[52px] font-extrabold text-[#0B1220] leading-[1.08] tracking-tight mb-5"
          >
            {PRODUCT.tagline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-[#0B1220]/60 leading-[1.7] max-w-[480px] mb-8"
          >
            {PRODUCT.subhead}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap items-center gap-4">
            <a
              href="/portfolio/appointment-system"
              className="inline-flex items-center gap-2 bg-[#3B5BFF] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3.5 px-7 rounded-full hover:opacity-90 hover:-translate-y-[1px] transition-all"
            >
              View Case Study
              <ArrowRight size={16} />
            </a>
            <a
              href="#dashboard"
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] font-bold text-[15px] text-[#0B1220]/70 hover:text-[#14B8A6] transition-colors"
            >
              <MonitorPlay size={17} />
              View Screens
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="font-[family-name:var(--font-inter)] text-[12px] text-[#0B1220]/35 mt-8"
          >
            {PRODUCT.altTagline} — a fictional concept, not a live product.
          </motion.p>
        </div>

        {/* Floating scheduling elements — no stock imagery, pure UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] rounded-3xl border border-[#0B1220]/[0.06] bg-white shadow-[0_20px_60px_rgba(59,91,255,0.12)] overflow-hidden"
        >
          {/* mini calendar grid */}
          <div className="absolute inset-0 p-6 grid grid-cols-7 gap-1.5 opacity-70">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-md ${[9, 16, 23].includes(i) ? "bg-[#3B5BFF]/20" : "bg-[#0B1220]/[0.04]"}`}
              />
            ))}
          </div>

          <motion.div
            aria-hidden
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-[#0B1220]/[0.06]"
          >
            <div className="w-9 h-9 rounded-full bg-[#3B5BFF]/10 flex items-center justify-center">
              <CalendarDays size={16} className="text-[#3B5BFF]" />
            </div>
            <div>
              <p className="font-sans text-[13px] font-bold text-[#0B1220] leading-none">Dr. Reyes</p>
              <p className="font-[family-name:var(--font-inter)] text-[10.5px] text-[#0B1220]/45 mt-1">Office — BGC</p>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-8 right-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-[#0B1220]/[0.06]"
          >
            <div className="w-9 h-9 rounded-full bg-[#14B8A6]/15 flex items-center justify-center">
              <Clock3 size={16} className="text-[#14B8A6]" />
            </div>
            <div>
              <p className="font-sans text-[13px] font-bold text-[#0B1220] leading-none">2:30 PM</p>
              <p className="font-[family-name:var(--font-inter)] text-[10.5px] text-[#0B1220]/45 mt-1">30 min slot</p>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 left-8 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-[#0B1220]/[0.06]"
          >
            <CheckCircle2 size={15} className="text-[#14B8A6]" />
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold text-[#0B1220]/70">Confirmed</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
