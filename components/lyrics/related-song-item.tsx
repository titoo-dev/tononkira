import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

// Single related song item
export const RelatedSongItem = ({ title }: { title: string }) => (
  <div className="hover:bg-accent/50 group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors">
    <div className="flex items-center gap-3">
      <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-md">
        <span className="text-foreground/70 text-sm">♪</span>
      </div>
      <span className="text-foreground/80 font-medium">{title}</span>
    </div>
    <Button
      size="sm"
      variant="ghost"
      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
      aria-label="View song"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
);
