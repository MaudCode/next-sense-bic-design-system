import { Send, Sparkles } from "lucide-react";
import {
  EngineeringNote,
  LevelTokenRow,
  PageHeader,
  RampCompare,
  Section,
  Swatch,
  SwatchGrid,
  TokenRow,
} from "@/components/docs";

const NEUTRALS = [
  { name: "Nimbus", hex: "#FAFAF2", token: "--brand-nimbus", usage: "Page & sidebar canvas" },
  { name: "Verdure", hex: "#3F472F", token: "--brand-verdure", usage: "Brand ink, primary text" },
  { name: "Vendure 80", hex: "#484F3C", token: "--brand-verdure-80", usage: "General-level focus ring; dark olive" },
  { name: "Vendure 60", hex: "#5C654D", token: "--brand-verdure-60", usage: "General-level primary (Configure, Onboarding)" },
  { name: "Vendure 40", hex: "#AFB2A4", token: "--brand-verdure-40", usage: "General-level secondary" },
];
const BLUES = [
  { name: "Haze", hex: "#E0F4FF", token: "--brand-haze", usage: "Building secondary, hover wash" },
  { name: "Sky", hex: "#A1D3F0", token: "--brand-sky", usage: "Building primary, comfort data" },
  { name: "Twilight", hex: "#7096AD", token: "--brand-twilight", usage: "Deep cool, chart step 4" },
];
const WARMS = [
  { name: "Mist", hex: "#FFCFC5", token: "--brand-mist", usage: "Portfolio secondary" },
  { name: "Sunrise", hex: "#FFAB9A", token: "--brand-sunrise", usage: "Portfolio primary / ring" },
  { name: "Sunset", hex: "#FF6847", token: "--brand-sunset", usage: "Strongest alert, destructive, heat" },
];
const SOLAR = [
  { name: "Digital Sun 4AM", hex: "#F5FDD3", token: "--assistant-accent", usage: "AI Assistant surface strip (light)" },
  { name: "Halo", hex: "#E5FB8C", token: "--brand-halo", usage: "Pale highlighter (Digital Sun 6AM)" },
  { name: "Digital Sun", hex: "#D9FF41", token: "--brand-digital-sun", usage: "Solar, positive deltas; AI Assistant primary" },
  { name: "Soil", hex: "#829246", token: "--brand-soil", usage: "Sustainability, chart step 3" },
];
const SPECIAL = [
  { name: "Highlight", hex: "#E4ABFF", token: "--brand-highlight", usage: "Lavender — emphasis pulls only (the AI Assistant uses Digital Sun)" },
];

const LEVEL_AWARE = [
  {
    name: "primary",
    token: "--primary",
    role: "Primary action / CTA",
    levels: [
      { label: "Portfolio", hex: "#FFAB9A" },
      { label: "Building", hex: "#A1D3F0" },
      { label: "General", hex: "#5C654D" },
    ],
  },
  {
    name: "secondary",
    token: "--secondary",
    role: "Lower-emphasis fill (lighter than primary, same family)",
    levels: [
      { label: "Portfolio", hex: "#FFCFC5" },
      { label: "Building", hex: "#E0F4FF" },
      { label: "General", hex: "#AFB2A4" },
    ],
  },
  {
    name: "accent",
    token: "--accent",
    role: "Hover / wash surfaces",
    levels: [
      { label: "Portfolio", hex: "#FFE8E3" },
      { label: "Building", hex: "#EEFAFF" },
      { label: "General", hex: "#D6D7CF" },
    ],
  },
  {
    name: "ring",
    token: "--ring",
    role: "Keyboard focus ring (focus-visible only — not shown on hover/click)",
    levels: [
      { label: "Portfolio", hex: "#FFAB9A" },
      { label: "Building", hex: "#A1D3F0" },
      { label: "General", hex: "#484F3C" },
    ],
  },
];

const CONSTANT = [
  { swatch: "#D63B30", name: "destructive", token: "--destructive", role: "Alerts, delete actions" },
  { swatch: "oklch(0.97 0 0)", name: "muted", token: "--muted", role: "Disabled & quiet surfaces" },
  { swatch: "oklch(0.922 0 0)", name: "border", token: "--border", role: "1px hairlines & inputs" },
];

const STATUS = [
  { name: "Success", token: "--success", pill: "Healthy", solid: "#4F9D5B", fill: "#E7F3E9", text: "#2E6A39", use: "Healthy · recovered · positive trend" },
  { name: "Warning", token: "--warning", pill: "Degraded", solid: "#E3A52B", fill: "#FAEFD3", text: "#855A12", use: "Partially degraded" },
  { name: "Error / Alert", token: "--destructive", pill: "Connection loss", solid: "#D63B30", fill: "#FBE1DD", text: "#8E2018", use: "Connection loss · failing · destructive" },
];

const LEVELS = [
  {
    key: "level-portfolio",
    name: "Portfolio",
    tone: "Warm / Salmon",
    primary: "var(--brand-sunrise)",
    accent: "var(--brand-mist)",
    note: "Cross-building views. Primary = Sunrise, secondary = Mist.",
  },
  {
    key: "level-building",
    name: "Building",
    tone: "Blue",
    primary: "var(--brand-sky)",
    accent: "var(--brand-haze)",
    note: "A single building in focus. Primary = Sky, secondary = Haze.",
  },
  {
    key: "level-general",
    name: "General",
    tone: "Olive-grey",
    primary: "var(--brand-verdure-60)",
    accent: "var(--brand-verdure-40)",
    note: "Not building-scoped (Configure, Onboarding). Primary = Vendure 60, secondary = Vendure 40.",
  },
];

const RAMPS = [
  {
    name: "Blue",
    role: "cool / comfort / efficiency",
    old: ["#E3EEF6", "#CFE3F2", "#A1D3F0", "#7096AD", "#5E7E94"],
    new: ["#D2E7F4", "#A1D3F0", "#74AFD0", "#4E86AE", "#305C7C"],
  },
  {
    name: "Red",
    role: "energy / heat / alerts",
    old: ["#FFCFC5", "#FFAB9A", "#FF6847", "#D23E2A", "#A82A1C"],
    new: ["#FCD4C8", "#FBA993", "#FF6847", "#D6452C", "#A1301C"],
  },
  {
    name: "Yellow",
    role: "solar / sustainability",
    old: ["#D9FF41", "#E5FB8C", "#829246", "#9C9A3D", "#7E7B28"],
    new: ["#ECF6A6", "#CBE05E", "#A6C13F", "#829246", "#5E6B2A"],
  },
];

export function ColorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Colors"
        lead="The BIC palette is a warm, paper-and-olive base lifted by three expressive accent families — blues for comfort, warms for energy, solars for sustainability. Click any swatch to copy its token."
      />

      <Section
        title="Neutrals"
        description="The quiet base. Nimbus is every page and sidebar; Verdure is the ink behind all text and the brand mark."
      >
        <SwatchGrid>
          {NEUTRALS.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </SwatchGrid>
      </Section>

      <Section
        title="Blues — comfort & efficiency"
        description="Cool family. Used for temperature, comfort metrics, and the Building level."
      >
        <SwatchGrid>
          {BLUES.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </SwatchGrid>
      </Section>

      <Section
        title="Warms — energy, heat & alerts"
        description="Used for energy loads, heat data, destructive actions, and the Portfolio level. Sunset is the strongest alert."
      >
        <SwatchGrid>
          {WARMS.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </SwatchGrid>
      </Section>

      <Section
        title="Solar — sustainability & growth"
        description="Greens and yellows for solar generation, sustainability metrics, and positive deltas."
      >
        <SwatchGrid>
          {SOLAR.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </SwatchGrid>
      </Section>

      <Section
        title="Highlight"
        description="One lavender accent, used sparingly — reserved for AI surfaces and emphasis pulls. Never a family."
      >
        <SwatchGrid>
          {SPECIAL.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </SwatchGrid>
      </Section>

      <Section
        title="Semantic tokens"
        description="The shadcn-facing layer. Components only ever reference these — never raw brand hexes — so re-tinting one token cascades everywhere."
      >
        <h3 className="font-formula text-[15px] font-medium text-fg-1 mb-1 capitalize">
          Level-aware
        </h3>
        <p className="text-[12px] text-fg-2 mb-3 max-w-2xl">
          These three change with the active level — Portfolio (warm), Building
          (blue), General (olive). This is the core mechanism: one attribute on{" "}
          <span className="font-mono">&lt;html&gt;</span> re-tints them and every
          button, ring and active state follows.
        </p>
        <div className="rounded-xl border border-border bg-card px-5 shadow-[var(--shadow-xs)] mb-7">
          {LEVEL_AWARE.map((t) => (
            <LevelTokenRow key={t.token} {...t} />
          ))}
        </div>

        <h3 className="font-formula text-[15px] font-medium text-fg-1 mb-1 capitalize">
          Constant across levels
        </h3>
        <p className="text-[12px] text-fg-2 mb-3 max-w-2xl">
          The same in every context — they carry fixed meaning regardless of level.
        </p>
        <div className="rounded-xl border border-border bg-card px-5 shadow-[var(--shadow-xs)]">
          {CONSTANT.map((t) => (
            <TokenRow key={t.token} {...t} />
          ))}
        </div>
      </Section>

      <Section
        title="Status / Semantic"
        description="Success, warning and alert — for health, connection status, trends and destructive actions. Each role has a solid (dots, bars, donuts), a soft fill (pill backgrounds) and a text color. These are level-agnostic: meaning trumps context."
      >
        <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-[var(--shadow-xs)]">
          {STATUS.map((s) => (
            <div key={s.name} className="flex items-center gap-4 px-5 py-4">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: s.solid }} />
              <span
                className="rounded-full px-2.5 py-0.5 text-[12px] font-medium shrink-0"
                style={{ background: s.fill, color: s.text }}
              >
                {s.pill}
              </span>
              <div className="flex-1 h-2 rounded-full overflow-hidden min-w-12" style={{ background: s.fill }}>
                <div className="h-full rounded-full" style={{ width: "68%", background: s.solid }} />
              </div>
              <div className="text-right shrink-0 w-44">
                <div className="text-[12px] font-medium text-fg-1">{s.name}</div>
                <div className="font-mono text-[10px] text-fg-2">
                  {s.solid} · {s.fill} · {s.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-fg-2 mt-3">
          Connection Health severity maps onto these: Healthy → Success, Partially
          degraded → Warning, Highly degraded → Sunset (heat-orange), Connection loss →
          Error. Sunset <span className="font-mono">#FF6847</span> stays for heat/energy
          data; the alert is now a truer red.
        </p>
        <div className="mt-4">
          <EngineeringNote>
            <p className="mb-2">
              Status colors are currently raw Tailwind (<span className="font-mono">green-500</span>,{" "}
              <span className="font-mono">red-500</span>, <span className="font-mono">orange-500</span>,{" "}
              <span className="font-mono">#16a34a</span>…) across the connection-health
              components. Define these tokens in <span className="font-mono">index.css</span> and
              swap the raw classes over:
            </p>
            <ul className="font-mono text-[12px] space-y-0.5">
              <li>--success #4F9D5B · --success-muted #E7F3E9 · -foreground #2E6A39</li>
              <li>--warning #E3A52B · --warning-muted #FAEFD3 · -foreground #855A12</li>
              <li>--destructive #D63B30 (retune from orange) · -muted #FBE1DD · #8E2018</li>
            </ul>
          </EngineeringNote>
        </div>
      </Section>

      <Section
        title="Levels"
        description="The platform shifts accent color by context. Toggling a single data attribute re-tints --primary, --accent and --ring, so every button, ring and active state follows automatically. This is the core consistency mechanism of BIC."
      >
        <div className="grid sm:grid-cols-3 gap-3">
          {LEVELS.map((lvl) => (
            <div
              key={lvl.key}
              className={`${lvl.key} rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-xs)]`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-5 h-5 rounded-md border border-border"
                  style={{ background: lvl.primary }}
                />
                <span
                  className="w-5 h-5 rounded-md border border-border"
                  style={{ background: lvl.accent }}
                />
              </div>
              <div className="font-formula text-[16px] font-medium text-fg-1">
                {lvl.name}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-fg-2 mb-2">
                {lvl.tone}
              </div>
              <p className="text-[12px] leading-snug text-fg-2 mb-4">{lvl.note}</p>
              <button className="w-full rounded-lg bg-primary text-primary-foreground text-[13px] font-medium py-2 outline-none transition-colors hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50">
                Primary action
              </button>
              <p className="text-[10px] text-fg-3 mt-2 text-center">
                Tab to it to see the focus ring
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <EngineeringNote>
            <p className="mb-2">
              Intended level palette below — the product currently ships pale
              primaries (Mist/Haze) and a fixed-blue secondary, so update{" "}
              <span className="font-mono">--primary</span> and make{" "}
              <span className="font-mono">--secondary</span> level-aware:
            </p>
            <ul className="font-mono text-[12px] space-y-0.5">
              <li>Portfolio — primary #FFAB9A (Sunrise) · secondary #FFCFC5 (Mist)</li>
              <li>Building — primary #A1D3F0 (Sky) · secondary #E0F4FF (Haze)</li>
              <li>General — primary #5C654D (Vendure 60) · secondary #AFB2A4 (Vendure 40)</li>
            </ul>
            <p className="mt-2">
              Sidebar active-state washes stay light (unchanged); only the button
              fills get the stronger primary.
            </p>
          </EngineeringNote>
        </div>
      </Section>

      <Section
        title="AI Assistant"
        description="The Building AI Assistant is its own surface — not a navigation level. It carries the Digital Sun accent so it always reads as distinct from the data views around it. Inside the chat panel --primary becomes Digital Sun; the header & footer strips use the pale Digital Sun 4AM."
      >
        <div className="context-assistant rounded-xl border border-border overflow-hidden shadow-[var(--shadow-xs)] max-w-md">
          <div
            className="flex items-center gap-2.5 px-4 py-3"
            style={{ background: "var(--assistant-accent)" }}
          >
            <span className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Sparkles size={15} style={{ color: "var(--foreground)" }} />
            </span>
            <span className="font-formula text-[14px] font-medium text-fg-1">
              Building AI Assistant
            </span>
          </div>
          <div className="bg-card p-4 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {["Energy overview", "Comfort analysis", "Occupancy trends"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-primary px-3 py-1 text-[12px] text-fg-1"
                  style={{ background: "var(--assistant-accent)" }}
                >
                  {s}
                </span>
              ))}
            </div>
            <button className="self-end w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Send size={16} style={{ color: "var(--foreground)" }} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          <Swatch name="Digital Sun" hex="#D9FF41" token="--brand-digital-sun" usage="Send button, pill borders (assistant --primary)" />
          <Swatch name="Digital Sun 4AM" hex="#F5FDD3" token="--assistant-accent" usage="Header & footer strips" />
        </div>
        <p className="text-[12px] text-fg-2 mt-3">
          The focus ring inside the chat is deliberately neutral grey, not Digital Sun
          — so the input doesn’t glow yellow on focus.
        </p>
      </Section>

      <Section
        title="Chart ramps"
        description="Three 5-step families for data viz. Every chart in the product reads from these — so reworking the tokens here improves all of them at once. Per family: the deprecated set (striped) over the new live ramp, then a readability row showing the legible label color (black/white) and its WCAG contrast ratio — ✓ ≥4.5 (text), ~ ≥3 (large text/UI), ✕ below."
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)]">
          {RAMPS.map((r) => (
            <RampCompare key={r.name} name={r.name} role={r.role} oldSteps={r.old} newSteps={r.new} />
          ))}
        </div>
        <div className="mt-4">
          <EngineeringNote>
            <p className="mb-2">
              Swap these 15 <span className="font-mono">--chart-*</span> values in{" "}
              <span className="font-mono">index.css</span> — every chart reads them, so
              no per-chart changes are needed:
            </p>
            <ul className="font-mono text-[12px] space-y-0.5">
              <li>blue 1–5: #D2E7F4 · #A1D3F0 · #74AFD0 · #4E86AE · #305C7C</li>
              <li>red 1–5: #FCD4C8 · #FBA993 · #FF6847 · #D6452C · #A1301C</li>
              <li>yellow 1–5: #ECF6A6 · #CBE05E · #A6C13F · #829246 · #5E6B2A</li>
            </ul>
          </EngineeringNote>
        </div>
      </Section>
    </>
  );
}
