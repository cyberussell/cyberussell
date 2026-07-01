import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Debugging with AI — Programming | Cyberussell", description: "How to fix broken code fast with AI. What to paste, what to ask, and how to read error messages.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming/debugging-with-ai" }, openGraph: { title: "Debugging with AI | Cyberussell", description: "Fix broken code fast with AI. The step-by-step debugging process.", url: "https://www.cyberussell.com/learn/skills/programming/debugging-with-ai", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Programming"
      skillHref="/learn/skills/programming"
      lessonNum="6" lessonTotal="7"
      title="Debugging with AI"
      subtitle="Broken code is not a failure. It's the most normal thing in programming."
      tags={["Debugging", "Problem Solving"]}
      readTime="10 min"
      objective="Debug a broken piece of code using AI — by learning what to paste, how to describe the problem, and how to apply the fix."
      sections={[
        { heading: "Why Code Breaks (and Why That's Normal)", body: "Every programmer's code breaks. Constantly. Even senior engineers at Google push broken code. The difference between a good developer and a frustrated beginner isn't that one writes perfect code — it's that one has a reliable process for finding and fixing errors quickly.\n\nAI has made this process dramatically faster. What used to take an hour of Stack Overflow searching now takes 2 minutes with Claude." },
        { heading: "The 4-Step AI Debugging Process", items: [
          { title: "Step 1: Get the exact error message", desc: "Open your browser's developer console (F12 or right-click → Inspect → Console). Find the red error message. Copy it exactly — don't paraphrase. The error message contains the specific information Claude needs to diagnose the problem." },
          { title: "Step 2: Paste code + error into Claude", desc: "Paste the error message AND the relevant code into Claude. Say: 'This is the error I'm getting: [error]. Here is the code: [code]. Explain what's causing the error and how to fix it.' More context = better diagnosis." },
          { title: "Step 3: Understand the fix before applying it", desc: "Before copying Claude's fix, read the explanation. Ask if you don't understand: 'Why did this cause the error and why does your fix solve it?' Blindly applying fixes without understanding them leads to the same bugs recurring." },
          { title: "Step 4: Test thoroughly after the fix", desc: "After applying a fix, test the specific thing that was broken AND everything else around it. Fixes sometimes break adjacent functionality. Test the whole flow, not just the fixed line." },
        ] },
        { heading: "Common Error Types and What They Mean", items: [
          { title: "ReferenceError", desc: "'variableName is not defined' — you're using a variable that doesn't exist. Either you misspelled it, forgot to declare it, or you're trying to use it in the wrong part of the code." },
          { title: "TypeError", desc: "'Cannot read properties of undefined' — you're trying to use a variable that exists but has no value yet. Usually happens when data is loading asynchronously (from an API) but you're trying to use it before it arrives." },
          { title: "SyntaxError", desc: "A typo in your code — a missing bracket, comma, or quote. Claude can spot these instantly by looking at the code." },
        ] },
      ]}
      promptText={`I have a bug in my code. Here's the error message from my browser console: [paste exact error]. Here's the relevant code: [paste code]. What I was trying to do: [describe expected behavior]. What is actually happening: [describe the broken behavior]. Please: 1) Explain what is causing this error in plain language, 2) Show me the fixed code, 3) Explain why your fix works so I understand it and don't make the same mistake again.`}
      checklistItems={["I know how to open the browser developer console (F12)", "I've successfully copied a real error message and pasted it into Claude", "I've applied a fix and tested that it works and didn't break anything else", "I understand what caused the error — not just that it's fixed"]}
      reflectText={`Debugging is where you actually learn to code. Every error message is a lesson. <span class="text-white font-bold">What's the error you've been avoiding fixing in your current project?</span>`}
      takeaways={["Broken code is normal. A fast debugging process is the skill, not never having bugs.", "Always provide the exact error message AND the code when asking Claude for debugging help.", "Understanding the fix is as important as applying it. Ask Claude to explain why the error happened.", "Test the full flow after any fix — not just the specific line that was changed."]}
      challengeTitle="Intentionally break your app and then fix it."
      challengeBody="Open your app's code. Delete one important line of JavaScript or change a variable name to something wrong. Save and open in your browser — see the error. Open the console to see the error message. Paste the error and code into Claude. Fix it. Do this 3 times with different lines. After 3 rounds of intentional break-and-fix, you'll be much less afraid of real bugs."
      nextTitle="Deploying Your App"
      nextHref="/learn/skills/programming/deploying-your-app"
      nextMeta="Programming · Lesson 7 of 7 · 10 min"
    />
  );
}
