import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="flex flex-col gap-16 md:flex-row md:items-center">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent lg:text-6xl">
              Tononkira
            </h1>
            <p className="text-muted-foreground max-w-md text-xl">
              Your ultimate destination for musical discovery and lyrical
              inspiration.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="shadow-primary/20 rounded-full font-medium shadow-lg"
            >
              Explore Library
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 hover:bg-primary/10 rounded-full"
            >
              Latest Additions
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-8">
            <div className="bg-muted flex items-center justify-center rounded-lg p-3">
              <span className="text-sm font-medium">10K+ Songs</span>
            </div>
            <div className="bg-muted flex items-center justify-center rounded-lg p-3">
              <span className="text-sm font-medium">500+ Artists</span>
            </div>
            <div className="bg-muted flex items-center justify-center rounded-lg p-3">
              <span className="text-sm font-medium">24/7 Updates</span>
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
    </main>
  );
}
