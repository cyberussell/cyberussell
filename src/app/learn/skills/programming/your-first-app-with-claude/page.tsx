import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Your First App with Claude — Programming | Cyberussell", description: "Build a working web application from scratch using Claude as your coding partner.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming/your-first-app-with-claude" }, openGraph: { title: "Your First App with Claude | Cyberussell", description: "Build a working web app from scratch using Claude as your AI coding partner.", url: "https://www.cyberussell.com/learn/skills/programming/your-first-app-with-claude", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Programming"
      skillHref="/learn/skills/programming"
      lessonNum="2" lessonTotal="7"
      title="Your First App with Claude"
      subtitle="The best way to learn programming is to build something real."
      tags={["Project", "Claude"]}
      readTime="12 min"
      objective="Build a working, functional web application using Claude as your coding partner — from idea to running in a browser."
      sections={[
        { heading: "The Mindset for Building with AI", body: "When you build with Claude, you're the product manager and Claude is the developer. Your job is to describe clearly what you want. Claude writes the code. You test it, describe what's wrong or missing, and Claude fixes it.\n\nThis back-and-forth iteration is how real software is built — even by professional developers." },
        { heading: "What to Build for Your First Project", items: [
          { title: "Good first project criteria", desc: "Scope: something you can describe in 10 sentences or less. Output: produces something visible in a browser. Usefulness: something you'd actually use or show someone. Examples: a tip calculator, a to-do list, a quiz app, a personal budget tracker, a simple portfolio page." },
          { title: "Avoid for your first project", desc: "Anything requiring user accounts, payments, or database integration. These add significant complexity. Your first project should demonstrate that you can build something — not that you can build everything." },
        ] },
        { heading: "The Step-by-Step Build Process", items: [
          { title: "Step 1: Describe the full spec", desc: "Tell Claude exactly what you want to build: what it looks like, what the user can do, what happens when they interact with it. Be specific. 'Build a tip calculator where the user enters a bill amount and selects 10%, 15%, or 20%, and it shows the tip and total amounts.' That's specific enough to build." },
          { title: "Step 2: Run the code", desc: "Copy the HTML/CSS/JavaScript Claude provides into a file called index.html. Open it in a browser. See if it works. If it does, great. If it doesn't, copy the error message back to Claude and ask it to fix it." },
          { title: "Step 3: Iterate", desc: "Add one feature at a time. 'Now add a field for the number of people and split the bill equally.' Tell Claude what's broken or missing. Each iteration teaches you how the code works by watching it change." },
        ] },
      ]}
      promptText={`Build me a [describe your app — tip calculator / to-do list / quiz / budget tracker / etc.]. Requirements: [list 4–6 specific features it should have]. It should be: a single HTML file with embedded CSS and JavaScript (no external dependencies or frameworks). Make it: 1) Mobile-responsive, 2) Clean and professional-looking with a simple color scheme, 3) Functional — every feature should work when I open it in a browser. After the code, explain in 3 sentences what each main section of the code does, so I can understand what I'm looking at.`}
      checklistItems={["I've described my app with at least 4 specific requirements", "I've copied the code into an index.html file and opened it in a browser", "The app works as expected — at least the core feature functions", "I've asked Claude to explain one part of the code I didn't understand"]}
      reflectText={`Most people think they need to learn programming before they can build something. You just built something to learn programming. <span class="text-white font-bold">What feature would you add to your app if you knew Claude would write the code in 30 seconds?</span>`}
      takeaways={["Your first app should be small, specific, and run in a browser. Build that before anything else.", "The build loop is: describe → code → test → fix → repeat. This is how all software gets built.", "A single HTML file with embedded CSS and JS is the easiest starting point — no setup required.", "Every iteration teaches you something. The errors are the lesson."]}
      challengeTitle="Build your first app and show it to someone today."
      challengeBody="Use the prompt above to build your chosen app. Get it running in your browser. Take a screenshot. Show it to one person and explain what it does. You just became someone who builds software. That's not nothing."
      nextTitle="Reading and Understanding AI-Generated Code"
      nextHref="/learn/skills/programming/reading-and-understanding-ai-generated-code"
      nextMeta="Programming · Lesson 3 of 7 · 10 min"
    />
  );
}
