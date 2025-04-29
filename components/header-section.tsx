import Link from "next/link";
import Image from "next/image";
import GlobalSearch from "./search";
import { auth } from "@clerk/nextjs/server";
import { Button } from "./ui/button";

export async function HeaderSection() {
  const { userId } = await auth();

  const isSignedIn = !!userId;

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
            <GlobalSearch />

            {!isSignedIn && (
              <Button
                asChild
                className="hidden rounded-full font-medium shadow-sm md:flex"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
