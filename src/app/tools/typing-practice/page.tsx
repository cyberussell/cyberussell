import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypingPractice from "@/components/TypingPractice";

export const metadata: Metadata = {
  title: "Typing Practice — Free Typing Speed Test with Keyboard | Cyberussell",
  description: "Practice typing with a full interactive keyboard. Track your WPM, accuracy, and time. Free, no sign-up required.",
  alternates: { canonical: "https://www.cyberussell.com/tools/typing-practice" },
  openGraph: {
    title: "Typing Practice — Free Typing Speed Test | Cyberussell",
    description: "Practice typing with a full interactive keyboard. Track WPM, accuracy, and time. Free.",
    url: "https://www.cyberussell.com/tools/typing-practice",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Practice — Free Typing Speed Test | Cyberussell",
    description: "Practice typing with a full interactive keyboard. Track WPM, accuracy, and time.",
  },
};

export default function TypingPracticePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] animate-pulse" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Free Tool
            </span>
          </div>
          <h1 className="font-sans text-[30px] md:text-[44px] font-bold text-white mb-3">
            Typing Practice
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/45 max-w-md mx-auto">
            Build speed and accuracy. Keys light up as you type. Track your WPM in real time.
          </p>
        </div>

        {/* Desktop only */}
        <div className="hidden md:block">
          <TypingPractice />
        </div>

        {/* Mobile notice */}
        <div className="md:hidden flex flex-col items-center justify-center text-center px-6 py-20 gap-5">
          <div className="text-5xl">⌨️</div>
          <h2 className="font-sans text-[24px] font-bold text-white">Open this on a desktop</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 max-w-xs leading-[1.8]">
            Typing Practice requires a physical keyboard and is best experienced on a laptop or desktop computer.
          </p>
          <a
            href="/tools"
            className="inline-block mt-2 bg-[#FFD23F] text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[14px] px-6 py-3 rounded-xl hover:bg-[#FFD23F]/90 transition-all"
          >
            Browse Other Tools
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
