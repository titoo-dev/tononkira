import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight, Music } from "lucide-react";

interface LyricCardProps {
  title: string;
  artist: string;
  color: "primary" | "secondary" | "accent";
}

export function LyricCard({ title, artist, color }: LyricCardProps) {
  const colorClasses = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    accent: "bg-accent/10",
  };

  return (
    <div
      className={`${colorClasses[color]} hover:ring-ring/30 group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2`}
    >
      {/* Artist and song info section with icon */}
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-foreground/10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md">
          <Music className="text-foreground/80 h-5 w-5" />
        </div>
        <div className="flex flex-col space-y-1 overflow-hidden">
          <h3 className="text-foreground/90 leading-tight font-medium">
            {title}
          </h3>
          <p
            className="text-muted-foreground truncate overflow-hidden text-xs text-ellipsis whitespace-nowrap"
            title={artist}
          >
            {artist}
          </p>
        </div>
      </div>

      {/* View lyrics button */}
      <Link
        href={`/lyrics/${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="mt-auto block w-full"
      >
        <Button
          variant="ghost"
          size="sm"
          className="group-hover:text-primary mt-2 self-end transition-colors"
          aria-label="View lyrics"
        >
          View lyrics
          <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}
