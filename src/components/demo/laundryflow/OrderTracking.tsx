"use client";

import { motion } from "framer-motion";
import { ORDER_TRACKING } from "./data";
import { fadeUp } from "./motion";
import BrowserWindow from "./BrowserWindow";

export default function OrderTracking() {
  const currentIdx = ORDER_TRACKING.steps.findIndex((s) => s.label === ORDER_TRACKING.currentStep);

  return (
    <section id="dashboard" className="bg-[#FFF8E1] px-6 py-16 md:py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center max-w-xl mx-auto mb-10"
      >
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-black tracking-[2px] text-[#B98900] mb-2.5">{ORDER_TRACKING.eyebrow}</p>
        <h2 className="font-sans font-black text-[28px] md:text-[32px] text-[#14181F] mb-3">{ORDER_TRACKING.heading}</h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-[#14181F]/60">{ORDER_TRACKING.body}</p>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="max-w-3xl mx-auto">
        <BrowserWindow url={ORDER_TRACKING.demoUrl}>
          <div className="p-8 md:p-9">
            <div className="flex justify-between items-start mb-7">
              <div>
                <div className="text-[12px] text-[#64748B]">Order</div>
                <div className="font-sans text-[20px] font-black text-[#14181F]">{ORDER_TRACKING.orderNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-[#64748B]">Service</div>
                <div className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-[#14181F]">{ORDER_TRACKING.orderService}</div>
              </div>
            </div>

            <div>
              {ORDER_TRACKING.steps.map((step, i) => {
                const done = i < currentIdx;
                const active = i === currentIdx;
                const dotBg = active ? "#FFC629" : done ? "#FFF3CC" : "#F1F5F9";
                const dotColor = active ? "#14181F" : done ? "#B98900" : "#94A3B8";
                const lineColor = done || active ? "#FFE9A3" : "#F1F5F9";
                const labelColor = active ? "#B98900" : done ? "#14181F" : "#94A3B8";
                return (
                  <div key={step.label} className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <span
                        className="w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold"
                        style={{ background: dotBg, color: dotColor }}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      <span className="w-[2px] flex-1 min-h-[22px]" style={{ background: lineColor }} />
                    </div>
                    <div className="pb-6">
                      <div className="text-[14px] font-bold" style={{ color: labelColor }}>
                        {step.label}
                      </div>
                      <div className="text-[12px] text-[#94A3B8]">{step.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </BrowserWindow>
      </motion.div>
    </section>
  );
}
