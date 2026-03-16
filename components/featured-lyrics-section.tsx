import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  getLatestSongs,
  type LatestSongWithLyrics,
} from "@/lib/actions/get-latest-lyircs";
import { RelativeTime } from "./relative-time";
import { Music } from "lucide-react";
import { connection } from "next/server";

export async function FeaturedLyricsSection() {
  await connection();
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
        <Link href="/lyrics" className="hover:text-primary text-sm transition-colors">
          View all
        </Link>
      </div>

      <div className="relative -mx-4 px-4">
        <div className="overflow-hidden pb-6">
          <div className="animate-marquee hover:pause flex space-x-6">
            {[
              ...latestSongs.map((s) => ({ ...s, _loopKey: `${s.id}-a` })),
              ...latestSongs.map((s) => ({ ...s, _loopKey: `${s.id}-b` })),
            ].map((song, position) => {
              const randomColor = colors[position % colors.length];

              return (
                <Link
                  key={song._loopKey}
                  href={`/lyrics/${song.artists.at(0)?.slug}/${song.slug}`}
                  className={`${randomColor} group flex min-w-[280px] flex-col rounded-xl border p-4 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-ring/30`}
                >
                  <div className="mb-3 flex items-center space-x-3">
                    <div className="bg-foreground/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md">
                      <Music className="text-muted-foreground h-6 w-6" />
                    </div>
                    <div className="flex flex-col space-y-1 overflow-hidden">
                      <h3 className="text-foreground/90 leading-tight font-medium">
                        {song.title}
                      </h3>
                      <p className="text-muted-foreground truncate overflow-hidden text-xs text-ellipsis whitespace-nowrap">
                        {song.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground space-y-1 text-xs">
                    <p>
                      Updated <RelativeTime date={song.updatedAt} />
                    </p>
                    <p>{song.views ?? 0} views</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 self-end text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    View lyrics
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r to-transparent"></div>
      </div>
    </section>
  );
}
