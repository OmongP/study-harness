# design.md — My Growing English Diary

> **Purpose:** This document is the single source of truth for the visual and interaction design of the English diary service. It defines the design language, tokens, layout, component behavior, accessibility, and product-specific Do's and Don'ts. Product requirements belong in `prd.md`; work-process and agent-boundary rules belong in `story-work.md` / `harness.md`.

## 1. Overview

My Growing English Diary is a private English-writing service for adults who repeatedly restart English study. The interface should feel like a calm personal journal rather than a classroom, game, or social feed. The user's own sentence is always the visual protagonist; AI guidance stays secondary and must never visually replace or overpower what the user wrote.

The core learning experience is **EXPRESS → CORRECT → RECALL → REUSE**. The design must support this loop without streak pressure, grades, proficiency labels, celebration effects, or guilt about time away. Returning after a pause is treated as normal use.

The visual language is quiet and paper-like: warm off-white backgrounds, ink-colored text, restrained green accents, and minimal correction colors. User photos provide most of the visual richness. Color is functional, not decorative.

### Key Characteristics

- Calm, private, adult-journal tone
- User-written English is always more prominent than AI-generated guidance
- Warm paper-like surfaces with restrained functional color
- Minimal correction UI that preserves the original sentence
- No gamification, mascots, streak flames, scores, or celebratory effects
- Accessibility for adult users is built into type size, contrast, and touch targets
- Achievement is shown through dated evidence: first learned → recalled → independently reused

---

## 2. Colors

### Core

| Token | Value | Use |
|---|---:|---|
| `{colors.paper}` | `#FAF8F4` | Default app background |
| `{colors.surface}` | `#FFFFFF` | Cards, sheets, writing surfaces |
| `{colors.ink}` | `#1C1B19` | Primary text and icons |
| `{colors.ink-muted}` | `#6B6760` | Secondary text and metadata |
| `{colors.line}` | `#E6E2DA` | Dividers, subtle outlines, writing lines |

### Accent

| Token | Value | Use |
|---|---:|---|
| `{colors.accent}` | `#2F5D50` | Primary actions, selected states, reuse/Journey emphasis |
| `{colors.accent-soft}` | `#E4EEEA` | Comeback Card, Reuse Notice, selected or recalled surfaces |

### Correction

| Token | Value | Use |
|---|---:|---|
| `{colors.mark-issue}` | `#C8891E` | Marks an expression that can be refined |
| `{colors.mark-issue-soft}` | `#FBF1DE` | Soft background for a correction target |
| `{colors.mark-suggest}` | `#2F5D50` | Suggested natural expression |
| `{colors.danger}` | `#B3412E` | System/destructive errors only; never normal English correction |

### Color Principles

- Use colors only within the roles defined above.
- User photos may contain natural full color.
- Never use red to label a user's English as wrong.
- Never communicate meaning through color alone; pair color with text, underline, icon, or structure.
- Do not add decorative accent colors, gradients, or arbitrary status colors.

---

## 3. Typography

### Font Families

- **UI / Korean:** Pretendard
- **User-written English diary:** Newsreader
- **Fallback for diary text:** Georgia, serif

The type distinction is intentional: the user's English should feel like personal writing, while AI explanations and system UI should remain neutral and functional.

### Type Scale

| Token | Size | Weight | Line Height | Use |
|---|---:|---:|---:|---|
| `{typography.display}` | 28px | 700 | 1.3 | Key screen statements |
| `{typography.title}` | 22px | 700 | 1.35 | Screen titles |
| `{typography.heading}` | 18px | 600 | 1.4 | Section/card headings, AI questions |
| `{typography.body}` | 16px | 400 | 1.6 | Default readable UI and Korean explanation text |
| `{typography.diary}` | 18px | 400 | 1.75 | User-written English diary text |
| `{typography.label}` | 14px | 600 | 1.4 | Short labels and compact controls only |
| `{typography.caption}` | 13px | 400 | 1.5 | Dates and metadata only |

### Typography Principles

- User-written English always uses `{typography.diary}` where space permits.
- AI questions use `{typography.heading}`; AI explanations use `{typography.body}`.
- Readable content text must be at least 16px. `label` and `caption` are exceptions only for short control labels and metadata.
- Text must remain readable when the system text size is enlarged up to 200%; informative content may wrap to additional lines.
- Do not fix informative content to a line count when enlarged text would be truncated.
- Avoid decorative typography, all-caps emphasis, or classroom-like red marking.

---

## 4. Layout & Shapes

### Baseline Screen

| Name | Width × Height | Notes |
|---|---:|---|
| Baseline | `390 × 844` | Default Figma key-screen frame |
| Minimum | `360px` width | No horizontal scrolling; content wraps |

MVP is mobile-first. Tablet and desktop layouts are out of scope.

### Spacing

- Base unit: `4px`
- Allowed primary spacing tokens: `8 / 12 / 16 / 24 / 32px`
- Default horizontal screen margin: `20px`
- Do not invent arbitrary spacing values when an existing token can be used.

### Radius

| Token | Value | Use |
|---|---:|---|
| `{rounded.sm}` | 8px | Small utility surfaces |
| `{rounded.md}` | 12px | Buttons, inputs, photos |
| `{rounded.lg}` | 16px | Diary cards, Comeback Card, Reuse Notice |
| `{rounded.full}` | 999px | Chips and pill controls |

### Elevation

The system is mostly flat and paper-like.

- Prefer surface contrast and 1px outlines over drop shadows.
- Cards normally use `{colors.surface}` on `{colors.paper}`.
- Bottom sheets may use a subtle elevation treatment to separate them from underlying content.
- Do not add decorative shadows to cards, buttons, or correction units.

### Touch Targets

- Every interactive target must provide at least `44 × 44px` of tappable area.
- A visual chip may appear smaller only when its invisible interactive area still meets `44 × 44px`.
- Primary actions should be easy to reach and clearly separated from secondary actions.

### Image Behavior

- User photos are content, not decoration.
- Photo cards use `{rounded.md}` corners.
- Photos may be used as writing-entry cues and recall cues.
- If no photo exists, use a neutral paper surface and text cue rather than invented imagery.

### Icon & Motion

- Icons should be simple and functional; avoid playful mascot-like illustration.
- Motion should explain state changes or navigation, not celebrate achievement.
- No confetti, bouncing rewards, streak flames, or game-like completion effects.

---

## 5. Components

### Button — Primary

- Background: `{colors.accent}`
- Label: white, readable UI type
- Minimum height / touch target: `44px`; recommended primary action height: `52px`
- Radius: `{rounded.md}`
- Use one visually dominant primary action per screen when possible.

### Button — Secondary

- Background: `{colors.surface}`
- Text: `{colors.ink}`
- Border: `1px {colors.line}`
- Radius: `{rounded.md}`

### Choice Chip

Used for decisions such as **Apply** / **Keep my expression**.

- Shape: `{rounded.full}`
- Visual height may be compact, but tappable area must be at least `44px` high.
- The default state must not silently apply an AI correction.
- User choice must remain explicit.

### Start Sheet

Entry point for starting a diary entry.

- May offer photo/gallery-based entry and direct writing.
- Images or captured conversation screenshots may be used as context for writing prompts.
- The sheet must not generate a completed diary answer for the user.

### Photo Card

- Shows the user's photo, date/metadata, and a short diary preview.
- At default text size, the diary preview may use up to two lines with ellipsis.
- When system text is enlarged, do not enforce a fixed line count; allow wrapping or provide access to the full entry.
- Selecting the card opens the full diary record.

### Question Card

- AI may generate an **English question** based on the user's photo/context to help the user recall what they want to say.
- English question: `{typography.heading}`
- Korean supporting meaning/explanation: `{typography.body}`
- The question may remain visible above the writing area.
- It must function as a prompt, not as a model answer.

Allowed:
- `Who did you have dinner with?`

Not allowed:
- `I had dinner with my coworkers.` as an AI-provided answer for the user to copy.

### Diary Input

- Surface: `{colors.surface}`
- User text: `{typography.diary}`
- May use subtle horizontal writing lines.
- Placeholder should lower pressure, e.g. “One sentence is enough.”
- Do not show tracked-expression hints while the user is independently writing.
- Autosave is allowed.

### Correction Unit

Required order:

1. User's original expression
2. Marked area that can be refined
3. Natural suggestion
4. Short reason
5. User decision: **Apply / Keep my expression**

Rules:

- Preserve the user's original sentence.
- Make the smallest useful correction; do not rewrite acceptable sentences.
- Every correction must include a reason.
- Never use strikethrough or red “wrong answer” treatment.
- AI suggestions must never visually appear more authoritative than the original.

### Review Summary

- Summarizes correction opportunities without grading the user.
- Avoid wording that reads like a score, failure count, or proficiency judgment.
- Reuse detection may appear here when evidence exists in the user's original writing.

### Save Sheet

- Lets the user decide which phrase is worth tracking.
- Phrase-level expressions are preferred over meaningless fragments or overly generic words.
- The user makes the final selection.

### Reuse Notice

Shown when the user independently uses a previously tracked expression correctly in a new diary entry.

- Use `{colors.accent-soft}` as a restrained background treatment.
- Show the reused expression and the date it was first learned.
- If one expression is reused, show it as one concise item.
- If multiple expressions are reused, group them as separate items inside one notice.
- Items must wrap naturally when text is enlarged.
- A transfer-prompt answer must never be labeled as independent reuse.

Example:

> You used **had drinks with** on your own this time · First learned Sep 28

### Memory Comeback Card

- Appears when a previously saved expression is ready for recall.
- Uses the user's own photo/context and a Korean cue.
- Does not expose the target English answer before the user tries to recall it.
- For a returning user, use neutral language such as “Welcome back.”
- Never mention how many days the user was absent.
- Use `{colors.accent-soft}` only as restrained emphasis.

### Expression Journey

Shows factual evidence of how an expression became part of the user's English.

Example structure:

- Sep 28 · First written — user's original sentence
- Sep 28 · Corrected
- Oct 2 · Recalled
- Oct 14 · Used independently — user's new original sentence

Rules:

- Each point is a concise item, not a fixed one-line layout.
- Source sentences wrap naturally and must not be truncated in a way that removes the evidence.
- “Recalled” is recorded only when the user explicitly confirms recall.
- “Used independently” must be grounded in a later user-written original sentence, without a hint.

---

## 6. Screen Patterns

### Home

Purpose: start a new record and re-enter learning through recall.

- One Memory Comeback Card when applicable
- `Write today` primary entry
- Recent diary records
- No streak counter, missed-day counter, or backlog

### Write

Purpose: let the user express their own experience directly in English.

- Optional photo/context question card
- Diary input
- Autosave
- No tracked-expression hints
- No AI-written completed answer

### Review

Purpose: understand and choose corrections while detecting valid reuse.

- Review Summary
- Reuse Notice when applicable
- Correction Units
- Save Sheet for selecting a tracked expression

### My English

Purpose: show accumulated evidence of English that has actually been learned and reused.

- **Expressions that became mine:** only independently reused expressions
- **Collected expressions:** tracked expressions in reverse chronological order
- Expression Journey on selection
- Counts may be shown only where they do not create pressure or imply incomplete work

---

## 7. Accessibility

- Readable content text: `16px` minimum.
- Interactive touch area: `44 × 44px` minimum.
- Text/background contrast: target WCAG `4.5:1` or higher for normal text.
- Do not communicate state using color alone.
- Support system text enlargement up to 200% without clipping informative content.
- Interactive controls require meaningful labels for screen readers.
- User-written original text must remain distinguishable from AI suggestions by more than color alone.

---

## 8. AI Output Rules

### AI Questions

AI-generated English questions are allowed when they help the user recall their own experience and write their own answer.

### AI Ghostwriting Prohibition

AI must not provide:

- a completed diary body
- a completed answer the user can copy
- a model answer presented before the user writes
- the target English expression before recall
- the target expression as a hint during independent writing

### Correction

- Preserve original text.
- Suggest minimal edits.
- Explain each edit.
- Let the user choose whether to apply it.

### Reuse Detection

Record reuse only when:

- the expression appears in the user's own new original writing
- the use is correct in context
- it was written without a recall/transfer hint exposing the answer
- the evidence is sufficiently certain; if uncertain, do not record reuse

---

## 9. Do's and Don'ts

### Do

- Keep the user's own sentence visually dominant.
- Preserve the original during correction and show the reason for every proposed change.
- Let the user decide whether to apply a correction.
- Use the color tokens only for their defined roles.
- Treat pauses and returns as normal behavior.
- Show learning achievement through dated evidence rather than celebration.
- Use adult, calm, private-journal language.
- Keep readable text and touch targets accessible for adult users.

### Don't

- Don't replace or erase the user's original sentence during correction.
- Don't automatically rewrite the entire diary entry.
- Don't generate completed diary answers or model answers for the user to copy.
- Don't show tracked-expression hints during independent writing.
- Don't use streaks, missed-day counts, scores, grades, proficiency levels, progress bars, incomplete-expression counts, or celebratory effects.
- Don't use characters, mascots, emoji illustrations, or childlike gamification.
- Don't use red, strikethrough, “wrong,” or “incorrect answer” styling for ordinary correction.
- Don't create a public feed, follow system, or social-ranking experience.

---

## 10. Out of Scope — MVP

- Handwriting OCR as a dedicated writing mode
- Voice diary / pronunciation processing
- Korean sentence → completed English generation
- Personal English Profile
- Pattern-expansion lessons
- Community / public sharing
- Tablet and desktop-specific layouts

---

## 11. Source for Gate Extraction

This `design.md` is written for humans and design generation. Machine-scored gate conditions should be extracted into `rules.yaml` during the harness gate round rather than duplicated and independently maintained here.

When converting this document into gate rules, preserve the hierarchy:

1. **Product Principles / Critical** — original preservation, user choice, respect for pauses, achievement as factual evidence, no AI ghostwriting
2. **UX & Learning Quality / Major** — reason provision, reuse evidence, loop continuity, recall based on the user's own record, author distinction, adult tone, accessibility
3. **Visual Consistency / Minor** — token usage, spacing, radius, component consistency, and other visual-system rules
