import Image from "next/image";
import { getAllProjects, getProject } from "@/lib/portfolio/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Cyberussell Portfolio`,
    description: project.tagline,
    alternates: { canonical: `https://www.cyberussell.com/portfolio/${slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      url: `https://www.cyberussell.com/portfolio/${slug}`,
      type: "website",
      images: [{ url: project.coverImage || "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://www.cyberussell.com/portfolio" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://www.cyberussell.com/portfolio/${slug}` },
    ],
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    creator: { "@type": "Person", name: "Russell", url: "https://www.cyberussell.com/about" },
    dateCreated: project.date,
    url: `https://www.cyberussell.com/portfolio/${slug}`,
  };

  const related = getAllProjects().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border font-[family-name:var(--font-inter)] text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20">
                {project.category}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">{project.client}</span>
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">· {project.timeline}</span>
            </div>

            <h1 className="font-sans text-[26px] md:text-[38px] font-bold text-white leading-tight mb-4">
              {project.title}
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8] mb-6">
              {project.tagline}
            </p>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[14px] py-2.5 px-6 rounded-lg hover:opacity-90 transition-all"
              >
                Visit live site →
              </a>
            )}
          </div>

          {/* Cover */}
          <div className="relative aspect-video bg-gradient-to-br from-[#E8373A]/20 via-[#18181F] to-[#FFD23F]/10 rounded-xl mb-10 overflow-hidden flex items-center justify-center">
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                priority
                sizes="768px"
                className="object-cover"
              />
            ) : (
              <span className="font-sans text-[16px] font-bold text-white/25">{project.title}</span>
            )}
          </div>

          {/* Case study sections */}
          <div className="flex flex-col gap-8">
            <section>
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Overview</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">{project.overview}</p>
            </section>

            <section>
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">The Problem</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">{project.problem}</p>
            </section>

            <section>
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">The Solution</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">{project.solution}</p>
            </section>

            <section>
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Results</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">{project.results}</p>
            </section>

            {project.testimonial && (
              <section className="bg-[#18181F] border border-white/[0.08] rounded-xl p-6">
                <p className="font-sans text-[16px] text-white/85 italic leading-[1.7] mb-4">&ldquo;{project.testimonial.quote}&rdquo;</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45">
                  {project.testimonial.author} — {project.testimonial.role}
                </p>
              </section>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <section>
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Gallery</p>
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.map((img) => (
                    <div key={img} className="relative aspect-video bg-[#18181F] border border-white/[0.08] rounded-lg overflow-hidden">
                      <Image src={img} alt={project.title} fill sizes="(max-width: 768px) 100vw, 336px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
            {project.techStack.map((tech) => (
              <span key={tech} className="font-[family-name:var(--font-inter)] text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 text-center">
            <p className="font-sans text-[18px] font-bold text-white mb-2">Want a site like this?</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 mb-5">Let&apos;s talk about what you need — free consult, no pressure.</p>
            <a href="/services" className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all">
              See services →
            </a>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div className="pt-8 mt-10 border-t border-white/10">
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-5">
                More projects
              </p>
              <div className="flex flex-col gap-4">
                {related.map((r) => (
                  <a key={r.slug} href={`/portfolio/${r.slug}`} className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5 hover:border-white/20 transition-all block">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border font-[family-name:var(--font-inter)] text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20">
                        {r.category}
                      </span>
                    </div>
                    <p className="font-sans text-[16px] font-bold text-white leading-snug">{r.title}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <a href="/portfolio" className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 hover:text-white transition-colors">
              ← All Projects
            </a>
            <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 hover:text-white transition-colors">
              Home →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
