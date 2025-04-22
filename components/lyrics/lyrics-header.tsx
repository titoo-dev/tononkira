import {
  FileEdit,
  MicVocal,
  Pause,
  Play,
  SkipBack,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";

// LyricsHeader component
interface LyricsHeaderProps {
  isKaraokeMode: boolean;
  setIsKaraokeMode: (value: boolean) => void;
  isPlaying: boolean;
  handlePlayPause: () => void;
  handleRestart: () => void;
}

export const LyricsHeader = ({
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
          className={`h-8 w-8 rounded-full transition-all duration-300 ${
            isKaraokeMode
              ? "bg-secondary text-secondary-foreground shadow-md"
              : "hover:ring-primary/50 hover:bg-background/90 hover:ring-2"
          } relative`}
          aria-pressed={isKaraokeMode}
          aria-label={
            isKaraokeMode ? "Disable Karaoke Mode" : "Enable Karaoke Mode"
          }
        >
          {/* Pulsing ring animation when not in karaoke mode */}
          {!isKaraokeMode && (
            <span className="ring-primary/30 absolute inset-0 animate-pulse rounded-full ring-2" />
          )}
          <MicVocal
            className={`h-4 w-4 ${isKaraokeMode ? "" : "text-primary"}`}
          />
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
        <Button variant="outline" size="sm" className="text-primary">
          <FileEdit className="mr-2 h-4 w-4" />
          Suggest correction
        </Button>
        <Button variant="outline" size="sm" className="text-primary">
          <Sparkles className="mr-2 h-4 w-4" />
          Fix with AI
        </Button>
      </div>
    </div>
  );
};
