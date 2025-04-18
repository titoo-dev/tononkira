import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight, Music } from "lucide-react";

interface LyricCardProps {
  title: string;
  artist: string;
  year: number;
  color: "primary" | "secondary" | "accent";
}

export function LyricCard({ title, artist, year, color }: LyricCardProps) {
  const colorClasses = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    accent: "bg-accent/10",
  };

  return (
    <div
      className={`${colorClasses[color]} hover:ring-ring/30 group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-foreground/10 flex h-11 w-11 items-center justify-center rounded-md">
          <Music className="text-foreground/80 h-5 w-5" />
        </div>
        <div>
          <h3 className="text-foreground/90 leading-tight font-medium">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs">{artist}</p>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Released</span>
          <span className="font-medium">{year}</span>
        </div>
        <div className="bg-foreground/10 h-2 w-full rounded-full">
          <div
            className="bg-foreground/20 h-2 rounded-full"
            style={{ width: `${((year % 10) / 10 + 0.3) * 100}%` }}
          ></div>
        </div>
      </div>

      <Link
        href={`/lyrics/${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="mt-5 block w-full"
      >
        <Button
          variant="ghost"
          size="sm"
          className="group-hover:text-primary mt-auto self-end transition-colors"
          aria-label="View lyrics"
        >
          View lyrics
          <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}
