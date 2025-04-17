import Link from "next/link";
import { Button } from "../ui/button";
import { RelatedSongItem } from "./related-song-item";

// Related songs component
export const RelatedSongs = ({
  artistName,
  artistSlug,
}: {
  artistName: string;
  artistSlug: string;
}) => (
  <div className="space-y-5 pt-4">
    <h3 className="text-foreground/90 text-lg font-semibold">
      More from {artistName}
    </h3>
    <div className="space-y-2">
      {/* This would be populated from a separate API call to get more songs by this artist */}
      <RelatedSongItem title="Loading..." />
    </div>
    <Button variant="outline" className="w-full" asChild>
      <Link href={`/artist/${artistSlug}`}>See all songs by {artistName}</Link>
    </Button>
  </div>
);
