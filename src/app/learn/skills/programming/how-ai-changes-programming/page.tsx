import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "How AI Changes Programming — Programming | Cyberussell", description: "AI doesn't replace programmers — it changes what programming means. What you need to know before writing your first line.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming/how-ai-changes-programming" }, openGraph: { title: "How AI Changes Programming | Cyberussell", description: "What AI-assisted programming means for beginners and what you actually need to learn.", url: "https://www.cyberussell.com/learn/skills/programming/how-ai-changes-programming", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Programming"
      skillHref="/learn/skills/programming"
      lessonNum="1" lessonTotal="7"
      title="How AI Changes Programming"
      subtitle="You don't need to memorize syntax. You need to think like a programmer."
      tags={["Fundamentals", "AI"]}
      readTime="10 min"
      objective="Understand how AI-assisted programming works and what skills matter most for a non-technical beginner who wants to build real things."
      sections={[
        { heading: "What AI Changed About Learning to Code", body: "Before AI, learning to code meant memorizing syntax, reading documentation, and spending hours debugging cryptic error messages. The learning curve was steep and the dropout rate was high.\n\nAI changed this. Claude, GitHub Copilot, and similar tools can write code, explain error messages in plain language, and help you build things you'd never have been able to build alone. The skill that matters most now is not memorizing syntax — it's knowing how to describe what you want." },
        { heading: "What You Still Need to Understand", items: [
          { title: "Concepts over syntax", desc: "AI generates syntax. You need to understand concepts: what a variable is, what a function does, what an API call is, what a database query looks like. You don't need to write them from memory — but you need to read and understand what AI generates." },
          { title: "How to describe what you want", desc: "The biggest skill in AI-assisted programming is writing clear, specific prompts. 'Make me an app' produces useless output. 'Build a form that collects a name and email, validates that the email field contains an @ symbol, and displays a success message after submission' produces working code." },
          { title: "How to read and verify AI output", desc: "AI writes code that looks right but sometimes isn't. You need enough understanding to test whether it works, spot obvious issues, and know when to ask for an explanation before using generated code." },
          { title: "How to debug with AI help", desc: "When code breaks (and it will), paste the error message and the relevant code into Claude and ask it to explain the problem and fix it. This replaces hours of Stack Overflow searching. But you need to understand the fix enough to apply it correctly." },
        ] },
      ]}
      promptText={`I'm a complete beginner who wants to learn programming with AI assistance. My goal is to build [describe what you want to build — a website, a simple app, an automation tool, etc.]. I have no programming background. Help me: 1) Explain what programming concepts I genuinely need to understand (not just tools to use) to build what I want, 2) What language or framework is the right starting point for my specific goal, 3) What's a realistic first project I can build in 2 weeks using AI assistance, 4) How I should structure my learning — what to do in week 1, 2, and 3.`}
      checklistItems={["I understand the difference between learning to code and learning to build with AI", "I know which programming language or tool I'll start with for my specific goal", "I can describe in one sentence what I want to build and why", "I understand that reading AI-generated code is as important as prompting it"]}
      reflectText={`The programmers who are thriving with AI are not those who avoided learning programming — they're those who understand concepts well enough to direct AI effectively. <span class="text-white font-bold">What do you want to build that you currently can't because you don't know how to code?</span>`}
      takeaways={["AI writes syntax. You provide direction. Understanding concepts — not memorizing syntax — is the new programmer skill.", "Describing what you want precisely is the most important programming skill in the AI era.", "You need enough reading comprehension of code to verify what AI generates. You don't need to write it from scratch.", "AI has dramatically lowered the barrier to entry. What used to take months of learning can now be built in weeks."]}
      challengeTitle="Describe your first app or project in 5 specific sentences."
      challengeBody="Write 5 specific sentences describing exactly what you want to build. What does it look like? What can users do? What happens when they click a button? What data does it store? Where does it run? This 5-sentence description is the foundation of your first AI-assisted programming session."
      nextTitle="Your First App with Claude"
      nextHref="/learn/skills/programming/your-first-app-with-claude"
      nextMeta="Programming · Lesson 2 of 7 · 12 min"
    />
  );
}
