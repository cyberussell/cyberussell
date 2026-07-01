import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Building an AI Research Agent — Automation | Cyberussell", description: "Create an AI agent that researches topics, summarizes content, and surfaces insights automatically.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/automation/building-an-ai-research-agent" }, openGraph: { title: "Building an AI Research Agent | Cyberussell", description: "Build an AI agent that researches and summarizes content automatically.", url: "https://www.cyberussell.com/learn/skills/automation/building-an-ai-research-agent", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Automation"
      skillHref="/learn/skills/automation"
      lessonNum="6" lessonTotal="6"
      title="Building an AI Research Agent"
      subtitle="An agent that monitors, collects, and summarizes information while you sleep."
      tags={["AI Agents", "Research"]}
      readTime="12 min"
      objective="Build a simple AI research agent that automatically monitors a topic, collects relevant information, and delivers a summary to you on a schedule."
      sections={[
        { heading: "What an AI Research Agent Is", body: "An AI research agent is an automation that monitors sources (news sites, RSS feeds, social media, competitor websites), collects relevant content on a schedule, sends that content through an AI for summarization and analysis, and delivers the distilled output to you.\n\nInstead of spending 30 minutes every morning reading industry news, a research agent delivers a 3-minute summary of what actually matters — automatically." },
        { heading: "The Components of a Research Agent", items: [
          { title: "The data source", desc: "What you want monitored: RSS feeds from industry blogs, Google Alerts for keywords, Twitter/X lists, competitor blog posts, Reddit threads, YouTube channels. Each source needs a way to trigger when new content appears." },
          { title: "The collection layer", desc: "Make or Zapier watches the source and triggers when new content appears. It extracts the relevant content (title, URL, summary, date) and passes it to the next step." },
          { title: "The AI processing layer", desc: "Claude or ChatGPT receives the content and performs a task: summarize in 3 bullets, extract key insights, identify if this is relevant to [your criteria], categorize by topic. The AI output is more useful than the raw source." },
          { title: "The delivery layer", desc: "The processed content is sent to you via email, Slack, a Notion database, or a Google Sheet. You define the format: a daily digest, an instant notification for high-priority items, or a weekly roundup." },
        ] },
        { heading: "A Simple Research Agent You Can Build Today", body: "Monitor a competitor's blog using their RSS feed. When a new post is published: Zapier catches the new RSS item → sends the title and URL to Claude with the prompt 'Summarize this article in 3 bullets and tell me what implications it has for [your niche]' → Claude's response is emailed to you.\n\nSetup time: 20 minutes. Result: you know about competitor content the day it's published, with AI-generated context on why it matters." },
      ]}
      promptText={`Help me build a simple AI research agent. I want to monitor: [describe what you want to track — competitor blogs, industry news, keywords, specific websites]. I want the agent to: [describe what it should do with what it finds — summarize, categorize, flag high-priority items, extract specific data]. I want to receive the output: [where — email / Slack / Notion / Google Sheet / all of the above]. Delivery schedule: [daily digest / instant notification / weekly roundup]. Help me: 1) The exact automation setup in Zapier or Make, 2) The AI prompt to use for processing each item, 3) The output format for my delivery channel, 4) How to filter so only the most relevant items come through (not noise).`}
      checklistItems={["I've identified what I want my agent to monitor and from which sources", "I've set up the trigger in Zapier or Make that fires when new content appears", "I've written the AI processing prompt that transforms raw content into useful intelligence", "My agent has run automatically at least once and delivered a useful output"]}
      reflectText={`What if the 30 minutes you spend reading industry news every morning was compressed to 3 minutes of distilled intelligence? <span class="text-white font-bold">What would you do with those 25 minutes?</span>`}
      takeaways={["A research agent = data source + collection trigger + AI processing + delivery. Build each layer separately.", "RSS feeds are the easiest data source to start with — most blogs and news sites have them.", "The AI prompt in your research agent is the key variable. Write it to extract what you actually need.", "Start with one source, one AI task, one delivery channel. Add more sources and complexity after the first one works."]}
      challengeTitle="Build a competitor monitoring agent."
      challengeBody="Find the RSS feed URL of your main competitor's blog (usually at their-domain.com/feed or /rss). Set up a Zapier automation: RSS trigger → ChatGPT/Claude step (summarize in 3 bullets + key implications for your niche) → send to your email. Turn it on. The next time they publish something, you'll get an AI-summarized briefing in your inbox automatically."
      nextTitle="Continue with Excel & Spreadsheets"
      nextHref="/learn/skills/excel-spreadsheets"
      nextMeta="Build Real Skills · Pillar 5 · Excel & Spreadsheets Track"
    />
  );
}
