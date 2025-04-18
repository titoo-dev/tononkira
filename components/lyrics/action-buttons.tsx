import { Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";

// Action buttons component
export const ActionButtons = () => (
  <div className="flex flex-wrap gap-3">
    <Button size="sm" variant="outline" className="rounded-full">
      <Heart className="mr-2 h-4 w-4" /> Like
    </Button>
    <Button size="sm" variant="outline" className="rounded-full">
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
  </div>
);
