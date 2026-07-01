import type { ReactNode } from "react";
import { Layers, ChevronDown, TrendingUp } from "lucide-react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import {
  Donut, ListLegend, Legend, ChartCard, topRoundedPath,
  BLUE, RED, YELLOW, INK, GRID,
} from "@/components/chart-bits";

/* ---------------------------------------------------------------- comfort */

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
      <div className="mt-3 flex w-full justify-center"><ListLegend items={li(data)} /></div>
    </div>
  );
}

/* ------------------------------------------------------------ widget types */

/** KPI / metric card — a single headline number + a coloured delta. */
function KpiWidget() {
  return (
    <ChartCard title="Total Power" sub="last 30 days">
      <div className="font-formula text-[34px] font-medium leading-none" style={{ color: INK }}>
        2,450 <span className="text-[15px] text-fg-2">kWh</span>
      </div>
      <div className="mt-2 inline-flex items-center gap-1 text-[12px]" style={{ color: "var(--success-muted-foreground)" }}>
        <TrendingUp size={13} /> +3.2% <span className="text-fg-2">vs last period</span>
      </div>
    </ChartCard>
  );
}

/** Vertical bar chart — discrete comparison, one emphasis colour.
    Cartesian grid + Y/X axes, like the recharts widgets in BIC. */
function BarWidget() {
  const data = [42, 38, 45, 40, 48, 22, 18];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const W = 340, H = 168, padL = 26, padT = 8, padB = 22;
  const plotH = H - padT - padB, plotW = W - padL, max = 60;
  const ticks = [0, 20, 40, 60];
  const y = (v: number) => padT + plotH - (v / max) * plotH;
  const step = plotW / data.length, bw = step * 0.5;
  return (
    <ChartCard title="Energy by Weekday" sub="kWh · average">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={W} y2={y(t)} stroke={GRID} strokeWidth={1} />
            <text x={padL - 6} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#929083" fontFamily="var(--font-sans)">{t}</text>
          </g>
        ))}
        {data.map((v, i) => {
          const x = padL + i * step + (step - bw) / 2;
          const weekend = i >= 5;
          return (
            <g key={i}>
              <path d={topRoundedPath(x, y(v), bw, y(0) - y(v))} fill={weekend ? YELLOW[1] : YELLOW[3]} />
              <text x={x + bw / 2} y={H - 6} textAnchor="middle" fontSize="9" fill={INK} fontFamily="var(--font-sans)">{days[i]}</text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}

/** Line / area — a trend over time. Cartesian grid + Y/X axes. */
function TrendWidget() {
  const pts = [30, 34, 31, 38, 36, 41, 39, 44, 42, 47, 45, 50];
  const W = 340, H = 168, padL = 26, padT = 8, padB = 18;
  const plotH = H - padT - padB, plotW = W - padL, min = 20, max = 60;
  const ticks = [20, 40, 60];
  const x = (i: number) => padL + (i / (pts.length - 1)) * plotW;
  const y = (v: number) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const line = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(pts.length - 1).toFixed(1)} ${padT + plotH} L${x(0).toFixed(1)} ${padT + plotH} Z`;
  return (
    <ChartCard title="Energy Trend" sub="kWh · last 12 weeks">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40">
        <defs>
          <linearGradient id="wtrend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE[2]} stopOpacity="0.35" />
            <stop offset="100%" stopColor={BLUE[2]} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={W} y2={y(t)} stroke={GRID} strokeWidth={1} />
            <text x={padL - 6} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#929083" fontFamily="var(--font-sans)">{t}</text>
          </g>
        ))}
        <path d={area} fill="url(#wtrend)" />
        <path d={line} fill="none" stroke={BLUE[3]} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      </svg>
    </ChartCard>
  );
}

/** Donut / pie — a share of a whole. */
function DonutWidget() {
  const slices = [
    { value: 45, color: BLUE[3] },
    { value: 30, color: YELLOW[3] },
    { value: 25, color: RED[2] },
  ];
  return (
    <ChartCard title="Energy by Source" sub="this month">
      <div className="flex items-center gap-4">
        <Donut slices={slices} total="45" unit="%" centerLabel="Electricity" size={128} />
        <Legend items={[
          { label: "Electricity", color: BLUE[3] },
          { label: "Gas", color: YELLOW[3] },
          { label: "Cooling", color: RED[2] },
        ]} />
      </div>
    </ChartCard>
  );
}

/** Horizontal bar — ranked rows; colour on the bar, value in Verdure. */
function HBarWidget() {
  const rows = [
    { label: "Meeting Rm A", pct: 82 },
    { label: "Open Floor 3", pct: 64 },
    { label: "Focus Pods", pct: 47 },
    { label: "Café", pct: 33 },
  ];
  return (
    <ChartCard title="Room Usage" sub="occupancy this week">
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 text-[12px]">
            <span className="w-24 shrink-0 truncate text-fg-1">{r.label}</span>
            <span className="relative h-3 flex-1 rounded-sm" style={{ background: GRID }}>
              <span className="absolute inset-y-0 left-0 rounded-sm" style={{ width: `${r.pct}%`, background: BLUE[3] }} />
            </span>
            <span className="w-8 shrink-0 text-right font-mono tabular-nums text-fg-1">{r.pct}%</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

/** Table — a compact ranked list. */
function TableWidget() {
  const rows = [
    { b: "Riverside Mews", v: "58,000" },
    { b: "Westgate 4", v: "31,000" },
    { b: "Maple Court 12", v: "22,000" },
    { b: "Harbour Point", v: "14,000" },
  ];
  return (
    <ChartCard title="Top Savings" sub="by potential · kWh">
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.b} className="flex items-center justify-between py-2 text-[13px]">
            <span className="text-fg-1">{r.b}</span>
            <span className="font-mono tabular-nums text-fg-1">{r.v} <span className="text-fg-2">kWh</span></span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ------------------------------------------------------------ widget base */

function Rule({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-border py-2.5 last:border-0">
      <span className="w-32 shrink-0 text-[13px] font-medium text-fg-1">{term}</span>
      <span className="text-[13px] leading-snug text-fg-2">{children}</span>
    </div>
  );
}

/** The base widget shell — the anatomy every widget shares. */
function WidgetBase() {
  const data = [40, 46, 38, 50];
  const labels = ["Q1", "Q2", "Q3", "Q4"];
  const W = 320, H = 140, padL = 24, padT = 8, padB = 20;
  const plotH = H - padT - padB, plotW = W - padL, max = 60;
  const ticks = [0, 30, 60];
  const y = (v: number) => padT + plotH - (v / max) * plotH;
  const step = plotW / data.length, bw = step * 0.5;
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <div className="font-formula text-[16px] font-medium leading-tight text-fg-1">Energy Usage</div>
          <div className="mt-1 text-[14px] text-fg-2">Consumption by quarter · this year</div>
        </div>
        <button className="inline-flex h-8 shrink-0 items-center gap-2 self-start rounded-md border border-border bg-background px-3 text-[12px] font-medium text-fg-1">
          <Layers size={14} className="text-fg-2" /> All floors <ChevronDown size={12} className="text-fg-3" />
        </button>
      </div>
      <div className="mt-5">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-36">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={padL} y1={y(t)} x2={W} y2={y(t)} stroke={GRID} strokeWidth={1} />
              <text x={padL - 6} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#929083" fontFamily="var(--font-sans)">{t}</text>
            </g>
          ))}
          {data.map((v, i) => {
            const x = padL + i * step + (step - bw) / 2;
            return (
              <g key={i}>
                <path d={topRoundedPath(x, y(v), bw, y(0) - y(v))} fill={YELLOW[3]} />
                <text x={x + bw / 2} y={H - 5} textAnchor="middle" fontSize="9" fill={INK} fontFamily="var(--font-sans)">{labels[i]}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function WidgetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Widgets"
        lead="A widget is a chart (or a few) plus a header, a scope control and a period, wrapped in a Card. Every chart type from the Charts page becomes a widget the same way — here's one of each, then how to handle the trickier compositions."
      />

      <Section
        title="Anatomy of a widget"
        description="Every widget is the same shell — a Card with a title, an optional subtitle, an optional scope/period control, then the chart. Same padding and type on every card so a dashboard reads as one grid."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <WidgetBase />
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)]">
            <Rule term="Container">Card — <span className="font-mono">rounded-xl</span>, 1px border, subtle shadow.</Rule>
            <Rule term="Padding">20px on all sides (<span className="font-mono">p-5</span>).</Rule>
            <Rule term="Title">H4 · 16 · PP Formula, medium.</Rule>
            <Rule term="Subtitle">Body · 14 · Instrument Sans · muted (<span className="font-mono">--fg-2</span>).</Rule>
            <Rule term="Scope / period">Optional control, top-right — a segmented control, dropdown or period.</Rule>
            <Rule term="Header → body">20px gap before the chart.</Rule>
            <Rule term="Data vs labels">Colour on the data; titles, numbers and labels stay Verdure.</Rule>
          </div>
        </div>
        <div className="mt-4">
          <EngineeringNote>
            Padding here is the design target — <span className="font-mono">20px (p-5)</span> on
            all sides. Shipped widgets vary (<span className="font-mono">px-4</span> /{" "}
            <span className="font-mono">py-3</span> = 16 / 12, and the shadcn Card default is 24);
            standardise on <span className="font-mono">p-5</span>. See Spacing → Key spacings.
          </EngineeringNote>
        </div>
      </Section>

      <Section
        title="A widget for every chart"
        description="The building blocks you'll drop onto a dashboard: a metric, a bar, a trend, a donut, a ranked bar and a compact table. Each is a Card with a title + period, then the chart — coloured data, Verdure labels and numbers."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiWidget />
          <BarWidget />
          <TrendWidget />
          <DonutWidget />
          <HBarWidget />
          <TableWidget />
        </div>
      </Section>

      <Section
        title="Multiple charts in one widget"
        description="The comfort widget packs three donuts (CO₂ · Temperature · Relative Humidity) into one card. The trick: one shared header (scope + period), then equal columns — each a donut with its own list legend below. Don't give each donut its own card."
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)]">
          {/* shared header */}
          <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <div className="font-formula text-[17px] font-medium text-fg-1">Time in Comfort Categories</div>
              <div className="text-[12px] text-fg-2 mt-1">Share of time across the selected period · business hours</div>
            </div>
            <button className="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-background text-[12px] font-medium text-fg-1 shrink-0 self-start">
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
          <p><span className="text-fg-1 font-medium">List legend.</span> Donuts use the list legend (label left, % right, capped width so they read as a pair) — not inline chips. 0% bands stay but dim.</p>
        </div>
      </Section>
    </>
  );
}
