import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Badge } from "@/components/ui/badge";

const SCALE = [
  { name: "space-1", px: 4, note: "stacked label ↔ value" },
  { name: "space-2", px: 8, note: "icon ↔ label" },
  { name: "space-3", px: 12, note: "tight gaps · chip padding" },
  { name: "space-4", px: 16, note: "list-row & compact gaps" },
  { name: "space-5", px: 20, note: "widget inner padding" },
  { name: "space-6", px: 24, note: "page gutter · gap between widgets" },
  { name: "space-8", px: 32, note: "section rhythm" },
  { name: "space-12", px: 48, note: "major section breaks" },
];

type Status = "ok" | "refine";
const STATUS: Record<Status, { label: string; variant: "success" | "warning" }> = {
  ok: { label: "matches code", variant: "success" },
  refine: { label: "refine in code", variant: "warning" },
};

const KEY = [
  { use: "Widget inner padding", value: "20", token: "p-5", code: "code uses px-4 / py-3 (16 / 12)", status: "refine" as Status },
  { use: "Gap between widgets", value: "24", token: "gap-6", code: "grid gap", status: "ok" as Status },
  { use: "Page gutter", value: "24", token: "p-6", code: "page container", status: "ok" as Status },
  { use: "Icon ↔ label", value: "8", token: "gap-2", code: "the workhorse gap", status: "ok" as Status },
  { use: "Stacked label ↔ value", value: "4", token: "gap-1", code: "metric label over number", status: "ok" as Status },
  { use: "Section rhythm", value: "32", token: "gap-8", code: "between widget groups", status: "ok" as Status },
];

export function SpacingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        lead="A 4px base grid (Tailwind's --spacing token). Every padding, gap and margin is a multiple of 4, which keeps widgets and dense data tables visually aligned."
      />

      <Section
        title="Key spacings"
        description="The handful of decisions you actually make. These are the defaults — reach for the scale below only for the in-between cases."
      >
        <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
          {KEY.map((k) => {
            const st = STATUS[k.status];
            return (
              <div key={k.use} className="flex items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-fg-1">{k.use}</div>
                  <div className="font-mono text-[11px] text-fg-3 mt-0.5">{k.code}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-[13px] text-fg-1">{k.value}px</span>
                  <span className="font-mono text-[11px] text-fg-2 ml-2">{k.token}</span>
                </div>
                <Badge variant={st.variant} className="shrink-0 w-[108px] justify-center">{st.label}</Badge>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <EngineeringNote>
            <span className="font-medium">Widget inner padding = 20 on all sides (p-5).</span>{" "}
            Today it's inconsistent — most widgets set{" "}
            <span className="font-mono">px-4</span> (16) horizontal /{" "}
            <span className="font-mono">py-3</span> (12) vertical in{" "}
            <span className="font-mono">widget-base</span>, while the shadcn{" "}
            <span className="font-mono">Card</span> default is{" "}
            <span className="font-mono">py-6 / px-6</span> (24) and gets overridden ad-hoc.
            Standardise on <span className="font-mono">p-5</span>. (And it's a{" "}
            <span className="font-medium">widget</span>, not a “card” — the widget is the
            recurring container in BIC; the shadcn Card is just the primitive underneath.)
          </EngineeringNote>
        </div>
      </Section>

      <Section title="The scale" description="Multiply the Tailwind step by 4px — e.g. p-3 = 12px, gap-6 = 24px.">
        <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
          {SCALE.map((s) => (
            <div key={s.name} className="flex items-center gap-4 px-5 py-3">
              <span className="font-mono text-[12px] text-fg-1 w-24 shrink-0">{s.name}</span>
              <span className="font-mono text-[11px] text-fg-2 w-12 shrink-0">{s.px}px</span>
              <span className="h-3 rounded bg-[var(--brand-sky)] shrink-0" style={{ width: s.px }} />
              {s.note && <span className="text-[11px] text-fg-2 ml-2">{s.note}</span>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
