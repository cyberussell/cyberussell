"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIAL, SERVICES } from "./data";
import { fadeUp } from "./motion";

export default function ContactBooking() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="bg-[#FFC629] px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="flex gap-1 text-[#14181F] mb-4 text-[16px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="fill-[#14181F]" />
            ))}
          </div>
          <h2 className="font-sans font-black text-[26px] md:text-[28px] text-[#14181F] mb-6">What Our Customers Are Saying</h2>
          <div className="bg-white rounded-[18px] p-6 md:p-7 max-w-[460px] shadow-[0_12px_30px_-12px_rgba(20,24,31,0.18)]">
            <p className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-[#14181F]/75 mb-4.5">&ldquo;{TESTIMONIAL.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFC629]" />
              <div className="font-[family-name:var(--font-inter)] font-bold text-[13px] text-[#14181F]">
                — {TESTIMONIAL.name}, {TESTIMONIAL.role}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="bg-white rounded-2xl p-8 md:p-9 shadow-[0_12px_30px_-12px_rgba(20,24,31,0.18)] h-fit"
        >
          {sent ? (
            <div className="text-center py-6">
              <h3 className="font-sans font-black text-[20px] text-[#14181F] mb-2">Request Sent!</h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#64748B]">
                We&apos;ll reach out shortly to confirm your drop-off details.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-sans font-black text-[20px] text-[#14181F] mb-5">Book a Drop-Off</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input required placeholder="Your Name" className={inputClass} />
                <input required type="tel" placeholder="Phone Number" className={inputClass} />
                <select required defaultValue="" className={`${inputClass} text-[#14181F]/60`}>
                  <option value="" disabled>
                    Select a Service
                  </option>
                  {SERVICES.map((svc) => (
                    <option key={svc.label} value={svc.label}>
                      {svc.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-[#14181F] text-white font-bold text-[15px] py-3.5 rounded-lg mt-1.5 hover:opacity-90 transition-all"
                >
                  Send Request
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

const inputClass = "px-4 py-3.5 rounded-lg border border-[#14181F]/15 text-[14px] focus:outline-none focus:border-[#14181F]/40 transition-colors";
