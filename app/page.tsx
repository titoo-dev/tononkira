import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container mx-auto py-12">
      <section className="flex flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Welcome to Tononkira
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover the latest music from your favorite artists and explore
              new sounds.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Explore Music
            </Button>
            <Button variant="outline" size="lg" className="border-2">
              Latest Releases
            </Button>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="from-accent/30 to-primary/30 dark:from-accent/20 dark:to-primary/20 aspect-square rounded-full bg-gradient-to-br p-1">
            <div className="bg-muted flex h-full w-full items-center justify-center overflow-hidden rounded-full">
              <svg
                className="text-muted-foreground h-1/2 w-1/2 opacity-80"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
              </svg>
            </div>
          </div>
          <div className="bg-primary/20 absolute -right-4 -bottom-4 h-24 w-24 rounded-full blur-xl"></div>
          <div className="bg-accent/20 absolute -top-4 -left-4 h-24 w-24 rounded-full blur-xl"></div>
        </div>
      </section>
    </main>
  );
}
