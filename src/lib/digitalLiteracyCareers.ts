import type { DLCategory } from "./digitalLiteracyQuestions";

export interface DLCareer {
  slug: string;
  title: string;
  description: string;
  /** Category weights (0-1) used to compute the match percentage. Should roughly sum to 1. */
  weights: Partial<Record<DLCategory, number>>;
  /** Skills this career always still requires beyond digital literacy basics. */
  skillsToImprove: string[];
  learnMoreHref: string;
}

export const careers: DLCareer[] = [
  {
    slug: "virtual-assistant",
    title: "Virtual Assistant",
    description: "Manages email, scheduling, files, and day-to-day admin tasks for a client or business.",
    weights: {
      "Email & Communication": 0.25,
      "Cloud & File Sharing": 0.2,
      "Video Calls": 0.15,
      "Digital Etiquette": 0.15,
      "Internet & Browsing": 0.1,
      "Password & Account Security": 0.15,
    },
    skillsToImprove: ["Calendar management", "Basic spreadsheets", "Professional email writing"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "data-entry-specialist",
    title: "Data Entry Specialist",
    description: "Accurately inputs, organizes, and manages large volumes of information in spreadsheets and systems.",
    weights: {
      "Cloud & File Sharing": 0.3,
      "Troubleshooting & Shortcuts": 0.3,
      "Internet & Browsing": 0.15,
      "Password & Account Security": 0.15,
      "Digital Etiquette": 0.1,
    },
    skillsToImprove: ["Typing accuracy and speed", "Spreadsheet formulas", "Attention to detail under repetition"],
    learnMoreHref: "/learn/skills/excel-spreadsheets",
  },
  {
    slug: "customer-support-representative",
    title: "Customer Support Representative",
    description: "Responds to customer questions and issues via chat, email, or calls, often across time zones.",
    weights: {
      "Email & Communication": 0.3,
      "Digital Etiquette": 0.25,
      "Video Calls": 0.15,
      "Cybersecurity Awareness": 0.15,
      "Internet & Browsing": 0.15,
    },
    skillsToImprove: ["De-escalation phrasing", "Ticketing tools (Zendesk/Freshdesk)", "Response-time discipline"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "administrative-assistant",
    title: "Administrative Assistant",
    description: "Supports office operations remotely — scheduling, document prep, and coordination between teams.",
    weights: {
      "Cloud & File Sharing": 0.25,
      "Email & Communication": 0.2,
      "Video Calls": 0.15,
      "Password & Account Security": 0.15,
      "Digital Etiquette": 0.15,
      "Internet & Browsing": 0.1,
    },
    skillsToImprove: ["Document formatting (Word/Docs)", "Meeting scheduling tools", "Basic bookkeeping"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "online-researcher",
    title: "Online Researcher",
    description: "Finds, verifies, and organizes information from the internet for businesses, writers, or analysts.",
    weights: {
      "Search Skills": 0.4,
      "Cybersecurity Awareness": 0.2,
      "Internet & Browsing": 0.2,
      "Cloud & File Sharing": 0.2,
    },
    skillsToImprove: ["Source verification / fact-checking", "Organizing research in spreadsheets", "Advanced search operators"],
    learnMoreHref: "/learn/workflows/deep-research",
  },
  {
    slug: "social-media-assistant",
    title: "Social Media Assistant",
    description: "Schedules posts, engages with comments, and supports a brand's social presence.",
    weights: {
      "Digital Etiquette": 0.3,
      "Internet & Browsing": 0.2,
      "Cloud & File Sharing": 0.2,
      "Email & Communication": 0.15,
      "Cybersecurity Awareness": 0.15,
    },
    skillsToImprove: ["Content scheduling tools", "Basic Canva design", "Platform-specific best practices"],
    learnMoreHref: "/learn/skills/content-creation",
  },
  {
    slug: "email-support-representative",
    title: "Email Support Representative",
    description: "Handles customer inquiries exclusively through written email support tickets.",
    weights: {
      "Email & Communication": 0.4,
      "Digital Etiquette": 0.25,
      "Cybersecurity Awareness": 0.15,
      "Cloud & File Sharing": 0.1,
      "Password & Account Security": 0.1,
    },
    skillsToImprove: ["Written tone and clarity", "Email templates and macros", "Typing speed"],
    learnMoreHref: "/learn/online-jobs",
  },
];

export interface CareerMatch {
  slug: string;
  title: string;
  description: string;
  matchPercent: number;
  skillsDemonstrated: DLCategory[];
  skillsToImprove: string[];
  estimatedPrep: string;
  learnMoreHref: string;
}

export function computeCareerMatches(categoryScores: Record<string, number>): CareerMatch[] {
  const matches = careers.map((career) => {
    const entries = Object.entries(career.weights) as [DLCategory, number][];
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
