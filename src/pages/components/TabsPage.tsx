import { PageHeader, Section } from "@/components/docs";
import { Preview, CodeBlock, LevelTriple } from "@/components/preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CODE = `<Tabs defaultValue="energy">
  <TabsList>
    <TabsTrigger value="energy">Energy</TabsTrigger>
    <TabsTrigger value="comfort">Comfort</TabsTrigger>
    <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
  </TabsList>
  <TabsContent value="energy">Energy breakdown…</TabsContent>
  <TabsContent value="comfort">Comfort categories…</TabsContent>
  <TabsContent value="occupancy">Occupancy trends…</TabsContent>
</Tabs>`;

export function TabsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Tabs"
        lead="Switch between related views in place — each tab reveals a different panel of content. Use Tabs whenever clicking gives you new content (the Operational/Sustainability/Comfort table switcher, the Building Profile / Technical Summary form sections). If clicking instead re-slices the same content (e.g. a date range), that's a Segmented Control, not Tabs."
      />

      <Section title="Two visual styles, same component">
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] leading-relaxed text-fg-2">
          Tabs render in two looks in BIC — a <span className="text-fg-1 font-medium">pill / segmented</span> row
          (the metric switcher) and classic <span className="text-fg-1 font-medium">folder tabs</span> with the
          active tab joined to the panel below (the Building Summary page). Both are the same Tabs component;
          only the styling differs. Pill-shaped ≠ Segmented Control — what matters is that Tabs swap content.
        </div>
      </Section>
      <Section
        title="Across levels"
        description="The active trigger's surface follows the level, keeping the selected tab consistent with the rest of the page."
      >
        <LevelTriple>
          <Tabs defaultValue="energy">
            <TabsList>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="comfort">Comfort</TabsTrigger>
            </TabsList>
          </Tabs>
        </LevelTriple>
      </Section>

      <Section title="Example">
        <Preview center={false}>
          <Tabs defaultValue="energy">
            <TabsList>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="comfort">Comfort</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            </TabsList>
            <TabsContent value="energy" className="text-[13px] text-fg-2 pt-3">
              Energy breakdown by source and use.
            </TabsContent>
            <TabsContent value="comfort" className="text-[13px] text-fg-2 pt-3">
              Comfort categories per EN 16798.
            </TabsContent>
            <TabsContent value="occupancy" className="text-[13px] text-fg-2 pt-3">
              Occupancy trends across the week.
            </TabsContent>
          </Tabs>
        </Preview>
        <CodeBlock code={CODE} />
      </Section>
    </>
  );
}
