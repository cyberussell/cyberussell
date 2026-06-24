import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Where to Find Online Work as a Filipino — Cyberussell",
  description:
    "Honest reviews of the best platforms for Filipino freelancers — which ones work, how much they pay, and how to get started.",
};

type Difficulty = "Easy" | "Medium" | "Hard";
type FilipinoFriendly = "Yes" | "Partial" | "No";

type Platform = {
  name: string;
  emoji: string;
  bestFor: string;
  earning: string;
  ease: Difficulty;
  filipinoFriendly: FilipinoFriendly;
  take: string;
  url: string;
};

const PLATFORMS: Platform[] = [
  {
    name: "OnlineJobs.ph",
    emoji: "🇵🇭",
    bestFor: "Virtual assistants, data entry, customer service, writers",
    earning: "₱15,000–₱60,000/month",
    ease: "Easy",
    filipinoFriendly: "Yes",
    take: "The most Filipino-friendly job board online — employers here are specifically looking for Filipinos. No bidding, no competition with the world. You apply directly and get hired. Best first platform for beginners.",
    url: "https://www.onlinejobs.ph",
  },
  {
    name: "Upwork",
    emoji: "💼",
    bestFor: "Developers, designers, writers, marketers, VAs",
    earning: "₱20,000–₱150,000/month",
    ease: "Hard",
    filipinoFriendly: "Partial",
    take: "The largest freelance marketplace in the world — but competitive. You need a strong profile, portfolio, and patience to land the first client. Once you have reviews, it compounds. High earning ceiling.",
    url: "https://www.upwork.com",
  },
  {
    name: "Fiverr",
    emoji: "🟢",
    bestFor: "Graphic designers, video editors, voice artists, writers",
    earning: "₱3,000–₱80,000/month",
    ease: "Medium",
    filipinoFriendly: "Partial",
    take: "You create a gig and buyers come to you. Good for creative skills like design, video editing, and writing. Takes 1–3 months to get your first order, but passive once you rank. Works well from the province.",
    url: "https://www.fiverr.com",
  },
  {
    name: "Preply / iTalki",
    emoji: "📚",
    bestFor: "English teachers, tutors, language coaches",
    earning: "₱20,000–₱80,000/month",
    ease: "Medium",
    filipinoFriendly: "Yes",
    take: "Filipinos are globally recognized as excellent English teachers. Both platforms let you set your own rate and schedule. Preply pays better per hour. iTalki has more students. You can teach from any province.",
    url: "https://www.preply.com",
  },
  {
    name: "Shopee Affiliate",
    emoji: "🛍️",
    bestFor: "Content creators, Facebook page owners, bloggers",
    earning: "₱2,000–₱30,000/month",
    ease: "Easy",
    filipinoFriendly: "Yes",
    take: "Share product links and earn commission for every sale. Free to join, no capital needed. Works well if you have a Facebook page or TikTok account with followers. Commission is 3–10% depending on category.",
    url: "https://affiliate.shopee.ph",
  },
  {
    name: "TikTok Shop Affiliate",
    emoji: "🎵",
    bestFor: "Content creators, online sellers, product reviewers",
    earning: "₱3,000–₱50,000/month",
    ease: "Easy",
    filipinoFriendly: "Yes",
    take: "The fastest-growing affiliate platform in the Philippines right now. Post videos featuring products and earn 3–15% commission. No upfront cost. Works even with a small account if your videos perform well.",
    url: "https://affiliate.tiktok.com",
  },
  {
    name: "Ecomobi",
    emoji: "📱",
    bestFor: "Affiliate marketers, social media users",
    earning: "₱5,000–₱40,000/month",
    ease: "Easy",
    filipinoFriendly: "Yes",
    take: "A Southeast Asian affiliate network that is very active in the Philippines. Offers campaigns from brands like Lazada, Shopee, and food delivery apps. Payouts via GCash. Good for beginners who want to start with affiliates.",
    url: "https://ecomobi.com",
  },
  {
    name: "Contra",
    emoji: "⚡",
    bestFor: "Designers, developers, marketers, writers",
    earning: "₱20,000–₱100,000/month",
    ease: "Medium",
    filipinoFriendly: "Partial",
    take: "A newer freelance platform with zero commission fees — you keep 100% of what you earn. Less competitive than Upwork but smaller client pool. Best for experienced freelancers who want to avoid platform fees.",
    url: "https://contra.com",
  },
  {
    name: "Facebook Marketplace",
    emoji: "📘",
    bestFor: "Resellers, ukay-ukay, homemade products, local services",
    earning: "₱5,000–₱50,000/month",
    ease: "Easy",
    filipinoFriendly: "Yes",
    take: "The most underrated platform in the Philippines. Almost every Filipino uses Facebook. You can sell physical products, offer services, or post your skills — all for free. Best starting point if you have something to sell.",
    url: "https://www.facebook.com/marketplace",
  },
  {
    name: "Kumu",
    emoji: "🎙️",
    bestFor: "Entertainers, hosts, musicians, gamers, storytellers",
    earning: "₱3,000–₱80,000/month",
    ease: "Easy",
    filipinoFriendly: "Yes",
    take: "The Filipino live streaming app where viewers send virtual gifts you can convert to cash. Kumu is built specifically for Filipinos and pays out via GCash. No tech skill needed — just personality and consistency.",
    url: "https://www.kumu.ph",
  },
];

const EASE_COLOR: Record<Difficulty, string> = {
  Easy: "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20",
  Medium: "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20",
  Hard: "text-[#E8373A] bg-[#E8373A]/10 border-[#E8373A]/20",
};

const FF_COLOR: Record<FilipinoFriendly, string> = {
  Yes: "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20",
  Partial: "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20",
  No: "text-[#E8373A] bg-[#E8373A]/10 border-[#E8373A]/20",
};

export default function PlatformsPage() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Find Work
            </span>
          </div>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white mb-4 leading-tight">
            Where to Find Online Work as a Filipino
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 max-w-[600px] leading-[1.8]">
            Honest reviews of the best platforms for Filipino freelancers — which ones work, how much they pay, and how to get started on each one.
          </p>
        </div>

        {/* Platform cards */}
        <div className="flex flex-col gap-5">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 md:p-8 hover:border-white/25 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[28px]">{p.emoji}</span>
                <h2 className="font-sans text-[20px] font-bold text-white">{p.name}</h2>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="bg-[#222230] rounded-lg p-3">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[1px] mb-1">Best for</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/80 leading-[1.5]">{p.bestFor}</p>
                </div>
                <div className="bg-[#222230] rounded-lg p-3">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[1px] mb-1">Earning range</p>
                  <p className="font-sans text-[14px] font-bold text-[#00C97A]">{p.earning}</p>
                </div>
                <div className="bg-[#222230] rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[1px]">Entry</p>
                    <span className={`font-[family-name:var(--font-inter)] text-[11px] font-bold px-2 py-0.5 rounded-full border ${EASE_COLOR[p.ease]}`}>
                      {p.ease}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[1px]">PH-friendly</p>
                    <span className={`font-[family-name:var(--font-inter)] text-[11px] font-bold px-2 py-0.5 rounded-full border ${FF_COLOR[p.filipinoFriendly]}`}>
                      {p.filipinoFriendly}
                    </span>
                  </div>
                </div>
              </div>

              {/* Honest take */}
              <div className="mb-4" style={{ borderLeft: "3px solid rgba(232,55,58,0.4)", paddingLeft: "14px" }}>
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[1px] mb-1">Our honest take</p>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.8]">{p.take}</p>
              </div>

              {/* Link */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#FFD23F] hover:text-white transition-colors"
              >
                Go to {p.name} →
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 md:p-8 text-center">
          <h3 className="font-sans text-[20px] font-bold text-white mb-2">Not sure which platform to start with?</h3>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 mb-5 leading-[1.8]">
            Use the Skill Finder on the homepage — it will match your skill to the right platform and give you a first step.
          </p>
          <a
            href="/#skill-finder"
            className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all"
          >
            Find My Platform →
          </a>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors">
            ← Back to cyberussell.com
          </a>
        </div>
      </div>
    </main>
    </>
  );
}
