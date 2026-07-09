export interface HeroServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export const heroServices: HeroServiceItem[] = [
  {
    id: "website-development",
    title: "Website Design & Development",
    description:
      "Professional, mobile-friendly websites built to win customers — and optimized to actually get found on Google.",
    icon: "Globe",
    href: "/services/website-design-development",
  },
  {
    id: "ai-automation",
    title: "AI Automation Solutions",
    description:
      "AI chatbots, workflow automation, and AI-powered content — so your business runs without you doing the repetitive work.",
    icon: "Bot",
    href: "/services/ai-automation-solutions",
  },
  {
    id: "custom-web-applications",
    title: "Custom Web Applications",
    description:
      "Tailor-made software for your exact workflow — CRMs, booking systems, dashboards, portals, and fast MVPs.",
    icon: "Code2",
    href: "/services/custom-web-applications",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Installable, mobile-first apps for your business — progressive web apps and cross-platform builds, without native app-store overhead.",
    icon: "Smartphone",
    href: "/services/mobile-app-development",
  },
  {
    id: "website-hosting-maintenance",
    title: "Website Hosting & Maintenance",
    description:
      "Monthly website care — updates, backups, monitoring, and security — so your site stays fast, secure, and online.",
    icon: "Server",
    href: "/services/website-hosting-maintenance",
  },
  {
    id: "ai-technology-consulting",
    title: "AI & Technology Consulting",
    description:
      "AI training, market research, and business documentation — the strategy and groundwork before, or alongside, any build.",
    icon: "Lightbulb",
    href: "/services/ai-technology-consulting",
  },
];
