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

After every meeting summary (especially **Scrum of Scrums**), produce a **casual Slack message** the user
can copy-paste to their team.

**Save to:** `project-management/meeting-summaries/Slack - <Topic> YYYY-MM-DD.md` (optional but recommended).

### Format rules

- **Casual tone** — short sentences, friendly, not corporate memo style
- **Tag each person** with `@name` (use first names from attendees; user adjusts to Slack handles)
- **Per person:** 2–5 bullet priorities for the day/week based on what was discussed and action items
- Lead with a one-line meeting recap
- Call out blockers or "on hold" items briefly
- Link to the summary file path (not required to paste full URL)
- End with a short thanks
- Use emoji sparingly (0–3 total) if it fits the team's style

### Template

```markdown
hey team — quick SoS recap from today 👋

@person — priority items:
• <action 1>
• <action 2>

@person — ...
...

open items we're still watching: <1–3 open questions>

full notes: `project-management/meeting-summaries/<Summary file>.md`

thanks everyone 🙏
```

Only include people who had **action items or explicit mentions** on the call. Skip attendees with nothing assigned unless they need a heads-up.
