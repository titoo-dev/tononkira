import Link from "next/link";
import React, { Suspense } from "react";
import { StatDisplaySkeleton } from "./stat-display-skeleton";
import { StatsDisplay } from "./stat-display";
import { MusicVisualizer } from "./music-visualizer";

export const HeroSection = () => {
  return (
    <section className="flex flex-col gap-16 md:flex-row md:items-center">
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
          <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-5xl leading-tight font-bold tracking-tight text-transparent lg:text-6xl lg:leading-[1.2] xl:leading-[1.3]">
            <span>Tononkira</span> <span className="font-medium">malagasy</span>
          </h1>
          <p className="text-muted-foreground max-w-md text-xl leading-relaxed">
            Discover and explore Malagasy song lyrics from your favorite artists
            in one place.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/lyrics"
            className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-full px-8 font-medium shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Find Lyrics
          </Link>
          <Link
            href="/popular"
            className="border-primary/30 bg-background ring-offset-background hover:bg-primary/10 focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-full border px-8 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Popular Songs
          </Link>
        </div>

        <Suspense fallback={<StatDisplaySkeleton />}>
          <StatsDisplay />
        </Suspense>
      </div>

      <MusicVisualizer />
    </section>
  );
};
