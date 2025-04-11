import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="flex flex-col gap-16 md:flex-row md:items-center">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-5xl leading-tight font-bold tracking-tight text-transparent lg:text-6xl lg:leading-[1.2] xl:leading-[1.3]">
              <span>Tononkira</span>{" "}
              <span className="font-medium">malagasy</span>
            </h1>
            <p className="text-muted-foreground max-w-md text-xl leading-relaxed">
              Discover and explore Malagasy song lyrics from your favorite
              artists in one place.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="shadow-primary/20 rounded-full font-medium shadow-lg"
            >
              Find Lyrics
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 hover:bg-primary/10 rounded-full"
            >
              Popular Songs
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-8">
            <div className="bg-muted flex items-center justify-center rounded-lg p-3">
              <span className="text-sm font-medium">10K+ Lyrics</span>
            </div>
            <div className="bg-muted flex items-center justify-center rounded-lg p-3">
              <span className="text-sm font-medium">500+ Artists</span>
            </div>
            <div className="bg-muted flex items-center justify-center rounded-lg p-3">
              <span className="text-sm font-medium">Easy Search</span>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-br blur-xl"></div>
            <div className="bg-card absolute inset-4 flex items-center justify-center rounded-2xl border p-6 shadow-xl backdrop-blur-md">
              <div className="relative h-full w-full">
                <div className="absolute inset-x-0 top-0 flex h-2/5 flex-col items-center justify-center space-y-2">
                  <div className="bg-accent/30 h-2 w-3/4 rounded-full"></div>
                  <div className="bg-primary/40 h-2 w-2/3 rounded-full"></div>
                  <div className="bg-secondary/40 h-2 w-1/2 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-muted relative flex h-20 w-20 items-center justify-center rounded-full">
                    <div className="border-t-primary absolute inset-0 animate-spin rounded-full border-4 border-r-transparent border-b-transparent border-l-transparent"></div>
                    <div className="bg-background flex h-14 w-14 items-center justify-center rounded-full">
                      <span className="text-2xl">♪</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex h-2/5 flex-col items-center justify-center space-y-2">
                  <div className="bg-secondary/40 h-2 w-1/2 rounded-full"></div>
                  <div className="bg-primary/40 h-2 w-2/3 rounded-full"></div>
                  <div className="bg-accent/30 h-2 w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary/30 absolute -right-4 bottom-8 h-24 w-24 rounded-full blur-xl"></div>
          <div className="bg-accent/30 absolute top-8 -left-4 h-24 w-24 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* featured lyrics */}
      <section className="py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Featured Lyrics</h2>
          <Button variant="ghost" className="text-sm">
            View all
          </Button>
        </div>

        <div className="relative -mx-4 px-4">
          <div className="overflow-hidden pb-6">
            <div className="animate-marquee hover:pause flex space-x-6">
              {Array.from({ length: 10 }).map((_, i) => {
                const colors = [
                  "bg-primary/10",
                  "bg-secondary/10",
                  "bg-accent/10",
                  "bg-muted",
                ];
                const randomColor =
                  colors[Math.floor(Math.random() * colors.length)];

                return (
                  <div
                    key={i}
                    className={`${randomColor} flex min-w-[280px] flex-col rounded-xl border p-4 shadow-sm transition-all hover:shadow-md`}
                  >
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="bg-foreground/10 flex h-10 w-10 items-center justify-center rounded-md">
                        <span className="text-lg">♪</span>
                      </div>
                      <div>
                        <h3 className="leading-none font-medium">
                          Song Title {i + 1}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          Artist Name
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-foreground/10 h-2 w-full rounded-full"></div>
                      <div className="bg-foreground/10 h-2 w-4/5 rounded-full"></div>
                      <div className="bg-foreground/10 h-2 w-3/5 rounded-full"></div>
                    </div>
                    <Link href="/lyrics" className="mt-4 self-end">
                      <Button variant="ghost" size="sm">
                        View lyrics
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent"></div>
        </div>
      </section>
    </main>
  );
}
