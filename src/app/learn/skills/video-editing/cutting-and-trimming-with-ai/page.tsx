import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Cutting and Trimming with AI — Video Editing | Cyberussell", description: "Edit video by editing text. How AI-assisted cutting removes filler words, dead air, and bad takes automatically.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/video-editing/cutting-and-trimming-with-ai" }, openGraph: { title: "Cutting and Trimming with AI | Cyberussell", description: "Remove filler words and bad takes automatically with AI video editing.", url: "https://www.cyberussell.com/learn/skills/video-editing/cutting-and-trimming-with-ai", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Video Editing"
      skillHref="/learn/skills/video-editing"
      lessonNum="3" lessonTotal="6"
      title="Cutting and Trimming with AI"
      subtitle="Stop scrubbing timelines. Edit your video the way you edit a document."
      tags={["Editing", "Workflow"]}
      readTime="8 min"
      objective="Cut a raw talking-head video down to its best version using transcript-based editing — removing filler words, long pauses, and bad takes."
      sections={[
        { heading: "The Old Way vs The AI Way", body: "Old way: scrub through a timeline, find every 'um', manually cut it out, move clips around, repeat for 2 hours.\n\nAI way: Descript transcribes your video in 2 minutes. You see the whole video as a text document. Delete the words 'um', 'uh', or any sentence you don't want. The video updates automatically. 20 minutes of footage becomes a tight 5-minute video in under 30 minutes." },
        { heading: "Cutting Techniques with AI", items: [
          { title: "Transcript-based editing (Descript)", desc: "Upload your video → wait for transcription → edit the text. Descript automatically removes the corresponding video when you delete text. You can also use 'Remove Filler Words' to auto-delete all instances of 'um', 'uh', 'like', 'you know' with one click." },
          { title: "AI silence removal", desc: "Both CapCut and Descript can automatically detect and remove long pauses in your video. This alone can cut 20–30% of a raw recording's length without any manual editing. Essential for talking-head and tutorial content." },
          { title: "Multicam / B-roll cuts (CapCut)", desc: "For more advanced edits: use CapCut's auto-cut feature to sync cuts to music beats, or import B-roll clips and let CapCut suggest where to insert them over your talking-head footage." },
          { title: "Pacing check", desc: "After cutting, watch your video at 1.5x speed. If it still feels slow at 1.5x, cut more. A well-edited video should feel slightly rushed at 1x speed — that's how you know you've cut enough." },
        ] },
      ]}
      promptText={`I'm editing a [length]-minute talking-head video. Here's the transcript: [paste transcript]. Help me: 1) Identify the sections I should cut (dead air, repetition, off-topic tangents), 2) Find the strongest 'hooks' in this footage that should be at the very start, 3) Suggest where to add B-roll to break up the talking head, 4) Identify 3 short clips (under 60 seconds each) I could extract as standalone TikTok or Reel clips. Be specific about timestamps or transcript sections.`}
      checklistItems={["I've removed all 'um', 'uh', and filler words using AI", "I've cut all pauses longer than 1 second", "My video pacing feels slightly rushed at 1x speed", "I've identified at least one short clip that could be repurposed as a standalone social post"]}
      reflectText={`The raw footage is not the content. The edit is the content. <span class="text-white font-bold">How different would your videos feel if you cut 30% more than you currently do?</span>`}
      takeaways={["Transcript-based editing in Descript makes cutting video as fast as editing a document.", "Auto-remove filler words and silence in one click. You don't need to manually find every 'um'.", "A well-edited video should feel slightly rushed at 1x speed. That's the target pacing.", "After cutting, always look for 60-second clips you can repurpose — never waste good footage."]}
      challengeTitle="Edit a raw video down to its tightest version."
      challengeBody="Take your most recent raw recording. Import it into Descript or CapCut. Remove all filler words, all pauses over 1 second, and any section that doesn't add value. Watch the final cut at 1.5x speed. If it still feels slow, cut more. Compare the raw and edited lengths — aim to cut at least 25%."
      nextTitle="Voiceover and Audio Cleanup"
      nextHref="/learn/skills/video-editing/voiceover-and-audio-cleanup"
      nextMeta="Video Editing · Lesson 4 of 6 · 8 min"
    />
  );
}
