import ShareSiteButton from "@/components/ShareSiteButton";

const linkColumns = [
  {
    heading: "On This Site",
    links: [
      { label: "The Problem", href: "/#problema" },
      { label: "Ways to Earn", href: "/#paraan" },
      { label: "Skill Finder", href: "/#skill-finder" },
      { label: "Free Downloads", href: "/#downloads" },
      { label: "Find Work", href: "/platforms" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Cyberussell",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contact", href: "/contact" },
      { label: "UTM Builder", href: "/utm" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F0F1A] border-t border-white/[0.08]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-11 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo + tagline + description */}
        <div className="flex flex-col gap-3 max-w-[280px]">
          <a
            href="/"
            className="font-sans text-[20px] font-bold tracking-tight"
          >
            <span className="text-white">Cyber</span>
            <span className="text-[#FFD23F]">ussell</span>
          </a>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 italic">
            Diskarte mo, Pera mo.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 leading-[1.7]">
            Research-backed information for Filipinos who want to earn online.
            Free. Simple. Built by someone from the province, for people from
            the province.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex gap-12 md:gap-20">
          {linkColumns.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <h5 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[0.1em]">
                {heading}
              </h5>
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
              {heading === "Cyberussell" && <ShareSiteButton />}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 text-center md:text-left">
            © 2026 Cyberussell · Russell · Isabela, Cagayan Valley · Built with Claude AI · Data: PSA, DOLE
          </span>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="https://www.tiktok.com/@cyberussell" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/30 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.27 8.27 0 004.84 1.55V6.85a4.85 4.85 0 01-1.07-.16z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/cyberussellofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/30 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@CyberRussell" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/30 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
