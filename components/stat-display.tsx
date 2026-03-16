import { formatNumber } from "@/lib/utils";
import { getArtistsCount } from "../lib/actions/get-artists-count";
import { getLyricsCount } from "../lib/actions/get-lyrics-count";
import { connection } from "next/server";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="bg-muted/60 flex flex-col items-center justify-center rounded-xl p-3 gap-0.5">
    <span className="text-foreground text-lg font-bold leading-tight">{value}</span>
    <span className="text-muted-foreground text-xs">{label}</span>
  </div>
);

export async function StatsDisplay() {
  await connection();
  // Fetch stats data in parallel
  const [artistsCount, lyricsCount] = await Promise.all([
    getArtistsCount(),
    getLyricsCount(),
  ]);

  const stats = [
    { value: formatNumber(artistsCount), label: "Artists" },
    { value: formatNumber(lyricsCount), label: "Songs" },
    { value: "Fast", label: "Search" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 pt-8">
      {stats.map((stat, index) => (
        <StatItem value={stat.value} label={stat.label} key={index} />
      ))}
    </div>
  );
}
