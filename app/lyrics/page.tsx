import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, ChevronRight, Disc, CalendarIcon, Users } from "lucide-react";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const dynamic = "force-dynamic";

// Header component
interface HeaderProps {
  title: string;
  description: string;
}

function Header({ title, description }: HeaderProps) {
  return (
    <div className="mb-10 space-y-3">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground max-w-2xl text-lg">{description}</p>
    </div>
  );
}

// Tab navigation components
interface TabNavProps {
  defaultValue: string;
}

function TabNav({ defaultValue }: TabNavProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <div className="mb-6 flex items-center justify-between border-b">
        <TabsList className="h-12 bg-transparent">
          <CustomTab
            value="popular"
            icon={<Disc className="h-4 w-4" />}
            label="Popular"
            colorClass="primary"
          />
          <CustomTab
            value="recent"
            icon={<CalendarIcon className="h-4 w-4" />}
            label="Recent"
            colorClass="secondary"
          />
          <CustomTab
            value="alphabetical"
            icon={<Users className="h-4 w-4" />}
            label="A-Z"
            colorClass="accent"
          />
        </TabsList>

        <ViewSelector />
      </div>

      <LyricsTabContent
        value="popular"
        colorMapping={(i) =>
          i % 3 === 0 ? "primary" : i % 3 === 1 ? "secondary" : "accent"
        }
      />
      <LyricsTabContent
        value="recent"
        colorMapping={(i) =>
          i % 3 === 0 ? "accent" : i % 3 === 1 ? "primary" : "secondary"
        }
      />
      <LyricsTabContent
        value="alphabetical"
        colorMapping={(i) =>
          i % 3 === 0 ? "secondary" : i % 3 === 1 ? "accent" : "primary"
        }
        titleMapping={(i) => `Song ${String.fromCharCode(65 + i)} Title`}
      />
    </Tabs>
  );
}

interface CustomTabProps {
  value: string;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
}

function CustomTab({ value, icon, label, colorClass }: CustomTabProps) {
  return (
    <TabsTrigger
      value={value}
      className={`data-[state=active]:border-${colorClass} h-12 rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:shadow-none`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    </TabsTrigger>
  );
}

function ViewSelector() {
  return (
    <Select defaultValue="grid">
      <SelectTrigger className="border-muted w-[120px] bg-transparent">
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="grid">Grid View</SelectItem>
        <SelectItem value="list">List View</SelectItem>
      </SelectContent>
    </Select>
  );
}

interface LyricsTabContentProps {
  value: string;
  colorMapping: (index: number) => "primary" | "secondary" | "accent";
  titleMapping?: (index: number) => string;
}

function LyricsTabContent({
  value,
  colorMapping,
  titleMapping,
}: LyricsTabContentProps) {
  return (
    <TabsContent value={value} className="mt-0 space-y-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LyricCard
            key={i}
            title={
              titleMapping
                ? titleMapping(i)
                : `${value.charAt(0).toUpperCase() + value.slice(1)} Song ${i + 1}`
            }
            artist={`Artist ${(i % 5) + 1}`}
            year={
              value === "recent"
                ? 2020 + (i % 4)
                : value === "popular"
                  ? 2010 + (i % 13)
                  : 2000 + (i % 23)
            }
            color={colorMapping(i)}
          />
        ))}
      </div>
    </TabsContent>
  );
}

// Load more button component
function LoadMoreButton() {
  return (
    <div className="flex items-center justify-center py-6">
      <Button
        variant="outline"
        className="border-primary/20 gap-2 rounded-full px-6"
      >
        Load More <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Main page component
export default async function LyricsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Header
        title="Lyrics Collection"
        description="Explore our collection of Malagasy song lyrics. Use the filters below to discover songs by artist, genre, or release year."
      />

      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-semibold">Browse Lyrics</h2>
        <TabNav defaultValue="popular" />
      </div>

      <LoadMoreButton />
    </main>
  );
}

interface LyricCardProps {
  title: string;
  artist: string;
  year: number;
  color: "primary" | "secondary" | "accent";
}

function LyricCard({ title, artist, year, color }: LyricCardProps) {
  const colorClasses = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    accent: "bg-accent/10",
  };

  return (
    <div
      className={`${colorClasses[color]} hover:ring-ring/30 group flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-foreground/10 flex h-11 w-11 items-center justify-center rounded-md">
          <Music className="text-foreground/80 h-5 w-5" />
        </div>
        <div>
          <h3 className="text-foreground/90 leading-tight font-medium">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs">{artist}</p>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Released</span>
          <span className="font-medium">{year}</span>
        </div>
        <div className="bg-foreground/10 h-2 w-full rounded-full">
          <div
            className="bg-foreground/20 h-2 rounded-full"
            style={{ width: `${((year % 10) / 10 + 0.3) * 100}%` }}
          ></div>
        </div>
      </div>

      <Link
        href={`/lyrics/${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="mt-5 block w-full"
      >
        <Button
          variant="ghost"
          size="sm"
          className="group-hover:text-primary mt-auto self-end transition-colors"
          aria-label="View lyrics"
        >
          View lyrics
          <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}
