# Program Context — WSI API Project

**Last updated:** 2026-07-08 (populated from Jul 8 SoS transcript ingest)

---

## Program overview

| Field | Value |
|-------|-------|
| **Program name** | WSI API Project (WSI → Darwin migration) |
| **One-line scope** | Migrate WSI partner API from SAP to Darwin without changing the REST contract |
| **Program lead** | Joy Lin |
| **Tracks** | Track A: WSI REST bridge (`dcx-wsi-bridge-bal`); Track B: message bus (Darwin events → Fly) |

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
| POC | Proof of concept — 4–5 BP endpoints on bridge staging |

---

## Key documents & links

| Key documents & links | Where |
|------|-------|
| Open questions | [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) |
| Next steps | [POC_NEXT_STEPS.md](POC_NEXT_STEPS.md) |
| Message bus missing events | [message-bus/Message Bus - Missing Events Status.md](message-bus/Message%20Bus%20-%20Missing%20Events%20Status.md) |
| Luca event mapping sheet | [SharePoint spreadsheet](https://darwincxllc-my.sharepoint.com/:x:/g/personal/joy_lin_darwin_cx/IQBoIcLDd7w0S74x5zw5Zvp7AZo8UY_M1LCfhxH7DOcMOSw?e=peuJAe) |

---

## Discovery log

| Date | Reference | Resolved as | Confirmed by |
|------|-----------|-------------|--------------|
| 2026-07-08 | SAP→Darwin client mapping in bridge? | WSI config source of truth; JSON in message bus | Jason / Carsten |
| 2026-07-08 | Defer multi-address to post-POC? | Implement now | Jason / Carsten / Joy |
| 2026-07-08 | BAL shakeout scope | Pending Luca's dependency analysis | Joy |
