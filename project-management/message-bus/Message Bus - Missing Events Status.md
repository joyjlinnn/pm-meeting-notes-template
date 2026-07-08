# Message Bus Workstream — Missing Events (Latest Update)

**As of:** 6 July 2026  
**Source:** DA-919 → DA-929 · PO conversations (Fahad, Kalrav, Sam/Tina) · Jul 2 & 6 SoS  
**Epic:** [DFADE-158](https://darwin-cx.atlassian.net/browse/DFADE-158) · Mapping: [DA-911](https://darwin-cx.atlassian.net/browse/DA-911) · Impl: [DA-913](https://darwin-cx.atlassian.net/browse/DA-913)

> **Preview:** [Message Bus - Missing Events Status - Preview.html](./Message%20Bus%20-%20Missing%20Events%20Status%20-%20Preview.html) — copy buttons for Slack  
> **Slack chat (bordered table):** [Slack.txt](./Message%20Bus%20-%20Missing%20Events%20Status%20-%20Slack.txt) — paste inside ` ``` ` code block  
> **Slack Canvas (real table):** [Slack Canvas.md](./Message%20Bus%20-%20Missing%20Events%20Status%20-%20Slack%20Canvas.md) — paste into a new Canvas

Luca's mapping surfaced **11 missing Darwin events** (rows 19–29). Field-level mapping is largely complete where producers already exist; these rows block full message bus E2E.

| Topic | Update |
|:------|:-------|
| **Paul Trimble** | Producer sub-tasks created and **assigned**: [DA-930](https://darwin-cx.atlassian.net/browse/DA-930) (919), [DA-931](https://darwin-cx.atlassian.net/browse/DA-931) (923), [DA-932](https://darwin-cx.atlassian.net/browse/DA-932) (928), [DA-934](https://darwin-cx.atlassian.net/browse/DA-934) (929). Routed via Tina. |
| **Stefan (contracts)** | DA-920–922 PO routed; **not started** — part of DFADE-154 feature build (not Paul). |
| **Fahad (enterprise)** | Confirmed owner for DA-924–926. **Not on current roadmap** — needs new integration epic + business enterprise plan scoping. |
| **Kalrav (fulfillment)** | Confirmed owner DA-927. Sprint 20–21 (~Aug); gated on vendor inbound feed. |
| **DA-929 (correspondence)** | Paul on DA-934; expose-existing path. **~15 Aug** if Sam's team must build (not just expose). |
| **Andie (CMC)** | Message bus transform after producers hit event router; mapping can proceed in parallel. |

---

## 11 missing events — status

<table>
<thead>
<tr>
<th>#</th>
<th>Ticket</th>
<th>Child task</th>
<th>Darwin event</th>
<th>Fly mapping</th>
<th>Type</th>
<th>Owner</th>
<th>Status</th>
<th>Timeline</th>
<th>Next steps</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-919">DA-919</a></td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-930">DA-930</a></td>
<td><code>transaction.updated</code></td>
<td>SUBSCRIPTION_CHANGED / SUBSCRIPTION_CHANGED</td>
<td>Producer-only</td>
<td>Paul Trimble</td>
<td>PO routed; not started</td>
<td>None</td>
<td>Paul executes DA-930</td>
</tr>
<tr>
<td>2</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-920">DA-920</a></td>
<td>—</td>
<td><code>contract.created</code></td>
<td>SUBSCRIPTION_CHANGED / NEW_SUBSCRIPTION</td>
<td>Feature build (DFADE-154)</td>
<td>Stefan</td>
<td>PO routed; not started</td>
<td>DFADE-154</td>
<td>Part of contract BAL build → staging verify → Andie E2E</td>
</tr>
<tr>
<td>3</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-921">DA-921</a></td>
<td>—</td>
<td><code>contract.updated</code></td>
<td>SUBSCRIPTION_CHANGED / SUBSCRIPTION_CHANGED</td>
<td>Feature build (DFADE-154)</td>
<td>Stefan</td>
<td>PO routed; not started</td>
<td>DFADE-154</td>
<td>Part of contract BAL build → staging verify → Andie E2E</td>
</tr>
<tr>
<td>4</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-922">DA-922</a></td>
<td>—</td>
<td><code>contract.deleted</code></td>
<td>SUBSCRIPTION_CHANGED / SUBSCRIPTION_DELETED</td>
<td>Feature build (DFADE-154)</td>
<td>Stefan</td>
<td>PO routed; not started</td>
<td>DFADE-154</td>
<td>Same</td>
</tr>
<tr>
<td>5</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-923">DA-923</a></td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-931">DA-931</a></td>
<td><code>customer.action.created</code></td>
<td>CONTACT / CONTACT_CREATED</td>
<td>Producer-only</td>
<td>Paul Trimble</td>
<td>PO routed; not started</td>
<td>None</td>
<td>Paul executes DA-931</td>
</tr>
<tr>
<td>6</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-924">DA-924</a></td>
<td>—</td>
<td><code>extended_customer.added</code></td>
<td>SUBSCRIPTION_CHANGED / MULTI_LICENSE_NEW</td>
<td>Feature + integration</td>
<td>Fahad</td>
<td>Owner confirmed; not on roadmap</td>
<td>Blocked — scoping</td>
<td>Luca ↔ Fahad session; Tina: new integration epic</td>
</tr>
<tr>
<td>7</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-925">DA-925</a></td>
<td>—</td>
<td><code>extended_customer.license.updated</code></td>
<td>SUBSCRIPTION_CHANGED / MULTI_LICENSE_CHANGED</td>
<td>Feature + integration</td>
<td>Fahad</td>
<td>Same</td>
<td>Blocked — scoping</td>
<td>Same</td>
</tr>
<tr>
<td>8</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-926">DA-926</a></td>
<td>—</td>
<td><code>extended_customer.license.deleted</code></td>
<td>SUBSCRIPTION_CHANGED / MULTI_LICENSE_DELETED</td>
<td>Feature + integration</td>
<td>Fahad</td>
<td>Same</td>
<td>Blocked — scoping</td>
<td>Same</td>
</tr>
<tr>
<td>9</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-927">DA-927</a></td>
<td>—</td>
<td><code>transaction.premium.fulfillment</code></td>
<td>GIFT_CHANGED / GIFT_DELIVERY</td>
<td>Net-new (vendor feed)</td>
<td>Kalrav</td>
<td>Confirmed owner</td>
<td>Sprint 20–21 (~Aug)</td>
<td>Vendor inbound feed; loop Tina if slips</td>
</tr>
<tr>
<td>10</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-928">DA-928</a></td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-932">DA-932</a></td>
<td><code>customer.email.updated</code></td>
<td>EMAIL_CHANGED</td>
<td>Producer-only</td>
<td>Paul Trimble</td>
<td>PO routed; not started</td>
<td>None</td>
<td>Paul executes DA-932</td>
</tr>
<tr>
<td>11</td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-929">DA-929</a></td>
<td><a href="https://darwin-cx.atlassian.net/browse/DA-934">DA-934</a></td>
<td><code>customer.message.sent</code> (TBC)</td>
<td>CORRESPONDENCE / CORRESPONDENCE_TRANSACTION</td>
<td>Expose existing (likely)</td>
<td>Paul Trimble</td>
<td>PO routed; not started</td>
<td>Not before ~15 Aug if Sam's team needs to build this</td>
<td>Paul on DA-934; coordinate with Sam if build required</td>
</tr>
</tbody>
</table>

---

## Rollup by bucket

<table>
<thead>
<tr>
<th>Bucket</th>
<th>Events</th>
<th>Active work</th>
<th>Earliest realistic E2E</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Paul — producer sub-tasks (assigned)</strong></td>
<td>DA-919/930, 923/931, 928/932, 929/934</td>
<td>PO routed; not started</td>
<td>TBC — after Paul picks up queue</td>
</tr>
<tr>
<td><strong>Stefan — contract feature build (DFADE-154)</strong></td>
<td>DA-920–922</td>
<td>PO routed; not started</td>
<td>When DFADE-154 + producers land in staging</td>
</tr>
<tr>
<td><strong>Fahad — enterprise (scoped, not scheduled)</strong></td>
<td>DA-924–926</td>
<td>Luca requirements session</td>
<td><strong>No date</strong> until new integration epic + business scoping</td>
</tr>
<tr>
<td><strong>Kalrav — fulfillment (scheduled, vendor-gated)</strong></td>
<td>DA-927</td>
<td>Sprint 20–21</td>
<td>~Aug if vendor feed available</td>
</tr>
</tbody>
</table>

---

## Program next steps (Joy)

1. **Luca ↔ Fahad:** Schedule requirements walkthrough for DA-924–926  
2. **Paul:** Pick up producer sub-tasks DA-930, DA-931, DA-932, DA-934 (post-contracts queue per Tina)  
3. **Stefan:** DFADE-154 contract events DA-920–922  
4. **Tina:** New integration epic for Fahad enterprise events  
5. **Kalrav:** Track vendor dependency on DA-927; loop Tina if Sprint 20–21 at risk  
6. **Andie:** Continue DA-913 transforms in parallel; E2E per event when producer hits staging  

---

## Related docs

- Ticket templates: [Missing Darwin Events - DFADE-158 Tasks.md](./Missing%20Darwin%20Events%20-%20DFADE-158%20Tasks.md)
- Existing events tracking: [Message Bus - Existing Events Tracking.md](./Message%20Bus%20-%20Existing%20Events%20Tracking.md)
- Discovery summary: [Message Bus Discovery - Summary 2026-07-01.md](../meeting-summaries/message-bus/Message%20Bus%20Discovery%20-%20Summary%202026-07-01.md)
