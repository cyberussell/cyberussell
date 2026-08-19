"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "./motion";

// How long the hero's gradient overlay takes to fade in ("the moment the
// hero image dims") — the corner QR's own entrance is timed to start right
// as this finishes, not before.
const DIM_DURATION = 1.4;

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[620px] h-[88vh]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/demo/ganda-beauty-salon/photos/hero.png"
        className="absolute inset-0 w-full h-full object-cover object-[50%_35%]"
      >
        <source src="/demo/ganda-beauty-salon/photos/hero.mp4" type="video/mp4" />
      </video>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DIM_DURATION, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,12,10,0.86) 0%, rgba(15,12,10,0.55) 45%, rgba(15,12,10,0.2) 75%)",
        }}
      />

      <motion.a
        href="https://www.cyberussell.com/appointments/ganda-beauty-salon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scan to book your appointment at Ganda Beauty Salon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: DIM_DURATION, ease: "easeOut" }}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-[2] w-48 h-48 md:w-[280px] md:h-[280px]"
      >
        <Image
          src="/demo/ganda-beauty-salon/photos/booking-qr-white.png"
          alt=""
          fill
          sizes="140px"
          className="object-contain"
        />
      </motion.a>

      <div className="relative z-[2] self-end px-[8%] pb-[6%] max-w-[640px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-[family-name:var(--font-playfair)] italic text-[26px] md:text-[30px] text-[#c9a15a] mb-1.5"
        >
          Your Hair,
        </motion.div>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-[family-name:var(--font-cormorant)] font-semibold text-[52px] md:text-[76px] leading-[1.02] text-[#f8f4ec] mb-[22px]"
        >
          Your<br />Crown
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-[15px] md:text-[16px] leading-[1.7] text-[#dcd5c8] font-light max-w-[420px] mb-[34px]"
        >
          Premium hair and beauty care in the heart of Makati. Because you deserve to look — and feel — extraordinary.
        </motion.p>
        <motion.a
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          href="#book"
          className="inline-flex items-center gap-2.5 px-[30px] py-[16px] bg-[#c9a15a] text-[#141110] text-[13px] tracking-[2px] uppercase font-medium hover:bg-[#e0be82] transition-colors"
        >
          Book Your Experience <span>↗</span>
        </motion.a>
      </div>
    </section>
  );
}
