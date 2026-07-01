import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Building a Marketing Strategy — Marketing | Cyberussell", description: "Build a simple, focused marketing strategy with AI. One goal, one audience, one channel.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing/building-a-marketing-strategy" }, openGraph: { title: "Building a Marketing Strategy | Cyberussell", description: "Build a focused marketing strategy with AI. One goal, one audience, one channel.", url: "https://www.cyberussell.com/learn/skills/marketing/building-a-marketing-strategy", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Marketing"
      skillHref="/learn/skills/marketing"
      lessonNum="2" lessonTotal="7"
      title="Building a Marketing Strategy"
      subtitle="A strategy is not a list of tactics. It's a decision about what you will and won't do."
      tags={["Strategy"]}
      readTime="10 min"
      objective="Write a one-page marketing strategy for your business or offer — with one clear goal, one defined audience, and one primary channel."
      sections={[
        { heading: "The Strategy vs Tactics Confusion", body: "Most people call a list of tactics a 'strategy'. Posting on Instagram three times a week is not a strategy. That's a tactic.\n\nA strategy is a set of choices that define your direction: Who specifically are you trying to reach? What do you want them to do? What's your unique angle? Which channels will you use — and which will you ignore? Strategy is about focus." },
        { heading: "The One-Page Marketing Strategy", items: [
          { title: "The Goal (the only number that matters)", desc: "What do you want your marketing to achieve in the next 90 days? Be specific: '50 new email subscribers', '5 new clients', '₱50,000 in revenue', '10,000 Instagram followers'. One goal. One number. Everything else is secondary." },
          { title: "The Audience (be dangerously specific)", desc: "Not 'entrepreneurs' — 'Filipino freelancers aged 25–35 who want to leave their day job and earn online, but don't know where to start.' The more specific your audience, the more powerful your messaging." },
          { title: "The Message (one clear idea)", desc: "What is the single core belief or insight you want your audience to have? 'AI makes marketing accessible to everyone, not just those with big budgets.' One idea, consistently communicated across all content." },
          { title: "The Channel (one primary, one secondary)", desc: "Where does your audience spend the most time? Pick one primary channel and go deep on it. Pick one secondary channel for distribution. Resist the urge to be everywhere — depth beats breadth when you're starting out." },
          { title: "The CTA (what happens next)", desc: "What is the one action you want your audience to take? Follow you? Book a call? Download your freebie? Buy now? Every piece of content should point toward this one action." },
        ] },
      ]}
      promptText={`Help me build a one-page marketing strategy. My offer: [describe what you sell]. My business goal for the next 90 days: [specific target]. My target audience: [describe them as specifically as possible]. My current channels: [where I currently post or market]. My budget: [₱0 / limited / some budget for ads]. Help me: 1) Write a one-sentence positioning statement, 2) Identify the best primary channel for my audience and goal, 3) Define the one CTA I should drive everything toward, 4) List 3 content themes that reinforce my core message, 5) Set a 30-day milestone I can track.`}
      checklistItems={["I have one specific 90-day marketing goal with a number", "I've described my target audience in at least 3 specific characteristics", "I've chosen one primary marketing channel to go deep on", "I know the one action I want my audience to take from every piece of content"]}
      reflectText={`The hardest part of strategy is what you decide not to do. <span class="text-white font-bold">What marketing channel or tactic are you currently spending time on that doesn't actually serve your one primary goal?</span>`}
      takeaways={["Strategy is about focus: one goal, one audience, one primary channel, one CTA. Tactics serve the strategy.", "The more specific your audience definition, the more resonant your marketing will be.", "One primary channel, done well, will outperform five channels done poorly every time.", "A 90-day horizon is long enough to see results and short enough to course-correct quickly."]}
      challengeTitle="Write your one-page marketing strategy."
      challengeBody="Fill in each of the 5 sections above (Goal, Audience, Message, Channel, CTA) in one paragraph each. Keep the whole document under one page. Share it with someone and ask: 'Do you understand who this is for and what it's trying to do?' If they're confused, simplify until they're not."
      nextTitle="Facebook and Instagram Ads"
      nextHref="/learn/skills/marketing/facebook-and-instagram-ads"
      nextMeta="Marketing · Lesson 3 of 7 · 12 min"
    />
  );
}
