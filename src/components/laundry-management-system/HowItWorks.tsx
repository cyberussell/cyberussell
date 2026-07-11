"use client";

import { motion } from "framer-motion";
import { CalendarCheck2, QrCode, ScanLine, PackageCheck, type LucideIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

const STEPS: { icon: LucideIcon; title: string }[] = [
  { icon: CalendarCheck2, title: "Customer books online" },
  { icon: QrCode, title: "Customer receives a QR Code" },
  { icon: ScanLine, title: "Staff scans the QR Code and updates the order" },
  { icon: PackageCheck, title: "Customer picks up completed laundry" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 md:px-10 py-20 max-w-5xl mx-auto scroll-mt-24">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#38BDF8] uppercase tracking-[3px]">How It Works</span>
        <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-white mt-2">From Booking to Pickup, Fully Tracked</h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="relative flex flex-col items-center text-center gap-4"
            >
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-white/[0.08]" />
              )}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#162033]/60 backdrop-blur-md border border-[#38BDF8]/20 flex items-center justify-center">
                <Icon size={22} className="text-[#38BDF8]" strokeWidth={1.6} />
              </div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px]">
                Step {i + 1}
              </span>
              <p className="font-sans text-[14px] font-bold text-white leading-[1.5] max-w-[160px]">{step.title}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
