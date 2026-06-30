import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { NAV } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { pathname } = useLocation();

  // A group starts open if it's flagged defaultOpen or contains the active route.
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      NAV.map((g) => [
        g.title,
        Boolean(g.defaultOpen) || g.items.some((i) => i.path === pathname),
      ]),
    ),
  );

  const toggle = (title: string) =>
    setOpen((s) => ({ ...s, [title]: !s[title] }));

  return (
    <aside className="level-general hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-[var(--brand-nimbus)] h-screen sticky top-0">
      {/* Brand */}
      <div className="px-5 pt-5 pb-4">
        <img
          src={`${import.meta.env.BASE_URL}assets/logo-full.svg`}
          alt="Next Sense"
          className="h-5 w-auto"
        />
        <div className="mt-1.5 text-[11px] text-fg-2">Design System</div>
      </div>

      {/* Section label — matches BIC's "Platform" group label */}
      <div className="px-5 pb-1 text-[12px] font-medium text-fg-2">
        Reference
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {NAV.map((group) => {
          const Icon = group.icon;
          const isOpen = open[group.title];
          return (
            <div key={group.title}>
              <button
                type="button"
                onClick={() => toggle(group.title)}
                className="w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left"
              >
                <Icon size={17} className="text-fg-2 shrink-0" strokeWidth={1.8} />
                <span className="font-formula text-[15px] font-medium text-fg-1">
                  {group.title}
                </span>
                <ChevronRight
                  size={14}
                  className={cn(
                    "ml-auto text-fg-3 transition-transform duration-150",
                    isOpen && "rotate-90",
                  )}
                />
              </button>

              {isOpen && (
                <div className="ml-[18px] my-0.5 border-l border-border pl-2.5 space-y-0.5">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex h-7 items-center justify-between rounded-md px-2.5 font-sans text-[14px] transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-fg-2 font-normal hover:bg-accent/60 hover:text-accent-foreground",
                        )
                      }
                    >
                      <span className="truncate">{item.title}</span>
                      {item.status === "soon" && (
                        <span className="ml-2 shrink-0 text-[9px] uppercase tracking-wide text-fg-3 border border-border rounded px-1 py-px">
                          soon
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
