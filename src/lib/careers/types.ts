export interface Career {
  slug: string;
  skill: string;
  tagline: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  earning_range: EarningRange;
  time_to_first_income: string;
  prerequisites: string[];
  todays_mission: TodaysMission;
  summary: {
    description: string;
    who_is_this_for: string[];
    reality_check: {
      honest_assessment: string;
      what_beginners_underestimate: string;
      why_people_fail: string;
      how_to_avoid_failure: string;
    };
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

export interface TodaysMission {
  tasks: string[];
  estimated_time: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  why: string;
  duration: string;
  steps: RoadmapStep[];
  milestone: string;
}

export interface RoadmapStep {
  action: string;
  detail: string;
  estimated_time: string;
  difficulty: "easy" | "moderate" | "challenging";
  outcome: string;
  action_url?: string;
  action_label?: string;
  resources?: string[];
}

export interface IncomePath {
  title: string;
  detail: string;
  earning_range: EarningRange;
  best_for: string;
  first_client_difficulty: "easy" | "moderate" | "hard";
  typical_beginner_mistake: string;
  time_to_first_income: string;
}

export interface Platform {
  name: string;
  url: string;
  why: string;
  best_for: string;
}

export interface Tool {
  name: string;
  url: string;
  is_free: boolean;
  purpose: string;
  why_it_matters: string;
  required: boolean;
  when_to_start: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
