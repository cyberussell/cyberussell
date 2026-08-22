"use client";

import { applyScrollReveal, useGsapScope } from "./useGsap";

const CONTACT_EMAIL = "russell.a.parayno@gmail.com";

export default function AboutContact() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    // A gentler, single fade — no stagger, no scale. Motion settles here.
    applyScrollReveal(scope.querySelectorAll("[data-reveal]"));
  }, []);

  return (
    <section id="contact" ref={scopeRef} className="px-6 md:px-[clamp(24px,6vw,88px)] py-[110px] pb-[140px] max-w-[1240px]">
      <hr
        data-reveal
        className="border-0 h-px mb-14"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 48px, rgba(255,255,255,0.12) calc(100% - 48px), transparent)",
        }}
      />
      <div className="grid gap-14 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-w-[1000px]">
        <div>
          <h2
            data-reveal
            className="font-[family-name:var(--font-syne)] font-bold text-[clamp(26px,3.6vw,38px)] tracking-[-0.02em] mb-[18px] text-[#E7EAF2]"
          >
            About
          </h2>
          <p data-reveal className="text-[16px] leading-[1.6] text-[#B7BECC] max-w-[44ch]">
            I&rsquo;m Russell — I design and ship small, single-purpose AI agents for businesses that run on email
            and a calendar. No platform to adopt, no migration: one job, done end to end, with every action
            visible. This page is one of them, running live.
          </p>
        </div>
        <div>
          <h2
            data-reveal
            className="font-[family-name:var(--font-syne)] font-bold text-[clamp(26px,3.6vw,38px)] tracking-[-0.02em] mb-[18px] text-[#E7EAF2]"
          >
            Work with me
          </h2>
          <p data-reveal className="text-[16px] text-[#8A93A6] max-w-[40ch] mb-[22px]">
            If you have a process that dies between two tabs, that&rsquo;s the one I want to see.
          </p>
          <div data-reveal className="flex flex-col gap-[10px] items-start">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center rounded-md border border-[#22D3EE] px-5 py-[11px] text-[14px] font-mono text-[#22D3EE] no-underline transition-colors hover:bg-[#22D3EE]/10"
            >
              {CONTACT_EMAIL}
            </a>
            <span className="text-[13px] text-[#4B5265] font-mono">Replies within a day. Usually the same hour.</span>
          </div>
        </div>
      </div>
      <div data-reveal className="mt-24 text-[12px] text-[#3F424D] font-mono">
        © {new Date().getFullYear()} Russell Parayno — Cyberussell. Static page, no tracking.
      </div>
    </section>
  );
}
