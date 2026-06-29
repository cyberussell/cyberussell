export interface HiddenSkill {
  name: string;
  why: string;
}

export interface Strength {
  name: string;
  score: number;
}

export interface CareerMatch {
  slug: string;
  skill: string;
  match_score: number;
  why_it_fits: string;
  beginner_income: string;
  difficulty: string;
  time_to_first_income: string;
}

export interface TodaysMissionItem {
  task: string;
}

export interface DiscoveryResult {
  hidden_skills: HiddenSkill[];
  strengths: Strength[];
  career_matches: CareerMatch[];
  recommended_slug: string;
  todays_mission: TodaysMissionItem[];
  estimated_mission_time: string;
  visitor_name?: string;
}
