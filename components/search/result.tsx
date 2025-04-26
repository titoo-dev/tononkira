import Link from "next/link";
import { Button } from "../ui/button";
import { PopoverContent } from "../ui/popover";
import { ErrorMessage, NoResultsMessage } from "./error";
import { Music, User } from "lucide-react";
import { LoadingSpinner } from "./loading-spinner";
import { SearchResults } from "../search";

/**
 * Search results content container
 */
interface SearchResultsContentProps {
  isLoading: boolean;
  error: string | null;
  results: SearchResults;
  searchQuery: string;
  hasResult: boolean;
  onViewAllResults: () => void;
}

export function SearchResultsContent({
  isLoading,
  error,
  results,
  searchQuery,
  hasResult,
  onViewAllResults,
}: SearchResultsContentProps) {
  return (
    <PopoverContent
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="w-[350px] p-0"
      align="end"
      sideOffset={8}
    >
      <div className="bg-popover text-popover-foreground">
        {isLoading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!isLoading && !error && results.songs.length > 0 && (
          <ResultSection
            title="Songs"
            icon={<Music className="text-primary h-4 w-4" />}
            items={results.songs.map((song) => ({
              id: song.id,
              primary: song.title,
              secondary: song.artists[0].name,
              artistSlug: song.artists[0].slug,
              lyricSlug: song.slug,
            }))}
            colorClass="bg-primary/10"
          />
        )}

        {!isLoading && !error && results.artists.length > 0 && (
          <ResultSection
            title="Artists"
            icon={<User className="text-secondary h-4 w-4" />}
            items={results.artists.map((artist) => ({
              id: artist.id,
              primary: artist.name,
              secondary: `${artist.songCount} songs`,
              artistSlug: artist.slug,
            }))}
            colorClass="bg-secondary/10"
          />
        )}

        {!isLoading && !error && !hasResult && searchQuery.length >= 2 && (
          <NoResultsMessage searchQuery={searchQuery} />
        )}

        {hasResult && <ViewAllResults onClick={onViewAllResults} />}
      </div>
    </PopoverContent>
  );
}

interface ResultSectionProps {
  title: string;
  icon: React.ReactNode;
  items: {
    id: number;
    primary: string;
    secondary: string;
    artistSlug?: string;
    lyricSlug?: string;
  }[];
  colorClass: string;
}

function ResultSection({ title, icon, items, colorClass }: ResultSectionProps) {
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-center px-4 py-1.5">
        <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
          {icon}
          <span>{title}</span>
        </div>
      </div>
      <div className="space-y-1 px-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/lyrics/${item.artistSlug}/${item.lyricSlug}`}
          >
            <Button
              variant="ghost"
              className="w-full justify-start rounded-sm px-3 py-5 text-left"
            >
              <div
                className={`mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md ${colorClass}`}
              >
                {icon}
              </div>
              <div className="truncate">
                <div className="font-medium">{item.primary}</div>
                <div className="text-muted-foreground text-xs">
                  {item.secondary}
                </div>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * View all results button component
 */
interface ViewAllResultsProps {
  onClick: () => void;
}

function ViewAllResults({ onClick }: ViewAllResultsProps) {
  return (
    <div className="border-t p-2">
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground w-full justify-center text-sm"
        onClick={onClick}
      >
        View all results
      </Button>
    </div>
  );
}
