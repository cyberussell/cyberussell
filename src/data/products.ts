export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // in PHP cents (0 = free)
  priceLabel: string;
  tag: string;
  tagColor: string;
  file?: string; // direct download for free products
  paidFile?: string; // download path for paid products after purchase
  highlights?: string[];
  coverIcon: string;
  coverColor: string;
  coverBg: string;
  active: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "freelancer-starter-kit",
    title: "Freelancer Starter Kit",
    description:
      "A quick-start checklist for Filipinos who want to earn online — what to prepare, where to sign up, and the first steps to getting paid.",
    price: 0,
    priceLabel: "Free",
    tag: "Free Download",
    tagColor: "#00C97A",
    file: "/downloads/Freelancer-Starter-Kit-FREE.pdf",
    highlights: [
      "Step-by-step checklist — from zero to first client",
      "Where to sign up and which platforms actually pay",
      "Common beginner mistakes and how to avoid them",
      "Works even without experience or a college degree",
    ],
    coverIcon: "Rocket",
    coverColor: "#00C97A",
    coverBg: "rgba(0,201,122,0.08)",
    active: true,
  },
  {
    id: "freelancer-starter-kit-complete",
    title: "Freelancer Starter Kit — Complete Edition",
    description:
      "11 ready-to-use files para sa mga Filipino beginners na gustong kumita online — mula sa pag-setup ng device at internet, hanggang sa pagkuha ng unang client at unang kita. Lahat ng kailangan mo, nasa iisang download.",
    price: 19900,
    priceLabel: "₱199",
    tag: "Freelancer Starter Kit · Cyberussell",
    tagColor: "#FFD23F",
    paidFile: "/downloads/Cyberussell-Freelancer-Starter-Kit.zip",
    highlights: [
      "30-day action plan — 1 oras lang sa kada-araw, step by step",
      "5 proposal templates — copy, fill in the blanks, send (may Taglish version)",
      "Invoice, contract, at tracker templates — ready to use agad",
      "Scam protection checklist + access sa FREE Cyberussell Scam Scanner",
      "Honest income expectations — Month 1 hanggang Year 1, real numbers",
    ],
    coverIcon: "Rocket",
    coverColor: "#FFD23F",
    coverBg: "rgba(255,210,63,0.08)",
    active: true,
  },
  {
    id: "chatgpt-claude-for-filipinos",
    title: "ChatGPT & Claude for Filipinos",
    description:
      "20-page guide na nagtuturo kung paano gamitin ang ChatGPT at Claude para kumita online — may 10 ready-to-use prompts, 3 earning paths, at real income data mula sa PSA at DOLE.",
    price: 9900,
    priceLabel: "₱99",
    tag: "Trending",
    tagColor: "#E8373A",
    paidFile: "/downloads/Cyberussell-ChatGPT-and-Claude-Premium.pdf",
    highlights: [
      "ChatGPT vs Claude — real comparison table, hindi opinyon",
      "3 earning paths — Freelance Writing, VA Work, Digital Products",
      "10 copy-paste prompts na pwede mo gamitin agad",
      "Real income data — sourced from PSA, DOLE, Wise.com (2025–2026)",
      "Quick reference cheat sheet — 2 pages na babalikan mo palagi",
    ],
    coverIcon: "Bot",
    coverColor: "#3B82F6",
    coverBg: "rgba(59,130,246,0.08)",
    active: true,
  },
  {
    id: "prompt-engineering-for-online-workers",
    title: "Prompt Engineering for Online Workers",
    description:
      "The exact prompts Filipino VAs, writers, and sellers use to 10x their output. Copy-paste ready for client work, proposals, content creation, and customer service.",
    price: 19900,
    priceLabel: "₱199",
    tag: "Trending",
    tagColor: "#E8373A",
    paidFile: "/downloads/prompt-engineering-for-online-workers.pdf",
    coverIcon: "FileText",
    coverColor: "#FFD23F",
    coverBg: "rgba(255,210,63,0.08)",
    active: false,
  },
];
