import type { LucideIcon } from "lucide-react";

export type StageStatus = "idle" | "active" | "done" | "error";

const STATUS_COLOR: Record<StageStatus, string> = {
  idle: "#3F424D",
  active: "#67E8F9",
  done: "#22D3EE",
  error: "#F87171",
};

const STATUS_GLOW: Record<StageStatus, string> = {
  idle: "none",
  active: "0 0 16px currentColor, 0 0 5px currentColor",
  done: "0 0 10px currentColor, 0 0 2px currentColor",
  error: "0 0 10px currentColor",
};

export function PipelineStageCard({
  n,
  title,
  body,
  tool,
  status = "idle",
  icon: Icon,
  link,
  linkLabel,
  showStatusIcon = true,
}: {
  n: string;
  title: string;
  body: string;
  tool: string;
  status?: StageStatus;
  /** Lucide icon rendered as a neon badge — glows and pulses as `status` moves through active/done. */
  icon?: LucideIcon;
  link?: string;
  linkLabel?: string;
  /** When false, always shows the step number instead of a ✓/…/! status glyph — used for purely descriptive (non-live) cards. Ignored once `icon` is set. */
  showStatusIcon?: boolean;
}) {
  const color = STATUS_COLOR[status];
  return (
    <div
      data-step
      className="relative rounded-lg p-6 bg-[#10141F] border transition-colors duration-300"
      style={{ borderColor: status === "idle" ? "rgba(255,255,255,0.06)" : `${color}55` }}
    >
      <div className="flex items-center gap-[10px] mb-4">
        <span
          className={`relative inline-flex items-center justify-center shrink-0 rounded-full border transition-colors duration-300 ${
            Icon ? "w-9 h-9" : "font-mono text-[12px] rounded px-[7px] py-[2px]"
          } ${status === "active" ? "motion-safe:animate-[neon-pulse_1.3s_ease-in-out_infinite]" : ""}`}
          style={{ color, borderColor: color, boxShadow: STATUS_GLOW[status] }}
          aria-hidden="true"
        >
          {Icon ? (
            <Icon size={16} strokeWidth={2.25} />
          ) : showStatusIcon ? (
            status === "done" ? "✓" : status === "active" ? "…" : status === "error" ? "!" : n
          ) : (
            n
          )}
        </span>
        <span
          data-step-bar
          className="flex-1 h-px origin-left transition-opacity duration-300"
          style={{ background: color, opacity: status === "idle" ? 0.3 : 1 }}
        />
      </div>
      <h3 className="font-[family-name:var(--font-syne)] font-semibold text-[19px] mb-2 tracking-[-0.015em] text-[#E7EAF2]">
        {title}
      </h3>
      <p className="text-[14px] text-[#8A93A6] mb-3">{body}</p>
      <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#4B5265]">{tool}</div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block font-mono text-[12px] text-[#22D3EE] underline underline-offset-2"
        >
          {linkLabel ?? "View"} ↗
        </a>
      )}
    </div>
  );
}
