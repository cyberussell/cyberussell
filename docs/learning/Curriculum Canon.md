# Cyberussell Curriculum Canon

Version: 1.0
Status: Living Document
Depends on: Learning Canon v1.0

---

# Purpose

The Curriculum Canon defines how all learning content inside Cyberussell is structured, organized, connected, and measured.

The Learning Canon defines why we teach.

The Curriculum Canon defines how we build.

Every content creator, developer, and architect working on the Learn section must treat this document as the permanent authority on curriculum structure.

When in doubt, this document decides.

---

# Learning Hierarchy

All learning content inside Cyberussell follows a strict five-level hierarchy.

```
PILLAR
  └── GUIDE
        └── EXERCISE
              └── CHALLENGE
MISSION (cross-pillar, applied)
```

Each level has a specific role.

No level may perform the function of another level.

A Guide teaches one concept.

An Exercise applies one concept.

A Challenge tests one concept under pressure.

A Mission combines multiple concepts into a real deliverable.

A Pillar organizes related Guides into a coherent learning path.

---

# Pillar Definition

A Pillar is a thematic container for a set of related Guides.

A Pillar is not a course.

A Pillar is not a module.

A Pillar is a problem domain.

## Rules

- Every Pillar must represent a distinct area of AI-powered thinking or skill
- Every Pillar must have a clear outcome statement
- Every Pillar must have a defined audience entry point (beginner, intermediate, advanced)
- A Pillar may contain between 3 and 20 Guides
- A Pillar must include at least one Mission
- Pillars must not overlap in subject matter
- Pillars must be ordered to reflect natural learning progression

## Current Pillars

| Order | Pillar | Primary Focus |
|---|---|---|
| 1 | AI Foundations | Mindset and understanding |
| 2 | Think with AI | Collaboration and problem-solving |
| 3 | Meet Your AI Team | Tool selection and judgment |
| 4 | AI Workflows | Multi-tool application |
| 5 | Build Real Skills | Domain-specific practice |
| 6 | AI Missions | Real-world deliverables |

New Pillars may only be added when they represent a problem domain not covered by existing Pillars.

---

# Guide Definition

A Guide is the atomic unit of learning inside Cyberussell.

A Guide teaches exactly one concept.

A Guide produces exactly one behavioral change.

A Guide is not a collection of tips.

A Guide is not an overview.

A Guide is not documentation.

## Rules

- Every Guide belongs to exactly one Pillar
- Every Guide has one stated learning outcome
- Every Guide includes at least one Exercise
- Every Guide recommends the next Guide
- Every Guide may optionally recommend one Cyberussell Tool
- Guides within a Pillar must be ordered by learning dependency
- A Guide must be completable in 5–15 minutes
- A Guide must not duplicate content from another Guide
- A Guide must not teach a tool's interface — it must teach a concept that the tool supports

## Guide Metadata

Every Guide must carry the following metadata.

```
slug:          unique-kebab-case-identifier
pillar:        pillar slug
title:         plain language title
outcome:       one sentence — what the learner will be able to do
difficulty:    beginner | intermediate | advanced
time:          5 | 10 | 15 (minutes)
prerequisites: [list of guide slugs] or []
next_guide:    guide slug
related_tool:  tool slug or null
mission_tags:  [list of mission slugs this guide contributes to]
status:        draft | review | published
```

---

# Mission Definition

A Mission is a real-world project that requires a learner to apply knowledge from multiple Guides.

A Mission is not a Guide.

A Mission is not a test.

A Mission is a deliverable.

The learner finishes a Mission with something tangible they created.

## Rules

- Every Mission must produce one concrete deliverable
- Every Mission must reference at least two Guides as prerequisites
- Every Mission must specify the AI tools required
- Every Mission must include a checklist of steps
- Every Mission must include a reflection section
- Every Mission must have an estimated completion time of 30–120 minutes
- Every Mission must have a difficulty rating
- Every Mission should naturally connect to an Earn path
- A Mission may span multiple Pillars
- Missions are not gated behind payment unless they include premium exercises, templates, or AI review

## Mission Metadata

```
slug:           unique-kebab-case-identifier
title:          action-oriented title (verb + noun)
difficulty:     beginner | intermediate | advanced
time:           estimated minutes (30, 45, 60, 90, 120)
deliverable:    one sentence describing the tangible output
required_guides: [list of guide slugs]
required_ai:    [chatgpt | claude | gemini]
earn_path:      earn section slug or null
status:         draft | review | published
```

---

# Exercise Definition

An Exercise is a structured action inside a Guide.

Every Exercise must require the learner to interact with an AI tool.

Reading alone is never an Exercise.

Answering a multiple-choice question is never an Exercise.

## Exercise Tiers

### Tier 1 — Copy and Use

The learner copies a provided prompt and runs it.

Purpose: Remove the barrier of starting from scratch.

Example: "Copy this prompt into ChatGPT and read the response."

### Tier 2 — Modify and Improve

The learner takes a provided prompt or output and improves it.

Purpose: Build judgment by comparing before and after.

Example: "Rewrite this prompt to be more specific. Run both versions and compare."

### Tier 3 — Build from Scratch

The learner creates their own prompt, workflow, or output without a template.

Purpose: Develop independent capability.

Example: "Write your own prompt to research a business idea. Run it and evaluate the result."

## Rules

- Every Guide must include at least one Exercise at Tier 1 or higher
- Beginner Guides should default to Tier 1
- Intermediate Guides should include Tier 2
- Advanced Guides should include Tier 3
- An Exercise must state the expected outcome before the learner begins
- An Exercise must include a reflection prompt after completion

---

# Challenge Definition

A Challenge is an optional extension of a Guide that tests the concept under harder conditions.

A Challenge is not required to complete the Guide.

A Challenge is for learners who want to go deeper.

## Rules

- Every Challenge must be solvable using only what the Guide taught
- A Challenge must not introduce new concepts
- A Challenge must have a higher difficulty than the Guide it belongs to
- A Challenge should take no more than 15 additional minutes
- A Challenge may include a peer comparison element ("Compare your result with this example")
- Challenges may be used as prerequisites for advanced Guides or premium Missions

---

# Learning Progression Rules

Learners move through the curriculum in the following order.

```
Beginner → Intermediate → Advanced
```

Movement between levels is based on completion, not time.

A learner who completes all Beginner Guides in a Pillar is considered ready for Intermediate Guides in that Pillar.

A learner does not need to complete all Pillars at one level before advancing in a single Pillar.

## Progression Model

Cyberussell uses a spiral progression model.

Learners revisit the same core skills at increasing depth across Pillars and difficulty levels.

Example

- Foundations (Beginner): What is a prompt?
- Think with AI (Intermediate): How do I structure a prompt for a complex task?
- Build Real Skills (Advanced): How do I build a reusable prompt system for my workflow?

The same concept — prompting — appears three times at increasing depth.

This is intentional.

---

# Difficulty Levels

## Beginner

The learner has no prior experience with AI tools.

The learner may not be comfortable with technology.

The learner needs small, safe steps.

Rules

- No assumed knowledge
- Maximum one new concept per Guide
- Provide example prompts — never ask them to create from scratch first
- Celebrate every completion

## Intermediate

The learner has completed at least one Pillar at Beginner level.

The learner can use AI tools independently.

The learner is ready to combine concepts.

Rules

- One or two assumed concepts (referenced, not re-explained)
- May introduce multi-step exercises
- Encourage modification and experimentation
- Connect to real use cases in freelancing or work

## Advanced

The learner actively uses AI in their work or projects.

The learner is ready to build systems, not just use tools.

Rules

- Assume familiarity with all Beginner and Intermediate content
- Focus on judgment, not instruction
- Exercises require independent problem-solving
- Connect to Earn paths and income opportunities

---

# Estimated Completion Time Standards

These time estimates must appear in every Guide and Mission.

They must reflect real completion time including the Exercise, not just the reading.

## Guides

| Type | Time |
|---|---|
| Concept Guide | 5 minutes |
| Skill Guide | 10 minutes |
| Applied Guide | 15 minutes |

A Guide that requires more than 15 minutes must be split into two Guides.

## Missions

| Scope | Time |
|---|---|
| Single-tool Mission | 30 minutes |
| Multi-tool Mission | 45–60 minutes |
| Full-project Mission | 90–120 minutes |

A Mission that requires more than 120 minutes must be split into a Mission Series.

## Mission Series

A Mission Series is a group of two to four Missions that together produce a larger deliverable.

Example: "Build Your Freelance Business" Series

- Mission 1: Create Your Profile (45 min)
- Mission 2: Write Your First Proposal (30 min)
- Mission 3: Build Your Portfolio Page (60 min)
- Mission 4: Set Your Rates (30 min)

---

# Prerequisite Rules

Prerequisites define what a learner must complete before accessing a Guide or Mission.

## Guide Prerequisites

A Guide may have zero to three prerequisites.

If a Guide requires more than three prerequisites, the curriculum architecture is wrong.

Simplify or split the Guide.

Prerequisites must be from the same Pillar unless the cross-Pillar dependency is explicitly documented.

## Mission Prerequisites

A Mission must have at least two Guide prerequisites.

A Mission prerequisite may come from any Pillar.

All Mission prerequisites must be documented in the Mission metadata.

## Hard vs. Soft Prerequisites

Hard prerequisite — the learner cannot understand the content without this prior knowledge. The content must be blocked until completed.

Soft prerequisite — the content is easier with this prior knowledge, but not impossible without it. Display a recommendation, not a block.

Label all prerequisites in metadata as hard or soft.

---

# Unlock Rules

Cyberussell does not lock knowledge behind paywalls.

The following content is always free.

- All Guides
- All Exercises (Tier 1 and Tier 2)
- All Beginner Missions
- All Pillar pages

The following content may be premium.

- Tier 3 Exercises in advanced Guides
- Advanced Mission templates
- AI-reviewed Mission submissions
- Mission Packs (curated series with deliverables)
- Career Track bundles
- Certificates and badges
- Progress tracking dashboard

Premium must never lock a learner out of understanding.

Premium unlocks practice depth, feedback, and recognition — not knowledge.

---

# Completion Rules

## Guide Completion

A Guide is considered complete when the learner has finished the Exercise.

Completing the Exercise is the only requirement.

There are no quizzes.

There are no minimum scores.

There is no time requirement.

## Mission Completion

A Mission is considered complete when the learner produces and acknowledges the deliverable.

The deliverable must be self-assessed against the Mission checklist.

Premium Missions may include an AI-assisted review step.

## Pillar Completion

A Pillar is considered complete when the learner finishes all published Guides within it at any difficulty level.

Completing a Pillar unlocks the ability to start the Mission associated with that Pillar.

## Academy Completion

A learner has completed the AI Academy when they have finished all six Pillars and at least one Mission per Pillar.

Academy completion is a milestone, not an endpoint.

---

# Progress Tracking Philosophy

Cyberussell does not gamify learning.

There are no streaks.

There are no daily minimums.

There are no leaderboards.

Progress is personal.

## What Progress Tracking Should Do

Show the learner where they are.

Show the learner what they have accomplished.

Show the learner what is available next.

Show the learner how their completed work connects to earning.

## What Progress Tracking Must Not Do

Shame the learner for inactivity.

Create urgency through artificial deadlines.

Rank learners against one another.

Reduce learning to a number or percentage.

## Progress Data to Track

- Guides completed (by Pillar)
- Exercises completed (by Tier)
- Missions completed (with deliverable)
- Challenges completed
- Earn paths unlocked through learning

---

# How Guides Connect to Missions

Every Guide must be tagged with the Missions it contributes to.

This creates a visible path from concept learning to real-world application.

## Connection Model

```
Guide A ──┐
Guide B ──┤──► Mission X ──► Earn Path Y
Guide C ──┘
```

A learner who completes Guides A, B, and C has everything they need to start Mission X.

Mission X, when complete, directly connects to Earn Path Y.

## Rules

- A Guide may contribute to multiple Missions
- A Mission may not exist without at least two contributing Guides
- The connection between a Guide and a Mission must be explicit — not implied
- Every Mission page must list its contributing Guides
- Every Guide page must list the Missions it unlocks

---

# How Missions Connect to Earn

Every Mission should have a clear line to an income opportunity inside Cyberussell's Earn section.

This is the most important architectural principle in the curriculum.

Learning that does not connect to earning is incomplete.

## Connection Model

```
Mission ──► Earn Path ──► Real Income Opportunity
```

Examples

| Mission | Earn Path |
|---|---|
| Create Your First Resume | Remote Jobs / Freelancing |
| Build a Landing Page | Website Services / Freelancing |
| Write a Freelance Proposal | Freelancing |
| Research a Business Idea | Entrepreneurship / Digital Products |
| Create a Social Media Calendar | Content Creation / Freelancing |
| Design a Logo | Freelancing / Canva Design Services |

## Rules

- Every Mission must include a section: "What You Can Do With This"
- That section must link to the relevant Earn path
- The Earn path page must acknowledge learners arriving from a Mission
- A Mission without an Earn connection must not be published

---

# Tool Integration Rules

Cyberussell Tools are standalone applications that help learners do work.

They are not lessons.

They are not replacements for Guides.

They are the workshop, not the classroom.

## The Correct Relationship

```
Guide (teaches the concept)
  ↓
Exercise (applies the concept manually)
  ↓
Cyberussell Tool (accelerates the application)
  ↓
Reflection (deepens understanding)
  ↓
Next Guide
```

## Rules

- A Guide may recommend one Tool — never more than one
- A Tool must not be explained in a Guide — it must be experienced
- A Tool must not replace the Exercise — it must follow the Exercise
- A Tool page must link back to the Guide that recommended it
- If no relevant Tool exists, the Guide omits the Tool section entirely
- Tools must never be mentioned in Missions as a requirement — only as an option

---

# Cross-Linking Rules

Every piece of content inside the Learn section must link to related content.

Cross-linking is how learners discover depth without being overwhelmed.

## Required Links in Every Guide

- Previous Guide (if applicable)
- Next Guide (required)
- Related Missions (1–3)
- Related Tool (0–1)
- Related Earn Path (0–1)

## Required Links in Every Mission

- All prerequisite Guides
- Next Mission recommendation (0–1)
- Related Earn Path (required)
- Related Cyberussell Tool (0–1)

## Cross-Pillar Links

A Guide in Pillar 2 may reference a concept from Pillar 1.

It must link to the Pillar 1 Guide — not re-explain the concept.

Re-explaining a concept that already has a Guide creates duplication and dilutes quality.

Link. Do not repeat.

## Rules

- No orphan content — every Guide and Mission must be reachable from at least two other pages
- No dead ends — every Guide and Mission must recommend a next step
- Links must use the Guide or Mission title — never generic text like "click here"

---

# Future Expansion Rules

The curriculum will grow over time.

These rules protect the architecture as it scales.

## Adding a New Guide

A new Guide may be added when:

- A real learner need exists that no current Guide addresses
- The concept is not already covered by an existing Guide
- The Guide belongs clearly to one Pillar
- The Guide has a defined prerequisite and next-guide relationship
- The Guide has been written to the full Guide Structure from the Learning Canon

A new Guide must not be added to fill a gap in a pillar count.

Quality over quantity.

## Adding a New Pillar

A new Pillar may be added only when:

- An entire domain of AI-powered thinking or skill exists that no current Pillar covers
- The domain can support at least five Guides and one Mission
- The new Pillar has a clear position in the progression order
- The new Pillar does not overlap with an existing Pillar's scope

Proposed Pillars must be reviewed against this document before development begins.

## Adding a New Mission

A new Mission may be added when:

- A real-world deliverable exists that current Missions do not address
- At least two published Guides can serve as prerequisites
- The Mission connects to a defined Earn path
- The Mission produces a tangible deliverable

## Retiring Content

A Guide may be retired when:

- The concept it teaches is fully superseded by a better Guide
- The AI tools it references no longer exist
- It has received consistent negative feedback that cannot be addressed through revision

Retired content must be redirected — never deleted — to preserve external links and learner history.

## Version Control

Every major revision to a Guide or Mission must increment its version number.

```
Guide version history:
v1.0 — Published
v1.1 — Minor edits (style, links, typos)
v2.0 — Major revision (concept updated, exercise changed)
```

Changes that affect prerequisites or Earn path connections require a full curriculum review before publication.

---

# Curriculum Integrity Rules

These rules exist to protect the learner experience as the curriculum scales.

No Guide may be published that:

- Does not include an Exercise
- Does not state a learning outcome
- Does not recommend a next Guide
- Teaches interface navigation instead of problem-solving
- Duplicates content from an existing Guide
- Promotes a specific AI platform as the only option

No Mission may be published that:

- Does not produce a tangible deliverable
- Has fewer than two Guide prerequisites
- Has no connection to an Earn path
- Takes longer than 120 minutes without being structured as a Mission Series

No Pillar may be published that:

- Contains fewer than three Guides
- Has no Mission
- Overlaps in scope with an existing Pillar

---

# The Curriculum Promise

Every structural decision in this document serves one purpose.

To help a Filipino learner move — step by step, concept by concept, mission by mission — from uncertainty to confidence.

The architecture exists to remove friction between learning and earning.

Not to create complexity.

Not to impress educators.

Not to mirror other course platforms.

Every rule in this document should make it easier for someone to finish a Guide, complete a Mission, and take their first step toward earning online.

If a rule does not serve that purpose, revise this document.
