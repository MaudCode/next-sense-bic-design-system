import {
  SquareTerminal, ListChecks, Settings2, Building2, Search, Calendar,
  Clock, ChevronRight, ChevronDown, Filter, Plus, TrendingUp, TrendingDown,
  Zap, Users, Thermometer, Droplets, Sun, Wind, Leaf, LifeBuoy, Send,
  Sparkles, RefreshCw, GripVertical,
} from "lucide-react";
import { PageHeader, Section } from "@/components/docs";

const ICONS = [
  { I: SquareTerminal, n: "square-terminal" }, { I: ListChecks, n: "list-checks" },
  { I: Settings2, n: "settings-2" }, { I: Building2, n: "building-2" },
  { I: Search, n: "search" }, { I: Calendar, n: "calendar" }, { I: Clock, n: "clock" },
  { I: Filter, n: "filter" }, { I: Plus, n: "plus" }, { I: ChevronRight, n: "chevron-right" },
  { I: ChevronDown, n: "chevron-down" }, { I: TrendingUp, n: "trending-up" },
  { I: TrendingDown, n: "trending-down" }, { I: Zap, n: "zap" }, { I: Users, n: "users" },
  { I: Thermometer, n: "thermometer" }, { I: Droplets, n: "droplets" }, { I: Sun, n: "sun" },
  { I: Wind, n: "wind" }, { I: Leaf, n: "leaf" }, { I: LifeBuoy, n: "life-buoy" },
  { I: Send, n: "send" }, { I: Sparkles, n: "sparkles" }, { I: RefreshCw, n: "refresh-cw" },
  { I: GripVertical, n: "grip-vertical" },
];

export function IconographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        lead="BIC uses lucide-react throughout — a single, consistent line-icon set. 24px viewBox, ~1.8 stroke, rounded caps and joins. Icons inherit currentColor, so they tint with whatever text color surrounds them."
      />
      <Section
        title="In use"
        description="A sample of the icons that appear across navigation, widgets and controls. The full set lives at lucide.dev."
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] grid grid-cols-3 sm:grid-cols-5 gap-y-6 gap-x-3">
          {ICONS.map(({ I, n }) => (
            <div key={n} className="flex flex-col items-center gap-2 text-fg-1">
              <I size={22} strokeWidth={1.8} />
              <span className="font-mono text-[9px] text-fg-2 text-center">{n}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
