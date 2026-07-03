export interface LearningPathStep {
  title: string;
  href: string;
}

const LEARNING_PATHS: Record<string, LearningPathStep[]> = {
  writing: [
    { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
    { title: "Writing & Copywriting", href: "/learn/skills/writing-copywriting" },
    { title: "Content Creation Workflow", href: "/learn/workflows/content-creation" },
  ],
  canva: [
    { title: "How to Choose the Right AI", href: "/learn/foundations/how-to-choose-the-right-ai" },
    { title: "Graphic Design", href: "/learn/skills/graphic-design" },
    { title: "Content Creation Workflow", href: "/learn/workflows/content-creation" },
  ],
  cooking: [
    { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
    { title: "Content Creation", href: "/learn/skills/content-creation" },
    { title: "Marketing Strategy Workflow", href: "/learn/workflows/marketing-strategy" },
  ],
  "video-editing": [
    { title: "What AI Is Good At", href: "/learn/foundations/what-ai-is-good-at" },
    { title: "Video Editing", href: "/learn/skills/video-editing" },
    { title: "Content Creation Workflow", href: "/learn/workflows/content-creation" },
  ],
  "virtual-assistant": [
    { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
    { title: "Excel & Spreadsheets", href: "/learn/skills/excel-spreadsheets" },
    { title: "Business Planning Workflow", href: "/learn/workflows/business-planning" },
  ],
  "customer-support": [
    { title: "What Not to Share with AI", href: "/learn/foundations/what-not-to-share-with-ai" },
    { title: "Business", href: "/learn/skills/business" },
    { title: "Business Planning Workflow", href: "/learn/workflows/business-planning" },
  ],
  "social-media-management": [
    { title: "How to Choose the Right AI", href: "/learn/foundations/how-to-choose-the-right-ai" },
    { title: "Organic Social Media Marketing", href: "/learn/skills/marketing/organic-social-media-marketing" },
    { title: "Marketing Strategy Workflow", href: "/learn/workflows/marketing-strategy" },
  ],
  bookkeeping: [
    { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
    { title: "Excel & Spreadsheets", href: "/learn/skills/excel-spreadsheets" },
    { title: "Business Planning Workflow", href: "/learn/workflows/business-planning" },
  ],
  "lead-generation": [
    { title: "What AI Is Good At", href: "/learn/foundations/what-ai-is-good-at" },
    { title: "Finding Your First Customers", href: "/learn/skills/business/finding-your-first-customers" },
    { title: "Marketing Strategy Workflow", href: "/learn/workflows/marketing-strategy" },
  ],
  "appointment-setting": [
    { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
    { title: "Finding Your First Customers", href: "/learn/skills/business/finding-your-first-customers" },
    { title: "Business Planning Workflow", href: "/learn/workflows/business-planning" },
  ],
  seo: [
    { title: "How to Choose the Right AI", href: "/learn/foundations/how-to-choose-the-right-ai" },
    { title: "SEO", href: "/learn/skills/seo" },
    { title: "Marketing Strategy Workflow", href: "/learn/workflows/marketing-strategy" },
  ],
  wordpress: [
    { title: "What AI Is Good At", href: "/learn/foundations/what-ai-is-good-at" },
    { title: "Website Creation", href: "/learn/skills/website-creation" },
    { title: "Website Creation Workflow", href: "/learn/workflows/website-creation" },
  ],
  shopify: [
    { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
    { title: "Website Creation", href: "/learn/skills/website-creation" },
    { title: "Business Planning Workflow", href: "/learn/workflows/business-planning" },
  ],
  "graphic-design": [
    { title: "How to Choose the Right AI", href: "/learn/foundations/how-to-choose-the-right-ai" },
    { title: "Graphic Design", href: "/learn/skills/graphic-design" },
    { title: "Content Creation Workflow", href: "/learn/workflows/content-creation" },
  ],
  "ai-automation": [
    { title: "What AI Is Good At", href: "/learn/foundations/what-ai-is-good-at" },
    { title: "Automation", href: "/learn/skills/automation" },
    { title: "AI Team", href: "/learn/ai-team" },
  ],
};

const DEFAULT_PATH: LearningPathStep[] = [
  { title: "What AI Actually Is", href: "/learn/foundations/what-ai-actually-is" },
  { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
  { title: "How to Choose the Right AI", href: "/learn/foundations/how-to-choose-the-right-ai" },
];

export function getLearningPath(slug: string): LearningPathStep[] {
  return LEARNING_PATHS[slug] ?? DEFAULT_PATH;
}
