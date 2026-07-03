import type { Career } from "./types";

import writing from "@/data/careers/writing.json";
import canva from "@/data/careers/canva.json";
import cooking from "@/data/careers/cooking.json";
import videoEditing from "@/data/careers/video-editing.json";
import virtualAssistant from "@/data/careers/virtual-assistant.json";
import customerSupport from "@/data/careers/customer-support.json";
import socialMediaManagement from "@/data/careers/social-media-management.json";
import bookkeeping from "@/data/careers/bookkeeping.json";
import leadGeneration from "@/data/careers/lead-generation.json";
import appointmentSetting from "@/data/careers/appointment-setting.json";
import seo from "@/data/careers/seo.json";
import wordpress from "@/data/careers/wordpress.json";
import shopify from "@/data/careers/shopify.json";
import graphicDesign from "@/data/careers/graphic-design.json";
import aiAutomation from "@/data/careers/ai-automation.json";

const ALL_CAREERS = [
  writing,
  canva,
  cooking,
  videoEditing,
  virtualAssistant,
  customerSupport,
  socialMediaManagement,
  bookkeeping,
  leadGeneration,
  appointmentSetting,
  seo,
  wordpress,
  shopify,
  graphicDesign,
  aiAutomation,
] as unknown as Career[];

const BY_SLUG = new Map(ALL_CAREERS.map((c) => [c.slug, c]));

export function getCareer(slug: string): Career | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getAllCareers(): Career[] {
  return ALL_CAREERS;
}
