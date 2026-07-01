import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Voiceover and Audio Cleanup — Video Editing | Cyberussell", description: "Clean up noisy audio and add professional voiceovers with AI. Sound quality makes or breaks video.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/video-editing/voiceover-and-audio-cleanup" }, openGraph: { title: "Voiceover and Audio Cleanup | Cyberussell", description: "Clean noisy audio and add professional voiceovers with AI tools.", url: "https://www.cyberussell.com/learn/skills/video-editing/voiceover-and-audio-cleanup", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Video Editing"
      skillHref="/learn/skills/video-editing"
      lessonNum="4" lessonTotal="6"
      title="Voiceover and Audio Cleanup"
      subtitle="Viewers will forgive bad video. They will not forgive bad audio."
      tags={["Audio", "Quality"]}
      readTime="8 min"
      objective="Clean up a noisy audio recording using AI — and understand when to use AI voiceover vs recording your own voice."
      sections={[
        { heading: "Why Audio is More Important Than Video Quality", body: "Studies consistently show that viewers will tolerate low video quality but immediately click away from bad audio. Background noise, echo, and low recording levels all signal 'amateur' to your audience — even if your content is excellent.\n\nAI audio cleanup has made pro-quality audio accessible to anyone, regardless of their microphone budget." },
        { heading: "AI Audio Cleanup Tools", items: [
          { title: "Adobe Podcast (free)", desc: "Adobe's free web tool removes background noise, echo, and room acoustics from any audio file. Upload your recording and it sounds like you recorded in a studio. Works on voice recordings up to 1 hour. The best free audio cleanup tool available." },
          { title: "Descript (audio cleanup)", desc: "Descript includes background noise removal built into its editing workflow. Apply it in one click after importing your video. Convenient if you're already using Descript for editing." },
          { title: "ElevenLabs (AI voiceover)", desc: "If you need a voiceover for a video you didn't record yourself, ElevenLabs generates realistic AI voices in multiple languages. You can also clone your own voice — record 30 seconds of audio and ElevenLabs generates future voiceovers in your voice. Useful for repurposing content or creating faceless videos." },
          { title: "CapCut AI voice effects", desc: "CapCut includes voice effects that can alter pitch, add reverb, or apply preset voice styles. Useful for creative content but not for professional voiceovers." },
        ] },
        { heading: "Recording Better Audio Without Expensive Gear", items: [
          { title: "Record in a small room with fabric", desc: "Bedrooms with clothing, blankets, and carpets absorb echo. Bathrooms and empty rooms cause reverb. If you have to pick one low-cost upgrade, a budget lavalier microphone (₱500–₱1,500) beats a phone placed 1 meter away." },
          { title: "AI cleaning is not a crutch", desc: "AI can remove background noise, but it can't recover severely clipped or distorted audio. Record as clean as possible first, then use AI cleanup as a final polish — not a substitute for decent recording conditions." },
        ] },
      ]}
      promptText={`I have a video with audio problems. Describe the issue: [background fan noise / room echo / low volume / wind noise / intermittent cutting out]. Help me: 1) Understand which AI tool will fix this specific problem, 2) The step-by-step process to clean the audio using that tool, 3) What settings to adjust for my use case (YouTube / TikTok / podcast), 4) How to prevent this issue in future recordings without buying expensive equipment.`}
      checklistItems={["I've run my latest audio through Adobe Podcast or Descript cleanup", "My audio is free of audible background noise and echo", "I understand what caused the audio issue and how to prevent it", "I've tested a short AI voiceover tool to understand its capabilities"]}
      reflectText={`Viewers have made a decision about your production quality within the first 5 seconds of audio. <span class="text-white font-bold">What does your audio say about you right now?</span>`}
      takeaways={["Bad audio kills retention faster than bad video. Audio is your first priority, not visual quality.", "Adobe Podcast is the best free audio cleanup tool — it works on any microphone, any background noise.", "AI voiceover (ElevenLabs) opens up faceless video content and content in multiple languages.", "Record in fabric-rich rooms, use a basic lav mic, then polish with AI cleanup. No studio needed."]}
      challengeTitle="Run your last video's audio through Adobe Podcast."
      challengeBody="Go to podcast.adobe.com (Adobe Enhance Speech), upload the audio from your last recording. Listen to the before and after. The difference will motivate you to clean every video's audio from now on. Save the cleaned audio and replace it in your last video."
      nextTitle="Short-Form Video Editing Flow"
      nextHref="/learn/skills/video-editing/short-form-video-editing-flow"
      nextMeta="Video Editing · Lesson 5 of 6 · 10 min"
    />
  );
}
