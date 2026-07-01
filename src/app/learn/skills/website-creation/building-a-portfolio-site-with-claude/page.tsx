import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "Building a Portfolio Site with Claude — Website Creation | Cyberussell",
  description: "Step-by-step: prompt Claude to generate a complete portfolio site in one session. From zero to deployed.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation/building-a-portfolio-site-with-claude" },
  openGraph: { title: "Building a Portfolio Site with Claude | Cyberussell", description: "Prompt Claude to generate a complete portfolio site in one session.", url: "https://www.cyberussell.com/learn/skills/website-creation/building-a-portfolio-site-with-claude", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Website Creation"
      skillHref="/learn/skills/website-creation"
      lessonNum="5" lessonTotal="7"
      title="Building a Portfolio Site with Claude"
      subtitle="Step-by-step: from blank page to a real portfolio you can show clients."
      tags={["Hands-On"]}
      readTime="15 min"
      objective="Use Claude to generate the full HTML/CSS for a portfolio site, customize it, and understand how to iterate with AI when the output isn't right."
      sections={[
        {
          heading: "Why Claude for Portfolio Building",
          body: "Claude writes code that is clean, readable, and well-commented. For portfolio sites — which are mostly HTML and CSS — Claude can generate a full working page in one prompt if you give it enough detail.\n\nThe key is specificity. The more detail you give about your brand, your work, and your style preferences, the better the output. Vague prompts get generic portfolios.",
        },
        {
          heading: "What to Prepare Before Prompting",
          items: [
            { title: "Your name and what you do", desc: "One sentence. 'I'm a Filipino freelance graphic designer specializing in brand identity for small businesses.'" },
            { title: "3–5 portfolio pieces with descriptions", desc: "Title, what you did, tools used, and the result. Even rough bullet points work." },
            { title: "Your contact method", desc: "Email, Upwork link, or Calendly — whatever you want people to use." },
            { title: "Color/style preference", desc: "Dark or light? Minimal or bold? One accent color? Give Claude a reference if you have one." },
          ]
        },
        {
          heading: "The Portfolio Build Workflow",
          items: [
            { title: "Step 1: Generate the full site", desc: "Give Claude your prepared info and ask for a complete single-page HTML portfolio with inline CSS. Ask for responsive design." },
            { title: "Step 2: Copy the code into a file", desc: "Save it as index.html. Open it in your browser to preview. Check layout, colors, and content." },
            { title: "Step 3: Iterate with specific requests", desc: "Don't like the font? Say so. Hero too tall? Ask Claude to adjust the padding. Be specific about what to change." },
            { title: "Step 4: Deploy", desc: "Drag the file onto Netlify Drop or upload to Vercel. You get a live URL in seconds — free." },
          ]
        },
      ]}
      promptText={`Build me a single-page HTML portfolio website with inline CSS. I'm [your name], a [your profession]. My style preference: [dark/light, minimal/bold, accent color]. My portfolio pieces are: [list 3-5 projects with brief descriptions]. My contact info is [your preferred contact]. Make it mobile-responsive, include a nav, hero section, portfolio grid, and contact section. Clean, professional, no external dependencies.`}
      checklistItems={["Claude generated working HTML I can open in a browser", "I've previewed it and identified at least 2 things to change", "I've iterated with Claude at least once to improve it", "I have a live URL from Netlify or Vercel"]}
      reflectText={`After building this, what's one thing you would do differently on your next project? <span class="text-white font-bold">How did knowing what you wanted before prompting affect the quality of Claude's output?</span>`}
      takeaways={[
        "Claude can generate a complete portfolio in one prompt — if you give it enough specific detail.",
        "Iteration is the skill. Don't expect perfection on the first pass. Work with Claude to refine.",
        "Deploying on Netlify or Vercel takes less than 5 minutes and costs nothing for a basic site.",
        "A live portfolio URL is worth more than a perfect offline one. Ship first, improve after.",
      ]}
      challengeTitle="Add one real project to your portfolio tonight."
      challengeBody="Don't wait until you have 10 pieces. Add the one project you're most proud of right now. A real live portfolio with 1 piece beats a perfect imaginary one with 10."
      nextTitle="SEO Basics Built Into Your Site from Day One"
      nextHref="/learn/skills/website-creation/seo-basics-built-into-your-site"
      nextMeta="Website Creation · Lesson 6 of 7 · 10 min"
    />
  );
}
