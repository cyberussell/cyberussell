import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "What's Worth Automating — Automation | Cyberussell", description: "Not everything should be automated. How to identify the tasks that actually give you time back.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/automation/whats-worth-automating" }, openGraph: { title: "What's Worth Automating | Cyberussell", description: "Identify which tasks in your business should be automated first.", url: "https://www.cyberussell.com/learn/skills/automation/whats-worth-automating", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Automation"
      skillHref="/learn/skills/automation"
      lessonNum="1" lessonTotal="6"
      title="What's Worth Automating"
      subtitle="Automating the wrong things wastes time. Automating the right ones gives you your life back."
      tags={["Strategy", "Fundamentals"]}
      readTime="10 min"
      objective="Identify your top 3 automation opportunities — tasks that are repetitive, rule-based, and worth more than the time it takes to automate them."
      sections={[
        { heading: "The Automation Decision Framework", body: "Not everything should be automated. Automation requires time to set up, maintain when things break, and can introduce errors if applied to tasks that actually need human judgment.\n\nThe best candidates for automation are tasks that are repetitive (you do them the same way every time), rule-based (no judgment required), high-volume (you do them often enough that the setup pays off), and low-risk (if the automation makes an error, it's fixable)." },
        { heading: "The 4 Categories of Automatable Work", items: [
          { title: "Data entry and transfer", desc: "Moving information from one place to another. Customer info from a form to a spreadsheet. Invoice data to an accounting tool. Order details to a fulfilment system. If you're copying and pasting data manually more than 3 times a week, automate it." },
          { title: "Notifications and follow-ups", desc: "Sending the same type of message based on a trigger. New client? Send a welcome email. Invoice unpaid after 7 days? Send a reminder. Project completed? Request a review. All of these can be automated." },
          { title: "Content and report generation", desc: "Creating the same type of document over and over with different data. Weekly reports. Social media captions from a template. Personalized proposals. AI + automation can generate these in seconds." },
          { title: "File management", desc: "Organizing, naming, and moving files based on rules. Download a file → rename it → move it to the right folder → notify a team member. These workflows run without you once set up." },
        ] },
        { heading: "The Automation ROI Test", body: "Before building any automation, ask: how many minutes per week does this task take × how many weeks until the automation pays for the setup time?\n\nA task that takes 5 minutes per day (25 min/week) and takes 2 hours to automate pays off in about 5 weeks. That's worth it. A task that takes 2 minutes a week and takes 4 hours to automate pays off in 2 years. Skip it." },
      ]}
      promptText={`Help me identify my best automation opportunities. Here's a description of my typical work week: [describe what you spend your time on — every repetitive, boring, or manual task you do]. For each task I mention, evaluate: 1) Is it actually automatable (repetitive, rule-based, no judgment required)?, 2) How much time could it save per week if automated?, 3) How complex is the automation to build (simple / medium / complex)?, 4) What tool would I use to automate it? Rank my top 3 automation opportunities by ROI.`}
      checklistItems={["I've listed every repetitive task I do more than 3 times per week", "I've applied the ROI test to identify which automations are worth building", "I've identified my top 3 automation opportunities by time saved vs setup effort", "I understand which tasks should NOT be automated because they require judgment"]}
      reflectText={`Most people know what they should automate — they just haven't done it because starting feels harder than the repetitive task. <span class="text-white font-bold">What's the one manual task you've complained about the most this month? Should it be automated?</span>`}
      takeaways={["Automate tasks that are repetitive, rule-based, high-volume, and low-risk. Skip everything else.", "The ROI test: time saved per week ÷ setup time = weeks until payoff. Under 8 weeks = build it.", "Data entry, notifications, report generation, and file management are the highest-ROI automation categories.", "Automation that introduces errors in important processes is worse than doing the task manually."]}
      challengeTitle="List every task you repeat more than 3 times per week."
      challengeBody="Open a blank document. List every single task you do more than 3 times per week. Don't filter — just list. Then paste the list into Claude with the prompt above. Your top 3 automation opportunities will be immediately obvious. Pick the highest-ROI one and build it in the next lesson."
      nextTitle="No-Code Automation Tools"
      nextHref="/learn/skills/automation/no-code-automation-tools"
      nextMeta="Automation · Lesson 2 of 6 · 10 min"
    />
  );
}
