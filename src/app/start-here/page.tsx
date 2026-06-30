import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Start Here — Begin Your Online Earning Journey | Cyberussell",
  description:
    "Three paths to earning online as a Filipino. Whether you're completely new, already have skills, or ready to earn — find your starting point here.",
  alternates: { canonical: "https://www.cyberussell.com/start-here" },
  openGraph: {
    title: "Start Here | Cyberussell",
    description:
      "Three paths to earning online as a Filipino. Find your starting point.",
    url: "https://www.cyberussell.com/start-here",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
};

const choices = [
  {
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    title: "I'm completely new",
    desc: "Just starting your online earning journey? Discover your best skill path with personalized guidance.",
    cta: "Discover Your Path",
    href: "/skill-finder",
  },
  {
    color: "from-yellow-500 to-yellow-600",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/20",
    title: "I already have skills",
    desc: "You know what you're good at. Learn how to position yourself and find opportunities.",
    cta: "Find Opportunities",
    href: "/guides/8-ways",
  },
  {
    color: "from-green-500 to-green-600",
    textColor: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
    title: "I'm ready to earn",
    desc: "Want to start earning now? Explore proven ways Filipinos are making money online.",
    cta: "Start Earning",
    href: "/earn",
  },
];

export default function StartHerePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        {/* Hero */}
        <section className="px-6 md:px-10 pt-20 pb-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
                Start Here
              </span>
            </div>
            <h1 className="font-sans text-[40px] md:text-[56px] font-bold text-white mb-5 leading-tight">
              Begin Your Online Earning Journey
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/60 max-w-2xl mx-auto leading-[1.8]">
              Choose your path. Whether you're completely new, already have skills, or ready to earn — we'll guide you to the right opportunities.
            </p>
          </div>

          {/* Paths */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {choices.map((choice, i) => (
              <a
                key={i}
                href={choice.href}
                className={`group bg-gradient-to-br ${choice.color} opacity-10 hover:opacity-20 absolute inset-0 rounded-2xl transition-opacity pointer-events-none`}
              />
            ))}

            {choices.map((choice, i) => (
              <a
                key={i}
                href={choice.href}
                className={`relative bg-[#18181F] border ${choice.bgColor} rounded-2xl p-8 hover:border-opacity-100 transition-all group flex flex-col`}
              >
                <div className={`text-[42px] mb-4 opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {i === 0 && "🟦"}
                  {i === 1 && "🟨"}
                  {i === 2 && "🟩"}
                </div>
                <h2 className="font-sans text-[20px] font-bold text-white mb-2 group-hover:text-[#FFD23F] transition-colors">
                  {choice.title}
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6] mb-6 flex-1">
                  {choice.desc}
                </p>
                <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#FFD23F] group-hover:text-white transition-colors">
                  {choice.cta} →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Info section */}
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-8 md:p-12">
            <h2 className="font-sans text-[24px] font-bold text-white mb-6">
              Why Start Here?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-sans text-[16px] font-bold text-white mb-2">
                  No experience needed
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                  We'll help you discover skills you didn't know you had and turn them into income.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-[16px] font-bold text-white mb-2">
                  Research-backed paths
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                  Every recommendation is tested, verified, and tailored for Filipino workers.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-[16px] font-bold text-white mb-2">
                  Real earning potential
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                  Learn realistic timelines, earning ranges, and how to reach your income goal.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
