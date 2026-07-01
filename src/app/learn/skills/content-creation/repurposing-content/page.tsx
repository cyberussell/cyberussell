import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Repurposing Content: One Piece, Many Platforms — Content Creation | Cyberussell", description: "Turn one video or blog post into 10 pieces of content across every platform. Work smarter.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/content-creation/repurposing-content" }, openGraph: { title: "Repurposing Content with AI | Cyberussell", description: "One piece of content, distributed across every platform. AI makes it fast.", url: "https://www.cyberussell.com/learn/skills/content-creation/repurposing-content", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Content Creation"
      skillHref="/learn/skills/content-creation"
      lessonNum="4" lessonTotal="6"
      title="Repurposing Content: One Piece, Many Platforms"
      subtitle="The best creators don't create more — they distribute smarter."
      tags={["Repurposing", "Strategy"]}
      readTime="8 min"
      objective="Take one piece of existing content and repurpose it into at least 5 platform-specific formats using AI."
      sections={[
        { heading: "Why Repurposing is the Highest-Leverage Content Move", body: "If you create one long-form YouTube video, that's not one piece of content — that's 15. The same ideas can become TikToks, Instagram carousels, Twitter threads, LinkedIn posts, email newsletters, and blog posts.\n\nMost creators post once and move on. Repurposing creators post 10 times from the same core content and reach 10x more people with the same effort." },
        { heading: "The Repurposing Hierarchy", items: [
          { title: "Long-form as the source", desc: "YouTube video, podcast episode, or long blog post is your content pillar. It takes the most effort to produce but contains enough ideas to fuel weeks of short-form." },
          { title: "Short-form clips (video)", desc: "Extract 3–5 key moments from a long video. Each becomes a TikTok or Reel. CapCut AI or Opus Clip can auto-identify the best clips. Add captions and post." },
          { title: "Carousel posts (visual)", desc: "Take the main points of a video or article and make each point a slide. Carousels have the highest save rate of any post format on Instagram. Great for tutorials, lists, and step-by-step guides." },
          { title: "Short captions (text)", desc: "The most shareable quote, stat, or insight from your content becomes a standalone social post. One great sentence can outperform a 10-minute video in reach." },
          { title: "Email newsletter", desc: "Summarize the key idea from a piece of content in 200 words. Add your personal take on why it matters. Link to the full piece. This is how you drive traffic from your list to your content." },
        ] },
      ]}
      promptText={`I have a piece of content: [paste your content transcript, blog post, or describe the video]. Please repurpose it into: 1) 3 TikTok/Reels script hooks (15–30 seconds each), 2) 5 slides for an Instagram carousel (with header text and body copy for each slide), 3) One LinkedIn post (under 200 words, bold first line), 4) One Facebook post (conversational, ends with a question), 5) One email newsletter (under 250 words, includes a CTA to see the full piece). Match my voice: [describe your tone].`}
      checklistItems={["I've identified my long-form 'source' piece for this repurposing cycle", "I've generated at least 5 platform-specific versions of the same core content", "Each version is adapted for its platform — not just copied and pasted", "I have a posting schedule for when each version goes out"]}
      reflectText={`Your best content has already been created. It's sitting in an old video or post that only a fraction of your audience saw. <span class="text-white font-bold">What's the best piece of content you've made in the last 6 months that most people never saw?</span>`}
      takeaways={["One piece of long-form content = 10+ short-form pieces. Stop creating from scratch every time.", "The repurposing hierarchy: long-form → video clips → carousels → text posts → email. Each stage requires less effort.", "Repurposing is not lazy — it's strategy. Your best ideas deserve to reach more people.", "AI can convert a transcript or article into 5 platform-specific formats in under 5 minutes."]}
      challengeTitle="Repurpose your best-performing post from the past 3 months."
      challengeBody="Find the post that got the most engagement, views, or saves. Paste it into Claude with the repurposing prompt above. Turn it into 5 formats. Schedule them across your platforms over the next 2 weeks. Track if the repurposed versions outperform new content."
      nextTitle="Building a Content Calendar"
      nextHref="/learn/skills/content-creation/building-a-content-calendar"
      nextMeta="Content Creation · Lesson 5 of 6 · 8 min"
    />
  );
}
