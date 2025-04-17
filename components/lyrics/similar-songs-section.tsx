import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { SimilarSongCard } from "./similar-song-card";

// Similar songs section
export const SimilarSongsSection = () => (
  <section className="mt-24">
    <div className="mb-10 flex items-center justify-between">
      <h2 className="text-foreground/90 text-2xl font-bold tracking-tight">
        Similar Songs
      </h2>
      <Button variant="ghost" className="gap-1 text-sm">
        View all
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SimilarSongCard key={i} index={i} />
      ))}
    </div>
  </section>
);
