# Slack digest — Scrum of Scrums — 2026-07-08

Copy-paste ready:

---

WSI API — SoS summary (Tue Jul 8)

Quick recap: SAP→Darwin client mapping = WSI config (JSON file for message bus MVP); bridge blockers found in testing (attributes path + multi-address mapping) — fix now, POC on hold; Andie's message bus PR merged; Carsten on deploy task files.

@Carsten Perthel

• Fix customer attributes path — align to published BAL contract (drop legacy route)
• Multi-address mapping when WSI `return all addresses` flag is set
• SAP→Darwin client mapping JSON for message bus (same data as WSI config)
• Message bus deploy task files → staging/prod (today–tomorrow)
• Bridge POC on hold until attributes + addresses unblock

@Marco Wulf

• Pair with Carsten: attributes endpoint + multi-address mapping
• Confirm WSI response shape vs SAP when return-all flag is on

@Andie

• PR merged — add remaining field-level event mappings per Luca's sheet (DA-913)

@Joy Lin

• Follow up with Andie offline on workload / handoff from Carsten
• Paul ticket priorities: customer producers (DA-923/931, 928/932, 929) before transaction.updated (DA-919/930)
• BAL shakeout (Q6) — track via Luca's dependency analysis → BAL owners

@Luca Kersting

• BAL shakeout dependency analysis — map capability gaps to right BAL owners
• Continue field-level mapping + gap ticket routing on endpoint sheet

@Jason Writtenhouse

• BAL shakeout scope TBC pending Luca's analysis; Paul producer tickets continue in parallel

Still open: message bus JSON config sync with WSI, multi-address WSI contract shape, Fahad/enterprise (DFADE-114)

Notes: `meeting-summaries/Scrum of Scrums - Summary 2026-07-08.md`
