"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning";
  uppercase?: boolean;
};

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-brand-primary/10 text-brand-primary-dark",
  secondary: "bg-brand-secondary/10 text-brand-secondary-dark",
  outline: "border border-brand-border text-brand-text bg-white",
  destructive: "bg-red-50 text-red-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
};

export function Badge({ className, variant = "default", uppercase = true, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        uppercase && "uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
