import type { ReactNode } from "react";

// New chart ramps (see Colors › Chart ramps)
export const BLUE = ["#D2E7F4", "#A1D3F0", "#74AFD0", "#4E86AE", "#305C7C"];
export const RED = ["#FCD4C8", "#FBA993", "#FF6847", "#D6452C", "#A1301C"];
export const YELLOW = ["#ECF6A6", "#CBE05E", "#A6C13F", "#829246", "#5E6B2A"];
export const INK = "#3F472F"; // Verdure — all labels & numbers
export const GRID = "#E6E3CF";

export function ChartCard({
  title,
  sub,
  children,
  className = "",
}: {
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] ${className}`}>
      <div className="font-formula text-[15px] font-medium text-fg-1 leading-none">{title}</div>
      {sub && <div className="text-[11px] text-fg-2 mt-1.5">{sub}</div>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Inline chip legend — swatch + label. For line/area where there's no single value. */
export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
      {items.map((i) => (
        <span key={i.label} className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: INK }}>
          <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

/** List legend — dot + label, value right-aligned. The donut/comfort legend pattern. */
export function ListLegend({ items }: { items: { label: string; color: string; value: string; muted?: boolean }[] }) {
  return (
    <div className="w-full min-w-44">
      {items.map((i) => (
        <div key={i.label} className={`flex items-center gap-2 py-1 text-[12px] ${i.muted ? "opacity-45" : ""}`}>
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: i.color }} />
          <span className="text-fg-1 truncate">{i.label}</span>
          <span className="ml-auto font-mono text-fg-1 font-medium tabular-nums">{i.value}</span>
        </div>
      ))}
    </div>
  );
}

export function Donut({
  slices,
  total,
  unit,
  centerLabel = "Total",
  size = 168,
}: {
  slices: { value: number; color: string }[];
  total: string;
  unit: string;
  centerLabel?: string;
  size?: number;
}) {
  const rw = size * 0.17, R = size / 2, r = R - rw, cx = R, cy = R;
  const sum = slices.reduce((s, x) => s + x.value, 0);
  const GAP = 0.02;
  let acc = -Math.PI / 2;
  const arcs = slices.map((s) => {
    const ang = (s.value / sum) * Math.PI * 2;
    const a0 = acc + GAP / 2, a1 = acc + ang - GAP / 2;
    acc += ang;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const p = (rad: number, ang2: number) => [cx + rad * Math.cos(ang2), cy + rad * Math.sin(ang2)];
    const [x0, y0] = p(R, a0), [x1, y1] = p(R, a1), [xr0, yr0] = p(r, a1), [xr1, yr1] = p(r, a0);
    return { d: `M${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1} L${xr0} ${yr0} A${r} ${r} 0 ${large} 0 ${xr1} ${yr1} Z`, color: s.color };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} />)}
      <text x={cx} y={cy - 1} textAnchor="middle" fontSize={size * 0.18} fontWeight="500" fill={INK} fontFamily="var(--font-formula)">
        {total}
        {unit === "%" ? "%" : <tspan fontSize={size * 0.1} fill="#929083"> {unit}</tspan>}
      </text>
      <text x={cx} y={cy + size * 0.13} textAnchor="middle" fontSize="10" fill="#929083" fontFamily="var(--font-sans)">{centerLabel}</text>
    </svg>
  );
}

// Bar with only the top corners rounded (radius-sm) — sits flat on the axis.
export function topRoundedPath(x: number, y: number, w: number, h: number, r = 3) {
  const rr = Math.min(r, h, w / 2);
  return `M${x},${y + h} L${x},${y + rr} Q${x},${y} ${x + rr},${y} L${x + w - rr},${y} Q${x + w},${y} ${x + w},${y + rr} L${x + w},${y + h} Z`;
}
