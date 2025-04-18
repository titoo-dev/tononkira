import Link from "next/link";
import { Button } from "../ui/button";
import { RelatedSongItem } from "./related-song-item";
import { ArtistWithSongs } from "@/lib/actions/get-lyrics-by-artist-slug";

type Props = {
  data: ArtistWithSongs;
};

// Related songs component
export const RelatedSongs = ({ data }: Props) => {
  return (
    <div className="max-w-sm space-y-5 pt-4">
      <h3 className="text-foreground/90 text-lg">
        <span className="font-bold">More from</span> {data.name}
      </h3>
      <div className="space-y-2">
        {/* This would be populated from a separate API call to get more songs by this artist */}
        {data.songs.map((song) => (
          <RelatedSongItem key={song.id} title={song.title} />
        ))}
      </div>
      <Button
        variant="outline"
        className="w-full truncate overflow-hidden text-start text-ellipsis whitespace-nowrap"
        asChild
      >
        <Link href={`/artist/${data.slug}`}>See all songs</Link>
      </Button>
    </div>
  );
};
