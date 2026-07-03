import { Globe, AppWindow, Zap, Smartphone, Shield, Brain, type LucideIcon } from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Globe,
  AppWindow,
  Zap,
  Smartphone,
  Shield,
  Brain,
};

export function getServiceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Globe;
}
