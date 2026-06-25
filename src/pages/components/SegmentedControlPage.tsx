import { useState } from "react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Preview, CodeBlock, LevelTriple } from "@/components/preview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PRESETS = ["24h", "7d", "30d", "6M", "1Y"];
const ON = "data-[state=on]:bg-primary data-[state=on]:border-primary data-[state=on]:text-primary-foreground";

function DatePresets() {
  const [value, setValue] = useState("30d");
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={value}
      onValueChange={(v) => v && setValue(v)}
    >
      {PRESETS.map((p) => (
        <ToggleGroupItem key={p} value={p} className={`px-3 ${ON}`}>
          {p}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function SegmentedControlPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Segmented Control"
        lead="A small row of options where you pick exactly one, and the choice stays selected. Use it to set a value or filter for content that's already on screen — like the date-range presets. Built on ToggleGroup (single-select)."
      />

      <Section
        title="Tabs or Segmented Control?"
        description="They can look identical — the difference is what clicking does."
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] leading-relaxed text-fg-1">
          <p className="mb-2">
            Ask: <strong>did I just get new content, or the same content sliced
            differently?</strong>
          </p>
          <ul className="space-y-1 text-fg-2">
            <li>
              <span className="text-fg-1 font-medium">New content</span> → use{" "}
              <span className="font-medium">Tabs</span> (e.g. Operational → Sustainability
              swaps the whole table; Building Profile → Technical Summary swaps the fields).
            </li>
            <li>
              <span className="text-fg-1 font-medium">Same content, adjusted</span> → use a{" "}
              <span className="font-medium">Segmented Control</span> (e.g. 24h → 30d: the
              same chart, longer window).
            </li>
          </ul>
        </div>
      </Section>

      <Section
        title="Example — date range"
        description="Single-select: click a preset and it stays. The selected segment fills with --primary (the same selected-state color as the nav and tabs)."
      >
        <Preview><DatePresets /></Preview>
        <CodeBlock
          code={`const [range, setRange] = useState("30d")

<ToggleGroup type="single" variant="outline" size="sm"
  value={range} onValueChange={(v) => v && setRange(v)}>
  {["24h","7d","30d","6M","1Y"].map((p) => (
    <ToggleGroupItem key={p} value={p}
      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
      {p}
    </ToggleGroupItem>
  ))}
</ToggleGroup>`}
        />
      </Section>

      <Section
        title="Across levels"
        description="The selected segment uses --primary, so it re-tints per context — Sunrise, Sky, Vendure 60, Digital Sun."
      >
        <LevelTriple withAssistant>
          <ToggleGroup type="single" variant="outline" size="sm" defaultValue="30d">
            {["24h", "30d", "1Y"].map((p) => (
              <ToggleGroupItem key={p} value={p} className={`px-2.5 ${ON}`}>
                {p}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </LevelTriple>
      </Section>

      <Section title="Usage">
        <EngineeringNote>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              Build the date presets as a <span className="font-mono">ToggleGroup type="single"</span>,
              not styled <span className="font-mono">Button</span>s — buttons are momentary and
              shouldn't carry a persistent selected state.
            </li>
            <li>
              The selected (<span className="font-mono">data-[state=on]</span>) segment should fill
              with <span className="font-mono">--primary</span> (re-tints per level) — shadcn's
              toggle defaults to <span className="font-mono">--accent</span>, so override it.
            </li>
            <li>
              Regular button radius (<span className="font-mono">md</span>) — no pills.
            </li>
          </ul>
        </EngineeringNote>
      </Section>
    </>
  );
}
