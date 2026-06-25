import { useState, type ReactNode } from "react";
import { Check, Copy, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Standardized callout for places where the SHIPPED code diverges from the
 * intended design. Drop one wherever we refine the system and find a gap —
 * gives engineering a consistent, scannable to-do.
 */
export function EngineeringNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[var(--brand-sunrise)] bg-[var(--brand-mist)]/30 p-4">
      <Wrench size={16} className="mt-0.5 shrink-0 text-[var(--brand-sunset)]" />
      <div className="min-w-0">
        <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--brand-sunset)] mb-1">
          Engineering note
        </div>
        <div className="text-[13px] leading-relaxed text-fg-1">{children}</div>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="mb-12">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-2 mb-3">
        {eyebrow}
      </div>
      <h1 className="font-formula text-[40px] font-medium leading-[1.05] tracking-[-0.005em] text-fg-1 capitalize">
        {title}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-fg-2 max-w-2xl">{lead}</p>
    </header>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-14 scroll-mt-20">
      <h2 className="font-formula text-[22px] font-medium text-fg-1 mb-1.5 capitalize">
        {title}
      </h2>
      {description && (
        <p className="text-[13px] leading-relaxed text-fg-2 mb-5 max-w-2xl">
          {description}
        </p>
      )}
      {children}
    </section>
  );
}

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (value: string) => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return { copied, copy };
}

/** A color swatch card. Click anywhere to copy the token var. */
export function Swatch({
  name,
  hex,
  token,
  usage,
  dark,
}: {
  name: string;
  hex: string;
  token: string;
  usage?: string;
  /** Force light/dark label text; auto-detected if omitted */
  dark?: boolean;
}) {
  const { copied, copy } = useCopy();
  const isDark = dark ?? isColorDark(hex);
  return (
    <button
      type="button"
      onClick={() => copy(`var(${token})`)}
      className="group text-left rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] transition-shadow"
    >
      <div
        className="h-20 flex items-end justify-between p-3 border-b border-border"
        style={{ background: hex, boxShadow: "inset 0 0 0 1px rgba(63,71,47,0.08)" }}
      >
        <span
          className={cn(
            "font-formula text-[13px] font-medium",
            isDark ? "text-white/95" : "text-[#3f472f]",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity",
            isDark ? "text-white/80" : "text-[#3f472f]/70",
          )}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </span>
      </div>
      <div className="p-3">
        <div className="font-mono text-[11px] text-fg-1">{hex}</div>
        <div className="font-mono text-[10px] text-fg-2 mt-0.5">{token}</div>
        {usage && <div className="text-[11px] text-fg-2 mt-2 leading-snug">{usage}</div>}
      </div>
    </button>
  );
}

export function SwatchGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {children}
    </div>
  );
}

/** A labelled row used for semantic tokens. */
export function TokenRow({
  swatch,
  name,
  token,
  role,
}: {
  swatch: string;
  name: string;
  token: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
      <span
        className="w-10 h-10 rounded-lg border border-border shrink-0"
        style={{ background: swatch }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-fg-1">{name}</div>
        <div className="font-mono text-[11px] text-fg-2">{token}</div>
      </div>
      <div className="text-[12px] text-fg-2 text-right max-w-[50%]">{role}</div>
    </div>
  );
}

/** A semantic token whose value changes per level (primary / accent / ring). */
export function LevelTokenRow({
  name,
  token,
  role,
  levels,
}: {
  name: string;
  token: string;
  role: string;
  levels: { label: string; hex: string }[];
}) {
  return (
    <div className="py-4 border-b border-border last:border-0">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div>
          <div className="text-[13px] font-medium text-fg-1">{name}</div>
          <div className="font-mono text-[11px] text-fg-2">{token}</div>
        </div>
        <div className="text-[12px] text-fg-2 text-right">{role}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {levels.map((l) => (
          <div key={l.label} className="flex items-center gap-2.5">
            <span
              className="w-9 h-9 rounded-lg border border-border shrink-0"
              style={{
                background: l.hex,
                boxShadow: "inset 0 0 0 1px rgba(63,71,47,0.08)",
              }}
            />
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-fg-1 leading-tight">
                {l.label}
              </div>
              <div className="font-mono text-[10px] text-fg-2">{l.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A horizontal 5-step ramp for chart families. */
export function Ramp({ name, role, steps }: { name: string; role: string; steps: string[] }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-formula text-[13px] font-medium text-fg-1">{name}</span>
        <span className="text-[11px] text-fg-2">{role}</span>
      </div>
      <div className="flex gap-1.5 h-12">
        {steps.map((c, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg border border-border flex items-end p-1.5"
            style={{ background: c }}
          >
            <span
              className={cn(
                "font-mono text-[9px]",
                isColorDark(c) ? "text-white/70" : "text-[#3f472f]/55",
              )}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** One row of a ramp. `deprecated` overlays a diagonal stripe to mark the outgoing set. */
function RampRow({
  label,
  steps,
  deprecated,
}: {
  label: string;
  steps: string[];
  deprecated?: boolean;
}) {
  return (
    <div className="flex items-stretch gap-3 mb-2">
      <span className="w-8 shrink-0 self-center text-[10px] uppercase tracking-[0.06em] text-fg-3">
        {label}
      </span>
      <div className="flex-1 grid grid-cols-5 gap-2">
        {steps.map((c, i) => (
          <div
            key={i}
            className="h-14 rounded-lg border border-border flex items-end p-1.5 overflow-hidden"
            style={{
              background: deprecated
                ? `repeating-linear-gradient(45deg, rgba(63,71,47,0.32) 0 1.5px, transparent 1.5px 8px), ${c}`
                : c,
            }}
          >
            <span
              className="font-mono text-[9px]"
              style={{ color: isColorDark(c) ? "rgba(255,255,255,0.85)" : "rgba(63,71,47,0.7)" }}
            >
              {c.replace("#", "").toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** WCAG relative luminance + contrast ratio for hex colors. */
function relLuminance(hex: string): number {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const chan = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
}
function contrastRatio(a: string, b: string): number {
  const la = relLuminance(a);
  const lb = relLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
/** Pick black or white text for a background, with the resulting contrast ratio. */
function bestText(bg: string): { color: string; ratio: number } {
  const black = contrastRatio(bg, "#000000");
  const white = contrastRatio(bg, "#ffffff");
  return black >= white ? { color: "#000000", ratio: black } : { color: "#ffffff", ratio: white };
}

/** Readability row — best legible text color per swatch + its WCAG ratio. */
function ContrastRow({ steps }: { steps: string[] }) {
  return (
    <div className="flex items-stretch gap-3">
      <span className="w-8 shrink-0 self-center text-[10px] uppercase tracking-[0.06em] text-fg-3">
        text
      </span>
      <div className="flex-1 grid grid-cols-5 gap-2">
        {steps.map((c, i) => {
          const t = bestText(c);
          const sym = t.ratio >= 4.5 ? "✓" : t.ratio >= 3 ? "~" : "✕";
          return (
            <div
              key={i}
              className="h-14 rounded-lg border border-border flex flex-col items-center justify-center gap-0.5"
              style={{ background: c }}
            >
              <span style={{ color: t.color }} className="text-[15px] font-semibold leading-none">
                Aa
              </span>
              <span style={{ color: t.color }} className="font-mono text-[9px] opacity-80">
                {t.ratio.toFixed(1)} {sym}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Before/after comparison of a chart family — new (live) over the deprecated old set,
    plus a readability row showing the legible text color + WCAG ratio per step. */
export function RampCompare({
  name,
  role,
  oldSteps,
  newSteps,
}: {
  name: string;
  role: string;
  oldSteps: string[];
  newSteps: string[];
}) {
  return (
    <div className="mb-7">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-formula text-[14px] font-medium text-fg-1">{name}</span>
        <span className="text-[11px] text-fg-2">{role}</span>
      </div>
      <RampRow label="now" steps={oldSteps} deprecated />
      <RampRow label="new" steps={newSteps} />
      <ContrastRow steps={newSteps} />
    </div>
  );
}

/** Quick luminance check so swatch labels stay legible (handles hex only). */
function isColorDark(color: string): boolean {
  const m = color.replace("#", "");
  if (m.length !== 6 && m.length !== 3) return false;
  const full =
    m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.6;
}
