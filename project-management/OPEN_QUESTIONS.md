# WSI API Project: Open Questions / Decision Register

A single place to collect the decisions needed before the WSI → Darwin migration work can be
locked into an implementation backlog.

**Update 2026-07-08 (Scrum of Scrums ingest):** First real transcript processed in this repo.
**Q1** resolved in principle (SAP→Darwin client mapping). **Q2** partially resolved (customer
attributes semantics). **Q3–Q6** added or updated from Jul 8 call. See
[Scrum of Scrums - Summary 2026-07-08.md](meeting-summaries/Scrum%20of%20Scrums%20-%20Summary%202026-07-08.md).

Each item lists the question, why it matters, the options, the recommendation, what it blocks, and the
decision. Source detail lives in meeting summaries under `meeting-summaries/`.

## Status summary

| # | Question | Type | Blocks | Status |
|---|---|---|---|---|
| Q1 | SAP→Darwin client mapping: source of truth + message bus consumption | Architecture / config | WSI routing, bridge, message bus | **Resolved in principle** (2026-07-08) — WSI static config; message bus JSON file MVP |
| Q2 | Customer attributes: contract target + opt-in semantics | Mapping / correctness | bridge BP attribute lookup | **Partially resolved** (2026-07-08) — semantics clarified; bridge path fix in progress |
| Q3 | Multiple addresses when `return all addresses` flag set | Mapping / correctness | bridge POC resume | **Resolved to implement** (2026-07-08) — fix now; WSI response shape still TBC (Q4) |
| Q4 | Multi-address WSI response shape | Mapping / correctness | bridge multi-address fix | **Open** — Marco/Carsten vs SAP + WSI contract |
| Q5 | Message bus JSON client-mapping sync with WSI config | Architecture / config | message bus transforms | **Open** — file location + sync process TBC |
| Q6 | BAL shakeout beyond event producer tickets | Architecture / sequencing | migration readiness | **Open** — dependent on **Luca's dependency analysis** → BAL owners |

---

## Q1 - SAP→Darwin client mapping: where is the source of truth?

- **Context (2026-07-08):** Message bus and WSI both need SAP client / sales-org → Darwin client mapping.
  Not 1:1 — some clients migrate sales-org by sales-org.
- **Options:** (a) Centralized service. (b) WSI static config + JSON copy in message bus. (c) Darwin store.
- **Decision (2026-07-08):** **(b)** — WSI config is source of truth; bridge receives resolved client from
  WSI; message bus uses JSON file. No service ticket now. Sub-sync → **Q5**.

## Q2 - Customer attributes: correct contract and opt-in semantics?

- **Context (2026-07-08):** Bridge had stale attributes path from AI codegen. Jason clarified Darwin search
  by opt-in code with optional value filter; preferences in marketing/config BAL per client.
- **Status:** **Partially resolved** — semantics clear; Carsten/Marco removing legacy path, aligning to
  published customer BAL contract.

## Q3 - Multiple addresses: defer or implement now?

- **Context (2026-07-08):** Bridge maps first address only; WSI flag requests all. POC docs had deferred;
  usage logs show non-trivial client usage.
- **Decision (2026-07-08):** **Implement now** — not a DFADE gap; mapping fix only. Shape confirmation → Q4.

## Q4 - Multi-address WSI response shape

- **Context:** When `return all addresses` is true, what does WSI return vs SAP?
- **Status:** **OPEN** — Marco/Carsten to confirm.

## Q5 - Message bus JSON mapping: location and sync with WSI

- **Context:** Q1 principle agreed; implementation details not defined.
- **Status:** **OPEN** — Carsten to propose.

## Q6 - BAL shakeout: scope beyond producer tickets?

- **Context (2026-07-08):** Jason flagged broader BAL migration work may exist beyond Paul's producer tickets.
- **Dependency:** **Luca's dependency analysis** and mapping capability gaps to the **right BAL owners**
  (same pattern as endpoint mapping sheet + DFADE gap tickets).
- **Status:** **OPEN** — Luca leads analysis; Joy tracks; producers continue in parallel.
