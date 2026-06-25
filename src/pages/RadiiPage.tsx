import { PageHeader, Section } from "@/components/docs";

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
    </>
  );
}
