import type { PortfolioProject } from "./types";

import cyberussell from "@/data/portfolio/cyberussell.json";
import hireworkers from "@/data/portfolio/hireworkers.json";
import appointmentSystem from "@/data/portfolio/appointment-system.json";
import laundryManagementSystem from "@/data/portfolio/laundry-management-system.json";
import territoryManagementSystem from "@/data/portfolio/territory-management-system.json";
import academy from "@/data/portfolio/academy.json";

const ALL_PROJECTS = [academy, appointmentSystem, hireworkers, cyberussell, territoryManagementSystem, laundryManagementSystem] as unknown as PortfolioProject[];

const BY_SLUG = new Map(ALL_PROJECTS.map((p) => [p.slug, p]));

export function getProject(slug: string): PortfolioProject | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getAllProjects(): PortfolioProject[] {
  return ALL_PROJECTS;
}
