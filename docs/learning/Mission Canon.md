# Cyberussell Mission Canon

Version: 1.0
Status: Living Document
Depends on: Learning Canon v1.0, Curriculum Canon v1.0, Guide Canon v1.0, Exercise Canon v1.0

---

# Purpose

The Mission Canon defines exactly how Cyberussell delivers project-based learning.

The Learning Canon defines why we teach.

The Curriculum Canon defines how content is structured.

The Guide Canon defines how Guides are written.

The Exercise Canon defines how learners learn by doing.

The Mission Canon defines how learners prove they are ready.

A Mission is not a test.

A Mission is not a review.

A Mission is not a longer Guide.

A Mission is the moment when everything a learner has practiced becomes something real.

---

# Mission Philosophy

## Knowledge without application is incomplete.

A learner can finish every Guide in a Pillar and still not know if they can do the work.

Guides teach concepts.

Missions test whether those concepts survive contact with a real problem.

The Mission is where learning becomes capability.

## The deliverable is the point.

Every Mission ends with something the learner created.

Not a score.

Not a badge.

Not a completed checklist.

A real output — something they could send to a client, post in a portfolio, or use in their actual life.

The deliverable is the evidence that the learning worked.

## Missions must be worth doing.

A learner chooses to take on a Mission.

Nobody forces them.

The Mission must feel worth the time it requires.

It must produce something the learner wants to have made.

If a Mission does not produce something a learner would be proud of, it must be redesigned.

## AI is a tool, not a crutch.

In a Mission, the learner is in charge.

AI is available — as it should be.

But the decisions belong to the learner.

The learner decides what to use AI for.

The learner decides what to write themselves.

The learner decides when the output is good enough.

A Mission that AI can complete without the learner's judgment is not a Mission. It is a demonstration.

## Missions connect learning to earning.

Every Mission must end with a visible path to income.

A learner who completes a Mission should be able to look at the result and say:

"I could get paid for this."

That connection — between what they made and what they could earn — is the most important thing a Mission delivers.

---

# Mission Metadata

Every Mission must include complete metadata before content begins.

```
---
slug:              unique-kebab-case-identifier
title:             Action verb + noun (e.g. "Create Your First Resume")
pillar:            primary-pillar-slug
difficulty:        beginner | intermediate | advanced
type:              single-tool | multi-tool | full-project | series-part
time:              30 | 45 | 60 | 90 | 120
deliverable:       One sentence describing the tangible output
required_guides:   [guide-slug-1, guide-slug-2, guide-slug-3]
required_ai:       [chatgpt | claude | gemini]
optional_tools:    [cyberussell-tool-slug] or []
earn_path:         earn-path-slug
series_slug:       mission-series-slug or null
series_position:   1 | 2 | 3 | 4 or null
portfolio:         true | false
premium:           false | partial | full
badge:             badge-slug or null
certificate:       certificate-slug or null
version:           1.0
status:            draft | review | published
---
```

No Mission may be submitted for review without complete metadata.

---

# Mission Types

Every Mission belongs to exactly one of four types.

## Single-Tool Mission

The learner uses one AI tool to produce the deliverable.

Time: 30 minutes.

Appropriate for Beginner Missions and for concepts that require depth in one tool.

## Multi-Tool Mission

The learner uses two or more AI tools and integrates their outputs into one deliverable.

Time: 45–60 minutes.

Appropriate for Intermediate Missions and for concepts in Pillar 3 (Meet Your AI Team) and Pillar 4 (AI Workflows).

## Full-Project Mission

The learner completes an end-to-end project from brief to deliverable.

Time: 90–120 minutes.

Appropriate for Advanced Missions in Pillar 5 (Build Real Skills) and Pillar 6 (AI Missions).

## Series Part

A Series Part is one Mission inside a Mission Series.

A Mission Series is a group of two to four Missions that together produce a larger deliverable.

Each Series Part is a standalone Mission that contributes to the Series outcome.

A learner may complete Series Parts in order or return to them independently.

---

# Mission Structure

Every Mission follows the same eleven-section structure in the same order.

No section may be skipped.

No section may be reordered.

No section may be merged with another.

## Section Order

1. Mission Brief
2. Objective
3. Outcome
4. Required Guides
5. Required AI Tools
6. Deliverable Definition
7. Mission Steps
8. Reflection
9. Portfolio Entry
10. What You Can Do With This
11. Footer Metadata

---

## Section 1 — Mission Brief

The Mission Brief introduces the Mission and tells the learner exactly what they are about to build.

### Rules

- Must be written as a real-world scenario, not an academic prompt
- Must name a specific situation the learner would actually face
- Must be written in second person
- Must not exceed 100 words
- Must not include any instructions — only context
- Must make the learner feel like the Mission is worth doing before they read another word

### Format

The Brief reads like a situation handed to someone who needs to solve it.

It names the problem.

It names the person facing it.

It implies the stakes.

### Good Brief

"You just got a message from someone looking for a virtual assistant. They want to set up an interview, but they asked you to send your resume first — and you don't have one yet. You have today to build it."

### Bad Brief

"In this Mission, you will create a resume using AI tools. This will help you practice what you learned in the previous Guides."

---

## Section 2 — Objective

The Objective states exactly what the Mission requires the learner to accomplish.

### Rules

- Must be one sentence
- Must name the deliverable explicitly
- Must be written as an action the learner will take — not a skill they will develop
- Must match the `deliverable` field in metadata exactly

### Format

```
OBJECTIVE

[Action verb] [specific deliverable] that [specific standard or quality bar].
```

### Examples

Good: "Create a professional resume for a virtual assistant role that you could send to a real employer today."

Good: "Build a landing page for a freelance service that includes a headline, three features, and a contact form."

Bad: "Learn how to use AI to write a resume."

Bad: "Practice resume writing with the help of ChatGPT."

---

## Section 3 — Outcome

The Outcome states what the learner will be able to do after completing this Mission — beyond the deliverable itself.

### Rules

- Must be one to three sentences
- Must describe a durable capability, not just a completed task
- Must connect to the learner's earning potential or professional development
- Must be written in second person

### Distinction from Objective

The Objective defines what the learner will produce.

The Outcome defines what the learner will be able to do because they produced it.

### Example

Objective: "Create a professional resume for a virtual assistant role."

Outcome: "After this Mission, you will know how to structure and write a resume using AI — and you will be able to update it, adapt it for different roles, and produce a new one in under 30 minutes."

---

## Section 4 — Required Guides

Every Mission must list the Guides that prepare the learner for the work ahead.

### Rules

- Must list a minimum of two Guides
- Must list a maximum of six Guides
- Must distinguish between hard prerequisites (required to understand the Mission) and soft prerequisites (helpful but not required)
- Must link directly to each Guide
- Must display the Guide title, Pillar, and estimated time
- Must not list Guides that are only tangentially related

### Format

```
BEFORE YOU START

These Guides prepare you for this Mission.

Required (complete these first)
- [Guide Title] — [Pillar] — [X min]
- [Guide Title] — [Pillar] — [X min]

Recommended (helpful but not required)
- [Guide Title] — [Pillar] — [X min]
```

### Rules for Hard Prerequisites

A Guide is a hard prerequisite when the Mission uses a concept the Guide teaches directly.

The Mission may not be started without completing the hard prerequisites.

### Rules for Soft Prerequisites

A Guide is a soft prerequisite when it provides useful context but not essential knowledge.

Soft prerequisites are displayed as recommendations, not requirements.

---

## Section 5 — Required AI Tools

Every Mission must specify which AI tools the learner needs and why each one is used.

### Rules

- Must list only the AI tools actually used in the Mission Steps
- Must explain in one sentence what each tool is used for in this Mission
- Must not list AI tools as required if they are optional
- Must not require a paid AI account unless a free version is available for the Mission's requirements
- Must not endorse one tool as superior — explain the role, not the ranking

### Format

```
TOOLS FOR THIS MISSION

[AI Tool Name] — [One sentence: what you will use it for in this Mission]
[AI Tool Name] — [One sentence: what you will use it for in this Mission]

Optional
[Cyberussell Tool Name] — [One sentence: how it can support this Mission]
```

---

## Section 6 — Deliverable Definition

The Deliverable Definition tells the learner exactly what they will produce and what makes it complete.

This is the most important section for learner motivation.

If the learner cannot clearly see what they are building, they will not start.

### Rules

- Must describe the deliverable in concrete terms — format, length, content, and quality bar
- Must include a checklist of what the deliverable must contain at a minimum
- Must not set a perfection standard — set a "ready to use" standard
- Must not describe a process — only the end result
- Must be written so a learner can self-assess their output against it

### Format

```
YOUR DELIVERABLE

You will produce: [name the deliverable]

The deliverable is complete when it includes:
- [ ] [Required element 1]
- [ ] [Required element 2]
- [ ] [Required element 3]
- [ ] [Required element 4]
- [ ] [Required element 5]

The deliverable does not need to be perfect.
It needs to be ready to use.
```

### Deliverable Quality Standard

The quality bar for all Missions is "ready to use."

Not perfect.

Not publishable to a professional portfolio with zero edits.

Ready to use.

A resume that a real employer could read.

A landing page that a real visitor could understand.

A proposal that a real client could respond to.

If a learner meets the checklist, the deliverable is complete.

---

## Section 7 — Mission Steps

Mission Steps are the core of the Mission.

They walk the learner through the production of the deliverable.

### Rules

- Must be numbered
- Must be sequential — each Step assumes the previous Step is complete
- Must not exceed eight Steps total
- Each Step must describe one action
- Each Step must produce a sub-output that contributes to the final deliverable
- Each Step must specify which AI tool to use, if applicable
- Each Step must include a prompt block where a prompt is required
- Each Step may include a Tier 1 prompt, a Tier 2 modification, or a Tier 3 goal
- Steps must not include theory or concept explanation — those belong in Guides
- If a Step requires prior knowledge, it must reference the Guide that teaches it — not re-explain it

### Step Format

```
STEP [N] — [Step Title]

What you are doing: [One sentence]
Tool: [AI tool or "Your own judgment"]

[Prompt block if applicable]

What you produce: [One sentence describing the sub-output]
```

### Step Count by Mission Type

| Mission Type | Minimum Steps | Maximum Steps |
|---|---|---|
| Single-Tool | 3 | 5 |
| Multi-Tool | 4 | 6 |
| Full-Project | 5 | 8 |
| Series Part | 3 | 6 |

### Prompt Blocks in Steps

Prompt blocks inside Mission Steps follow the same format as Exercise prompt blocks.

They must be labeled with the target AI tool.

They must be copyable.

They must be distinct from instructional text.

At Intermediate and Advanced difficulty, prompt blocks may provide a framework rather than a complete prompt.

At Advanced difficulty, Steps may provide a goal only and require the learner to write the prompt themselves.

### Step Quality Rules

A Step that requires more than 10 minutes must be split into two Steps.

A Step that produces no sub-output must be redesigned.

A Step that explains a concept must be replaced with a link to the Guide that teaches that concept.

---

## Section 8 — Reflection

Reflection is not optional in a Mission.

A learner who builds a deliverable and does not reflect on the process is less likely to be able to repeat or improve on it.

### Rules

- Must include three to five reflection questions
- All questions must be open-ended
- At least one question must ask about the process, not the output
- At least one question must connect the Mission to an earning context
- At least one question must ask about what the learner would do differently
- Must not ask the learner to rate the Mission or evaluate Cyberussell
- Must not be structured as a quiz

### Reflection Question Categories

Every Mission Reflection must include one question from each of the following three categories.

**Process question** — about how the learner worked

"Which Step took you the longest, and what made it harder than you expected?"

"When did you feel most confident during this Mission?"

"Where did you rely on your own judgment rather than following the prompt?"

**Quality question** — about the deliverable

"What would you change about the deliverable if you had one more hour?"

"What part of the deliverable are you most satisfied with, and why?"

"If a client or employer looked at this right now, what would you want them to notice first?"

**Earning question** — about the connection to income

"Who would pay for something like this, and what would they pay?"

"How would you improve this deliverable before including it in a portfolio?"

"What skill did this Mission prove you have — and how would you describe it to a potential client?"

### Format

```
REFLECT

Before you move on, take a few minutes with these questions.

You don't need to write anything down unless you want to.

1. [Process question]
2. [Quality question]
3. [Earning question]
4. [Optional additional question]
5. [Optional additional question]
```

---

## Section 9 — Portfolio Entry

Every Mission produces a Portfolio Entry.

A Portfolio Entry is a structured record of what the learner built, how they built it, and what it demonstrates.

Portfolio Entries accumulate across Missions into a learner's Cyberussell Portfolio.

The Portfolio is the evidence of capability.

### Rules

- Every Mission must generate a Portfolio Entry upon completion
- The Portfolio Entry must display the deliverable title, the Mission completed, the date, and the AI tools used
- The Portfolio Entry must include a self-written description of what the learner made
- The Portfolio Entry must include a space for the learner to paste or link their deliverable
- The Portfolio Entry must not be public by default
- The learner controls whether any Portfolio Entry is visible to others
- Portfolio Entries must be exportable

### Portfolio Entry Format

```
PORTFOLIO ENTRY

Mission: [Mission Title]
Completed: [Date]
Difficulty: [Beginner | Intermediate | Advanced]
AI Tools Used: [List]

What I built:
[Learner writes 1–3 sentences describing the deliverable]

My deliverable:
[Paste, upload, or link]

What this demonstrates:
[Auto-populated from Mission metadata — the earn_path and outcome]
```

### Portfolio Building Philosophy

The Portfolio is not a certificate.

It is not a grade.

It is not a credential issued by Cyberussell.

It is evidence the learner collected themselves, from work they actually did.

A learner who completes ten Missions has ten entries in their Portfolio.

Each entry represents something real they built.

That is worth more than a certificate that says they watched ten videos.

---

## Section 10 — What You Can Do With This

This section connects the completed Mission to a real earning opportunity inside Cyberussell's Earn section.

This section is not optional.

A Mission without an Earn connection must not be published.

### Rules

- Must name the specific Earn path this Mission connects to
- Must explain in two to four sentences how the deliverable from this Mission prepares the learner for that path
- Must include one concrete example of how someone could earn using this deliverable or this skill
- Must not overstate income claims — be accurate and grounded
- Must link directly to the Earn path page

### Format

```
WHAT YOU CAN DO WITH THIS

You just built [deliverable].

That matters because [specific connection to earning].

[Concrete example: "A freelancer with a portfolio of landing pages can charge ₱3,000–₱8,000 per page on platforms like Upwork, OnlineJobs.ph, and through direct referrals."]

[Explore [Earn Path Name] →]
```

---

## Section 11 — Footer Metadata

Every Mission ends with a visible metadata footer displayed to the learner.

```
Mission: [Mission Title]
Pillar: [Pillar Name]
Version: [x.x]
Last updated: [Month Year]
Required Guides: [Guide Title 1], [Guide Title 2]
Earn Path: [Earn Path Name]
Portfolio: Yes
```

---

# Difficulty Standards

## Beginner Mission

The learner has completed Beginner Guides in the relevant Pillar.

They can use one AI tool independently for a defined task.

They have not yet produced a professional deliverable from scratch.

### Rules

- Must use Single-Tool Mission type only
- Must provide Tier 1 or Tier 2 prompts for all Steps
- Must have a clearly defined deliverable checklist with no ambiguity
- Must not require the learner to make strategic decisions about content — those are guided
- Must be completable in 30 minutes
- The deliverable must be something a beginner would be proud of, not embarrassed by

## Intermediate Mission

The learner has completed at least one Beginner Mission in this Pillar.

They can use two or more AI tools.

They can evaluate AI outputs and make judgment calls about quality.

### Rules

- May use Single-Tool or Multi-Tool Mission type
- May include Tier 2 and Tier 3 prompts
- May ask the learner to make quality decisions about their output
- May include comparison steps between two AI outputs
- Must be completable in 45–60 minutes

## Advanced Mission

The learner actively uses AI tools in work or personal projects.

They can define their own approach and evaluate results against a professional standard.

### Rules

- Must use Multi-Tool or Full-Project Mission type
- Must include at least one Tier 3 Step where the learner writes their own prompt
- Must include at least one Step that requires independent judgment
- Must connect directly to a specific Earn path with income context
- Must be completable in 90–120 minutes
- The deliverable must meet a "ready to send to a client" standard

---

# Mission Length Standards

Time estimates for Missions must reflect actual completion time including all Steps, AI interactions, and Reflection.

They must not reflect best-case scenarios.

| Mission Type | Time |
|---|---|
| Single-Tool | 30 minutes |
| Multi-Tool | 45–60 minutes |
| Full-Project | 90–120 minutes |
| Series Part | 30–60 minutes per part |

A Mission that exceeds 120 minutes must be converted into a Mission Series.

A Mission Series that exceeds four parts must be evaluated for scope — it may represent two separate Missions.

---

# Completion Criteria

## What Counts as Mission Completion

A Mission is complete when the learner:

1. Completes all required Steps
2. Produces the deliverable and confirms it meets the checklist
3. Answers the Reflection questions
4. Creates the Portfolio Entry

All four must happen.

A learner who completes all Steps but skips the Portfolio Entry has not completed the Mission.

A learner who creates the deliverable but skips the Reflection has not completed the Mission.

## Self-Assessment Standard

There is no score.

There is no minimum quality threshold enforced by the platform.

The learner assesses their own deliverable against the Deliverable Definition checklist.

If they check all boxes, the Mission is complete.

The platform does not verify quality.

The learner's judgment is trusted.

## Incomplete Missions

A Mission that has been started but not completed is displayed as in progress.

The platform must show the learner exactly where they stopped and invite them to continue.

The platform must not shame incomplete Missions.

The platform must not delete progress from incomplete Missions.

A learner may return to an incomplete Mission at any time.

---

# Unlock Rules

## What Is Always Free

- All Beginner Missions
- All Mission Steps
- All prompt blocks inside Missions
- All Reflection sections
- All Earn Path connections
- All Portfolio Entries

## What May Be Premium

Premium features in Missions unlock practice depth, quality feedback, and recognition.

Premium never locks the ability to complete the Mission or produce the deliverable.

### Premium Mission Features

**AI-Assisted Review**

A premium feature that uses Claude to evaluate the learner's deliverable against the Mission's Deliverable Definition checklist.

The review identifies specific gaps and suggests improvements.

The review does not grade. It advises.

Available for Intermediate and Advanced Missions only.

**Mission Templates**

Pre-structured templates that accelerate Step completion.

Examples: resume templates, landing page outlines, proposal frameworks.

Templates are premium because they save significant time.

The free path produces the same deliverable — it just takes longer.

**Mission Packs**

A curated bundle of three to six related Missions with a shared portfolio theme.

Example: "Freelance Starter Pack" — Resume Mission + Proposal Mission + Portfolio Page Mission.

Sold as a unit.

Each Mission inside a Pack may also be completed individually for free.

**Career Tracks**

A curated sequence of Missions, Guides, and tools organized around a specific career or income path.

Example: "Virtual Assistant Career Track" — eight Missions from beginner to professional-ready.

Includes a final capstone Mission and a Career Track Certificate.

---

# Badges

Badges are visual recognition of Mission completion.

Badges are awarded automatically upon Mission completion.

Badges are not sold.

Badges are not paid.

Every learner who completes a Mission earns its Badge — free.

## Badge Rules

- One Badge per Mission
- Badge name must reflect the deliverable, not the process
- Badge must be displayable on the learner's Cyberussell profile
- Badge must be exportable as an image
- Badge must never expire
- Badge must display the Mission name and completion date

## Badge Naming Convention

Badges are named after what the learner built — not what they learned.

Bad badge name: "Completed Resume Guide"

Bad badge name: "AI Writing Fundamentals Badge"

Good badge name: "Resume Builder"

Good badge name: "Landing Page Creator"

Good badge name: "Freelance Proposal Writer"

## Badge Tiers

| Tier | Awarded For |
|---|---|
| Starter Badge | Completing first Mission in a Pillar |
| Builder Badge | Completing all Beginner Missions in a Pillar |
| Practitioner Badge | Completing all Intermediate Missions in a Pillar |
| Expert Badge | Completing all Advanced Missions in a Pillar |
| Pillar Badge | Completing all Missions in a single Pillar |
| Academy Badge | Completing at least one Mission per Pillar |

---

# Certificates

Certificates are formal recognition of sustained achievement.

Certificates are not awarded per Mission.

Certificates are awarded at the Pillar level, the Career Track level, and the Academy level.

## Certificate Types

### Pillar Certificate

Awarded when a learner completes all published Missions within a single Pillar.

Displays the Pillar name, number of Missions completed, and completion date.

Free.

### Career Track Certificate

Awarded when a learner completes an entire premium Career Track.

Displays the Career Track name, all Missions completed, and completion date.

Premium.

### AI Academy Certificate

Awarded when a learner completes at least one Mission in every Pillar.

The highest certificate issued by Cyberussell.

Displays all six Pillars and the learner's name.

Free — because completing all six Pillars is the achievement, and no learner should be charged for their own accomplishment.

## Certificate Rules

- Certificates must display the learner's name as entered in their profile
- Certificates must display Cyberussell branding and issue date
- Certificates must be downloadable as PDF
- Certificates must never expire
- Certificates must not claim more than they represent — do not describe them as accredited, industry-recognized, or equivalent to professional certification
- Certificate descriptions must use accurate, grounded language: "Cyberussell AI Academy Certificate of Completion"

---

# Premium Features

Premium unlocks practice depth, speed, feedback, and recognition.

Premium never locks knowledge, deliverables, or the ability to complete a Mission.

## Free vs. Premium Summary

| Feature | Free | Premium |
|---|---|---|
| All Mission Steps | ✓ | ✓ |
| All prompt blocks | ✓ | ✓ |
| All Reflection questions | ✓ | ✓ |
| Deliverable production | ✓ | ✓ |
| Portfolio Entry | ✓ | ✓ |
| Badges | ✓ | ✓ |
| Pillar Certificate | ✓ | ✓ |
| AI Academy Certificate | ✓ | ✓ |
| Mission Templates | — | ✓ |
| AI-Assisted Deliverable Review | — | ✓ |
| Mission Packs | — | ✓ |
| Career Track bundles | — | ✓ |
| Career Track Certificate | — | ✓ |
| Progress dashboard | — | ✓ |

## Premium Philosophy

The premium model must never create a two-class learning experience where free learners feel they are getting an inferior education.

A free learner who completes every Mission produces the same deliverables as a premium learner.

They take longer.

They do not receive AI-assisted feedback.

They do not receive a Career Track certificate.

But they learn the same things and build the same capabilities.

Premium saves time and adds feedback.

Premium does not gate understanding.

---

# Mission Quality Standards

Every Mission must pass this checklist before it is marked `status: review`.

## Structure

- [ ] All eleven sections are present and in correct order
- [ ] Metadata is complete with no null required fields
- [ ] Mission type is assigned and matches the time estimate
- [ ] Step count is within the limit for the Mission type
- [ ] Slug is unique across all published Missions

## Brief and Objective

- [ ] Brief reads as a real-world scenario, not an academic prompt
- [ ] Brief does not exceed 100 words
- [ ] Objective is one action-oriented sentence
- [ ] Objective names the deliverable explicitly
- [ ] Outcome describes a durable capability, not just a completed task

## Required Guides

- [ ] At least two hard prerequisite Guides are listed
- [ ] No more than six Guides total are listed
- [ ] All listed Guides exist and are published
- [ ] Hard and soft prerequisites are distinguished

## Deliverable

- [ ] Deliverable checklist contains minimum required elements
- [ ] Quality bar is "ready to use" — not perfect, not publishable without edits
- [ ] The learner can self-assess against the checklist without external help

## Mission Steps

- [ ] Every Step produces a sub-output
- [ ] Every Step that uses AI includes a prompt block
- [ ] No Step contains concept explanation — only action
- [ ] No Step exceeds 10 minutes
- [ ] Prompt blocks are labeled with target AI tool and are copyable
- [ ] Tier level of prompts matches Mission difficulty

## Reflection

- [ ] Three to five open-ended questions are present
- [ ] At least one process question is included
- [ ] At least one quality question is included
- [ ] At least one earning question is included
- [ ] No question can be answered with yes or no
- [ ] No question asks the learner to evaluate Cyberussell

## Portfolio

- [ ] Portfolio Entry section is present
- [ ] Portfolio Entry includes a space for the deliverable
- [ ] Portfolio Entry includes the self-written description field

## Earn Connection

- [ ] Earn path is named specifically — not generically
- [ ] Concrete income example is included
- [ ] Earn path link is present and functional

## Accessibility and Mobile

- [ ] Mission has been reviewed at 375px width
- [ ] All prompt blocks are full width and copyable on mobile
- [ ] Step navigation is usable without horizontal scrolling

## Connections

- [ ] Mission is linked from its Pillar page
- [ ] Mission is listed on all contributing Guide pages
- [ ] Earn path page acknowledges this Mission as a source

---

# What Makes a Mission Fail

A Mission must be revised before publication if any of the following is true.

**It produces no tangible deliverable.**

If the learner finishes the Mission without something they made, the Mission is not a Mission. It is a walkthrough. Redesign it until the learner ends with something real.

**It has fewer than two Guide prerequisites.**

A Mission that can be completed without prior learning is a shortcut. Shortcuts do not build capability. Add the prerequisite Guides — or simplify the Mission until it fits a single Guide.

**It can be completed by AI without the learner's judgment.**

If a learner can paste a single prompt, copy the output, and call the Mission done, the Mission has no intellectual requirement. Add Steps that require the learner to make decisions, evaluate quality, or make trade-offs.

**It has no Earn connection.**

Learning that cannot be connected to earning is incomplete by the standards of this platform. Every Mission must answer: "What could the learner earn with this?" If no answer exists, the Mission should not exist.

**It takes longer than 120 minutes.**

A Mission that requires more than two hours will not be finished. Break it into a Mission Series.

**The Brief sounds like a homework assignment.**

"In this Mission, you will practice..." is not a brief. It is an instruction. A brief puts the learner in a situation. Rewrite it.

**The Reflection questions are quizzes.**

A Mission Reflection is not a comprehension check. It is an invitation to think about process, quality, and opportunity. If the questions have right answers, they are the wrong questions.

**The deliverable standard is unclear.**

If a learner cannot tell whether their output is complete, the Deliverable Definition has failed. Rewrite the checklist until a learner can check each box with certainty.

---

# The Promise a Mission Makes

A learner who accepts a Mission accepts a challenge.

They set aside time.

They open tools they may not feel confident using.

They build something they have never built before.

When they finish, they have something real.

Not a quiz result.

Not a course completion notification.

Something they made.

Every rule in this document exists to protect the integrity of that experience.

A Mission that is too easy teaches nothing.

A Mission that is too hard finishes nothing.

A Mission that has no Earn connection leads nowhere.

The Mission Canon exists to make sure that every Mission Cyberussell publishes is worth a learner's time — and moves them one step closer to earning.
