// Generates a jagged sunburst polygon (spikes alternating outer/inner radius)
// to enclose the ₱1,999 price, evoking a value-offer seal without a loud
// "SALE" graphic.
function starPoints(spikes: number, outerR: number, innerR: number, cx: number, cy: number): string {
  const points: string[] = [];
  const step = Math.PI / spikes;
  let angle = -Math.PI / 2;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(`${(cx + Math.cos(angle) * r).toFixed(2)},${(cy + Math.sin(angle) * r).toFixed(2)}`);
    angle += step;
  }
  return points.join(" ");
}

const STAR_POINTS = starPoints(14, 130, 110, 140, 140);

export default function Starburst() {
  return (
    <div className="relative mx-auto h-[220px] w-[220px] shrink-0 md:h-[260px] md:w-[260px]">
      <svg
        viewBox="0 0 280 280"
        className="absolute inset-0 h-full w-full drop-shadow-[0_0_40px_rgba(255,122,26,0.22)]"
      >
        <defs>
          <radialGradient id="starburstGradient" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#1C1108" />
            <stop offset="100%" stopColor="#0B0603" />
          </radialGradient>
        </defs>
        <polygon
          points={STAR_POINTS}
          fill="url(#starburstGradient)"
          stroke="#FF7A1A"
          strokeWidth="1.5"
          strokeOpacity="0.55"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-[#FF7A1A]">
          Only
        </span>
        <span className="font-sans text-[36px] font-extrabold leading-none text-white md:text-[42px]">
          ₱1,999
        </span>
        <span className="mt-1.5 font-[family-name:var(--font-inter)] text-[12px] font-semibold text-white/60">
          One-Time Payment
        </span>
      </div>
    </div>
  );
}
