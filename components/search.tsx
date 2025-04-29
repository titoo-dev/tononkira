"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { Suspense } from "react";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(function handleSearch(
    term: string,
  ) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 240);

  return (
    <div className="relative">
      <SearchIcon
        aria-hidden="true"
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
      />
      <Input
        type="search"
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search lyrics..."
        className="bg-muted/50 w-[100px] rounded-full pl-10"
        aria-label="Search lyrics"
      />
    </div>
  );
}

export function SearchBar() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <Search />
    </Suspense>
  );
}

/**
 * Skeleton loader for search component
 * Displays a placeholder while the search component is loading
 */
function SearchSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="bg-muted-foreground/30 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 rounded-full" />
      <div className="bg-muted/50 h-10 w-[120px] rounded-full pl-10" />
    </div>
  );
}
