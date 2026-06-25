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
        lead="Switch between related views in place. The active trigger reads from the level-tinted surface, keeping the selected state consistent with the rest of the page."
      />
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
