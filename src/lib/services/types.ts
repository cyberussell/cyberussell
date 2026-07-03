export interface ProcessStep {
  step: string;
  detail: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortLabel: string;
  icon: string;
  color: string;
  tagline: string;
  hero: {
    headline: string;
    subhead: string;
  };
  description: string;
  problems: string[];
  deliverables: string[];
  features: string[];
  process: ProcessStep[];
  techStack: string[];
  idealClients: string[];
  faqs: FAQItem[];
  cta: {
    label: string;
    inquireLabel: string;
  };
}
