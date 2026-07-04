"use client";

import { motion } from "framer-motion";
import { Search, Building2, CalendarDays, Clock3, ClipboardList, CheckCircle2 } from "lucide-react";
import { BOOKING_JOURNEY } from "./data";
import { fadeUp } from "./motion";

const ICONS = [Search, Building2, CalendarDays, Clock3, ClipboardList, CheckCircle2];

export default function BookingJourney() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-[#F4F6FF]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-16">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Client Booking Journey
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            From search to confirmed, in six steps.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-[8.3%] right-[8.3%] h-px bg-[#0B1220]/10" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-4">
            {BOOKING_JOURNEY.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-[#0B1220]/[0.08] shadow-sm flex items-center justify-center mb-4 relative z-10">
                    <Icon size={18} className="text-[#3B5BFF]" />
                  </div>
                  <p className="font-sans text-[13.5px] font-bold text-[#0B1220] leading-snug mb-1.5">{item.step}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#0B1220]/50 leading-[1.5]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
