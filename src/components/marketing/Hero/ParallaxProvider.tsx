"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useMotionValue, useTransform, type MotionValue } from "framer-motion";

interface ParallaxContextValue {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

// Tracks normalized mouse position (-1..1 on each axis) across the whole
// viewport and shares it via context so the portrait, cards, and background
// glow can each apply their own (very small) share of the same movement.
export function ParallaxProvider({ children }: { children: React.ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    // Only devices with a real, hovering pointer (i.e. a mouse) get parallax.
    // Touch devices have no persistent cursor position — a stray tap can fire
    // a synthetic mousemove that then never resets, permanently offsetting
    // the portrait/cards toward wherever that tap happened.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    function handleMouseMove(e: MouseEvent) {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [mx, my]);

  return <ParallaxContext.Provider value={{ mx, my }}>{children}</ParallaxContext.Provider>;
}

// factor = max px offset at the viewport edge. Larger factor = moves more.
export function useParallax(factor: number) {
  const ctx = useContext(ParallaxContext);
  const fallback = useMotionValue(0);
  const x = useTransform(ctx ? ctx.mx : fallback, (v) => v * factor);
  const y = useTransform(ctx ? ctx.my : fallback, (v) => v * factor);
  return { x, y };
}
