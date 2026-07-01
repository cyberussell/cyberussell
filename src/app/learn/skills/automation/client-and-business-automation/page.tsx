import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Client and Business Automation — Automation | Cyberussell", description: "Automate client onboarding, invoicing, follow-ups, and reporting to run your business on autopilot.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/automation/client-and-business-automation" }, openGraph: { title: "Client and Business Automation | Cyberussell", description: "Automate client onboarding, invoicing, and follow-ups to run your business more efficiently.", url: "https://www.cyberussell.com/learn/skills/automation/client-and-business-automation", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Automation"
      skillHref="/learn/skills/automation"
      lessonNum="5" lessonTotal="6"
      title="Client and Business Automation"
      subtitle="Your business should run whether you're working or not. Automation makes that possible."
      tags={["Business", "Client Work"]}
      readTime="10 min"
      objective="Build at least one client-facing business automation — onboarding, follow-up, or invoicing — that runs without your manual involvement."
      sections={[
        { heading: "The Business Automations Every Freelancer Needs", body: "Client and business automation isn't about being impersonal. It's about making sure nothing falls through the cracks — every client gets followed up with, every invoice gets sent on time, every project has a clear process.\n\nThe best client experiences are often the result of excellent automation, not more manual time." },
        { heading: "The High-Impact Business Automations", items: [
          { title: "Client onboarding sequence", desc: "Trigger: client signs contract or pays deposit. Actions: send welcome email, send onboarding questionnaire (Typeform or Google Form), add to project tracker, create client folder in Drive, send calendar invite for kickoff call. Without automation, these 5 steps take 30+ minutes. Automated, they happen in seconds." },
          { title: "Invoice and payment follow-up", desc: "Trigger: invoice is created in your invoicing tool (Wave, FreshBooks, QuickBooks). Actions: 7 days before due date → send a friendly payment reminder. Day of due date → send a second reminder. 3 days overdue → escalate with a more direct message. Never forget to follow up on payments again." },
          { title: "Project milestone notifications", desc: "Trigger: you mark a task complete in your project management tool (Trello, ClickUp, Notion). Action: automatically notify the client that this milestone is done and what the next step is. Keeps clients informed without you manually sending updates." },
          { title: "Testimonial and review requests", desc: "Trigger: project marked complete. Wait 3 days. Action: send automated testimonial request with a link to your Google review page or a short form. Testimonials are the highest-ROI marketing content for service businesses and most freelancers never ask." },
        ] },
      ]}
      promptText={`I'm a freelancer/small business offering [your service]. My current client process is: [describe each step from first contact to project completion to follow-up]. The manual tasks I do for every client that I want to automate are: [list them]. Help me: 1) Design a client onboarding automation using [Zapier / Make] that triggers when [describe your trigger — form submitted, payment received, contract signed], 2) Write the welcome email copy that goes out automatically, 3) Set up a payment follow-up sequence for invoices, 4) Create a project completion and testimonial request flow. Include the specific tools I should use for each step.`}
      checklistItems={["New clients receive an automated onboarding sequence within minutes of signing up", "Invoice payment reminders run automatically on a set schedule", "Completed projects automatically trigger a testimonial/review request", "I have a system to track which automations are running and whether they're working correctly"]}
      reflectText={`Every time you manually send a welcome email or chase a late invoice, you're choosing to do a job that automation can do better and faster. <span class="text-white font-bold">How much time per week do you spend on tasks that run the same way every single client?</span>`}
      takeaways={["Client onboarding, invoice follow-ups, milestone notifications, and testimonial requests are all automatable.", "Automated follow-ups are more consistent than manual ones — clients never fall through the cracks.", "Testimonial request automation is the most underused tool in freelance marketing. Build it today.", "The measure of a good business automation is: the client experience improves, and you spend less time on admin."]}
      challengeTitle="Build your client onboarding automation."
      challengeBody="Map your current onboarding process on paper. Identify every step that is the same for every client. Build a Zapier sequence that handles those steps automatically when triggered by a form submission, payment, or contract signature. Test it on a real or mock client. Time how long it takes versus doing it manually."
      nextTitle="Building an AI Research Agent"
      nextHref="/learn/skills/automation/building-an-ai-research-agent"
      nextMeta="Automation · Lesson 6 of 6 · 12 min"
    />
  );
}
