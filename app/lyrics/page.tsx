import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Heart,
  Share2,
  Download,
  ChevronRight,
  ArrowRight,
  Printer,
  Maximize2,
  Clock,
  FileEdit,
  Eye,
  HeartIcon,
} from "lucide-react";
import Link from "next/link";

export default function LyricsPage() {
  // Fake data for demonstration
  const songData = {
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

      <div className="grid gap-10 md:grid-cols-3">
        {/* Left column with song details */}
        <div className="space-y-8 md:col-span-1">
          <div className="bg-card relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border shadow-lg">
            <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 bg-gradient-to-br"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 flex h-24 w-24 items-center justify-center rounded-full backdrop-blur-sm">
                <span className="text-foreground/90 text-4xl">♪</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-foreground/90 mb-2 text-3xl font-bold tracking-tight">
                {songData.title}
              </h1>
              <p className="text-foreground/70 text-xl">{songData.artist}</p>
            </div>

            <div className="text-muted-foreground flex items-center gap-2.5 text-sm">
              <span>{songData.album}</span>
              <span>•</span>
              <span>{songData.year}</span>
            </div>

            <div className="text-muted-foreground flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5">
                <span aria-hidden="true">
                  <Eye className="h-4 w-4" />
                </span>
                <span>{songData.views} views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span aria-hidden="true">
                  <HeartIcon className="h-4 w-4" />
                </span>
                <span>{songData.likes} likes</span>
              </div>
            </div>

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
          </div>

          <div className="space-y-5 pt-4">
            <h3 className="text-foreground/90 text-lg font-semibold">
              More from {songData.artist}
            </h3>
            <div className="space-y-2">
              {songData.relatedSongs.map((song, index) => (
                <div
                  key={index}
                  className="hover:bg-accent/50 group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-md">
                      <span className="text-foreground/70 text-sm">♪</span>
                    </div>
                    <span className="text-foreground/80 font-medium">
                      {song.title}
                    </span>
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
              ))}
            </div>
          </div>
        </div>

        {/* Right column with lyrics */}
        <div className="bg-card/50 overflow-hidden rounded-xl border p-6 shadow-sm backdrop-blur-sm md:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground/90 text-2xl font-bold tracking-tight">
              Lyrics
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <FileEdit className="mr-2 h-4 w-4" />
              Suggest correction
            </Button>
          </div>

          <div className="from-primary/5 to-secondary/5 relative overflow-hidden rounded-lg bg-gradient-to-br p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {songData.lyrics.map((line, index) => (
                <p
                  key={index}
                  className={line === "" ? "my-6" : "text-foreground/80 my-1"}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="from-card/5 via-card/50 to-card absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t"></div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4" />
              Last updated: June 15, 2023
            </span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-sm"
              >
                <Maximize2 className="mr-2 h-3.5 w-3.5" />
                Full screen
              </Button>
              <Button size="sm" className="rounded-full text-sm">
                <Printer className="mr-2 h-3.5 w-3.5" />
                Print lyrics
              </Button>
            </div>
          </div>
        </div>
      </div>

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
          {Array.from({ length: 4 }).map((_, i) => {
            const colors = [
              "bg-primary/10",
              "bg-secondary/10",
              "bg-accent/10",
              "bg-muted",
            ];
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];

            return (
              <div
                key={i}
                className={`${randomColor} hover:ring-ring/30 group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-foreground/10 flex h-11 w-11 items-center justify-center rounded-md">
                    <span className="text-foreground/80 text-lg">♪</span>
                  </div>
                  <div>
                    <h3 className="text-foreground/90 leading-tight font-medium">
                      Similar Song {i + 1}
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
          })}
        </div>
      </section>
    </main>
  );
}
