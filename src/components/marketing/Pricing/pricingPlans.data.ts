import { Rocket, TrendingUp, Building2, type LucideIcon } from "lucide-react";

export interface PricingPlan {
  id: string;
  name: string;
  icon: LucideIcon;
  description?: string;
  price: string;
  priceSuffix?: string;
  priceSubtext?: string;
  featuresIntro?: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Rocket,
    description: "Recommended for businesses establishing their digital foundation.",
    price: "₱9,999",
    priceSubtext: "One-Time Project",
    features: [
      "Responsive business website",
      "Admin Dashboard",
      "Contact CRM",
      "Image Manager",
      "Basic SEO",
      "Google Analytics integration",
      "Secure Hosting",
      "2 Content Updates per Month",
      "Email Support",
    ],
    cta: "Start Building",
    href: "/services/inquire?service=Starter%20Business%20Platform",
  },
  {
    id: "growth",
    name: "Growth",
    icon: TrendingUp,
    description:
      "Designed for growing businesses that want to generate leads, publish content, and strengthen their online presence.",
    price: "₱24,999",
    priceSubtext: "One-Time Project",
    featuresIntro: "Everything in Starter, plus:",
    features: [
      "Blog CMS",
      "Unlimited Blog Posts",
      "Service & Portfolio Management",
      "Advanced SEO",
      "Lead Management",
      "Enhanced Analytics",
      "Email Notifications",
      "5 Content Updates per Month",
      "Priority Support",
    ],
    cta: "Grow My Business",
    href: "/services/inquire?service=Growth%20Business%20Platform",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "business-platform",
    name: "Business Platform",
    icon: Building2,
    description:
      "Tailored for businesses that need custom software, automation, and workflows built around their operations.",
    price: "Custom Quote",
    priceSubtext: "Starting at ₱49,999",
    featuresIntro: "Everything in Growth, plus:",
    features: [
      "Custom Admin System",
      "Staff Accounts & Roles",
      "Customer Portal",
      "Booking System",
      "Payment Integration",
      "API Integrations",
      "AI Features",
      "Business Automation",
      "Custom Workflows",
      "Advanced Reporting",
      "Dedicated Support",
    ],
    cta: "Let's Build Together",
    href: "/services/inquire?service=Business%20Platform",
  },
];
