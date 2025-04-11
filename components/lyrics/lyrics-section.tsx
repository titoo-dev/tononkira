"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Clock,
  FileEdit,
  Maximize2,
  MicVocal,
  Pause,
  Play,
  Printer,
  SkipBack,
} from "lucide-react";

// LyricsHeader component
interface LyricsHeaderProps {
  isKaraokeMode: boolean;
  setIsKaraokeMode: (value: boolean) => void;
  isPlaying: boolean;
  handlePlayPause: () => void;
  handleRestart: () => void;
}

const LyricsHeader = ({
  isKaraokeMode,
  setIsKaraokeMode,
  isPlaying,
  handlePlayPause,
  handleRestart,
}: LyricsHeaderProps) => {
  return (
    <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-foreground/90 text-xl font-bold tracking-tight md:text-2xl">
          Lyrics
        </h2>
        <Button
          variant={isKaraokeMode ? "secondary" : "ghost"}
          size="icon"
          onClick={() => setIsKaraokeMode(!isKaraokeMode)}
          className="h-8 w-8 rounded-full"
          aria-pressed={isKaraokeMode}
          aria-label={
            isKaraokeMode ? "Disable Karaoke Mode" : "Enable Karaoke Mode"
          }
        >
          <MicVocal className="h-4 w-4" />
          <span className="sr-only">
            {isKaraokeMode ? "Disable Karaoke Mode" : "Enable Karaoke Mode"}
          </span>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isKaraokeMode && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleRestart}
              aria-label="Restart"
            >
              <SkipBack className="h-4 w-4" />
              <span className="sr-only">Restart</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8"
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
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
  );
};

// KaraokeMode component
interface TimedLyric {
  text: string;
  startTime: number;
  endTime: number;
}

interface KaraokeModeProps {
  timedLyrics: TimedLyric[];
  activeLyricIndex: number;
  handleLyricTap: (startTime: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const KaraokeMode = ({
  timedLyrics,
  activeLyricIndex,
  handleLyricTap,
  containerRef,
}: KaraokeModeProps) => {
  return (
    <div className="from-primary/5 to-secondary/5 relative flex min-h-[30vh] flex-col rounded-lg bg-gradient-to-br p-3 md:min-h-[40vh] md:p-4">
      <div
        ref={containerRef}
        className="scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex min-h-full flex-col items-center justify-center py-4 md:py-8">
          {timedLyrics.map((line, index) => (
            <div
              id={`lyric-${index}`}
              key={index}
              className={`my-3 w-full cursor-pointer px-3 text-center transition-all duration-500 md:my-5 md:px-6 ${
                index === activeLyricIndex
                  ? "scale-105 opacity-100 md:scale-110"
                  : index < activeLyricIndex
                    ? "opacity-50"
                    : "opacity-70"
              }`}
              onClick={() => handleLyricTap(line.startTime)}
              tabIndex={0}
              role="button"
              aria-current={index === activeLyricIndex}
            >
              <p
                className={`text-lg font-medium transition-all duration-500 md:text-xl lg:text-2xl ${
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
  );
};

// StandardLyricsView component
interface StandardLyricsViewProps {
  lyrics: string[];
}

const StandardLyricsView = ({ lyrics }: StandardLyricsViewProps) => {
  return (
    <div className="from-primary/5 to-secondary/5 relative flex min-h-[30vh] flex-col rounded-lg bg-gradient-to-br p-3 md:min-h-[40vh] md:p-4">
      <div
        className="scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex min-h-full flex-col py-4 md:py-8">
          {lyrics.map((line, index) => (
            <div key={index} className="px-3 md:px-6">
              <p
                className={`my-1 transition-all duration-300 ${
                  line === ""
                    ? "my-4 md:my-6"
                    : "text-foreground/80 text-base md:text-lg"
                }`}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="from-card/50 via-card/30 absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t to-transparent md:h-24"></div>
    </div>
  );
};

// LyricsFooter component
const LyricsFooter = () => {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mt-6">
      <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <Clock className="h-4 w-4" />
        Last updated: June 15, 2023
      </span>
      <div className="flex flex-wrap items-center gap-3">
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
  );
};

// Main LyricsSection component
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
    <div className="bg-card/50 overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur-sm md:col-span-2 md:p-6">
      <LyricsHeader
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
        <StandardLyricsView lyrics={lyrics} />
      )}

      <LyricsFooter />
    </div>
  );
};
