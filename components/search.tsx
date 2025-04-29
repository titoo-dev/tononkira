"use client";

import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { SearchTrigger } from "./search/search-trigger";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(function handleSearch(
    term: string,
  ) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 150);

  return (
    <SearchTrigger
      searchQuery={searchParams.get("q") || ""}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
}

export default GlobalSearch;
