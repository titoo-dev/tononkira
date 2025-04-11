import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <header className="border-border border-b">
        <div className="container mx-auto py-4">
          {/* Top section with logo and search */}
          <div className="mb-4 flex items-center justify-between">
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

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border py-2 pr-4 pl-10 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:w-[200px]"
                />
              </div>
              <Button size="sm" variant="outline" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation bar below */}
          <nav className="hidden w-full items-center justify-between md:flex">
            <div className="flex items-center space-x-4">
              <Button size="sm" className="text-sm font-medium">
                Subscribe
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Sign In
              </Button>
            </div>
            <div className="flex space-x-1">
              {["Home", "Music", "Tour", "Gallery", "About"].map((item) => (
                <Link key={item} href="#" className="group relative px-4 py-2">
                  <span className="group-hover:text-primary relative z-10 text-sm font-medium transition-colors">
                    {item}
                  </span>
                  <span className="bg-muted absolute inset-0 scale-0 rounded-md transition-transform duration-200 ease-out group-hover:scale-100" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
