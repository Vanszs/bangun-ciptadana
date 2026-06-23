import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-2 pb-5 border-b border-brand-border">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <Skeleton className="h-10 flex-1 max-w-md rounded-md" />
        <Skeleton className="h-10 w-44 rounded-md" />
      </div>
      <div className="rounded-lg border border-brand-border bg-white overflow-hidden">
        <div className="p-4 space-y-3">
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
