import { useState } from "react";
import { cn } from "@/lib/utils";
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

/** The pill-container segmented control — a level-tinted active segment on a
    Nimbus track. Built to the Figma spec: track radius 10 (rounded-md), 2px
    padding, 1px border; active segment radius 8 (rounded-sm), bg = --secondary
    (the level tint: Mist / Haze / Vendure 40). */
const SWITCHER = ["Operational", "Sustainability", "Comfort"];

function SectionSwitcher() {
  const [value, setValue] = useState("Operational");
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-[var(--brand-nimbus)] p-0.5">
      {SWITCHER.map((s) => (
        <button
          key={s}
          onClick={() => setValue(s)}
          className={cn(
            "rounded-sm px-2.5 py-1 text-sm font-medium transition-colors",
            value === s
              ? "bg-primary text-primary-foreground"
              : "text-fg-3 hover:text-fg-1",
          )}
        >
          {s}
        </button>
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
        lead="A row of options where you pick exactly one and it stays selected. BIC uses two forms: a compact pill container with a level-tinted active segment — the Operational / Sustainability / Comfort switcher — and a row of buttons for the date-range presets. Pick one; the rest sit quiet."
      />

      <Section
        title="Pill container — section switcher"
        description="Shown at Portfolio. A Nimbus track holds the segments; the active one is a pill filled with --primary (Sunrise here), so selection reads the same as everywhere else in BIC. Body (Instrument Sans) labels. Track radius 10 (rounded-md), active radius 8 (rounded-sm), 2px track padding."
      >
        <Preview className="level-portfolio"><SectionSwitcher /></Preview>
        <CodeBlock
          code={`const [tab, setTab] = useState("Operational")

<div className="inline-flex gap-1 rounded-md border bg-[var(--brand-nimbus)] p-0.5">
  {["Operational","Sustainability","Comfort"].map((s) => (
    <button key={s} onClick={() => setTab(s)}
      className={cn("rounded-sm px-2.5 py-1 text-sm font-medium",
        tab === s ? "bg-primary text-primary-foreground" : "text-fg-3 hover:text-fg-1")}>
      {s}
    </button>
  ))}
</div>`}
        />
      </Section>

      <Section
        title="Section switcher across levels"
        description="The active segment is bg-primary, so it follows the level — Sunrise (Portfolio), Sky (Building), Vendure 60 (General)."
      >
        <LevelTriple>
          <SectionSwitcher />
        </LevelTriple>
      </Section>

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
        <div className="mb-4">
          <EngineeringNote>
            <span className="font-medium">Pill-container switcher:</span> track ={" "}
            <span className="font-mono">bg-[var(--brand-nimbus)]</span>, 1px border, radius
            10 (<span className="font-mono">rounded-md</span>), 2px padding. Active segment ={" "}
            <span className="font-mono">bg-primary</span> (the level color — Sunrise / Sky /
            Vendure 60), label = body font + <span className="font-mono">text-primary-foreground</span>,
            radius 8 (<span className="font-mono">rounded-sm</span>), padding{" "}
            <span className="font-mono">2px 8px</span>. Drive selection in JS — it's
            single-select, like Tabs but for re-slicing the same view.
          </EngineeringNote>
        </div>
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
