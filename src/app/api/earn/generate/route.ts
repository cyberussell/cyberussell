import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are an AI career coach and business mentor for Cyberussell — a platform that helps Filipinos earn online using AI.

Your job is to generate real, usable career and business assets for Filipino learners. Every output must be:
- Ready to use immediately (not a template with blanks)
- Written in professional but approachable English
- Relevant to the Filipino context (local platforms, peso amounts, local companies when appropriate)
- Specific to the information the user provided

Never output generic boilerplate. Always personalize based on the user's inputs.`;

export async function POST(req: NextRequest) {
  const { step, inputs } = await req.json();

  const prompts: Record<string, string> = {
    resume: `Create a professional resume for this person:
Name: ${inputs.name}
Target Job/Role: ${inputs.role}
Skills: ${inputs.skills}
Experience: ${inputs.experience}
Education: ${inputs.education}

Format it as a clean, ATS-friendly resume with these sections: Contact Info (use placeholder email/phone), Professional Summary (3 sentences), Skills, Work Experience, Education.
Write it in plain text using clear section headers and bullet points. Make it ready to copy and paste.`,

    linkedin: `Write a complete LinkedIn profile for this person:
Name: ${inputs.name}
Role/Industry: ${inputs.role}
Skills: ${inputs.skills}
Experience: ${inputs.experience}
Goal: ${inputs.goal}

Include:
1. Headline (under 220 characters, compelling)
2. About section (3-4 paragraphs, first-person, story-driven)
3. Featured section suggestion (what to highlight)
4. Skills to add (list 10-15 relevant skills)
5. Tips for their first 3 posts to build credibility

Make it sound human and authentic, not corporate.`,

    cover_letter: `Write a tailored cover letter:
Applicant name: ${inputs.name}
Role applying for: ${inputs.role}
Company: ${inputs.company || "the company"}
Key skills: ${inputs.skills}
Why interested: ${inputs.motivation}

Write a 3-paragraph cover letter that: opens with a hook (not "I am applying for"), shows specific value in paragraph 2, closes with confidence. Keep it under 300 words. Professional but warm tone.`,

    interview: `Create an interview preparation guide for:
Role: ${inputs.role}
Industry: ${inputs.industry || "general"}
Experience level: ${inputs.experience}

Generate:
1. Top 10 likely interview questions for this role
2. For each question: a model answer using the STAR method (2-3 sentences each)
3. 5 smart questions they should ask the interviewer
4. 3 tips specific to this role/industry

Keep answers conversational and authentic, not rehearsed-sounding.`,

    portfolio: `Create a freelance portfolio strategy for:
Name: ${inputs.name}
Skill/Service: ${inputs.skill}
Experience level: ${inputs.experience}
Target clients: ${inputs.clients}

Generate:
1. Portfolio headline (one punchy line)
2. Bio (2 paragraphs, first person)
3. 3 portfolio project ideas they can create even with no paid clients yet (with descriptions)
4. Recommended platforms to showcase their work
5. Their unique value proposition in one sentence`,

    freelance_profile: `Write a complete freelance profile for:
Name: ${inputs.name}
Service: ${inputs.service}
Skills: ${inputs.skills}
Experience: ${inputs.experience}
Rate: ${inputs.rate || "to be determined"}

Generate:
1. Profile title (for Upwork/Fiverr/OnlineJobs.ph)
2. Profile overview/bio (300 words, client-focused)
3. Service packages (3 tiers with names, descriptions, and suggested prices in PHP and USD)
4. Profile photo tips
5. First 3 proposals to send (which types of jobs to target first)`,

    proposal: `Write a winning freelance proposal for:
Freelancer name: ${inputs.name}
Service offered: ${inputs.service}
Client need: ${inputs.job_description}
Relevant experience: ${inputs.experience}
Proposed rate: ${inputs.rate}

Write a 250-word proposal that: starts by addressing the client's specific need (not about yourself), shows relevant experience with a specific example, proposes a clear solution, states rate and timeline, ends with a confident call to action. Sound like a professional, not a beggar.`,

    pricing: `Create a pricing strategy for:
Service: ${inputs.service}
Current experience: ${inputs.experience}
Target market: ${inputs.market}
Time per project: ${inputs.time}

Generate:
1. Recommended starting rate (hourly in USD and PHP)
2. 3-tier package structure with names, what's included, and prices
3. How to raise rates (3 milestones)
4. What to say when a client says "too expensive" (2-3 scripts)
5. Platforms to find clients at this rate`,

    business_idea: `Validate this business idea for a Filipino entrepreneur:
Idea: ${inputs.idea}
Budget: ${inputs.budget}
Time available: ${inputs.time}
Skills: ${inputs.skills}
Location: ${inputs.location || "Philippines"}

Provide:
1. Market validation (is there demand? evidence)
2. Target customer profile (who exactly will buy this)
3. Revenue potential (realistic monthly estimate in PHP)
4. Top 3 risks and how to handle them
5. Minimum viable version to test in 30 days with ₱${inputs.budget || "5,000"} or less
6. Verdict: Go for it / Modify it / Find a better idea — with reasoning`,

    brand: `Create a brand identity for:
Business name: ${inputs.name || "to be decided"}
Business type: ${inputs.type}
Target customers: ${inputs.customers}
Personality: ${inputs.personality || "professional, friendly, trustworthy"}

Generate:
1. Business name options (3 suggestions if they don't have one, or refine theirs)
2. Tagline options (3 versions)
3. Brand voice guide (5 adjectives + 2 sentences on how to write)
4. Color palette suggestion (3 colors with hex codes and why)
5. Logo concept description (what a designer/AI should create)
6. Social media handle suggestions`,

    landing_page: `Write copy for a landing page for:
Business: ${inputs.business}
Product/Service: ${inputs.offer}
Target customer: ${inputs.customer}
Main benefit: ${inputs.benefit}
Price: ${inputs.price || "to be added"}

Write complete landing page copy:
1. Hero headline (under 10 words, benefit-first)
2. Subheadline (1-2 sentences)
3. 3 key benefits (with icons suggestions)
4. Social proof section (what testimonials to get)
5. How it works (3 steps)
6. FAQ (5 questions and answers)
7. CTA button text (3 options)
8. Footer tagline`,

    marketing: `Create a 30-day marketing plan for:
Business: ${inputs.business}
Platform focus: ${inputs.platform || "Facebook and TikTok"}
Target customer: ${inputs.customer}
Budget: ₱${inputs.budget || "0 (organic only)"}

Generate:
1. Content pillars (4 themes to post about)
2. 30-day posting schedule (week by week)
3. 10 specific post ideas with captions
4. Hashtag strategy (10-15 hashtags)
5. How to get first 10 customers (step by step)
6. What to track (3 key metrics)`,
  };

  const prompt = prompts[step];
  if (!prompt) return NextResponse.json({ error: "Unknown step" }, { status: 400 });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });

    const output = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ output });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
