import { LyricCard } from "./lyric-card";
import { TabsContent } from "./ui/tabs";

interface LyricsTabContentProps {
  value: string;
  colorMapping: (index: number) => "primary" | "secondary" | "accent";
  titleMapping?: (index: number) => string;
}

export function LyricsTabContent({
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
