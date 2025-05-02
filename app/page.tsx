import { DownloadSection } from "@/components/download-section";
import { FeaturedLyricsSection } from "@/components/featured-lyrics-section";
import { FeaturedLyricsSkeleton } from "@/components/featured-lyrics-skeleton";
import { HeroSection } from "@/components/hero-section";
import {
  SearchResultSection,
  SearchResultSkeleton,
} from "@/components/search-result-section";
import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";

  return (
    <main className="selection:bg-primary selection:text-primary-foreground container mx-auto px-4 pt-8 pb-16">
      <Suspense fallback={<SearchResultSkeleton />}>
        <SearchResultSection searchQuery={query} />
      </Suspense>

      <HeroSection />
      {/* featured lyrics */}
      <Suspense fallback={<FeaturedLyricsSkeleton />}>
        <FeaturedLyricsSection />
      </Suspense>

      <DownloadSection />
    </main>
  );
}
