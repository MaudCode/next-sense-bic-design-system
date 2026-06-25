import { ArrowLeft, Calendar, ChevronRight, Clock, PanelLeft } from "lucide-react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Preview, CodeBlock } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PRESETS = ["24h", "7d", "30d", "6M", "1Y"];

function Bar({ crumbParent, crumbActive, backLabel }: { crumbParent: string; crumbActive: string; backLabel: string }) {
  return (
    <div className="w-full">
      {/* breadcrumb row */}
      <div className="flex items-center gap-3 px-4 h-12 border-b border-border">
        <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
          <PanelLeft />
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <div className="flex items-center gap-2 text-[14px]">
          <span className="text-fg-2">{crumbParent}</span>
          <ChevronRight className="size-3.5 text-fg-3" />
          <span className="font-medium text-fg-1 border-b-2 border-primary pb-0.5">{crumbActive}</span>
        </div>
      </div>
      {/* filter row */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        <Button variant="accentOutline" size="sm">
          <ArrowLeft /> {backLabel}
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-1.5">
          {PRESETS.map((p) =>
            p === "30d" ? (
              <Button
                key={p}
                variant="outline"
                size="sm"
                className="bg-primary border-primary text-primary-foreground hover:bg-primary"
              >
                {p}
              </Button>
            ) : (
              <Button key={p} variant="outline" size="sm">
                {p}
              </Button>
            ),
          )}
        </div>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="outline" size="sm">
          <Calendar /> Jun 25 – Jul 25
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Recent">
          <Clock />
        </Button>
      </div>
    </div>
  );
}

export function FilterBarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Filter Bar"
        lead="The toolbar at the top of every Navigate page — breadcrumb, a context-aware back button, the date-range presets, and the calendar / recency controls. It's a composition of existing components, and it re-tints with the active level."
      />

      <Section
        title="Building level"
        description="The selected preset, the breadcrumb underline and the back-button border all follow the level primary (Sky here); hovers use the accent. Every control sits on the regular button radius — no pills. The bar sits on the page (Nimbus), not a white card."
      >
        <Preview center={false} className="level-building p-0 bg-[var(--bg-1)]">
          <Bar crumbParent="Lighthouse" crumbActive="Aurora Tower" backLabel="Back to Lighthouse" />
        </Preview>
        <CodeBlock
          code={`<Button variant="accentOutline" size="sm"><ArrowLeft /> Back to Lighthouse</Button>

{/* date presets — outline buttons; the SELECTED one fills with --primary */}
{["24h","7d","30d","6M","1Y"].map((p) => (
  <Button key={p} variant="outline" size="sm"
    className={p === active ? "bg-primary border-primary text-primary-foreground" : ""}>{p}</Button>
))}

<Button variant="outline" size="sm"><Calendar /> Jun 25 – Jul 25</Button>
<Button variant="outline" size="icon-sm"><Clock /></Button>`}
        />
        <div className="mt-4">
          <EngineeringNote>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                The selected date preset should fill with <span className="font-mono">--primary</span>{" "}
                (so it re-tints per level, like the selected nav item) — in BIC it's likely a
                hardcoded blue / accent wash today, which is wrong.
              </li>
              <li>
                The date presets and date-range button are pills
                (<span className="font-mono">rounded-full</span>) in BIC — they should use the
                regular button radius (<span className="font-mono">md</span>), same as the
                "Back to…" fix.
              </li>
            </ul>
          </EngineeringNote>
        </div>
      </Section>

      <Section
        title="Portfolio level"
        description="The exact same bar at portfolio level — everything re-tints warm: the selected preset and back-button border become Sunrise, with no markup change."
      >
        <Preview center={false} className="level-portfolio p-0 bg-[var(--bg-1)]">
          <Bar crumbParent="Lighthouse" crumbActive="All Buildings" backLabel="Back to All Buildings" />
        </Preview>
      </Section>
    </>
  );
}
