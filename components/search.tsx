"use client";

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect, useRef } from "react";
import { Music, User } from "lucide-react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
/**
 * Type definitions for search results
 */
interface Song {
  id: number;
  title: string;
  artist: string;
  slug: string;
  artists: Artist[];
}

interface Artist {
  id: number;
  name: string;
  songCount: number;
  slug: string;
}

interface Lyric {
  id: number;
  content: string;
  songTitle: string;
  artist: string;
}

interface SearchResults {
  songs: Song[];
  artists: Artist[];
  lyrics: Lyric[];
}

/**
 * Instant Search component for searching lyrics with popover results
 *
 * Displays results grouped by song title, artist, and lyrics content
 * Fetches data from the API endpoint
 * Styled according to shadcn UI design
 * Responsive - hidden on mobile, visible on medium screens and up
 */
export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [results, setResults] = useState<SearchResults>({
    songs: [],
    artists: [],
    lyrics: [],
  });

  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch search results from API
  useEffect(() => {
    async function fetchSearchResults() {
      if (debouncedQuery.length < 2) {
        setResults({ songs: [], artists: [], lyrics: [] });
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api?q=${encodeURIComponent(debouncedQuery)}`,
        );

        if (!response.ok) {
          throw new Error(`Search failed with status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch search results");
        setResults({ songs: [], artists: [], lyrics: [] });
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchResults();
  }, [debouncedQuery]);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hasResult =
    results.songs.length > 0 ||
    results.artists.length > 0 ||
    results.lyrics.length > 0;

  return (
    <div className="relative hidden md:block" ref={popoverRef}>
      <Popover open={isOpen || hasResult}>
        <PopoverTrigger asChild>
          <div className="relative">
            <SearchIcon
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              placeholder="Search lyrics..."
              className="bg-muted/50 w-[220px] rounded-full pl-10"
              aria-label="Search lyrics"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-[350px] p-0"
          align="end"
          sideOffset={8}
        >
          <div className="bg-popover text-popover-foreground">
            {isLoading && (
              <div className="flex justify-center p-4">
                <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
              </div>
            )}

            {error && (
              <div className="text-destructive p-4 text-center text-sm">
                {error}
              </div>
            )}

            {!isLoading && !error && results.songs.length > 0 && (
              <ResultSection
                title="Songs"
                icon={<Music className="text-primary h-4 w-4" />}
                items={results.songs.map((song) => ({
                  id: song.id,
                  primary: song.title,
                  secondary: song.artist,
                  artistSlug: song.artists[0].slug,
                  lyricSlug: song.slug,
                }))}
                colorClass="bg-primary/10"
              />
            )}

            {!isLoading && !error && results.artists.length > 0 && (
              <ResultSection
                title="Artists"
                icon={<User className="text-secondary h-4 w-4" />}
                items={results.artists.map((artist) => ({
                  id: artist.id,
                  primary: artist.name,
                  secondary: `${artist.songCount} songs`,
                  artistSlug: artist.slug,
                }))}
                colorClass="bg-secondary/10"
              />
            )}

            {!isLoading && !error && !hasResult && searchQuery.length >= 2 && (
              <div className="text-muted-foreground p-4 text-center text-sm">
                No results found for &quot;{searchQuery}&quot;
              </div>
            )}

            {hasResult && (
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground w-full justify-center text-sm"
                  onClick={() => {
                    console.log("View all results");
                    setIsOpen(false);
                  }}
                >
                  View all results
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ResultSectionProps {
  title: string;
  icon: React.ReactNode;
  items: {
    id: number;
    primary: string;
    secondary: string;
    artistSlug?: string;
    lyricSlug?: string;
  }[];
  colorClass: string;
}

function ResultSection({ title, icon, items, colorClass }: ResultSectionProps) {
  return (
    <div className="py-2">
      <div className="flex items-center px-4 py-1.5">
        <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
          {icon}
          <span>{title}</span>
        </div>
      </div>
      <div className="space-y-1 px-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/lyrics/${item.artistSlug}/${item.lyricSlug}`}
          >
            <Button
              variant="ghost"
              className="w-full justify-start rounded-sm px-3 py-5 text-left"
            >
              <div
                className={`mr-3 flex h-8 w-8 items-center justify-center rounded-md ${colorClass}`}
              >
                {icon}
              </div>
              <div className="truncate">
                <div className="font-medium">{item.primary}</div>
                <div className="text-muted-foreground text-xs">
                  {item.secondary}
                </div>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GlobalSearch;
