import { Suspense } from "react";
import { TabsContent } from "./ui/tabs";
import { LyricsListSkeleton } from "./lyrics-list-skeleton";
import { LyricCard } from "./lyric-card";
import { getPaginatedLyrics } from "@/lib/actions/get-paginated-lyrics";

interface LyricsTabContentProps {
  value: string;
  currentPage: number;
}

export async function LyricsTabContent({
  value,
  currentPage,
}: LyricsTabContentProps) {
  const { songs } = await getPaginatedLyrics(currentPage);

  return (
    <TabsContent value={value} className="mt-0 space-y-4">
      <Suspense fallback={<LyricsListSkeleton />}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {songs.map((song, index) => (
            <LyricCard
              key={`${song.id}-${index}`}
              title={song.title}
              artist={song.artists.at(0)?.name || "Unknown Artist"}
              artistSlug={song.artists.at(0)?.slug || "unknown-artist"}
              titleSlug={song.slug}
              color={
                index % 3 === 0
                  ? "primary"
                  : index % 3 === 1
                    ? "secondary"
                    : "accent"
              }
            />
          ))}
        </div>
      </Suspense>
    </TabsContent>
  );
}
