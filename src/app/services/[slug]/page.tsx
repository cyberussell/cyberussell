import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, getAllServices } from "@/lib/services/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceTechStack from "@/components/services/ServiceTechStack";
import ServiceIdealClients from "@/components/services/ServiceIdealClients";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import RelatedServices from "@/components/services/RelatedServices";
import ServiceCTA from "@/components/services/ServiceCTA";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = `https://www.cyberussell.com/services/${service.slug}`;
  const title = `${service.name} — Cyberussell`;

  return {
    title,
    description: service.tagline,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: service.tagline,
      url,
      siteName: "Cyberussell",
      images: [{ url: "/og/og-services.png", width: 1200, height: 630, alt: `Cyberussell — ${service.name}` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.tagline,
      images: ["/og/og-services.png"],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const allServices = getAllServices();
  const url = `https://www.cyberussell.com/services/${service.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url,
    provider: {
      "@type": "Person",
      name: "Russell Parayno",
      url: "https://www.cyberussell.com",
    },
    areaServed: "PH",
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <ServiceHero service={service} />
        <ServiceOverview service={service} />
        <ServiceDeliverables service={service} />
        <ServiceProcess service={service} />
        <ServiceTechStack service={service} />
        <ServiceIdealClients service={service} />
        <ServiceFAQ service={service} />
        <RelatedServices current={service} all={allServices} />
        <ServiceCTA service={service} />
      </main>
      <Footer />
    </>
  );
}
