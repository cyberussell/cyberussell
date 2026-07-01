import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Short-Form Video Editing Flow — Video Editing | Cyberussell", description: "The end-to-end workflow for editing TikTok, Reels, and Shorts in under 30 minutes.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/video-editing/short-form-video-editing-flow" }, openGraph: { title: "Short-Form Video Editing Flow | Cyberussell", description: "Edit TikTok, Reels, and Shorts in under 30 minutes with this AI workflow.", url: "https://www.cyberussell.com/learn/skills/video-editing/short-form-video-editing-flow", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Video Editing"
      skillHref="/learn/skills/video-editing"
      lessonNum="5" lessonTotal="6"
      title="Short-Form Video Editing Flow"
      subtitle="Record once. Edit fast. Post consistently. This is the system."
      tags={["Workflow", "Short-Form"]}
      readTime="10 min"
      objective="Edit a complete short-form video from raw footage to post-ready using the 5-step AI editing flow — in under 30 minutes."
      sections={[
        { heading: "Why You Need a Repeatable Editing Flow", body: "Every minute you spend figuring out your process is a minute not spent creating. A repeatable editing flow means you don't make decisions about workflow every time — you just execute.\n\nOnce you have a flow that takes 20–30 minutes per video, consistency becomes realistic. Without it, editing feels like a project and you post less." },
        { heading: "The 5-Step Short-Form Editing Flow", items: [
          { title: "Step 1: Import and rough cut (5 min)", desc: "Import your footage into CapCut. Delete the sections before you started speaking well and after you finished your CTA. Rough cut: trim the obvious waste. Don't obsess over this — get the raw material in shape quickly." },
          { title: "Step 2: Audio cleanup (2 min)", desc: "Apply background noise removal. Adjust volume levels so your voice is clear. If your audio is clean from recording, skip this step entirely." },
          { title: "Step 3: Remove filler and tighten (5 min)", desc: "Use auto-remove filler words if available, or manually cut obvious 'ums', long pauses, and repeated takes. The goal is to cut the video to its essential content — nothing wasted." },
          { title: "Step 4: Add captions and overlays (10 min)", desc: "Generate auto-captions. Review and correct errors. Apply your caption style (font, color, animation). Add any text overlays, graphics, or on-screen keywords that reinforce your key points. Add background music if your content style uses it — keep it at 10–15% volume." },
          { title: "Step 5: Export and review (3 min)", desc: "Export at the highest quality your platform accepts (1080p for most). Watch it once at full speed in your phone before uploading. Check that captions are readable, audio is clear, and the hook lands in the first 3 seconds." },
        ] },
      ]}
      promptText={`I'm editing a short-form video about [your topic] for [platform]. Here's my raw script/transcript: [paste your script or describe the content]. Help me: 1) Identify the 5 most important sentences that should definitely stay in the final edit, 2) Suggest what to cut if I need to trim from [X] seconds to [Y] seconds, 3) Recommend 3 text overlay ideas to add visual engagement, 4) Write the on-screen hook text for the first 3 seconds.`}
      checklistItems={["I completed all 5 steps of the editing flow", "My total editing time was under 30 minutes", "I watched the final video on my phone before uploading", "The hook lands in the first 3 seconds without any intro or greeting"]}
      reflectText={`The editor who produces 3 videos per week consistently will always outgrow the editor who produces 1 perfect video per month. <span class="text-white font-bold">How much time is your current editing process taking — and where is most of that time going?</span>`}
      takeaways={["A repeatable 5-step flow eliminates decision fatigue and makes consistent posting realistic.", "30 minutes per short-form video is achievable with the right tools and process. Track your time.", "Always watch your export on your phone before posting. Desktop previews lie about mobile readability.", "Speed in editing comes from reducing decisions, not cutting corners. The same flow, every time."]}
      challengeTitle="Time your next full editing session."
      challengeBody="Edit your next short-form video using the 5-step flow above. Set a timer when you start and stop it when you've exported the final file. Note which step took the longest. That's where your biggest optimization opportunity is."
      nextTitle="Batch Processing: Edit Multiple Videos at Once"
      nextHref="/learn/skills/video-editing/batch-processing"
      nextMeta="Video Editing · Lesson 6 of 6 · 8 min"
    />
  );
}
