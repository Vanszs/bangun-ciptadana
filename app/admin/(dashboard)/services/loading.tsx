import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-2 pb-5 border-b border-brand-border">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-10 w-44 rounded-md" />
      <div className="rounded-lg border border-brand-border bg-white overflow-hidden">
        <div className="p-4 space-y-3">
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
