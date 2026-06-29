import { EngineeringNote, PageHeader, Section } from "@/components/docs";
import { CodeBlock, LevelStack, NotUsed, RefTable, Used } from "@/components/preview";
import { Badge } from "@/components/ui/badge";

export function BadgePage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Badge"
        lead="A compact, pill-shaped label for status, categories and counts. Small by design — it annotates other content rather than standing alone."
      />

      <Section
        title="Variants"
        description="Shown at each level. The default (active/selected) badge re-tints with context; secondary, muted, outline and destructive stay constant."
      >
        <LevelStack>
          <Badge>Active</Badge>
          <Badge variant="secondary">Overview</Badge>
          <Badge variant="muted">RVRMDW</Badge>
          <Badge variant="outline">Last 24h</Badge>
          <Badge variant="destructive">Alert</Badge>
        </LevelStack>
        <div className="mt-3">
          <CodeBlock
            standalone
            code={`<Badge>Active</Badge>
<Badge variant="secondary">Overview</Badge>
<Badge variant="muted">RVRMDW</Badge>
<Badge variant="outline">Last 24h</Badge>
<Badge variant="destructive">Alert</Badge>`}
          />
        </div>
      </Section>

      <Section
        title="Muted (grey)"
        description="A neutral grey badge for identifiers and metadata that shouldn't compete for attention — e.g. the building-code tags in tables. Level-agnostic: it stays grey in every context."
      >
        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-xs)] flex flex-wrap items-center gap-2.5">
          <Badge variant="muted">RVRMDW</Badge>
          <Badge variant="muted">HRBGTW</Badge>
          <Badge variant="muted">AURTWR</Badge>
        </div>
        <div className="mt-3">
          <CodeBlock standalone code={`<Badge variant="muted">RVRMDW</Badge>`} />
        </div>
        <div className="mt-4">
          <EngineeringNote>
            Add a <span className="font-mono">muted</span> variant to{" "}
            <span className="font-mono">badge.tsx</span>:{" "}
            <span className="font-mono">bg-muted text-muted-foreground</span>. These map
            to the system greys (<span className="font-mono">--muted</span> ≈{" "}
            <span className="font-mono">#F7F7F7</span>,{" "}
            <span className="font-mono">--muted-foreground</span>) — essentially the
            Figma <span className="font-mono">#F5F5F5 / #737373</span> tags, kept on
            tokens. Use it for building-code / identifier tags in tables.
          </EngineeringNote>
        </div>
      </Section>

      <Section
        title="Status"
        description="Soft-filled pills for state — connection health, severity, system status. Each uses a status colour at its tint: a muted fill with the darker tone as text, so it reads clearly on a white card without shouting. Level-agnostic — status means the same thing in every context."
      >
        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-xs)] flex flex-wrap items-center gap-2.5">
          <Badge variant="success">Healthy</Badge>
          <Badge variant="warning">Degraded</Badge>
          <Badge variant="error">Connection loss</Badge>
        </div>
        <div className="mt-3">
          <CodeBlock
            standalone
            code={`<Badge variant="success">Healthy</Badge>
<Badge variant="warning">Degraded</Badge>
<Badge variant="error">Connection loss</Badge>`}
          />
        </div>
        <div className="mt-4">
          <EngineeringNote>
            Add three soft status variants to{" "}
            <span className="font-mono">badge.tsx</span>, each a{" "}
            <span className="font-mono">-muted</span> fill + foreground:{" "}
            <span className="font-mono">success</span> (
            <span className="font-mono">bg-success-muted text-success-muted-foreground</span>),{" "}
            <span className="font-mono">warning</span>, and{" "}
            <span className="font-mono">error</span> (
            <span className="font-mono">--destructive-muted</span>). Connection-health
            components currently use raw Tailwind (
            <span className="font-mono">green-500 / orange-500 / red-500</span>) — point
            them at these instead. Severity maps as on Colors: Healthy → success, Partially
            degraded → warning, Highly degraded → Sunset, Connection loss → error. Solid{" "}
            <span className="font-mono">destructive</span> stays for hard alerts.
          </EngineeringNote>
        </div>
      </Section>

      <Section
        title="Usage"
        description="What the variants are for, and whether they actually appear in the product today (counted across the BIC codebase)."
      >
        <RefTable
          head={["variant", "in product", "purpose"]}
          rows={[
            ["outline", <Used key="o" />, "Quiet, bordered label — the most common badge"],
            ["secondary", <Used key="s" />, "Neutral category / count chip (e.g. portfolio & ECM counts)"],
            ["default", <Used key="d" />, "Active / selected (level-tinted) — used sparingly"],
            ["muted", <NotUsed key="m" />, "Grey identifier tag (building codes) — in the design, proposed for code"],
            ["destructive", <NotUsed key="x" />, "Solid alert / error — defined, not yet used"],
            ["success / warning / error", <NotUsed key="st" />, "Soft status pills (connection health, severity) — proposed for code"],
          ]}
        />
        <p className="text-[11px] text-fg-2 mt-3">
          “In product” reflects current usage in the codebase. <span className="font-mono">muted</span>{" "}
          is a proposed addition (see note above); the others exist in{" "}
          <span className="font-mono">badge.tsx</span>.
        </p>
      </Section>
    </>
  );
}
