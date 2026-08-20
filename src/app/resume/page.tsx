import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Mail, Phone, MapPin, Download, Palmtree, Globe, GraduationCap } from "lucide-react";
import {
  siNextdotjs, siReact, siTypescript, siNodedotjs, siSupabase,
  siPostgresql, siClaude, siTailwindcss, siVercel, siFirebase, siGithub,
} from "simple-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/portfolio/data";
import { getAllServices } from "@/lib/services/data";
import { getServiceIcon } from "@/components/services/icons";

export const metadata: Metadata = {
  title: "Russell Parayno — Resume | Senior AI Software Engineer",
  description: "Resume of Russell Parayno, Senior AI Software Engineer and Full-Stack Developer (React, Next.js, TypeScript, Supabase) building AI-powered SaaS applications.",
  alternates: { canonical: "https://www.cyberussell.com/resume" },
  openGraph: {
    title: "Russell Parayno — Resume | Senior AI Software Engineer",
    description: "Resume of Russell Parayno, Senior AI Software Engineer and Full-Stack Developer (React, Next.js, TypeScript, Supabase) building AI-powered SaaS applications.",
    url: "https://www.cyberussell.com/resume",
    siteName: "Cyberussell",
    images: [{ url: "/resume/og-image.png", width: 1200, height: 630, alt: "Russell A Parayno — Full-Stack Engineer, Tech Lead, Problem Solver" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Russell Parayno — Resume | Senior AI Software Engineer",
    description: "Resume of Russell Parayno, Senior AI Software Engineer and Full-Stack Developer (React, Next.js, TypeScript, Supabase) building AI-powered SaaS applications.",
    images: ["/resume/og-image.png"],
  },
};

const experience = [
  {
    role: "Senior Full-Stack AI Engineer",
    org: "Independent / Contract",
    date: "March 2022 — Now",
    description:
      "Design, build, and ship multi-tenant SaaS platforms end-to-end — appointment scheduling, laundry and territory management, and AI-powered business applications — using Next.js, React, TypeScript, Node.js, PostgreSQL, and Supabase. Own the full stack: auth, RBAC, payment integrations, analytics dashboards, and production deployments, using AI-assisted development (Claude Code, OpenAI API) to move faster without cutting corners on architecture or security.",
  },
  {
    role: "Freelance Web & Application Developer | Consultant",
    org: "Personal | Private · Self-employed",
    description:
      "Independent web and application developer helping small and medium businesses attain rapid growth through integrated applications across every stage of the business — product planning, manufacturing, sales and distribution, inventory management, shipping and payment, and payroll systems.",
  },
  {
    role: "Analyst",
    org: "Accenture, Inc.",
    description:
      "Functionally trained in SAP Banking Services and SAP Bank Analyzer; worked as an SAP-ABAP developer supporting Financial Accounting (FI), Material Management (MM), and Sales and Distribution (SD). Resolved incident reports and built SAP programs across RICEFW using R/3 client-server ABAP/4.",
  },
  {
    role: "Software Consultant",
    org: "Business Point Lending Investors Corporation",
    description:
      "Performed application analyst and web designer roles — redesigned an in-house loan and accounting system (BP-AIMS), including a database redesign to support growing client data, and trained client counterparts on the platform.",
  },
  {
    role: "Software Developer",
    org: "Buy n Text Corporation",
    description:
      "Built and administered applications for customer service and logistics teams; set up an open-source ticketing system for Billing and Support, and developed a Multi-Level Marketing (MLM) program in VBA/Excel handling 25,000+ members.",
  },
  {
    role: "Tester",
    org: "Global Information Resource Company",
    description:
      "First programming experience — performed a Tester role on a Y2K conversion project under a Mainframe platform, covering scoping and impact analysis, system conversion, program maintenance and coding, testing approach, and documentation.",
  },
];

const softSkills = [
  "Technical leadership & cross-functional collaboration",
  "Translating business requirements into scalable systems",
  "Self-directed, remote project execution",
  "Clear technical communication with non-technical stakeholders",
];

const technicalSkills = [
  "Full-Stack Development",
  "AI-Assisted Engineering",
  "SaaS Architecture",
  "Cloud & DevOps",
];

const stack = [
  { label: "Next.js", icon: siNextdotjs, bg: "#000000" },
  { label: "React", icon: siReact, bg: "#0B1220" },
  { label: "TypeScript", icon: siTypescript, bg: "#0B1220" },
  { label: "Node.js", icon: siNodedotjs, bg: "#0B1220" },
  { label: "Supabase", icon: siSupabase, bg: "#0B1220" },
  { label: "PostgreSQL", icon: siPostgresql, bg: "#0B1220" },
  { label: "Claude Code", icon: siClaude, bg: "#0B1220" },
  { label: "Tailwind CSS", icon: siTailwindcss, bg: "#0B1220" },
  { label: "Vercel", icon: siVercel, bg: "#000000" },
  { label: "Firebase", icon: siFirebase, bg: "#0B1220" },
  { label: "GitHub", icon: siGithub, bg: "#0B1220" },
  { label: "ChatGPT Codex", glyph: "GPT", bg: "#000000" },
];

const portfolioLiveLinks: Record<string, string> = {
  "cyberussell": "https://www.cyberussell.com/",
  "hireworkers": "https://www.hireworkers.work",
  "laundry-management-system": "https://www.cyberussell.com/lms",
  "appointment-system": "https://www.cyberussell.com/appointments",
};

const freelanceTaglines: Record<string, string> = {
  "website-design-development": "I design and build mobile-friendly, SEO-optimized websites that turn visitors into customers — and that Google actually surfaces.",
  "custom-web-applications": "I build custom software around how a business already works — CRMs, booking systems, dashboards, and fast MVPs.",
  "ai-automation-solutions": "I set up AI chatbots and automated workflows that take repetitive busywork off a client's plate.",
  "mobile-app-development": "I ship installable, mobile-first apps — progressive web apps and cross-platform builds — without the native app-store overhead.",
  "website-hosting-maintenance": "I keep client sites fast, secure, and online with ongoing updates, backups, and monitoring.",
  "ai-technology-consulting": "I help teams adopt AI the right way — training, market research, and the documentation to back it up.",
};

export default async function ResumePage() {
  const projects = getAllProjects();
  const services = getAllServices();
  const qrDataUrl = await QRCode.toDataURL("https://www.cyberussell.com/resume", {
    margin: 1,
    width: 400,
    color: { dark: "#FFFFFF", light: "#0A0A10" },
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "Resume", item: "https://www.cyberussell.com/resume" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">

          {/* HERO — poster layout */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0A0A10] mb-8">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 82% 28%, rgba(232,55,58,0.35) 0%, transparent 55%)" }}
            />

            {/* Photo — full-bleed on desktop, fades left into the panel */}
            <div className="hidden md:block absolute inset-y-0 right-0 w-[44%] lg:w-[42%]">
              <Image
                src="/russell-side-shot.png"
                alt="Russell Parayno"
                fill
                sizes="45vw"
                className="object-cover select-none"
                style={{
                  objectPosition: "68% 20%",
                  maskImage: "linear-gradient(to right, transparent 0%, black 32%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 32%)",
                }}
              />
              <svg viewBox="0 0 100 100" className="absolute bottom-8 right-8 w-20 h-20 lg:w-24 lg:h-24 z-10">
                <defs>
                  <path id="rpCirclePathDesktop" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <circle cx="50" cy="50" r="48" fill="#E8373A" />
                <text fill="#FFFFFF" fontSize="6.2" fontWeight="700" letterSpacing="1.5">
                  <textPath href="#rpCirclePathDesktop" startOffset="0%">
                    RUSSELL PARAYNO • FULL-STACK DEVELOPER • 2026 •{" "}
                  </textPath>
                </text>
                <text x="50" y="56" textAnchor="middle" fontSize="18" fontWeight="800" fill="#FFFFFF" fontFamily="var(--font-syne)">
                  RP
                </text>
              </svg>
            </div>

            {/* Vertical edge label — desktop only */}
            <div className="hidden lg:flex absolute top-12 right-8 bottom-40 items-center pointer-events-none z-0">
              <span
                className="text-white/20 text-[10px] font-bold uppercase tracking-[5px] whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}
              >
                Russell Parayno • Full-Stack AI Developer • Code • Build • Ship •
              </span>
            </div>

            {/* Text content */}
            <div className="relative p-8 md:p-14 md:pr-[38%] lg:pr-[40%] pb-10 md:pb-16 text-center md:text-left">
              <h1 className="font-sans font-extrabold uppercase leading-[0.85] tracking-tight">
                <span className="block text-[38px] xs:text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] text-white">Full-Stack</span>
                <span className="block text-[38px] xs:text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] text-[#E8373A]">AI Developer</span>
              </h1>

              <p className="mt-5 font-[family-name:var(--font-inter)] text-[11px] sm:text-[13px] font-bold text-white/45 uppercase tracking-[1.5px] whitespace-nowrap">
                I build &amp; ship AI-powered SaaS platforms that scale.
              </p>

              <div className="mt-6 flex items-center justify-center md:justify-start gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C97A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00C97A]" />
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/60">
                  Available for Projects
                </span>
              </div>
            </div>

            {/* Mobile-only photo, shown below the headline */}
            <div className="relative md:hidden w-full max-w-[280px] mx-auto mb-10">
              <div className="relative aspect-square">
                <Image
                  src="/russell-side-shot.png"
                  alt="Russell Parayno"
                  fill
                  sizes="280px"
                  className="object-cover object-center select-none"
                  style={{
                    maskImage: "radial-gradient(circle at 50% 40%, black 35%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 35%, transparent 75%)",
                  }}
                />
              </div>
              <svg viewBox="0 0 100 100" className="absolute -bottom-3 -right-3 w-20 h-20 z-10">
                <defs>
                  <path id="rpCirclePathMobile" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <circle cx="50" cy="50" r="48" fill="#E8373A" />
                <text fill="#FFFFFF" fontSize="6.2" fontWeight="700" letterSpacing="1.5">
                  <textPath href="#rpCirclePathMobile" startOffset="0%">
                    RUSSELL PARAYNO • FULL-STACK DEVELOPER • 2026 •{" "}
                  </textPath>
                </text>
                <text x="50" y="56" textAnchor="middle" fontSize="18" fontWeight="800" fill="#FFFFFF" fontFamily="var(--font-syne)">
                  RP
                </text>
              </svg>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0A0A10]">

            {/* LEFT COLUMN */}
            <div className="relative bg-gradient-to-b from-[#1a1014] via-[#120b0d] to-[#0A0A10] p-8 md:p-10 flex flex-col gap-10">

              {/* Hello */}
              <div>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 mb-1">Hello,</p>
                <h2 className="font-sans text-[32px] font-bold text-white leading-tight mb-2">
                  I&apos;m <span className="italic text-[#E8373A]">Russell</span>
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
                  You can call me Vonne.
                </p>
              </div>

              {/* About Me */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-4">
                  About Me
                </span>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.8]">
                  AI Software Engineer with 15+ years of experience building production-ready SaaS platforms and AI-powered applications. I use tools like Claude Code to accelerate delivery while staying fully responsible for architecture, security, and code quality.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.8] mt-3">
                  My Civil Engineering background taught me how to solve complex problems. My Software Engineering career taught me how to solve them with technology. Together, they allow me to build scalable, reliable, and business-focused software solutions.
                </p>
              </div>

              {/* Education */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-4">
                  Education
                </span>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white">Mapúa University</p>
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">BS, Civil Engineering</p>
                  </div>
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md">
                    Portfolio
                  </span>
                  <a href="/portfolio" className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/50 hover:text-white transition-colors">
                    View all →
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  {projects.map((project) => {
                    const liveLink = portfolioLiveLinks[project.slug];
                    return (
                    <a
                      key={project.slug}
                      href={liveLink ?? `/portfolio/${project.slug}`}
                      target={liveLink ? "_blank" : undefined}
                      rel={liveLink ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-3"
                    >
                      {project.icon ? (
                        <div className="relative w-7 h-7 rounded-md overflow-hidden shrink-0">
                          <Image
                            src={project.icon}
                            alt={project.title}
                            fill
                            unoptimized={project.icon.endsWith(".svg")}
                            sizes="28px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-md bg-white/[0.06] flex items-center justify-center shrink-0">
                          <Globe size={15} className="text-white/40" strokeWidth={1.8} />
                        </div>
                      )}
                      <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/60 group-hover:text-white leading-tight transition-colors pt-1">
                        {project.title}
                      </span>
                    </a>
                    );
                  })}
                  <a
                    href="https://academy.cyberussell.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#0B1220] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <GraduationCap size={15} className="text-[#3ECF8E]" />
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/60 group-hover:text-white leading-tight transition-colors pt-1">
                      Cyberussell Academy
                    </span>
                  </a>
                  <a
                    href="https://www.hagnayabeachresort.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#0B1220] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <Palmtree size={15} className="text-[#3ECF8E]" />
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/60 group-hover:text-white leading-tight transition-colors pt-1">
                      Hagnaya Beach Resort — Hotel &amp; Resort Management System
                    </span>
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-4">
                  GitHub
                </span>
                <a
                  href="https://github.com/cyberussell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-md bg-[#0B1220] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#FFFFFF">
                      <path d={siGithub.path} />
                    </svg>
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/60 group-hover:text-white leading-tight transition-colors truncate">
                    @cyberussell
                  </span>
                </a>
              </div>

              {/* Contact */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-4">
                  Contact
                </span>
                <div className="flex flex-col gap-3">
                  <a href="tel:+639176260112" className="flex items-center gap-3 group">
                    <Phone size={14} className="text-[#E8373A] shrink-0" />
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 group-hover:text-white transition-colors">+63 917 626 0112</span>
                  </a>
                  <a href="mailto:russell.a.parayno@gmail.com" className="flex items-center gap-3 group">
                    <Mail size={14} className="text-[#E8373A] shrink-0" />
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 group-hover:text-white transition-colors break-all">russell.a.parayno@gmail.com</span>
                  </a>
                  <a href="https://www.linkedin.com/in/russellparayno" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <svg className="w-[14px] h-[14px] text-[#E8373A] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 group-hover:text-white transition-colors">/in/russellparayno</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-[#E8373A] shrink-0" />
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">Isabela, Philippines · GMT+8</span>
                  </div>
                </div>
                <a
                  href="/downloads/russell-parayno-resume.pdf"
                  download
                  className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-[family-name:var(--font-inter)] font-bold text-[12px] py-2.5 px-4 rounded-lg transition-all"
                >
                  <Download size={13} />
                  Download Full Resume
                </a>
              </div>

              {/* Separator */}
              <div className="border-t border-white/[0.08] mt-auto" />

              {/* QR Code */}
              <div className="flex flex-col items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="QR code linking to Russell Parayno's resume at cyberussell.com/resume"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
                <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/40">Scan for live resume</p>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="bg-[#0F0F14] p-8 md:p-10 flex flex-col gap-10">

              {/* Work Experience */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-5">
                  Currently Doing
                </span>
                <div className="flex flex-col gap-4">
                  {experience.map((job, index) => (
                    <Fragment key={job.role + job.org}>
                      {index === 1 && (
                        <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/35 mt-2">
                          Other Work Experiences
                        </p>
                      )}
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                        <div className="flex items-baseline justify-between gap-3 flex-wrap">
                          <h3 className="font-sans text-[16px] font-bold text-white">{job.role}</h3>
                          {job.date && (
                            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 whitespace-nowrap">{job.date}</span>
                          )}
                        </div>
                        <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#E8373A]/80 mt-1">{job.org}</p>
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.8] mt-2">
                          {job.description}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-5">
                  Soft Skills
                </span>
                <ul className="flex flex-col gap-2.5">
                  {softSkills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2.5">
                      <span className="text-[#E8373A] mt-1 shrink-0 text-[9px]">■</span>
                      <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Skills */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-5">
                  Technical Skills
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/80 border border-white/[0.15] px-4 py-2 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Stack */}
              <div>
                <span className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1 rounded-md mb-5">
                  Tools &amp; Stack
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {stack.map((tool) => {
                    const fill = tool.icon && ["000000", "181717"].includes(tool.icon.hex) ? "#FFFFFF" : tool.icon ? `#${tool.icon.hex}` : "#FFFFFF";
                    return (
                      <div key={tool.label} className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.08]"
                          style={{ backgroundColor: tool.bg }}
                        >
                          {tool.icon ? (
                            <svg viewBox="0 0 24 24" className="w-6 h-6" fill={fill}>
                              <path d={tool.icon.path} />
                            </svg>
                          ) : (
                            <span className="font-sans font-extrabold text-[10px] text-white">{tool.glyph}</span>
                          )}
                        </div>
                        <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/40 text-center leading-tight">{tool.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Six Ways I Help Businesses Grow */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[3px]">Freelance Services</span>
              <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-white mt-2">
                Things I&apos;m Doing for Clients as a Freelancer
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => {
                const Icon = getServiceIcon(service.icon);
                return (
                  <div
                    key={service.slug}
                    className="bg-[#111118] border border-white/[0.06] rounded-[20px] p-7 flex flex-col gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}28` }}
                    >
                      <Icon size={22} style={{ color: service.color }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sans text-[18px] font-bold text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">
                        {freelanceTaglines[service.slug] ?? service.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
