import { Skeleton } from "@/components/ui/skeleton";

export default function MessagesLoading() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-2 pb-5 border-b border-brand-border">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4">
        <Skeleton className="h-[640px] rounded-lg" />
        <Skeleton className="h-[640px] rounded-lg" />
      </div>
    </div>
  );
}
