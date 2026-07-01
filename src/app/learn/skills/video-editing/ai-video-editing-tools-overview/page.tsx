import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "AI Video Editing Tools Overview — Video Editing | Cyberussell", description: "CapCut, Descript, Runway, and more — which AI video tools to use and when.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/video-editing/ai-video-editing-tools-overview" }, openGraph: { title: "AI Video Editing Tools Overview | Cyberussell", description: "The complete guide to AI video editing tools — what each one does and which to use.", url: "https://www.cyberussell.com/learn/skills/video-editing/ai-video-editing-tools-overview", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Video Editing"
      skillHref="/learn/skills/video-editing"
      lessonNum="1" lessonTotal="6"
      title="AI Video Editing Tools Overview"
      subtitle="You don't need Premiere Pro to edit great video. You need the right AI tools."
      tags={["Tools"]}
      readTime="10 min"
      objective="Choose the right AI video editing tool for your content type and workflow — and create your first account."
      sections={[
        { heading: "The AI Video Editing Landscape", body: "Traditional video editing (Premiere Pro, Final Cut) takes years to learn. AI video tools have compressed that learning curve dramatically. You can now produce professional-quality videos with auto-captions, noise reduction, and smart cuts in minutes — not hours.\n\nThe key is knowing which tool handles which task." },
        { heading: "The Core AI Video Tools", items: [
          { title: "CapCut", desc: "Best for: short-form content (TikTok, Reels, Shorts). Auto-captions, templates, background removal, beat sync. Free tier is generous. Mobile and desktop. The default tool for social video creators — fast, intuitive, powerful for its use case." },
          { title: "Descript", desc: "Best for: podcast video, talking-head content, interviews. Edit video by editing the text transcript — delete a sentence from the script and the video cuts automatically. Removes filler words ('um', 'uh') with one click. Game-changing for interview and educational content." },
          { title: "Runway", desc: "Best for: AI-generated visuals, background replacement, advanced effects. Text-to-video, image-to-video, green screen replacement without a green screen. More powerful than CapCut for visual effects. Steeper learning curve, but unmatched for creative work." },
          { title: "Adobe Premiere Pro (with Firefly AI)", desc: "Best for: professional long-form content when you need full control. Adobe has added AI features (Generative Extend, text-based editing, auto-color). Still the industry standard for serious video work. Worth learning if video editing is your primary service." },
          { title: "Opus Clip", desc: "Best for: automatically repurposing long videos into short clips. Upload a 30-minute video, it uses AI to find the best 10–15 moments and exports them as short-form clips with captions. Massive time saver for creators with long-form content." },
        ] },
      ]}
      promptText={`I'm [describe yourself — beginner editor / content creator / freelancer offering video services]. I create [type of content] for [platform(s)]. I want to use AI video editing tools to [your goal — edit faster / create better captions / repurpose content / etc.]. Based on this, recommend: 1) The one AI video tool I should start with and why, 2) The specific features I'll use most, 3) Whether the free tier will work for my needs, 4) What to learn first in that tool. Don't give me a list of options — give me one specific recommendation.`}
      checklistItems={["I've identified which type of content I primarily create", "I've chosen one AI video tool to start with", "I've created a free account and opened a project", "I know what the first feature I'll use is"]}
      reflectText={`Most people use the most complex tool when a simpler one would do the job faster. <span class="text-white font-bold">What type of video content do you create most often — and is the tool you're using actually the right one for that format?</span>`}
      takeaways={["You don't need Premiere Pro to make great videos. CapCut and Descript handle 90% of creator use cases.", "CapCut = short-form social. Descript = transcript-based editing. Runway = AI effects. Opus Clip = repurposing.", "Start with one tool. Get fast with it. Add a second only when you've hit its limits.", "AI video editing has compressed a 2-year learning curve into a 2-week one. The barrier is now almost zero."]}
      challengeTitle="Install your chosen video tool and edit your first clip."
      challengeBody="Download or sign up for the tool you've identified. Import a raw video clip from your camera roll or last recording session. Apply auto-captions. Export it. That's your first AI-edited video. It took minutes, not hours."
      nextTitle="Auto Captions and Subtitles"
      nextHref="/learn/skills/video-editing/auto-captions-and-subtitles"
      nextMeta="Video Editing · Lesson 2 of 6 · 8 min"
    />
  );
}
