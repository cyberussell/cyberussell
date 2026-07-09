"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getMarketingIcon } from "@/components/marketing/icons";
import { useParallax } from "@/components/marketing/Hero/ParallaxProvider";

export interface FloatingServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  floatDuration?: number;
  floatDelay?: number;
  floatAmplitude?: number;
  floatXDrift?: number;
  rotateY?: number;
  rotateZ?: number;
}

export default function FloatingServiceCard({
  title,
  description,
  icon,
  href,
  floatDuration = 7,
  floatDelay = 0,
  floatAmplitude = 8,
  floatXDrift = 0,
  rotateY = 0,
  rotateZ = 0,
}: FloatingServiceCardProps) {
  const Icon = getMarketingIcon(icon);
  const { x, y } = useParallax(4);
  const tilted = rotateY !== 0 || rotateZ !== 0;
  const outerEdge = rotateY >= 0 ? "left" : "right";
  const outerShadowX = !tilted ? "0px" : outerEdge === "left" ? "-10px" : "10px";

  return (
    <motion.div
      className="relative z-20 w-full xl:w-[290px]"
      style={{ x, y, rotateY, rotateZ, transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{ y: [0, -floatAmplitude, 0], x: [0, floatXDrift, 0] }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Soft ambient reflection beneath the card, reinforcing that it's suspended */}
        <div
          className="pointer-events-none absolute inset-x-3 -bottom-3 h-4 rounded-full blur-md"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 75%)" }}
        />

        <Link
          href={href}
          className="group relative flex w-full overflow-hidden rounded-2xl border border-[#FF7A1A]/20 bg-gradient-to-b from-white/[0.10] to-white/[0.015] p-4 backdrop-blur-3xl transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#FF7A1A]/50 hover:from-white/[0.15] hover:to-white/[0.03] min-h-[194px] md:min-h-[124px] xl:min-h-[144px]"
          style={{
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.10), 0 16px 32px rgba(0,0,0,0.35), ${outerShadowX} 0 26px rgba(255,122,26,0.16)`,
          }}
        >
          {/* Top hairline — glass reflection */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-80" />
          {/* Diagonal glass sheen */}
          <div className="pointer-events-none absolute -inset-y-6 left-[-30%] w-1/3 rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          {/* Soft edge light that shifts subtly on hover */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF7A1A]/0 via-transparent to-[#FF7A1A]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[#FF7A1A]/10" />
          {/* Outer edge brighter than inner edge, reinforcing the tilt toward the portrait */}
          {tilted && (
            <div
              className={`pointer-events-none absolute inset-y-0 w-1/2 ${
                outerEdge === "left" ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"
              } from-[#FF7A1A]/[0.09] to-transparent`}
            />
          )}

          {/* Icon (left, no background container, vertically centered) and text
              (right, left-aligned, stacked) sit side-by-side. */}
          <div className="relative z-10 flex w-full items-center gap-3 xl:gap-3.5">
            <Icon
              className="h-9 w-9 shrink-0 text-[#3B82F6] transition-transform duration-300 ease-out group-hover:scale-110 md:h-10 md:w-10 xl:h-11 xl:w-11"
              strokeWidth={1.5}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="font-sans text-[15px] font-extrabold leading-tight text-[#FFA149] md:min-h-[38px] md:text-[15px] xl:min-h-[40px] xl:text-[16px]">
                {title}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-inter)] text-[12px] leading-[1.4] text-white/60 md:text-[12.5px] xl:text-[13px] xl:leading-[1.45]">
                {description}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 whitespace-nowrap font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FF7A1A] transition-colors duration-300 group-hover:text-[#FFA149]">
                View Details
                <ArrowUpRight
                  size={12}
                  className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
