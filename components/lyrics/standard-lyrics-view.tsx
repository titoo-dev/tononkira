interface StandardLyricsViewProps {
  lyrics: string[];
}

export const StandardLyricsView = ({ lyrics }: StandardLyricsViewProps) => {
  return (
    <div className="from-primary/5 to-secondary/5 relative flex min-h-[30vh] flex-1 flex-col rounded-lg bg-gradient-to-br p-3 md:min-h-[40vh] md:p-4">
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
