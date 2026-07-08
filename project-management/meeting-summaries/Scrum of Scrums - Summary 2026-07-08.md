# WSI API Project — Scrum of Scrums — Meeting Summary

*Covers WSI REST bridge + message bus (from Jul 2026)*

**Date:** July 8, 2026, 12:01pm  
**Duration:** ~32 min  
**Topic:** SAP→Darwin client mapping; bridge testing gaps (attributes path, multiple addresses); message bus PR merge + deployment; work redistribution  
**Attendees:** Joy Lin, Jason Writtenhouse, Carsten Perthel, Marco Andreas Wulf, Andie  
**Source:** WSI API Project - Scrum of Scrums (6) — meeting recording transcript  
**Related:** [Scrum of Scrums - Summary 2026-07-06.md](./Scrum%20of%20Scrums%20-%20Summary%202026-07-06.md) · [Scrum of Scrums - Summary 2026-07-02.md](./Scrum%20of%20Scrums%20-%20Summary%202026-07-02.md)

---

## Overview

Carsten opened with **SAP client → Darwin client mapping** — needed in both WSI and the message bus, not the bridge. Jason clarified **WSI config is the source of truth** (static mapping: SAP client + sales org → Darwin client); bridge receives the resolved value from WSI. Short-term: **JSON config file** in message bus — no centralized service or new ticket for now.

Carsten and Marco surfaced two **bridge testing gaps** from manual testing: (1) AI-generated code used a **stale customer-attributes path** — real contract is under customer attributes routing; Jason walked through **opt-in code/value** search semantics. (2) **Multiple addresses** — Darwin returns all addresses but bridge maps only the first; when WSI passes `return all addresses`, all should be returned. POC docs had deferred this; group agreed **not to defer** — fix now (Joy: usage logs show it's not skippable).

**Andie's message bus PR merged** (scaffolding in place; field mappings incomplete vs Luca's sheet — **Andie** picks up remaining mappings). Carsten owns **message bus staging/prod deployment** task-file fixes after Scott's AWS account migration. **WSI bridge POC** blocked until addresses + attributes work land (no target date set).

---

## Decisions Made

| # | Decision |
|---|----------|
| 1 | **SAP→Darwin client mapping** — source of truth is **WSI configuration** (static; SAP client + sales org → Darwin client). Not in Darwin; not owned by bridge. |
| 2 | **Bridge** receives resolved Darwin client from WSI on each call — bridge does not look up mapping. |
| 3 | **Message bus** needs the same mapping — **JSON config file** for MVP. No centralized lookup service; **no Jira ticket** for a service at this time (Jason + Carsten). |
| 4 | Mapping is **not 1:1 SAP client → Darwin client** — includes **sales-organization-level** migration (some SAP tenants migrate org-by-org, not whole client). |
| 5 | **Customer attributes endpoint** — remove legacy/stale bridge path; align to **published customer BAL contract** (attributes under customer attributes routing). Easy fix. |
| 6 | **Customer attributes semantics** — SAP key-value opt-in storage maps to Darwin: search by **opt-in code**; optional filter by **opt-in value** (Jason's recent enhancement). Preferences configured in marketing/config BAL per client. |
| 7 | **Multiple addresses** — when WSI request flag requests all addresses, bridge must return **all** addresses from BAL response, not first only. **Do not defer** — implement now. |
| 8 | **Analysis-repo / AI docs are guidance, not gospel** — stale POC scope notes (e.g. "first address only") can mislead AI codegen; invalid assumptions surface through testing. |
| 9 | **Andie's message bus PR** — **merged** by Carsten. Scaffolding good; field mappings not 100% aligned with Luca's mapping doc — Andie adds remaining mappings (not blocking initial POC). |
| 10 | **Message bus deployment** — Scott migrated AWS accounts to Darwin org; Carsten fixes **task files** for manual staging/prod deploy (no CI pipelines yet). Deployment not delegated to Andie. |
| 11 | **Marco** — take endpoint-mapping work (attributes path, addresses, related bridge fixes) with Carsten. |
| 12 | **Paul Trimble producer tickets** — Joy reprioritized: **customer tickets higher** than transaction tickets. Customer producers (DA-923/931, DA-928/932, DA-929) first; **DA-919/930** (`transaction.updated`) lower — needs multi-day analysis. |
| 13 | **WSI bridge POC** — on hold until addresses + attributes unblock; **no target date**. |

---

## SAP → Darwin client mapping

| Topic | Detail |
|-------|--------|
| **Problem** | Message bus needs same SAP client / sales-org → Darwin client mapping as WSI. Carsten initially considered bridge as provider — incorrect. |
| **Source of truth** | WSI static configuration (already drives SAP vs Darwin routing decision). |
| **Bridge** | WSI passes resolved Darwin client into bridge calls. |
| **Message bus** | Consume same mapping via **JSON config file** (MVP). Revisit centralized service only if needed later. |
| **Complexity** | Mapping includes sales-org granularity; finite client set; codes stable post-migration. |

---

## Bridge testing gaps (attributes + addresses)

### Customer attributes (`GET` customer by opt-in)

| Topic | Detail |
|-------|--------|
| **Issue** | AI-generated bridge code referenced a **legacy attributes path** not in current published BAL contract. |
| **Fix** | Use published **customer attributes** endpoint under correct routing. Remove stale legacy code. |
| **Semantics** | SAP: opt-in code = key, opt-in value = value. Darwin: filter customers with matching preference code; optional value filter (Jason enhancement ~3 weeks ago). Client preferences configured in marketing/config BAL. |
| **Analysis repo** | Had note that attribute mapping needed refinement — questions now answered on call. |

### Multiple addresses (customer by ID)

| Topic | Detail |
|-------|--------|
| **Issue** | Darwin BAL returns all addresses; bridge maps **first only**. WSI `return all addresses` flag is passed through but ignored in mapping. |
| **Root cause** | POC/analysis docs scoped "first address only" for later — AI respected that restriction without surfacing it during codegen. Found in manual testing. |
| **Requirement** | When flag set, return **all** addresses (same as SAP behavior). Functionality exists in SAP and Darwin — mapping gap only, not a DFADE feature gap. |
| **Decision** | **Implement now** — Jason: circling back in weeks has overhead; Carsten already has context. Joy: usage logs show non-trivial client usage. |

### Carsten — next steps (addresses blocker)

1. **Confirm WSI contract** — what does the WSI response look like when `return all addresses` is true? Compare against SAP behavior and Darwin BAL response (Marco can pair on this).
2. **Inspect BAL response** — customer-by-ID already returns all addresses from `dcx-customer-bal`; verify shape (array, ordering, primary vs secondary).
3. **Fix bridge mapping** — when flag is set, map **all** addresses into the WSI payload; when flag is false, return first only (current behavior).
4. **Remove stale POC scope** — update analysis-repo docs that deferred multi-address to post-POC so AI/codegen doesn't re-apply the restriction.
5. **Test** — manual test with flag on/off against staging BAL; confirm parity with SAP path before resuming broader bridge POC.

*Parallel:* remove legacy customer-attributes path and align to published contract (same testing pass).

---

## Message bus & Andie

| Topic | Update |
|-------|--------|
| **Andie PR** | **Merged** — scaffolding and structure in place. Mappings don't align 100% with Luca's field-level mapping doc; expected for initial POC. |
| **Andie follow-up** | **Andie** adds remaining field-based event mappings per Luca's sheet / DA-913. |
| **Carsten deployment** | Fix task files for message bus deploy to staging + prod (manual; no CI). Scott completed AWS account migration to Darwin org. Target: today–tomorrow. |
| **Work split** | Carsten keeps deployment + bridge blockers (addresses, attributes). **Andie** on message bus mappings. **Marco** on bridge endpoint-mapping fixes. |

---

## WSI bridge & team

| Topic | Update |
|-------|--------|
| **Carsten** | Heavy load: client mapping config, attributes fix, multi-address mapping, message bus deployment. Bridge POC on hold until blockers clear. |
| **Marco** | Endpoint mappings + bridge fixes (attributes, addresses) per today's discussion. |
| **Jason** | Flagged **BAL shakeout** — see Open section. New unrelated projects kicking off (recommendation engine + RedCam; shipping/pricing/billing with Eric's team). |
| **Paul Trimble** | Producer tickets assigned with updated event names (see table). Joy reprioritized: customer tickets first, transaction (`DA-919`/`DA-930`) lower. |

---

## Missing events — Paul (producer tickets)

*Updated event names + owners: [Luca mapping spreadsheet](https://darwincxllc-my.sharepoint.com/:x:/g/personal/joy_lin_darwin_cx/IQBoIcLDd7w0S74x5zw5Zvp7AZo8UY_M1LCfhxH7DOcMOSw?e=peuJAe)*

| Tickets | Darwin event (proposed) | Fly mapping | Owner | Priority |
|---------|-------------------------|-------------|-------|----------|
| DA-919 / DA-930 | `transaction.updated` | SUBSCRIPTION_CHANGED | **Paul** | Lower (needs analysis) |
| DA-923 / DA-931 | `customer.action.created` | CONTACT / CONTACT_CREATED | **Paul** | Higher |
| DA-928 / DA-932 | `customer.email.updated` | EMAIL_CHANGED | **Paul** | Higher |
| DA-929 | `customer.message.sent` | CORRESPONDENCE / CORRESPONDENCE_TRANSACTION | **Paul** | Higher |

Other missing-event owners (Fahad, Kalrav, Stefan, etc.) — see spreadsheet.

---

## Action Items

| # | Action | Owner | Timing |
|---|--------|-------|--------|
| 1 | Add **SAP→Darwin client mapping JSON config** to message bus (same data as WSI) | **Carsten Perthel** | This week |
| 2 | Remove legacy attributes path; align bridge to **published customer attributes** contract | **Carsten** + **Marco** | Now |
| 3 | Implement **multiple-address mapping** when WSI flag set (see next steps above) | **Carsten** + **Marco** | Now (before POC) |
| 4 | Fix message bus **deployment task files**; deploy to staging/prod | **Carsten Perthel** | Today–tomorrow |
| 5 | Add remaining **field-level event mappings** in message bus code | **Andie** | This week |
| 6 | **Marco** — endpoint mappings (attributes, addresses, related fixes) | **Marco Andreas Wulf** | This week |
| 7 | Update analysis-repo docs: remove stale POC scope on addresses; attributes resolved | **Carsten** / **Joy** | This week |
| 8 | **WSI bridge POC (4–5 BP endpoints)** — resume after blockers clear | **Carsten** + **Marco** | TBD |

---

## Open / Carried Forward

| Question | Status |
|----------|--------|
| Fahad confirmation on enterprise / multi-license (DFADE-114)? | **Open** — see [mapping spreadsheet](https://darwincxllc-my.sharepoint.com/:x:/g/personal/joy_lin_darwin_cx/IQBoIcLDd7w0S74x5zw5Zvp7AZo8UY_M1LCfhxH7DOcMOSw?e=peuJAe) |
| Timelines for missing events (Kalrav fulfillment, Stefan contracts)? | **Open** — owners in spreadsheet; no new dates this call |
| **BAL shakeout** — what work is needed on BAL teams beyond wiring event producers? | **Open** — Jason's concern: producer tickets (Paul's) cover *emitting* events from existing code paths, but unknown how much broader BAL-layer change is needed for migration. **Dependent on Luca's dependency analysis** and mapping any gaps to the right BAL owners (Q18). |
| Gateway OpenAPI automation drift (Campaign Studio QA)? | **Open** — unchanged from Jul 6 |
| Full endpoint catalog vs POC — schedule beyond 4–5 BP? | **Open** — POC on hold, no date |
| Message bus JSON config — exact file location / sync process with WSI config? | **Open** — principle agreed; implementation TBC |
| Multi-address WSI response shape when all addresses returned? | **Open** — Marco/Carsten to confirm against SAP + WSI contract |

---

## Resolved since Jul 6

| Item | Resolution |
|------|------------|
| Review Andie's message bus PR | **Done** — merged Jul 8 |
| Message bus AWS account migration | **Done** — Scott migrated; Carsten fixing deploy task files |
| Andie on SoS calls | **Done** — Andie attended Jul 8 |
| Customer attributes open questions | **Resolved on call** — Jason clarified opt-in code/value semantics |
| Defer multiple addresses to post-POC? | **Rejected** — implement now |
| Paul producer ticket prioritization | **Done** — Joy set customer tickets higher than transaction (`DA-919`/`DA-930`) |

---

## Notes

- Primary focus shifted from **message bus event routing** (Jul 2/6) to **bridge implementation gaps** found during manual testing.
- Carsten using **published BAL contracts** for bridge; can switch to local copies when needed.
- AI/codegen respects analysis-repo scope docs — stale "defer" notes can hide gaps until testing.
- Jason: new capacity pressure from recommendation-engine and shipping/pricing projects (unrelated to WSI migration).
- Event naming + owner source of truth: [Luca mapping spreadsheet](https://darwincxllc-my.sharepoint.com/:x:/g/personal/joy_lin_darwin_cx/IQBoIcLDd7w0S74x5zw5Zvp7AZo8UY_M1LCfhxH7DOcMOSw?e=peuJAe).
