# PM Meeting Notes Template

Turn meeting transcripts into structured, living project documents — **meeting summaries**,
an **open questions register**, and a **next steps** action list — using Cursor.

Built for product owners and program leads who want consistent meeting artifacts without
manual copy-paste across docs.

**Last updated:** 2026-07-08

---

## How it works

```mermaid
flowchart LR
  A[Upload transcript] --> B[AI generates summary]
  B --> C[meeting-summaries/]
  B --> D[OPEN_QUESTIONS.md]
  B --> E[POC_NEXT_STEPS.md]
```

### Workflow (3 steps)

1. **Upload your meeting transcript** — paste it into Cursor chat, or drop a file under
   `project-management/transcripts/`.
2. **AI summarizes it** — a new meeting summary is created in
   `project-management/meeting-summaries/` (date, duration, topic, attendees, overview,
   decisions, open questions, action items, notes).
3. **Living docs are updated** — `OPEN_QUESTIONS.md` and `POC_NEXT_STEPS.md` pick up new
   decisions, carried-forward questions, and action items from the transcript.

> **Cursor prompt:** *"Here is the transcript from today's standup — summarize it and update
> the open questions and next steps files."*

The agent skill at `.cursor/skills/meeting-transcript-processor/SKILL.md` defines the exact
format and update rules. The Cursor rule in `.cursor/rules/` applies automatically when
you work in this repo.

---

## Quick start (product owners)

1. **Use this repo for your program**
   - **Option A:** Clone and rename the folder (e.g. `message-bus-pm-notes`).
   - **Option B:** Use GitHub **Use this template** (if enabled) to create your own copy.
2. **Open the folder in Cursor.**
3. **Replace sample content** — update program name in `OPEN_QUESTIONS.md`, `POC_NEXT_STEPS.md`,
   and delete or overwrite the sample kickoff summary.
4. **Upload your first real transcript** and ask Cursor to process it.

---

## Repo layout

```
project-management/
  OPEN_QUESTIONS.md           # Decision register — open questions + status
  POC_NEXT_STEPS.md           # Living action list — current plan + history
  meeting-summaries/          # One summary per meeting (generated)
  transcripts/                # Optional: raw transcripts for reference
.cursor/
  skills/meeting-transcript-processor/SKILL.md
  rules/meeting-notes-workflow.mdc
  rules/collaboration.mdc
  rules/standards-bootstrap.mdc
```

---

## Cursor rules setup

This template ships with **three repo rules** and **one skill** under `.cursor/`. They apply
automatically when you open the repo folder in Cursor (not the parent workspace).

| File | Purpose |
|------|---------|
| `rules/standards-bootstrap.mdc` | Tells the agent to load the skill + rules before editing |
| `rules/meeting-notes-workflow.mdc` | Transcript → summary → open questions → next steps format |
| `rules/collaboration.mdc` | Review with you before git; ask when unclear; no guessing decisions |
| `skills/meeting-transcript-processor/SKILL.md` | Step-by-step ingest template and quality rules |

These mirror the patterns used in the
[WSI Darwin migration analysis](https://github.com/DarwinCX/wsi-darwin-migration-analysis) repo:
a **workflow rule**, a **collaboration/git hygiene rule**, a **bootstrap rule** that forces the
agent to read skills first, and a **domain skill** for the core task.

### What each rule enforces

**Collaboration (`collaboration.mdc`)**

- Show a change summary and **ask you to review before any commit**
- **Never commit or push** unless you explicitly ask
- **Raise questions** when a transcript is ambiguous, incomplete, or contradicts existing docs
- **Do not invent** decisions, owners, or dates — park unknowns in `OPEN_QUESTIONS.md`
- **Preserve history** — don't delete old summaries or historical plan sections without your OK
- After each ingest, list what changed and what's still open

**Meeting notes workflow (`meeting-notes-workflow.mdc`)**

- Standard summary sections: date, duration, topic, attendees, overview, decisions, open questions, actions, notes
- Update `OPEN_QUESTIONS.md` and `POC_NEXT_STEPS.md` on every transcript ingest
- Append and restructure — don't wipe prior content

**Bootstrap (`standards-bootstrap.mdc`)**

- Agent must read the skill + rules before editing `project-management/`

### Optional: Cursor User Rules (global)

Repo rules apply inside this project. For habits you want in **every** Cursor session, add these
under **Cursor Settings → Rules → User Rules** (customize the owner name):

```
- Only create git commits when I explicitly ask. Before committing, show me what changed and wait for my review.
- Never push to the remote unless I explicitly ask.
- When processing meeting transcripts, ask clarifying questions if anything is ambiguous or missing.
- Do not invent decisions, owners, or dates — mark unknowns as Open in OPEN_QUESTIONS.md.
- After updating docs, summarize which files changed and what questions remain open.
```

### Forking for your program

When you **Use this template** for a new project:

1. Keep all `.cursor/rules/` and `.cursor/skills/` files as-is (they travel with the repo).
2. Replace sample content in `project-management/`.
3. Optionally add a program-specific rule, e.g. `.cursor/rules/my-program-context.mdc`, with your
   team names, Jira board, and key doc links (similar to how the WSI workspace uses a project-context rule).

---

## Document formats

### Meeting summary

**Path:** `meeting-summaries/<Topic> - Summary YYYY-MM-DD.md`

| Section | Format |
|---------|--------|
| Header | Date, duration, topic, attendees, related links |
| Overview | 1–3 paragraph narrative |
| Decisions Made | Numbered table |
| Open / Carried Forward | Question + status table |
| Action Items | Action, owner, timing table |
| Notes | Bullets + optional detail tables |

**Sample:** [Sample Project Kickoff - Summary 2026-07-08.md](project-management/meeting-summaries/Sample%20Project%20Kickoff%20-%20Summary%202026-07-08.md)

### Open questions (`OPEN_QUESTIONS.md`)

- Dated **Update** blocks at the top after each meeting ingest
- **Status summary** table: `#`, question, type, blocks, status
- Per-question detail: context, options, recommendation, blocks, decision/status

### Next steps (`POC_NEXT_STEPS.md`)

- **Current plan** at the top — action tables by track/theme with owner and status
- **Historical** sections below for provenance
- Links back to meeting summaries and open questions

---

## Sample content

This template ships with **placeholder content** (sample kickoff meeting, Q1–Q3, starter
action list) so you can see the format before uploading real transcripts. Replace or extend
as you go.

---

## Publish / fork for your program

**Suggested GitHub repo names** (pick one that fits your org):

| Name | Best for |
|------|----------|
| `pm-meeting-notes-template` | General PO template — **recommended** |
| `cursor-meeting-notes-workflow` | Emphasizes Cursor + transcript workflow |
| `meeting-transcript-living-docs` | Descriptive: transcript → living docs |
| `product-owner-meeting-workflow` | Very explicit audience |

After `gh auth login`, from this folder:

```bash
gh repo create DarwinCX/pm-meeting-notes-template \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "Cursor template: meeting transcripts → summaries, open questions, and next steps for product owners"
```

To mark it as a GitHub template repo (so POs can click **Use this template**):

```bash
gh repo edit DarwinCX/pm-meeting-notes-template --template
```
