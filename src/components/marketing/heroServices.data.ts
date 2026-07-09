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
    description: "Fast, mobile-friendly websites built to win customers and rank on Google.",
    icon: "Globe",
    href: "/services/website-design-development",
  },
  {
    id: "ai-automation",
    title: "AI Automation Solutions",
    description: "AI chatbots and automation that handle the repetitive work for you.",
    icon: "Bot",
    href: "/services/ai-automation-solutions",
  },
  {
    id: "custom-web-applications",
    title: "Custom Web Applications",
    description: "Custom CRMs, booking systems, and dashboards built for your workflow.",
    icon: "Code2",
    href: "/services/custom-web-applications",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description: "Mobile-first apps for your business, without the app-store overhead.",
    icon: "Smartphone",
    href: "/services/mobile-app-development",
  },
  {
    id: "website-hosting-maintenance",
    title: "Website Hosting & Maintenance",
    description: "Monthly updates, backups, and monitoring to keep your site secure.",
    icon: "Server",
    href: "/services/website-hosting-maintenance",
  },
  {
    id: "ai-technology-consulting",
    title: "AI & Technology Consulting",
    description: "AI training, market research, and documentation for your team.",
    icon: "Lightbulb",
    href: "/services/ai-technology-consulting",
  },
];
