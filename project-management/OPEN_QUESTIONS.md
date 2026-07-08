# Sample Project: Open Questions / Decision Register

A single place to collect the decisions needed before the sample initiative can move from
discovery into execution.

**Update 2026-07-08 (kickoff ingest):** Q1 and Q2 were discussed at the Sample Project Kickoff
(see [Sample Project Kickoff - Summary 2026-07-08.md](meeting-summaries/Sample%20Project%20Kickoff%20-%20Summary%202026-07-08.md)).
Q1 is **Resolved** (weekly cadence). Q2 remains **Open** — vendor selection deferred to next week.
Q3 was added as a new process question.

Each item lists the question, why it matters, the options, the recommendation, what it blocks, and the
decision. Source detail lives in meeting summaries under `meeting-summaries/`.

## Status summary

| # | Question | Type | Blocks | Status |
|---|---|---|---|---|
| Q1 | Meeting cadence: weekly vs bi-weekly | Process | standup scheduling | **Resolved** (2026-07-08) — weekly standups, Thursdays 10am |
| Q2 | Tooling: build vs buy for status dashboard | Architecture / tooling | sprint 1 setup | **Open** — shortlist due next week |
| Q3 | Who owns the external stakeholder comms? | Process / ownership | launch announcement | **Open** (2026-07-08) — Alex proposed; needs confirmation |

---

## Q1 - What is the standing meeting cadence for this program?

- **Context:** The team needs a predictable rhythm for sync, blockers, and decision-making. The
  kickoff discussed whether weekly standups are sufficient or if a bi-weekly format would reduce
  meeting load.
- **Options:**
  - (a) Weekly 30-minute standup (Thursdays).
  - (b) Bi-weekly 45-minute sync with async updates in between.
  - (c) Weekly standup + monthly deep-dive.
- **Recommendation:** (a) for the first sprint while scope is still volatile.
- **Blocks:** Calendar invites, facilitator rotation, summary ingest schedule.
- **Decision (2026-07-08 kickoff):** **Resolved → (a).** Weekly standups on **Thursdays at 10:00am**.
  Jamie facilitates for sprint 1. (owner: Jamie Chen)

## Q2 - Build a custom status dashboard or adopt an existing tool?

- **Context:** The program needs a single view of milestones, risks, and action-item status.
  Engineering prefers something integrated with Jira; PM prefers low setup overhead.
- **Options:**
  - (a) Custom lightweight dashboard (Notion or similar).
  - (b) Jira dashboard + Confluence rollup.
  - (c) Defer until sprint 2; use markdown living docs only.
- **Recommendation:** (b) if Jira is already the system of record; otherwise (a) for speed.
- **Blocks:** sprint 1 visibility, stakeholder reporting template.
- **Status:** **OPEN** — team to shortlist options by **2026-07-15**. Priya to draft comparison
  table. (owner: Priya Sharma)

## Q3 - Who owns external stakeholder communications?

- **Context:** Launch and milestone updates need a single voice to partners and leadership.
  Kickoff surfaced that no one is explicitly assigned yet.
- **Options:**
  - (a) Program lead (Jamie) owns all external comms.
  - (b) Split: Jamie for leadership, Alex for partner-facing updates.
  - (c) Rotate per milestone with a comms review gate.
- **Recommendation:** (b) to avoid bottlenecking Jamie on partner detail.
- **Blocks:** launch announcement draft, status email template.
- **Status:** **OPEN** (2026-07-08) — Alex volunteered for partner comms; Jamie to confirm split
  by next standup. (owner: Jamie Chen)
