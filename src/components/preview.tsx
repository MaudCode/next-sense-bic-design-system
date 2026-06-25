import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Live example surface — a bordered, padded canvas that renders real components. */
export function Preview({
  children,
  className,
  center = true,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-t-xl border border-border bg-card p-8 shadow-[var(--shadow-xs)]",
        center && "flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Code snippet block. Pairs under a <Preview> (shares the bottom corners). */
export function CodeBlock({ code, standalone = false }: { code: string; standalone?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div
      className={cn(
        "relative border border-border bg-[#2b3022] overflow-hidden",
        standalone ? "rounded-xl" : "rounded-b-xl border-t-0",
      )}
    >
      <button
        type="button"
        onClick={copy}
        className="absolute right-2.5 top-2.5 text-white/50 hover:text-white/90 transition-colors"
        aria-label="Copy code"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12px] leading-relaxed text-[#e8ead9]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** A Preview + CodeBlock pair. Pass `level` to render the demo in a level context. */
export function Example({
  children,
  code,
  level,
}: {
  children: ReactNode;
  code: string;
  level?: "portfolio" | "building" | "general";
}) {
  return (
    <div className="mb-6">
      <Preview className={level ? `level-${level}` : undefined}>{children}</Preview>
      <CodeBlock code={code} />
    </div>
  );
}

const LEVELS = [
  { name: "Portfolio", cls: "level-portfolio" },
  { name: "Building", cls: "level-building" },
  { name: "General", cls: "level-general" },
];

/**
 * Shows the same example three times — once per level — so the --primary /
 * --accent / --ring re-tint is explicit. Use on level-dependent sections.
 */
export function LevelTriple({ children }: { children: ReactNode }) {
  return (
    <div className="grid sm:grid-cols-3 gap-3 mb-6">
      {LEVELS.map((lvl) => (
        <div
          key={lvl.cls}
          className={cn(
            lvl.cls,
            "rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-xs)] flex flex-col items-center gap-4",
          )}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-fg-2">
            {lvl.name}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {children}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Stacks the SAME content once per level (Portfolio / Building / General) as
 * full-width rows — so you see the whole component re-tint in context, and
 * which parts stay constant. Preferred over a single base-palette preview for
 * anything that touches --primary / --accent / --ring.
 */
export function LevelStack({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden shadow-[var(--shadow-xs)]">
      {LEVELS.map((lvl, i) => (
        <div
          key={lvl.cls}
          className={cn(
            lvl.cls,
            "bg-card flex items-center gap-5 px-5 py-5",
            i > 0 && "border-t border-border",
          )}
        >
          <span className="w-16 shrink-0 text-[10px] font-medium uppercase tracking-[0.08em] text-fg-2">
            {lvl.name}
          </span>
          <div className="flex flex-wrap items-center gap-2.5">{children}</div>
        </div>
      ))}
    </div>
  );
}

/** Inline indicators for whether something is actually used in the product. */
export function Used() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-fg-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#3F5A1F]" />
      Used
    </span>
  );
}
export function NotUsed() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-fg-2">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-3)]" />
      Not used
    </span>
  );
}

/** Reference table for variants / sizes / props. */
export function RefTable({
  head,
  rows,
}: {
  head: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-xs)]">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 font-medium text-[12px] text-fg-2 border-b border-border bg-[rgba(250,250,242,0.6)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 py-2.5 border-b border-border last:border-0 text-fg-1 align-middle",
                    j === 0 && "font-mono text-[12px]",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
