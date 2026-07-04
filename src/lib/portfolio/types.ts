export interface PortfolioTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  category: string;
  date: string;
  timeline: string;
  coverImage?: string;
  gallery?: string[];
  liveUrl?: string;
  techStack: string[];
  overview: string;
  problem: string;
  solution: string;
  results: string;
  testimonial?: PortfolioTestimonial;
  featured?: boolean;
}
