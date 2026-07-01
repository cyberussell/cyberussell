"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Globe, Zap, Brain, AppWindow, Blocks, Search,
  PenTool, FileText, BarChart2, Shield, GraduationCap,
  CheckCircle2, ArrowRight, ChevronRight, ChevronDown,
} from "lucide-react";

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
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
    body: "",
    benefits: ["AI assistants", "Business automation", "Faster workflows", "Better productivity", "Reduced manual work"],
    cta: "Automate My Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Clean workspace with multiple monitors showing workflow dashboards",
  },
  {
    id: "prompt-engineering",
    icon: Brain,
    color: "#A78BFA",
    headline: "Make AI Work Like Your Best Employee",
    intro: "AI is only as effective as the instructions it receives. I'll build custom prompts, reusable workflows, and AI systems that consistently deliver high-quality results for your business.",
    body: "",
    benefits: ["Custom prompt libraries", "AI knowledge systems", "Team productivity", "Consistent AI output"],
    cta: "Build My AI System",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    imageAlt: "Person typing on a laptop in a bright home office with coffee and notebooks",
  },
  {
    id: "web-app",
    icon: AppWindow,
    color: "#F472B6",
    headline: "Replace Manual Processes with Custom Business Software",
    intro: "If spreadsheets and disconnected tools are slowing your business down, I can build a custom web application designed around your workflow.",
    body: "",
    benefits: ["Client portals", "Dashboards", "Booking systems", "CRM", "Business tools"],
    cta: "Build My System",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "Business dashboard on a large monitor in a modern office environment",
  },
  {
    id: "bubble",
    icon: Blocks,
    color: "#FB923C",
    headline: "Launch Your Business Idea Faster",
    intro: "Whether you're building an MVP or improving an existing Bubble application, I can help you move from idea to launch without the long timelines of traditional software development.",
    body: "",
    benefits: ["MVPs", "SaaS", "Workflow optimization", "Bug fixes", "New features"],
    cta: "Start My Project",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    imageAlt: "Entrepreneur reviewing wireframes and app designs on tablet and laptop",
  },
  {
    id: "seo",
    icon: Search,
    color: "#2DD4BF",
    headline: "Help Customers Find Your Business on Google",
    intro: "Having a beautiful website isn't enough. Your customers need to find you first. I optimize websites to improve search visibility and attract more qualified visitors.",
    body: "",
    benefits: ["Technical SEO", "Keyword research", "On-page optimization", "Google Search Console", "SEO audits"],
    cta: "Improve My Rankings",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    imageAlt: "Analytics dashboard showing growth in search traffic on a laptop screen",
  },
  {
    id: "content",
    icon: PenTool,
    color: "#F59E0B",
    headline: "Create More Content in Less Time",
    intro: "Stay active online without spending countless hours creating content. I use AI responsibly to help businesses produce high-quality content that builds trust and attracts customers.",
    body: "",
    benefits: ["Blog articles", "Website copy", "Educational content", "AI-assisted writing"],
    cta: "Create My Content",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    imageAlt: "Writer working on content at a bright wooden desk with plants and natural light",
  },
  {
    id: "documentation",
    icon: FileText,
    color: "#818CF8",
    headline: "Organize Your Business for Growth",
    intro: "Well-documented businesses are easier to manage, train, and scale. I'll create professional documentation that helps your team work consistently.",
    body: "",
    benefits: ["SOPs", "User manuals", "Documentation", "Knowledge bases"],
    cta: "Document My Business",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
    imageAlt: "Organized workspace with notebooks, documents, and a clean monitor setup",
  },
  {
    id: "research",
    icon: BarChart2,
    color: "#E879F9",
    headline: "Make Better Business Decisions",
    intro: "Need reliable information before making an important decision? I provide structured research and analysis that helps reduce guesswork.",
    body: "",
    benefits: ["Market research", "Competitor analysis", "Industry reports", "AI-assisted research"],
    cta: "Start My Research",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Research and data analysis on laptop with charts and reports visible",
  },
  {
    id: "maintenance",
    icon: Shield,
    color: "#4ADE80",
    headline: "Keep Your Website Secure and Performing at Its Best",
    intro: "A successful website requires ongoing maintenance. I'll keep your website updated, optimized, and running smoothly.",
    body: "",
    benefits: ["Updates", "Bug fixes", "Performance improvements", "SEO maintenance"],
    cta: "Maintain My Website",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    imageAlt: "Developer maintaining and monitoring a website on dual monitors",
  },
  {
    id: "training",
    icon: GraduationCap,
    color: "#FCD34D",
    headline: "Equip Your Team with Practical AI Skills",
    intro: "Help your team work smarter by learning how to use AI effectively in their everyday tasks through practical, hands-on workshops.",
    body: "",
    benefits: ["ChatGPT", "Claude", "Prompt Engineering", "AI Productivity"],
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
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-2"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 shrink-0 rounded-xl bg-[#FFD23F]/10 flex items-center justify-center">
          <Icon size={15} className="text-[#FFD23F]" strokeWidth={1.8} />
        </div>
        <h3 className="font-sans text-[15px] font-bold text-white">{item.title}</h3>
      </div>
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
      id={service.id}
      className="bg-[#111118] border border-white/[0.06] rounded-[20px] overflow-hidden scroll-mt-24"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        {/* Minimalist icon panel — hidden on mobile */}
        <div
          className="hidden md:flex lg:w-[36%] shrink-0 relative overflow-hidden lg:min-h-[300px] items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${service.color}12 0%, ${service.color}04 100%)` }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${service.color}30 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}28` }}
            >
              <Icon size={34} style={{ color: service.color }} strokeWidth={1.4} />
            </div>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isEven
                ? "linear-gradient(to right, transparent 55%, #111118)"
                : "linear-gradient(to left, transparent 55%, #111118)",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
          {/* Inline icon + headline for mobile */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="md:hidden w-9 h-9 shrink-0 rounded-xl flex items-center justify-center mt-0.5"
              style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}28` }}
            >
              <Icon size={18} style={{ color: service.color }} strokeWidth={1.6} />
            </div>
            <h2 className="font-sans text-[20px] md:text-[26px] font-bold text-white leading-tight">
              {service.headline}
            </h2>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.8] mb-5 md:mt-0 mt-1">
            {service.intro}
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
            href={`/services/inquire?service=${encodeURIComponent(
              service.id === "web-dev" ? "Web Design" :
              service.id === "ai-automation" ? "AI Automation" :
              service.id === "prompt-engineering" ? "Prompt Engineering" :
              service.id === "web-app" ? "Web Apps" :
              service.id === "bubble" ? "Bubble.io Development" :
              service.id === "seo" ? "SEO" :
              service.id === "content" ? "Content Creation" :
              service.id === "documentation" ? "Business Documentation" :
              service.id === "research" ? "Research & Analysis" :
              service.id === "maintenance" ? "Website Maintenance" :
              "AI Training"
            )}`}
            className="inline-flex items-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 text-[#0A0A14] font-[family-name:var(--font-inter)] text-[14px] font-bold px-5 py-3 rounded-xl transition-all w-fit"
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
        <section className="relative flex flex-col overflow-hidden min-h-[680px] md:min-h-0">
          {/* Background photo — desktop */}
          <div className="hidden md:block absolute inset-0 z-0 min-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/russell-hero.jpg"
              alt="Russell Parayno — AI, Automation & Web Services"
              className="w-full h-full object-cover object-[30%_60%] [transform:scaleX(-1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/95 via-[#0A0A14]/80 to-[#0A0A14]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-[#0A0A14]/40" />
          </div>

          {/* Background photo — mobile (portrait, flipped so face is on right) */}
          <div className="md:hidden absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/russell-hero-mobile.jpg"
              alt="Russell Parayno — AI, Automation & Web Services"
              className="w-full h-full object-cover object-top"
            />
            {/* Heavy left gradient so text is readable, face shows through on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/95 via-[#0A0A14]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent" />
          </div>

          {/* Main content */}
          <div className="relative z-10 px-6 md:px-10 max-w-5xl mx-auto w-full pt-28 pb-12">
            <div className="w-full">
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
                className="font-sans text-[28px] md:text-[58px] lg:text-[66px] font-bold text-white mb-6 leading-[1.1] max-w-[55%] md:max-w-3xl"
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
                className="font-[family-name:var(--font-inter)] text-[13px] md:text-[18px] text-white/55 max-w-[52%] md:max-w-xl leading-[1.8] mb-10"
              >
                Whether you&apos;re launching a new business, improving an existing website, or exploring how AI can streamline your operations, I build practical solutions that save time, attract customers, and help your business grow.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/services/inquire?service=General+Inquiry"
                  className="inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 transition-all text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
                >
                  Let&apos;s Discuss Your Project <ArrowRight size={16} />
                </a>
              </motion.div>
            </div>
          </div>

          {/* ── Services preview strip ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="relative z-10 w-full border-t border-white/[0.08] bg-[#0A0A14]/70 backdrop-blur-md"
          >
            {/* "What I offer" label + scroll cue */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-4 pb-2 max-w-5xl mx-auto">
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2.5px]">
                What I offer
              </span>
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-white/30">
                Scroll to explore
                <ChevronDown size={13} className="animate-bounce" />
              </span>
            </div>

            {/* Pill row — wraps on mobile */}
            <div className="pb-5 pt-1 px-6 md:px-10">
              <div className="flex flex-wrap justify-center gap-2">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all hover:scale-105 shrink-0"
                      style={{
                        borderColor: `${s.color}25`,
                        backgroundColor: `${s.color}08`,
                      }}
                    >
                      <Icon size={13} style={{ color: s.color }} strokeWidth={2} />
                      <span
                        className="font-[family-name:var(--font-inter)] text-[12px] font-medium whitespace-nowrap"
                        style={{ color: s.color }}
                      >
                        {s.id === "web-dev" ? "Web Design" :
                         s.id === "ai-automation" ? "AI Automation" :
                         s.id === "prompt-engineering" ? "Prompt Engineering" :
                         s.id === "web-app" ? "Web Apps" :
                         s.id === "bubble" ? "Bubble.io" :
                         s.id === "seo" ? "SEO" :
                         s.id === "content" ? "Content" :
                         s.id === "documentation" ? "Documentation" :
                         s.id === "research" ? "Research" :
                         s.id === "maintenance" ? "Maintenance" :
                         "AI Training"}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
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
                  href="/services/inquire?service=General+Inquiry"
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
