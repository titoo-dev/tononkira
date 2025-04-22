import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { SimilarSongCard } from "./similar-song-card";

// Similar songs section
export const SimilarSongsSection = () => (
  <section className="relative mt-24">
    {/* Original content with reduced opacity */}
    <div className="pointer-events-none opacity-40 blur-[1px]">
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
    </div>

    {/* Redesigned coming soon overlay with glass morphism effect and animation */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-background/60 border-primary/20 hover:shadow-primary/10 max-w-md transform rounded-xl border p-8 shadow-xl backdrop-blur-md transition-all duration-300">
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 mb-4 rounded-full p-3">
            <ArrowRight className="text-primary h-6 w-6 animate-pulse" />
          </div>
          <h3 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
            Coming Soon
          </h3>
          <div className="from-primary to-secondary my-4 h-1 w-16 rounded bg-gradient-to-r"></div>
          <p className="text-muted-foreground text-center">
            Our team is working on an algorithm to find similar songs that match
            your taste and preferences.
          </p>
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 mt-6"
          >
            Get notified when it's ready
          </Button>
        </div>
      </div>
    </div>
  </section>
);
