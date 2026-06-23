import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-2 pb-5 border-b border-brand-border">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-brand-border bg-white p-5 space-y-3">
              <Skeleton className="h-5 w-40" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((__, j) => (
                  <div key={j} className="space-y-1.5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-80 rounded-lg" />
      </div>
    </div>
  );
}
