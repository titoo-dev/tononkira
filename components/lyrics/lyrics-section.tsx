"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LyricsFooter } from "./lyrics-footer";
import { LyricsHeader } from "./lyrics-header";
import { KaraokeMode } from "./karaoke-mode";
import { StandardLyricsView } from "./standard-lyrics-view";
import { Lyric } from "@/lib/actions/get-lyrics-by-slug";
import { LyricsAnalysis } from "@/lib/crawl/types";

// Main LyricsSection component
export interface Verse {
  type: string;
  content: string[];
  verseNumber?: number;
}

export interface LyricsSectionProps {
  lyric: Lyric;
}

export const LyricsSection = ({ lyric }: LyricsSectionProps) => {
  const lyrics: LyricsAnalysis = JSON.parse(lyric.content);
  const [isKaraokeMode, setIsKaraokeMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten lyrics content for display
  const flatLyrics = useMemo(() => {
    return lyrics.content.flatMap((verse) => {
      // Add verse number if available
      const lines = [...verse.content];
      if (verse.verseNumber) {
        lines[0] = `${verse.verseNumber}. ${lines[0]}`;
      }

      // Add empty line after each verse for spacing
      return [...lines, ""];
    });
  }, [lyrics]);

  // Create timed lyrics for karaoke mode
  const timedLyrics = useMemo(() => {
    return flatLyrics
      .filter((line) => line.trim() !== "")
      .map((line, index) => ({
        text: line,
        startTime: index * 5, // Every 5 seconds for demo
        endTime: (index + 1) * 5,
      }));
  }, [flatLyrics]);

  // Total duration of the song
  const totalDuration =
    timedLyrics.length > 0 ? timedLyrics[timedLyrics.length - 1].endTime : 0;

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, totalDuration]);

  // Handle restart
  const handleRestart = useCallback(() => {
    setCurrentTime(0);
    if (!isPlaying) {
      handlePlayPause();
    }
  }, [isPlaying, handlePlayPause]);

  // Update active lyric based on current time and scroll into view
  useEffect(() => {
    const activeIndex = timedLyrics.findIndex(
      (lyric) => currentTime >= lyric.startTime && currentTime < lyric.endTime,
    );

    if (activeIndex !== activeLyricIndex) {
      setActiveLyricIndex(activeIndex);

      // Scroll active lyric into view with smooth behavior when in karaoke mode
      if (isKaraokeMode && activeIndex !== -1) {
        const activeElement = document.getElementById(`lyric-${activeIndex}`);
        if (activeElement && containerRef.current) {
          activeElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [currentTime, timedLyrics, activeLyricIndex, isKaraokeMode]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle tap on lyrics to follow active lyrics time
  const handleLyricTap = (startTime: number) => {
    setCurrentTime(startTime);
    if (!isPlaying) {
      handlePlayPause();
    }
  };

  return (
    <div className="bg-card/50 flex flex-col overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur-sm md:col-span-2 md:p-6">
      <LyricsHeader
        lyricId={lyric.id}
        isKaraokeMode={isKaraokeMode}
        setIsKaraokeMode={setIsKaraokeMode}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        handleRestart={handleRestart}
      />

      {isKaraokeMode ? (
        <KaraokeMode
          timedLyrics={timedLyrics}
          activeLyricIndex={activeLyricIndex}
          handleLyricTap={handleLyricTap}
          containerRef={containerRef}
        />
      ) : (
        <StandardLyricsView lyrics={flatLyrics} />
      )}

      <LyricsFooter
        isKaraokeMode={isKaraokeMode}
        lastUpdated="2023-06-15" // Replace with actual last updated date or pass it as a prop to LyricsSection
        onFullScreenClick={() => {
          // Handle full screen functionality here
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(
              `Error attempting to enable full-screen mode: ${err.message}`,
            );
          });
        }}
      />
    </div>
  );
};
