"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/components/marketing/Hero/ParallaxProvider";

const PARTICLES = [
  { top: "16%", left: "10%", size: 4, duration: 9, delay: 0 },
  { top: "26%", left: "84%", size: 3, duration: 11, delay: 1.2 },
  { top: "50%", left: "4%", size: 3, duration: 10, delay: 0.6 },
  { top: "62%", left: "92%", size: 4, duration: 12, delay: 2 },
  { top: "76%", left: "20%", size: 3, duration: 8.5, delay: 1.6 },
  { top: "38%", left: "50%", size: 2, duration: 13, delay: 0.9 },
  { top: "10%", left: "58%", size: 2, duration: 9.5, delay: 2.4 },
  { top: "84%", left: "66%", size: 3, duration: 10.5, delay: 0.3 },
  { top: "45%", left: "30%", size: 2, duration: 11.5, delay: 1.9 },
  { top: "70%", left: "46%", size: 2, duration: 8, delay: 0.5 },
];

// Slow-flowing "energy trail" paths — abstract, blurred curves that sweep
// through the same zones the floating cards occupy (corners + mid-sides),
// read as ambient light rather than a literal connecting line.
const TRAILS = [
  {
    d: "M 40 560 C 220 420, 340 260, 560 300 S 860 480, 1030 200",
    duration: 26,
    fadeDuration: 14,
    delay: 0,
  },
  {
    d: "M 1040 120 C 860 220, 700 200, 560 380 S 300 560, 60 640",
    duration: 32,
    fadeDuration: 17,
    delay: 3,
  },
];

export default function GlowBackground() {
  const glow = useParallax(8);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 2 — large blurred orange ambient glows, varied size/opacity (reacts gently to the cursor) */}
      <motion.div style={{ x: glow.x, y: glow.y }} className="absolute inset-0">
        <div
          className="absolute left-[4%] top-[2%] h-[560px] w-[560px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,122,26,0.16) 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-[2%] top-[10%] h-[460px] w-[460px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,140,50,0.13) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[6%] left-[12%] h-[480px] w-[480px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,122,26,0.11) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[0%] right-[8%] h-[540px] w-[540px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,122,26,0.14) 0%, transparent 70%)" }}
        />
        <div
          className="absolute left-[30%] top-[30%] h-[300px] w-[300px] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,150,60,0.10) 0%, transparent 70%)" }}
        />

        {/* Soft bloom — small, brighter cores layered on top of the ambient glows */}
        <div
          className="absolute left-1/2 top-[26%] h-[220px] w-[220px] -translate-x-1/2 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,170,90,0.22) 0%, transparent 60%)" }}
        />
        <div
          className="absolute left-[18%] top-[12%] h-[130px] w-[130px] rounded-full blur-xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,180,110,0.16) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-[10%] right-[16%] h-[150px] w-[150px] rounded-full blur-xl"
          style={{ background: "radial-gradient(circle at center, rgba(255,160,80,0.15) 0%, transparent 65%)" }}
        />
      </motion.div>

      {/* Layer 3 — soft light streaks, one flowing directly behind the portrait */}
      <div
        className="absolute left-1/2 top-[8%] h-[75%] w-[220px] -translate-x-1/2 rotate-[6deg] blur-3xl"
        style={{ background: "linear-gradient(180deg, rgba(255,140,50,0.16) 0%, transparent 75%)" }}
      />
      <motion.div
        className="absolute left-[-8%] top-[22%] h-[2px] w-[70%] rotate-[18deg] blur-2xl"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,140,50,0.20) 45%, transparent 100%)" }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[16%] right-[-8%] h-[2px] w-[65%] -rotate-[16deg] blur-2xl"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,122,26,0.16) 50%, transparent 100%)" }}
        animate={{ opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 18, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3b — slow-flowing energy trails weaving around the portrait/card zones */}
      <svg
        className="absolute inset-0 h-full w-full blur-[5px]"
        viewBox="0 0 1080 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {TRAILS.map((trail, i) => (
          <motion.path
            key={i}
            d={trail.d}
            stroke="rgba(255,150,70,0.55)"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
            transition={{
              pathLength: { duration: trail.duration, delay: trail.delay, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: trail.fadeDuration, delay: trail.delay, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </svg>

      {/* Layer 5 — subtle atmospheric haze, softens the transition into the portrait */}
      <div
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at center, rgba(255,200,160,0.05) 0%, transparent 65%)" }}
      />

      {/* Layer 4 — tiny floating glowing particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[1px]"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, background: "rgba(255,140,60,0.55)" }}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.65, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Gentle vignette, focuses attention toward the center */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.45) 100%)" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07070B]" />
    </div>
  );
}
