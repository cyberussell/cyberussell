import { Globe, Bot, Code2, Smartphone, Server, Lightbulb, type LucideIcon } from "lucide-react";

export const MARKETING_ICONS: Record<string, LucideIcon> = {
  Globe,
  Bot,
  Code2,
  Smartphone,
  Server,
  Lightbulb,
};

export function getMarketingIcon(name: string): LucideIcon {
  return MARKETING_ICONS[name] ?? Globe;
}
