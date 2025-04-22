"use client";

import * as React from "react";
import { Popover } from "@/components/ui/popover";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { SearchTrigger } from "./search/search-trigger";
import { SearchResultsContent } from "./search/result";
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

export interface SearchResults {
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
  const [debouncedQuery] = useDebounce(searchQuery, 240);
  const [results, setResults] = useState<SearchResults>({
    songs: [],
    artists: [],
    lyrics: [],
  });

  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className="relative hidden md:block" ref={popoverRef}>
      <Popover open={isOpen || hasResult}>
        <SearchTrigger
          searchQuery={searchQuery}
          onChange={handleSearchInputChange}
        />
        <SearchResultsContent
          isLoading={isLoading}
          error={error}
          results={results}
          searchQuery={searchQuery}
          hasResult={hasResult}
          onViewAllResults={() => {
            console.log("View all results");
            setIsOpen(false);
          }}
        />
      </Popover>
    </div>
  );
}

export default GlobalSearch;
