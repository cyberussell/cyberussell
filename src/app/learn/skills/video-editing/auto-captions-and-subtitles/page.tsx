import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Auto Captions and Subtitles — Video Editing | Cyberussell", description: "Add professional captions to any video in minutes. Why captions matter and how to do them right.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/video-editing/auto-captions-and-subtitles" }, openGraph: { title: "Auto Captions and Subtitles | Cyberussell", description: "Add professional captions to any video in minutes with AI.", url: "https://www.cyberussell.com/learn/skills/video-editing/auto-captions-and-subtitles", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Video Editing"
      skillHref="/learn/skills/video-editing"
      lessonNum="2" lessonTotal="6"
      title="Auto Captions and Subtitles"
      subtitle="85% of social video is watched with the sound off. Captions aren't optional — they're the whole game."
      tags={["Captions", "Accessibility"]}
      readTime="8 min"
      objective="Add professional AI-generated captions to a video using CapCut or Descript — with correct formatting, no errors, and styled for your brand."
      sections={[
        { heading: "Why Every Social Video Needs Captions", body: "85% of Facebook videos are watched on mute. A video without captions is invisible to that majority. Captions also increase watch time, improve accessibility, help non-native speakers follow along, and boost SEO on YouTube.\n\nAI caption tools have made this take under 5 minutes. There's no excuse to post without them." },
        { heading: "How to Add Captions with AI Tools", items: [
          { title: "CapCut (recommended for short-form)", desc: "Open your video → Auto Captions → Select language → Generate. CapCut produces captions in seconds. You can then customize font, size, color, animation, and position. The 'word-by-word' highlight style is the most engaging format for Reels and TikTok." },
          { title: "Descript (best for long-form)", desc: "Descript transcribes your entire video into a text document. You can then export subtitles as SRT or burn them directly into the video. It's more accurate than CapCut for longer content with complex vocabulary." },
          { title: "YouTube auto-captions (for YouTube)", desc: "YouTube generates captions automatically. You can then edit them in the YouTube Studio or download the SRT file and upload to other platforms. Accuracy depends on audio quality — clean audio = accurate captions." },
        ] },
        { heading: "Caption Best Practices", items: [
          { title: "Formatting rules", desc: "Never show more than 1–2 lines at a time. Keep each caption chunk under 8 words. Use high-contrast colors — white text with a black outline or background is readable on any background." },
          { title: "Always proofread", desc: "AI captions are 90–95% accurate but will miss names, slang, Filipino words, or technical terms. Always review and correct before posting. An embarrassing caption mistake undermines professional perception." },
        ] },
      ]}
      promptText={`I have a [length]-minute video on the topic of [topic]. Help me write the subtitles/captions for this key section: [paste the transcript or describe what you say in that section]. I need them formatted as: 1) Short chunks of 5–7 words per line, 2) Each caption timed naturally with how I speak, 3) Key words that should be emphasized. Also suggest: the best caption font style and color for my brand ([describe your brand colors]) on [TikTok/Instagram/YouTube].`}
      checklistItems={["I've generated AI captions for my video", "I've proofread the captions and corrected any errors", "My caption style (font, color, size) is consistent and readable on mobile", "I've positioned captions so they don't cover faces or key visuals"]}
      reflectText={`Think about the last video you watched with the sound off. <span class="text-white font-bold">Did the captions make you stay, or did you keep scrolling?</span>`}
      takeaways={["85% of social video is watched muted. Captions are not optional — they're your content.", "CapCut auto-captions work in seconds for short-form. Descript is better for long-form accuracy.", "Always proofread AI captions — especially for names, slang, and non-English words.", "Word-by-word highlight captions increase watch time by keeping viewers visually engaged."]}
      challengeTitle="Add captions to your last 3 uncaptioned videos."
      challengeBody="Find the last 3 videos you posted without captions. Add AI captions using CapCut or Descript, proofread them, and repost or add them as updated versions. From this point forward, never post a video without captions."
      nextTitle="Cutting and Trimming with AI"
      nextHref="/learn/skills/video-editing/cutting-and-trimming-with-ai"
      nextMeta="Video Editing · Lesson 3 of 6 · 8 min"
    />
  );
}
