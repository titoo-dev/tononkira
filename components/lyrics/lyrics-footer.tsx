import { Clock, Maximize2 } from "lucide-react";
import { Button } from "../ui/button";

// LyricsFooter component
export const LyricsFooter = () => {
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
      </div>
    </div>
  );
};
