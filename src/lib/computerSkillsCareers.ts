import type { CSCategory } from "./computerSkillsTasks";

export interface CSCareer {
  slug: string;
  title: string;
  description: string;
  /** Category weights (0-1) used to compute the match percentage. Should roughly sum to 1. */
  weights: Partial<Record<CSCategory, number>>;
  skillsToImprove: string[];
  learnMoreHref: string;
}

export const careers: CSCareer[] = [
  {
    slug: "data-entry-specialist",
    title: "Data Entry Specialist",
    description: "Accurately inputs and organizes large volumes of information into spreadsheets and systems.",
    weights: {
      "Spreadsheets & Data Entry": 0.4,
      "Keyboard & Mouse Control": 0.3,
      "File & Folder Management": 0.2,
      "Windows & Mac Navigation": 0.1,
    },
    skillsToImprove: ["Sustained typing accuracy under time pressure", "Spreadsheet shortcuts", "Double-checking entries for errors"],
    learnMoreHref: "/learn/skills/excel-spreadsheets",
  },
  {
    slug: "virtual-assistant",
    title: "Virtual Assistant",
    description: "Manages files, documents, and day-to-day digital admin tasks for a client or business.",
    weights: {
      "File & Folder Management": 0.25,
      "Uploads & Downloads": 0.2,
      "Word Processing": 0.2,
      "Windows & Mac Navigation": 0.15,
      "Spreadsheets & Data Entry": 0.2,
    },
    skillsToImprove: ["File organization systems", "Document formatting", "Multi-tasking across apps"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "administrative-assistant",
    title: "Administrative Assistant",
    description: "Prepares documents, manages files, and supports office operations remotely.",
    weights: {
      "Word Processing": 0.3,
      "File & Folder Management": 0.2,
      "Spreadsheets & Data Entry": 0.25,
      "Windows & Mac Navigation": 0.15,
      "Uploads & Downloads": 0.1,
    },
    skillsToImprove: ["Advanced Word/Docs formatting", "Spreadsheet organization", "File-sharing etiquette"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "customer-support-representative",
    title: "Customer Support Representative",
    description: "Juggles multiple chat windows, tickets, and reference documents while responding to customers.",
    weights: {
      "Windows & Mac Navigation": 0.3,
      "Keyboard & Mouse Control": 0.25,
      "Uploads & Downloads": 0.2,
      "File & Folder Management": 0.15,
      "Word Processing": 0.1,
    },
    skillsToImprove: ["Fast window switching", "Typing speed under pressure", "Screenshot / evidence sharing"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "online-researcher",
    title: "Online Researcher",
    description: "Gathers, downloads, organizes, and files information from many sources at once.",
    weights: {
      "Windows & Mac Navigation": 0.3,
      "File & Folder Management": 0.25,
      "Uploads & Downloads": 0.2,
      "Keyboard & Mouse Control": 0.15,
      "Word Processing": 0.1,
    },
    skillsToImprove: ["Browser tab and download management", "Source file organization", "Copy-paste accuracy"],
    learnMoreHref: "/learn/workflows/deep-research",
  },
  {
    slug: "bookkeeper",
    title: "Bookkeeper",
    description: "Enters, sorts, and reconciles financial data across spreadsheets and accounting tools.",
    weights: {
      "Spreadsheets & Data Entry": 0.5,
      "Keyboard & Mouse Control": 0.2,
      "File & Folder Management": 0.15,
      "Word Processing": 0.15,
    },
    skillsToImprove: ["Spreadsheet sorting and formulas", "Numeric data entry precision", "Financial file organization"],
    learnMoreHref: "/learn/skills/excel-spreadsheets",
  },
  {
    slug: "operations-assistant",
    title: "Operations Assistant",
    description: "Keeps files, records, and shared systems organized and up to date across a growing team.",
    weights: {
      "File & Folder Management": 0.25,
      "Spreadsheets & Data Entry": 0.25,
      "Uploads & Downloads": 0.2,
      "Windows & Mac Navigation": 0.15,
      "Word Processing": 0.15,
    },
    skillsToImprove: ["Systematic folder structures", "Cross-platform file sharing", "Process documentation"],
    learnMoreHref: "/learn/online-jobs",
  },
];

export interface CareerMatch {
  slug: string;
  title: string;
  description: string;
  matchPercent: number;
  skillsDemonstrated: CSCategory[];
  skillsToImprove: string[];
  estimatedPrep: string;
  learnMoreHref: string;
}

export function computeCareerMatches(categoryScores: Record<string, number>): CareerMatch[] {
  const matches = careers.map((career) => {
    const entries = Object.entries(career.weights) as [CSCategory, number][];
    const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0) || 1;
    const weightedScore =
      entries.reduce((sum, [cat, w]) => sum + (categoryScores[cat] ?? 0) * w, 0) / totalWeight;
    const matchPercent = Math.round(Math.max(0, Math.min(100, weightedScore)));

    const skillsDemonstrated = entries
      .filter(([cat]) => (categoryScores[cat] ?? 0) >= 70)
      .map(([cat]) => cat);

    const estimatedPrep =
      matchPercent >= 85 ? "Ready now" : matchPercent >= 65 ? "1-2 weeks" : matchPercent >= 45 ? "3-4 weeks" : "6-8 weeks";

    return {
      slug: career.slug,
      title: career.title,
      description: career.description,
      matchPercent,
      skillsDemonstrated,
      skillsToImprove: career.skillsToImprove,
      estimatedPrep,
      learnMoreHref: career.learnMoreHref,
    };
  });

  return matches.sort((a, b) => b.matchPercent - a.matchPercent);
}
