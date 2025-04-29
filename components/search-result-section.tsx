"use client";

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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
}

export interface SearchResults {
  songs: Song[];
  artists: Artist[];
  lyrics: Lyric[];
}

// Dummy data for testing
const dummyResults: SearchResults = {
  songs: [
    { id: "1", title: "Ny Aiko", artist: "Nanie", slug: "ny-aiko" },
    { id: "2", title: "Tsara Kokoa", artist: "Rija", slug: "tsara-kokoa" },
    { id: "3", title: "Tsy Maninona", artist: "Bodo", slug: "tsy-maninona" },
    { id: "4", title: "Tiako Ianao", artist: "Lola", slug: "tiako-ianao" },
  ],
  artists: [
    { id: "1", name: "Nanie", songCount: 12, slug: "nanie" },
    { id: "2", name: "Rija", songCount: 8, slug: "rija" },
    { id: "3", name: "Bodo", songCount: 15, slug: "bodo" },
  ],
  lyrics: [
    {
      id: "1",
      songTitle: "Ny Aiko",
      artist: "Nanie",
      content: "Izaho sy ianao, miara-dia mandrakizay...",
    },
    {
      id: "2",
      songTitle: "Tsara Kokoa",
      artist: "Rija",
      content: "Tsara kokoa ny miaraka aminao...",
    },
    {
      id: "3",
      songTitle: "Tsy Maninona",
      artist: "Bodo",
      content: "Na dia lavitra aza isika dia tsy maninona...",
    },
  ],
};
interface SearchResultSectionProps {
  results?: SearchResults;
  isLoading?: boolean;
  error?: string | null;
  onNavigateToAllResults?: () => void;
}

/**
 * SearchResultSection component displays search results in a beautiful, tabbed layout
 *
 * Features:
 * - Shows results only when a 'q' parameter exists in the URL
 * - Auto-retrieves search query from URL parameters
 * - Tabs for Songs, Artists, and Lyrics results
 * - Count badges for each category
 * - Beautiful loading state during search parameter changes
 * - Scrollable result lists with hover effects
 * - Responsive design
 * - Error handling
 * - Demo mode with dummy data
 */
export function SearchResultSection({
  results = dummyResults,
  isLoading = false,
  error = null,
  onNavigateToAllResults = () => console.log("Navigate to all results"),
}: SearchResultSectionProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [isSearchParamChanging, setIsSearchParamChanging] = useState(false);

  // Track search parameter changes to show a loading state
  useEffect(() => {
    setIsSearchParamChanging(true);
    const timer = setTimeout(() => setIsSearchParamChanging(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Only render the component if we have a search query
  if (!searchQuery) return null;

  const { songs, artists, lyrics } = results;
  const hasSongs = songs.length > 0;
  const hasArtists = artists.length > 0;
  const hasLyrics = lyrics.length > 0;
  const hasResults = hasSongs || hasArtists || hasLyrics;

  if (isLoading || isSearchParamChanging) {
    return (
      <Card className="flex h-[400px] w-full items-center justify-center overflow-hidden shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground animate-pulse">
            Searching for &quot;{searchQuery}&quot;...
          </p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/40 w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-destructive text-lg">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive/90">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!hasResults && searchQuery.length >= 2) {
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

  if (!hasResults) {
    return null;
  }

  return (
    <Card className="selection:bg-primary selection:text-primary-foreground container mx-auto mt-4 w-full overflow-hidden px-4 pt-8 pb-16 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
            Results for &quot;{searchQuery}&quot;
          </span>
          <button
            onClick={onNavigateToAllResults}
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors"
          >
            View all
            <ArrowRightIcon className="ml-1 h-3.5 w-3.5" />
          </button>
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
                {songs.slice(0, 4).map((song) => (
                  <Link
                    key={song.id}
                    href={`/songs/${song.slug}`}
                    className="bg-muted/40 hover:bg-accent hover:border-primary/20 flex items-center rounded-lg border border-transparent p-3 transition-colors duration-200"
                  >
                    <div className="bg-background text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <MusicIcon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <h3 className="text-foreground group-hover:text-primary truncate font-medium transition-colors">
                        {song.title}
                      </h3>
                      <p className="text-muted-foreground truncate text-sm">
                        {song.artist}
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
                      {artist.name}
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
              {lyrics.slice(0, 3).map((lyric) => (
                <div
                  key={lyric.id}
                  className="bg-muted/40 border-primary/40 hover:border-primary rounded-r-lg border-l-2 p-4 transition-all"
                >
                  <p className="text-primary mb-1 text-sm font-medium">
                    {lyric.songTitle}{" "}
                    <span className="text-muted-foreground">•</span>{" "}
                    {lyric.artist}
                  </p>
                  <p className="text-sm italic">&quot;{lyric.content}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
