import { ArrowLeft, Plus } from "lucide-react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { CodeBlock, Example, LevelStack, NotUsed, RefTable, Used } from "@/components/preview";
import { Button } from "@/components/ui/button";

export function ButtonPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Button"
        lead="The standard action control. The default variant uses --primary, so it re-tints with the active level. Hover dims the fill; the focus ring appears only on keyboard focus (Tab), never on click."
      />

      <Section
        title="Variants"
        description="Every variant the component exposes, shown at each level — plus the AI Assistant context (Digital Sun). default, secondary, link and accentOutline follow the context (accentOutline's border = the level accent); outline, ghost and destructive stay constant. Not all of these are used in the product today — see Usage below."
      >
        <LevelStack withAssistant>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="accentOutline" className="rounded-full"><ArrowLeft /> Back</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Delete</Button>
        </LevelStack>
        <div className="mt-3">
          <CodeBlock
            standalone
            code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="accentOutline">Back</Button>   {/* border = level accent */}
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Delete</Button>`}
          />
        </div>
        <div className="mt-4">
          <EngineeringNote>
            <p className="mb-2">To bring the code in line with these button rules:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                Set <span className="font-mono">--primary</span> per level — Portfolio{" "}
                <span className="font-mono">#FFAB9A</span> · Building{" "}
                <span className="font-mono">#A1D3F0</span> · General{" "}
                <span className="font-mono">#5C654D</span> (today it ships pale
                Mist/Haze and a dark <span className="font-mono">#484F3C</span>).
              </li>
              <li>
                Make <span className="font-mono">--secondary</span> level-aware — Mist /
                Haze / Vendure 40 (today it's a fixed blue).
              </li>
              <li>
                Primary text: dark (<span className="font-mono">--foreground</span>) at
                Portfolio &amp; Building, white at General.
              </li>
              <li>
                AI Assistant: <span className="font-mono">[data-testid="chat-panel"]</span>{" "}
                only remaps <span className="font-mono">--primary</span>/
                <span className="font-mono">--ring</span> today — also remap{" "}
                <span className="font-mono">--accent</span> (#F5FDD3) and{" "}
                <span className="font-mono">--secondary</span> (#E5FB8C), or outline
                suggestion chips fall back to the base Haze <em>blue</em> on hover/click.
              </li>
              <li>
                Add an <span className="font-mono">accentOutline</span> variant
                (<span className="font-mono">border-primary</span>) and use it for the
                "Back to…" button instead of the inline{" "}
                <span className="font-mono">border-building-border</span> override — it
                then re-tints to every context for free.
              </li>
            </ul>
          </EngineeringNote>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Shown at Building level for legibility — size and shape are identical across levels."
      >
        <Example
          level="building"
          code={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>`}
        >
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add"><Plus /></Button>
        </Example>
      </Section>

      <Section title="With icon">
        <Example level="building" code={`<Button><Plus /> New ECM</Button>`}>
          <Button><Plus /> New ECM</Button>
        </Example>
      </Section>

      <Section title="Disabled">
        <Example
          level="building"
          code={`<Button disabled>Primary</Button>
<Button variant="outline" disabled>Outline</Button>`}
        >
          <Button disabled>Primary</Button>
          <Button variant="outline" disabled>Outline</Button>
        </Example>
      </Section>

      <Section
        title="Usage"
        description="What the variants are for, and whether they actually appear in the product today (counted across the BIC codebase)."
      >
        <RefTable
          head={["variant", "in product", "purpose"]}
          rows={[
            ["default", <Used key="d" />, "Primary action (level-tinted) — the implicit default, used most"],
            ["outline", <Used key="o" />, "Neutral, bordered — the workhorse variant"],
            ["accentOutline", <Used key="ao" />, "Level-accent bordered pill — the building “Back to…” button (today an inline border override)"],
            ["ghost", <Used key="g" />, "Toolbar / inline action"],
            ["secondary", <NotUsed key="s" />, "Lower-emphasis action — defined, but only Badge uses secondary"],
            ["destructive", <NotUsed key="x" />, "Delete / irreversible — reserved, not yet used"],
            ["link", <NotUsed key="l" />, "Navigational, text-only — defined, not yet used"],
          ]}
        />
        <p className="text-[11px] text-fg-2 mt-3">
          “In product” reflects current usage in the codebase, not whether the variant
          is available — all six exist in <span className="font-mono">button.tsx</span>.
        </p>
      </Section>
    </>
  );
}
