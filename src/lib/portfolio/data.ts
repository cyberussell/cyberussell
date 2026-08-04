import type { PortfolioProject } from "./types";

import cyberussell from "@/data/portfolio/cyberussell.json";
import brightSmilesDental from "@/data/portfolio/bright-smiles-dental.json";
import hireworkers from "@/data/portfolio/hireworkers.json";
import appointmentSystem from "@/data/portfolio/appointment-system.json";
import laundryManagementSystem from "@/data/portfolio/laundry-management-system.json";
import fastrackLending from "@/data/portfolio/fastrack-lending.json";
import minaPro from "@/data/portfolio/mina-pro.json";

const ALL_PROJECTS = [laundryManagementSystem, appointmentSystem, hireworkers, brightSmilesDental, cyberussell, minaPro, fastrackLending] as unknown as PortfolioProject[];

const BY_SLUG = new Map(ALL_PROJECTS.map((p) => [p.slug, p]));

export function getProject(slug: string): PortfolioProject | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getAllProjects(): PortfolioProject[] {
  return ALL_PROJECTS;
}
