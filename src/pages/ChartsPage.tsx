import { TrendingUp, TrendingDown } from "lucide-react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Donut, ListLegend } from "@/components/chart-bits";

// New chart ramps (see Colors › Chart ramps)
const BLUE = ["#D2E7F4", "#A1D3F0", "#74AFD0", "#4E86AE", "#305C7C"];
const RED = ["#FCD4C8", "#FBA993", "#FF6847", "#D6452C", "#A1301C"];
const YELLOW = ["#ECF6A6", "#CBE05E", "#A6C13F", "#829246", "#5E6B2A"];
const INK = "#3F472F"; // Verdure — all labels & numbers
const GRID = "#E6E3CF";

// ── primitives ─────────────────────────────────────────────────────────────
function ChartCard({
  title,
  sub,
  children,
  className = "",
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] ${className}`}>
      <div className="font-formula text-[15px] font-medium text-fg-1 leading-none">{title}</div>
      {sub && <div className="text-[11px] text-fg-2 mt-1.5">{sub}</div>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
      {items.map((i) => (
        <span key={i.label} className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: INK }}>
          <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

// Donut + ListLegend come from chart-bits (shared with the Widgets page).

// ── page ─────────────────────────────────────────────────────────────────
// Energy by Use — categories mapped to ramp steps exactly as analytics-charts.tsx does.
const USE = [
  { label: "Cooling", pct: "34%", value: 34, color: BLUE[0] },
  { label: "Heating", pct: "22%", value: 22, color: RED[0] },
  { label: "Ventilation", pct: "16%", value: 16, color: BLUE[2] },
  { label: "Lighting", pct: "14%", value: 14, color: YELLOW[2] },
  { label: "Electricity", pct: "10%", value: 10, color: YELLOW[0] },
  { label: "Other", pct: "4%", value: 4, color: RED[3] },
];
const legendItems = (rows: { label: string; pct: string; color: string }[]) =>
  rows.map((r) => ({ label: r.label, color: r.color, value: r.pct }));

// The real category → ramp-step map (from analytics-charts.tsx).
const CATEGORY_MAP = {
  warm: [
    { cat: "Heating · Gas", c: RED[0], t: "red-1" },
    { cat: "Hot Water · HVAC", c: RED[1], t: "red-2" },
    { cat: "Temperature", c: RED[1], t: "red-2" },
    { cat: "Other · Tenant loads", c: RED[3], t: "red-4" },
  ],
  cool: [
    { cat: "Cooling · Chilled Water", c: BLUE[0], t: "blue-1" },
    { cat: "Humidity", c: BLUE[0], t: "blue-1" },
    { cat: "Occupied · Avg · Current", c: BLUE[1], t: "blue-2" },
    { cat: "Ventilation · CO₂", c: BLUE[2], t: "blue-3" },
  ],
  solar: [
    { cat: "Electric · Electricity", c: YELLOW[0], t: "yellow-1" },
    { cat: "Lighting · Solar PV", c: YELLOW[2], t: "yellow-3" },
  ],
};
// Categorical palette — distinct hues for unordered series (sources, buildings, tenants)
const CATEGORICAL = [
  { label: "Sky", c: "#A1D3F0" },
  { label: "Sunset", c: "#FF6847" },
  { label: "Soil", c: "#829246" },
  { label: "Twilight", c: "#7096AD" },
  { label: "Highlight", c: "#E4ABFF" },
  { label: "Amber", c: "#E3A52B" },
];

// Energy Sources — a categorical chart (sources are "just different"), so it uses the
// Categorical palette: Electric vs Photovoltaic are now distinct, not both lime.
const SOURCES = [
  { label: "Electric", pct: "48%", value: 48, color: "#A1D3F0" },
  { label: "Photovoltaic", pct: "34%", value: 34, color: "#829246" },
  { label: "Gas", pct: "12%", value: 12, color: "#FF6847" },
  { label: "District", pct: "6%", value: 6, color: "#7096AD" },
];

// Bar with only the top corners rounded (radius-sm) — sits flat on the axis.
function topRoundedPath(x: number, y: number, w: number, h: number, r = 3) {
  const rr = Math.min(r, h, w / 2);
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`;
}

const AREA = (() => {
  const w = 560, h = 170, n = 24;
  const seed = (base: number, amp: number, peak: number) =>
    Array.from({ length: n }, (_, i) => base + Math.max(0, amp - Math.abs(i - peak) * (amp / 7)));
  const max = 75;
  const series = [
    { name: "Total", data: seed(20, 52, 14), color: INK, stroke: 1.8, fill: false },
    { name: "Heating", data: seed(8, 30, 14), color: RED[2], stroke: 1.4, fill: true },
    { name: "Cooling", data: seed(4, 13, 14), color: BLUE[2], stroke: 1.4, fill: true },
  ];
  const toPath = (d: number[], close = false) => {
    const pts = d.map((v, i) => [(i / (d.length - 1)) * w, h - (v / max) * (h - 16) - 8]);
    const path = pts.map((p, i) => (i ? "L" : "M") + p.join(" ")).join(" ");
    return close ? path + ` L${w},${h} L0,${h} Z` : path;
  };
  return { w, h, series, toPath };
})();

const WEEKDAYS = [
  { d: "Mon", v: 80 }, { d: "Tue", v: 92 }, { d: "Wed", v: 100 }, { d: "Thu", v: 96 },
  { d: "Fri", v: 84 }, { d: "Sat", v: 40 }, { d: "Sun", v: 30 },
];

const ROOMS = [
  { name: "Office Room", pct: 49, sub: "290 min/day avg" },
  { name: "Conference Room", pct: 49, sub: "288 min/day avg" },
  { name: "Meeting Room", pct: 48, sub: "282 min/day avg" },
];

// Good → bad severity scale (comfort, CO₂, temperature bands)
const SEVERITY = [
  { label: "Optimal", c: YELLOW[1] },
  { label: "Good", c: YELLOW[2] },
  { label: "Fair", c: RED[0] },
  { label: "Elevated", c: RED[1] },
  { label: "High", c: RED[3] },
];

// CO₂ comfort donut (from the live Comfort page)
const CO2 = [
  { label: "Optimal · <500 ppm", pct: "33%", value: 33, color: YELLOW[1] },
  { label: "Good · 500–750", pct: "43%", value: 43, color: YELLOW[2] },
  { label: "Fair · 750–900", pct: "14%", value: 14, color: RED[0] },
  { label: "Elevated · 900–1200", pct: "9%", value: 9, color: RED[1] },
  { label: "High · >1200", pct: "1%", value: 1, color: RED[3] },
];

// Stacked bar — Energy by Use, a few weeks
const STACK_CATS = [
  { key: "Cooling", color: BLUE[0] },
  { key: "Heating", color: RED[0] },
  { key: "Ventilation", color: BLUE[2] },
  { key: "Lighting", color: YELLOW[2] },
  { key: "Other", color: RED[3] },
];
const STACK = [
  { wk: "Wk 1", vals: [34, 22, 16, 14, 6] },
  { wk: "Wk 2", vals: [30, 26, 15, 13, 5] },
  { wk: "Wk 3", vals: [36, 20, 18, 12, 6] },
  { wk: "Wk 4", vals: [18, 28, 10, 8, 4] },
];

export function ChartsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Charts"
        lead="The chart types used across BIC, and how to color them. The headline rule: color carries the data (lines, bars, arcs, dots) — text never does. Numbers and labels are Verdure so they're always readable."
      />

      <Section title="The rules" description="Apply these to every chart — bar, area, line, donut, Sankey.">
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] leading-relaxed text-fg-2 space-y-2">
          <p><span className="text-fg-1 font-medium">1 · Color carries the data, never the text.</span> Lines, bars, arcs, dots and legend swatches use the ramp. Numbers, %, axis ticks and labels are <span className="font-mono">--fg-1</span> (Verdure). <span className="text-fg-1">This is the one that’s broken today.</span></p>
          <p><span className="text-fg-1 font-medium">2 · Color says what the data means.</span> Warm for heat/energy, cool for comfort/water/air, solar-green for electric/light/positive. Good→bad uses a green→red severity scale. See “Choosing colors” below.</p>
          <p><span className="text-fg-1 font-medium">3 · Light shades are fills only.</span> A colored number/label is OK only in a <span className="font-mono">dark</span> shade (step 4–5) or a status color — never step 1–2.</p>
          <p><span className="text-fg-1 font-medium">4 · Legend = swatch + Verdure label.</span> The Total / aggregate line is Verdure, not a ramp color.</p>
        </div>
      </Section>

      <Section
        title="Choosing colors"
        description="Color does three jobs in a chart. The product has a built-in lookup that assigns these automatically — here's the thinking behind it."
      >
        {/* (a) by meaning */}
        <h3 className="font-formula text-[15px] font-medium text-fg-1 mb-1">By meaning</h3>
        <p className="text-[12px] text-fg-2 mb-3 max-w-2xl">
          Each kind of reading has a home family, so a color always means the same thing —
          heat is warm, comfort/water/air is cool, electric/light/positive is solar-green.
        </p>
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] grid sm:grid-cols-3 gap-x-6 gap-y-1 mb-7">
          {([["Warm — heat / energy", CATEGORY_MAP.warm], ["Cool — comfort / water / air", CATEGORY_MAP.cool], ["Solar — electric / light", CATEGORY_MAP.solar]] as const).map(([fam, rows]) => (
            <div key={fam}>
              <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-fg-2 mb-2">{fam}</div>
              {rows.map((r) => (
                <div key={r.cat} className="flex items-center gap-2 py-1">
                  <span className="w-4 h-4 rounded shrink-0 border border-border" style={{ background: r.c }} />
                  <span className="text-[12px] text-fg-1 leading-tight">{r.cat}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* (b) severity */}
        <h3 className="font-formula text-[15px] font-medium text-fg-1 mb-1">Good → bad (severity)</h3>
        <p className="text-[12px] text-fg-2 mb-3 max-w-2xl">
          For the CO₂ / temperature / humidity donuts — 5 bands, worst end the strongest red.
          CO₂ runs one way (Optimal → High); temperature & humidity are diverging (too cold ←
          optimal → too hot), with the optimal band green in the middle.
        </p>
        <div className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-xs)] flex flex-wrap gap-2 mb-7">
          {SEVERITY.map((s) => (
            <div key={s.label} className="flex-1 min-w-20 rounded-lg border border-border p-2 flex flex-col items-center gap-1.5">
              <span className="w-full h-6 rounded" style={{ background: s.c }} />
              <span className="text-[11px] text-fg-1">{s.label}</span>
            </div>
          ))}
        </div>

        {/* (c) categorical */}
        <h3 className="font-formula text-[15px] font-medium text-fg-1 mb-1">Categorical — telling series apart</h3>
        <p className="text-[12px] text-fg-2 mb-3 max-w-2xl">
          When categories are just “different things” (energy sources, buildings, tenants) and the
          only job is to tell them apart, use these distinct hues — not shades of one family, which
          blur together (Electric vs Photovoltaic both being lime is the symptom).
        </p>
        <div className="flex flex-wrap gap-2.5">
          {CATEGORICAL.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5">
              <span className="w-3.5 h-3.5 rounded" style={{ background: s.c }} />
              <span className="text-[12px] text-fg-1">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-fg-2 mt-3">
          Which one? <span className="text-fg-1">By meaning</span> when the category means something
          (heat/cool/electric); <span className="text-fg-1">Severity</span> for good→bad;{" "}
          <span className="text-fg-1">Categorical</span> for unordered “just different” series.
        </p>
      </Section>

      <Section title="Donut" description="Composition of a whole — energy by use, sources, comfort. Center total and legend stay Verdure.">
        <div className="grid lg:grid-cols-2 gap-3">
          <ChartCard title="Energy by Use" sub="By meaning — each category its family color">
            <div className="flex flex-wrap items-center gap-5">
              <Donut slices={USE} total="174" unit="MWh" />
              <ListLegend items={legendItems(USE)} />
            </div>
          </ChartCard>
          <ChartCard title="Energy Sources" sub="Categorical — distinct hues so sources don't blur">
            <div className="flex flex-wrap items-center gap-5">
              <Donut slices={SOURCES} total="159" unit="MWh" />
              <ListLegend items={legendItems(SOURCES)} />
            </div>
          </ChartCard>
        </div>
      </Section>

      <Section title="Comfort categories" description="The CO₂ / temperature / humidity donuts. Bands use the good→bad severity scale; the centre % and legend stay Verdure.">
        <ChartCard title="CO₂" sub="Share of time · business hours">
          <div className="flex flex-wrap items-center gap-6">
            <Donut slices={CO2} total="33" unit="%" centerLabel="in < 500 ppm" />
            <ListLegend items={legendItems(CO2)} />
          </div>
        </ChartCard>
      </Section>

      <Section title="Area & line" description="Trends over time — energy usage, EUI, occupancy. Gradient fills + line strokes in the ramp; the Total line is Verdure; axis labels Verdure.">
        <ChartCard title="Energy Usage" sub="Total & breakdown · last 30 days">
          <div className="relative">
            <svg viewBox={`0 0 ${AREA.w} ${AREA.h}`} preserveAspectRatio="none" className="w-full h-44">
              <defs>
                {AREA.series.filter((s) => s.fill).map((s, i) => (
                  <linearGradient key={s.name} id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity="0.45" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0.04" />
                  </linearGradient>
                ))}
              </defs>
              {[0.25, 0.5, 0.75].map((y) => (
                <line key={y} x1="0" x2={AREA.w} y1={AREA.h * y} y2={AREA.h * y} stroke={GRID} strokeWidth="1" strokeDasharray="2 4" />
              ))}
              {AREA.series.filter((s) => s.fill).map((s, i) => <path key={s.name} d={AREA.toPath(s.data, true)} fill={`url(#g${i})`} />)}
              {AREA.series.map((s) => <path key={s.name} d={AREA.toPath(s.data)} fill="none" stroke={s.color} strokeWidth={s.stroke} />)}
            </svg>
            <div className="flex justify-between text-[10px] mt-1" style={{ color: "#929083" }}>
              <span>Mar 24</span><span>Apr 3</span><span>Apr 13</span><span>Apr 23</span>
            </div>
          </div>
          <Legend items={AREA.series.map((s) => ({ label: s.name, color: s.color }))} />
        </ChartCard>
      </Section>

      <Section title="Bar" description="Discrete comparison — usage by weekday. One emphasis color; the rest a quiet shade. Values and axis Verdure.">
        <ChartCard title="Usage by Weekday" sub="Average energy · kWh">
          <svg viewBox="0 0 320 150" className="w-full h-40">
            {WEEKDAYS.map((d, i) => {
              const x = 14 + i * 43, bh = (d.v / 100) * 110;
              const weekend = i >= 5;
              return (
                <g key={d.d}>
                  <path d={topRoundedPath(x, 130 - bh, 28, bh)} fill={weekend ? YELLOW[1] : YELLOW[3]} />
                  <text x={x + 14} y={145} textAnchor="middle" fontSize="10" fill={INK} fontFamily="var(--font-sans)">{d.d}</text>
                </g>
              );
            })}
          </svg>
        </ChartCard>
      </Section>

      <Section title="Stacked bar & area" description="Multi-category over time — Energy by Use / Source. Each category keeps its 'by meaning' color; axis labels Verdure.">
        <ChartCard title="Energy by Use" sub="Consumption by category · weekly">
          <svg viewBox="0 0 360 160" className="w-full h-44">
            {STACK.map((col, ci) => {
              const x = 30 + ci * 80, bw = 48;
              const totalV = col.vals.reduce((s, v) => s + v, 0);
              let y = 140;
              return (
                <g key={col.wk}>
                  {col.vals.map((v, si) => {
                    const segH = (v / 100) * 120;
                    y -= segH;
                    const isTop = si === col.vals.length - 1;
                    return isTop ? (
                      <path key={si} d={topRoundedPath(x, y, bw, segH)} fill={STACK_CATS[si].color} />
                    ) : (
                      <rect key={si} x={x} y={y} width={bw} height={segH} fill={STACK_CATS[si].color} />
                    );
                  })}
                  <text x={x + bw / 2} y={154} textAnchor="middle" fontSize="9" fill={INK} fontFamily="var(--font-sans)">{col.wk}</text>
                  <text x={x + bw / 2} y={134 - (totalV / 100) * 120} textAnchor="middle" fontSize="9" fill={INK} fontFamily="var(--font-mono)">{totalV}</text>
                </g>
              );
            })}
          </svg>
          <Legend items={STACK_CATS.map((c) => ({ label: c.key, color: c.color }))} />
        </ChartCard>
      </Section>

      <Section title="Horizontal bar" description="Ranked rows — room usage, worst rooms. This is exactly the pattern from the occupancy feedback: the bar carries the color, the % stays Verdure.">
        <ChartCard title="Room Usage" sub="Occupancy this week">
          <div className="space-y-3.5">
            {ROOMS.map((r) => (
              <div key={r.name}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[13px] font-medium text-fg-1">{r.name}</span>
                  {/* % stays Verdure — NOT the bar color */}
                  <span className="font-mono text-[13px] font-medium" style={{ color: INK }}>{r.pct}%</span>
                </div>
                <div className="h-2.5 rounded-full" style={{ background: "#F3F1E6" }}>
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: YELLOW[1] }} />
                </div>
                <div className="text-[11px] text-fg-2 mt-1">{r.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-6 text-[11px]">
            <span className="inline-flex items-center gap-1.5" style={{ color: INK }}>
              <span className="font-mono font-medium">49%</span> ✓ Verdure — readable
            </span>
            <span className="inline-flex items-center gap-1.5 text-fg-3">
              <span className="font-mono font-medium" style={{ color: YELLOW[0] }}>49%</span> ✗ light shade — don’t
            </span>
          </div>
        </ChartCard>
      </Section>

      <Section title="KPI & metric card" description="A single headline number — big and Verdure. A delta may be colored, but only in a dark status shade (never a light tint).">
        <div className="grid sm:grid-cols-2 gap-3">
          <ChartCard title="Total Power" sub="last 30 days">
            <div className="font-formula text-[40px] font-medium leading-none" style={{ color: INK }}>
              2,450 <span className="text-[16px] text-fg-2">kWh</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[12px] mt-2" style={{ color: "#2E6A39" }}>
              <TrendingUp size={13} /> +3.2% vs last period
            </div>
          </ChartCard>
          <ChartCard title="Energy Load" sub="last 30 days">
            <div className="font-formula text-[40px] font-medium leading-none" style={{ color: INK }}>
              184.3 <span className="text-[16px] text-fg-2">kW</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[12px] mt-2" style={{ color: "#8E2018" }}>
              <TrendingDown size={13} /> −1.4% vs last period
            </div>
          </ChartCard>
        </div>
      </Section>

      <Section title="Tooltip" description="One shared hover tooltip across every chart — a card with the point's label, then a swatch + name + value per series. Labels Verdure, values right-aligned mono.">
        <div className="rounded-xl border border-border bg-[var(--bg-1)] p-8 flex justify-center">
          <div className="w-72 rounded-xl border border-border bg-card shadow-[var(--shadow-lg)] p-3.5">
            <div className="font-formula text-[13px] font-medium text-fg-1 mb-2">P1.RG04-05-06</div>
            {[
              { label: "Cold · <19°C", val: "0%", c: BLUE[4] },
              { label: "Cool · 19–20°C", val: "0%", c: BLUE[1] },
              { label: "Optimal · 20–24°C", val: "24%", c: YELLOW[1] },
              { label: "Warm · 24–25°C", val: "33%", c: RED[1] },
              { label: "Hot · >25°C", val: "44%", c: RED[3] },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2 py-0.5 text-[12px]">
                <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: r.c }} />
                <span className="text-fg-1">{r.label}</span>
                <span className="ml-auto font-mono text-fg-1">{r.val}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 py-0.5 text-[12px] border-t border-border mt-1 pt-1.5">
              <span className="w-2.5 h-2.5 rounded-full border-2 shrink-0" style={{ borderColor: INK }} />
              <span className="text-fg-1">Average</span>
              <span className="ml-auto font-mono text-fg-1">24.7°C</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Conventions">
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] leading-relaxed text-fg-2 space-y-2">
          <p><span className="text-fg-1 font-medium">Bar corners.</span> Round the <strong>top corners only</strong> (radius-sm); the base sits flat on the axis. Stacked bars: segments square, only the top of the stack rounded. Single and stacked must match — don’t round one and not the other.</p>
          <p><span className="text-fg-1 font-medium">Average / threshold markers.</span> Keep overlay markers small and low-contrast — a thin Verdure ring, not a heavy outline. They annotate; they shouldn’t compete with the bars.</p>
          <p><span className="text-fg-1 font-medium">Tooltip.</span> Use the one shared tooltip above — never per-chart variants.</p>
        </div>
        <div className="mt-3">
          <EngineeringNote>
            Bar radius is inconsistent in code (some <span className="font-mono">radius={0}</span>,
            some rounded) — standardize on top-rounded (radius-sm) so single and stacked bars match.
          </EngineeringNote>
        </div>
      </Section>

      <Section title="Also in BIC" description="Bar, area, line, composed and Sankey are the chart types in use — all follow the rules above.">
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] leading-relaxed text-fg-2 space-y-1.5">
          <p><span className="text-fg-1 font-medium">Stacked bar &amp; area</span> (Energy by Use / Source) — each category gets its mapped color; the Total line is Verdure.</p>
          <p><span className="text-fg-1 font-medium">Line &amp; composed</span> (trends, EUI, hourly profile) — series via the map; axis ticks and values Verdure.</p>
          <p><span className="text-fg-1 font-medium">Sankey / Energy Flow</span> — nodes take the category color, links stay a neutral grey, labels Verdure.</p>
        </div>
      </Section>

      <Section title="For engineering">
        <div className="space-y-3">
          <EngineeringNote>
            <strong>Colored text.</strong> Audit any chart label / legend / number set to a light
            chart shade (<span className="font-mono">color: var(--chart-*-1/2)</span>) and switch it
            to <span className="font-mono">--fg-1</span> — confirmed unreadable on white (the
            occupancy % feedback). Keep the ramp on the lines/bars/arcs. Colored numbers only in a
            dark shade (step 4–5) or a status color (<span className="font-mono">#2E6A39</span> /{" "}
            <span className="font-mono">#8E2018</span>).
          </EngineeringNote>
          <EngineeringNote>
            <strong>Off-palette colors.</strong> Several charts hardcode non-brand Tailwind
            colors instead of tokens — <span className="font-mono">#10B981</span> (emerald),{" "}
            <span className="font-mono">#3B82F6</span> (blue), <span className="font-mono">#EF4444</span>{" "}
            (red), and greys <span className="font-mono">#6B7280 / #9CA3AF / #E5E7EB / #374151</span>.
            Replace with the chart ramps (<span className="font-mono">--chart-*</span>) and{" "}
            <span className="font-mono">--fg-* / --border</span> so charts stay on-brand and re-tint with the system.
          </EngineeringNote>
        </div>
      </Section>
    </>
  );
}
