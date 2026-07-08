import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";
import { useCallback, useState } from "react";

type EventRow = {
  n: number;
  ticket: string;
  darwin: string;
  fly: string;
  owner: string;
  status: string;
  timeline: string;
};

const ROWS: EventRow[] = [
  { n: 1, ticket: "DA-919", darwin: "transaction.updated", fly: "SUBSCRIPTION_CHANGED", owner: "Sergio / Paul Trimble", status: "PO routed; producer not started", timeline: "None" },
  { n: 2, ticket: "DA-920", darwin: "contract.created", fly: "NEW_SUBSCRIPTION", owner: "Stefan / Paul Trimble", status: "In progress — Paul adding producers", timeline: "DFADE-154" },
  { n: 3, ticket: "DA-921", darwin: "contract.updated", fly: "SUBSCRIPTION_CHANGED", owner: "Stefan / Paul Trimble", status: "In progress", timeline: "DFADE-154" },
  { n: 4, ticket: "DA-922", darwin: "contract.deleted", fly: "SUBSCRIPTION_DELETED", owner: "Stefan / Paul Trimble", status: "In progress", timeline: "DFADE-154" },
  { n: 5, ticket: "DA-923", darwin: "customer.action.created", fly: "CONTACT_CREATED", owner: "Customer BAL PO / Paul (candidate)", status: "PO routed; not started", timeline: "None" },
  { n: 6, ticket: "DA-924", darwin: "extended_customer.added", fly: "MULTI_LICENSE_NEW", owner: "Fahad", status: "Owner confirmed; not on roadmap", timeline: "Blocked — scoping" },
  { n: 7, ticket: "DA-925", darwin: "extended_customer.license.updated", fly: "MULTI_LICENSE_CHANGED", owner: "Fahad", status: "Same", timeline: "Blocked — scoping" },
  { n: 8, ticket: "DA-926", darwin: "extended_customer.license.deleted", fly: "MULTI_LICENSE_DELETED", owner: "Fahad", status: "Same", timeline: "Blocked — scoping" },
  { n: 9, ticket: "DA-927", darwin: "transaction.premium.fulfillment", fly: "GIFT_DELIVERY", owner: "Kalrav (Fulfillment)", status: "Confirmed owner", timeline: "Sprint 20–21 (~Aug); vendor dep" },
  { n: 10, ticket: "DA-928", darwin: "customer.email.updated", fly: "EMAIL_CHANGED", owner: "Customer BAL PO / Paul (candidate)", status: "PO routed; not started", timeline: "None" },
  { n: 11, ticket: "DA-929", darwin: "customer.message.sent (TBC)", fly: "CORRESPONDENCE_TRANSACTION", owner: "Sam / Ethan", status: "At capacity; expose path", timeline: "Not before ~15 Aug" },
];

const ROLLUP = [
  ["Paul — contract producers", "DA-920–922", "In progress", "When DFADE-154 + staging"],
  ["Producer-only (Paul candidate)", "DA-919, 923, 928", "Not started", "TBC"],
  ["Fahad — enterprise", "DA-924–926", "Scoping / new epic", "No date"],
  ["Kalrav — fulfillment", "DA-927", "Sprint 20–21", "~Aug (vendor-gated)"],
  ["Sam/Ethan — correspondence", "DA-929", "Grooming / expose", "~mid-Aug earliest"],
];

function slackFullTable(): string {
  const header = "*Message Bus — 11 Missing Events* (6 Jul 2026)\n";
  const lines = ROWS.map(
    (r) =>
      `${r.n}. *${r.ticket}* · \`${r.darwin}\` → ${r.fly}\n   Owner: ${r.owner} · Status: ${r.status} · Timeline: ${r.timeline}`,
  );
  return header + lines.join("\n\n");
}

function slackCompactTable(): string {
  const pad = (s: string, w: number) => (s.length >= w ? s.slice(0, w - 1) + "…" : s.padEnd(w));
  const cols = ["#", "Ticket", "Darwin event", "Owner", "Timeline"];
  const widths = [3, 8, 28, 22, 24];
  const sep = widths.map((w) => "-".repeat(w)).join("  ");
  const header = cols.map((c, i) => pad(c, widths[i])).join("  ");
  const body = ROWS.map((r) =>
    [String(r.n), r.ticket, r.darwin, r.owner, r.timeline].map((c, i) => pad(c, widths[i])).join("  "),
  );
  return ["Message Bus — 11 Missing Events (6 Jul 2026)", "", header, sep, ...body].join("\n");
}

function CopyButton({ label, getText }: { label: string; getText: () => string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [getText]);

  return (
    <Button variant={copied ? "primary" : "secondary"} onClick={onCopy}>
      {copied ? "Copied!" : label}
    </Button>
  );
}

export default function MessageBusMissingEventsStatus() {
  const { tokens } = useHostTheme();

  const rowTone = ROWS.map((r) => {
    if (r.status.includes("In progress")) return "info" as const;
    if (r.timeline.includes("Aug") || r.timeline.includes("Sprint")) return "warning" as const;
    if (r.timeline.includes("Blocked") || r.timeline === "None") return "neutral" as const;
    return undefined;
  });

  return (
    <Stack gap={20} style={{ padding: "20px 24px 32px" }}>
      <Stack gap={6}>
        <H1>Message Bus — Missing Events Status</H1>
        <Text tone="secondary">Preview · 6 Jul 2026 · Copy below for Slack, then commit the markdown file when ready.</Text>
      </Stack>

      <Callout tone="info" title="Copy for Slack">
        <Stack gap={10}>
          <Text size="small">
            <Text as="span" weight="semibold" size="small">Slack formatted</Text> — bullet list with bold tickets; paste as-is.
          </Text>
          <Row gap={8} wrap>
            <CopyButton label="Copy Slack message" getText={slackFullTable} />
            <CopyButton label="Copy compact table (monospace)" getText={slackCompactTable} />
          </Row>
        </Stack>
      </Callout>

      <H2>11 missing events</H2>
      <Table
        headers={["#", "Ticket", "Darwin event", "Fly subevent", "Owner", "Status", "Timeline"]}
        rows={ROWS.map((r) => [r.n, r.ticket, r.darwin, r.fly, r.owner, r.status, r.timeline])}
        columnAlign={["center", "left", "left", "left", "left", "left", "left"]}
        rowTone={rowTone}
        striped
        stickyHeader
      />

      <Divider />

      <H2>Rollup by bucket</H2>
      <Table
        headers={["Bucket", "Tickets", "Active work", "Earliest E2E"]}
        rows={ROLLUP}
        striped
      />

      <Card variant="borderless">
        <CardHeader>Context</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Row gap={6} wrap>
              <Pill tone="info" active size="sm">Paul: contract.* in progress</Pill>
              <Pill tone="warning" active size="sm">Fahad: enterprise — scoping</Pill>
              <Pill tone="success" active size="sm">Kalrav: Sprint 20–21</Pill>
            </Row>
            <Text size="small" tone="secondary">
              Repo file: project-management/message-bus/Message Bus - Missing Events Status.md
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Text tone="quaternary" size="small">
        Tip: In Slack, paste the compact table inside a code block (```) for aligned columns.
      </Text>
    </Stack>
  );
}
