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
  HeartIcon,
} from "lucide-react";
import { LyricsSection } from "@/components/lyrics/lyrics-section";

// Types
interface Song {
  title: string;
  artist: string;
  album: string;
  year: string;
  lyrics: string[];
  views: string;
  likes: string;
  relatedSongs: { title: string; artist: string }[];
}
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
const SongArtwork = () => (
  <div className="bg-card relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border shadow-lg">
    <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 bg-gradient-to-br"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-background/80 flex h-24 w-24 items-center justify-center rounded-full backdrop-blur-sm">
        <span className="text-foreground/90 text-4xl">♪</span>
      </div>
    </div>
  </div>
);

// Song header info component
const SongInfo = ({
  title,
  artist,
  album,
  year,
  views,
  likes,
}: {
  title: string;
  artist: string;
  album: string;
  year: string;
  views: string;
  likes: string;
}) => (
  <div className="space-y-5">
    <div>
      <h1 className="text-foreground/90 mb-2 text-3xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-foreground/70 text-xl">{artist}</p>
    </div>

    <div className="text-muted-foreground flex items-center gap-2.5 text-sm">
      <span>{album}</span>
      <span>•</span>
      <span>{year}</span>
    </div>

    <div className="text-muted-foreground flex items-center gap-5 text-sm">
      <div className="flex items-center gap-1.5">
        <span aria-hidden="true">
          <Eye className="h-4 w-4" />
        </span>
        <span>{views} views</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span aria-hidden="true">
          <HeartIcon className="h-4 w-4" />
        </span>
        <span>{likes} likes</span>
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
  songs,
  artistName,
}: {
  songs: { title: string; artist: string }[];
  artistName: string;
}) => (
  <div className="space-y-5 pt-4">
    <h3 className="text-foreground/90 text-lg font-semibold">
      More from {artistName}
    </h3>
    <div className="space-y-2">
      {songs.map((song, index) => (
        <RelatedSongItem key={index} song={song} />
      ))}
    </div>
  </div>
);

// Single related song item
const RelatedSongItem = ({
  song,
}: {
  song: { title: string; artist: string };
}) => (
  <div className="hover:bg-accent/50 group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors">
    <div className="flex items-center gap-3">
      <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-md">
        <span className="text-foreground/70 text-sm">♪</span>
      </div>
      <span className="text-foreground/80 font-medium">{song.title}</span>
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

export default function LyricsPage() {
  // Fake data for demonstration
  const songData: Song = {
    title: "Tsara ny tia anao",
    artist: "Rossy",
    album: "Best Collection",
    year: "2018",
    lyrics: [
      "Tsara ny tia anao",
      "Na dia lavitra aza ianao",
      "Ny fonay anie mitempo ho anao",
      "Mandrakizay tsy hiova",
      "",
      "Tsiky no entinao",
      "Rehefa mifankahita isika",
      "Manala alahelo foana",
      "Ny fahatongavanao",
      "",
      "Refrain:",
      "Tiako ianao, tiako foana",
      "Na dia any ho any aza",
      "Tsy misy afaka hanala",
      "Ny fitiavantsika",
      "",
      "Tiako ianao, tiako foana",
      "Na dia sao sao tsy fantatro aza",
      "Fa ny foko tia anao",
      "Mandrakizay",
    ],
    views: "23.5K",
    likes: "12.3K",
    relatedSongs: [
      { title: "Raha Mbola Velona", artist: "Rossy" },
      { title: "Tsy Afaka Tsy Ho Tia", artist: "Rossy" },
      { title: "Lavitra Anao", artist: "Rossy" },
    ],
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <BackNavigation />

      <div className="grid gap-10 md:grid-cols-3">
        {/* Left column with song details */}
        <div className="space-y-8 md:col-span-1">
          <SongArtwork />
          <SongInfo
            title={songData.title}
            artist={songData.artist}
            album={songData.album}
            year={songData.year}
            views={songData.views}
            likes={songData.likes}
          />
          <RelatedSongs
            songs={songData.relatedSongs}
            artistName={songData.artist}
          />
        </div>

        {/* Right column with lyrics */}
        <LyricsSection lyrics={songData.lyrics} />
      </div>

      <SimilarSongsSection />
    </main>
  );
}
