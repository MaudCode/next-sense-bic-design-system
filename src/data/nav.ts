import { BookOpen, Shapes, Component, PanelTop, type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  status?: "ready" | "soon";
}
export interface NavGroup {
  title: string;
  icon: LucideIcon;
  /** Open by default in the sidebar */
  defaultOpen?: boolean;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    title: "Getting started",
    icon: BookOpen,
    items: [{ title: "Introduction", path: "/", status: "ready" }],
  },
  {
    title: "Foundations",
    icon: Shapes,
    defaultOpen: true,
    items: [
      { title: "Colors", path: "/colors", status: "ready" },
      { title: "Typography", path: "/typography", status: "ready" },
      { title: "Spacing", path: "/spacing", status: "ready" },
      { title: "Radii", path: "/radii", status: "ready" },
      { title: "Shadows", path: "/shadows", status: "ready" },
      { title: "Iconography", path: "/iconography", status: "ready" },
    ],
  },
  {
    title: "Components",
    icon: Component,
    defaultOpen: true,
    items: [
      { title: "Button", path: "/components/button", status: "ready" },
      { title: "Badge", path: "/components/badge", status: "ready" },
      { title: "Input & Controls", path: "/components/input", status: "ready" },
      { title: "Card", path: "/components/card", status: "ready" },
      { title: "Table", path: "/components/table", status: "ready" },
      { title: "Tabs", path: "/components/tabs", status: "ready" },
    ],
  },
  {
    title: "Patterns",
    icon: PanelTop,
    items: [{ title: "Filter Bar", path: "/patterns/filter-bar", status: "ready" }],
  },
];
