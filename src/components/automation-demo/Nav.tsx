export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-4 px-6 md:px-[clamp(24px,6vw,88px)] py-[18px] backdrop-blur-md bg-[#0A0E17]/80">
      <a
        href="#top"
        className="font-[family-name:var(--font-syne)] font-bold text-[15px] tracking-tight text-[#E7EAF2] no-underline"
      >
        Cyberussell
      </a>
      <div className="flex gap-4 md:gap-[22px] items-center text-[13px] font-mono">
        <a href="#problem" className="hidden sm:inline text-[#8A93A6] no-underline hover:text-[#E7EAF2] transition-colors">
          Problem
        </a>
        <a href="#demo" className="hidden sm:inline text-[#8A93A6] no-underline hover:text-[#E7EAF2] transition-colors">
          Live demo
        </a>
        <a href="#how" className="hidden sm:inline text-[#8A93A6] no-underline hover:text-[#E7EAF2] transition-colors">
          How it works
        </a>
        <a
          href="#contact"
          className="inline-flex items-center rounded-md border border-[#22D3EE] px-[14px] py-[9px] text-[13px] text-[#22D3EE] no-underline transition-colors hover:bg-[#22D3EE]/10"
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}
