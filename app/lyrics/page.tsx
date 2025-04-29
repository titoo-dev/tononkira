import { Header } from "@/components/header";
import { Pagination } from "@/components/pagination";
import { TabNav } from "@/components/tab-nav";
import { getPaginatedLyrics } from "@/lib/actions/get-paginated-lyrics";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
// Main page component
export default async function LyricsPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await getPaginatedLyrics(currentPage);

  return (
    <main className="container mx-auto px-4 py-12">
      <Header
        title="Lyrics Collection"
        description="Explore our collection of Malagasy song lyrics. Use the filters below to discover songs by artist, genre, or release year."
      />

      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-semibold">Browse Lyrics</h2>
        <TabNav defaultValue="popular" currentPage={currentPage} />
      </div>

      <div className="mt-8">
        <Suspense>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
