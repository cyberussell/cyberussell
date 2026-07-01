import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Validating Your Business Idea — Business | Cyberussell", description: "Before you build anything, know if people actually want it. How to validate fast using AI.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/business/validating-your-business-idea" }, openGraph: { title: "Validating Your Business Idea | Cyberussell", description: "Validate your business idea fast with AI research before investing time and money.", url: "https://www.cyberussell.com/learn/skills/business/validating-your-business-idea", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Business"
      skillHref="/learn/skills/business"
      lessonNum="1" lessonTotal="7"
      title="Validating Your Business Idea"
      subtitle="Most businesses fail because they built something nobody wanted. Don't be most businesses."
      tags={["Validation", "Research"]}
      readTime="12 min"
      objective="Validate your business idea using the 3-part validation framework — market research, problem evidence, and a pre-sale test — using AI as your research partner."
      sections={[
        { heading: "Why Validation Matters More Than the Idea", body: "Having a great idea is the easiest part of starting a business. The hard part is knowing if the idea solves a real problem that real people will pay real money to solve.\n\nThe goal of validation is not to prove your idea is good. It's to prove there is demand before you invest significant time and money. The fastest validator is someone handing you money." },
        { heading: "The 3-Part Validation Framework", items: [
          { title: "Part 1: Market research (does this problem exist at scale?)", desc: "Search Facebook groups, Reddit, Twitter, and Quora for complaints about the problem you're solving. If people are publicly complaining about it, the problem is real. If you can't find evidence of the problem, either it doesn't exist or people don't care enough to talk about it publicly." },
          { title: "Part 2: Competitor analysis (are others already solving this?)", desc: "If competitors exist, that's a good sign — it means the market is real and people are paying. Your job is not to be the first in the market, it's to be better for a specific audience. No competitors at all can mean you've found a gap — or that nobody wants this." },
          { title: "Part 3: The pre-sale test (will they pay before you build?)", desc: "The strongest validation is a pre-sale: selling the product before it fully exists. Announce it, take deposits, see if people pay. If nobody pays, you've saved months of building something nobody wants. If 5 people pay, you have customers and a mandate." },
        ] },
        { heading: "How AI Accelerates Validation", body: "Claude can research your market, analyze competitors, identify the specific language your target audience uses to describe their pain, and help you craft a pre-sale offer — in a fraction of the time manual research takes.\n\nAI doesn't replace talking to real people. It speeds up the desk research that should precede those conversations." },
      ]}
      promptText={`I have a business idea: [describe your idea in 2-3 sentences]. Help me validate it. Specifically: 1) What evidence should I look for that the problem is real? Where would frustrated people talk about this problem online? 2) Who are the likely competitors already solving this? What are their weaknesses or the gaps they leave? 3) What is the most specific customer segment I should target first (not everyone — the smallest viable market)? 4) Design a simple pre-sale test I could run this week to get real market feedback. 5) What are the top 3 reasons this idea might fail, and how would I detect each early?`}
      checklistItems={["I've found at least 3 examples of real people publicly describing the problem I'm solving", "I've identified 2-3 competitors and understand what gap exists in their offerings", "I've defined the most specific customer segment I'll target first", "I have a plan to test demand before building the full product or service"]}
      reflectText={`The most painful entrepreneurial experience is spending 6 months building something, launching it, and discovering nobody wants it. <span class="text-white font-bold">What would it cost you (in time, money, and motivation) to build your idea and then discover the market doesn't want it?</span>`}
      takeaways={["Validate demand before investing significant time and money. The fastest validator is a pre-sale.", "Competitors are a green flag, not a red one — they prove the market exists and people are paying.", "The specific language your audience uses to describe their problem is your marketing copy. Find it in forums and reviews.", "AI can speed up market research dramatically, but real validation requires real people expressing real intent."]}
      challengeTitle="Spend 30 minutes researching your target market online."
      challengeBody="Go to Facebook Groups, Reddit, or Twitter and search for the problem your business idea solves. Look for posts where people express frustration, ask for recommendations, or describe a painful situation. Copy 5 examples into a document. These are evidence of demand. If you can't find 5 examples, reconsider whether the problem is real enough to build a business around."
      nextTitle="Writing a Business Plan"
      nextHref="/learn/skills/business/writing-a-business-plan"
      nextMeta="Business · Lesson 2 of 7 · 10 min"
    />
  );
}
