import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface AdminKpiCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  href?: string;
  accent?: "primary" | "secondary" | "warning";
}

const accentStyles: Record<NonNullable<AdminKpiCardProps["accent"]>, { icon: string; bg: string }> = {
  primary: { icon: "text-brand-primary", bg: "bg-brand-primary/10" },
  secondary: { icon: "text-brand-secondary-dark", bg: "bg-brand-secondary/15" },
  warning: { icon: "text-amber-700", bg: "bg-amber-100" },
};

export default function AdminKpiCard({ icon: Icon, label, value, href, accent = "primary" }: AdminKpiCardProps) {
  const styles = accentStyles[accent];
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

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
        </div>
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", styles.bg, styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {href && (
        <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-primary">
          Kelola <ArrowUpRight className="h-3 w-3" />
        </div>
      )}
    </Wrapper>
  );
}
