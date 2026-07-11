"use client";

import { createContext, useContext, useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
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

function round(n: number, decimals = 4) {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

function lerp(rng: () => number, min: number, max: number) {
  return round(min + rng() * (max - min));
}

function edgeOrInside(rng: () => number, biasChance: number) {
  if (rng() < biasChance) {
    return rng() < 0.5 ? lerp(rng, -10, 2) : lerp(rng, 92, 106);
  }
  return lerp(rng, 14, 86);
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

const GLASS_GRADIENT =
  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85), rgba(224,242,254,0.20) 22%, rgba(34,211,238,0.16) 48%, rgba(56,189,248,0.14) 68%, rgba(37,99,235,0.10) 86%, transparent 100%)";

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
        background: GLASS_GRADIENT,
        boxShadow: crisp
          ? "inset 0 0 18px rgba(255,255,255,0.15), inset 0 -10px 16px rgba(37,99,235,0.15), 0 0 24px rgba(34,211,238,0.12)"
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
            style={{
              width: round(b.size * 0.22),
              height: round(b.size * 0.22),
              top: round(b.size * 0.14),
              left: round(b.size * 0.18),
            }}
          />
          <div
            className="absolute rounded-full bg-white/40"
            style={{
              width: round(b.size * 0.08),
              height: round(b.size * 0.08),
              bottom: round(b.size * 0.2),
              right: round(b.size * 0.22),
            }}
          />
          <motion.div
            className="absolute rounded-full bg-white"
            style={{ width: 2, height: 2, top: round(b.size * 0.5), left: round(b.size * 0.7) }}
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
    <div
      className="absolute"
      style={{ left: `${b.left}%`, top: `${b.top}%`, marginLeft: round(-b.size / 2), marginTop: round(-b.size / 2) }}
    >
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
    <motion.div
      className="absolute"
      style={{
        left: `${b.left}%`,
        top: `${b.top}%`,
        marginLeft: round(-b.size / 2),
        marginTop: round(-b.size / 2),
        x: springX,
        y: springY,
      }}
    >
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
    opacity: lerp(rng, 0.05, 0.2),
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
          "radial-gradient(ellipse 60% 50% at 15% 10%, rgba(34,211,238,0.07), transparent 70%)",
          "radial-gradient(ellipse 50% 40% at 85% 15%, rgba(56,189,248,0.07), transparent 70%)",
          "radial-gradient(ellipse 55% 45% at 30% 85%, rgba(125,211,252,0.06), transparent 70%)",
          "radial-gradient(ellipse 45% 55% at 90% 90%, rgba(224,242,254,0.05), transparent 70%)",
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
    <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #08111F 0%, #0F172A 50%, #08111F 100%)" }}
      />
      <LightWash />
      <motion.div className="absolute inset-0" style={{ y: yBack }}>
        <GlassBubbleField seed={1} count={3} sizeRange={[20, 48]} opacityRange={[0.05, 0.1]} durationRange={[28, 40]} blur={22} edgeBias />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: yMid }}>
        <GlassBubbleField seed={2} count={2} sizeRange={[45, 90]} opacityRange={[0.12, 0.22]} durationRange={[20, 28]} blur={8} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: yFront }}>
        <GlassBubbleField
          seed={3}
          count={2}
          sizeRange={[90, 170]}
          opacityRange={[0.25, 0.4]}
          durationRange={[16, 22]}
          blur={0}
          crisp
          interactive
        />
      </motion.div>
      <div className="absolute inset-0">
        <ParticleField seed={4} count={16} />
      </div>
    </div>
  );
}

export function HeroBubbleCluster() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <GlassBubbleField seed={11} count={2} sizeRange={[14, 30]} opacityRange={[0.1, 0.18]} durationRange={[18, 24]} blur={8} />
      <GlassBubbleField seed={12} count={2} sizeRange={[36, 64]} opacityRange={[0.18, 0.3]} durationRange={[15, 20]} blur={3} />
      <GlassBubbleField
        seed={13}
        count={2}
        sizeRange={[70, 130]}
        opacityRange={[0.32, 0.5]}
        durationRange={[14, 18]}
        blur={0}
        crisp
        interactive
      />
    </div>
  );
}

export function CornerBubbleAccent() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <GlassBubbleField seed={21} count={2} sizeRange={[50, 110]} opacityRange={[0.25, 0.4]} durationRange={[14, 20]} blur={0} crisp />
    </div>
  );
}

type FoamPiece = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animated: boolean;
  duration: number;
  delay: number;
};

function generateFoam(seed: number, count: number): FoamPiece[] {
  const rng = mulberry32(seed);
  const waveFreq = lerp(rng, 2.2, 3.4);
  const waveAmp = lerp(rng, 10, 26);
  return Array.from({ length: count }, (_, i) => {
    const x = Math.min(99, Math.max(1, (i / count) * 100 + lerp(rng, -1.8, 1.8)));
    const wave = Math.sin((x / 100) * Math.PI * waveFreq) * waveAmp;
    const jitter = lerp(rng, -16, 16);
    return {
      id: i,
      x,
      y: wave + jitter,
      size: lerp(rng, 5, 40),
      opacity: lerp(rng, 0.22, 0.7),
      animated: rng() < 0.32,
      duration: lerp(rng, 14, 26),
      delay: lerp(rng, 0, 10),
    };
  });
}

const FOAM_GRADIENT =
  "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(224,242,254,0.28) 30%, rgba(34,211,238,0.18) 60%, rgba(37,99,235,0.12) 100%)";

function FoamCircle({ f, bandHeight }: { f: FoamPiece; bandHeight: number }) {
  const baseline = bandHeight * 0.55;
  const style: CSSProperties = {
    position: "absolute",
    left: `${f.x}%`,
    top: round(baseline - f.y - f.size / 2),
    marginLeft: round(-f.size / 2),
    width: f.size,
    height: f.size,
    opacity: f.opacity,
    borderRadius: "9999px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: FOAM_GRADIENT,
    boxShadow: "inset 0 0 6px rgba(255,255,255,0.25), inset 0 -4px 8px rgba(37,99,235,0.15)",
  };
  if (!f.animated) return <div style={style} />;
  return (
    <motion.div
      style={style}
      animate={{ y: [0, -10, 0], opacity: [f.opacity, Math.min(1, f.opacity * 1.35), f.opacity] }}
      transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function FoamDivider({
  seed,
  count = 80,
  height = 130,
  className = "",
}: {
  seed: number;
  count?: number;
  height?: number;
  className?: string;
}) {
  const foam = useMemo(() => generateFoam(seed, count), [seed, count]);
  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height,
        maskImage: "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
          backgroundSize: "250% 100%",
        }}
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      {foam.map((f) => (
        <FoamCircle key={f.id} f={f} bandHeight={height} />
      ))}
    </div>
  );
}
