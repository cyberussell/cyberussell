import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Cyberussell",
  description: "Russell's story — from Isabela, Cagayan Valley, to building Cyberussell for Filipinos who want to earn online.",
  openGraph: {
    title: "About Cyberussell — Built by a Filipino, for Filipinos",
    description: "Russell's story — from Isabela, Cagayan Valley, to building Cyberussell for Filipinos who want to earn online.",
    url: "https://www.cyberussell.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">

        {/* Badge */}
        <div className="inline-block bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
            About
          </span>
        </div>

        <h1 className="font-sans text-[30px] md:text-[42px] font-bold text-white leading-tight mb-6">
          I spent 7 years figuring this out so you don&apos;t have to.
        </h1>

        <div className="flex flex-col gap-6 font-[family-name:var(--font-inter)] text-[16px] text-white/65 leading-[1.9]">
          <p>
            My name is <strong className="text-white">Russell Parayno</strong>. I&apos;m from <strong className="text-white">Isabela, Cagayan Valley</strong> — the province. Not Manila. Not a tech hub. A place where most people don&apos;t know that earning online is even possible, let alone realistic.
          </p>

          <p>
            I started trying to earn online years ago. I made every mistake you can imagine. I fell for schemes that promised fast money. I worked on the wrong platforms. I undercharged because I didn&apos;t know what my skills were worth. I gave up and came back more times than I can count.
          </p>

          <div className="bg-[#18181F] border-l-2 border-[#FFD23F] pl-6 py-4 rounded-r-xl">
            <p className="text-white/80 italic">
              &ldquo;7 years of mistakes. Slow progress. A lot of wasted time on the wrong things. But eventually — it worked.&rdquo;
            </p>
          </div>

          <p>
            When I finally started earning consistently online, I realized the biggest problem wasn&apos;t skill. It wasn&apos;t even platform access. The problem was <strong className="text-white">information</strong>. Most guides are written for Americans, or for people in Metro Manila with fast internet and a degree. Nobody was writing practical, honest, research-backed guides specifically for Filipinos from the province.
          </p>

          <p>
            So I built Cyberussell.
          </p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-3">
            <p className="font-sans text-[16px] font-bold text-white">What Cyberussell is:</p>
            {[
              "Free guides backed by real data — not guesses or hype",
              "Tools like the Skill Finder that actually work for Filipinos",
              "Honest information about platforms, rates, and what to expect",
              "Built for people from the province, with slow internet and real constraints",
              "No paywalls. No required email. No catch.",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <span className="text-[#00C97A] mt-1 shrink-0">✓</span>
                <span className="text-white/65 text-[15px]">{item}</span>
              </div>
            ))}
          </div>

          <p>
            I&apos;m still learning. I&apos;m still building. But everything I put on this site is something I wish I had when I was starting out — sitting in Isabela, wondering if online work was even real, or just something that happened to other people.
          </p>

          <p>
            It&apos;s real. And it&apos;s for you too.
          </p>

          <p className="text-white font-bold">
            — Russell
          </p>
        </div>

        {/* Social */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="https://www.tiktok.com/@cyberussell" target="_blank" rel="noopener noreferrer"
            className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition-all">
            TikTok @cyberussell
          </a>
          <a href="https://www.facebook.com/cyberussellofficial" target="_blank" rel="noopener noreferrer"
            className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition-all">
            Facebook @cyberussellofficial
          </a>
          <a href="https://www.youtube.com/@CyberRussell" target="_blank" rel="noopener noreferrer"
            className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition-all">
            YouTube @CyberRussell
          </a>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-[#18181F] border border-white/[0.08] rounded-2xl p-6 text-center">
          <p className="font-sans text-[18px] font-bold text-white mb-2">Ready to find your income path?</p>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-5">
            Use the free Skill Finder — type any skill and get your personalized income plan.
          </p>
          <a href="/#skill-finder"
            className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all">
            Try the Skill Finder →
          </a>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors">
            ← Back to cyberussell.com
          </a>
        </div>

      </div>
    </main>
  );
}
