import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <header className="border-border bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
        <div className="container mx-auto py-3">
          {/* Top section with logo and search */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/brand.png"
                alt="MARTILO AUDIO"
                width={200}
                height={200}
                className="h-32 w-auto"
                priority
              />
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-[250px] rounded-md border px-3 py-1 pl-10 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
              <Button size="icon" variant="outline" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>

          {/* Navigation bar below */}
          <nav className="mt-3 hidden items-center justify-between md:flex">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Sign In
              </Button>
            </div>
            <div className="flex">
              {["Home", "Music", "Tour", "Gallery", "About"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="group relative px-3 py-2 transition-colors"
                >
                  <span className="group-hover:text-primary relative z-10 text-sm font-medium transition-colors">
                    {item}
                  </span>
                  <span className="bg-muted absolute inset-0 scale-0 rounded-md transition-transform duration-150 ease-out group-hover:scale-100" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-6">
        {/* Content would go here */}
      </main>
    </div>
  );
}
