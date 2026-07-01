import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "HTML, CSS, and JavaScript — Programming | Cyberussell", description: "The three technologies that power every website. What each one does and how they work together.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming/html-css-and-javascript" }, openGraph: { title: "HTML, CSS, and JavaScript | Cyberussell", description: "Understand the three technologies behind every website — without memorizing code.", url: "https://www.cyberussell.com/learn/skills/programming/html-css-and-javascript", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Programming"
      skillHref="/learn/skills/programming"
      lessonNum="4" lessonTotal="7"
      title="HTML, CSS, and JavaScript"
      subtitle="Every website runs on three things. Once you understand what each does, nothing looks mysterious."
      tags={["Web", "Fundamentals"]}
      readTime="12 min"
      objective="Understand the role of HTML, CSS, and JavaScript in a webpage — and modify each layer of an existing project using AI assistance."
      sections={[
        { heading: "The Three Layers of Every Website", body: "Every website — from Google to a personal blog — is built from the same three technologies. Once you understand what each one does, you can look at any website and understand its structure." },
        { heading: "HTML: The Structure", body: "HTML (HyperText Markup Language) defines what's on the page: headings, paragraphs, images, buttons, forms, links. Everything you see on a page as content is HTML.\n\nThink of HTML as the skeleton of a building — it defines what rooms exist and where they are, but not what they look like.\n\nAI can generate all the HTML you need. You need to understand that `<h1>` is a heading, `<p>` is a paragraph, `<button>` is a button, and `<input>` is a form field. That's enough to read and modify AI-generated HTML." },
        { heading: "CSS: The Style", body: "CSS (Cascading Style Sheets) defines how the HTML looks: colors, fonts, sizes, layouts, spacing. The same HTML with different CSS looks completely different.\n\nAI is exceptionally good at generating CSS. You can describe what you want visually and Claude will produce the CSS. What matters is that you can identify which CSS property to ask Claude to change when something doesn't look right." },
        { heading: "JavaScript: The Behavior", body: "JavaScript makes pages interactive: button clicks, form validation, showing/hiding elements, fetching data, animations. Without JavaScript, pages are static — they look the same regardless of what the user does.\n\nThis is the most powerful and complex of the three. AI can generate JavaScript that does sophisticated things. Your job is to describe what should happen when the user does something." },
        { heading: "How to Modify AI Code for Each Layer", items: [
          { title: "Change the structure (HTML)", desc: "Ask Claude: 'Add a new section below the hero with 3 feature cards. Each card has a title, a description, and an icon.' Claude adds the HTML and you see it immediately." },
          { title: "Change the look (CSS)", desc: "Ask Claude: 'Change the background color to dark blue, make the heading font size larger, and add 20px padding to all sections.' Claude modifies the CSS." },
          { title: "Change the behavior (JavaScript)", desc: "Ask Claude: 'When the user submits the form, show an alert saying Thank you for your message and clear the form fields.' Claude adds or modifies the JavaScript." },
        ] },
      ]}
      promptText={`I have this existing webpage: [paste your HTML file code]. I want to make the following changes: 1) Structure change: [describe what content to add or move], 2) Visual change: [describe how you want it to look differently], 3) Behavior change: [describe what should happen when the user does something]. Make each change separately and explain which technology (HTML, CSS, or JavaScript) each change touches and why.`}
      checklistItems={["I can identify HTML, CSS, and JavaScript sections in a webpage", "I know which technology to ask Claude to modify for visual vs structural vs behavioral changes", "I've successfully modified the color scheme and layout of my first app using AI", "I understand that any website I visit can be inspected to see its HTML, CSS, and JS"]}
      reflectText={`Every website you've ever visited is built from these three things. <span class="text-white font-bold">Right-click on any webpage and click 'Inspect'. What do you see?</span>`}
      takeaways={["HTML = structure (what's on the page). CSS = style (how it looks). JS = behavior (what happens when you interact).", "AI generates all three. Your job is to describe what you want clearly and know which layer to ask Claude to change.", "Right-click → Inspect on any website to see its HTML, CSS, and JS. This is how you learn what's possible.", "You never need to write these from scratch. Understanding what they do makes you a more effective director of AI."]}
      challengeTitle="Inspect your favorite website and identify the three layers."
      challengeBody="Open a website you use regularly. Right-click anywhere and select 'Inspect' (Chrome/Firefox). You'll see the HTML panel on the left. Click the Elements tab to explore the structure. Click the Styles panel to see the CSS. This is not intimidating — you're just reading. Take 10 minutes to explore, then ask Claude to explain anything that confuses you."
      nextTitle="Working with APIs"
      nextHref="/learn/skills/programming/working-with-apis"
      nextMeta="Programming · Lesson 5 of 7 · 10 min"
    />
  );
}
