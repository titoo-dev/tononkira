import Link from "next/link";
import { Button } from "./ui/button";
import {
  getLatestSongs,
  type LatestSongWithLyrics,
} from "@/lib/actions/get-latest-lyircs";
import { formatDistanceToNow } from "date-fns";
import { Music } from "lucide-react";
import Image from "next/image";

export async function FeaturedLyricsSection() {
  let latestSongs: LatestSongWithLyrics[] = [];

  try {
    latestSongs = await getLatestSongs();
  } catch (error) {
    console.error("Error fetching latest songs:", error);
    // Continue with empty array if fetching fails
  }

  const colors = [
    "bg-primary/10",
    "bg-secondary/10",
    "bg-accent/10",
    "bg-muted",
  ];

  return (
    <section className="py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Featured Lyrics</h2>
        <Button variant="ghost" className="text-sm" asChild>
          <Link href="/lyrics">View all</Link>
        </Button>
      </div>

      <div className="relative -mx-4 px-4">
        <div className="overflow-hidden pb-6">
          <div className="animate-marquee hover:pause flex space-x-6">
            {latestSongs.map((song) => {
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];

              return (
                <div
                  key={song.id}
                  className={`${randomColor} flex min-w-[280px] flex-col rounded-xl border p-4 shadow-sm transition-all hover:shadow-md`}
                >
                  <div className="mb-3 flex items-center space-x-3">
                    <div className="bg-foreground/10 flex h-10 w-10 items-center justify-center rounded-md">
                      {song.album?.coverUrl ? (
                        <Image
                          src={song.album.coverUrl}
                          alt={song.album.title}
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <Music className="text-muted-foreground h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="leading-none font-medium">{song.title}</h3>
                      <p className="text-muted-foreground text-xs">
                        {song.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground space-y-2 text-xs">
                    <p className="truncate">
                      {song.lyric?.contentText?.substring(0, 60)}...
                    </p>
                    <p>
                      Updated {formatDistanceToNow(new Date(song.updatedAt))}{" "}
                      ago
                    </p>
                    <p>{song.views ?? 0} views</p>
                  </div>
                  <Link href={`/lyrics/${song.slug}`} className="mt-4 self-end">
                    <Button variant="ghost" size="sm">
                      View lyrics
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent"></div>
      </div>
    </section>
  );
}
