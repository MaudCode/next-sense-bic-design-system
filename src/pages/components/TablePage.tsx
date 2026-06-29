import { Wifi, WifiOff, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Health = "healthy" | "degraded" | "offline";

const HEALTH: Record<Health, { label: string; color: string; Icon: LucideIcon }> = {
  healthy: { label: "Healthy", color: "var(--success-muted-foreground)", Icon: Wifi },
  degraded: { label: "Degraded", color: "var(--warning-muted-foreground)", Icon: Wifi },
  offline: { label: "Offline", color: "var(--destructive)", Icon: WifiOff },
};

const ROWS: { code: string; name: string; client: string; health: Health; ecm: number; saving: string }[] = [
  { code: "RVRMDW", name: "Riverside Mews", client: "Northwind Estates", health: "healthy", ecm: 6, saving: "58,000" },
  { code: "MPLC12", name: "Maple Court 12", client: "Northwind Estates", health: "degraded", ecm: 3, saving: "22,000" },
  { code: "HRBPNT", name: "Harbour Point", client: "Aurora Property", health: "offline", ecm: 2, saving: "14,000" },
  { code: "WSTG04", name: "Westgate 4", client: "Northwind Estates", health: "healthy", ecm: 4, saving: "31,000" },
  { code: "QYSD08", name: "Quayside 8", client: "Lighthouse REIT", health: "healthy", ecm: 2, saving: "9,000" },
  { code: "PRKS02", name: "Parkside 2", client: "Northwind Estates", health: "healthy", ecm: 1, saving: "5,000" },
];

const BASE_ROWS = [
  { name: "Riverside Mews", client: "Northwind Estates", area: "12,500", eui: "135.2" },
  { name: "Maple Court 12", client: "Northwind Estates", area: "28,000", eui: "168.7" },
  { name: "Harbour Point", client: "Aurora Property", area: "22,400", eui: "112.3" },
  { name: "Westgate 4", client: "Northwind Estates", area: "35,000", eui: "98.4" },
];

// Card holds the table flush — header sits at the top edge (rounded via
// overflow-hidden), no white band. Outer cells get 20px so column content lines
// up with the widget's header padding; inner columns get a comfortable 12px.
const CARD = "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-xs)]";
// Base table: full-bleed header, content padded to 20px (the ECM-table look).
const CELLS = "[&_th]:px-3 [&_td]:px-3 [&_th:first-child]:pl-5 [&_td:first-child]:pl-5 [&_th:last-child]:pr-5 [&_td:last-child]:pr-5 [&_td]:py-2.5";
// Widget table: wrapped in px-5 so the tint header + dividers inset to the widget
// padding; outer cells flush so columns line up with the title.
const WIDGET_CELLS = "[&_th]:px-3 [&_td]:px-3 [&_th:first-child]:pl-0 [&_td:first-child]:pl-0 [&_th:last-child]:pr-0 [&_td:last-child]:pr-0 [&_td]:py-3.5";
const HEAD = "bg-muted hover:bg-muted";

function HealthCell({ health }: { health: Health }) {
  const h = HEALTH[health];
  return (
    <span className="inline-flex items-center gap-2 font-medium" style={{ color: h.color }}>
      <h.Icon size={16} /> {h.label}
    </span>
  );
}

/** Static section switcher for the header composition (active = Operational). */
function InlineSwitcher() {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-[var(--brand-nimbus)] p-0.5">
      {["Operational", "Sustainability", "Comfort"].map((s, i) => (
        <span
          key={s}
          className={cn(
            "rounded-sm px-2.5 py-1 text-sm font-medium",
            i === 0 ? "bg-primary text-primary-foreground" : "text-fg-3",
          )}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function TablePage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Table"
        lead="Dense, scannable rows for portfolio and ECM data. Hairline row dividers, a tinted header, Instrument Sans for text with tabular numbers so columns line up. Tables live inside a widget, so the header (title, period, a segmented control) sits with them."
      />

      <Section
        title="Base"
        description="The table on its own: a muted header row flush to the top of the card, hairline row dividers, body text left, numbers tabular with a muted unit. Column content sits on the 20px edge padding."
      >
        <div className={CARD}>
          <Table className={CELLS}>
            <TableHeader>
              <TableRow className={HEAD}>
                <TableHead>Building</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Gross area (m²)</TableHead>
                <TableHead>EUI (kWh/m²)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BASE_ROWS.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium text-fg-1">{r.name}</TableCell>
                  <TableCell className="text-fg-2">{r.client}</TableCell>
                  <TableCell className="tabular-nums text-fg-1">{r.area}</TableCell>
                  <TableCell className="tabular-nums text-fg-1">{r.eui}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section
        title="Example — portfolio breakdown"
        description="The same table composed into a widget: the Operational / Sustainability / Comfort switcher sits inline in the header, the building carries a muted code badge, and Connection Health colours the status label (Healthy / Degraded / Offline). Shown at Portfolio."
      >
        <div className={cn("level-portfolio", CARD)}>
          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <h3 className="font-formula text-[22px] font-medium text-fg-1">Portfolio Breakdown</h3>
              <p className="mt-1 text-[13px] text-fg-2">Portfolio Total — actual state</p>
            </div>
            <div className="flex items-center gap-2">
              <InlineSwitcher />
              <button className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-card text-fg-3 transition-colors hover:text-fg-1">
                <Sparkles size={16} />
              </button>
            </div>
          </div>
          <div className="px-5 pb-5">
            <Table className={WIDGET_CELLS}>
              <TableHeader>
                <TableRow className={HEAD}>
                  <TableHead>Building</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Connection Health</TableHead>
                  <TableHead>Open ECM</TableHead>
                  <TableHead>Potential Saving</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.map((r) => (
                  <TableRow key={r.code}>
                    <TableCell>
                      <span className="inline-flex items-center gap-2">
                        <span className="font-medium text-fg-1">{r.name}</span>
                        <Badge variant="muted">{r.code}</Badge>
                      </span>
                    </TableCell>
                    <TableCell className="text-fg-2">{r.client}</TableCell>
                    <TableCell><HealthCell health={r.health} /></TableCell>
                    <TableCell className="tabular-nums text-fg-1">{r.ecm}</TableCell>
                    <TableCell className="tabular-nums text-fg-1">
                      {r.saving} <span className="text-fg-2">kWh</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-4">
          <EngineeringNote>
            Connection Health colours the <span className="font-medium">label</span>, not a pill —{" "}
            Healthy = <span className="font-mono">--success-muted-foreground</span>, Degraded ={" "}
            <span className="font-mono">--warning-muted-foreground</span>, Offline ={" "}
            <span className="font-mono">--destructive</span>. Point the connection-health
            components at these tokens (they use raw{" "}
            <span className="font-mono">green-500 / orange-500 / red-500</span> today). Numbers
            are <span className="font-mono">tabular-nums</span> in Instrument Sans — not mono — so
            columns still align; the unit (<span className="font-mono">kWh</span>) is{" "}
            <span className="font-mono">--fg-2</span>.
          </EngineeringNote>
        </div>
      </Section>
    </>
  );
}
