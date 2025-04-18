import { getPaginatedLyrics } from "@/lib/actions/get-paginated-lyrics";
import { Suspense } from "react";
import { LyricsListSkeleton } from "./lyrics-list-skeleton";
import { LyricCard } from "./lyric-card";

interface Props {
  currentPage: number;
}

export async function LyricsList({ currentPage }: Props) {
  const { songs } = await getPaginatedLyrics(currentPage);

  return (
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
  );
}
