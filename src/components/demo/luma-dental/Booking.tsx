"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CalendarCheck } from "lucide-react";
import { CLINIC, SERVICE_OPTIONS } from "./data";
import { fadeUp } from "./motion";

export default function Booking() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
  }

  return (
    <section id="booking" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-[520px] mx-auto mb-12">
          <span className="block text-[#0D9488] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Book a Visit
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight mb-3">
            Let&apos;s get your smile sorted.
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#0B1220]/55 leading-[1.7]">
            Fill out the form and our front desk will confirm your slot within 24 hours.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="bg-white border border-[#0B1220]/[0.07] rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(11,18,32,0.06)]"
        >
          <AnimatePresence>
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-10 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-[#0D9488]/10 flex items-center justify-center"
                >
                  <CheckCircle2 size={32} className="text-[#0D9488]" />
                </motion.div>
                <h3 className="font-sans text-[20px] font-bold text-[#0B1220]">Request received!</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#0B1220]/55 max-w-[360px]">
                  We&apos;ll text or call you at the number you provided to confirm your appointment time.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-[family-name:var(--font-inter)] text-[13px] font-semibold text-[#0D9488] hover:underline"
                >
                  Book another appointment
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Full Name</label>
                  <input required type="text" placeholder="Juan Dela Cruz" className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Phone Number</label>
                  <input required type="tel" placeholder="09XX XXX XXXX" className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Service</label>
                  <select required defaultValue="" className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors">
                    <option value="" disabled>Select a service</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Preferred Date</label>
                  <input required type="date" className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Message (optional)</label>
                  <textarea rows={3} placeholder="Tell us a bit about your concern..." className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors resize-none" />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="md:col-span-2 inline-flex items-center justify-center gap-2 bg-[#FF6B57] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3.5 rounded-full hover:opacity-90 transition-all disabled:opacity-60"
                >
                  <CalendarCheck size={17} />
                  {status === "submitting" ? "Sending..." : "Request Appointment"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-center font-[family-name:var(--font-inter)] text-[12px] text-[#0B1220]/35 mt-5">
          Prefer to call? {CLINIC.phone} &middot; {CLINIC.hours}
        </p>
      </div>
    </section>
  );
}
