import { Skeleton } from "./ui/skeleton";

// filepath: c:/Users/PC/dev/tononkira/components/lyrics-list-skeleton.tsx

/**
 * Skeleton loader component for the Lyrics List section
 * Displays placeholder UI while the actual content is loading
 * Mimics the grid layout of the LyricsTabContent component
 */
export function LyricsListSkeleton() {
  // Create an array of 8 items for the skeleton cards, matching the length in LyricsTabContent
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="space-y-4">
      {/* Skeleton for tab navigation */}
      <div className="mb-6 flex items-center space-x-2 border-b">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-10 w-24 rounded-md" />
        ))}
      </div>

      {/* Grid layout matching the LyricsTabContent component */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skeletonItems.map((item) => (
          <div
            key={item}
            className="bg-muted/50 flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200"
          >
            {/* Header with icon and title */}
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Progress bar section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>

            {/* Button placeholder */}
            <div className="mt-5 flex justify-end">
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
