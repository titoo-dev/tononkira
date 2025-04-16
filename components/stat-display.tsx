import { formatNumber } from "@/lib/utils";
import { getArtistsCount } from "../lib/actions/get-artists-count";
import { getLyricsCount } from "../lib/actions/get-lyrics-count";

interface StatItemProps {
  label: string;
}

const StatItem = ({ label }: StatItemProps) => (
  <div className="bg-muted flex items-center justify-center rounded-lg p-3">
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export async function StatsDisplay() {
  // Fetch stats data in parallel
  const [artistsCount, lyricsCount] = await Promise.all([
    getArtistsCount(),
    getLyricsCount(),
  ]);

  const stats = [
    {
      label: `${formatNumber(artistsCount)} Artists`,
    },
    { label: `${formatNumber(lyricsCount)} Songs` },
    { label: "Easy Search" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 pt-8">
      {stats.map((stat, index) => (
        <StatItem label={stat.label} key={index} />
      ))}
    </div>
  );
}
