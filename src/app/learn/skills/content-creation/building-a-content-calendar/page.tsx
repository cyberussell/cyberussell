import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Building a Content Calendar — Content Creation | Cyberussell", description: "Plan a month of content in one session. Consistency beats creativity every time.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/content-creation/building-a-content-calendar" }, openGraph: { title: "Building a Content Calendar with AI | Cyberussell", description: "Plan a month of content in one session with AI.", url: "https://www.cyberussell.com/learn/skills/content-creation/building-a-content-calendar", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Content Creation"
      skillHref="/learn/skills/content-creation"
      lessonNum="5" lessonTotal="6"
      title="Building a Content Calendar"
      subtitle="Consistency beats creativity. A calendar makes consistency automatic."
      tags={["Planning", "Strategy"]}
      readTime="8 min"
      objective="Build a 30-day content calendar with AI — including content themes, post formats, and which platforms each piece goes to."
      sections={[
        { heading: "Why Most Creators Fail at Consistency", body: "Posting consistently doesn't require motivation or inspiration. It requires a system.\n\nCreators who post every day aren't more creative — they've removed the decision-making from their daily routine. They don't decide what to post; they just execute the plan they made in advance." },
        { heading: "The Content Calendar Framework", items: [
          { title: "Step 1: Choose your posting frequency", desc: "Be honest about what you can sustain. 3 times per week, every day, or twice a week. The right answer is the highest frequency you can maintain for 6 months without burning out. Start lower than you think you can handle." },
          { title: "Step 2: Assign content pillars", desc: "Content pillars are the 3–5 recurring topics that define your channel. Every post fits under one pillar. Example pillars: education, personal story, product/service, motivation, behind-the-scenes. Rotate through them so your feed isn't repetitive." },
          { title: "Step 3: Map content to dates", desc: "Assign specific content ideas to specific dates. Use AI to suggest which ideas to post on which days based on your pillars and frequency. Include the format (video, carousel, text, story) and the platform for each." },
          { title: "Step 4: Batch create and schedule", desc: "Once the calendar is built, set aside one day per week to create content for the following week. Then schedule everything using Buffer, Later, or Meta Business Suite. The calendar runs itself." },
        ] },
      ]}
      promptText={`Help me build a 30-day content calendar for [your niche and platform(s)]. My posting frequency: [X times per week]. My content pillars: [list 3-5 recurring themes — e.g., tips, personal stories, product highlights, motivation, behind-the-scenes]. My content formats: [video, carousel, text post, story, etc.]. From this list of ideas: [paste your idea list or describe your topic bank], map specific content to each posting day. Include: date, pillar, content idea, format, platform. Present as a table. Also suggest the best day and time to post based on my niche and platforms.`}
      checklistItems={["I've decided on a posting frequency I can sustain for 6 months", "I've defined 3–5 content pillars that cover what I post about", "I've mapped content to specific dates for the next 30 days", "I have a batching day scheduled each week to create and schedule that week's content"]}
      reflectText={`Consistency is what separates creators who grow from creators who stall. <span class="text-white font-bold">If your current posting schedule became a job requirement, would you pass the performance review?</span>`}
      takeaways={["Consistency beats creative inspiration every time. A calendar removes the daily decision of what to post.", "Content pillars give your feed coherence. 3–5 rotating themes keep things varied but on-brand.", "Batch creation + scheduling tools mean you can post daily while only creating content once a week.", "AI can fill a 30-day calendar from your idea bank in under 5 minutes. Your only job is to execute it."]}
      challengeTitle="Build your 30-day content calendar today."
      challengeBody="Use the prompt above to generate a full month of planned content. Put it in a spreadsheet or Notion table. Then schedule the first week's content in Buffer or Meta Business Suite today, so it posts automatically. You've just become a consistent creator."
      nextTitle="Growing an Audience: The Long Game"
      nextHref="/learn/skills/content-creation/growing-an-audience"
      nextMeta="Content Creation · Lesson 6 of 6 · 10 min"
    />
  );
}
