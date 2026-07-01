import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Running Day-to-Day Operations — Business | Cyberussell", description: "Build systems for project management, client communication, and task management so your business runs consistently.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/business/running-day-to-day-operations" }, openGraph: { title: "Running Day-to-Day Operations | Cyberussell", description: "Build systems for project management, client communication, and daily business operations.", url: "https://www.cyberussell.com/learn/skills/business/running-day-to-day-operations", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Business"
      skillHref="/learn/skills/business"
      lessonNum="6" lessonTotal="7"
      title="Running Day-to-Day Operations"
      subtitle="A business that depends entirely on you being in it every moment isn't a business — it's a job."
      tags={["Operations", "Systems"]}
      readTime="8 min"
      objective="Build a simple operational system — project management, client communication, and task management — so your business runs consistently without improvising every day."
      sections={[
        { heading: "Why Systems Beat Willpower", body: "Business consistency doesn't come from motivation or discipline. It comes from systems — repeatable processes that produce the same outcome every time, regardless of how you feel that day.\n\nAI can help you build and document these systems faster than ever. Your goal is to run your business from a playbook, not from memory and improvisation." },
        { heading: "The 3 Core Operational Systems", items: [
          { title: "Project management", desc: "How you track what needs to be done, by when, and for whom. Tools: Notion (free, flexible), Trello (simple boards), ClickUp (more features). Even a Google Sheet works. What matters: every project has a clear status, due date, and next action. Nothing should exist only in your head." },
          { title: "Client communication", desc: "A consistent process for how you communicate with clients: onboarding questionnaire, weekly update schedule, revision process, final delivery checklist. When clients know what to expect and when, they trust you more and you spend less time managing their anxiety." },
          { title: "Standard Operating Procedures (SOPs)", desc: "A written description of how you do things — the steps you take every time you onboard a client, deliver a project, or send an invoice. SOPs mean you can delegate tasks, train future team members, and maintain quality when you're overwhelmed." },
        ] },
        { heading: "AI-Assisted Operations", items: [
          { title: "Client communication templates", desc: "Ask Claude to write templates for: project kickoff email, weekly update, revision request, final delivery, invoice follow-up, testimonial request. These get personalized per client but start from a template. Saves 20+ minutes per client per project." },
          { title: "SOPs for your main services", desc: "Ask Claude: 'Help me write a step-by-step SOP for [your main service] from client inquiry to final delivery.' Then refine based on how you actually do it. Document your best process once — never improvise the same workflow again." },
        ] },
      ]}
      promptText={`Help me build a simple operations system for my [describe your business — freelance service / small agency / product business]. I currently have [number of active clients]. The main services I deliver are: [list them]. My biggest operational pain points are: [describe what's chaotic or inconsistent]. Help me: 1) Choose the right project management tool for my situation and set it up simply, 2) Write a project kickoff email template for new clients, 3) Write a step-by-step SOP for my most common service, 4) Design a weekly routine (what operational tasks I do on which day) that keeps everything running smoothly, 5) Identify what I should do when I feel overwhelmed so nothing falls through the cracks.`}
      checklistItems={["Every active project has a clear status and next action in my project management tool", "I have written templates for my most common client communications", "I have at least one written SOP for my main service", "I have a weekly operational routine that keeps recurring tasks on schedule"]}
      reflectText={`The most successful freelancers and small business owners aren't working harder than everyone else. They've built better systems than everyone else. <span class="text-white font-bold">Which part of your business requires the most improvisation every week — and what would it look like to systematize that?</span>`}
      takeaways={["Systems beat willpower. Build processes that produce the same outcome every time, not just when you're motivated.", "Every project needs a status, due date, and next action in a tool — not in your head.", "SOPs take 30 minutes to write and save hours every time you use them. Start with your most common service.", "Client communication templates that get personalized are better than improvising every email from scratch."]}
      challengeTitle="Write a client kickoff email template and save it."
      challengeBody="Ask Claude: 'Write me a professional client project kickoff email template for [your service]. It should welcome the client, confirm the scope and timeline, explain how we'll communicate, and tell them the next step they need to take.' Edit it to match your voice. Save it as a Google Doc template. Use it for your next client."
      nextTitle="Scaling: When and How to Grow"
      nextHref="/learn/skills/business/scaling-when-and-how-to-grow"
      nextMeta="Business · Lesson 7 of 7 · 10 min"
    />
  );
}
