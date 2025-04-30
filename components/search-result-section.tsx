import Link from "next/link";
import {
  MusicIcon,
  UserIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { search } from "@/lib/actions/search";
interface Song {
  id: string;
  title: string;
  artist: string;
  slug: string;
}

interface Artist {
  id: string;
  name: string;
  songCount: number;
  slug: string;
}

interface Lyric {
  id: string;
  songTitle: string;
  artist: string;
  content: string;
  contentText: string;
}

export interface SearchResults {
  songs: Song[];
  artists: Artist[];
  lyrics: Lyric[];
}

interface SearchResultSectionProps {
  searchQuery?: string;
}

/**
 * SearchResultSection server component displays search results in a beautiful, tabbed layout
 *
 * Features:
 * - Shows results for the provided search query
 * - Tabs for Songs, Artists, and Lyrics results
 * - Count badges for each category
 * - Scrollable result lists with hover effects
 * - Responsive design
 * - Built as a server component for improved performance
 */
async function SearchResultSectionContent({
  searchQuery,
}: {
  searchQuery: string;
}) {
  // Only render the component if we have a search query
  if (!searchQuery || searchQuery.length < 2) return null;

  // Fetch results from the server action
  const results = await search(searchQuery);

  const { songs, artists, lyrics } = results;
  const hasSongs = songs.length > 0;
  const hasArtists = artists.length > 0;
  const hasLyrics = lyrics.length > 0;
  const hasResults = hasSongs || hasArtists || hasLyrics;

  if (!hasResults) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">No results found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No songs, artists or lyrics match &quot;{searchQuery}&quot;
          </p>
        </CardContent>
      </Card>
    );
  }

  // Helper function to highlight text matches
  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 2) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-primary/20 text-primary rounded px-0.5 font-medium"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <Card className="selection:bg-primary selection:text-primary-foreground container mx-auto mt-4 w-full overflow-hidden px-4 pt-8 pb-16 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
            Results for &quot;{searchQuery}&quot;
          </span>
          <Link
            href={`/search?q=${encodeURIComponent(searchQuery)}`}
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors"
          >
            View all
            <ArrowRightIcon className="ml-1 h-3.5 w-3.5" />
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-8 p-6">
        {/* Songs Section */}
        {hasSongs && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MusicIcon className="text-primary h-5 w-5" />
              <h3 className="font-semibold">Songs</h3>
              <Badge variant="outline" className="ml-2">
                {songs.length}
              </Badge>
            </div>

            <ScrollArea className="pb-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {songs.slice(0, 10).map((song) => (
                  <Link
                    key={song.id}
                    href={`/lyrics/${song.artistSlug}/${song.slug}`}
                    className="bg-muted/40 hover:bg-accent hover:border-primary/20 flex items-center rounded-lg border border-transparent p-3 transition-colors duration-200"
                  >
                    <div className="bg-background text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <MusicIcon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <h3 className="text-foreground group-hover:text-primary truncate font-medium transition-colors">
                        {highlightMatch(song.title, searchQuery)}
                      </h3>
                      <p className="text-muted-foreground truncate text-sm">
                        {highlightMatch(song.artist, searchQuery)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Artists Section */}
        {hasArtists && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UserIcon className="text-primary h-5 w-5" />
              <h3 className="font-semibold">Artists</h3>
              <Badge variant="outline" className="ml-2">
                {artists.length}
              </Badge>
            </div>

            <ScrollArea className="pb-4">
              <div className="flex space-x-4">
                {artists.map((artist) => (
                  <Link
                    key={artist.id}
                    href={`/artists/${artist.slug}`}
                    className="bg-muted/40 hover:bg-accent/60 hover:border-primary/20 flex w-[130px] flex-none flex-col items-center rounded-xl border border-transparent p-4 transition-colors duration-200"
                  >
                    <div className="bg-background text-primary mb-3 flex h-16 w-16 items-center justify-center rounded-full shadow-sm">
                      <UserIcon className="h-7 w-7" />
                    </div>
                    <h3 className="text-foreground hover:text-primary w-full truncate text-center font-medium transition-colors">
                      {highlightMatch(artist.name, searchQuery)}
                    </h3>
                    <p className="text-muted-foreground text-center text-xs">
                      {artist.songCount}{" "}
                      {artist.songCount === 1 ? "song" : "songs"}
                    </p>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Lyrics Section */}
        {hasLyrics && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="text-primary h-5 w-5" />
              <h3 className="font-semibold">Lyrics</h3>
              <Badge variant="outline" className="ml-2">
                {lyrics.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {lyrics.slice(0, 10).map((lyric) => {
                // Find and extract context around the matching lyrics
                const lyricContent = lyric.contentText || lyric.content;
                const queryLower = searchQuery.toLowerCase();
                const contentLower = lyricContent.toLowerCase();
                const matchIndex = contentLower.indexOf(queryLower);

                let displayContent = lyricContent;

                // If match is found in lyrics, extract a snippet with context
                if (matchIndex >= 0) {
                  const startPos = Math.max(0, matchIndex - 30);
                  const endPos = Math.min(
                    lyricContent.length,
                    matchIndex + searchQuery.length + 30,
                  );
                  displayContent =
                    (startPos > 0 ? "..." : "") +
                    lyricContent.substring(startPos, endPos) +
                    (endPos < lyricContent.length ? "..." : "");
                }

                return (
                  <div
                    key={lyric.id}
                    className="bg-muted/40 border-primary/40 hover:border-primary rounded-r-lg border-l-2 p-4 transition-all"
                  >
                    <p className="text-primary mb-1 text-sm font-medium">
                      {highlightMatch(lyric.songTitle, searchQuery)}
                      <span className="text-muted-foreground"> • </span>
                      {highlightMatch(lyric.artist, searchQuery)}
                    </p>
                    <p className="text-sm italic">
                      &quot;{highlightMatch(displayContent, searchQuery)}&quot;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SearchResultSkeleton() {
  return (
    <Card className="flex h-[400px] w-full items-center justify-center overflow-hidden shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground animate-pulse">Searching...</p>
      </div>
    </Card>
  );
}

/**
 * Server component wrapper for search results
 */
export function SearchResultSection({ searchQuery }: SearchResultSectionProps) {
  // Otherwise, get it from URL parameters
  return <SearchResultSectionContent searchQuery={searchQuery!} />;
}
