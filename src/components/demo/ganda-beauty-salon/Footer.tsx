import { SALON } from "./data";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M15.5 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2h3.5l-.5 3H12v7.5h-3V15H7v-3h2v-2.3C9 7.4 10.4 6 13 6h2.5v2.5Z" />
    </svg>
  );
}

const COLUMN_LABEL = "font-[family-name:var(--font-playfair)] italic text-[15px] text-[#c9a15a] mb-5";

export default function Footer() {
  return (
    <footer className="bg-[#141110] px-[8%] pt-16 pb-8 flex flex-col gap-14">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-12">
        <div className="flex flex-col gap-5 max-w-[320px]">
          <div className="font-[family-name:var(--font-cormorant)] font-semibold text-[22px] md:text-[24px] tracking-[3px] md:tracking-[4px] text-[#f6f1e9]">
            {SALON.name.toUpperCase()}
            <span className="text-[#c9a15a]">.</span>
          </div>
          <p className="text-[13.5px] leading-[1.8] text-[#8a8378] font-light">
            A calm, private studio for hair and beauty in the heart of Makati. Every visit begins with a
            conversation, not a clock.
          </p>
          <div className="flex gap-3 mt-1">
            <a
              href="#"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] text-[#b9b2a4] hover:border-[#c9a15a] hover:text-[#c9a15a] transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] text-[#b9b2a4] hover:border-[#c9a15a] hover:text-[#c9a15a] transition-colors"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div>
          <div className={COLUMN_LABEL}>Visit</div>
          <div className="flex flex-col gap-[14px] text-[13px] leading-[1.6] text-[#b9b2a4] font-light">
            <span>{SALON.address}</span>
            <a href={`tel:${SALON.phone.replace(/\s+/g, "")}`} className="hover:text-[#c9a15a] transition-colors w-fit">
              {SALON.phone}
            </a>
            <a href={`mailto:${SALON.email}`} className="hover:text-[#c9a15a] transition-colors w-fit">
              {SALON.email}
            </a>
            <span>{SALON.hours}</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <div className={COLUMN_LABEL}>Ready?</div>
            <p className="text-[13px] leading-[1.6] text-[#b9b2a4] font-light max-w-[220px]">
              Reserve your chair online, or scan in at the door when you arrive.
            </p>
          </div>
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-[22px] py-[12px] border border-[#c9a15a] text-[#c9a15a] text-[11.5px] tracking-[1.5px] uppercase hover:bg-[#c9a15a] hover:text-[#141110] transition-colors"
          >
            Book Now <span>↗</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/[0.08] pt-[22px] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11.5px] text-[#6f6a60]">
          &copy; {new Date().getFullYear()} {SALON.name}, Makati City. Fictional salon for demo purposes.
        </p>
        <div className="flex items-center gap-5">
          <a href="/appointments/login" className="text-[11.5px] text-[#6f6a60] hover:text-[#c9a15a] transition-colors">
            Admin Login
          </a>
          <a href="/appointments/login" className="text-[11.5px] text-[#6f6a60] hover:text-[#c9a15a] transition-colors">
            Staff Login
          </a>
          <a href="/portfolio" className="text-[11.5px] text-[#6f6a60] hover:text-[#c9a15a] transition-colors">
            Concept &amp; design by Cyberussell →
          </a>
        </div>
      </div>
    </footer>
  );
}
