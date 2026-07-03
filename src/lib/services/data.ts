import type { Service } from "./types";

import websiteDesignDevelopment from "@/data/services/website-design-development.json";
import customWebApplications from "@/data/services/custom-web-applications.json";
import aiAutomationSolutions from "@/data/services/ai-automation-solutions.json";
import mobileAppDevelopment from "@/data/services/mobile-app-development.json";
import websiteHostingMaintenance from "@/data/services/website-hosting-maintenance.json";
import aiTechnologyConsulting from "@/data/services/ai-technology-consulting.json";

const ALL_SERVICES = [
  websiteDesignDevelopment,
  customWebApplications,
  aiAutomationSolutions,
  mobileAppDevelopment,
  websiteHostingMaintenance,
  aiTechnologyConsulting,
] as unknown as Service[];

const BY_SLUG = new Map(ALL_SERVICES.map((s) => [s.slug, s]));

export function getService(slug: string): Service | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getAllServices(): Service[] {
  return ALL_SERVICES;
}
