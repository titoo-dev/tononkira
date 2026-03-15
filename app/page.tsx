import { DownloadSection } from "@/components/download-section";
import { FeaturedLyricsSection } from "@/components/featured-lyrics-section";
import { FeaturedLyricsSkeleton } from "@/components/featured-lyrics-skeleton";
import { HeroSection } from "@/components/hero-section";
import {
  SearchResultSection,
  SearchResultSkeleton,
} from "@/components/search-result-section";
import { Suspense } from "react";

type SearchParams = Promise<{ q?: string; page?: string }>;

async function SearchResult({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  return <SearchResultSection searchQuery={query} />;
}

export default function Home(props: { searchParams?: SearchParams }) {
  return (
    <main className="selection:bg-primary selection:text-primary-foreground container mx-auto px-4 pt-8 pb-16">
      <Suspense fallback={<SearchResultSkeleton />}>
        <SearchResult searchParams={props.searchParams ?? Promise.resolve({})} />
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
