import type { AICategory } from "./aiConfidenceTasks";

export interface AICareer {
  slug: string;
  title: string;
  description: string;
  /** Category weights (0-1) used to compute the match percentage. Should roughly sum to 1. */
  weights: Partial<Record<AICategory, number>>;
  skillsToImprove: string[];
  learnMoreHref: string;
}

export const careers: AICareer[] = [
  {
    slug: "ai-assistant",
    title: "AI Assistant",
    description: "Uses AI tools daily to handle research, writing, and admin tasks for clients or a team.",
    weights: {
      "Prompt Writing & Refinement": 0.35,
      "AI for Productivity & Documents": 0.25,
      "Fact-Checking & Reasoning": 0.2,
      "Responsible AI Usage & Ethics": 0.1,
      "AI for Content & Research": 0.1,
    },
    skillsToImprove: ["Structured prompt templates", "Document analysis workflows", "Cross-checking AI outputs"],
    learnMoreHref: "/learn/ai-team",
  },
  {
    slug: "prompt-engineer",
    title: "Prompt Engineer",
    description: "Designs and refines prompts that reliably get high-quality output from AI systems.",
    weights: {
      "Prompt Writing & Refinement": 0.5,
      "Fact-Checking & Reasoning": 0.2,
      "AI for Productivity & Documents": 0.15,
      "AI for Content & Research": 0.1,
      "Responsible AI Usage & Ethics": 0.05,
    },
    skillsToImprove: ["Iterative prompt refinement", "Structured output formatting (JSON/tables)", "Evaluating model responses systematically"],
    learnMoreHref: "/tools/prompt-forge",
  },
  {
    slug: "virtual-assistant",
    title: "Virtual Assistant",
    description: "Uses AI to speed up scheduling, email, research, and document prep for a client.",
    weights: {
      "AI for Productivity & Documents": 0.3,
      "Prompt Writing & Refinement": 0.25,
      "Responsible AI Usage & Ethics": 0.2,
      "AI for Content & Research": 0.15,
      "Fact-Checking & Reasoning": 0.1,
    },
    skillsToImprove: ["AI-assisted document workflows", "Client data privacy habits", "Faster prompt iteration"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    description: "Uses AI to draft, brainstorm, and speed up writing while keeping a distinct voice.",
    weights: {
      "AI for Content & Research": 0.35,
      "Prompt Writing & Refinement": 0.3,
      "Fact-Checking & Reasoning": 0.2,
      "Responsible AI Usage & Ethics": 0.1,
      "AI for Productivity & Documents": 0.05,
    },
    skillsToImprove: ["Fact-checking AI-generated claims", "Voice-preserving prompt techniques", "Research verification habits"],
    learnMoreHref: "/learn/skills/content-creation",
  },
  {
    slug: "copywriter",
    title: "Copywriter",
    description: "Uses AI to generate and refine persuasive copy variations quickly.",
    weights: {
      "Prompt Writing & Refinement": 0.35,
      "AI for Content & Research": 0.3,
      "Fact-Checking & Reasoning": 0.15,
      "Responsible AI Usage & Ethics": 0.1,
      "AI for Productivity & Documents": 0.1,
    },
    skillsToImprove: ["A/B prompt variation techniques", "Brand-voice prompting", "Claim verification before publishing"],
    learnMoreHref: "/learn/skills/writing-copywriting",
  },
  {
    slug: "seo-assistant",
    title: "SEO Assistant",
    description: "Uses AI for keyword research, content briefs, and on-page optimization at scale.",
    weights: {
      "AI for Content & Research": 0.35,
      "Prompt Writing & Refinement": 0.25,
      "AI for Productivity & Documents": 0.2,
      "Fact-Checking & Reasoning": 0.15,
      "Responsible AI Usage & Ethics": 0.05,
    },
    skillsToImprove: ["AI-assisted keyword clustering prompts", "Structured content brief templates", "Fact-checking AI-sourced statistics"],
    learnMoreHref: "/learn/skills/seo",
  },
  {
    slug: "research-assistant",
    title: "Research Assistant",
    description: "Uses AI to gather, verify, and synthesize information from many sources.",
    weights: {
      "Fact-Checking & Reasoning": 0.35,
      "AI for Content & Research": 0.3,
      "Prompt Writing & Refinement": 0.2,
      "Responsible AI Usage & Ethics": 0.1,
      "AI for Productivity & Documents": 0.05,
    },
    skillsToImprove: ["Hallucination detection habits", "Source cross-verification", "Structured research prompts"],
    learnMoreHref: "/learn/workflows/deep-research",
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    description: "Uses AI to brainstorm, draft, and adapt content across platforms quickly.",
    weights: {
      "AI for Content & Research": 0.3,
      "Prompt Writing & Refinement": 0.25,
      "Responsible AI Usage & Ethics": 0.2,
      "AI for Productivity & Documents": 0.15,
      "Fact-Checking & Reasoning": 0.1,
    },
    skillsToImprove: ["Platform-specific prompt templates", "Brand-safe AI usage", "Fast brainstorming workflows"],
    learnMoreHref: "/learn/skills/content-creation",
  },
  {
    slug: "customer-support-representative",
    title: "Customer Support Representative",
    description: "Uses AI to draft responses quickly while staying accurate and transparent with customers.",
    weights: {
      "Responsible AI Usage & Ethics": 0.3,
      "Prompt Writing & Refinement": 0.2,
      "AI for Productivity & Documents": 0.2,
      "Fact-Checking & Reasoning": 0.15,
      "AI for Content & Research": 0.15,
    },
    skillsToImprove: ["Verifying AI answers before sending", "Handling sensitive customer data responsibly", "Fast, accurate response drafting"],
    learnMoreHref: "/learn/online-jobs",
  },
  {
    slug: "digital-marketing-assistant",
    title: "Digital Marketing Assistant",
    description: "Uses AI across campaigns — copy, research, reporting, and content planning.",
    weights: {
      "AI for Content & Research": 0.3,
      "Prompt Writing & Refinement": 0.25,
      "AI for Productivity & Documents": 0.2,
      "Fact-Checking & Reasoning": 0.15,
      "Responsible AI Usage & Ethics": 0.1,
    },
    skillsToImprove: ["Campaign-specific prompt templates", "AI-assisted reporting workflows", "Verifying AI-generated market claims"],
    learnMoreHref: "/learn/ai-team",
  },
];

export interface CareerMatch {
  slug: string;
  title: string;
  description: string;
  matchPercent: number;
  skillsDemonstrated: AICategory[];
  skillsToImprove: string[];
  estimatedPrep: string;
  learnMoreHref: string;
}

export function computeCareerMatches(categoryScores: Record<string, number>): CareerMatch[] {
  const matches = careers.map((career) => {
    const entries = Object.entries(career.weights) as [AICategory, number][];
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
