import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScamScanner from "@/components/ScamScanner";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("scam-scanner")!;

export const metadata: Metadata = {
  title: "Scam Scanner — AI-Powered Job Scam Detector | Cyberussell",
  description:
    "Paste any job posting or online opportunity. AI analyzes it for scam patterns common in the Philippines. Free. Instant. No sign-up.",
  alternates: { canonical: "https://www.cyberussell.com/tools/scam-scanner" },
  openGraph: {
    title: "Scam Scanner — AI-Powered Job Scam Detector",
    description:
      "Paste any job posting. Get an AI-powered scam analysis with red flags, risk score, and actionable advice — free.",
    url: "https://www.cyberussell.com/tools/scam-scanner",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-scam-scanner.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scam Scanner — AI-Powered Job Scam Detector",
    description:
      "Paste any job posting. Get an AI-powered scam analysis with red flags, risk score, and actionable advice — free.",
    images: ["/og/og-scam-scanner.jpg"],
  },
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Paste the posting",
    desc: "Copy the exact text of the job post, Messenger/Telegram message, or online ad — as-is, no need to clean it up.",
  },
  {
    step: "2",
    title: "AI reads it for patterns",
    desc: "Claude AI checks the text against scam patterns common in the Philippines: unrealistic pay, upfront fees, vague employers, and suspicious payment methods.",
  },
  {
    step: "3",
    title: "Get a risk score and next steps",
    desc: "You get a 0–100 risk score, a plain-language verdict, a breakdown of red/yellow/green flags, and advice on what to do next.",
  },
];

const SCAM_PATTERNS = [
  "Asks for a “registration,” “training,” or “kit” fee before you can start working",
  "Instant hiring with no interview, no resume, and no real screening",
  "Unrealistic pay for unskilled work (e.g. ₱5,000+ per day for liking or subscribing to videos)",
  "Payment only accepted via GCash, Maya, or a personal e-wallet — never a registered business account",
  "Vague or unverifiable company name with no website, address, or online presence",
  "Heavy urgency and pressure — “limited slots,” “today only,” “message now to reserve”",
  "Asks for your ID, bank details, or one-time PIN (OTP) before any job is actually confirmed",
];

export default function ScamScannerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: "Scam Scanner", item: "https://www.cyberussell.com/tools/scam-scanner" },
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
            Scam Scanner —{" "}
            <span className="text-[#FFD23F]">AI-Powered Job Scam Detector</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">
            May nakita kang job posting o &quot;opportunity&quot; online? I-paste dito at
            i-analyze ng AI kung legit o scam. Hindi na kailangan mag-guess —
            makikita mo agad ang red flags.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-[#E8373A]/10 border border-[#E8373A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              AI-powered analysis
            </span>
            <span className="bg-[#FFD23F]/10 border border-[#FFD23F]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Detects PH scam patterns
            </span>
            <span className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
              Free — walang sign-up
            </span>
          </div>
        </div>

        <ScamScanner />

        {/* How It Works */}
        <div className="max-w-[760px] mx-auto mt-16">
          <h2 className="font-sans text-[22px] font-bold text-white mb-6">How the Scam Scanner Works</h2>
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

        {/* Common Scam Patterns */}
        <div className="max-w-[760px] mx-auto mt-14">
          <h2 className="font-sans text-[22px] font-bold text-white mb-4">
            Common Scam Patterns Targeting Filipino Job Seekers
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-5">
            These are the patterns the Scam Scanner checks for most often. If a posting has two or more of these,
            treat it as high risk even before running it through the tool:
          </p>
          <ul className="flex flex-col gap-3">
            {SCAM_PATTERNS.map((p, i) => (
              <li key={i} className="flex items-start gap-3 bg-[#18181F] border border-white/[0.08] rounded-lg p-4">
                <span className="text-[#E8373A] mt-0.5 shrink-0">&#x2716;</span>
                <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Where to Report */}
        <div className="max-w-[760px] mx-auto mt-14">
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[12px] p-6">
            <h2 className="font-sans text-[18px] font-bold text-[#FFD23F] mb-2">
              Where to Report a Suspected Scam
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.8]">
              If you already lost money or shared personal/bank details, report it to the{" "}
              <span className="text-white/85">NBI Cybercrime Division</span> or the{" "}
              <span className="text-white/85">PNP Anti-Cybercrime Group</span>. Save screenshots of the posting,
              the conversation, and any payment proof before you report — that&apos;s the evidence investigators need.
            </p>
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
