import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";
import type { CSSProperties } from "react";

/* ── helpers ─────────────────────────────────────────────── */

type Tokens = ReturnType<typeof useHostTheme>["tokens"];

function StepFlow({
  steps,
  tokens,
  label,
}: {
  steps: { n: number; who: string; what: string; note?: string }[];
  tokens: Tokens;
  label: string;
}) {
  return (
    <Stack gap={4}>
      <Text weight="semibold" size="small">
        {label}
      </Text>
      <Stack gap={0}>
        {steps.map((s, i) => (
          <Stack key={s.n} gap={0}>
            <Row gap={10} align="start" style={{ padding: "6px 0" }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: tokens.bg.accentMuted,
                  border: `1px solid ${tokens.text.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 11,
                  fontWeight: 600,
                  color: tokens.text.accent,
                }}
              >
                {s.n}
              </div>
              <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                <Text size="small">
                  <Text as="span" weight="semibold" size="small">
                    {s.who}
                  </Text>
                  {" — "}
                  {s.what}
                </Text>
                {s.note && (
                  <Text tone="tertiary" size="small" italic>
                    {s.note}
                  </Text>
                )}
              </Stack>
            </Row>
            {i < steps.length - 1 && (
              <Text tone="quaternary" size="small" style={{ paddingLeft: 10 }}>
                ↓
              </Text>
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

function FlowBox({
  label,
  sub,
  accent,
  tokens,
  style,
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  tokens: Tokens;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        border: `1px solid ${accent ? tokens.text.accent : tokens.stroke.tertiary}`,
        borderRadius: 6,
        padding: "8px 12px",
        background: accent ? tokens.bg.accentMuted : tokens.bg.secondary,
        minWidth: 120,
        textAlign: "center",
        ...style,
      }}
    >
      <Text weight="semibold" size="small" style={{ margin: 0 }}>
        {label}
      </Text>
      {sub && (
        <Text tone="tertiary" size="small" style={{ margin: "2px 0 0" }}>
          {sub}
        </Text>
      )}
    </div>
  );
}

function FlowArrow({ horizontal }: { horizontal?: boolean }) {
  return (
    <Text tone="tertiary" size="small" style={{ padding: horizontal ? "0 4px" : "2px 0", textAlign: "center" }}>
      {horizontal ? "→" : "↓"}
    </Text>
  );
}

/* ── data ────────────────────────────────────────────────── */

const WSI_STEPS = [
  { step: "1", name: "Prioritize & gap tickets", owners: "Tina / Joanna", status: "Ongoing" },
  { step: "2", name: "Validate endpoint list", owners: "Luca + Carsten", status: "Wave 1 draft done" },
  { step: "3", name: "Endpoint-level mapping", owners: "Jason", status: "OCS subset mapped" },
  { step: "4", name: "Equivalence assessment", owners: "Luca + Carsten", status: "In progress" },
  { step: "8", name: "Darwin BAL build (if gap)", owners: "BAL dev + PO", status: "Varies by gap" },
  { step: "9", name: "Darwin UAT", owners: "BAL PO", status: "Red Can ≠ done" },
  { step: "5", name: "WSI bridge mapping", owners: "Carsten + Marco", status: "POC: 4–5 BP endpoints" },
  { step: "6", name: "End-to-end WSI UAT", owners: "Carsten + Luca", status: "Not started (bulk)" },
  { step: "7", name: "Sign-off & go-live", owners: "Holger / Luca", status: "Not started" },
];

const BUS_STEPS = [
  { step: "A", name: "Event-type mapping", owners: "Luca", status: "Done for existing events" },
  { step: "B", name: "Field-level mapping", owners: "Luca", status: "Largely complete" },
  { step: "C", name: "Missing event tickets", owners: "Joy → BAL POs", status: "11 gaps (DA-919–929)" },
  { step: "D", name: "Event producers (BAL)", owners: "BAL dev / Paul Trimble", status: "PO owners confirmed" },
  { step: "E", name: "Darwin → Fly transform", owners: "Andie (CMC)", status: "First PR in review" },
  { step: "F", name: "Deploy & verify staging", owners: "Andie + Carsten", status: "Staging access live" },
  { step: "G", name: "Client queue delivery", owners: "Existing SNS/SQS", status: "No rebuild needed" },
];

const PLAYERS = [
  { name: "Joy Lin", role: "Program / delivery lead", wsi: "Jira structure, PO routing, gap ↔ endpoint linking", bus: "Created DA-919–929, chases BAL PO ownership", step: "All — orchestration" },
  { name: "Luca Kersting", role: "WSI domain expert (DE)", wsi: "Endpoint prioritization, equivalence, UAT", bus: "Darwin → Fly event mapping, flags missing events", step: "WSI 2, 4, 6 · Bus A, B" },
  { name: "Carsten Perthel", role: "WSI bridge lead (CMC)", wsi: "Builds bridge, AI-assisted mapping, BP POC", bus: "Reviews Andie's PRs, message bus onboarding", step: "WSI 5, 6 · Bus E, F" },
  { name: "Marco Andreas Wulf", role: "WSI Java layer (CMC)", wsi: "Wires WSI Java services to bridge", bus: "—", step: "WSI 5" },
  { name: "Jason Writtenhouse", role: "Darwin platform / gateway", wsi: "Gateway + API key, bridge infra", bus: "Event router (Ethan day-to-day)", step: "WSI 3, 8 · Bus infra" },
  { name: "Andie (CMC)", role: "Message bus developer", wsi: "Onboarding → bridge work later", bus: "Lambda: Darwin webhook → Fly format → SNS/SQS", step: "Bus E, F" },
  { name: "Ethan", role: "Event router advisor", wsi: "—", bus: "Event naming review (insight only)", step: "Bus C, D" },
  { name: "Scott Montreuil", role: "Infra / AWS", wsi: "Bridge deploy to staging", bus: "dsb-fly AWS account, Andie permissions", step: "Bus F" },
  { name: "Tina / Joanna", role: "DFADE program / Jira", wsi: "Gap ticket priority, capacity", bus: "Delegate producer work to BAL teams", step: "WSI 1 · Bus C, D" },
  { name: "BAL POs", role: "Domain owners", wsi: "Sign off Darwin APIs, own gap builds", bus: "Own missing event builds (Sergio, Stefan, Fahad, …)", step: "WSI 8, 9 · Bus C, D" },
  { name: "Paul Trimble", role: "Event producer dev", wsi: "—", bus: "Wire producers on existing domains", step: "Bus D" },
  { name: "Holger", role: "Business sign-off (DE)", wsi: "Client go-live approval", bus: "—", step: "WSI 7" },
];

const TRACK_A_TODAY = [
  { n: 1, who: "Client", what: "Calls a WSI URL they already know (e.g. get customer by BP number)." },
  { n: 2, who: "WSI", what: "Receives the request and asks SAP for the data." },
  { n: 3, who: "SAP", what: "Returns the data in SAP's format." },
  { n: 4, who: "WSI", what: "Wraps it in the legacy JSON shape the client expects." },
  { n: 5, who: "Client", what: "Gets back the same JSON as always. Nothing changes on their side." },
];

const TRACK_A_FUTURE = [
  { n: 1, who: "Client", what: "Calls the exact same WSI URL. No change for them." },
  { n: 2, who: "WSI", what: "Receives the request, but instead of SAP it forwards to the Bridge." },
  { n: 3, who: "Bridge", what: "Translates the WSI request into the right Darwin BAL call (different URL, different field names)." },
  { n: 4, who: "Darwin BAL", what: "Returns data in Darwin's format (Customer BAL, Transaction BAL, etc.)." },
  { n: 5, who: "Bridge", what: "Translates Darwin's response back into the legacy JSON the client expects." },
  { n: 6, who: "WSI", what: "Passes that legacy JSON back to the client." },
  { n: 7, who: "Client", what: "Gets back the same JSON as always. They never see Darwin." },
];

const TRACK_B_TODAY = [
  { n: 1, who: "Something changes in SAP", what: "e.g. a subscription is created, a customer address is updated." },
  { n: 2, who: "Fly message bus", what: "SAP triggers a notification in the old Fly format (e.g. SUBSCRIPTION_CHANGED)." },
  { n: 3, who: "Client's queue", what: "The notification lands in the client's SNS/SQS queue." },
  { n: 4, who: "Client ERP", what: "Picks up the notification and reacts — often by calling WSI to fetch full details." },
];

const TRACK_B_FUTURE = [
  { n: 1, who: "Something changes in Darwin", what: "e.g. a BAL saves a new subscription or updates a customer." },
  { n: 2, who: "Event router", what: "Darwin emits an internal domain event (e.g. transaction.received)." },
  { n: 3, who: "Message bus (Andie)", what: "Receives the Darwin event and translates it into the old Fly format." },
  { n: 4, who: "Client's queue", what: "Same SNS/SQS queues as today — we are not rebuilding the bus." },
  { n: 5, who: "Client ERP", what: "Gets the same Fly notification as always. If they need details, they still call WSI (Track A)." },
];

const WSI_EXAMPLES = [
  ["Look up a customer", "GET /bp/{bpNumber}", "Customer BAL", "GET /v2/customers/{id}", "Ready — in POC"],
  ["Get a subscription", "GET /subscriptions/{orderNumber}", "Transaction BAL", "POST /v2/transactions/search", "Mapping in progress"],
  ["Change an address", "POST /bp/{bpNumber}/address", "Customer BAL", "POST /v2/customers/address", "Ready — in POC"],
  ["List multi-licenses", "GET /subscriptions/.../multiLicenses", "Transaction BAL", "Not built yet", "Blocked — DFADE-114"],
];

const BUS_EXAMPLES = [
  ["Customer data changed", "customer.updated", "BP_CHANGED", "Exists in Darwin"],
  ["New subscription", "transaction.received", "NEW_SUBSCRIPTION", "Exists in Darwin"],
  ["Subscription cancelled", "transaction.cancelled", "SUBSCRIPTION_DELETED", "Exists in Darwin"],
  ["License added (enterprise)", "extended_customer.added", "MULTI_LICENSE_NEW", "Gap — needs DFADE-114 build"],
  ["Contract created", "contract.created", "NEW_SUBSCRIPTION", "Gap — needs DFADE-154 build"],
];

/* ── canvas ──────────────────────────────────────────────── */

export default function WsiMigrationWorkstreams() {
  const { tokens } = useHostTheme();

  return (
    <Stack gap={28} style={{ padding: "20px 24px 40px" }}>
      <Stack gap={6}>
        <H1>WSI → Darwin Migration: Two Workstreams</H1>
        <Text tone="secondary">
          German clients must keep working without rewriting anything. Two parallel tracks make that happen —
          one for when clients ask for data, one for when the system tells clients something changed.
        </Text>
      </Stack>

      {/* ── The big picture ── */}
      <Callout tone="info" title="The one thing to remember">
        <Text>
          The client never changes. They keep calling the same WSI URLs and receiving the same JSON (Track A).
          They keep receiving the same Fly notifications (Track B). We swap SAP for Darwin behind the scenes.
        </Text>
      </Callout>

      <Grid columns={3} gap={16}>
        <Stat value="51" label="Wave 1 OCS endpoints (Track A)" />
        <Stat value="~20" label="Fly event types (Track B)" tone="info" />
        <Stat value="Sept 2026" label="Stretch target (15–20 realistic)" tone="warning" />
      </Grid>

      <Divider />

      {/* ── Track comparison at a glance ── */}
      <H2>Track A vs Track B — what's the difference?</H2>
      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader trailing={<Pill tone="info" active size="sm">Track A — Pull</Pill>}>
            WSI REST API
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">When:</Text> Client needs data right now.
              </Text>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">Analogy:</Text> Client phones the help desk and asks a question.
              </Text>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">Client action:</Text> Sends a request, waits for an answer.
              </Text>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">Our job:</Text> Make WSI return the same answer, but get the data from Darwin instead of SAP.
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="success" active size="sm">Track B — Push</Pill>}>
            Message Bus
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">When:</Text> Something changes in the system (subscription created, address updated).
              </Text>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">Analogy:</Text> The system sends the client a text message: "hey, something changed."
              </Text>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">Client action:</Text> Receives a notification, then often calls WSI (Track A) for the full details.
              </Text>
              <Text size="small">
                <Text as="span" weight="semibold" size="small">Our job:</Text> Make Darwin changes trigger the same Fly notifications SAP used to send.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Divider />

      {/* ── Track A plain English ── */}
      <H2>Track A — WSI REST API: how it works</H2>

      <Callout tone="neutral" title="Yes — it's a double translation">
        <Text size="small">
          The client calls a WSI endpoint (their language). The Bridge translates that into a Darwin BAL call
          (Darwin's language), gets the answer back, and translates it into the legacy JSON (back to the
          client's language). The client only ever speaks WSI — they never interact with Darwin directly.
        </Text>
      </Callout>

      <Grid columns={2} gap={20}>
        <Card variant="borderless">
          <CardHeader trailing={<Pill size="sm">Today</Pill>}>Current flow (SAP)</CardHeader>
          <CardBody>
            <StepFlow label="" steps={TRACK_A_TODAY} tokens={tokens} />
          </CardBody>
        </Card>
        <Card variant="borderless">
          <CardHeader trailing={<Pill tone="info" active size="sm">Future</Pill>}>New flow (Darwin)</CardHeader>
          <CardBody>
            <StepFlow label="" steps={TRACK_A_FUTURE} tokens={tokens} />
          </CardBody>
        </Card>
      </Grid>

      <Text tone="tertiary" size="small">
        The Bridge (built by Carsten's team) is the translator sitting between WSI and Darwin. WSI itself
        gets a small change: instead of calling SAP, it calls the Bridge. Marco wires that in the Java layer.
      </Text>

      <H3>Example endpoints — what gets translated</H3>
      <Table
        headers={["What the client wants", "WSI endpoint (client calls this)", "Darwin service", "Darwin endpoint (Bridge calls this)", "Status"]}
        rows={WSI_EXAMPLES}
        columnAlign={["left", "left", "left", "left", "left"]}
        striped
      />

      <Row gap={6} wrap>
        <Pill tone="success" active size="sm">Bridge infra live</Pill>
        <Pill tone="warning" active size="sm">POC: 4–5 BP endpoints this week</Pill>
        <Pill tone="neutral" size="sm">~3 mapped in staging</Pill>
      </Row>

      <Divider />

      {/* ── Track B plain English ── */}
      <H2>Track B — Message Bus: how it works</H2>

      <Callout tone="neutral" title="Events are mostly triggers, not full data dumps">
        <Text size="small">
          Fly notifications are short messages like "subscription X changed." The client usually doesn't get
          all the details in the notification — they call WSI (Track A) to fetch the full picture. That is
          why message bus mapping is simpler than REST mapping (~20 event types vs 160+ endpoints).
        </Text>
      </Callout>

      <Grid columns={2} gap={20}>
        <Card variant="borderless">
          <CardHeader trailing={<Pill size="sm">Today</Pill>}>Current flow (SAP)</CardHeader>
          <CardBody>
            <StepFlow label="" steps={TRACK_B_TODAY} tokens={tokens} />
          </CardBody>
        </Card>
        <Card variant="borderless">
          <CardHeader trailing={<Pill tone="success" active size="sm">Future</Pill>}>New flow (Darwin)</CardHeader>
          <CardBody>
            <StepFlow label="" steps={TRACK_B_FUTURE} tokens={tokens} />
          </CardBody>
        </Card>
      </Grid>

      <Text tone="tertiary" size="small">
        Andie builds the translator (message bus Lambda). We are not rebuilding the bus itself — just adding
        one new entry point so Darwin events can flow into the existing SNS/SQS queues clients already listen to.
      </Text>

      <H3>Example events — what gets translated</H3>
      <Table
        headers={["What happened", "Darwin event (internal)", "Fly notification (client receives)", "Status"]}
        rows={BUS_EXAMPLES}
        columnAlign={["left", "left", "left", "left"]}
        striped
      />

      <Row gap={6} wrap>
        <Pill tone="success" active size="sm">Mapping ~done for existing events</Pill>
        <Pill tone="warning" active size="sm">11 events still missing</Pill>
        <Pill tone="info" active size="sm">Andie PR #1 in review</Pill>
      </Row>

      <Divider />

      {/* ── Side by side visual summary ── */}
      <H2>Visual summary</H2>
      <Grid columns={2} gap={20}>
        <Stack gap={8}>
          <H3>Track A — client asks, gets an answer</H3>
          <Stack gap={4}>
            <Text weight="semibold" size="small" tone="tertiary">TODAY</Text>
            <Row gap={6} align="center" wrap justify="center">
              <FlowBox label="Client" sub="calls WSI" tokens={tokens} />
              <FlowArrow horizontal />
              <FlowBox label="WSI" tokens={tokens} />
              <FlowArrow horizontal />
              <FlowBox label="SAP" tokens={tokens} accent />
              <FlowArrow horizontal />
              <FlowBox label="legacy JSON" sub="back to client" tokens={tokens} />
            </Row>
            <Text weight="semibold" size="small" tone="tertiary">FUTURE</Text>
            <Row gap={6} align="center" wrap justify="center">
              <FlowBox label="Client" sub="same WSI call" tokens={tokens} />
              <FlowArrow horizontal />
              <FlowBox label="WSI" tokens={tokens} />
              <FlowArrow horizontal />
              <FlowBox label="Bridge" sub="translates" tokens={tokens} accent />
              <FlowArrow horizontal />
              <FlowBox label="Darwin BAL" tokens={tokens} accent />
            </Row>
            <Row gap={6} align="center" wrap justify="center">
              <Text tone="tertiary" size="small">↩ same legacy JSON back through WSI to client</Text>
            </Row>
          </Stack>
        </Stack>

        <Stack gap={8}>
          <H3>Track B — system tells client something changed</H3>
          <Stack gap={4}>
            <Text weight="semibold" size="small" tone="tertiary">TODAY</Text>
            <Row gap={6} align="center" wrap justify="center">
              <FlowBox label="SAP change" tokens={tokens} accent />
              <FlowArrow horizontal />
              <FlowBox label="Fly bus" tokens={tokens} />
              <FlowArrow horizontal />
              <FlowBox label="Client queue" tokens={tokens} />
            </Row>
            <Text weight="semibold" size="small" tone="tertiary">FUTURE</Text>
            <Row gap={6} align="center" wrap justify="center">
              <FlowBox label="Darwin change" tokens={tokens} accent />
              <FlowArrow horizontal />
              <FlowBox label="Event router" tokens={tokens} />
              <FlowArrow horizontal />
              <FlowBox label="Message bus" sub="Andie" tokens={tokens} accent />
              <FlowArrow horizontal />
              <FlowBox label="Client queue" sub="same as today" tokens={tokens} />
            </Row>
          </Stack>
        </Stack>
      </Grid>

      <Divider />

      {/* ── Workflows with steps ── */}
      <H2>Delivery pipelines</H2>
      <Grid columns={2} gap={16}>
        <CollapsibleSection title="Track A — WSI REST pipeline (Steps 1–9)" defaultOpen={false}>
          <Stack gap={8}>
            <Table
              headers={["Step", "Activity", "Owner", "Status"]}
              rows={WSI_STEPS.map((s) => [s.step, s.name, s.owners, s.status])}
              columnAlign={["center", "left", "left", "left"]}
              striped
            />
            <Callout tone="warning" title="Critical rule">
              <Text size="small">
                Darwin must be built and UAT'd before the Bridge can map an endpoint. "Red Can Delivered"
                means the Darwin API may exist — WSI mapping and UAT still required.
              </Text>
            </Callout>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Track B — Message bus pipeline (Steps A–G)" defaultOpen={false}>
          <Stack gap={8}>
            <Table
              headers={["Step", "Activity", "Owner", "Status"]}
              rows={BUS_STEPS.map((s) => [s.step, s.name, s.owners, s.status])}
              columnAlign={["center", "left", "left", "left"]}
              striped
            />
            <Callout tone="info" title="11 missing events — two buckets">
              <Text size="small">
                Easy fixes (function exists, just wire the event): transaction.updated, customer.action.created,
                customer.email.updated.
              </Text>
              <Text size="small">
                Needs a feature build first: contract.* (Stefan), multi-license (Fahad), premium fulfillment
                (Kalrav), correspondence (Sam).
              </Text>
            </Callout>
          </Stack>
        </CollapsibleSection>
      </Grid>

      <Divider />

      {/* ── Players ── */}
      <H2>Players: who does what</H2>
      <Table
        headers={["Person / team", "Role", "Track A (WSI REST)", "Track B (Message bus)", "Steps"]}
        rows={PLAYERS.map((p) => [p.name, p.role, p.wsi, p.bus, p.step])}
        columnAlign={["left", "left", "left", "left", "left"]}
        striped
        stickyHeader
      />

      <Divider />

      {/* ── How tracks connect ── */}
      <H2>How the two tracks connect</H2>
      <Callout tone="neutral" title="Same BAL build, two consumers">
        <Text size="small">
          Both tracks depend on the same Darwin BAL features being built. Example: multi-license (DFADE-114)
          must exist before Track A can serve GET /multiLicenses AND before Track B can send MULTI_LICENSE_NEW
          notifications. One gap epic, two downstream needs.
        </Text>
      </Callout>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap justify="center">
          <FlowBox label="DFADE gap epic" sub="BAL PO builds feature" tokens={tokens} />
          <FlowArrow horizontal />
          <FlowBox label="Darwin BAL" sub="API + events" tokens={tokens} accent />
        </Row>
        <Row gap={8} align="center" wrap justify="center">
          <FlowBox label="Track A: Bridge" sub="translates for WSI calls" tokens={tokens} />
          <Text tone="tertiary" size="small">+</Text>
          <FlowBox label="Track B: Message bus" sub="translates for notifications" tokens={tokens} />
        </Row>
      </Stack>

      <Text tone="quaternary" size="small">
        Source: WSI_API_PLAN_AND_PROCESS.md · Message Bus Discovery (1 Jul) · SoS summaries (2 & 6 Jul 2026)
      </Text>
    </Stack>
  );
}
