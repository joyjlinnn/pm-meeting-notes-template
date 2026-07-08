---
name: meeting-transcript-processor
description: >-
  Process meeting transcripts into structured summaries and update living project-management docs.
  Use when the user uploads or pastes a meeting transcript, asks for a meeting summary, or wants
  OPEN_QUESTIONS.md / POC_NEXT_STEPS.md updated from a call. Creates files under
  project-management/meeting-summaries/ and updates the decision register and action list.
---

# Meeting transcript processor

This repo (PM meeting notes template) maintains three linked artifacts from every meeting:

1. **Meeting summary** → `project-management/meeting-summaries/<Topic> - Summary YYYY-MM-DD.md`
2. **Open questions** → `project-management/OPEN_QUESTIONS.md`
3. **Next steps** → `project-management/POC_NEXT_STEPS.md`

## When to use

- User uploads or pastes a meeting transcript
- User asks to "summarize this meeting" or "update open questions / next steps from this call"
- User references a transcript file under `project-management/transcripts/`
- User sets up a new program repo or mentions Jira boards / other repos for the first time

## Step 0 — Establish or refresh program context

**Read** `project-management/PROGRAM_CONTEXT.md` before writing anything.

### If context is missing or incomplete

Ask the user (use `AskQuestion` or a short numbered list in chat):

1. **Jira** — Which boards/project keys? Key epics? Common ticket prefixes?
2. **Repos** — Which codebases are referenced on calls? GitHub URLs and/or local paths?
3. **People** — Who owns what? (validates action-item owners)
4. **Terms** — Acronyms and domain shorthand (BAL, epic names, program codenames)
5. **Docs** — Confluence pages, spreadsheets, architecture repos to link in summaries
6. **Workspace** — Are other repos open in Cursor that should be listed for cross-reference?

**Do not guess.** If the user wants to proceed without full context, flag unknown references in
the summary **Notes** and in `OPEN_QUESTIONS.md`.

### While processing

- Match ticket IDs (`DA-911`, `DFADE-158`, etc.) to entries in PROGRAM_CONTEXT.
- When a new reference appears, ask the user → update PROGRAM_CONTEXT (pending their review).
- Optionally pull detail from linked repos (README, open questions, tickets) **only if** the user
  has pointed Cursor at those paths or confirmed they are in scope.

### After user confirms new context

Update `PROGRAM_CONTEXT.md` tables and the **Discovery log**. Show changes for review before commit.

## Step 1 — Create the meeting summary

**Filename:** `<Topic> - Summary YYYY-MM-DD.md` in `project-management/meeting-summaries/`.

Use subfolders only when the program has a clear sub-stream (e.g. `meeting-summaries/message-bus/`).

### Required template

```markdown
# <Program> — <Meeting Type> — Meeting Summary

*<optional subtitle / scope note>*

**Date:** <Month D, YYYY, time>  
**Duration:** ~<N> min  
**Topic:** <one-line topic>  
**Attendees:** <comma-separated names>  
**Related:** <links to prior summaries or docs>

---

## Overview

<1–3 paragraphs: what was discussed, key themes, outcomes>

---

## Decisions Made

| # | Decision |
|---|----------|
| 1 | <decision> |

---

## <Optional themed sections>

Use tables for walkthroughs, status updates, or domain-specific detail not covered above.

---

## Action Items

| # | Action | Owner | Timing |
|---|--------|-------|--------|
| 1 | <action> | **<Owner>** | <when> |

---

## Open / Carried Forward

| Question | Status |
|----------|--------|
| <question> | **Open** / **Resolved** / **Deferred** — <note> |

---

## Notes

- <bullet points of additional context, follow-ups, or items not fully discussed on the call>
```

### Summary quality rules

- Extract **date, duration, topic, attendees** from the transcript; estimate duration if not stated.
- Prefer **tables** for decisions, actions, open questions, and structured walkthroughs.
- Add **detail tables** where they aid digestion (e.g. ticket lists, ownership matrices).
- Include **post-call or async context** in Notes if the user provides it.
- Link to related summaries, `PROGRAM_CONTEXT.md`, `OPEN_QUESTIONS.md` / `POC_NEXT_STEPS.md` where relevant.
- Resolve ticket/repo/people references using `PROGRAM_CONTEXT.md`; flag unknowns instead of inventing.

## Step 2 — Update OPEN_QUESTIONS.md

1. Add a new **Update YYYY-MM-DD** paragraph at the top (after the intro), summarizing what changed.
2. Update the **Status summary** table — add rows for new questions; change status for resolved ones.
3. Add or update **individual question sections** (Q1, Q2, …) with:
   - Context
   - Options
   - Recommendation (if applicable)
   - Blocks
   - Decision / Status

**Status values:** Resolved, Open, Deferred.

**Question types:** Architecture, Mapping, Product, Process, etc. — pick what fits.

Do not remove resolved questions; mark them **Resolved** and keep history in the Decision slot.

## Step 3 — Update POC_NEXT_STEPS.md

1. Add a **Update YYYY-MM-DD** callout near the top if the plan materially changed.
2. Refresh **Current plan (<date>)** — grouped action tables:

```markdown
## Current plan (YYYY-MM-DD)

Sources: <links to new meeting summary(ies)>

### <Track or theme>

| # | Action | Owner | Status |
|---|--------|-------|--------|
| A1 | <action> | <owner> | **In progress** / **Done** / **Open** |
```

3. Mark completed items **Done** with date where known.
4. Move superseded "Current plan" sections to **Historical** — do not delete.
5. Update **Carried open questions** pointer to `OPEN_QUESTIONS.md`.

## Optional — Save the raw transcript

If the user provides a file or long paste, save a copy to:

`project-management/transcripts/<Topic> - Transcript YYYY-MM-DD.md`

(Redact sensitive content if the user asks.)

## After processing

- Briefly tell the user which files were created/updated.
- List any questions that remain **Open** and top action items assigned to them if relevant.
- **Generate a Slack digest** (Step 4 below) and include it in the chat response.

## Step 4 — Generate Slack digest

After every meeting summary (especially **Scrum of Scrums**), produce a Slack message matching the user's
**established format** (see example below). Save to
`project-management/meeting-summaries/Slack - <Topic> YYYY-MM-DD.md` and show in chat.

### Format (match user's style)

```markdown
WSI API — SoS summary (<Day> <Mon> <D>)

Quick recap: <2–4 semicolon-separated highlights from the call>

@Full Name

• <action line 1>
• <action line 2>
...

@Full Name

• <action>
...

Still open: <comma-separated, max 3–4>
```

### Rules

- **Title line** — `WSI API — SoS summary (Tue Jul 8)` style (day, abbreviated month, date)
- **Quick recap** — one line, semicolon-separated clauses; high-level only
- **Per person** — `@First Last` on its own line, blank line, then **`•` one bullet per distinct task**
- Each separate action = its own `•` line — never combine multiple tasks into one bullet
- Use `@Name` inside a bullet when referencing another person
- Short, imperative phrasing ("Fix X", "Confirm Y with @Z")
- Include **Still open** line for carried-forward questions
- Only tag people with action items or explicit asks
- No "thanks everyone", no emoji unless user uses them in their examples
- For non-WSI programs, adapt the title prefix (e.g. `Message Bus — SoS summary`)

### Example (user's prior format — follow this tone)

```
WSI API — SoS summary (Mon Jul 6)

Quick recap: message bus mapping mostly done where Darwin events exist; bridge POC scoped to 4–5 BP endpoints this week; missing event PO ownership mostly confirmed (Fahad still open).

@Luca Kersting

• focus on remaining field-level mapping (endpoint rows)
• gap ticket dependency mapping for the rest of the endpoints (capability level please so we can start assigning tickets to BAL owners for build)

@Carsten

• Review @andie's message bus mapping PR
• ...
```
