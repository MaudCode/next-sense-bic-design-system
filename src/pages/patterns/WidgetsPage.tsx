import { Layers, ChevronDown } from "lucide-react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Donut, ListLegend, BLUE, RED, YELLOW } from "@/components/chart-bits";

type Band = { label: string; pct: string; value: number; color: string; muted?: boolean };

const CO2: Band[] = [
  { label: "Optimal · <500 ppm", pct: "33%", value: 33, color: YELLOW[1] },
  { label: "Good · 500–750", pct: "43%", value: 43, color: YELLOW[2] },
  { label: "Fair · 750–900", pct: "14%", value: 14, color: RED[0] },
  { label: "Elevated · 900–1200", pct: "9%", value: 9, color: RED[1] },
  { label: "High · >1200", pct: "1%", value: 1, color: RED[3] },
];
const TEMP: Band[] = [
  { label: "Cold · <19°C", pct: "0%", value: 0, color: BLUE[4], muted: true },
  { label: "Cool · 19–20°C", pct: "1%", value: 1, color: BLUE[1] },
  { label: "Optimal · 20–24°C", pct: "36%", value: 36, color: YELLOW[1] },
  { label: "Warm · 24–25°C", pct: "24%", value: 24, color: RED[1] },
  { label: "Hot · >25°C", pct: "38%", value: 38, color: RED[3] },
];
const RH: Band[] = [
  { label: "Very Dry · <20%", pct: "0%", value: 0, color: BLUE[0], muted: true },
  { label: "Dry · 20–30%", pct: "12%", value: 12, color: BLUE[1] },
  { label: "Optimal · 30–50%", pct: "80%", value: 80, color: BLUE[2] },
  { label: "Humid · 50–70%", pct: "8%", value: 8, color: BLUE[3] },
  { label: "Very Humid · >70%", pct: "0%", value: 0, color: BLUE[4], muted: true },
];

const li = (rows: Band[]) => rows.map((r) => ({ label: r.label, color: r.color, value: r.pct, muted: r.muted }));

function Panel({ title, total, center, data }: { title: string; total: string; center: string; data: Band[] }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-formula text-[15px] font-medium text-fg-1 mb-3">{title}</div>
      <Donut slices={data} total={total} unit="%" centerLabel={center} size={150} />
      <div className="w-full mt-3"><ListLegend items={li(data)} /></div>
    </div>
  );
}

export function WidgetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Widgets"
        lead="How charts are composed into the cards you see on a page. A widget is a chart (or a few) plus a header, a scope control, and a period — wrapped in a Card. This page shows how to handle the trickier compositions."
      />

      <Section
        title="Multiple charts in one widget"
        description="The comfort widget packs three donuts (CO₂ · Temperature · Relative Humidity) into one card. The trick: one shared header (scope + period), then equal columns — each a donut with its own list legend below. Don't give each donut its own card."
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)]">
          {/* shared header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="font-formula text-[17px] font-medium text-fg-1">Time in Comfort Categories</div>
              <div className="text-[12px] text-fg-2 mt-1">Share of time across the selected period · business hours</div>
            </div>
            <button className="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-background text-[12px] font-medium text-fg-1 shrink-0">
              <Layers size={14} className="text-fg-2" /> All floors <ChevronDown size={12} className="text-fg-3" />
            </button>
          </div>
          {/* equal columns */}
          <div className="grid sm:grid-cols-3 gap-x-6 gap-y-8">
            <Panel title="CO₂" total="33" center="in < 500 ppm" data={CO2} />
            <Panel title="Temperature" total="36" center="in 20–24°C" data={TEMP} />
            <Panel title="Relative Humidity" total="80" center="in 30–50%" data={RH} />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] leading-relaxed text-fg-2 space-y-1.5">
          <p><span className="text-fg-1 font-medium">One header, one scope.</span> The floor selector and period live once, at the top — they apply to all three charts.</p>
          <p><span className="text-fg-1 font-medium">Equal columns.</span> Each chart gets the same width and the same parts (donut + list legend), so the trio reads as one unit.</p>
          <p><span className="text-fg-1 font-medium">List legend.</span> Donuts use the list legend (label left, % right) — not inline chips. 0% bands stay but dim.</p>
        </div>
        <div className="mt-4">
          <EngineeringNote>
            The comfort widget is one Card with three chart columns — not three separate widgets.
            The scope (<span className="font-mono">All floors</span>) and period are shared in the
            header and drive all three. Center % and legend stay Verdure.
          </EngineeringNote>
        </div>
      </Section>
    </>
  );
}
