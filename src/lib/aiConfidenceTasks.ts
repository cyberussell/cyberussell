export type AICategory =
  | "Prompt Writing & Refinement"
  | "Fact-Checking & Reasoning"
  | "AI for Content & Research"
  | "AI for Productivity & Documents"
  | "Responsible AI Usage & Ethics";

export const aiCategories: AICategory[] = [
  "Prompt Writing & Refinement",
  "Fact-Checking & Reasoning",
  "AI for Content & Research",
  "AI for Productivity & Documents",
  "Responsible AI Usage & Ethics",
];

export interface AITaskMeta {
  id: string;
  category: AICategory;
  title: string;
  kind: "mcq" | "prompt";
}

// Ordered list of tasks. MCQ content lives in AIConfidenceAnalyzer.tsx (mirrors the
// pattern used by the other assessment tools). "prompt" tasks are graded by Claude
// server-side since prompt quality can't be scored by simple string matching.
export const aiTasks: AITaskMeta[] = [
  { id: "improve-prompt", category: "Prompt Writing & Refinement", title: "Improve a Weak Prompt", kind: "prompt" },
  { id: "email-prompt", category: "Prompt Writing & Refinement", title: "Write a Prompt for a Professional Email", kind: "prompt" },
  { id: "extract-data-prompt", category: "Prompt Writing & Refinement", title: "Extract Structured Data", kind: "prompt" },
  { id: "spot-hallucination", category: "Fact-Checking & Reasoning", title: "Spot the Hallucination", kind: "mcq" },
  { id: "compare-responses", category: "Fact-Checking & Reasoning", title: "Compare Two AI Responses", kind: "mcq" },
  { id: "summarize-approach", category: "AI for Content & Research", title: "Summarizing a Long Article", kind: "mcq" },
  { id: "research-verify", category: "AI for Content & Research", title: "Verifying AI Research", kind: "mcq" },
  { id: "spreadsheet-cleanup", category: "AI for Productivity & Documents", title: "Cleaning Up a Spreadsheet", kind: "mcq" },
  { id: "coding-error", category: "AI for Productivity & Documents", title: "Fixing Broken Code", kind: "mcq" },
  { id: "workplace-disclosure", category: "Responsible AI Usage & Ethics", title: "Disclosing AI Use at Work", kind: "mcq" },
  { id: "sensitive-data", category: "Responsible AI Usage & Ethics", title: "What Not to Paste Into AI", kind: "mcq" },
];

export const taskIds = aiTasks.map((t) => t.id);
export const promptTaskIds = aiTasks.filter((t) => t.kind === "prompt").map((t) => t.id);

export interface PromptScenario {
  instruction: string;
  context: string;
  rubric: string;
}

// Shared between the UI (what the user sees) and the grading prompt sent to Claude
// (what the rubric evaluates against) — keeping this in one place avoids drift.
export const promptScenarios: Record<string, PromptScenario> = {
  "improve-prompt": {
    instruction: "Someone wrote this weak prompt: \"write about dogs\". Rewrite it into a much better, specific prompt that would get a genuinely useful response from an AI assistant.",
    context: "Improving a vague prompt",
    rubric: "Specificity (what about dogs, for whom), clear context, explicit format/length/tone instructions. A vague rewrite that's still generic scores low even if longer.",
  },
  "email-prompt": {
    instruction: "Write the exact prompt you'd give an AI assistant to draft a professional follow-up email after a job interview. Include enough detail that the AI doesn't have to guess.",
    context: "Prompting for a professional email",
    rubric: "Sets role/context, specifies key details to include (company, position, interviewer, something discussed), gives tone/length guidance, clear format ask. Generic prompts with no specifics score low.",
  },
  "extract-data-prompt": {
    instruction: "You have this messy customer message: \"Hi, this is John from Acme Corp, my email is john@acme.com and I need a quote for 50 units by next Friday.\" Write a prompt that would get an AI to extract this into clean structured fields (like JSON) you could paste into a spreadsheet.",
    context: "Extracting structured data from text",
    rubric: "Specifies the desired output format (JSON/table/fields), names the specific fields wanted, includes the source text, instructs the AI not to add information that isn't there. Prompts that just say 'organize this' without specifying format score low.",
  },
};
