import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GetStartedNav() {
  return (
    <header className="sticky top-0 z-50 bg-[#0F0F1A]/85 backdrop-blur-md border-b border-white/[0.08]">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Back to Cyberussell home"
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2} />
          </Link>
          <Link href="/" className="font-sans text-[18px] font-bold tracking-tight">
            <span className="text-white">Cyber</span>
            <span className="text-[#FFD23F]">ussell</span>
          </Link>
        </div>

        <Link
          href="/services/inquire?service=Free%20Consultation"
          className="shrink-0 whitespace-nowrap bg-[#E8373A] hover:bg-[#FF4A4D] text-white font-[family-name:var(--font-inter)] font-bold text-[12px] sm:text-[13px] px-3 sm:px-4 py-2.5 rounded-lg transition-colors"
        >
          <span className="sm:hidden">Book a Call</span>
          <span className="hidden sm:inline">Book a Consultation</span>
        </Link>
      </nav>
    </header>
  );
}
