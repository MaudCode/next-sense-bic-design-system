import { PageHeader, Section } from "@/components/docs";

const SHADOWS = [
  { name: "xs", token: "--shadow-xs", note: "subtle controls, inputs" },
  { name: "sm", token: "--shadow-sm", note: "cards (default)" },
  { name: "md", token: "--shadow-md", note: "raised cards" },
  { name: "lg", token: "--shadow-lg", note: "popovers, dropdowns" },
  { name: "xl", token: "--shadow-xl", note: "dialogs, sheets" },
];

export function ShadowsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Shadows"
        lead="Elevation is quiet and warm. Every shadow is cast from Verdure (#3F472F) at roughly 10% — a soft olive tint, never pure black — so raised surfaces feel like paper on paper."
      />
      <Section title="Scale">
        <div className="rounded-xl border border-border bg-[var(--brand-nimbus)] p-8 flex flex-wrap gap-7">
          {SHADOWS.map((s) => (
            <div key={s.name} className="flex flex-col items-center">
              <div
                className="w-28 h-20 bg-card rounded-xl border border-border flex items-center justify-center font-mono text-[11px] text-fg-2"
                style={{ boxShadow: `var(${s.token})` }}
              >
                {s.name}
              </div>
              <div className="mt-3 font-mono text-[10px] text-fg-3">{s.token}</div>
              <div className="text-[11px] text-fg-2">{s.note}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
