import Link from "next/link";
import { ChevronRight, Music } from "lucide-react";

interface LyricCardProps {
  title: string;
  artist: string;
  color: "primary" | "secondary" | "accent";
  titleSlug: string;
  artistSlug: string;
}

export function LyricCard({
  title,
  artist,
  color,
  titleSlug,
  artistSlug,
}: LyricCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 hover:bg-primary/15",
    secondary: "bg-secondary/10 hover:bg-secondary/15",
    accent: "bg-accent/10 hover:bg-accent/15",
  };

  return (
    <Link
      href={`/lyrics/${artistSlug}/${titleSlug}`}
      className={`${colorClasses[color]} group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-ring/30`}
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

      {/* View lyrics indicator */}
      <div className="mt-auto flex items-center gap-1 pt-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
        View lyrics
        <ChevronRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
