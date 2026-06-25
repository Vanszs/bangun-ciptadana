"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TableElProps = React.HTMLAttributes<HTMLTableElement> & { ref?: React.Ref<HTMLTableElement> };
type SectionElProps = React.HTMLAttributes<HTMLTableSectionElement> & { ref?: React.Ref<HTMLTableSectionElement> };
type RowElProps = React.HTMLAttributes<HTMLTableRowElement> & { ref?: React.Ref<HTMLTableRowElement> };
type CellElProps = React.TdHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> };
type ThElProps = React.ThHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> };

function Table({ className, ref, ...props }: TableElProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ref, ...props }: SectionElProps) {
  return <thead ref={ref} className={cn("[&_tr]:border-b border-brand-border bg-slate-50/70", className)} {...props} />;
}

function TableBody({ className, ref, ...props }: SectionElProps) {
  return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ref, ...props }: RowElProps) {
  return <tr ref={ref} className={cn("border-b border-brand-border transition-colors even:bg-slate-50/40 hover:bg-slate-100/60 data-[state=selected]:bg-slate-100", className)} {...props} />;
}

function TableHead({ className, ref, ...props }: ThElProps) {
  return <th ref={ref} className={cn("h-10 px-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-brand-muted bg-slate-50/70 sticky top-0 z-10", className)} {...props} />;
}

function TableCell({ className, ref, ...props }: CellElProps) {
  return <td ref={ref} className={cn("p-4 align-middle text-sm text-brand-text", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
