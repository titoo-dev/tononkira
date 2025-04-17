import { Music2 } from "lucide-react";
import Image from "next/image";

// Song artwork component
export const SongArtwork = ({
  coverUrl,
  title,
}: {
  coverUrl: string | null;
  title: string;
}) => (
  <div className="bg-card relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border shadow-lg">
    {coverUrl ? (
      <Image
        src={coverUrl}
        alt={`${title} album cover`}
        className="h-full w-full object-cover"
      />
    ) : (
      <>
        <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 bg-gradient-to-br"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/80 flex h-24 w-24 items-center justify-center rounded-full backdrop-blur-sm">
            <Music2 className="text-foreground/90 h-6 w-6" />
          </div>
        </div>
      </>
    )}
  </div>
);
