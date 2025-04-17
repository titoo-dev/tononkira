import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export const SimilarSongCard = ({ index }: { index: number }) => {
  const colors = [
    "bg-primary/10",
    "bg-secondary/10",
    "bg-accent/10",
    "bg-muted",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`${randomColor} hover:ring-ring/30 group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-foreground/10 flex h-11 w-11 items-center justify-center rounded-md">
          <span className="text-foreground/80 text-lg">♪</span>
        </div>
        <div>
          <h3 className="text-foreground/90 leading-tight font-medium">
            Similar Song {index + 1}
          </h3>
          <p className="text-muted-foreground text-xs">Artist Name</p>
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="bg-foreground/10 h-2 w-full rounded-full"></div>
        <div className="bg-foreground/10 h-2 w-4/5 rounded-full"></div>
        <div className="bg-foreground/10 h-2 w-3/5 rounded-full"></div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="group-hover:text-primary mt-5 self-end transition-colors"
        aria-label="View lyrics"
      >
        View lyrics
        <ChevronRight className="ml-1 h-3.5 w-3.5" />
      </Button>
    </div>
  );
};
