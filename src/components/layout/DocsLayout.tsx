import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--brand-nimbus)]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
