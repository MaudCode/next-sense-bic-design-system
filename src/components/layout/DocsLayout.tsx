import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function DocsLayout({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--brand-nimbus)]">
      <Sidebar mobileOpen={navOpen} onClose={() => setNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar — hamburger + logo (hidden on desktop) */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-[var(--brand-nimbus)] px-4 md:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            className="grid size-9 place-items-center rounded-md text-fg-1 hover:bg-accent"
          >
            <Menu size={20} />
          </button>
          <img
            src={`${import.meta.env.BASE_URL}assets/logo-full.svg`}
            alt="Next Sense"
            className="h-5 w-auto"
          />
        </header>

        <main className="min-w-0 flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-8 md:px-14 md:py-14">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
