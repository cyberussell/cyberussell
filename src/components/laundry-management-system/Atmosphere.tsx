"use client";

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

function mulberry32(seed: number) {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min);
}

function edgeOrInside(rng: () => number, biasChance: number) {
  if (rng() < biasChance) {
    return rng() < 0.5 ? lerp(rng, -10, 2) : lerp(rng, 92, 106);
  }
  return lerp(rng, 4, 96);
}

type MouseContextValue = { x: MotionValue<number>; y: MotionValue<number> };

const AtmosphereMouseContext = createContext<MouseContextValue | null>(null);

export function MouseAtmosphereProvider({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const frame = useRef<number | null>(null);
  const latest = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      latest.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      if (frame.current == null) {
        frame.current = requestAnimationFrame(() => {
          x.set(latest.current.x);
          y.set(latest.current.y);
          frame.current = null;
        });
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [x, y]);

  const value = useMemo(() => ({ x, y }), [x, y]);
  return <AtmosphereMouseContext.Provider value={value}>{children}</AtmosphereMouseContext.Provider>;
}

function useAtmosphereMouse(): MouseContextValue {
  const ctx = useContext(AtmosphereMouseContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  return ctx ?? { x: fallbackX, y: fallbackY };
}

type Bubble = {
  id: number;
  size: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotate: number;
};

function generateBubbles(
  seed: number,
  count: number,
  sizeRange: [number, number],
  opacityRange: [number, number],
  durationRange: [number, number],
  edgeBias: boolean
): Bubble[] {
  const rng = mulberry32(seed);
  const bias = edgeBias ? 0.35 : 0;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: lerp(rng, sizeRange[0], sizeRange[1]),
    left: edgeOrInside(rng, bias),
    top: edgeOrInside(rng, bias),
    opacity: lerp(rng, opacityRange[0], opacityRange[1]),
    duration: lerp(rng, durationRange[0], durationRange[1]),
    delay: lerp(rng, 0, 8),
    driftX: lerp(rng, -14, 14),
    driftY: lerp(rng, 24, 46),
    rotate: lerp(rng, 2, 6),
  }));
}

function BubbleVisual({ b, blur, crisp }: { b: Bubble; blur: number; crisp: boolean }) {
  const sparkleRng = mulberry32(b.id + 97);
  return (
    <motion.div
      className="rounded-full"
      style={{
        width: b.size,
        height: b.size,
        opacity: b.opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        backdropFilter: crisp ? "blur(6px)" : undefined,
        WebkitBackdropFilter: crisp ? "blur(6px)" : undefined,
        border: "1px solid rgba(255,255,255,0.25)",
        background:
          "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85), rgba(255,255,255,0.12) 24%, rgba(56,189,248,0.16) 55%, rgba(37,99,235,0.10) 82%, transparent 100%)",
        boxShadow: crisp
          ? "inset 0 0 18px rgba(255,255,255,0.15), inset 0 -10px 16px rgba(37,99,235,0.15), 0 0 24px rgba(56,189,248,0.12)"
          : undefined,
      }}
      animate={{
        y: [0, -b.driftY, 0],
        x: [0, b.driftX, 0],
        rotate: [-b.rotate, b.rotate, -b.rotate],
        scale: [0.98, 1.03, 0.98],
      }}
      transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {crisp && (
        <>
          <div
            className="absolute rounded-full bg-white/70 blur-[2px]"
            style={{ width: b.size * 0.22, height: b.size * 0.22, top: b.size * 0.14, left: b.size * 0.18 }}
          />
          <div
            className="absolute rounded-full bg-white/40"
            style={{ width: b.size * 0.08, height: b.size * 0.08, bottom: b.size * 0.2, right: b.size * 0.22 }}
          />
          <motion.div
            className="absolute rounded-full bg-white"
            style={{ width: 2, height: 2, top: b.size * 0.5, left: b.size * 0.7 }}
            animate={{ opacity: [0.85, 0.1, 0.85] }}
            transition={{ duration: lerp(sparkleRng, 2, 4), repeat: Infinity }}
          />
        </>
      )}
    </motion.div>
  );
}

function StaticBubble({ b, blur, crisp }: { b: Bubble; blur: number; crisp: boolean }) {
  return (
    <div className="absolute" style={{ left: `${b.left}%`, top: `${b.top}%` }}>
      <BubbleVisual b={b} blur={blur} crisp={crisp} />
    </div>
  );
}

function InteractiveBubble({ b, blur, crisp }: { b: Bubble; blur: number; crisp: boolean }) {
  const mouse = useAtmosphereMouse();
  const shiftX = useTransform(mouse.x, (v) => v * 10);
  const shiftY = useTransform(mouse.y, (v) => v * 10);
  const springX = useSpring(shiftX, { stiffness: 40, damping: 12 });
  const springY = useSpring(shiftY, { stiffness: 40, damping: 12 });

  return (
    <motion.div className="absolute" style={{ left: `${b.left}%`, top: `${b.top}%`, x: springX, y: springY }}>
      <BubbleVisual b={b} blur={blur} crisp={crisp} />
    </motion.div>
  );
}

function GlassBubbleField({
  seed,
  count,
  sizeRange,
  opacityRange,
  durationRange,
  blur = 0,
  crisp = false,
  interactive = false,
  edgeBias = false,
}: {
  seed: number;
  count: number;
  sizeRange: [number, number];
  opacityRange: [number, number];
  durationRange: [number, number];
  blur?: number;
  crisp?: boolean;
  interactive?: boolean;
  edgeBias?: boolean;
}) {
  const bubbles = useMemo(
    () => generateBubbles(seed, count, sizeRange, opacityRange, durationRange, edgeBias),
    [seed, count, sizeRange, opacityRange, durationRange, edgeBias]
  );
  const Bubble = interactive ? InteractiveBubble : StaticBubble;
  return (
    <>
      {bubbles.map((b) => (
        <Bubble key={b.id} b={b} blur={blur} crisp={crisp} />
      ))}
    </>
  );
}

type Particle = {
  id: number;
  size: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
  twinkle: boolean;
};

function generateParticles(seed: number, count: number): Particle[] {
  const rng = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: lerp(rng, 1, 3),
    left: lerp(rng, 0, 100),
    top: lerp(rng, 0, 100),
    opacity: lerp(rng, 0.05, 0.25),
    duration: lerp(rng, 6, 14),
    delay: lerp(rng, 0, 6),
    twinkle: rng() < 0.3,
  }));
}

function ParticleField({ seed, count }: { seed: number; count: number }) {
  const particles = useMemo(() => generateParticles(seed, count), [seed, count]);
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
          }}
          animate={
            p.twinkle
              ? { y: [0, -18, 0], opacity: [p.opacity, p.opacity * 0.15, p.opacity] }
              : { y: [0, -18, 0] }
          }
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function LightWash() {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 60% 50% at 15% 10%, rgba(56,189,248,0.08), transparent 70%)",
          "radial-gradient(ellipse 50% 40% at 85% 15%, rgba(96,165,250,0.07), transparent 70%)",
          "radial-gradient(ellipse 55% 45% at 30% 85%, rgba(147,197,253,0.06), transparent 70%)",
          "radial-gradient(ellipse 45% 55% at 90% 90%, rgba(191,219,254,0.05), transparent 70%)",
        ].join(", "),
      }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function AtmosphereBackground() {
  const { scrollY } = useScroll();
  const yBack = useTransform(scrollY, [0, 2400], [0, -20]);
  const yMid = useTransform(scrollY, [0, 2400], [0, -50]);
  const yFront = useTransform(scrollY, [0, 2400], [0, -90]);

  return (
    <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden bg-[#050816]">
      <LightWash />
      <motion.div className="absolute inset-0" style={{ y: yBack }}>
        <GlassBubbleField
          seed={1}
          count={11}
          sizeRange={[15, 42]}
          opacityRange={[0.05, 0.1]}
          durationRange={[26, 40]}
          blur={26}
          edgeBias
        />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: yMid }}>
        <GlassBubbleField
          seed={2}
          count={9}
          sizeRange={[38, 85]}
          opacityRange={[0.15, 0.3]}
          durationRange={[19, 28]}
          blur={8}
        />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: yFront }}>
        <GlassBubbleField
          seed={3}
          count={7}
          sizeRange={[90, 220]}
          opacityRange={[0.35, 0.6]}
          durationRange={[15, 22]}
          blur={0}
          crisp
          interactive
          edgeBias
        />
      </motion.div>
      <div className="absolute inset-0">
        <ParticleField seed={4} count={55} />
      </div>
    </div>
  );
}

export function HeroBubbleCluster() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <GlassBubbleField seed={11} count={7} sizeRange={[10, 26]} opacityRange={[0.08, 0.16]} durationRange={[16, 24]} blur={10} />
      <GlassBubbleField seed={12} count={6} sizeRange={[30, 60]} opacityRange={[0.18, 0.32]} durationRange={[14, 20]} blur={4} />
      <GlassBubbleField
        seed={13}
        count={5}
        sizeRange={[70, 150]}
        opacityRange={[0.4, 0.65]}
        durationRange={[13, 18]}
        blur={0}
        crisp
        interactive
        edgeBias
      />
    </div>
  );
}

export function CornerBubbleAccent() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <GlassBubbleField seed={21} count={3} sizeRange={[60, 130]} opacityRange={[0.3, 0.5]} durationRange={[14, 20]} blur={0} crisp edgeBias />
    </div>
  );
}
