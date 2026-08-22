"use client";

import { applyScrollReveal, useGsapScope } from "./useGsap";

const STATS = [
  {
    value: "2 days",
    body: "Typical time between a form fill and a real human reply at a small business. The intent is gone by then.",
  },
  {
    value: "4 tabs",
    body: "Inbox, calendar, notes, spreadsheet. Every handoff between them is a place the lead falls through.",
  },
  {
    value: "0 records",
    body: "Nothing written down means nothing followed up. The second touch never happens because no one owns it.",
  },
];

export default function Problem() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    applyScrollReveal(scope.querySelectorAll("[data-reveal]"));
  }, []);

  return (
    <section id="problem" ref={scopeRef} className="px-6 md:px-[clamp(24px,6vw,88px)] py-[100px] md:py-[120px] max-w-[1240px]">
      <div data-reveal className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#4B5265] mb-5">
        The problem
      </div>
      <h2
        data-reveal
        className="font-[family-name:var(--font-syne)] font-bold text-[clamp(28px,4.4vw,48px)] tracking-[-0.025em] max-w-[24ch] mb-12 text-[#E7EAF2]"
      >
        A lead that waits two days is a lead someone else already called.
      </h2>

      <div className="grid gap-[18px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-w-[1060px] mb-11">
        {STATS.map((s) => (
          <div key={s.value} data-reveal className="rounded-lg bg-[#10141F] border border-white/[0.06] p-6">
            <div className="font-[family-name:var(--font-syne)] font-bold text-[36px] tracking-[-0.02em] text-[#67E8F9] mb-2">
              {s.value}
            </div>
            <div className="text-[14px] text-[#8A93A6]">{s.body}</div>
          </div>
        ))}
      </div>

      {/* Before / after — manual follow-up vs. the agent */}
      <div data-reveal className="grid gap-4 md:grid-cols-2 max-w-[1060px] mb-11">
        <div className="rounded-lg border border-white/[0.06] bg-[#10141F] p-6">
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6B7385] mb-4">Manual — before</div>
          <ol className="space-y-3">
            {["Lead lands in inbox", "Sits until someone has time", "Reply drafted from scratch", "Meeting arranged over 3 emails", "Maybe logged, maybe not"].map(
              (step, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-[#8A93A6]">
                  <span className="w-5 h-5 shrink-0 rounded-full border border-white/15 grid place-items-center font-mono text-[10px] text-[#6B7385]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              )
            )}
          </ol>
        </div>
        <div className="rounded-lg border border-[#22D3EE]/25 bg-[#0D1520] p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]">
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#67E8F9] mb-4">Agent — after</div>
          <ol className="space-y-3">
            {["Lead lands", "Read + qualified instantly", "Reply drafted and sent", "Meeting booked on real availability", "Record filed automatically"].map(
              (step, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-[#CBD5E8]">
                  <span className="w-5 h-5 shrink-0 rounded-full border border-[#22D3EE]/50 grid place-items-center font-mono text-[10px] text-[#22D3EE]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              )
            )}
          </ol>
        </div>
      </div>

      <p data-reveal className="max-w-[60ch] text-[17px] leading-[1.55] text-[#B7BECC]">
        The fix isn&rsquo;t another dashboard to check. It&rsquo;s an agent that reads the lead, writes the reply,
        puts the meeting on the calendar and files the record — in one pass, in seconds, with the work visible so
        you can trust it.
      </p>
    </section>
  );
}
