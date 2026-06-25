import { ArrowLeft, Calendar, ChevronRight, Clock, PanelLeft } from "lucide-react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Preview, CodeBlock } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PRESETS = ["24h", "7d", "30d", "6M", "1Y"];

export function FilterBarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Filter Bar"
        lead="The toolbar at the top of every Navigate page — breadcrumb, a context-aware back button, the date-range presets, and the calendar / recency controls. It's a composition of existing components, and it re-tints with the active level."
      />

      <Section
        title="Anatomy"
        description="Shown at Building level. The selected preset and the breadcrumb underline use the level accent; the back button uses the level-accent border (accentOutline). Every control sits on the regular button radius — no pills."
      >
        <Preview center={false} className="level-building p-0 bg-[var(--bg-1)]">
          <div className="w-full">
            {/* breadcrumb row */}
            <div className="flex items-center gap-3 px-4 h-12 border-b border-border">
              <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
                <PanelLeft />
              </Button>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-2 text-[14px]">
                <span className="text-fg-2">Lighthouse</span>
                <ChevronRight className="size-3.5 text-fg-3" />
                <span className="font-medium text-fg-1 border-b-2 border-primary pb-0.5">
                  Aurora Tower
                </span>
              </div>
            </div>
            {/* filter row */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-3">
              <Button variant="accentOutline" size="sm">
                <ArrowLeft /> Back to Lighthouse
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1.5">
                {PRESETS.map((p) =>
                  p === "30d" ? (
                    <Button
                      key={p}
                      variant="outline"
                      size="sm"
                      className="bg-accent border-accent text-accent-foreground hover:bg-accent"
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
        </Preview>
        <CodeBlock
          code={`<Button variant="accentOutline" size="sm"><ArrowLeft /> Back to Lighthouse</Button>

{/* date presets — outline buttons; selected gets the level accent fill */}
{["24h","7d","30d","6M","1Y"].map((p) => (
  <Button key={p} variant="outline" size="sm"
    className={p === active ? "bg-accent border-accent text-accent-foreground" : ""}>{p}</Button>
))}

<Button variant="outline" size="sm"><Calendar /> Jun 25 – Jul 25</Button>
<Button variant="outline" size="icon-sm"><Clock /></Button>`}
        />
        <div className="mt-4">
          <EngineeringNote>
            In BIC the date presets and the date-range button are pills
            (<span className="font-mono">rounded-full</span>) — they should use the regular
            button radius (<span className="font-mono">md</span>), same as the "Back to…"
            fix. The selected preset should read <span className="font-mono">--accent</span>{" "}
            (level wash), not a hardcoded blue.
          </EngineeringNote>
        </div>
      </Section>
    </>
  );
}
