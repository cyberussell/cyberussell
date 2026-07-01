import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Reading and Understanding AI-Generated Code — Programming | Cyberussell", description: "Learn to read code without writing it from scratch. The skill that separates competent AI programmers from dependent ones.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming/reading-and-understanding-ai-generated-code" }, openGraph: { title: "Reading AI-Generated Code | Cyberussell", description: "Learn to read and understand AI-generated code so you can verify, modify, and build on it.", url: "https://www.cyberussell.com/learn/skills/programming/reading-and-understanding-ai-generated-code", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Programming"
      skillHref="/learn/skills/programming"
      lessonNum="3" lessonTotal="7"
      title="Reading and Understanding AI-Generated Code"
      subtitle="You don't need to write code from scratch. You do need to understand what you're running."
      tags={["Reading Code", "Fundamentals"]}
      readTime="10 min"
      objective="Read a piece of AI-generated code and explain in plain language what each section does — without looking it up."
      sections={[
        { heading: "Why Reading Code Matters More Than Writing It", body: "When you use AI to generate code, you're not excused from understanding what it does. If you can't read the code, you can't:\n\n- Verify it does what you think it does\n- Spot security issues (like passwords stored in plain text)\n- Modify it when your requirements change\n- Debug it when it breaks\n\nCode reading is the bridge between being dependent on AI and being competent with it." },
        { heading: "The Core Concepts Every Non-Technical Builder Needs", items: [
          { title: "Variables", desc: "Containers that store information. `let userName = 'Russell'` creates a container called userName that holds the text 'Russell'. When you see a word followed by `=`, something is being stored." },
          { title: "Functions", desc: "Reusable chunks of code that do one job. `function calculateTip(amount, rate) {}` — when called, it takes an amount and a rate, does some calculation, and returns a result. Functions are the verbs of programming." },
          { title: "Conditionals (if/else)", desc: "`if (amount > 0) { ... } else { ... }` — 'If this is true, do this. Otherwise, do that.' Every conditional is a decision the program makes based on data." },
          { title: "Loops", desc: "`for`, `while`, `forEach` — these repeat a block of code multiple times. `for (let i = 0; i < items.length; i++)` means 'do this once for each item in the list'." },
          { title: "Events (in web code)", desc: "`button.addEventListener('click', function() {...})` — 'When the user clicks this button, run this code.' Events connect user actions to program responses." },
        ] },
        { heading: "How to Use Claude to Understand Code", body: "Paste any piece of code into Claude and ask: 'Explain this code line by line in plain English. Use no technical jargon. Assume I have never programmed before.' Do this for every piece of code you use until you understand what's happening." },
      ]}
      promptText={`Explain this code to me line by line in plain English. Assume I have never programmed before and don't know any technical terms. For each section, tell me: 1) What it's doing in plain language, 2) Why it's doing it (what would break if you removed it), 3) Any potential issues I should know about (security, performance, edge cases). Here is the code: [paste your code].`}
      checklistItems={["I can identify variables, functions, conditionals, and loops in a piece of code", "I've used Claude to explain at least one piece of code I didn't understand", "I can describe in plain language what my app's main code sections do", "I know what would happen if I deleted any major section of my app's code"]}
      reflectText={`Using code you don't understand is borrowing confidence from future you, who will have to debug it. <span class="text-white font-bold">If your app broke right now, would you know where to start looking?</span>`}
      takeaways={["Code reading is more important than code writing when you use AI as your developer.", "Learn the 5 core concepts: variables, functions, conditionals, loops, and events. Everything else is detail.", "Ask Claude to explain any code you don't understand before using it. This takes 60 seconds.", "Understanding what your code does is a security and reliability requirement, not just nice-to-have."]}
      challengeTitle="Explain your app's code to Claude and ask it to find any problems."
      challengeBody="Open the code from your first app. Paste all of it into Claude and say: 'Explain this code section by section, then tell me if there are any bugs, security issues, or edge cases I should worry about.' You'll learn more from this one review than from 3 more tutorials."
      nextTitle="HTML, CSS, and JavaScript"
      nextHref="/learn/skills/programming/html-css-and-javascript"
      nextMeta="Programming · Lesson 4 of 7 · 12 min"
    />
  );
}
