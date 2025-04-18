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

export default async function LyricsPage(props: {
  params: Promise<{ artist: string; slug: string }>;
}) {
  const params = await props.params;

  const { artist, slug } = params;

  // Fetch song data using the server action
  let songData: SongWithLyricsDetail | null;

  try {
    songData = await getLyricsBySlug(artist, slug);
    if (!songData) {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw new Error(`Failed to fetch lyrics for ${slug}`);
  }

  // Transform lyrics content from string to array of lines
  const lyricsData = JSON.parse(songData.lyric!.content);
  return (
    <main className="container mx-auto px-6 py-12">
      <BackNavigation />

      <div className="grid gap-10 md:grid-cols-3">
        {/* Left column with song details */}
        <div className="space-y-8 md:col-span-1">
          <SongArtwork
            coverUrl={songData.album?.coverUrl ?? null}
            title={songData.title}
          />
          <SongInfo
            title={songData.title}
            artists={songData.artists}
            views={songData.views}
          />
          {songData.artists.length > 0 && (
            <RelatedSongs
              artistName={songData.artists[0].name}
              artistSlug={songData.artists[0].slug}
            />
          )}
        </div>

        {/* Right column with lyrics */}
        <LyricsSection lyrics={lyricsData} />
      </div>

      <SimilarSongsSection />
    </main>
  );
}
