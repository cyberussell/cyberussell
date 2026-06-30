export type ToolStatus = "Free" | "Beta" | "Premium" | "Coming Soon";
export type ToolCategory =
  | "Career"
  | "Freelancing"
  | "Business"
  | "Websites"
  | "SEO"
  | "Productivity"
  | "Content Creation"
  | "Research"
  | "Safety";

export interface Tool {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string; // Lucide icon name
  category: ToolCategory;
  status: ToolStatus;
  ctaLabel: string;
  ctaUrl: string;
  featured: boolean;
  relatedTools: string[];
  relatedGuides: { label: string; href: string }[];
  relatedArticles: { label: string; href: string }[];
  faq: { question: string; answer: string }[];
  seo: { title: string; description: string };
}

export const tools: Tool[] = [
  {
    slug: "scam-scanner",
    name: "Scam Checker",
    shortDescription:
      "Paste any job posting or online opportunity. AI detects red flags and scam patterns common in the Philippines.",
    longDescription:
      "Don't fall for fake job offers or investment scams. Paste the job post, message, or opportunity text and our AI will analyze it for red flags — unrealistic pay, vague employers, suspicious links, and common scam patterns targeting Filipinos.",
    icon: "ShieldCheck",
    category: "Safety",
    status: "Free",
    ctaLabel: "Check Now →",
    ctaUrl: "/tools/scam-scanner",
    featured: true,
    relatedTools: ["bio-generator", "prompt-forge"],
    relatedGuides: [
      { label: "Guide: How to Spot Online Scams", href: "/guides/scam-checker" },
    ],
    relatedArticles: [],
    faq: [
      {
        question: "Is the Scam Checker free to use?",
        answer: "Yes, it is completely free. No sign-up required.",
      },
      {
        question: "What types of scams does it detect?",
        answer:
          "It detects common online job scams, investment scams, phishing attempts, and deceptive work-from-home offers — especially those targeting Filipinos.",
      },
      {
        question: "How accurate is it?",
        answer:
          "It uses AI to identify patterns, but always use your own judgment. If something feels off, trust your instincts and do additional research.",
      },
    ],
    seo: {
      title: "Scam Checker — Free AI Tool to Detect Online Job Scams | Cyberussell",
      description:
        "Paste any job offer or online opportunity and our free AI tool will scan it for red flags and scam patterns common in the Philippines.",
    },
  },
  {
    slug: "prompt-forge",
    name: "Prompt Trainer",
    shortDescription:
      "Score your AI prompts, see what's weak, and get upgraded versions for Claude, ChatGPT, and Gemini.",
    longDescription:
      "Most Filipinos use AI the wrong way — vague prompts get vague results. Paste your prompt and our AI scores it, explains what's missing, and rewrites it into a high-performance version for Claude, ChatGPT, or Gemini.",
    icon: "Sparkles",
    category: "Productivity",
    status: "Free",
    ctaLabel: "Train Your Prompts →",
    ctaUrl: "/tools/prompt-forge",
    featured: true,
    relatedTools: ["scam-scanner", "bio-generator"],
    relatedGuides: [
      { label: "Guide: How to Use Claude AI", href: "/guides/claude-ai" },
    ],
    relatedArticles: [],
    faq: [
      {
        question: "What AI models does this work with?",
        answer: "It is optimized for Claude, ChatGPT (GPT-4), and Google Gemini.",
      },
      {
        question: "Do I need an account?",
        answer: "No. It is 100% free with no sign-up required.",
      },
      {
        question: "What makes a good AI prompt?",
        answer:
          "A good prompt is specific, gives context, sets a role, and defines the format you want. The Prompt Trainer analyzes all of these.",
      },
    ],
    seo: {
      title: "Prompt Trainer — Score & Improve Your AI Prompts | Cyberussell",
      description:
        "Free AI tool that scores your prompts for Claude, ChatGPT, and Gemini — then rewrites them for better results.",
    },
  },
  {
    slug: "bio-generator",
    name: "Bio Generator",
    shortDescription:
      "Paste your skills and experience. AI writes a professional freelancer bio optimized for Upwork, OJP, Fiverr, or LinkedIn.",
    longDescription:
      "Your bio is the first thing clients read. A weak bio costs you jobs. Paste your skills, experience, and target platform — our AI writes a compelling professional bio that positions you correctly and converts browsers into clients.",
    icon: "UserCircle",
    category: "Freelancing",
    status: "Free",
    ctaLabel: "Generate My Bio →",
    ctaUrl: "/tools/bio-generator",
    featured: true,
    relatedTools: ["scam-scanner", "prompt-forge"],
    relatedGuides: [],
    relatedArticles: [
      { label: "Where to Find Online Work as a Filipino", href: "/earn/freelance-platforms" },
    ],
    faq: [
      {
        question: "Which platforms is it optimized for?",
        answer:
          "Upwork, OnlineJobs.ph, Fiverr, and LinkedIn. You choose the platform and the AI tailors the tone and format.",
      },
      {
        question: "Is it free?",
        answer: "Yes, completely free. No account needed.",
      },
      {
        question: "Can I use it if I am a beginner with no experience?",
        answer:
          "Yes. Just describe your skills, background, and what you want to do. The AI will write a bio that positions you even without formal work history.",
      },
    ],
    seo: {
      title: "Bio Generator — Free AI Freelancer Bio for Upwork, OJP & Fiverr | Cyberussell",
      description:
        "Generate a professional freelancer bio in seconds. Free AI tool optimized for Upwork, OnlineJobs.ph, Fiverr, and LinkedIn.",
    },
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slugs: string[]): Tool[] {
  return slugs.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as Tool[];
}

export const toolCategories: ToolCategory[] = [
  "Career",
  "Freelancing",
  "Business",
  "Websites",
  "SEO",
  "Productivity",
  "Content Creation",
  "Research",
  "Safety",
];
