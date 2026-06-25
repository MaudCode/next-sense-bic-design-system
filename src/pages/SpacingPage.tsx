import { PageHeader, Section } from "@/components/docs";

const SCALE = [
  { name: "space-1", px: 4, note: "" },
  { name: "space-2", px: 8, note: "icon ↔ label gaps" },
  { name: "space-3", px: 12, note: "widget padding" },
  { name: "space-4", px: 16, note: "page gutter" },
  { name: "space-5", px: 20, note: "" },
  { name: "space-6", px: 24, note: "card padding" },
  { name: "space-8", px: 32, note: "section rhythm" },
  { name: "space-12", px: 48, note: "" },
];

export function SpacingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        lead="A 4px base grid (Tailwind's --spacing token). Everything — padding, gaps, margins — is a multiple of 4, which keeps widgets and dense data tables visually aligned."
      />
      <Section title="Scale" description="Multiply the Tailwind step by 4px. e.g. p-3 = 12px, gap-6 = 24px.">
        <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
          {SCALE.map((s) => (
            <div key={s.name} className="flex items-center gap-4 px-5 py-3">
              <span className="font-mono text-[12px] text-fg-1 w-24 shrink-0">{s.name}</span>
              <span className="font-mono text-[11px] text-fg-2 w-12 shrink-0">{s.px}px</span>
              <span className="h-3 rounded bg-[var(--brand-sky)]" style={{ width: s.px }} />
              {s.note && <span className="text-[11px] text-fg-2 ml-2">{s.note}</span>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
