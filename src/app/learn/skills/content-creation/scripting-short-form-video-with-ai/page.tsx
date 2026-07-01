import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Scripting Short-Form Video with AI — Content Creation | Cyberussell", description: "Write TikTok and Reels scripts that hook in 3 seconds and keep viewers watching. With AI.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/content-creation/scripting-short-form-video-with-ai" }, openGraph: { title: "Scripting Short-Form Video with AI | Cyberussell", description: "Hook in 3 seconds. Keep them watching. Write winning short-form scripts with AI.", url: "https://www.cyberussell.com/learn/skills/content-creation/scripting-short-form-video-with-ai", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Content Creation"
      skillHref="/learn/skills/content-creation"
      lessonNum="3" lessonTotal="6"
      title="Scripting Short-Form Video with AI"
      subtitle="Hook in 3 seconds. Keep them watching. Short-form is a skill — and AI makes it learnable."
      tags={["Video", "Scripting"]}
      readTime="10 min"
      objective="Write a complete 60-second video script using AI — with a hook, body, and CTA that follows short-form best practices."
      sections={[
        { heading: "Why Short-Form Scripts Need Structure", body: "Most creators improvise short-form video and wonder why the watch time drops after 5 seconds. Short-form has a formula. Every viral video follows a version of it, even if the creator doesn't know it.\n\nAI makes it easy to apply the formula consistently — so you can focus on delivery and personality instead of structure." },
        { heading: "The Short-Form Script Formula", items: [
          { title: "The Hook (0–3 seconds)", desc: "Your entire video lives or dies here. The hook must stop the scroll immediately. Best hook types: bold claim ('Most people do this wrong'), curiosity gap ('I didn't believe this until I tried it'), personal story start ('I lost my job and built this instead'), or challenge/controversy ('This advice is killing your growth'). Deliver it looking directly at camera, no intro, no greeting." },
          { title: "The Body (3–50 seconds)", desc: "Deliver the promised value as fast as possible. Use pattern interrupts (cuts, text overlays, B-roll) every 3–5 seconds to reset attention. One idea per sentence. No meandering. Every line must earn the next 3 seconds of watch time." },
          { title: "The CTA (last 5–10 seconds)", desc: "Tell them exactly what to do next. 'Follow for more', 'Comment [word] and I'll send you the link', 'Watch this next'. The best CTAs create a loop — they give the viewer a reason to take the next action beyond just liking the video." },
        ] },
        { heading: "How to Use AI to Script Multiple Videos Fast", body: "Give Claude your niche, your content idea, and your voice profile. Ask for 3 script variations — one starting with a bold claim, one with a story, one with a question. Pick the best one and deliver it.\n\nYou can batch 5 scripts in a single 20-minute session, then record all 5 back-to-back. This is how prolific creators maintain output without burning out." },
      ]}
      promptText={`Write a 60-second short-form video script for [TikTok/Instagram Reels] on the topic: [your topic]. My niche: [your niche]. My audience: [describe them]. My voice: [describe your tone — casual, authoritative, funny, etc.]. Write 3 versions with different hooks: Version 1: Bold claim hook. Version 2: Story hook. Version 3: Question hook. For each version: 1) The hook line (first 1-2 sentences), 2) The body (bullet points for each key point), 3) The CTA (final line). Keep each script under 150 words. Format for teleprompter use.`}
      checklistItems={["My hook is under 3 seconds and doesn't start with 'Hey guys' or 'Today I'm going to'", "Every sentence in the body earns the next 3 seconds of watch time", "My CTA tells the viewer exactly what to do and why they should bother", "I've written at least 3 script variations to pick from"]}
      reflectText={`Watch the first 3 seconds of your last 5 videos. <span class="text-white font-bold">If a stranger saw those first 3 seconds without any context, would they stop scrolling?</span>`}
      takeaways={["The hook is everything in short-form. Spend 50% of your scripting time on the first 3 seconds.", "Short-form has a formula: Hook → Body (one idea per sentence) → CTA. AI helps you apply it every time.", "Batch 5 scripts in one AI session, then record all 5 back-to-back. Volume compounds faster than perfection.", "Pattern interrupts (cuts, text, B-roll) every 3–5 seconds reset attention and keep watch time high."]}
      challengeTitle="Script your next 5 videos in one 20-minute session."
      challengeBody="Open Claude, pick 5 content ideas from your idea bank, and generate one script for each. Use the prompt above. Don't edit them heavily — record all 5 today or tomorrow. Your goal is volume and consistency, not perfection."
      nextTitle="Repurposing Content: One Piece, Many Platforms"
      nextHref="/learn/skills/content-creation/repurposing-content"
      nextMeta="Content Creation · Lesson 4 of 6 · 8 min"
    />
  );
}
