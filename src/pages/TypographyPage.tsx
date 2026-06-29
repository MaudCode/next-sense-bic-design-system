import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Badge } from "@/components/ui/badge";

const FAMILIES = [
  { name: "PP Formula", role: "Display / headings / numbers", token: "--font-formula", sample: "Buildings, awake.", style: { fontFamily: "var(--font-formula)", fontWeight: 500, fontSize: 34 } },
  { name: "Instrument Sans", role: "Body / UI", token: "--font-sans", sample: "All labels, tables and long-form copy.", style: { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 22 } },
  { name: "Adamina", role: "Secondary serif (rare)", token: "--font-serif", sample: "Occasional editorial accents.", style: { fontFamily: "var(--font-serif)", fontSize: 22 } },
  { name: "Mono", role: "Numbers / tokens", token: "--font-mono", sample: "2,450 kWh · +3.2% · 21.4 °C", style: { fontFamily: "var(--font-mono)", fontSize: 18 } },
];

type Status = "ok" | "refine" | "new";

type Row = {
  name: string;
  spec: string;
  role: string;
  code: string;
  status: Status;
  text: string;
  style: React.CSSProperties;
};

// PP Formula, weight 500 everywhere on the display/heading rows.
const formula = (fontSize: number, lineHeight = 1.1, letterSpacing?: string): React.CSSProperties => ({
  fontFamily: "var(--font-formula)",
  fontWeight: 500,
  fontSize,
  lineHeight,
  ...(letterSpacing ? { letterSpacing } : {}),
});
const sans = (fontSize: number, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: "var(--font-sans)",
  fontSize,
  ...extra,
});

const DISPLAY: Row[] = [
  { name: "Display", spec: "PP Formula · 40 / -1%", role: "Big callout numbers — the one hero figure a widget is built around.", code: "Rare & ad-hoc (text-3xl–5xl)", status: "refine", text: "2,450", style: { ...formula(40, 1, "-0.01em"), fontVariantNumeric: "tabular-nums" } },
  { name: "Metric", spec: "PP Formula · 24", role: "The standard KPI number inside a widget (centre of a donut, a stat).", code: "text-2xl · leading-none", status: "ok", text: "21.4 °C", style: { ...formula(24, 1), fontVariantNumeric: "tabular-nums" } },
];

const HEADINGS: Row[] = [
  { name: "H1", spec: "PP Formula · 28", role: "Display heading for a feature widget or a big section — the largest text that is words, not a number.", code: "Used in one new widget; not standard yet", status: "new", text: "Energy at a glance", style: formula(28, 1.1) },
  { name: "H2", spec: "PP Formula · 20", role: "Building / dashboard header — the name of the thing you're looking at.", code: "h2 · text-xl", status: "ok", text: "Riverside Mews", style: formula(20, 1.15) },
  { name: "H3", spec: "PP Formula · 18", role: "Page title — the heading at the top of a route.", code: "h1 · text-lg · leading-none", status: "ok", text: "Energy Dashboard", style: formula(18, 1) },
  { name: "H4", spec: "PP Formula · 16", role: "Widget / card title — the heading on every dashboard card.", code: "Mostly text-sm (14); target is 16", status: "refine", text: "Hourly Energy Profile", style: formula(16, 1.25) },
  { name: "H5", spec: "PP Formula · 14", role: "Small or portfolio-level widget title, where space is tight.", code: "text-sm / text-xs", status: "ok", text: "Carbon Footprint by Building", style: formula(14, 1.25) },
];

const TEXT: Row[] = [
  { name: "Body XL", spec: "Instrument Sans · 18", role: "Lead-in line or emphasised intro copy, where body text needs to carry a little more weight.", code: "text-lg — no current use", status: "new", text: "Buildings, awake — the whole portfolio at a glance.", style: sans(18, { lineHeight: 1.45 }) },
  { name: "Body L", spec: "Instrument Sans · 16", role: "The unit beside a big callout number (kWh/m², %, °C), and lead / emphasis copy.", code: "Units currently text-sm (14)", status: "refine", text: "57.8 kWh/m²", style: sans(16, { lineHeight: 1.4 }) },
  { name: "Body", spec: "Instrument Sans · 14 / 1.5", role: "Default reading text and the breadcrumb.", code: "text-sm", status: "ok", text: "Instrument Sans is the body face used across the product.", style: sans(14, { lineHeight: 1.5 }) },
  { name: "Subtitle", spec: "Instrument Sans · 12", role: "Secondary line under a title, and text inside tables.", code: "text-xs", status: "ok", text: "Showing all hours — click for business hours", style: sans(12, { lineHeight: 1.45, color: "var(--fg-2)" }) },
  { name: "Label", spec: "Instrument Sans · 12 · 500", role: "Field labels and metric captions.", code: "text-xs font-medium", status: "ok", text: "Avg Temperature", style: sans(12, { fontWeight: 500, color: "var(--fg-2)" }) },
  { name: "Eyebrow", spec: "Instrument Sans · 12 · uppercase", role: "Overline above a title or section, and small period / metric labels (e.g. “Last 24 hours”, “Area Used”).", code: "Mixed: text-xs (12) in panels, text-[10px] in widgets", status: "refine", text: "Last 24 hours", style: sans(12, { fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-2)" }) },
  { name: "Mono", spec: "Mono · 12", role: "Deltas, codes and token values.", code: "font-mono text-xs", status: "ok", text: "+3.2% vs last period", style: { fontFamily: "var(--font-mono)", fontSize: 12 } },
];

const STATUS_LABEL: Record<Status, { label: string; variant: "success" | "warning" | "muted" }> = {
  ok: { label: "matches code", variant: "success" },
  refine: { label: "refine in code", variant: "warning" },
  new: { label: "new", variant: "muted" },
};

function ScaleGroup({ title, note, rows }: { title: string; note: string; rows: Row[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-formula text-[15px] font-medium text-fg-1">{title}</h3>
        <span className="text-[11px] text-fg-2">{note}</span>
      </div>
      <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
        {rows.map((s) => {
          const st = STATUS_LABEL[s.status];
          return (
            <div key={s.name} className="px-5 py-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0">
                  <span className="text-[12px] font-medium text-fg-1">{s.name}</span>
                  <span className="font-mono text-[10px] text-fg-3 ml-2">{s.spec}</span>
                  <p className="text-[12px] text-fg-2 mt-1 max-w-md leading-snug">{s.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant={st.variant}>{st.label}</Badge>
                  <span className="font-mono text-[10px] text-fg-3 text-right">{s.code}</span>
                </div>
              </div>
              <div style={s.style} className="text-fg-1 mt-3">{s.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        lead="Two faces do the work: PP Formula Narrow — a tight, characterful display face — for anything that should feel like a headline or a number, and Instrument Sans for everything you read. Adamina and a mono stack play supporting roles."
      />

      <Section title="Families">
        <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
          {FAMILIES.map((f) => (
            <div key={f.name} className="flex items-center gap-6 px-5 py-5">
              <div className="w-40 shrink-0">
                <div className="text-[13px] font-medium text-fg-1">{f.name}</div>
                <div className="text-[11px] text-fg-2">{f.role}</div>
                <div className="font-mono text-[10px] text-fg-3 mt-1">{f.token}</div>
              </div>
              <div style={f.style} className="text-fg-1 min-w-0">{f.sample}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Type scale"
        description="The product runs on a compact scale — page titles sit at 18, widget titles at 16, body at 14. Each row carries a status: matches code today, needs refining in code, or new. Sizes are shown at their real value."
      >
        <ScaleGroup
          title="Display & metrics"
          note="PP Formula · for numbers, not words"
          rows={DISPLAY}
        />
        <ScaleGroup
          title="Headings"
          note="PP Formula · weight 500"
          rows={HEADINGS}
        />
        <ScaleGroup
          title="Text"
          note="Instrument Sans"
          rows={TEXT}
        />

        <div className="space-y-4 mt-2">
          <EngineeringNote>
            <span className="font-medium">Widget titles should sit at 16 (text-base).</span>{" "}
            Today <span className="font-mono">CardTitle</span> usage is mixed —{" "}
            <span className="font-mono">text-sm</span> (14) on most building widgets,{" "}
            <span className="font-mono">text-xs</span> (12) on portfolio widgets, and{" "}
            <span className="font-mono">text-base</span> (16) on only a couple. Standardise the{" "}
            <span className="font-mono">CardTitle</span> default to{" "}
            <span className="font-mono">text-base</span> so every card title matches (H4).
          </EngineeringNote>
          <EngineeringNote>
            <span className="font-medium">Big numbers need a fixed Display / Metric pair.</span>{" "}
            Callout figures currently range ad-hoc from{" "}
            <span className="font-mono">text-2xl</span> (24) up to{" "}
            <span className="font-mono">text-5xl</span> (48) depending on the widget. Settle on{" "}
            <span className="font-mono">Metric = 24</span> (the standard in-widget KPI) and{" "}
            <span className="font-mono">Display = 40</span> (the single hero number), plus{" "}
            <span className="font-mono">H1 = 28</span> for display-style heading text.
          </EngineeringNote>
          <EngineeringNote>
            <span className="font-medium">Metric units should sit at 16 (text-base).</span>{" "}
            The unit beside a headline number (e.g.{" "}
            <span className="font-mono">kWh/m²</span> in the EUI widget) is currently{" "}
            <span className="font-mono">text-sm</span> (14) —{" "}
            <span className="font-mono">energy-use-intensity.tsx</span>. Bump it to{" "}
            <span className="font-mono">text-base</span> (Body L) so it pairs cleanly with
            the big number. <span className="font-mono">text-lg</span> (Body XL, 18) is a
            new step with no usage yet — reserve it for lead copy.
          </EngineeringNote>
          <EngineeringNote>
            <span className="font-medium">Overlines should be one size — 12 (text-base's smaller sibling, text-xs).</span>{" "}
            Today they're split: AI panels use <span className="font-mono">text-xs</span>{" "}
            (12) while small widget labels (e.g. “Area Used”) use{" "}
            <span className="font-mono">text-[10px]</span>. Standardise every uppercase
            overline on <span className="font-mono">text-xs</span> and drop the arbitrary
            10px — it's off-scale and the least legible size for caps.
          </EngineeringNote>
          <EngineeringNote>
            <span className="font-medium">There's no shared heading helper.</span> Sizes are set
            inline at every call site (no <span className="font-mono">Heading</span> component, no{" "}
            <span className="font-mono">.ds-*</span> classes), which is why the scale drifts.
            A small set of helpers — or a <span className="font-mono">Heading level=</span>{" "}
            component — would keep these locked. Note: a global rule already forces{" "}
            <span className="font-mono">font-formula</span> + weight 500 on every{" "}
            <span className="font-mono">h1–h6</span> and{" "}
            <span className="font-mono">[data-slot=card-title]</span>, so only size needs governing.
          </EngineeringNote>
        </div>
      </Section>
    </>
  );
}
