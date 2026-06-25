"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (t: Omit<ToastItem, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.use(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const iconMap: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
  error: <XCircle className="h-5 w-5 text-red-600" aria-hidden="true" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />,
  info: <Info className="h-5 w-5 text-brand-primary" aria-hidden="true" />,
};

const bgMap: Record<ToastVariant, string> = {
  success: "bg-emerald-50/70",
  error: "bg-red-50/70",
  warning: "bg-amber-50/70",
  info: "bg-brand-primary/5",
};

let counter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((t: Omit<ToastItem, "id">) => {
    const id = `toast-${++counter}`;
    setItems((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 4000);
  }, []);

  const dismiss = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const value = React.useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext value={value}>
      {children}
      <output aria-live="polite" className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)]">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-md bg-white shadow-md border border-brand-border p-4 flex items-start gap-3 overflow-hidden",
              bgMap[item.variant],
            )}
          >
            <div className="shrink-0 mt-0.5 rounded-full bg-white p-0.5 shadow-sm">{iconMap[item.variant]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-text">{item.title}</p>
              {item.description && <p className="text-xs text-brand-muted mt-0.5">{item.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              className="text-brand-muted hover:text-brand-text"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </output>
    </ToastContext>
  );
}
