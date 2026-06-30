# Cyberussell Guide Canon

Version: 1.0
Status: Living Document
Depends on: Learning Canon v1.0, Curriculum Canon v1.0

---

# Purpose

The Guide Canon defines exactly how every Cyberussell Guide must be written.

The Learning Canon defines why we teach.

The Curriculum Canon defines how content is structured.

The Guide Canon defines what every Guide contains, how it reads, how it looks, and how it connects to the rest of the platform.

Every writer, editor, and content architect working on Cyberussell Guides must treat this document as the permanent standard.

A Guide that does not meet this standard must not be published.

---

# What a Guide Is

A Guide is the atomic unit of learning inside Cyberussell.

One Guide. One concept. One behavioral change. One action.

A Guide is not an article.

A Guide is not a tutorial.

A Guide is not documentation.

A Guide is not a list of tips.

A Guide is a structured mentoring experience that ends with the learner doing something they could not do before.

---

# Guide Metadata

Every Guide must include the following metadata before content begins.

This metadata is used by the platform to build navigation, prerequisites, and connections.

```
---
slug:          unique-kebab-case-identifier
pillar:        pillar-slug
title:         Plain language title, no jargon
outcome:       One sentence. What the learner will be able to do after finishing.
difficulty:    beginner | intermediate | advanced
type:          concept | skill | applied
time:          5 | 10 | 15
version:       1.0
prerequisites: [guide-slug-1, guide-slug-2] or []
next_guide:    guide-slug
related_tool:  tool-slug or null
mission_tags:  [mission-slug-1, mission-slug-2]
earn_path:     earn-path-slug or null
status:        draft | review | published
---
```

No Guide may be submitted for review without complete metadata.

---

# Guide Structure

Every Guide follows the same fourteen-section structure in the same order.

No section may be skipped.

No section may be reordered.

No section may be merged with another.

## Section Order

1. Hero
2. Learning Outcome
3. Why This Matters
4. Core Concept
5. Real Example
6. Interactive Exercise
7. Reflection
8. Key Takeaways
9. Related Tool
10. Challenge *(optional)*
11. Related Mission
12. Related Earn Path
13. Next Guide
14. Footer Metadata

---

## Section 1 — Hero

The Hero introduces the Guide and tells the learner exactly what they are about to learn.

### Rules

- Must include a headline in H1
- Must include a one-sentence description beneath the headline
- Must display the difficulty badge, type badge, and estimated time
- Must display the Pillar the Guide belongs to
- Must not include more than two sentences of body text
- Must not make claims the Guide cannot deliver
- Must not use hype language

### Headline Rules

The headline must name the concept being taught — not the outcome, not the tool, not a clever metaphor.

Bad headline: "Unlock the Power of AI"

Bad headline: "ChatGPT Changed My Life"

Good headline: "How to Give AI the Right Context"

Good headline: "Why AI Gives Vague Answers — And How to Fix It"

### Badges

The Hero must display three visible badges.

```
[Beginner]   [Concept Guide]   [5 min]
```

Badge labels must match the metadata values exactly.

---

## Section 2 — Learning Outcome

The Learning Outcome is a single, specific sentence that tells the learner exactly what they will be able to do after completing this Guide.

### Rules

- Must appear immediately after the Hero
- Must be formatted as a callout box labeled "After this Guide, you will be able to:"
- Must be written in second person ("you will be able to")
- Must describe an action — not a state of knowledge
- Must be specific enough that the learner can self-assess whether they achieved it
- Must match the `outcome` field in the Guide metadata exactly

### Examples

Bad outcome: "You will understand how AI works."

Bad outcome: "You will learn about prompting."

Good outcome: "You will be able to write a prompt that gives AI enough context to respond usefully the first time."

Good outcome: "You will be able to identify when an AI answer is hallucinated and know what to do next."

---

## Section 3 — Why This Matters

This section answers the most important question a learner can ask before reading anything:

Why should I care?

If the learner does not understand why this concept matters in their real life, they will not complete the Guide.

### Rules

- Must use real-world situations — not abstract theory
- Must connect to the learner's actual goals: freelancing, earning online, working smarter, getting hired
- Must not assume the learner knows why the topic is important
- Must be written in 2–4 short paragraphs
- Must not exceed 150 words total
- Must answer at least one of the following questions explicitly:
  - How will this help me earn money?
  - How will this save me time?
  - How will this help me produce better work?
  - How will this make my life easier?

### Tone

Write like a mentor who genuinely believes this matters.

Not like a salesperson convincing someone to buy.

Not like a professor explaining a syllabus.

---

## Section 4 — Core Concept

This section teaches the concept.

One concept only.

### Rules

- Must explain the concept using plain language
- Must use an analogy for every abstract idea
- Must not assume prior knowledge beyond what is listed in prerequisites
- Must not introduce more than one new concept
- Must not link to external sources — only to other Cyberussell Guides
- Must not include more than 300 words
- Must not include jargon without an immediate plain-language explanation

### Analogy Standard

Every Guide that teaches an abstract concept must include at least one analogy.

The analogy must come from everyday Filipino life — not from academic papers, not from Silicon Valley culture.

Bad analogy: "Think of it like a neural network."

Good analogy: "Think of it like giving directions to a jeepney driver. The more specific you are about your destination, the more likely you arrive where you want to go."

### Diagrams and Visuals

If the concept is best explained visually, a diagram must be included.

Diagrams must follow the Visual Requirements section of this document.

Text and diagram must not repeat each other — one complements the other.

---

## Section 5 — Real Example

This section shows the concept in action using a specific, real-world scenario.

A concept explained is forgotten. A concept seen is remembered. A concept done is learned.

This section is the bridge between explanation and doing.

### Rules

- Must use a scenario a Filipino learner would recognize: freelancing, applying for a job, running a small business, creating content, studying, planning a career
- Must show a before and after: what happens without the concept, what happens with it
- Must not be fictional or hypothetical in a way that feels disconnected from real life
- Must include an actual AI prompt and an actual AI response where applicable
- Must not summarize what was just explained in Section 4 — it must demonstrate it
- Must not exceed 250 words

### Before / After Format

When showing the impact of a concept, use the Before / After format.

```
Before

[Prompt or action without the concept]

Result: [What AI produced — vague, wrong, or unhelpful]

After

[Prompt or action with the concept applied]

Result: [What AI produced — specific, useful, actionable]
```

---

## Section 6 — Interactive Exercise

The Exercise is the most important section of every Guide.

A learner who reads the Guide but skips the Exercise has not completed the Guide.

### Rules

- Must require the learner to interact with an AI tool
- Must state the expected outcome before the learner begins
- Must include a ready-to-use prompt at Tier 1
- Must include a modification challenge at Tier 2 or higher, depending on difficulty
- Must end with a single reflection prompt
- Must not ask the learner to memorize anything
- Must not require the learner to create an account they do not already have
- Must be completable in under 10 minutes

### Exercise Tiers

**Tier 1 — Copy and Use** (Required for all Beginner Guides)

Provide a complete, ready-to-copy prompt.

The learner runs it without modification.

The goal is to remove the barrier of starting.

**Tier 2 — Modify and Improve** (Required for Intermediate Guides; optional addition for Beginners)

Provide a base prompt.

Ask the learner to change one specific element and compare the results.

The goal is to build judgment through comparison.

**Tier 3 — Build from Scratch** (Required for Advanced Guides)

Give the learner a goal, not a prompt.

The learner writes their own prompt and evaluates the result against the Learning Outcome.

The goal is to develop independent capability.

### Prompt Block Format

All prompts must be displayed in a dedicated prompt block.

```
[PROMPT BLOCK]

You are a [role]. Help me [task].

Context: [specific detail]

Format the response as [format].
```

The prompt block must be visually distinct from surrounding text.

The prompt block must be copyable with a single click or tap.

Every prompt must include the AI tool it was written for: ChatGPT, Claude, or Gemini.

### Exercise Completion Marker

After the Exercise, display a completion callout.

```
[CALLOUT — COMPLETE]

Mark this exercise done when you have:
- [ ] Run the prompt
- [ ] Read the full response
- [ ] Answered the reflection question below
```

---

## Section 7 — Reflection

Reflection is what converts an experience into learning.

This section must not be skipped, shortened, or treated as optional.

### Rules

- Must include exactly one reflection question
- The question must be open-ended — no yes/no questions
- The question must be directly connected to the Exercise just completed
- Must not ask the learner to evaluate Cyberussell content
- Must not ask the learner to rate their experience
- Must not turn into a quiz

### Good Reflection Questions

"What surprised you about the AI's response?"

"Where did the output fall short, and what would you change about the prompt?"

"How would you use this in a real task this week?"

"What did you notice when you compared the two responses?"

### Bad Reflection Questions

"Did you understand the concept?" *(yes/no — useless)*

"How many stars would you give this guide?" *(feedback, not reflection)*

"What is a prompt?" *(test, not reflection)*

### Display Format

Display the reflection question inside a callout box.

```
[CALLOUT — REFLECT]

Take one minute.

[Reflection question here]

You don't need to write it down. Just think.
```

---

## Section 8 — Key Takeaways

This section summarizes what the learner experienced.

It is written after the Exercise and Reflection — not before.

### Rules

- Must contain exactly three to five bullet points
- Each bullet must be one sentence
- Each bullet must describe something the learner can do — not something they now know
- Must not repeat Section 4 word for word
- Must not introduce any new concept not covered in the Guide
- Must be written in second person

### Examples

Bad takeaway: "AI uses machine learning to process natural language."

Good takeaway: "You can improve any AI response by adding more context to your prompt."

Good takeaway: "When AI gives a vague answer, the most likely cause is a vague question."

---

## Section 9 — Related Tool

This section recommends one Cyberussell Tool that allows the learner to immediately apply what they learned.

This section is conditional.

If no relevant Cyberussell Tool exists for this concept, omit this section entirely.

### Rules

- Must recommend exactly one Tool — never more
- Must not describe how the Tool works
- Must explain in one sentence why the Tool is relevant to what was just learned
- Must link directly to the Tool page
- Must not position the Tool as required — only as available
- Must appear after the Key Takeaways — never before the Exercise

### Format

```
[CALLOUT — TOOL]

Ready to apply this?

[Tool Name] can help you [one-sentence description of what it does in this context].

[Try the Tool →]
```

---

## Section 10 — Challenge *(Optional)*

A Challenge is an optional extension for learners who want to go deeper.

It must appear after the Related Tool section and before Related Mission.

Challenges are never required for Guide completion.

### Rules

- Must use only concepts introduced in this Guide
- Must not introduce new tools or concepts
- Must have a difficulty level one step above the Guide
- Must take no more than 15 additional minutes
- Must state the expected outcome before the learner begins
- Must include a self-assessment prompt at the end

### Format

```
[CALLOUT — CHALLENGE]

Want to go further?

[Challenge title]

[One sentence description of what the learner will do]

Expected outcome: [What they will produce]

This is optional. Come back to it when you're ready.
```

---

## Section 11 — Related Mission

This section shows the learner which Mission this Guide contributes to.

It connects concept learning to real-world application.

### Rules

- Must list one to three Missions this Guide contributes to
- Must display each Mission's title, deliverable, and estimated time
- Must not describe the Mission in detail — only enough to create motivation
- Must link directly to the Mission page
- A Guide that contributes to no Mission must not be published

### Format

```
[CALLOUT — MISSION]

This Guide prepares you for:

Mission: [Mission Title]
Deliverable: [One sentence]
Time: [X minutes]

[Start Mission →]
```

---

## Section 12 — Related Earn Path

This section shows the learner how what they just learned connects to an actual income opportunity.

This is not optional.

Learning that has no visible path to earning is incomplete.

### Rules

- Must name the specific Earn path this Guide connects to
- Must explain in one to two sentences how completing this Guide moves the learner closer to earning
- Must link directly to the Earn page
- Must not overstate the income claim — be accurate, not promotional

### Format

```
[CALLOUT — EARN]

What this is worth:

Learners who master [concept] are better prepared for [earn path].

[Explore [Earn Path] →]
```

---

## Section 13 — Next Guide

Every Guide must end with a recommendation for what to read next.

No dead ends.

### Rules

- Must recommend exactly one Guide
- Must be the logical next step in the learning progression — not a random related article
- Must display the next Guide's title, pillar, difficulty, and estimated time
- Must link directly to the next Guide

### Format

```
[CALLOUT — NEXT]

You're ready for:

[Guide Title]
Pillar: [Pillar Name] · [Difficulty] · [X min]

[Continue →]
```

---

## Section 14 — Footer Metadata

Every Guide ends with a visible metadata footer.

This is displayed to the learner — not hidden in code.

```
Guide: [Guide Title]
Pillar: [Pillar Name]
Version: [x.x]
Last updated: [Month Year]
Prerequisites: [Guide Title 1], [Guide Title 2] or None
Contributes to: [Mission Title 1], [Mission Title 2]
```

---

# Writing Style

## Voice

Write like a mentor.

Never like a textbook.

Never like a course platform.

Never like a corporate training manual.

The voice is direct, warm, practical, and confident.

The voice never condescends.

The voice never overwhelms.

The voice says "you" — not "the learner," not "the user," not "one."

## Sentence Rules

Use short sentences.

One idea per sentence.

Never more than 25 words per sentence.

Never more than 4 sentences per paragraph.

Vary sentence length within paragraphs to create rhythm.

Short. Medium. Then a slightly longer sentence that completes the idea.

## Paragraph Rules

Maximum 4 sentences per paragraph.

One idea per paragraph.

White space is not wasted space — it is a tool for comprehension.

After every 3–4 paragraphs, break the flow with a visual element, callout, or list.

## Word Rules

Use the simplest word that carries the meaning.

Never use jargon without immediate definition.

Never use passive voice when active is possible.

Never use "utilize" when "use" works.

Never use "leverage" as a verb.

Never use "in order to" when "to" works.

Never use "this allows users to" — say "you can."

## What to Avoid

- Filler phrases: "In this guide, we will explore..."
- False excitement: "Exciting times ahead!"
- Assumed enthusiasm: "Great question!"
- Academic hedging: "It could be argued that..."
- Sycophantic openers: "Welcome to this amazing guide!"
- Vague promises: "This will change everything."
- Shaming language: "Most people make this mistake..."
- Overwhelm: three concepts in one sentence

---

# Length Standards

## Total Word Count by Guide Type

| Type | Minimum | Maximum |
|---|---|---|
| Concept Guide | 400 words | 700 words |
| Skill Guide | 600 words | 900 words |
| Applied Guide | 700 words | 1,100 words |

Word count excludes prompt blocks, callout boxes, and metadata.

A Guide that exceeds its maximum word count must be split into two Guides.

A Guide that falls below its minimum has not taught the concept adequately.

## Section Word Count Targets

| Section | Target |
|---|---|
| Hero | 30–50 words |
| Learning Outcome | 1 sentence |
| Why This Matters | 80–150 words |
| Core Concept | 150–300 words |
| Real Example | 100–250 words |
| Interactive Exercise | 100–200 words + prompt block |
| Reflection | 1 question + 20 words framing |
| Key Takeaways | 3–5 bullets, 1 sentence each |
| Related Tool | 1–2 sentences |
| Challenge | 50–100 words |
| Related Mission | 2–3 sentences per Mission |
| Related Earn Path | 1–2 sentences |
| Next Guide | 1 sentence |

---

# Reading Time Standards

Reading time must be accurate.

Calculate reading time as: total words ÷ 200 words per minute, rounded up to the nearest 5 minutes, plus 2 minutes for exercises.

| Guide Type | Reading Time |
|---|---|
| Concept Guide | 5 minutes |
| Skill Guide | 10 minutes |
| Applied Guide | 15 minutes |

If the calculated reading time exceeds the standard, the Guide is too long.

Split it.

---

# Visual Requirements

## Hierarchy

Every Guide uses this heading hierarchy.

```
H1   — Guide title (Hero only, used once)
H2   — Major sections (Why This Matters, Core Concept, etc.)
H3   — Subsections within a major section
Bold — Key terms, first use only
```

Never use H4 or below inside a Guide.

If a section requires H4 depth, it is too complex. Simplify or split.

## Callout Boxes

Callout boxes are used to visually separate important content from body text.

Five callout types are used inside Guides.

| Type | Label | Used For |
|---|---|---|
| Outcome | AFTER THIS GUIDE | Learning Outcome section |
| Complete | MARK COMPLETE | Exercise checklist |
| Reflect | REFLECT | Reflection question |
| Tool | TRY THIS TOOL | Related Tool |
| Next | WHAT'S NEXT | Next Guide |
| Challenge | CHALLENGE | Optional challenge |
| Earn | WHAT THIS IS WORTH | Related Earn Path |
| Mission | THIS UNLOCKS | Related Mission |

Callout boxes must be visually consistent across all Guides.

Callout boxes must never be used inside body text paragraphs.

Callout boxes must never appear consecutively without body text between them, except in the final navigation cluster (Related Mission → Related Earn Path → Next Guide).

## Prompt Blocks

Prompt blocks are a distinct visual component used exclusively for displaying AI prompts.

Prompt blocks must:

- Use a monospace or code-adjacent font
- Display the target AI tool (ChatGPT / Claude / Gemini) as a label
- Be copyable with a single click or tap on mobile
- Be visually distinct from all other content
- Never be embedded inside a paragraph

Prompt blocks must not:

- Contain instructions mixed with the prompt text
- Be formatted as a regular blockquote
- Be broken across two visual blocks

## Before / After Blocks

Before / After blocks are used exclusively in the Real Example section.

They must always appear as a pair — never a Before without an After.

Format:

```
BEFORE
───────────────────────────
[content]

AFTER
───────────────────────────
[content]
```

## Images and Diagrams

Images are optional in Concept Guides.

Images are recommended in Skill Guides.

Images are required in Applied Guides where a workflow is described.

### Image Rules

- All images must have descriptive alt text
- All images must be optimized for mobile (max 800px wide, compressed)
- All images must use the site's color palette
- Screenshots of AI tools are permitted but must be current
- Screenshots must not include personally identifying information
- Diagrams must use the same typographic conventions as the rest of the site

### Diagram Rules

Diagrams must communicate hierarchy, flow, or comparison — never decoration.

When a flowchart is used, the flow must read top to bottom on mobile.

Left-to-right flows must be avoided on mobile.

---

# Accessibility Standards

Every Guide must meet these accessibility requirements before publication.

## Text

- Minimum body text size: 16px
- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- Line height: minimum 1.6
- Paragraph width: maximum 70 characters per line on desktop

## Images

- All images must have descriptive alt text
- Alt text must describe the content and purpose of the image — not just its appearance
- Decorative images must use `alt=""`

## Prompt Blocks

- Prompt blocks must be keyboard-navigable
- Copy button must be operable by keyboard
- Copy confirmation must be announced to screen readers

## Color

- Never use color alone to convey meaning
- Every callout type must be distinguishable by label, not only color
- All icon usage must include accompanying text labels

## Motion

- No autoplay animations
- No flashing content
- Scroll-triggered animations must respect `prefers-reduced-motion`

---

# Mobile-First Design Standards

Every Guide is designed for mobile first.

Desktop layout is an enhancement, not the baseline.

## Layout Rules

- Single column on mobile
- Maximum content width: 680px
- All callout boxes must be full width on mobile
- Prompt blocks must be full width on mobile with a visible copy button
- No horizontal scrolling at any breakpoint
- Touch targets (buttons, links) must be minimum 44×44px

## Typography on Mobile

- H1: minimum 28px
- H2: minimum 22px
- Body: minimum 16px
- No text smaller than 13px anywhere in a Guide

## Image Behavior on Mobile

- Images must not overflow their container
- Diagrams must stack vertically on screens narrower than 480px
- Before / After blocks must stack vertically on mobile

## Navigation on Mobile

- Previous Guide / Next Guide links must appear at both the top and bottom of the page
- The Next Guide callout must be the last visible element before the footer
- Scroll-to-top must be available after 50% of the Guide is scrolled

---

# SEO Standards

## Page Title

Format: `[Guide Title] — [Pillar Name] | Cyberussell`

Maximum 60 characters.

Must include the primary keyword naturally.

Must not be written as a question.

## Meta Description

Must be 140–160 characters.

Must include the primary keyword.

Must describe what the learner will be able to do after the Guide.

Must not repeat the page title word for word.

## URL Slug

Format: `/learn/[pillar-slug]/[guide-slug]`

Must be lowercase.

Must use hyphens — never underscores or spaces.

Must match the `slug` field in metadata exactly.

Must not include dates, version numbers, or author names.

## Heading Structure

Every page must have exactly one H1.

H2 must appear in logical order — never skipped.

Primary keyword must appear in at least one H2.

## Content SEO Rules

- Primary keyword must appear in the first 100 words of body text
- Primary keyword must appear in the Learning Outcome
- Related keywords must appear naturally — never stuffed
- All internal links must use descriptive anchor text
- All external links must open in a new tab with `rel="noopener noreferrer"`

## Structured Data

Every Guide must include JSON-LD structured data for:

- `Article` schema with `datePublished` and `dateModified`
- `BreadcrumbList` schema reflecting the Pillar → Guide path
- `HowTo` schema for Applied Guides that include step-by-step instructions

---

# Quality Checklist

Every Guide must pass this checklist before it is marked `status: review`.

A Guide that fails any item must be revised before submission.

## Structure

- [ ] All fourteen sections are present and in the correct order
- [ ] Metadata is complete with no null required fields
- [ ] Slug is unique across all published Guides
- [ ] Word count is within the range for its type
- [ ] Reading time matches the Guide type standard

## Content

- [ ] Hero headline names the concept — not the outcome, not the tool
- [ ] Learning Outcome is one specific, action-oriented sentence
- [ ] Why This Matters uses a real-world scenario without theory
- [ ] Core Concept teaches exactly one concept
- [ ] At least one analogy is present for abstract ideas
- [ ] Real Example includes a Before and After
- [ ] Exercise includes a ready-to-copy prompt
- [ ] Exercise states the expected outcome before the learner begins
- [ ] Reflection includes exactly one open-ended question
- [ ] Key Takeaways contains 3–5 bullets, each describing an action
- [ ] Related Mission is listed and linked
- [ ] Related Earn Path is present and linked
- [ ] Next Guide is specified

## Writing

- [ ] No sentence exceeds 25 words
- [ ] No paragraph exceeds 4 sentences
- [ ] No jargon is used without immediate plain-language explanation
- [ ] Voice is second person throughout
- [ ] No filler phrases, false excitement, or sycophantic openers
- [ ] No passive voice in instructional sentences
- [ ] No AI platform is promoted as the only option

## Visual

- [ ] All callout types are used correctly and in the right sections
- [ ] All prompt blocks are formatted consistently and copyable
- [ ] All Before / After blocks are paired
- [ ] All images have descriptive alt text
- [ ] No H4 or below is used

## Accessibility

- [ ] All images have alt text
- [ ] Copy button on prompt blocks is keyboard-accessible
- [ ] No content relies on color alone
- [ ] Contrast ratio meets minimum standards

## Mobile

- [ ] Guide has been previewed at 375px width
- [ ] No horizontal scroll at mobile width
- [ ] Prompt blocks are full width and copyable on mobile
- [ ] Next Guide link appears at the bottom of the page

## SEO

- [ ] Page title is under 60 characters
- [ ] Meta description is 140–160 characters
- [ ] URL slug matches metadata exactly
- [ ] Primary keyword appears in first 100 words
- [ ] JSON-LD structured data is present

## Connections

- [ ] Guide is linked from the Pillar page
- [ ] Guide is listed as a prerequisite in its Next Guide
- [ ] Guide is listed on at least one Mission page
- [ ] If a Related Tool is listed, the Tool page links back to this Guide
- [ ] Guide has at least two incoming links from other Guides or Mission pages

---

# What Makes a Guide Fail

A Guide fails and must be revised if any of the following is true.

**It teaches a tool's interface.**

Buttons change. Menus move. Interfaces update. Teaching the interface is teaching something that will become wrong.

Teach the concept the interface serves.

**It has no Exercise.**

A Guide without an Exercise is an article. Articles are not Guides.

**The learner cannot self-assess completion.**

If the learner cannot tell whether they achieved the Learning Outcome, the outcome is too vague.

**It ends without recommending a next step.**

Every Guide must push the learner forward. Stopping is not an option.

**It teaches more than one concept.**

Complexity is the enemy of completion. One Guide. One concept. One behavioral change.

**It repeats content from another Guide.**

Find the existing Guide. Link to it. Do not repeat it.

**It promotes one AI platform as the only option.**

Cyberussell is AI-agnostic. The Guide must present the AI tool as one option among appropriate options.

**It was written for the writer, not the learner.**

If the Guide sounds impressive but does not help a beginner Filipino learner take action, it has failed its purpose.

---

# The Standard This Document Exists to Protect

Every Filipino who opens a Cyberussell Guide deserves the same experience.

Clear.

Fast.

Practical.

Respectful of their time.

Connected to a real opportunity.

This standard is not about aesthetic consistency.

It is about trust.

When a learner opens any Guide on Cyberussell, they should immediately know what they are going to learn, why it matters, and exactly what they need to do.

That experience — every time, on every Guide — is what this document protects.
