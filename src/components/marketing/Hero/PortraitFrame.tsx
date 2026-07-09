"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useParallax } from "@/components/marketing/Hero/ParallaxProvider";

// Expects a transparent PNG portrait at /public/hero-portrait.png. Until that
// file is added, falls back to a placeholder silhouette in the same frame.
export default function PortraitFrame() {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { x, y } = useParallax(14);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setImgError(true);
    }
  }, []);

  return (
    <motion.div
      style={{ x, y }}
      className="relative order-1 w-[320px] sm:w-[380px] md:w-[480px] lg:w-[560px] xl:order-2 xl:w-[600px]"
    >
      {/* Warm key light from behind */}
      <div
        className="pointer-events-none absolute inset-0 scale-110 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 36%, rgba(255,122,26,0.34) 0%, transparent 60%)",
        }}
      />
      {/* Subtle cool light from one side, for depth against the warm key light */}
      <div
        className="pointer-events-none absolute inset-0 scale-105 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle at 18% 30%, rgba(140,170,255,0.10) 0%, transparent 55%)",
        }}
      />
      {/* Grounding contact shadow so the portrait feels seated in the scene */}
      <div
        className="pointer-events-none absolute bottom-[6%] left-1/2 h-[10%] w-[70%] -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 75%)" }}
      />

      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src="/hero-portrait.png"
          alt="Russell Parayno — Cyberussell"
          className="relative z-10 h-auto w-full select-none"
          style={{
            filter:
              "drop-shadow(-10px 0 26px rgba(140,170,255,0.14)) drop-shadow(0 0 55px rgba(255,122,26,0.38)) drop-shadow(0 45px 55px rgba(0,0,0,0.55))",
            maskImage: "linear-gradient(to bottom, black 80%, transparent 97%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 97%)",
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="relative z-10 flex aspect-[3/4] w-full items-end justify-center rounded-[28px] border border-[#FF7A1A]/25 bg-white/[0.04] backdrop-blur-sm">
          <User size={72} className="mb-6 text-[#FF7A1A]/40" strokeWidth={1.1} />
        </div>
      )}
    </motion.div>
  );
}
