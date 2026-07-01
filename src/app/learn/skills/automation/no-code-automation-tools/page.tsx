import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "No-Code Automation Tools — Automation | Cyberussell", description: "Zapier, Make, and n8n — what each tool does and which to use for your workflow.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/automation/no-code-automation-tools" }, openGraph: { title: "No-Code Automation Tools | Cyberussell", description: "Zapier, Make, and n8n — the no-code tools that connect your apps and automate workflows.", url: "https://www.cyberussell.com/learn/skills/automation/no-code-automation-tools", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Automation"
      skillHref="/learn/skills/automation"
      lessonNum="2" lessonTotal="6"
      title="No-Code Automation Tools"
      subtitle="You don't need to code to automate. These tools connect your apps with drag-and-drop."
      tags={["Tools", "No-Code"]}
      readTime="10 min"
      objective="Choose the right no-code automation tool for your workflow and set up your first simple automation without writing any code."
      sections={[
        { heading: "How No-Code Automation Works", body: "No-code automation tools work by connecting apps through triggers and actions.\n\nTrigger: something that starts the automation. 'A new row is added to my Google Sheet.' 'A new email arrives in Gmail.' 'A form is submitted on my website.'\n\nAction: what happens in response. 'Send a Slack message.' 'Add to a CRM.' 'Create a task in Trello.' 'Send an email.'\n\nYou connect trigger → action in a visual interface. No code required." },
        { heading: "The Three Main Tools", items: [
          { title: "Zapier (easiest to use)", desc: "The most beginner-friendly automation tool. 6,000+ app integrations. Visual interface with pre-built templates for common automations. Free tier: 100 tasks/month, 5 active Zaps. Best for: getting started, simple 2-step automations, connecting popular SaaS tools. Paid tiers unlock multi-step automations and more tasks." },
          { title: "Make (most powerful, free tier)", desc: "Formerly Integromat. More complex visual interface but more powerful for multi-step workflows. Free tier: 1,000 operations/month, unlimited scenarios. Better for complex automation with conditional logic, data transformation, and multiple branches. Steeper learning curve than Zapier but much cheaper at scale." },
          { title: "n8n (open-source, most flexible)", desc: "Open-source automation tool you can self-host (free) or use their cloud service. Best for: users with technical ability who want full control, no limits on workflows, or need to build custom AI automations. Has a growing library of AI-specific nodes for integrating LLMs into workflows." },
        ] },
        { heading: "Which Tool to Start With", body: "Start with Zapier if you want the easiest experience and you're connecting common tools (Gmail, Google Sheets, Slack, Notion, Trello).\n\nStart with Make if you need complex multi-step workflows or want more free operations.\n\nSwitch to n8n later if you outgrow both and need advanced AI workflows or self-hosting." },
      ]}
      promptText={`I want to build my first automation. Here's what I want to automate: [describe the trigger and desired action — e.g., 'When someone fills out my Google Form, I want to automatically add their info to a Google Sheet AND send them a welcome email.']. I want to use [Zapier / Make]. Help me: 1) The step-by-step setup instructions for this specific automation in this tool, 2) What permissions and app connections I need to set up first, 3) How to test the automation before turning it on live, 4) What could go wrong and how to catch errors.`}
      checklistItems={["I've created accounts for the apps I want to connect", "I've built and tested my first automation end-to-end in a test environment", "My automation has run successfully at least 3 times without errors", "I know how to check the automation's history to see if it's running correctly"]}
      reflectText={`The first automation you build will show you what's been possible the entire time. <span class="text-white font-bold">If you could set up one thing to happen automatically tonight while you sleep, what would it be?</span>`}
      takeaways={["No-code automation = trigger + action, connected visually. No programming required.", "Zapier: easiest, 6000+ integrations, good free tier. Make: more powerful, better free tier. n8n: most flexible, self-hostable.", "Always test your automation in a safe environment before turning it on live.", "The goal of your first automation is not to be impressive — it's to be working and saving you time."]}
      challengeTitle="Build your first automation today."
      challengeBody="Choose the simplest automation from your list in the previous lesson. Sign up for Zapier (free). Find the trigger app and action app. Use the 'Zap template' search to see if a pre-built version exists — it usually does. Set it up, test it, and turn it on. Note how many minutes per week this saves. That number is your automation ROI in action."
      nextTitle="Connecting AI to Your Workflows"
      nextHref="/learn/skills/automation/connecting-ai-to-your-workflows"
      nextMeta="Automation · Lesson 3 of 6 · 10 min"
    />
  );
}
