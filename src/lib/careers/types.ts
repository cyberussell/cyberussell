export interface Career {
  slug: string;
  skill: string;
  tagline: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  earning_range: EarningRange;
  time_to_first_income: string;
  prerequisites: string[];
  summary: {
    description: string;
    who_is_this_for: string[];
    reality_check: string;
  };
  roadmap: RoadmapPhase[];
  income_paths: IncomePath[];
  platforms: Platform[];
  tools: Tool[];
  faq: FAQItem[];
}

export interface EarningRange {
  min: number;
  max: number;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  steps: RoadmapStep[];
  milestone: string;
}

export interface RoadmapStep {
  action: string;
  detail: string;
}

export interface IncomePath {
  title: string;
  detail: string;
  earning_range: EarningRange;
}

export interface Platform {
  name: string;
  url: string;
  why: string;
}

export interface Tool {
  name: string;
  url: string;
  is_free: boolean;
  purpose: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
