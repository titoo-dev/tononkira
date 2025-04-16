import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronLeft,
  Heart,
  Share2,
  Download,
  ChevronRight,
  ArrowRight,
  Eye,
  Music2,
} from "lucide-react";
import { LyricsSection } from "@/components/lyrics/lyrics-section";
import {
  getLyricsBySlug,
  SongWithLyricsDetail,
} from "@/lib/actions/get-lyrics-by-slug";
import { notFound } from "next/navigation";
import Image from "next/image";
// Component for back navigation
const BackNavigation = () => (
  <div className="mb-10">
    <Link
      href="/"
      className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm transition-colors"
      aria-label="Back to home"
    >
      <ChevronLeft className="h-4 w-4" />
      Back to home
    </Link>
  </div>
);

// Song artwork component
const SongArtwork = ({
  coverUrl,
  title,
}: {
  coverUrl: string | null;
  title: string;
}) => (
  <div className="bg-card relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border shadow-lg">
    {coverUrl ? (
      <Image
        src={coverUrl}
        alt={`${title} album cover`}
        className="h-full w-full object-cover"
      />
    ) : (
      <>
        <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 bg-gradient-to-br"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/80 flex h-24 w-24 items-center justify-center rounded-full backdrop-blur-sm">
            <Music2 className="text-foreground/90 h-6 w-6" />
          </div>
        </div>
      </>
    )}
  </div>
);

// Song header info component
const SongInfo = ({
  title,
  artists,
  album,
  releaseDate,
  views,
}: {
  title: string;
  artists: Array<{ name: string; slug: string; id: number }>;
  album: { title: string; releaseDate: Date | null } | null;
  releaseDate: Date | null;
  views: number | null;
}) => (
  <div className="space-y-5">
    <div>
      <h1 className="text-foreground/90 mb-2 text-3xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-foreground/70 text-xl">
        {artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>

    {(album || releaseDate) && (
      <div className="text-muted-foreground flex items-center gap-2.5 text-sm">
        {album && <span>{album.title}</span>}
        {album && releaseDate && <span>•</span>}
        {releaseDate && <span>{new Date(releaseDate).getFullYear()}</span>}
      </div>
    )}

    <div className="text-muted-foreground flex items-center gap-5 text-sm">
      <div className="flex items-center gap-1.5">
        <span aria-hidden="true">
          <Eye className="h-4 w-4" />
        </span>
        <span>{views?.toLocaleString() || 0} views</span>
      </div>
    </div>

    <ActionButtons />
  </div>
);

// Action buttons component
const ActionButtons = () => (
  <div className="flex flex-wrap gap-3">
    <Button size="sm" variant="outline" className="rounded-full">
      <Heart className="mr-2 h-4 w-4" /> Like
    </Button>
    <Button size="sm" variant="outline" className="rounded-full">
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
    <Button size="sm" variant="outline" className="rounded-full">
      <Download className="mr-2 h-4 w-4" /> Download
    </Button>
  </div>
);

// Related songs component
const RelatedSongs = ({
  artistName,
  artistSlug,
}: {
  artistName: string;
  artistSlug: string;
}) => (
  <div className="space-y-5 pt-4">
    <h3 className="text-foreground/90 text-lg font-semibold">
      More from {artistName}
    </h3>
    <div className="space-y-2">
      {/* This would be populated from a separate API call to get more songs by this artist */}
      <RelatedSongItem title="Loading..." />
    </div>
    <Button variant="outline" className="w-full" asChild>
      <Link href={`/artist/${artistSlug}`}>See all songs by {artistName}</Link>
    </Button>
  </div>
);

// Single related song item
const RelatedSongItem = ({ title }: { title: string }) => (
  <div className="hover:bg-accent/50 group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors">
    <div className="flex items-center gap-3">
      <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-md">
        <span className="text-foreground/70 text-sm">♪</span>
      </div>
      <span className="text-foreground/80 font-medium">{title}</span>
    </div>
    <Button
      size="sm"
      variant="ghost"
      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
      aria-label="View song"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
);

// Similar songs section
const SimilarSongsSection = () => (
  <section className="mt-24">
    <div className="mb-10 flex items-center justify-between">
      <h2 className="text-foreground/90 text-2xl font-bold tracking-tight">
        Similar Songs
      </h2>
      <Button variant="ghost" className="gap-1 text-sm">
        View all
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SimilarSongCard key={i} index={i} />
      ))}
    </div>
  </section>
);

// Similar song card
const SimilarSongCard = ({ index }: { index: number }) => {
  const colors = [
    "bg-primary/10",
    "bg-secondary/10",
    "bg-accent/10",
    "bg-muted",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`${randomColor} hover:ring-ring/30 group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-foreground/10 flex h-11 w-11 items-center justify-center rounded-md">
          <span className="text-foreground/80 text-lg">♪</span>
        </div>
        <div>
          <h3 className="text-foreground/90 leading-tight font-medium">
            Similar Song {index + 1}
          </h3>
          <p className="text-muted-foreground text-xs">Artist Name</p>
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="bg-foreground/10 h-2 w-full rounded-full"></div>
        <div className="bg-foreground/10 h-2 w-4/5 rounded-full"></div>
        <div className="bg-foreground/10 h-2 w-3/5 rounded-full"></div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="group-hover:text-primary mt-5 self-end transition-colors"
        aria-label="View lyrics"
      >
        View lyrics
        <ChevronRight className="ml-1 h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

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
            album={songData.album}
            releaseDate={songData.album?.releaseDate ?? null}
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
