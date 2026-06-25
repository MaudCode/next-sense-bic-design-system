import { EngineeringNote, PageHeader, Section } from "@/components/docs";

const PER_COMPONENT = [
  { r: "md", use: "Buttons, inputs, selects, segmented toggles" },
  { r: "lg", use: "Cards, panels, widgets (the base)" },
  { r: "xl", use: "Dialogs, sheets, large surfaces" },
  { r: "full", use: "Badges, tags, avatars — pills only" },
];

const RADII = [
  { name: "sm", token: "--radius-sm", px: 8, note: "calc(radius − 4px) · small controls" },
  { name: "md", token: "--radius-md", px: 10, note: "calc(radius − 2px) · inputs, buttons" },
  { name: "lg", token: "--radius-lg", px: 12, note: "= --radius · cards (base)" },
  { name: "xl", token: "--radius-xl", px: 16, note: "calc(radius + 4px) · large surfaces" },
  { name: "full", token: "rounded-full", px: 9999, note: "pills, badges, avatars" },
];

export function RadiiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Radii"
        lead="The system is built around a single --radius of 12px; the rest derive from it. Cards sit at the 12px base, controls a touch tighter, and pills go fully round."
      />
      <Section title="Scale">
        <div className="flex flex-wrap gap-5">
          {RADII.map((r) => (
            <div key={r.name} className="flex flex-col items-center">
              <div
                className="w-24 h-16 bg-card border border-border shadow-[var(--shadow-sm)] flex items-center justify-center font-mono text-[11px] text-fg-2"
                style={{ borderRadius: r.px === 9999 ? 9999 : r.px }}
              >
                {r.px === 9999 ? "∞" : `${r.px}px`}
              </div>
              <div className="mt-2 font-mono text-[11px] text-fg-1">{r.name}</div>
              <div className="font-mono text-[10px] text-fg-3">{r.token}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-1.5 text-[12px] text-fg-2">
          {RADII.map((r) => (
            <div key={r.name}>
              <span className="font-mono text-fg-1">{r.name}</span> — {r.note}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Per component"
        description="Which radius each component should use. The key rule: interactive controls (buttons, inputs) use md — pills (full) are reserved for badges and tags, not buttons."
      >
        <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
          {PER_COMPONENT.map((c) => (
            <div key={c.r} className="flex items-center gap-4 px-5 py-3">
              <span
                className="w-16 h-9 shrink-0 bg-bg-3 border border-border"
                style={{ borderRadius: c.r === "full" ? 9999 : c.r === "md" ? 10 : c.r === "lg" ? 12 : 16 }}
              />
              <span className="font-mono text-[12px] text-fg-1 w-12 shrink-0">{c.r}</span>
              <span className="text-[13px] text-fg-2">{c.use}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <EngineeringNote>
            The building "Back to…" button is currently a pill
            (<span className="font-mono">rounded-full</span>) in BIC — it should use the
            regular button radius (<span className="font-mono">md</span>), like every other
            button. Pills are for badges/tags only.
          </EngineeringNote>
        </div>
      </Section>
    </>
  );
}
