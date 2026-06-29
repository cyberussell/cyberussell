import type { Career } from "./types";

import writing from "@/data/careers/writing.json";
import canva from "@/data/careers/canva.json";
import cooking from "@/data/careers/cooking.json";
import videoEditing from "@/data/careers/video-editing.json";
import virtualAssistant from "@/data/careers/virtual-assistant.json";

const ALL_CAREERS = [
  writing,
  canva,
  cooking,
  videoEditing,
  virtualAssistant,
] as unknown as Career[];

const BY_SLUG = new Map(ALL_CAREERS.map((c) => [c.slug, c]));

export function getCareer(slug: string): Career | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getAllCareers(): Career[] {
  return ALL_CAREERS;
}
