import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section } from "@/components/docs";

export function HomePage() {
  return (
    <>
      <PageHeader
        eyebrow="BIC Design System"
        title="One language for the Building Intelligence Center"
        lead="A living reference for the colors, type, and components behind BIC — built on the same tokens that ship in the product, so the docs never drift from what users actually see."
      />

      <Section title="Start with the foundations">
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            to="/colors"
            className="group rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] transition-shadow"
          >
            <div className="flex gap-1.5 mb-4">
              {["#3F472F", "#A1D3F0", "#FFAB9A", "#D9FF41"].map((c) => (
                <span key={c} className="w-6 h-6 rounded-md" style={{ background: c }} />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-formula text-[17px] font-medium text-fg-1">Colors</span>
              <ArrowRight size={16} className="text-fg-2 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[12px] text-fg-2 mt-1">
              Brand palette, semantic tokens, the three levels, and chart ramps.
            </p>
          </Link>

          <div className="rounded-xl border border-dashed border-border bg-card/50 p-5">
            <div className="font-formula text-[17px] font-medium text-fg-2">
              Typography, Spacing & more
            </div>
            <p className="text-[12px] text-fg-2 mt-1">
              Coming next — we’re building section by section, foundations first.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="How this is built"
        description="The site is a standalone Vite + React + Tailwind + shadcn app — the same stack as BIC. Tokens are ported from the product's index.css, so updating a color upstream updates it here too."
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] text-[13px] text-fg-2 leading-relaxed">
          Every component references <span className="font-mono text-fg-1">semantic tokens</span>{" "}
          (<span className="font-mono text-fg-1">--primary</span>,{" "}
          <span className="font-mono text-fg-1">--accent</span>…) rather than raw brand hexes. That
          single indirection is what lets the platform re-tint itself per level — Portfolio (warm),
          Building (blue), General (olive) — without touching a single component.
        </div>
      </Section>
    </>
  );
}
