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
};

const DEFAULT_PATH: LearningPathStep[] = [
  { title: "What AI Actually Is", href: "/learn/foundations/what-ai-actually-is" },
  { title: "Write Your First Real Prompt", href: "/learn/foundations/your-first-real-prompt" },
  { title: "How to Choose the Right AI", href: "/learn/foundations/how-to-choose-the-right-ai" },
];

export function getLearningPath(slug: string): LearningPathStep[] {
  return LEARNING_PATHS[slug] ?? DEFAULT_PATH;
}
