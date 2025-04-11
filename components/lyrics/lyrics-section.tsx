"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Clock,
  FileEdit,
  Maximize2,
  Pause,
  Play,
  Printer,
  SkipBack,
} from "lucide-react";

export const LyricsSection = ({ lyrics }: { lyrics: string[] }) => {
  const [isKaraokeMode, setIsKaraokeMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create timed lyrics (in a real app, these would come from an API)
  const timedLyrics = useMemo(() => {
    return lyrics
      .filter((line) => line.trim() !== "")
      .map((line, index) => ({
        text: line,
        startTime: index * 5, // Every 5 seconds for demo
        endTime: (index + 1) * 5,
      }));
  }, [lyrics]);

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
    <div className="bg-card/50 overflow-hidden rounded-xl border p-6 shadow-sm backdrop-blur-sm md:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-foreground/90 text-2xl font-bold tracking-tight">
            Lyrics
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsKaraokeMode(!isKaraokeMode)}
            className={`${isKaraokeMode ? "text-primary bg-primary/10" : ""} rounded-full text-xs`}
          >
            {isKaraokeMode ? "Karaoke Mode On" : "Enable Karaoke Mode"}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {isKaraokeMode && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleRestart}
              >
                <SkipBack className="h-4 w-4" />
                <span className="sr-only">Restart</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm">
            <FileEdit className="mr-2 h-4 w-4" />
            Suggest correction
          </Button>
        </div>
      </div>

      {isKaraokeMode ? (
        <div className="from-primary/5 to-secondary/5 relative flex h-[calc(70vh-300px)] flex-col rounded-lg bg-gradient-to-br p-4">
          {/* Lyrics container with overflow */}
          <div
            ref={containerRef}
            className="scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex min-h-full flex-col items-center justify-center py-8">
              {timedLyrics.map((line, index) => (
                <div
                  id={`lyric-${index}`}
                  key={index}
                  className={`my-5 w-full cursor-pointer px-6 text-center transition-all duration-500 ${
                    index === activeLyricIndex
                      ? "scale-110 opacity-100"
                      : index < activeLyricIndex
                        ? "opacity-50"
                        : "opacity-70"
                  }`}
                  onClick={() => handleLyricTap(line.startTime)}
                >
                  <p
                    className={`text-2xl font-medium transition-all duration-500 ${
                      index === activeLyricIndex
                        ? "from-primary to-secondary animate-pulse bg-gradient-to-r bg-clip-text font-bold text-transparent"
                        : "text-foreground/80"
                    }`}
                  >
                    {line.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="from-primary/5 to-secondary/5 relative overflow-hidden rounded-lg bg-gradient-to-br p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {lyrics.map((line, index) => (
              <p
                key={index}
                className={line === "" ? "my-6" : "text-foreground/80 my-1"}
              >
                {line}
              </p>
            ))}
          </div>
          <div className="from-card/5 via-card/50 to-card absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t"></div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Clock className="h-4 w-4" />
          Last updated: June 15, 2023
        </span>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-full text-sm">
            <Maximize2 className="mr-2 h-3.5 w-3.5" />
            Full screen
          </Button>
          <Button size="sm" className="rounded-full text-sm">
            <Printer className="mr-2 h-3.5 w-3.5" />
            Print lyrics
          </Button>
        </div>
      </div>
    </div>
  );
};
