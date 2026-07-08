# Next Steps — WSI API Project

Living action list for the WSI → Darwin migration (REST bridge + message bus). Decision register:
[OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

> **Update 2026-07-08 (Scrum of Scrums ingest).** Real transcript processed. Bridge POC **on hold**
> until attributes + multi-address blockers clear. Current plan below. Sample kickoff content moved to
> `meeting-summaries/_template-sample/`.

---

## Current plan (2026-07-08)

Sources: [Scrum of Scrums - Summary 2026-07-08.md](meeting-summaries/Scrum%20of%20Scrums%20-%20Summary%202026-07-08.md).

### Track A — WSI REST bridge (blockers first)

| # | Action | Owner | Status |
|---|--------|-------|--------|
| A1 | **POC scope:** 4–5 BP endpoints on bridge staging | Carsten + Marco | **On hold** |
| A2 | Fix **customer attributes** path — published BAL contract | Carsten + Marco | **In progress** — now |
| A3 | **Multi-address mapping** when `return all addresses` flag set | Carsten + Marco | **In progress** — now |
| A4 | Confirm **WSI response shape** for multi-address (Q4) | Marco + Carsten | **Open** |
| A5 | Remove stale "first address only" scope from analysis docs | Carsten / Joy | **Open** — this week |

### Track B — Message bus

| # | Action | Owner | Status |
|---|--------|-------|--------|
| B1 | **Andie PR** merged — scaffolding in place | Carsten | **Done** (Jul 8) |
| B2 | Remaining **field-level event mappings** (DA-913 / Luca's sheet) | Andie | **In progress** |
| B3 | **SAP→Darwin client mapping JSON** for message bus | Carsten | **Open** — this week |
| B4 | Fix **deploy task files** → staging/prod | Carsten | **In progress** — today–tomorrow |
| B5 | **`dsb-fly` AWS account move** | Scott | **Done** |

### Cross-track / program

| # | Action | Owner | Status |
|---|--------|-------|--------|
| X1 | **BAL shakeout** — Luca's dependency analysis → BAL owners (Q6) | Luca / Joy | **Open** |
| X2 | **Paul tickets** — customer producers before `transaction.updated` | Joy | **Done** (Jul 8) |
| X3 | Open questions **Q1–Q6** updated | Joy | **Done** (Jul 8) |
| X4 | Follow up with **Andie** on workload handoff | Joy | **Open** |

### Carried open questions (see [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md))

Q4 multi-address shape. Q5 JSON config sync. Q6 BAL shakeout (Luca). Fahad/enterprise (DFADE-114).

---

## Historical — sample kickoff (template placeholder)

> Superseded by WSI SoS Jul 8 ingest. See `meeting-summaries/_template-sample/`.

| # | Action | Owner | Status |
|---|--------|-------|--------|
| H1 | Sample kickoff — weekly standup cadence | Jamie Chen | **Done** (template) |
