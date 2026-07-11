"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PHOTOS } from "./data";

export default function CTA() {
  return (
    <section id="contact" className="relative min-h-[700px] sm:min-h-[740px] overflow-hidden bg-[#0F0F1A]">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={PHOTOS.finalCta}
          alt="A customer dropping off laundry at Aling Maria Laundry Shop's counter"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[38%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/40" aria-hidden />
      </motion.div>

      <div className="relative z-10 flex min-h-[700px] sm:min-h-[740px] items-end sm:items-center justify-center sm:justify-end px-6 md:px-16 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-[#0F0F1A]/40 backdrop-blur-xl border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.35)] rounded-3xl p-6"
        >
          <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border font-[family-name:var(--font-inter)] text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20 mb-4">
            A CYBERUSSELL CONCEPT
          </span>

          <h2 className="font-sans font-black text-[30px] md:text-[36px] text-white leading-[0.95] tracking-tight mb-4">This Is Just a Sample Website.</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14.5px] text-white/60 leading-[1.8] mb-3">
            Aling Maria Laundry Shop isn&apos;t a real business — this entire site is a concept built by Cyberussell to show what&apos;s possible for local businesses.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[14.5px] text-white/60 leading-[1.8] mb-8">
            We design and build custom websites and booking/management systems that help businesses like this accept bookings online, manage day-to-day operations, and grow their customer base.
          </p>

          <div className="flex flex-col items-center gap-3">
            <a
              href="/services/inquire?service=Laundry%20Business%20Website"
              className="inline-flex items-center gap-2 bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all"
            >
              Contact Us Today <ArrowRight size={16} />
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-bold text-[14px] text-white/60 hover:text-white transition-colors py-2"
            >
              View More Business Websites
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
