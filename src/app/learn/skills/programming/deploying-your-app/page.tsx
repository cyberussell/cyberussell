import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Deploying Your App — Programming | Cyberussell", description: "Get your app on the internet. How to deploy a web app for free using Vercel, Netlify, or GitHub Pages.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming/deploying-your-app" }, openGraph: { title: "Deploying Your App | Cyberussell", description: "Get your web app live on the internet for free with Vercel or Netlify.", url: "https://www.cyberussell.com/learn/skills/programming/deploying-your-app", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Programming"
      skillHref="/learn/skills/programming"
      lessonNum="7" lessonTotal="7"
      title="Deploying Your App"
      subtitle="An app that only runs on your laptop isn't a product. Deployment is the last mile."
      tags={["Deployment", "Launch"]}
      readTime="10 min"
      objective="Deploy your app to the internet using a free hosting service — so anyone with a link can use it."
      sections={[
        { heading: "What Deployment Means", body: "Deployment is the process of putting your code on a server so it runs on the internet — accessible to anyone with a link, not just on your local machine.\n\nFor simple HTML/CSS/JS projects, free hosting services make deployment a 5-minute process. There's no reason to keep your project on your laptop." },
        { heading: "The Best Free Deployment Options", items: [
          { title: "Netlify (easiest for HTML/CSS/JS)", desc: "Drag and drop your project folder onto netlify.com/drop and you get a live URL instantly. Free tier. Custom domain available. Best for simple static sites and HTML apps. No account required for quick deployments." },
          { title: "Vercel (best for React and Next.js)", desc: "Connect your GitHub repository and Vercel auto-deploys every time you push code. Free tier. Built for JavaScript frameworks. Used by major companies. The best choice if you're building with React, Next.js, or Svelte." },
          { title: "GitHub Pages (best for code that lives on GitHub)", desc: "If your code is already in a GitHub repository, GitHub Pages makes it public in 2 clicks. Free. Reliable. Good for portfolios and simple projects." },
          { title: "Railway or Render (for apps with backends)", desc: "If your app has a server component (Node.js, Python), Railway or Render offer free hosting for those too. More configuration required but both have AI-generated setup guides." },
        ] },
        { heading: "The Deployment Process for a Simple HTML App", items: [
          { title: "Step 1: Make sure your app works locally", desc: "Test everything in your browser before deploying. Deployment doesn't fix bugs — it just makes them publicly visible." },
          { title: "Step 2: Deploy to Netlify Drop", desc: "Go to netlify.com/drop. Drag your project folder onto the upload area. You get a unique URL (like amazing-donut-123.netlify.app) in about 30 seconds. Share the link — anyone can open it." },
          { title: "Step 3: Set up a custom domain (optional)", desc: "If you have a domain name (like yourname.com), you can connect it to Netlify or Vercel in the DNS settings. This makes your app look professional instead of a random subdomain." },
        ] },
      ]}
      promptText={`I have a web app I want to deploy. Here's my project: [describe what it is — a single HTML file / a folder with HTML, CSS, and JS files / a React project]. I want to use [Netlify / Vercel / GitHub Pages]. Help me: 1) The exact steps to deploy my type of project on this platform, 2) What I should check before deploying (common issues that cause deployment problems), 3) How to set up a custom domain if I have one, 4) What happens when I need to update my app — how do I push changes after the first deployment.`}
      checklistItems={["My app works correctly in my local browser before deploying", "I've chosen a deployment platform appropriate for my project type", "My app is live and accessible via a public URL", "I know how to push updates to my deployed app when I make changes"]}
      reflectText={`A deployed app is a real product. Everything before deployment is practice. <span class="text-white font-bold">What would it mean to you to have a real, working app on the internet that you built from scratch using AI?</span>`}
      takeaways={["Netlify Drop takes 30 seconds to deploy a static HTML site. There's no reason to leave projects on your laptop.", "Test everything locally before deploying. Deployment doesn't fix bugs — it publicizes them.", "Vercel is the best choice for JavaScript framework projects (React, Next.js). It auto-deploys on every code push.", "A live URL you can share transforms a project into a product. Deploy before you think you're ready."]}
      challengeTitle="Deploy your app and share the link with one person."
      challengeBody="Go to netlify.com/drop right now. Drag your project folder onto the upload area. Copy the live URL. Send it to one person — a friend, a family member, anyone. Tell them what it does. That moment of showing someone something you built is why this is worth doing."
      nextTitle="Continue with Automation"
      nextHref="/learn/skills/automation"
      nextMeta="Build Real Skills · Pillar 5 · Automation Track"
    />
  );
}
