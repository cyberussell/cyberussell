import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BioGenerator from "@/components/BioGenerator";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("bio-generator")!;

export const metadata: Metadata = {
  title: "Bio Generator — AI Freelancer Profile Writer | Cyberussell",
  description:
    "Paste your skills and experience. AI generates a professional freelancer bio optimized for Upwork, OnlineJobs.ph, Fiverr, or LinkedIn. Free. Instant.",
  alternates: { canonical: "https://www.cyberussell.com/tools/bio-generator" },
  openGraph: {
    title: "Bio Generator — AI Freelancer Profile Writer",
    description:
      "Paste your skills. Get a ready-to-use freelancer bio optimized for your platform — free.",
    url: "https://www.cyberussell.com/tools/bio-generator",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-bio-generator.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bio Generator — AI Freelancer Profile Writer",
    description:
      "Paste your skills. Get a ready-to-use freelancer bio optimized for your platform — free.",
    images: ["/og/og-bio-generator.jpg"],
  },
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "List your skills",
    desc: "Paste what you know, tools you've used, and any past work — grammar doesn't matter, the AI cleans it up.",
  },
  {
    step: "2",
    title: "Pick your platform and tone",
    desc: "Upwork, OnlineJobs.ph, Fiverr, or LinkedIn each expect a different format. Choose professional, friendly, or bold.",
  },
  {
    step: "3",
    title: "Get a ready-to-use bio",
    desc: "A profile headline, a full bio, suggested keywords for your platform's search, and tips to make it stronger.",
  },
];

const BIO_TIPS = [
  { name: "Lead with your specialty, not “hardworking”", desc: "“Virtual Assistant specializing in e-commerce support” beats “I am a hardworking and dedicated worker” every time." },
  { name: "Use numbers if you have them", desc: "“Managed 3 client Facebook pages” or “50+ WPM typing speed” gives clients something concrete to trust." },
  { name: "Match keywords to the platform's search", desc: "Clients search by skill name — “Canva,” “data entry,” “CapCut” — so use the exact terms clients are likely to type." },
  { name: "End with a clear next step", desc: "Tell the client what to do — message you, check your portfolio, or book a call." },
];

export default function BioGeneratorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: "Bio Generator", item: "https://www.cyberussell.com/tools/bio-generator" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="bg-[#0F0F1A] px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto">
        <div className="max-w-[760px] mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/25 px-3 py-1 rounded-full mb-4 font-[family-name:var(--font-inter)]">
            Free Tool
          </div>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight mb-3">
            Bio Generator —{" "}
            <span className="text-[#FFD23F]">AI Freelancer Profile Writer</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">
            Hindi mo kailangang mag-isip kung paano isulat ang profile mo.
            I-paste lang ang skills mo at gagawa ang AI ng professional na bio —
            optimized para sa platform na gusto mo.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#E8373A]/10 border border-[#E8373A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              AI-powered writing
            </span>
            <span className="bg-[#FFD23F]/10 border border-[#FFD23F]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Upwork · OJP · Fiverr · LinkedIn
            </span>
            <span className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Free — 10 bios per day
            </span>
          </div>
        </div>
        <BioGenerator />

        {/* How It Works */}
        <div className="max-w-[760px] mx-auto mt-16">
          <h2 className="font-sans text-[22px] font-bold text-white mb-6">How the Bio Generator Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5">
                <div className="text-[#FFD23F] font-sans text-[13px] font-bold mb-2">Step {s.step}</div>
                <h3 className="font-sans text-[15px] font-bold text-white mb-2">{s.title}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Makes a Strong Bio */}
        <div className="max-w-[760px] mx-auto mt-14">
          <h2 className="font-sans text-[22px] font-bold text-white mb-4">
            What Makes a Freelancer Bio Actually Convert
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-5">
            Clients skim dozens of profiles before picking one. These are the details the Bio Generator applies
            automatically — worth knowing even if you write your own:
          </p>
          <div className="flex flex-col gap-3">
            {BIO_TIPS.map((t) => (
              <div key={t.name} className="bg-[#18181F] border border-white/[0.08] rounded-lg p-4">
                <h3 className="font-sans text-[14px] font-bold text-white mb-1.5">{t.name}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-[760px] mx-auto mt-14">
          <h2 className="font-sans text-[22px] font-bold text-white mb-5">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {tool.faq.map((item, i) => (
              <div key={i} className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5">
                <h3 className="font-sans text-[15px] font-bold text-white mb-2">{item.question}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
