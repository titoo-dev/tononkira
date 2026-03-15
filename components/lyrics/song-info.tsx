import { Eye } from "lucide-react";
import { ActionButtons } from "./action-buttons";

// Song header info component
export const SongInfo = ({
  title,
  artists,
  views,
}: {
  title: string;
  artists: Array<{ name: string; slug: string; id: number }>;
  views: number | null;
}) => (
  <div className="space-y-5">
    <div>
      <h1 className="text-foreground/90 mb-2 text-3xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-foreground/70 text-xl">
        {artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>

    <div className="text-muted-foreground flex items-center gap-5 text-sm">
      <div className="flex items-center gap-1.5">
        <span aria-hidden="true">
          <Eye className="h-4 w-4" />
        </span>
        <span>{views?.toLocaleString() || 0} views</span>
      </div>
    </div>

    <ActionButtons />
  </div>
);
