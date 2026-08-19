"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./motion";

// Static mock for the portfolio demo — no live booking backend yet. Kept as
// a display toggle (not deleted) so a future real build can flip panels
// per-tenant instead of re-deriving this from scratch.
type BookingDisplay = "both" | "widget-only" | "qr-only";
const BOOKING_DISPLAY = "both" as BookingDisplay;
const showWidget = BOOKING_DISPLAY !== "qr-only";
const showQr = BOOKING_DISPLAY !== "widget-only";

export default function Booking() {
  return (
    <section id="book" className="bg-[#141110] px-[8%] py-16 md:py-[110px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-14"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-2.5">
          Ready for a change?
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] text-[#f8f4ec] mb-4">
          Book Your Appointment
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#b9b2a4] font-light max-w-[480px] mx-auto">
          Schedule online in under a minute, or scan the code in-salon — both connect straight to our live
          appointment calendar.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={1}
        className="flex flex-col md:flex-row max-w-[1080px] mx-auto bg-[#1c1815] border border-[rgba(201,161,90,0.25)]"
      >
        {showWidget && (
          <div className="p-7 md:p-11 md:flex-[1.3]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[12px] tracking-[1.5px] uppercase text-[#c9a15a]">Booking Widget</span>
              <span className="hidden sm:inline font-mono text-[10.5px] tracking-[1px] text-[#8a8378]">
                powered by your appointment system
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Service</label>
                <div className="px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px]">
                  Signature Cut &amp; Style
                </div>
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Stylist</label>
                <div className="px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px]">
                  Isabela Cruz
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-[22px]">
              <div>
                <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Date</label>
                <div className="px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px]">
                  Sat, Aug 22
                </div>
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Time</label>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-2 border border-[#c9a15a] text-[#c9a15a] text-[12.5px]">2:00 PM</span>
                  <span className="px-3 py-2 border border-white/[0.15] text-[#8a8378] text-[12.5px]">3:30 PM</span>
                  <span className="px-3 py-2 border border-white/[0.15] text-[#8a8378] text-[12.5px]">5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="w-full text-center py-[15px] bg-[#c9a15a] text-[#141110] text-[13px] tracking-[1.5px] uppercase font-medium">
              Confirm Booking
            </div>
            <div className="mt-3.5 text-[11px] text-[#6f6a60] text-center">
              This panel mounts your appointment system&apos;s live booking widget
            </div>
          </div>
        )}

        {showQr && (
          <div
            className={`p-7 md:p-11 flex flex-col items-center justify-center text-center bg-[#181410] md:flex-1 ${
              showWidget ? "md:border-l border-[rgba(201,161,90,0.25)] border-t md:border-t-0" : ""
            }`}
          >
            <span className="text-[12px] tracking-[1.5px] uppercase text-[#c9a15a] mb-5">Walk-In? Scan to Book</span>
            <div
              className="w-[168px] h-[168px] border-8 border-[#f8f4ec] mb-[18px]"
              style={{
                background: "repeating-linear-gradient(45deg, #f8f4ec 0 6px, #141110 6px 12px)",
              }}
            />
            <p className="font-mono text-[11.5px] text-[#8a8378] leading-[1.6] max-w-[200px]">
              Unique per-tenant QR generated by the appointment management system
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
