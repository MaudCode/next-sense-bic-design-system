import { Search } from "lucide-react";
import { PageHeader, Section } from "@/components/docs";
import { Example, LevelTriple } from "@/components/preview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function InputPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Input & Controls"
        lead="Form primitives — text input, label, checkbox, switch and select. All share the same border, radius and the level-tinted focus ring (visible on keyboard focus)."
      />

      <Section
        title="Focus ring across levels"
        description="The focus ring uses --ring, so it re-tints per level (Sunrise / Sky / Vendure 80). The AI Assistant is the exception — its ring is a deliberate neutral grey (--ring = --border) so the chat input doesn't glow yellow. Shown forced-on to compare; in use it only appears on keyboard focus."
      >
        <LevelTriple withAssistant>
          <Input
            readOnly
            value="Focused"
            className="w-full border-ring ring-[3px] ring-ring/50"
          />
        </LevelTriple>
      </Section>

      <Section title="Text input">
        <Example
          code={`<div className="grid gap-2">
  <Label htmlFor="b">Building name</Label>
  <Input id="b" placeholder="e.g. Riverside Mews" />
</div>`}
        >
          <div className="grid gap-2 w-72 text-left">
            <Label htmlFor="b">Building name</Label>
            <Input id="b" placeholder="e.g. Riverside Mews" />
          </div>
        </Example>
      </Section>

      <Section title="With icon & disabled">
        <Example
          code={`<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-fg-3" />
  <Input className="pl-9" placeholder="Search ECMs…" />
</div>
<Input disabled placeholder="Disabled" />`}
        >
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--fg-3)]" />
            <Input className="pl-9" placeholder="Search ECMs…" />
          </div>
          <Input disabled placeholder="Disabled" className="w-40" />
        </Example>
      </Section>

      <Section title="Checkbox & switch">
        <Example
          code={`<div className="flex items-center gap-2">
  <Checkbox id="c" defaultChecked />
  <Label htmlFor="c">Business hours only</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="s" defaultChecked />
  <Label htmlFor="s">Live data</Label>
</div>`}
        >
          <div className="flex items-center gap-2">
            <Checkbox id="c" defaultChecked />
            <Label htmlFor="c">Business hours only</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="s" defaultChecked />
            <Label htmlFor="s">Live data</Label>
          </div>
        </Example>
      </Section>

      <Section title="Select">
        <Example
          code={`<Select>
  <SelectTrigger className="w-52"><SelectValue placeholder="Date range" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="24h">Last 24 hours</SelectItem>
    <SelectItem value="7d">Last 7 days</SelectItem>
    <SelectItem value="30d">Last 30 days</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select>
            <SelectTrigger className="w-52"><SelectValue placeholder="Date range" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </Example>
      </Section>
    </>
  );
}
