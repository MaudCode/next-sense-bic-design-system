import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { NAV } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Sidebar({
  mobileOpen = false,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
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
    <>
      {/* Backdrop — mobile only, when the drawer is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "level-general fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border bg-[var(--brand-nimbus)] transition-transform duration-200",
          "md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand — logo top-left with a generous gap before the nav (like BIC) */}
        <div className="px-5 pt-7 pb-8">
          <img
            src={`${import.meta.env.BASE_URL}assets/logo-full.svg`}
            alt="Next Sense"
            className="h-6 w-auto"
          />
        </div>

        {/* Section label — matches BIC's "Platform" group label */}
        <div className="px-5 pb-2 text-[12px] font-medium text-fg-2">
          Design System
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5">
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
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            "flex h-7 items-center justify-between rounded-md px-2.5 font-sans text-[14px] transition-colors",
                            isActive
                              ? "bg-[var(--brand-verdure-80)] text-white font-medium"
                              : "text-fg-2 font-normal hover:bg-accent hover:text-accent-foreground",
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
    </>
  );
}
