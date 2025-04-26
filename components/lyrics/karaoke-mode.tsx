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

export const KaraokeMode = ({
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
