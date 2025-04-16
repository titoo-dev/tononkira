import { Skeleton } from "@/components/ui/skeleton";

/**
 * StatDisplaySkeleton - A loading placeholder for the StatsDisplay component
 * Maintains the same grid layout and visual structure as the actual stats display
 */
export function StatDisplaySkeleton() {
  return (
    <div
      className="grid grid-cols-3 gap-2 pt-8"
      aria-busy="true"
      aria-label="Loading stats"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-muted/50 flex items-center justify-center overflow-hidden rounded-lg p-3"
        >
          <Skeleton className="h-5 w-4/5 rounded" />
        </div>
      ))}
    </div>
  );
}
