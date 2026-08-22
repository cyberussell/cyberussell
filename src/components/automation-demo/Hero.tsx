"use client";

import { useGsapScope, gsap } from "./useGsap";

const PIPELINE_PATH =
  "M20 60 H 220 Q 250 60 250 32 H 430 Q 460 32 460 60 H 660 Q 690 60 690 88 H 860 Q 890 88 890 60 H 940";
const NODES = [
  { cx: 20, cy: 60, label: "Lead in", lx: 14, ly: 84 },
  { cx: 250, cy: 32, label: "Qualify", lx: 228, ly: 20 },
  { cx: 460, cy: 60, label: "Draft", lx: 438, ly: 84 },
  { cx: 690, cy: 88, label: "Book", lx: 668, ly: 112 },
  { cx: 890, cy: 60, label: "Log", lx: 862, ly: 84 },
];

export default function Hero() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    const boot = Array.from(scope.querySelectorAll<HTMLElement>("[data-boot]")).sort(
      (a, b) => Number(a.dataset.boot) - Number(b.dataset.boot)
    );
    gsap.set(boot, { opacity: 0, y: 18 });
    gsap.to(boot, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.11, delay: 0.15 });

    const trace = scope.querySelector<SVGPathElement>("[data-trace]");
    if (trace) {
      const len = trace.getTotalLength();
      gsap.set(trace, { strokeDasharray: len, strokeDashoffset: len });
      const nodes = Array.from(scope.querySelectorAll<SVGCircleElement>("[data-node]"));
      gsap.set(nodes, { opacity: 0.25, scale: 0.7, transformOrigin: "center" });
      const tl = gsap.timeline({ delay: 0.9 });
      tl.to(trace, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" });
      nodes.forEach((n, i) => {
        tl.to(n, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, 0.9 + i * 0.42);
      });
      tl.to(trace, { opacity: 0.55, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }, []);

  return (
    <section
      id="top"
      ref={scopeRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-[clamp(24px,6vw,88px)] pt-[140px] pb-[90px] max-w-[1240px] overflow-hidden"
    >
      {/* Background circuit motif — subtle, always-drifting, independent of the boot sequence */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 -left-32 w-[620px] h-[620px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)" }}
        />
        <svg
          className="absolute inset-0 w-full h-full motion-safe:animate-[circuit-drift_26s_linear_infinite]"
          style={{ opacity: 0.16 }}
          preserveAspectRatio="none"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <defs>
            <pattern id="circuit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 H40 M20 0 V40" stroke="#22D3EE" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="1.4" fill="#22D3EE" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#circuit-grid)" />
        </svg>
      </div>

      <div data-boot="1" className="flex items-center gap-[10px] mb-[26px]">
        <span
          className="w-[7px] h-[7px] rounded-full bg-[#22D3EE] motion-safe:animate-[noct-pulse_2.4s_ease-in-out_infinite]"
          style={{ boxShadow: "0 0 10px #22D3EE" }}
        />
        <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-[#67E8F9]">Agent online</span>
      </div>

      <h1
        data-boot="2"
        className="font-[family-name:var(--font-syne)] font-bold text-[clamp(40px,7.4vw,86px)] leading-[1.02] tracking-[-0.03em] max-w-[15ch] mb-6 text-[#E7EAF2]"
      >
        Leads don&rsquo;t go cold. Follow-up does.
      </h1>

      <p
        data-boot="3"
        className="text-[clamp(17px,2vw,22px)] leading-[1.5] max-w-[56ch] text-[#B7BECC] mb-[14px]"
      >
        I build small, single-purpose AI agents for businesses that run on email and a calendar — and this page
        runs one, live.
      </p>

      <p data-boot="4" className="text-[15px] max-w-[52ch] text-[#6B7385] mb-[38px] font-mono">
        Everything below is real. The demo sends an actual email, books an actual calendar event, and files an
        actual document — through your own connected Google account, from your browser.
      </p>

      <div data-boot="5" className="flex flex-wrap gap-3 mb-16">
        <a
          href="#demo"
          className="inline-flex items-center rounded-md border border-[#22D3EE] px-5 py-[11px] text-[14px] font-[family-name:var(--font-syne)] font-medium text-[#22D3EE] no-underline transition-colors hover:bg-[#22D3EE]/10"
        >
          Run the live demo
        </a>
        <a
          href="#how"
          className="inline-flex items-center rounded-md px-5 py-[11px] text-[14px] font-[family-name:var(--font-syne)] font-medium text-[#22D3EE] no-underline transition-colors hover:bg-[#22D3EE]/10"
        >
          See the handoff
        </a>
      </div>

      <div data-boot="6" className="max-w-[980px]">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#4B5265] mb-[14px]">
          The pipeline
        </div>
        <svg
          viewBox="0 0 960 120"
          className="w-full h-auto overflow-visible"
          aria-label="Lead intake to follow-up pipeline"
        >
          <path d={PIPELINE_PATH} fill="none" stroke="#232838" strokeWidth="1.5" />
          {/* Renders fully drawn by default (correct resting state for reduced motion);
              the GSAP effect below draws it from scratch when motion is allowed. */}
          <path
            data-trace="1"
            d={PIPELINE_PATH}
            fill="none"
            stroke="#22D3EE"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px #22D3EE)" }}
          />
          <g>
            {NODES.map((n, i) => (
              <circle key={i} data-node={i + 1} cx={n.cx} cy={n.cy} r="5" fill="#0A0E17" stroke="#22D3EE" strokeWidth="1.5" />
            ))}
          </g>
          <g fontSize="11" fill="#6B7385" fontFamily="ui-monospace, monospace">
            {NODES.map((n, i) => (
              <text key={i} x={n.lx} y={n.ly}>
                {n.label}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
}
