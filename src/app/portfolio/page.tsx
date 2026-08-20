import Image from "next/image";
import { Globe } from "lucide-react";
import { getAllProjects } from "@/lib/portfolio/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Cyberussell",
  description: "A look at websites and web apps built by Cyberussell — real projects, real results.",
  alternates: { canonical: "https://www.cyberussell.com/portfolio" },
  openGraph: {
    title: "Russell A Parayno — Portfolio",
    description: "A look at websites and web apps built by Cyberussell — real projects, real results.",
    url: "https://www.cyberussell.com/portfolio",
    siteName: "Cyberussell",
    images: [
      {
        url: "/portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Russell A Parayno — Full-Stack Engineer, Tech Lead, Problem Solver",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Russell A Parayno — Portfolio",
    description: "A look at websites and web apps built by Cyberussell — real projects, real results.",
    images: ["/portfolio/og-image.png"],
  },
};

const DEMO_SITES = [
  {
    slug: "ganda-beauty-salon",
    title: "Ganda Beauty Salon",
    tagline: "Editorial-luxury hair & beauty salon concept with appointment booking.",
    url: "/demo/ganda-beauty-salon",
    image: "/demo/ganda-beauty-salon/photos/hero.png",
  },
  {
    slug: "luma-dental",
    title: "Bright Smiles Dental Studio",
    tagline: "Modern dental clinic concept with scroll-driven animation.",
    url: "/demo/luma-dental",
    image: "/portfolio/luma-dental/hero-clinic.jpg",
  },
  {
    slug: "laundryflow",
    title: "Aling Maria Laundry Shop",
    tagline: "Premium laundry pickup & delivery service concept.",
    url: "/demo/laundryflow",
    image: "/demo/laundryflow/photos/hero-laundry.jpg",
  },
];

export default function PortfolioIndex() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] min-h-screen pt-12 md:pt-20 pb-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
            Portfolio
          </span>
          <h1 className="font-sans text-[32px] md:text-[48px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            Websites &amp; apps I&apos;ve built.
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 max-w-[560px] leading-[1.7] mb-12">
            Real projects — the problem, the build, and the result. Want something like this for your business?{" "}
            <a href="/services" className="text-[#FFD23F]/80 hover:text-[#FFD23F] transition-colors">
              See services →
            </a>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group bg-[#18181F] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col hover:border-[#FFD23F]/30 hover:-translate-y-[2px] transition-all duration-200"
              >
                <div className="relative aspect-video bg-gradient-to-br from-[#E8373A]/20 via-[#18181F] to-[#FFD23F]/10 flex items-center justify-center">
                  {project.icon ? (
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 bg-white transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={project.icon}
                        alt={`${project.title} icon`}
                        fill
                        unoptimized={project.icon.endsWith(".svg")}
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>
                  ) : project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      unoptimized={project.coverImage.endsWith(".svg")}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center">
                      <Globe size={28} className="text-white/40" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-sans text-[18px] font-bold text-white group-hover:text-[#FFD23F] transition-colors">
                      {project.title}
                    </h2>
                    <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.05em] text-white/30 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full whitespace-nowrap">
                      {project.category}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.6] flex-grow">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="font-[family-name:var(--font-inter)] text-[10px] text-white/35 bg-white/[0.04] px-2 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-20">
            <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
              Sample &amp; Demo Websites
            </span>
            <h2 className="font-sans text-[24px] md:text-[32px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              Concept builds you can click through.
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 max-w-[560px] leading-[1.7] mb-10">
              Fully built, fictional business websites — a preview of the design quality and polish your own site could have.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {DEMO_SITES.map((demo) => (
                <a
                  key={demo.slug}
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#18181F] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col hover:border-[#FFD23F]/30 hover:-translate-y-[2px] transition-all duration-200"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-[#E8373A]/20 via-[#18181F] to-[#FFD23F]/10">
                    <Image
                      src={demo.image}
                      alt={demo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <h3 className="font-sans text-[17px] font-bold text-white group-hover:text-[#FFD23F] transition-colors">
                      {demo.title}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.6] flex-grow">
                      {demo.tagline}
                    </p>
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#FFD23F]/80 group-hover:text-[#FFD23F] transition-colors">
                      View demo →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
