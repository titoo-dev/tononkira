import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";

/**
 * Skeleton loader component for the Featured Lyrics section
 * Displays placeholder UI while the actual content is loading
 */
export function FeaturedLyricsSkeleton() {
  // Create an array of 5 items for the skeleton cards
  const skeletonItems = Array.from({ length: 5 }, (_, i) => i);

  return (
    <section className="py-16">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-9 w-60" />
        <Button variant="ghost" className="invisible text-sm" asChild>
          <Link href="/lyrics">View all</Link>
        </Button>
      </div>

      <div className="relative -mx-4 px-4">
        <div className="overflow-hidden pb-6">
          <div className="flex space-x-6">
            {skeletonItems.map((item) => (
              <div
                key={item}
                className="bg-muted/50 flex min-w-[280px] flex-col rounded-xl border p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <div className="mt-4 flex justify-end">
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent"></div>
      </div>
    </section>
  );
}
