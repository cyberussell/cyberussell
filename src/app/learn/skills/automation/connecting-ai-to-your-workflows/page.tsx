import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Connecting AI to Your Workflows — Automation | Cyberussell", description: "Add Claude or ChatGPT to your automations. How AI-powered workflows work and what they can do.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/automation/connecting-ai-to-your-workflows" }, openGraph: { title: "Connecting AI to Your Workflows | Cyberussell", description: "Add AI to your automations — how to integrate Claude or ChatGPT into Zapier or Make workflows.", url: "https://www.cyberussell.com/learn/skills/automation/connecting-ai-to-your-workflows", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Automation"
      skillHref="/learn/skills/automation"
      lessonNum="3" lessonTotal="6"
      title="Connecting AI to Your Workflows"
      subtitle="Automation moves data. AI transforms it. Together, they're powerful."
      tags={["AI", "Integration"]}
      readTime="10 min"
      objective="Build an automation that includes an AI step — where Claude or ChatGPT generates, categorizes, or transforms content as part of the workflow."
      sections={[
        { heading: "Why AI + Automation Is Different", body: "Basic automation moves data from point A to point B. 'New form submission → add to spreadsheet.' Useful, but limited.\n\nAI-powered automation transforms data in transit. 'New customer support email arrives → AI categorizes it and drafts a response → sends to the right team member for review.' The AI adds judgment and language capability that rules-based automation can't replicate." },
        { heading: "What AI Can Do Inside an Automation", items: [
          { title: "Content generation", desc: "A new contact joins your list → AI writes a personalized welcome email based on their signup data. A product is listed in your store → AI writes the product description. A sales call ends → AI generates a follow-up email from the call notes." },
          { title: "Classification and routing", desc: "A new support ticket arrives → AI classifies it (billing / technical / general) and routes it to the right inbox. A new email arrives → AI determines if it's a lead, a client, or spam and tags it accordingly." },
          { title: "Summarization", desc: "A long article is scraped → AI summarizes it in 3 bullets and sends it to your Slack channel. A weekly analytics report arrives → AI highlights the 3 most important changes and emails you a plain-language summary." },
          { title: "Data extraction", desc: "A PDF invoice arrives by email → AI extracts vendor, amount, and due date and adds them to your accounting spreadsheet. A job posting is found → AI extracts key requirements and adds them to your tracking sheet." },
        ] },
        { heading: "How to Add AI Steps in Zapier and Make", items: [
          { title: "Zapier", desc: "Zapier has a built-in 'ChatGPT' action that lets you send a prompt to OpenAI and use the response in subsequent steps. You can also use the 'Webhooks' step to call the Claude API or OpenAI API directly with a custom prompt that includes data from earlier steps." },
          { title: "Make", desc: "Make has an OpenAI module and supports HTTP requests to any API. Use the OpenAI or Anthropic module, write your prompt, include dynamic data from previous steps using the {variable} syntax, and pass the response to your next action." },
        ] },
      ]}
      promptText={`I want to add an AI step to my automation. Here's my current workflow: [describe what your automation currently does]. Here's where I want AI to add value: [describe what transformation, generation, or classification you want AI to do]. I'm using [Zapier / Make]. Help me: 1) The exact prompt I should use in the AI step (including what dynamic data from earlier steps to include), 2) The step-by-step setup in my specific tool, 3) How to handle cases where the AI response isn't what I expected, 4) One example of the input and output for this specific AI step.`}
      checklistItems={["I've identified a clear AI transformation step that adds value to an existing automation", "I've written the specific prompt that will be sent to AI in my workflow", "I've tested the automation with at least 3 real examples to verify the AI output quality", "I have a review step or fallback for when the AI output doesn't meet my standards"]}
      reflectText={`An AI that runs automatically on every incoming email, lead, or order — doing the first 80% of a task before you ever see it — is not science fiction. <span class="text-white font-bold">What would that look like in your specific business?</span>`}
      takeaways={["AI + automation = data moves automatically AND gets transformed by intelligence along the way.", "AI steps work best for: content generation, classification/routing, summarization, and data extraction.", "Always include a human review step when AI output affects client-facing communications.", "The prompt in your AI automation step must include dynamic data from earlier steps — not just a static instruction."]}
      challengeTitle="Add an AI step to an existing automation."
      challengeBody="Take the automation you built in the last lesson. Add one AI step to it using Zapier's ChatGPT action or Make's OpenAI module. Example: if your automation adds form submissions to a spreadsheet, add an AI step that writes a personalized follow-up email draft from the form data. Test it 3 times with different inputs. Review the output quality."
      nextTitle="Automating Content Workflows"
      nextHref="/learn/skills/automation/automating-content-workflows"
      nextMeta="Automation · Lesson 4 of 6 · 8 min"
    />
  );
}
