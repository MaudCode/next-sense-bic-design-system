import { useState } from "react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Preview, CodeBlock, LevelTriple } from "@/components/preview";
import { Button } from "@/components/ui/button";

const PRESETS = ["24h", "7d", "30d", "6M", "1Y"];

function DatePresets() {
  const [value, setValue] = useState("30d");
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((p) => (
        <Button
          key={p}
          variant={value === p ? "default" : "outline"}
          size="sm"
          onClick={() => setValue(p)}
        >
          {p}
        </Button>
      ))}
    </div>
  );
}

export function SegmentedControlPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Segmented Control"
        lead="A row of options where you pick exactly one and it stays selected — used to set a value or filter for content that's already on screen, like the date-range presets. It's not a separate component: it's a row of Buttons where the selected one is variant=default (primary) and the rest are outline. Same buttons as the filter bar."
      />

      <Section
        title="Tabs or Segmented Control?"
        description="Ask: did clicking give me new content, or the same content sliced differently?"
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] leading-relaxed text-fg-1">
          <ul className="space-y-1 text-fg-2">
            <li>
              <span className="text-fg-1 font-medium">New content</span> → Tabs (Operational →
              Sustainability swaps the table; usually a connected pill or folder tabs).
            </li>
            <li>
              <span className="text-fg-1 font-medium">Same content, adjusted</span> → Segmented
              Control (24h → 30d: same chart, longer window; separate buttons, one selected).
            </li>
          </ul>
        </div>
      </Section>

      <Section
        title="Example — date range"
        description="Shown at Building level. Click a preset and it stays. Selected = variant=default (fills with --primary, dark text); the rest are variant=outline. Regular button radius — no pills."
      >
        <Preview className="level-building"><DatePresets /></Preview>
        <CodeBlock
          code={`const [range, setRange] = useState("30d")

{["24h","7d","30d","6M","1Y"].map((p) => (
  <Button key={p} size="sm" onClick={() => setRange(p)}
    variant={range === p ? "default" : "outline"}>
    {p}
  </Button>
))}`}
        />
      </Section>

      <Section
        title="Across levels"
        description="The selected button is variant=default, so it fills with --primary and re-tints per context — Sunrise, Sky, Vendure 60, Digital Sun."
      >
        <LevelTriple withAssistant>
          <div className="flex items-center gap-2">
            {["24h", "30d", "1Y"].map((p) => (
              <Button key={p} variant={p === "30d" ? "default" : "outline"} size="sm">
                {p}
              </Button>
            ))}
          </div>
        </LevelTriple>
      </Section>

      <Section title="Usage">
        <EngineeringNote>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              These are <span className="font-mono">Button</span>s, single-select — selected is{" "}
              <span className="font-mono">variant="default"</span> (already correct in{" "}
              <span className="font-mono">date-range-picker.tsx</span>), rest are{" "}
              <span className="font-mono">variant="outline"</span>.
            </li>
            <li>
              Only fix needed: they're <span className="font-mono">rounded-full</span> (pill)
              today — should be the regular button radius (<span className="font-mono">md</span>).
            </li>
          </ul>
        </EngineeringNote>
      </Section>
    </>
  );
}
