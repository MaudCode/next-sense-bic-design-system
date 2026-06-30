import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--brand-nimbus)]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-14 md:py-14">
          {children}
        </div>
      </main>
    </div>
  );
}
