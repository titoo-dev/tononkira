import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./search";

export async function HeaderSection() {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b px-4 backdrop-blur-md md:px-0">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Tononkira Home"
          >
            <Image
              src="/brand.png"
              alt="Tononkira Logo"
              width={120}
              height={60}
              className="h-16 object-cover"
            />
          </Link>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
