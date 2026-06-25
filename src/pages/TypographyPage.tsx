import { PageHeader, Section } from "@/components/docs";

const FAMILIES = [
  { name: "PP Formula", role: "Display / headings", token: "--font-formula", sample: "Buildings, awake.", style: { fontFamily: "var(--font-formula)", fontWeight: 500, fontSize: 34 } },
  { name: "Instrument Sans", role: "Body / UI", token: "--font-sans", sample: "All labels, tables and long-form copy.", style: { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 22 } },
  { name: "Adamina", role: "Secondary serif (rare)", token: "--font-serif", sample: "Occasional editorial accents.", style: { fontFamily: "var(--font-serif)", fontSize: 22 } },
  { name: "Mono", role: "Numbers / tokens", token: "--font-mono", sample: "2,450 kWh · +3.2% · 21.4 °C", style: { fontFamily: "var(--font-mono)", fontSize: 18 } },
];

const SCALE = [
  { name: "Display", cls: "ds-display", spec: "PP Formula · 72 / -1%", style: { fontFamily: "var(--font-formula)", fontWeight: 500, fontSize: 72, lineHeight: 1, letterSpacing: "-0.01em" }, text: "Total Power" },
  { name: "Metric", cls: "ds-metric", spec: "PP Formula · 48", style: { fontFamily: "var(--font-formula)", fontWeight: 500, fontSize: 48, lineHeight: 1, letterSpacing: "-0.01em" }, text: "2,450 kWh" },
  { name: "H1", cls: "ds-h1", spec: "PP Formula · 40", style: { fontFamily: "var(--font-formula)", fontWeight: 500, fontSize: 40, lineHeight: 1.05 }, text: "Energy Dashboard" },
  { name: "H2", cls: "ds-h2", spec: "PP Formula · 28", style: { fontFamily: "var(--font-formula)", fontWeight: 500, fontSize: 28, lineHeight: 1.1 }, text: "Energy Usage" },
  { name: "H3", cls: "ds-h3", spec: "PP Formula · 20", style: { fontFamily: "var(--font-formula)", fontWeight: 500, fontSize: 20, lineHeight: 1.2 }, text: "Building Overview" },
  { name: "Body", cls: "ds-body", spec: "Instrument Sans · 14 / 1.5", style: { fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5 }, text: "Instrument Sans is the body face used across the product." },
  { name: "Body sm", cls: "ds-body-sm", spec: "Instrument Sans · 12", style: { fontFamily: "var(--font-sans)", fontSize: 12, lineHeight: 1.45, color: "var(--fg-2)" }, text: "Showing all hours — click for business hours" },
  { name: "Label", cls: "ds-label", spec: "Instrument Sans · 12 · 500", style: { fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: "var(--fg-2)" }, text: "Avg Temperature" },
  { name: "Eyebrow", cls: "ds-eyebrow", spec: "Instrument Sans · 11 · uppercase", style: { fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--fg-2)" }, text: "Last 24 hours" },
  { name: "Mono", cls: "ds-mono", spec: "Mono · 12", style: { fontFamily: "var(--font-mono)", fontSize: 12 }, text: "+3.2% vs last period" },
];

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
        description="Headings and metrics use PP Formula; everything from body down uses Instrument Sans. Each row maps to a .ds-* helper class in the product CSS."
      >
        <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
          {SCALE.map((s) => (
            <div key={s.name} className="px-5 py-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-medium text-fg-2">{s.name}</span>
                <span className="font-mono text-[10px] text-fg-3">{s.spec}</span>
              </div>
              <div style={s.style} className="text-fg-1">{s.text}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
