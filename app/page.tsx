import { FeaturedLyricsSection } from "@/components/featured-lyrics-section";
import { FeaturedLyricsSkeleton } from "@/components/featured-lyrics-skeleton";
import { HeroSection } from "@/components/hero-section";
import SearchResultSection from "@/components/search-result-section";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="selection:bg-primary selection:text-primary-foreground container mx-auto px-4 pt-8 pb-16">
      <SearchResultSection />
      <HeroSection />

      {/* featured lyrics */}
      <Suspense fallback={<FeaturedLyricsSkeleton />}>
        <FeaturedLyricsSection />
      </Suspense>
    </main>
  );
}
