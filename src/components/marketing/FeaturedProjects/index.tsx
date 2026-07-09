import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import cyberussell from "@/data/portfolio/cyberussell.json";
import appointmentSystem from "@/data/portfolio/appointment-system.json";
import hireworkers from "@/data/portfolio/hireworkers.json";

const PROJECTS = [cyberussell, appointmentSystem, hireworkers];

// Cover images specific to this page only — the shared portfolio JSON's
// `coverImage` (used by /portfolio and /portfolio/[slug]) is left untouched.
// Mapped by card position: 1.png = Cyberussell, 2.png = Appointment System,
// 3.png = HireWorkers.work — drop the file into public/build-with-us/ to
// override a card's image; checked on the server so there's no client-side
// flash of a broken image.
const COVER_OVERRIDES: Record<string, string> = {
  cyberussell: "/build-with-us/1.png",
  "appointment-system": "/build-with-us/2.png",
  hireworkers: "/build-with-us/3.png",
};

function resolveCoverImage(slug: string, fallback: string): string {
  const overridePath = COVER_OVERRIDES[slug];
  if (overridePath && fs.existsSync(path.join(process.cwd(), "public", overridePath))) {
    return overridePath;
  }
  return fallback;
}

export default function FeaturedProjects() {
  return (
    <section className="bg-[#0B0E1C] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 block font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] text-[#FF7A1A]">
            Recent Work
          </span>
          <h2 className="mb-4 font-sans text-[28px] font-bold leading-tight tracking-tight text-white md:text-[40px]">
            Featured Projects
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.8] text-white/60 md:text-[17px]">
            A look at what we&apos;ve built — real platforms, real technology.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#FF7A1A]/20 bg-gradient-to-b from-white/[0.06] to-white/[0.015] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#FF7A1A]/50"
              style={{ boxShadow: "0 16px 32px rgba(0,0,0,0.35)" }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111118]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveCoverImage(project.slug, project.coverImage)}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 font-sans text-[19px] font-extrabold leading-tight text-white">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 font-[family-name:var(--font-inter)] text-[14px] leading-[1.6] text-white/60">
                  {project.tagline}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-[family-name:var(--font-inter)] text-[11px] font-semibold text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#FF7A1A] transition-colors duration-300 group-hover:text-[#FFA149]">
                  View Project
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
