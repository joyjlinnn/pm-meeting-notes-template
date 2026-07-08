# Program Context — WSI API Project

**Last updated:** 2026-07-08 (populated from Jul 8 SoS transcript ingest)

---

## Program overview

| Field | Value |
|-------|-------|
| **Program name** | WSI API Project (WSI → Darwin migration) |
| **One-line scope** | Migrate WSI partner API from SAP to Darwin without changing the REST contract |
| **Program lead** | Joy Lin |
| **Tracks** | **Track A** — WSI REST bridge (pull: client asks WSI, gets legacy JSON). **Track B** — message bus (push: Darwin change → Fly notification). See [Two workstreams](#two-workstreams-track-a--track-b) below. |
| **Stretch target** | Sept 2026 (~15–20 endpoints realistic; 51 Wave 1 OCS endpoints in scope) |

---

## Two workstreams (Track A + Track B)

**The one thing to remember:** the client never changes. Same WSI URLs, same legacy JSON (Track A). Same Fly notifications (Track B). We swap SAP for Darwin behind the scenes.

| | Track A — WSI REST (pull) | Track B — Message bus (push) |
|---|---------------------------|------------------------------|
| **When** | Client needs data now | Something changed in the system |
| **Analogy** | Client phones the help desk | System texts "something changed" |
| **Client action** | Request → wait for answer | Notification → often calls WSI for details |
| **Our job** | WSI returns same answer; data from Darwin via Bridge | Darwin events → same Fly format as SAP |
| **Scale** | ~51 Wave 1 OCS endpoints | ~20 Fly event types |
| **Key artifact** | `dcx-wsi-bridge-bal` (Bridge translator) | Message bus Lambda (Andie) + Luca's mapping |
| **Visual** | [workstreams/wsi-migration-workstreams.canvas.tsx](workstreams/wsi-migration-workstreams.canvas.tsx) | same canvas |

### Track A flow (future state)

Client → **WSI** (same URL) → **Bridge** (translates) → **Darwin BAL** → Bridge → WSI → legacy JSON → Client

WSI change is small: call Bridge instead of SAP. Marco wires Java layer. Carsten owns Bridge mapping.

### Track B flow (future state)

Darwin change → **Event router** → **Message bus** (Andie translates) → existing **SNS/SQS queues** → Client ERP

We are not rebuilding the bus — one new entry point for Darwin events.

### Track A delivery pipeline (steps 1–9)

| Step | Activity | Owner | Status (Jul 2026) |
|------|----------|-------|-------------------|
| 1 | Prioritize & gap tickets | Tina / Joanna | Ongoing |
| 2 | Validate endpoint list | Luca + Carsten | Wave 1 draft done |
| 3 | Endpoint-level mapping | Jason / Luca | OCS subset mapped |
| 4 | Equivalence assessment | Luca + Carsten | In progress |
| 8 | Darwin BAL build (if gap) | BAL dev + PO | Varies by gap |
| 9 | Darwin UAT | BAL PO | **Red Can ≠ done** |
| 5 | WSI bridge mapping | Carsten + Marco | POC on hold (Jul 8 blockers) |
| 6 | End-to-end WSI UAT | Carsten + Luca | Not started (bulk) |
| 7 | Sign-off & go-live | Holger / Luca | Not started |

### Track B delivery pipeline (steps A–G)

| Step | Activity | Owner | Status (Jul 2026) |
|------|----------|-------|-------------------|
| A | Event-type mapping | Luca | Done for existing events |
| B | Field-level mapping | Luca | Largely complete |
| C | Missing event tickets | Joy → BAL POs | 11 gaps (DA-919–929) |
| D | Event producers (BAL) | BAL dev / Paul Trimble | PO owners confirmed |
| E | Darwin → Fly transform | Andie | PR merged Jul 8; more mappings TBD |
| F | Deploy & verify staging | Andie + Carsten | Scott account move done; deploy task files in progress |
| G | Client queue delivery | Existing SNS/SQS | No rebuild needed |

### How tracks connect

Same BAL build, two consumers. Example: **DFADE-114** (multi-license) blocks Track A `GET /multiLicenses` **and** Track B `MULTI_LICENSE_NEW` — one gap epic, two downstream needs.

### Players (quick reference)

| Person | Track A | Track B |
|--------|---------|---------|
| Joy Lin | Jira, PO routing, gap ↔ endpoint linking | Created DA-919–929, chases BAL POs |
| Luca Kersting | Endpoint prioritization, equivalence, UAT | Darwin → Fly mapping, flags missing events |
| Carsten Perthel | Bridge build, AI mapping, BP POC | Reviews bus PRs, deploy task files |
| Marco Andreas Wulf | Wires WSI Java to bridge | — |
| Jason Writtenhouse | Gateway + API key, bridge infra | Event router (Ethan day-to-day) |
| Andie | Onboarding → bridge later | Lambda: Darwin webhook → Fly → SNS/SQS |
| Paul Trimble | — | Wire producers on existing domains |
| Tina / Joanna | Gap ticket priority | Delegate producer work to BAL teams |
| BAL POs | Sign off Darwin APIs, own gap builds | Own missing event builds |

---

## Jira boards & epics

| Board / project key | What it's for |
|---------------------|---------------|
| **DA** | Darwin API / per-endpoint delivery (DFADE-133 epic) |
| **DFADE** | Functional gaps blocking API work |
| **DFADE-158** | Missing Darwin events (DA-919 → DA-929) |
| **DFADE-114** | Enterprise / multi-license (Fahad) |
| **DFADE-154** | Contract domain (Stefan) |
| **DA-902** | Message bus program epic |
| **DA-911** | Event mapping / transform spec (Luca) |
| **DA-913** | Message bus implementation (Andie) |

### Ticket prefix glossary

| Prefix | Meaning |
|--------|---------|
| `DA-` | Darwin API board |
| `DFADE-` | Functional gap / migration blocker |

---

## Repos & codebases

| Repo | Role | Notes |
|------|------|-------|
| `wsi-darwin-migration-analysis` | Analysis + meeting notes (sibling) | Coverage, open questions, architecture |
| `dcx-wsi-bridge-bal` | WSI REST bridge (proxy BAL) | Carsten + Marco |
| `dsb-bi-wsi` | WSI Java gateway | SAP/Darwin routing switch |
| `dcx-customer-bal` | Customer BAL | BP, attributes, addresses |
| `dcx-transaction-bal` | Transaction BAL | Subscriptions, billing |
| `dsb-fly` | Message bus (SNS/SQS/Lambda) | Andie; Scott migrated AWS account |

---

## People & ownership

| Name | Role | Owns |
|------|------|------|
| Joy Lin | Program / PO | Jira routing, SoS, open questions |
| Jason Writtenhouse | Architecture | Gateway, BAL shakeout concern |
| Carsten Perthel | WSI bridge + message bus deploy | Bridge mapping, deploy task files |
| Marco Andreas Wulf | WSI bridge | Endpoint mappings, pairs with Carsten |
| Luca Kersting | Mapping review | Field mapping, gap tickets, BAL dependency analysis |
| Andie | Message bus impl | DA-913 field mappings |
| Scott Montreuil | Infra | AWS account migration (done Jul 8) |
| Paul Trimble | Event producers | DA-919/930–932 (customer priority) |
| Tina | Program | PO routing, capacity |

---

## Acronyms & terms

| Term | Meaning |
|------|---------|
| BAL | Business abstraction layer (Darwin `dcx-*-bal` services) |
| WSI | Web service interface — partner-facing REST gateway |
| Fly | Legacy message bus (SNS/SQS) for client notifications |
| Bridge | `dcx-wsi-bridge-bal` — translates WSI ↔ Darwin BAL |
| Red Can Delivered | Darwin API may exist — **not** migration-ready until WSI mapping + UAT |
| POC | Proof of concept — 4–5 BP endpoints on bridge staging (on hold Jul 8) |

---

## Key documents & links

| What | Where |
|------|-------|
| Open questions | [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) |
| Next steps | [POC_NEXT_STEPS.md](POC_NEXT_STEPS.md) |
| **Two workstreams (visual)** | [workstreams/wsi-migration-workstreams.canvas.tsx](workstreams/wsi-migration-workstreams.canvas.tsx) |
| Message bus missing events | [message-bus/Message Bus - Missing Events Status.md](message-bus/Message%20Bus%20-%20Missing%20Events%20Status.md) |
| Luca event mapping sheet | [SharePoint spreadsheet](https://darwincxllc-my.sharepoint.com/:x:/g/personal/joy_lin_darwin_cx/IQBoIcLDd7w0S74x5zw5Zvp7AZo8UY_M1LCfhxH7DOcMOSw?e=peuJAe) |

---

## Discovery log

| Date | Reference | Resolved as | Confirmed by |
|------|-----------|-------------|--------------|
| 2026-07-08 | SAP→Darwin client mapping in bridge? | WSI config source of truth; JSON in message bus | Jason / Carsten |
| 2026-07-08 | Defer multi-address to post-POC? | Implement now | Jason / Carsten / Joy |
| 2026-07-08 | BAL shakeout scope | Pending Luca's dependency analysis | Joy |
