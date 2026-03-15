import { after } from "next/server";
import { LyricsSection } from "@/components/lyrics/lyrics-section";
import {
  getLyricsBySlug,
  SongWithLyricsDetail,
} from "@/lib/actions/get-lyrics-by-slug";
import { notFound } from "next/navigation";
import { BackNavigation } from "@/components/lyrics/back-navigation";
import { SongArtwork } from "@/components/lyrics/song-artwork";
import { SongInfo } from "@/components/lyrics/song-info";
import { RelatedSongs } from "@/components/lyrics/related-songs";
import { SimilarSongsSection } from "@/components/lyrics/similar-songs-section";
import {
  SongByArtistSlug,
  getLyricsByArtistSlug,
} from "@/lib/actions/get-lyrics-by-artist-slug";
import { Suspense } from "react";
import {
  SearchResultSection,
  SearchResultSkeleton,
} from "@/components/search-result-section";
import { incrementSongViews } from "@/lib/actions/increment-views";

type Params = Promise<{ artist: string; slug: string }>;
type SearchParams = Promise<{ q?: string; page?: string }>;

async function SongDetail({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [{ artist, slug }, { q: query = "" }] = await Promise.all([
    params,
    searchParams,
  ]);

  let songData: SongWithLyricsDetail | null;
  let songByArtistData: SongByArtistSlug[] | null;

  try {
    [songData, songByArtistData] = await Promise.all([
      getLyricsBySlug(artist, slug),
      getLyricsByArtistSlug(artist),
    ]);
    if (!songData || !songByArtistData) {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw new Error(`Failed to fetch lyrics for ${slug}`);
  }

  // Defer view count increment until after the response is sent
  after(() => incrementSongViews(songData!.id));

  return (
    <>
      <Suspense fallback={<SearchResultSkeleton />}>
        <SearchResultSection searchQuery={query} />
      </Suspense>
      <main className="container mx-auto px-6 py-12">
        <BackNavigation />

        <div className="grid gap-10 md:grid-cols-3">
          {/* Left column with song details */}
          <div className="space-y-8 md:col-span-1">
            <SongArtwork title={songData.title} />
            <SongInfo
              title={songData.title}
              artists={songData.artists}
              views={songData.views}
            />
            {songData.artists.length > 0 && (
              <RelatedSongs
                artist={songData.artists[0].name}
                data={songByArtistData}
                artistSlug={songData.artists[0].slug}
              />
            )}
          </div>

          {/* Right column with lyrics */}
          <LyricsSection lyric={songData.lyric!} />
        </div>

        <SimilarSongsSection />
      </main>
    </>
  );
}

export default function LyricsPage(props: {
  params: Params;
  searchParams?: SearchParams;
}) {
  return (
    <Suspense>
      <SongDetail
        params={props.params}
        searchParams={props.searchParams ?? Promise.resolve({})}
      />
    </Suspense>
  );
}
