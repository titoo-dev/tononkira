import Link from "next/link";
import { Frown, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2">
          <div className="flex justify-center">
            <Frown size={64} className="text-muted-foreground" />
          </div>
          <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn&apos;t find the page you were looking for. It might
            have been moved or doesn&apos;t exist.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 focus-visible:ring-ring inline-flex h-11 items-center justify-center gap-2 rounded-full px-8 font-medium shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/lyrics"
            className="border-primary/30 bg-background ring-offset-background hover:bg-primary/10 focus-visible:ring-ring inline-flex h-11 items-center justify-center gap-2 rounded-full border px-8 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <Search size={18} />
            Find Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
}
