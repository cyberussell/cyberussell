"use client";

import { motion } from "framer-motion";
import { CalendarDays, LayoutDashboard, User, Home, Search } from "lucide-react";
import { fadeUp, scaleIn } from "./motion";

function PhoneFrame({ children, label, custom }: { children: React.ReactNode; label: string; custom: number }) {
  return (
    <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }} custom={custom} className="flex flex-col items-center gap-3">
      <div className="w-[200px] h-[420px] rounded-[2.2rem] border-[6px] border-[#0B1220] bg-white shadow-[0_20px_50px_rgba(11,18,32,0.15)] overflow-hidden flex flex-col">
        <div className="h-6 flex items-center justify-center bg-[#0B1220]">
          <div className="w-16 h-3 rounded-full bg-black" />
        </div>
        <div className="flex-1 flex flex-col">{children}</div>
        <div className="h-12 border-t border-[#0B1220]/[0.06] flex items-center justify-around bg-white">
          {[Home, Search, CalendarDays, User].map((Icon, i) => (
            <Icon key={i} size={16} className={i === 2 ? "text-[#3B5BFF]" : "text-[#0B1220]/25"} />
          ))}
        </div>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/50">{label}</p>
    </motion.div>
  );
}

export default function MobileExperience() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-[#F4F6FF]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Mobile Experience
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            A dashboard-grade experience, even on a phone.
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          <PhoneFrame label="Booking Flow" custom={0}>
            <div className="p-4 flex flex-col gap-3">
              <p className="font-sans text-[13px] font-bold text-[#0B1220]">Choose a Time</p>
              <div className="grid grid-cols-3 gap-2">
                {["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"].map((t, i) => (
                  <div
                    key={t}
                    className={`rounded-lg py-1.5 text-center font-[family-name:var(--font-inter)] text-[10px] font-semibold ${
                      i === 1 ? "bg-[#3B5BFF] text-white" : "bg-[#FAFBFF] text-[#0B1220]/55"
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="mt-2 bg-[#3B5BFF] text-white text-center rounded-lg py-2 font-[family-name:var(--font-inter)] text-[11px] font-bold">
                Continue
              </div>
            </div>
          </PhoneFrame>

          <PhoneFrame label="Calendar" custom={1}>
            <div className="p-4 flex flex-col gap-2">
              <p className="font-sans text-[13px] font-bold text-[#0B1220] mb-1">July 2026</p>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-[family-name:var(--font-inter)] ${
                      i === 13 ? "bg-[#3B5BFF] text-white" : "text-[#0B1220]/40"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </PhoneFrame>

          <PhoneFrame label="Dashboard" custom={2}>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <LayoutDashboard size={13} className="text-[#3B5BFF]" />
                <p className="font-sans text-[12px] font-bold text-[#0B1220]">Overview</p>
              </div>
              {["Maria Santos — 9:00 AM", "James Cruz — 10:30 AM", "Ana Reyes — 1:00 PM"].map((row) => (
                <div key={row} className="bg-[#FAFBFF] rounded-lg px-2.5 py-2 font-[family-name:var(--font-inter)] text-[9.5px] text-[#0B1220]/55">
                  {row}
                </div>
              ))}
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
