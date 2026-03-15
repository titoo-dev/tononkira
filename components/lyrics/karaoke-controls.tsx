import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export const KaraokeControls = ({
  isPlaying,
  onPlayPause,
  onRestart,
  currentTime,
  duration,
  onSeek,
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  onRestart: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}) => {
  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-card/90 sticky bottom-0 rounded-lg border p-3 shadow-md backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">{formatTime(currentTime)}</span>
          <div className="relative flex-1">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="range-primary bg-primary/20 h-2 w-full cursor-pointer appearance-none rounded-lg"
            />
            <div
              className="bg-primary absolute top-0 left-0 h-2 rounded-l-lg"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium">{formatTime(duration)}</span>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={onRestart}
            size="sm"
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={onPlayPause}
            size="sm"
            variant="default"
            className="from-primary to-secondary h-10 w-10 rounded-full bg-gradient-to-r p-0"
          >
            {isPlaying ? (
              <span className="h-4 w-4">❙❙</span>
            ) : (
              <ChevronRight className="ml-0.5 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
