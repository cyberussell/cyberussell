"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { ONBOARDING_STEPS } from "./data";
import { fadeUp } from "./motion";

export default function Onboarding() {
  const [active, setActive] = useState(0);
  const current = ONBOARDING_STEPS[active];

  return (
    <section id="onboarding" className="px-6 md:px-10 py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Professional Onboarding
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            A five-step wizard, not a wall of forms.
          </h2>
        </motion.div>

        <div className="bg-[#0B1220] rounded-3xl p-3 md:p-4 shadow-[0_30px_80px_rgba(11,18,32,0.25)]">
          {/* Stepper */}
          <div className="flex items-center gap-2 px-3 pt-3 pb-5 overflow-x-auto">
            {ONBOARDING_STEPS.map((s, i) => (
              <button
                key={s.step}
                onClick={() => setActive(i)}
                className="flex items-center gap-2 shrink-0"
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
                    i === active
                      ? "bg-[#3B5BFF] text-white"
                      : i < active
                        ? "bg-[#14B8A6] text-white"
                        : "bg-white/10 text-white/40"
                  }`}
                >
                  {i < active ? <Check size={13} /> : s.step}
                </span>
                <span
                  className={`font-[family-name:var(--font-inter)] text-[12.5px] font-semibold whitespace-nowrap hidden sm:inline ${
                    i === active ? "text-white" : "text-white/40"
                  }`}
                >
                  {s.title}
                </span>
                {i < ONBOARDING_STEPS.length - 1 && <span className="w-6 h-px bg-white/15 ml-1" />}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="bg-white rounded-2xl p-6 md:p-10 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#3B5BFF] uppercase tracking-[2px] mb-2">
                  Step {current.step} of {ONBOARDING_STEPS.length}
                </p>
                <h3 className="font-sans text-[22px] font-bold text-[#0B1220] mb-2">{current.title}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#0B1220]/55 mb-8 max-w-[440px]">
                  {current.desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {current.fields.map((field) => (
                    <div key={field} className="flex flex-col gap-1.5">
                      <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/50">
                        {field}
                      </label>
                      <div className="border border-[#0B1220]/[0.1] rounded-xl px-4 py-3 flex items-center gap-2 text-[#0B1220]/25 bg-[#FAFBFF]">
                        {current.step === 3 && field.includes("Address") && <MapPin size={14} className="text-[#3B5BFF]/60" />}
                        <span className="font-[family-name:var(--font-inter)] text-[13.5px]">— placeholder —</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setActive((a) => Math.max(0, a - 1))}
                    disabled={active === 0}
                    className="font-[family-name:var(--font-inter)] text-[13.5px] font-semibold text-[#0B1220]/50 disabled:opacity-30"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActive((a) => Math.min(ONBOARDING_STEPS.length - 1, a + 1))}
                    className="bg-[#3B5BFF] text-white font-[family-name:var(--font-inter)] font-bold text-[13.5px] py-2.5 px-6 rounded-full hover:opacity-90 transition-all"
                  >
                    {active === ONBOARDING_STEPS.length - 1 ? "Finish Setup" : "Continue"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
