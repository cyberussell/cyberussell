export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: "multi" | "single";
  maxSelections?: number;
  options: { id: string; label: string; icon?: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: "enjoy",
    title: "What do you usually enjoy doing?",
    subtitle: "Pick everything that applies. No wrong answers.",
    type: "multi",
    maxSelections: 4,
    options: [
      { id: "cooking", label: "Cooking", icon: "UtensilsCrossed" },
      { id: "facebook", label: "Facebook", icon: "Share2" },
      { id: "youtube", label: "YouTube", icon: "Play" },
      { id: "gaming", label: "Gaming", icon: "Gamepad2" },
      { id: "writing", label: "Writing", icon: "PenLine" },
      { id: "selling", label: "Selling", icon: "ShoppingBag" },
      { id: "photography", label: "Photography", icon: "Camera" },
      { id: "editing", label: "Editing Videos", icon: "Film" },
      { id: "drawing", label: "Drawing", icon: "Palette" },
      { id: "organizing", label: "Organizing", icon: "ClipboardList" },
      { id: "helping", label: "Helping People", icon: "HeartHandshake" },
      { id: "fixing", label: "Fixing Things", icon: "Wrench" },
    ],
  },
  {
    id: "personality",
    title: "People usually describe me as…",
    subtitle: "Pick up to 3 that feel most like you.",
    type: "multi",
    maxSelections: 3,
    options: [
      { id: "helpful", label: "Helpful" },
      { id: "creative", label: "Creative" },
      { id: "patient", label: "Patient" },
      { id: "organized", label: "Organized" },
      { id: "friendly", label: "Friendly" },
      { id: "tech-savvy", label: "Good with Computers" },
      { id: "explainer", label: "Good at Explaining" },
      { id: "seller", label: "Good at Selling" },
      { id: "curious", label: "Curious" },
      { id: "solver", label: "Problem Solver" },
    ],
  },
  {
    id: "experience",
    title: "Have you ever done any of these?",
    subtitle: "Even informally or for free. It all counts.",
    type: "multi",
    options: [
      { id: "sold", label: "Sold something" },
      { id: "family-biz", label: "Helped a family business" },
      { id: "edited-video", label: "Edited videos" },
      { id: "managed-page", label: "Managed a Facebook Page" },
      { id: "tutored", label: "Tutored someone" },
      { id: "designed", label: "Designed something" },
      { id: "fixed-gadgets", label: "Fixed gadgets" },
      { id: "customer-service", label: "Helped customers" },
      { id: "none", label: "None yet" },
    ],
  },
  {
    id: "interest",
    title: "Which work sounds most interesting?",
    subtitle: "Pick the one that excites you most.",
    type: "single",
    options: [
      { id: "wfh", label: "Work from Home" },
      { id: "designing", label: "Designing" },
      { id: "writing", label: "Writing" },
      { id: "teaching", label: "Teaching" },
      { id: "selling", label: "Selling" },
      { id: "clients", label: "Talking to Clients" },
      { id: "managing", label: "Managing Tasks" },
      { id: "content", label: "Creating Content" },
    ],
  },
  {
    id: "time",
    title: "How much time can you spend each week?",
    subtitle: "Be honest — we'll match realistic options.",
    type: "single",
    options: [
      { id: "under5", label: "Less than 5 hours" },
      { id: "5to10", label: "5–10 hours" },
      { id: "10to20", label: "10–20 hours" },
      { id: "fulltime", label: "Full Time" },
    ],
  },
  {
    id: "goal",
    title: "What is your biggest goal?",
    subtitle: "This helps us recommend the right path.",
    type: "single",
    options: [
      { id: "extra", label: "Extra Income" },
      { id: "replace", label: "Replace my Job" },
      { id: "freelance", label: "Freelancing" },
      { id: "business", label: "Start a Business" },
      { id: "learn", label: "Learn a Valuable Skill" },
      { id: "unsure", label: "I'm not sure yet" },
    ],
  },
];

export type Answers = Record<string, string[]>;
