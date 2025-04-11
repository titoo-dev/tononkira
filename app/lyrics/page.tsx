import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Share2, Download } from "lucide-react";
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
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <Link
          href="/"
          className="text-muted-foreground hover:text-primary inline-flex items-center text-sm"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left column with song details */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-card relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border shadow-lg">
            <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 bg-gradient-to-br"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 flex h-24 w-24 items-center justify-center rounded-full backdrop-blur-sm">
                <span className="text-4xl">♪</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {songData.title}
              </h1>
              <p className="text-muted-foreground text-xl">{songData.artist}</p>
            </div>

            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <span>{songData.album}</span>
              <span>•</span>
              <span>{songData.year}</span>
            </div>

            <div className="text-muted-foreground flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <span className="mr-1">👁️</span> {songData.views} views
              </div>
              <div className="flex items-center">
                <span className="mr-1">❤️</span> {songData.likes} likes
              </div>
            </div>

            <div className="flex space-x-2">
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

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold">
              More from {songData.artist}
            </h3>
            <div className="space-y-2">
              {songData.relatedSongs.map((song, index) => (
                <div
                  key={index}
                  className="hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
                      <span className="text-sm">♪</span>
                    </div>
                    <span className="font-medium">{song.title}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column with lyrics */}
        <div className="bg-card/50 overflow-hidden rounded-xl border p-6 shadow-sm backdrop-blur-sm md:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Lyrics</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Suggest correction
            </Button>
          </div>

          <div className="from-primary/5 to-secondary/5 relative overflow-hidden rounded-lg bg-gradient-to-br p-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {songData.lyrics.map((line, index) => (
                <p key={index} className={line === "" ? "my-6" : "my-1"}>
                  {line}
                </p>
              ))}
            </div>

            <div className="from-card/5 via-card/50 to-card absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t"></div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              Last updated: June 15, 2023
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-sm"
              >
                Full screen
              </Button>
              <Button size="sm" className="rounded-full text-sm">
                Print lyrics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Similar Songs</h2>
          <Button variant="ghost" className="text-sm">
            View all
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
                className={`${randomColor} flex flex-col rounded-xl border p-4 shadow-sm transition-all hover:shadow-md`}
              >
                <div className="mb-3 flex items-center space-x-3">
                  <div className="bg-foreground/10 flex h-10 w-10 items-center justify-center rounded-md">
                    <span className="text-lg">♪</span>
                  </div>
                  <div>
                    <h3 className="leading-none font-medium">
                      Similar Song {i + 1}
                    </h3>
                    <p className="text-muted-foreground text-xs">Artist Name</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-foreground/10 h-2 w-full rounded-full"></div>
                  <div className="bg-foreground/10 h-2 w-4/5 rounded-full"></div>
                  <div className="bg-foreground/10 h-2 w-3/5 rounded-full"></div>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 self-end">
                  View lyrics
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
