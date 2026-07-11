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

// Thin white line-art bubble outline, matching the soap-bubble illustration reference.
function BubbleVisual({ b, crisp }: { b: Bubble; crisp: boolean }) {
  return (
    <motion.div
      className="rounded-full"
      style={{
        width: b.size,
        height: b.size,
        opacity: b.opacity,
        border: `${crisp ? 2 : 1.5}px solid rgba(255,255,255,0.9)`,
        background: crisp
          ? "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), rgba(255,255,255,0.04) 55%, transparent 75%)"
          : "rgba(255,255,255,0.05)",
      }}
      animate={{
        y: [0, -b.driftY, 0],
        x: [0, b.driftX, 0],
        rotate: [-b.rotate, b.rotate, -b.rotate],
        scale: [0.98, 1.02, 0.98],
      }}
      transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {crisp && (
        <div
          className="absolute rounded-full bg-white/70 blur-[2px]"
          style={{
            width: round(b.size * 0.22),
            height: round(b.size * 0.12),
            top: round(b.size * 0.16),
            left: round(b.size * 0.2),
          }}
        />
      )}
    </motion.div>
  );
}

function StaticBubble({ b, crisp }: { b: Bubble; crisp: boolean }) {
  return (
    <div
      className="absolute"
      style={{ left: `${b.left}%`, top: `${b.top}%`, marginLeft: round(-b.size / 2), marginTop: round(-b.size / 2) }}
    >
      <BubbleVisual b={b} crisp={crisp} />
    </div>
  );
}

function InteractiveBubble({ b, crisp }: { b: Bubble; crisp: boolean }) {
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
      <BubbleVisual b={b} crisp={crisp} />
    </motion.div>
  );
}

function GlassBubbleField({
  seed,
  count,
  sizeRange,
  opacityRange,
  durationRange,
  crisp = false,
  interactive = false,
  edgeBias = false,
}: {
  seed: number;
  count: number;
  sizeRange: [number, number];
  opacityRange: [number, number];
  durationRange: [number, number];
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
        <Bubble key={b.id} b={b} crisp={crisp} />
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
          "radial-gradient(ellipse 55% 40% at 20% 12%, rgba(255,255,255,0.35), transparent 70%)",
          "radial-gradient(ellipse 45% 35% at 82% 18%, rgba(255,255,255,0.28), transparent 70%)",
          "radial-gradient(ellipse 50% 40% at 35% 82%, rgba(255,255,255,0.18), transparent 70%)",
        ].join(", "),
      }}
      animate={{ scale: [1, 1.05, 1] }}
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
        style={{ background: "linear-gradient(180deg, #8FD8EC 0%, #B7E8F5 55%, #DFF4FB 100%)" }}
      />
      <LightWash />
      <motion.div className="absolute inset-0" style={{ y: yBack }}>
        <GlassBubbleField seed={1} count={5} sizeRange={[18, 40]} opacityRange={[0.35, 0.55]} durationRange={[28, 40]} edgeBias />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: yMid }}>
        <GlassBubbleField seed={2} count={4} sizeRange={[36, 70]} opacityRange={[0.45, 0.65]} durationRange={[20, 28]} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: yFront }}>
        <GlassBubbleField
          seed={3}
          count={3}
          sizeRange={[60, 110]}
          opacityRange={[0.55, 0.8]}
          durationRange={[16, 22]}
          crisp
          interactive
        />
      </motion.div>
    </div>
  );
}

export function HeroBubbleCluster() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <GlassBubbleField seed={11} count={4} sizeRange={[14, 30]} opacityRange={[0.4, 0.6]} durationRange={[18, 24]} />
      <GlassBubbleField seed={12} count={3} sizeRange={[34, 60]} opacityRange={[0.5, 0.7]} durationRange={[15, 20]} />
      <GlassBubbleField
        seed={13}
        count={2}
        sizeRange={[64, 110]}
        opacityRange={[0.6, 0.85]}
        durationRange={[14, 18]}
        crisp
        interactive
      />
    </div>
  );
}

export function CornerBubbleAccent() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <GlassBubbleField seed={21} count={3} sizeRange={[40, 90]} opacityRange={[0.35, 0.55]} durationRange={[14, 20]} crisp />
    </div>
  );
}

type BandBubble = { id: number; x: number; y: number; size: number; opacity: number };

function generateBandBubbles(seed: number, count: number): BandBubble[] {
  const rng = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: lerp(rng, 2, 98),
    y: lerp(rng, 4, 42),
    size: lerp(rng, 8, 26),
    opacity: lerp(rng, 0.45, 0.85),
  }));
}

type CloudBump = { x: number; r: number; yJitter: number };

function generateCloudBumps(seed: number): CloudBump[] {
  const rng = mulberry32(seed);
  const n = 16;
  return Array.from({ length: n }, (_, i) => ({
    x: (i / (n - 1)) * 108 - 4,
    r: lerp(rng, 26, 46),
    yJitter: lerp(rng, -6, 6),
  }));
}

function CloudLayer({ seed, color, bumpScale, baseline }: { seed: number; color: string; bumpScale: number; baseline: number }) {
  const bumps = useMemo(() => generateCloudBumps(seed), [seed]);
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-x-0 bottom-0" style={{ top: baseline, background: color }} />
      {bumps.map((bump, i) => {
        const r = bump.r * bumpScale;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${bump.x}%`,
              top: round(baseline - r * 0.9 + bump.yJitter),
              width: r * 2,
              height: r * 2,
              marginLeft: round(-r),
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}

// Layered soap-cloud band: a pale blue cloud layer peeking above a white cloud layer,
// with a scatter of line-art bubbles floating in the gap above them.
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
  const bubbleCount = Math.max(4, Math.round(count / 12));
  const bubbles = useMemo(() => generateBandBubbles(seed + 900, bubbleCount), [seed, bubbleCount]);

  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height }}
    >
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            border: "1.5px solid rgba(255,255,255,0.85)",
            marginLeft: round(-b.size / 2),
            marginTop: round(-b.size / 2),
          }}
        />
      ))}
      <CloudLayer seed={seed} color="#B9E9F6" bumpScale={1.1} baseline={height * 0.4} />
      <CloudLayer seed={seed + 1} color="#FFFFFF" bumpScale={0.82} baseline={height * 0.56} />
    </div>
  );
}
