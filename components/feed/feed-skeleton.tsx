import { Skeleton } from "@/components/ui/skeleton";

export function FeedSkeleton() {
  return (
    <div className="grid news-grid gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[30px] border border-border/70 bg-card/70 p-0">
          <Skeleton className="aspect-[1.45/1] w-full rounded-none" />
          <div className="space-y-4 p-5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
