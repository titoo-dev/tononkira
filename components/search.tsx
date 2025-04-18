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
import { Music, User, FileText } from "lucide-react";

const dummyData = {
  songs: [
    { id: 1, title: "Ombalahibemaso", artist: "Njakatiana" },
    { id: 2, title: "Masoandro", artist: "Tarika" },
    { id: 3, title: "Tsy Hanadino", artist: "Bodo" },
    { id: 4, title: "Ampela Zandriko", artist: "Reko" },
  ],
  artists: [
    { id: 1, name: "Njakatiana", songCount: 24 },
    { id: 2, name: "Tarika", songCount: 18 },
    { id: 3, name: "Bodo", songCount: 15 },
    { id: 4, name: "Reko", songCount: 12 },
  ],
  lyrics: [
    {
      id: 1,
      content: "Tsisy hita hatramin'izay...",
      songTitle: "Ombalahibemaso",
      artist: "Njakatiana",
    },
    {
      id: 2,
      content: "Ny masoandro mamiratra...",
      songTitle: "Masoandro",
      artist: "Tarika",
    },
    {
      id: 3,
      content: "Tsy hanadino anao mandrakizay...",
      songTitle: "Tsy Hanadino",
      artist: "Bodo",
    },
    {
      id: 4,
      content: "Ampela zandriko malala...",
      songTitle: "Ampela Zandriko",
      artist: "Reko",
    },
  ],
};
/**
 * Instant Search component for searching lyrics with popover results
 *
 * Displays results grouped by song title, artist, and lyrics content
 * Uses dummy data for demonstration purposes
 * Styled according to shadcn UI design
 * Responsive - hidden on mobile, visible on medium screens and up
 */
export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<{
    songs: { id: number; title: string; artist: string }[];
    artists: { id: number; name: string; songCount: number }[];
    lyrics: {
      id: number;
      content: string;
      songTitle: string;
      artist: string;
    }[];
  }>({
    songs: [],
    artists: [],
    lyrics: [],
  });

  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Search logic - filter results based on search query
  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults({ songs: [], artists: [], lyrics: [] });
      return;
    }

    const query = searchQuery.toLowerCase();

    // Filter songs
    const filteredSongs = dummyData.songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query),
    );

    // Filter artists
    const filteredArtists = dummyData.artists.filter((artist) =>
      artist.name.toLowerCase().includes(query),
    );

    // Filter lyrics
    const filteredLyrics = dummyData.lyrics.filter(
      (lyric) =>
        lyric.content.toLowerCase().includes(query) ||
        lyric.songTitle.toLowerCase().includes(query) ||
        lyric.artist.toLowerCase().includes(query),
    );

    setResults({
      songs: filteredSongs,
      artists: filteredArtists,
      lyrics: filteredLyrics,
    });
  }, [searchQuery]);

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
    <div className="relative hidden md:block">
      <Popover open={hasResult || isOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <SearchIcon
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            {results.songs.length > 0 && (
              <ResultSection
                title="Songs"
                icon={<Music className="text-primary h-4 w-4" />}
                items={results.songs.map((song) => ({
                  id: song.id,
                  primary: song.title,
                  secondary: song.artist,
                }))}
                colorClass="bg-primary/10"
                onSelect={(item) => console.log(item)}
              />
            )}

            {results.artists.length > 0 && (
              <ResultSection
                title="Artists"
                icon={<User className="text-secondary h-4 w-4" />}
                items={results.artists.map((artist) => ({
                  id: artist.id,
                  primary: artist.name,
                  secondary: `${artist.songCount} songs`,
                }))}
                colorClass="bg-secondary/10"
                onSelect={(item) => console.log(item)}
              />
            )}

            {results.lyrics.length > 0 && (
              <ResultSection
                title="Lyrics"
                icon={<FileText className="text-accent h-4 w-4" />}
                items={results.lyrics.map((lyric) => ({
                  id: lyric.id,
                  primary: lyric.songTitle,
                  secondary: `${lyric.artist} • ${lyric.content.substring(0, 20)}...`,
                }))}
                colorClass="bg-accent/10"
                onSelect={(item) => console.log(item)}
              />
            )}

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
  }[];
  colorClass: string;
  onSelect: (item: { id: number; primary: string; secondary: string }) => void;
}

function ResultSection({
  title,
  icon,
  items,
  colorClass,
  onSelect,
}: ResultSectionProps) {
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
          <Button
            key={item.id}
            variant="ghost"
            className="w-full justify-start rounded-sm px-3 py-5 text-left"
            onClick={() => onSelect(item)}
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
        ))}
      </div>
    </div>
  );
}

export default GlobalSearch;
