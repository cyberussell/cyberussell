"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Globe, Zap, Brain, AppWindow, Blocks, Search,
  PenTool, FileText, BarChart2, Shield, GraduationCap,
  CheckCircle2, ArrowRight, ChevronRight,
} from "lucide-react";

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.07 } }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST = [
  { icon: CheckCircle2, title: "Practical AI Solutions", desc: "No hype. Only solutions that solve real business problems and deliver measurable results." },
  { icon: CheckCircle2, title: "Modern Technology", desc: "Fast, secure, and scalable websites and applications built with current best practices." },
  { icon: CheckCircle2, title: "Business-Focused", desc: "Every solution is designed to save time, improve efficiency, or increase customer engagement." },
  { icon: CheckCircle2, title: "End-to-End Delivery", desc: "From planning and design to launch and ongoing support — I see projects through to completion." },
];

const SERVICES = [
  {
    id: "web-dev",
    icon: Globe,
    color: "#60A5FA",
    headline: "Get a Website That Builds Trust and Wins More Customers",
    intro: "Your website is often the first impression customers have of your business. If it looks outdated, loads slowly, or doesn't clearly explain what you offer, potential customers leave before contacting you.",
    body: "I build modern, mobile-friendly websites designed to showcase your business, build credibility, and encourage visitors to take action.",
    benefits: ["Professional online presence", "Mobile-friendly design", "Fast loading pages", "SEO-ready", "Easy to update", "Designed to generate enquiries"],
    cta: "Let's Build Your Website",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    imageAlt: "Developer working on a modern website at a clean desk with morning light",
  },
  {
    id: "ai-automation",
    icon: Zap,
    color: "#34D399",
    headline: "Save Hours Every Week by Automating Repetitive Work",
    intro: "Stop spending valuable time on repetitive tasks. I design AI-powered workflows that automate everyday business processes, allowing you and your team to focus on higher-value work.",
    body: "From email handling to data entry, report generation to customer follow-ups — if your team does it repeatedly, we can likely automate it.",
    benefits: ["AI assistants for your team", "Business process automation", "Faster workflows", "Better productivity", "Reduced manual work"],
    cta: "Automate My Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Clean workspace with multiple monitors showing workflow dashboards",
  },
  {
    id: "prompt-engineering",
    icon: Brain,
    color: "#A78BFA",
    headline: "Make AI Work Like Your Best Employee",
    intro: "AI is only as effective as the instructions it receives. Most businesses get mediocre results from AI because they rely on generic prompts that produce generic outputs.",
    body: "I'll build custom prompts, reusable workflows, and AI systems that consistently deliver high-quality results tailored specifically to your business.",
    benefits: ["Custom prompt libraries", "AI knowledge systems", "Team productivity tools", "Consistent AI output", "Documented AI workflows"],
    cta: "Build My AI System",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    imageAlt: "Person typing on a laptop in a bright home office with coffee and notebooks",
  },
  {
    id: "web-app",
    icon: AppWindow,
    color: "#F472B6",
    headline: "Replace Manual Processes with Custom Business Software",
    intro: "If spreadsheets and disconnected tools are slowing your business down, it's time for something built around the way you actually work.",
    body: "I build custom web applications designed around your specific workflow — giving your team one place to manage everything efficiently.",
    benefits: ["Client portals", "Dashboards & reporting", "Booking systems", "CRM & pipeline tools", "Custom business tools"],
    cta: "Build My System",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "Business dashboard on a large monitor in a modern office environment",
  },
  {
    id: "bubble",
    icon: Blocks,
    color: "#FB923C",
    headline: "Launch Your Business Idea Faster",
    intro: "Traditional software development is expensive and slow. Bubble.io changes that — allowing us to build fully functional apps in weeks, not months.",
    body: "Whether you're building an MVP or improving an existing Bubble application, I can help you move from idea to launch without long timelines or high costs.",
    benefits: ["MVPs built in weeks", "SaaS applications", "Workflow optimization", "Bug fixes & improvements", "New feature development"],
    cta: "Start My Project",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    imageAlt: "Entrepreneur reviewing wireframes and app designs on tablet and laptop",
  },
  {
    id: "seo",
    icon: Search,
    color: "#2DD4BF",
    headline: "Help Customers Find Your Business on Google",
    intro: "Having a beautiful website isn't enough if nobody can find it. Most of your potential customers start their search on Google — and if your business isn't there, they'll find your competitors instead.",
    body: "I optimize websites to improve search visibility, attract more qualified visitors, and turn organic traffic into real business.",
    benefits: ["Technical SEO audits", "Keyword research", "On-page optimization", "Google Search Console setup", "Ongoing SEO reporting"],
    cta: "Improve My Rankings",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    imageAlt: "Analytics dashboard showing growth in search traffic on a laptop screen",
  },
  {
    id: "content",
    icon: PenTool,
    color: "#F59E0B",
    headline: "Create More Content in Less Time",
    intro: "Staying active online is essential for modern businesses — but creating consistent, high-quality content takes time most business owners don't have.",
    body: "I use AI responsibly to help businesses produce blog articles, website copy, and educational content that builds trust, improves SEO, and attracts customers.",
    benefits: ["SEO blog articles", "Website copywriting", "Educational content", "Social media content", "AI-assisted writing workflows"],
    cta: "Create My Content",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    imageAlt: "Writer working on content at a bright wooden desk with plants and natural light",
  },
  {
    id: "documentation",
    icon: FileText,
    color: "#818CF8",
    headline: "Organize Your Business for Growth",
    intro: "Well-documented businesses are easier to manage, easier to train new team members in, and easier to scale — because everyone knows exactly what to do and how to do it.",
    body: "I'll create professional documentation that helps your team work consistently, onboard faster, and deliver a reliable experience to every customer.",
    benefits: ["Standard Operating Procedures", "User manuals & guides", "Process documentation", "Knowledge bases", "Training materials"],
    cta: "Document My Business",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
    imageAlt: "Organized workspace with notebooks, documents, and a clean monitor setup",
  },
  {
    id: "research",
    icon: BarChart2,
    color: "#E879F9",
    headline: "Make Better Business Decisions",
    intro: "Important business decisions deserve more than a gut feeling. Whether you're entering a new market, evaluating a competitor, or validating a business idea, you need reliable information.",
    body: "I provide structured research and analysis that helps reduce guesswork, giving you a clear picture before you commit time or money.",
    benefits: ["Market research", "Competitor analysis", "Industry reports", "AI-assisted research", "Actionable summaries"],
    cta: "Start My Research",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Research and data analysis on laptop with charts and reports visible",
  },
  {
    id: "maintenance",
    icon: Shield,
    color: "#4ADE80",
    headline: "Keep Your Website Secure and Performing at Its Best",
    intro: "Websites need regular attention to stay fast, secure, and effective. Outdated plugins, broken links, and slow loading speeds cost you customers every single day.",
    body: "I'll keep your website updated, optimized, and running smoothly — so you can focus on your business instead of worrying about your website.",
    benefits: ["Regular updates & patches", "Bug fixes", "Performance improvements", "Security monitoring", "SEO maintenance"],
    cta: "Maintain My Website",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    imageAlt: "Developer maintaining and monitoring a website on dual monitors",
  },
  {
    id: "training",
    icon: GraduationCap,
    color: "#FCD34D",
    headline: "Equip Your Team with Practical AI Skills",
    intro: "AI tools are becoming essential in every industry — but most teams don't know how to use them effectively. Generic tutorials don't teach people how AI applies to their specific role.",
    body: "I design and deliver practical, hands-on workshops that teach your team how to use ChatGPT, Claude, and other AI tools in their everyday work — immediately.",
    benefits: ["ChatGPT & Claude training", "Prompt engineering basics", "AI productivity workflows", "Team workshops", "Custom training materials"],
    cta: "Train My Team",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    imageAlt: "Professional workshop session with team members learning on laptops",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function TrustCard({ item, index }: { item: typeof TRUST[0]; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-3"
    >
      <div className="w-9 h-9 rounded-xl bg-[#FFD23F]/10 flex items-center justify-center">
        <Icon size={17} className="text-[#FFD23F]" strokeWidth={1.8} />
      </div>
      <h3 className="font-sans text-[16px] font-bold text-white">{item.title}</h3>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{item.desc}</p>
    </motion.div>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      custom={0}
      className="bg-[#111118] border border-white/[0.06] rounded-[20px] overflow-hidden"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        {/* Image */}
        <div className="lg:w-[45%] shrink-0 relative overflow-hidden min-h-[240px] lg:min-h-[380px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.imageAlt}
            className="w-full h-full object-cover absolute inset-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111118]/60 via-transparent to-transparent" style={{ background: isEven ? undefined : "linear-gradient(to left, #111118 0%, transparent 60%)" }} />
        </div>

        {/* Content */}
        <div className="flex-1 p-7 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${service.color}15` }}>
              <Icon size={18} style={{ color: service.color }} strokeWidth={1.8} />
            </div>
          </div>

          <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white mb-3 leading-tight">
            {service.headline}
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.8] mb-2">
            {service.intro}
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.8] mb-5">
            {service.body}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {service.benefits.map((b) => (
              <span
                key={b}
                className="font-[family-name:var(--font-inter)] text-[12px] font-medium px-3 py-1 rounded-full border"
                style={{ color: service.color, borderColor: `${service.color}30`, backgroundColor: `${service.color}08` }}
              >
                {b}
              </span>
            ))}
          </div>

          <a
            href="mailto:russell@cyberussell.com"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold px-5 py-3 rounded-xl transition-all w-fit"
            style={{ backgroundColor: `${service.color}18`, color: service.color, border: `1px solid ${service.color}30` }}
          >
            {service.cta} <ChevronRight size={15} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A14]">

        {/* ── Hero ── */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=85"
              alt="Modern home office workspace with natural light"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14] via-[#0A0A14]/85 to-[#0A0A14]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-[#0A0A14]/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 md:px-10 max-w-5xl mx-auto w-full pt-24 pb-20">
            <motion.div variants={fadeIn} initial="hidden" animate="show" custom={0}>
              <span className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/25 rounded-full px-4 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] animate-pulse" />
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px]">
                  Services
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-sans text-[38px] md:text-[58px] lg:text-[66px] font-bold text-white mb-6 leading-[1.1] max-w-3xl"
            >
              Helping Businesses Grow Through{" "}
              <span className="text-[#FFD23F]">AI, Automation</span>{" "}
              &amp; Modern Websites
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/55 max-w-xl leading-[1.8] mb-10"
            >
              Whether you&apos;re launching a new business, improving an existing website, or exploring how AI can streamline your operations, I build practical solutions that save time, attract customers, and help your business grow.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:russell@cyberussell.com"
                className="inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 transition-all text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
              >
                Let&apos;s Discuss Your Project <ArrowRight size={16} />
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
              >
                View My Work
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Trust ── */}
        <section className="px-6 md:px-10 py-20 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-3">
              Why Businesses Work With Me
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 max-w-lg mx-auto">
              Straightforward. Business-focused. Delivered.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST.map((item, i) => <TrustCard key={item.title} item={item} index={i} />)}
          </div>
        </section>

        {/* ── Services ── */}
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[3px]">What I Offer</span>
            <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-white mt-2">
              Services Designed to Grow Your Business
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-6 md:px-10 pb-24 max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-[24px] overflow-hidden"
          >
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                alt="Two professionals collaborating in a bright modern office"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/95 via-[#0A0A14]/80 to-[#0A0A14]/60" />
            </div>
            <div className="relative z-10 px-8 md:px-14 py-16 md:py-20">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[3px] mb-4 block">
                Ready to Start?
              </span>
              <h2 className="font-sans text-[30px] md:text-[44px] font-bold text-white mb-4 leading-tight max-w-xl">
                Let&apos;s Build Something Great Together
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 max-w-lg leading-[1.8] mb-8">
                Whether you need a website, AI automation, SEO, or a custom business solution, I&apos;d love to hear about your project. Let&apos;s talk about what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:russell@cyberussell.com"
                  className="inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 transition-all text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
                >
                  Request a Free Consultation <ArrowRight size={16} />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
                >
                  View Cyberussell
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
