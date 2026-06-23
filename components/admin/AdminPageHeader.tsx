import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  actions?: React.ReactNode;
}

export default function AdminPageHeader({ title, description, backHref, actions }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-5 border-b border-brand-border">
      <div className="min-w-0">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-xs text-brand-muted hover:text-brand-primary mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali
          </Link>
        )}
        <h1 className="text-2xl font-bold text-brand-text tracking-tight">{title}</h1>
        {description && <p className="text-sm text-brand-muted mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className={cn("flex items-center gap-2 flex-wrap")}>{actions}</div>}
    </div>
  );
}
