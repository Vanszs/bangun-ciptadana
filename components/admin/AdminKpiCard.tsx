import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowUp, ArrowDown, Minus, type LucideIcon } from "lucide-react";

interface AdminKpiCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  href?: string;
  accent?: "primary" | "secondary" | "success" | "danger";
  delta?: string;
  trend?: "up" | "down" | "flat";
}

const accentStyles: Record<NonNullable<AdminKpiCardProps["accent"]>, { icon: string; bg: string }> = {
  primary: { icon: "text-brand-primary", bg: "bg-brand-primary/10" },
  secondary: { icon: "text-brand-secondary-dark", bg: "bg-brand-secondary/15" },
  success: { icon: "text-emerald-700", bg: "bg-emerald-100" },
  danger: { icon: "text-red-700", bg: "bg-red-100" },
};

const trendStyles: Record<NonNullable<AdminKpiCardProps["trend"]>, { icon: typeof ArrowUp; color: string }> = {
  up: { icon: ArrowUp, color: "text-emerald-700" },
  down: { icon: ArrowDown, color: "text-red-700" },
  flat: { icon: Minus, color: "text-brand-muted" },
};

export default function AdminKpiCard({ icon: Icon, label, value, href, accent = "primary", delta, trend }: AdminKpiCardProps) {
  const styles = accentStyles[accent];
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};
  const showDelta = !!delta;
  const TrendIcon = trend ? trendStyles[trend].icon : null;

  return (
    <Wrapper
      {...(wrapperProps as { href: string })}
      className={cn(
        "block rounded-lg border border-brand-border bg-white p-5 transition-colors",
        href && "hover:border-brand-primary/40 hover:shadow-sm",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-brand-muted">{label}</p>
          <p className="text-2xl font-bold text-brand-text mt-1.5 tracking-tight">{value}</p>
          {showDelta && (
            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold">
              {TrendIcon && <TrendIcon className={cn("h-3 w-3", trendStyles[trend!].color)} aria-hidden="true" />}
              <span className={trend ? trendStyles[trend].color : "text-brand-muted"}>{delta}</span>
              <span className="text-brand-muted font-normal">vs periode lalu</span>
            </p>
          )}
        </div>
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", styles.bg, styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {href && (
        <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-primary">
          Kelola <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </div>
      )}
    </Wrapper>
  );
}
