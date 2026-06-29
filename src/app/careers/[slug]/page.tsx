import { notFound } from "next/navigation";
import { getCareer, getAllCareers } from "@/lib/careers/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerHero from "@/components/career/CareerHero";
import CareerSummary from "@/components/career/CareerSummary";
import CareerRoadmap from "@/components/career/CareerRoadmap";
import CareerIncomePaths from "@/components/career/CareerIncomePaths";
import CareerPlatforms from "@/components/career/CareerPlatforms";
import CareerTools from "@/components/career/CareerTools";
import CareerFAQ from "@/components/career/CareerFAQ";
import CareerCTA from "@/components/career/CareerCTA";
import CareerMission from "@/components/career/CareerMission";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCareers().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) return {};
  return {
    title: `How to Earn from ${career.skill} Online — Cyberussell`,
    description: career.tagline,
  };
}

export default async function CareerPage({ params }: Props) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  return (
    <>
      <Navbar />
      <CareerHero career={career} />
      <CareerMission mission={career.todays_mission} />
      <CareerSummary summary={career.summary} />
      <CareerRoadmap roadmap={career.roadmap} />
      <CareerIncomePaths paths={career.income_paths} />
      <CareerPlatforms platforms={career.platforms} />
      <CareerTools tools={career.tools} />
      <CareerFAQ faq={career.faq} />
      <CareerCTA skill={career.skill} mission={career.todays_mission} />
      <Footer />
    </>
  );
}
