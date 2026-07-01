import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Organic Social Media Marketing — Marketing | Cyberussell", description: "Grow without spending on ads. The strategy behind consistent organic reach and audience growth.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing/organic-social-media-marketing" }, openGraph: { title: "Organic Social Media Marketing | Cyberussell", description: "Grow on social media without paid ads — strategy, content, and algorithm basics.", url: "https://www.cyberussell.com/learn/skills/marketing/organic-social-media-marketing", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Marketing"
      skillHref="/learn/skills/marketing"
      lessonNum="5" lessonTotal="7"
      title="Organic Social Media Marketing"
      subtitle="Organic growth is slow but it's free, compounding, and credibility-building."
      tags={["Social Media", "Organic"]}
      readTime="10 min"
      objective="Build a 30-day organic social media marketing plan — with content pillars, posting frequency, and growth tactics — using AI."
      sections={[
        { heading: "The Difference Between Organic and Paid", body: "Organic marketing uses content, consistency, and community to grow without spending on ads. It's slower — but it builds genuine trust and authority that paid marketing can't replicate.\n\nThe best strategy is both: use organic to build credibility and an audience, then use paid to accelerate what's already working." },
        { heading: "How Social Media Algorithms Actually Work", items: [
          { title: "What every algorithm rewards", desc: "Engagement: comments, shares, saves, and direct messages tell the algorithm your content is worth spreading. Watch time: how long people stay on your video. Profile visits and follows: the algorithm tracks whether your content makes people want to see more. All these are measurable — optimize for them." },
          { title: "What kills organic reach", desc: "Inconsistent posting: gaps in your schedule reset your algorithm momentum. Low engagement: if no one comments or shares, the algorithm stops showing it. External links in posts: Facebook and Instagram penalize posts that drive traffic away from their platform." },
        ] },
        { heading: "The Organic Social Strategy Framework", items: [
          { title: "Pick your platforms (not all of them)", desc: "Choose one primary platform based on where your audience actually is. A Filipino B2B audience is on LinkedIn and Facebook. A Gen Z audience is on TikTok. A creative audience is on Instagram. Be excellent on one before adding a second." },
          { title: "Content pillars (3–5 themes)", desc: "Define 3–5 recurring content themes that reflect your expertise and serve your audience. Rotate through them so your feed is varied but coherent. Pillars prevent content block and give your audience a reason to follow — they know what to expect." },
          { title: "The engagement habit", desc: "Spend 15 minutes per day engaging with other people's content in your niche. Leave meaningful comments (not just emojis). Respond to every comment on your posts. Ask questions in your captions. Engagement in drives engagement out." },
        ] },
      ]}
      promptText={`Help me build an organic social media marketing strategy for [your business/niche]. My target platform(s): [Facebook / Instagram / TikTok / LinkedIn]. My target audience: [describe them]. My goal in 90 days: [followers, engagement, leads, etc.]. My content strengths: [video / writing / graphics / all three]. Create: 1) 5 content pillars for my niche with a description of what type of content fits each, 2) A weekly posting schedule (which format on which days), 3) 10 content ideas for my first 2 weeks, 4) A daily engagement habit routine (under 15 minutes), 5) How I'll move social followers to my email list.`}
      checklistItems={["I've chosen one primary social platform to go deep on", "I've defined 3–5 content pillars with examples for each", "I have a posting schedule I can realistically maintain for 3 months", "I have a 15-minute daily engagement routine I'll actually do"]}
      reflectText={`Organic growth is a long game. The creators you envy built their audiences one consistent day at a time. <span class="text-white font-bold">Are you willing to post for 6 months with no major growth in exchange for a real audience that trusts you?</span>`}
      takeaways={["Algorithms reward engagement, watch time, and follows. Create content that earns all three.", "One platform done excellently beats five platforms done mediocrely, every time.", "Consistency is more important than quality in the early stages. You can improve quality while posting consistently. You can't improve what you're not posting." , "The engagement habit (15 min/day) compounds over time. It's the most underrated growth strategy."]}
      challengeTitle="Commit to one platform for 90 days and set up your content pillars."
      challengeBody="Choose your primary platform. Define your 3–5 content pillars. Write your first week's content using the ideas Claude generates for you. Schedule them. Show up consistently for 90 days before evaluating results. 90 days is the minimum sample size to understand whether your strategy is working."
      nextTitle="Analyzing Campaign Results"
      nextHref="/learn/skills/marketing/analyzing-campaign-results"
      nextMeta="Marketing · Lesson 6 of 7 · 8 min"
    />
  );
}
