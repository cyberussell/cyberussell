import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Writing for Social Media: Short-Form That Gets Attention — Writing & Copywriting | Cyberussell", description: "The rules of writing for TikTok, LinkedIn, and Facebook — with AI shortcuts for consistent posting.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting/writing-for-social-media" }, openGraph: { title: "Writing for Social Media | Cyberussell", description: "Short-form writing rules for TikTok, LinkedIn, and Facebook.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting/writing-for-social-media", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Writing & Copywriting"
      skillHref="/learn/skills/writing-copywriting"
      lessonNum="6" lessonTotal="7"
      title="Writing for Social Media: Short-Form That Gets Attention"
      subtitle="Social media writing has its own rules — and they're different from every other format."
      tags={["Social Media"]}
      readTime="8 min"
      objective="Write 5 social media captions using platform-specific formats — one for Facebook, one for LinkedIn, and three for TikTok/Instagram."
      sections={[
        { heading: "Why Social Media Writing is Different", body: "People don't come to social media to read. They come to be entertained, validated, or informed — quickly. Your caption has 1-2 seconds to hook them before they scroll.\n\nSocial writing is ruthlessly short, opinionated, and direct. No fluff. No hedging. Say the thing, then say what to do about it." },
        { heading: "Platform-Specific Rules", items: [
          { title: "Facebook", desc: "Longer-form performs well here, especially stories and personal posts. 1-3 short paragraphs. Questions at the end drive comments. Filipino audiences respond strongly to relatable personal stories and specific local context." },
          { title: "LinkedIn", desc: "One-line hook to expand. Break every paragraph after 1-2 sentences for white space. Lead with a bold insight or counterintuitive take. End with a question or a CTA. Professional but not corporate-speak." },
          { title: "TikTok / Instagram Reels caption", desc: "The caption supports the video — it doesn't replace it. Short. Punchy. Maybe just the hook line from your script and one CTA ('Follow for more', 'Comment [word] and I'll send you the link'). Keywords in captions help with search." },
          { title: "Instagram feed post", desc: "Front-load the first 1-2 lines before the 'more' cutoff — that's your hook. Tell a micro-story or share a specific insight. End with a call to action or question that drives saves and comments." },
        ] },
      ]}
      promptText={`Write 5 social media captions for [your niche/topic]. Context: I want to [grow my following / drive traffic / build trust / sell my offer]. My audience: [describe them]. My voice: [paste voice profile or describe tone]. Write: 1) One Facebook post (with a story hook and question at end), 2) One LinkedIn post (with a bold first line and insight), 3) Three TikTok/Instagram caption options (short and punchy). For each, tell me what emotion or reaction it's designed to trigger.`}
      checklistItems={["Each caption has a hook in the first line that doesn't require 'more' to be clicked", "I've matched the format and tone to the specific platform", "At least one post ends with a question or CTA that invites engagement"]}
      reflectText={`Read the first line of your last 5 social posts. <span class="text-white font-bold">Would you stop scrolling for any of them if you didn't already follow yourself?</span>`}
      takeaways={["The first line is everything on social media. If it doesn't hook, nothing else gets read.", "Every platform has different rules. What works on LinkedIn sounds wrong on TikTok and vice versa.", "Write for the emotion you want to trigger: curiosity, recognition, inspiration, or entertainment.", "Use AI to generate options — then pick and edit the one that sounds most like you."]}
      challengeTitle="Batch-write 7 captions in one AI session."
      challengeBody="Sit down for 30 minutes and use Claude to draft 7 social media captions for the next week. One session, batch-written. This is how consistent creators actually stay consistent — they don't write daily, they batch weekly."
      nextTitle="Editing AI Output: How to Spot and Fix What's Off"
      nextHref="/learn/skills/writing-copywriting/editing-ai-output"
      nextMeta="Writing & Copywriting · Lesson 7 of 7 · 10 min"
    />
  );
}
