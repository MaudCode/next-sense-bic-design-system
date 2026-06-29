import { Building2, Briefcase, SquareTerminal, ChevronDown } from "lucide-react";
import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { Preview, CodeBlock, LevelTriple } from "@/components/preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** The folder-tab look from the Building Summary / onboarding pages — the active
    tab is a raised white card joined to the panel below. Built to the Figma spec
    (padding 12/18, gap 9, radius 12 12 0 0, 1px border on three sides, upward
    shadow). This styling is NOT produced by the shadcn tabs.tsx primitive. */
const FOLDER_TABS = [
  { icon: Building2, label: "Building Profile" },
  { icon: Briefcase, label: "Project Information" },
  { icon: SquareTerminal, label: "Technical Summary" },
];

function FolderTabs() {
  const activeIndex = 2;
  return (
    <div className="rounded-xl border border-border bg-[var(--background)] p-6">
      <div className="flex items-end gap-1 px-3">
        {FOLDER_TABS.map((t, i) =>
          i === activeIndex ? (
            <div
              key={t.label}
              className="relative z-10 -mb-px flex items-center gap-[9px] rounded-t-[12px] border-t border-l border-r border-border bg-card px-[18px] pt-3 pb-[13px] shadow-[0_-3px_8px_0_rgba(63,71,47,0.06)]"
            >
              <t.icon size={16} className="text-fg-1" />
              <span className="font-formula text-[15px] font-medium text-fg-1">{t.label}</span>
            </div>
          ) : (
            <button
              key={t.label}
              className="flex items-center gap-[9px] px-[18px] pt-3 pb-[13px] text-fg-3 transition-colors hover:text-fg-2"
            >
              <t.icon size={16} />
              <span className="font-formula text-[15px] font-medium">{t.label}</span>
            </button>
          ),
        )}
      </div>
      <div className="rounded-xl border border-border bg-card px-5 py-4 shadow-[var(--shadow-xs)]">
        <div className="flex items-center justify-between">
          <span className="font-formula text-[17px] font-medium text-fg-1">BMS</span>
          <ChevronDown size={18} className="text-fg-3" />
        </div>
      </div>
    </div>
  );
}

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
        title="Folder tabs"
        description="The active tab is a raised white card whose bottom edge joins the panel below — used for the Building Summary / onboarding form sections. PP Formula labels, an icon per tab, and an upward shadow so the active tab lifts off the page."
      >
        <FolderTabs />
        <div className="mt-4">
          <EngineeringNote>
            This look isn't produced by the shadcn <span className="font-mono">tabs.tsx</span>{" "}
            primitive (which only renders the segmented style above). Add a{" "}
            <span className="font-mono">folder</span> variant to{" "}
            <span className="font-mono">TabsList</span> /{" "}
            <span className="font-mono">TabsTrigger</span>: trigger{" "}
            <span className="font-mono">padding 12px 18px</span>,{" "}
            <span className="font-mono">gap 9px</span>; active ={" "}
            <span className="font-mono">bg-card</span>,{" "}
            <span className="font-mono">rounded-t-[12px]</span>, 1px border on top/left/right,
            shadow <span className="font-mono">0 -3px 8px rgba(63,71,47,0.06)</span>, and{" "}
            <span className="font-mono">-1px</span> bottom margin so it joins the panel;
            inactive = muted text, transparent.
          </EngineeringNote>
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
