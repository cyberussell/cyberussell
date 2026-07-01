import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Growing an Audience: The Long Game — Content Creation | Cyberussell", description: "The real strategies behind audience growth — AI-assisted research, engagement tactics, and the mindset shift that changes everything.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/content-creation/growing-an-audience" }, openGraph: { title: "Growing an Audience | Cyberussell", description: "The AI-assisted strategies behind real, sustainable audience growth.", url: "https://www.cyberussell.com/learn/skills/content-creation/growing-an-audience", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Content Creation"
      skillHref="/learn/skills/content-creation"
      lessonNum="6" lessonTotal="6"
      title="Growing an Audience: The Long Game"
      subtitle="Algorithms are tactics. Building an audience is a strategy. Know the difference."
      tags={["Growth", "Strategy"]}
      readTime="10 min"
      objective="Build an AI-assisted audience growth system — including content differentiation, engagement habits, and your posting cadence — that you can sustain for 12 months."
      sections={[
        { heading: "What Actually Grows Audiences", body: "Virality is luck. Consistency is a system. Most creators chase viral moments and burn out. The creators who build real audiences do 3 things well: they post consistently, they have a clear point of view, and they engage authentically.\n\nAI helps you do all three more efficiently — but it doesn't replace the relationship-building that is the core of audience growth." },
        { heading: "The 4 Pillars of Sustainable Audience Growth", items: [
          { title: "1. A clear niche and positioning", desc: "You can't grow an audience if people can't tell who you are for. Use AI to sharpen your positioning: 'I help [specific audience] do [specific thing] using [specific approach]'. The more specific, the faster you grow — because the right people recognize themselves immediately." },
          { title: "2. Content that earns shares and saves", desc: "Shares and saves are the algorithm's signal that your content is worth spreading. Use AI to analyze which of your ideas are 'saveable' (tutorials, lists, resources) vs 'shareable' (relatable, funny, surprising). Optimize for both." },
          { title: "3. Genuine engagement", desc: "Reply to every comment, especially in your first year. Ask questions in your posts that invite response. Comment on posts by bigger creators in your niche — thoughtful comments, not just emojis. Engagement is a distribution strategy, not just courtesy." },
          { title: "4. Analyze and double down", desc: "Every month, use AI to analyze your analytics: which posts got the most saves, shares, follows? What did they have in common? Do more of that. Less of what didn't work. Growth compounds when you learn fast." },
        ] },
      ]}
      promptText={`Help me build an audience growth strategy for [your platform] in the niche of [your niche]. Here's what I know: 1) My posting frequency: [X times per week], 2) My current follower count: [number], 3) My goal in 90 days: [follower target or outcome], 4) My best-performing content so far: [describe it]. Help me: 1) Sharpen my positioning statement, 2) Identify the content formats most likely to earn saves and shares in my niche, 3) Suggest 5 growth tactics specific to my platform and niche, 4) Create a 30-day growth experiment to test.`}
      checklistItems={["I have a clear positioning statement — who I help and what I help them do", "I know which of my content formats drive saves vs shares", "I have a daily engagement habit (time-boxed, under 15 minutes)", "I've scheduled my first monthly analytics review"]}
      reflectText={`The creator you admire most in your niche — they didn't blow up overnight. They posted consistently, engaged authentically, and refined their approach. <span class="text-white font-bold">What would your channel look like if you showed up exactly like they did for the next 12 months?</span>`}
      takeaways={["Virality is luck. Consistency and positioning are systems. Bet on systems.", "Saves and shares are the most valuable metrics — they signal the algorithm to distribute your content wider.", "Engagement is a distribution strategy. Reply to comments, leave meaningful comments, build relationships.", "Monthly analytics reviews let you learn faster. Double down on what works. Cut what doesn't."]}
      challengeTitle="Write your creator positioning statement."
      challengeBody="Complete this sentence: 'I help [specific type of person] do [specific outcome] using [your unique approach].' Ask Claude to give you 5 versions of this positioning statement based on your niche and content. Pick the one that feels most true to you and put it in your bio on every platform today."
      nextTitle="Continue with Video Editing"
      nextHref="/learn/skills/video-editing"
      nextMeta="Build Real Skills · Pillar 5 · Video Editing Track"
    />
  );
}
