"use client";

import { useState } from "react";
import { Heart, Share2, Check } from "lucide-react";
import { Button } from "../ui/button";

export const ActionButtons = () => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleLike() {
    setLiked((prev) => !prev);
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Fallback for browsers that don't support clipboard API
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        size="sm"
        variant="outline"
        className={`rounded-full transition-all duration-200 ${
          liked
            ? "border-rose-400 bg-rose-50 text-rose-500 dark:bg-rose-950/30"
            : "hover:border-rose-300 hover:text-rose-500"
        }`}
        onClick={handleLike}
        aria-pressed={liked}
        aria-label={liked ? "Retirer le like" : "Aimer cette chanson"}
      >
        <Heart
          className={`mr-2 h-4 w-4 transition-all duration-200 ${
            liked ? "fill-rose-500 text-rose-500 scale-110" : "scale-100"
          }`}
        />
        {liked ? "Aimé" : "Like"}
      </Button>

      <Button
        size="sm"
        variant="outline"
        className={`rounded-full transition-all duration-200 ${
          copied
            ? "border-green-400 bg-green-50 text-green-600 dark:bg-green-950/30"
            : ""
        }`}
        onClick={handleShare}
        aria-label={copied ? "Lien copié !" : "Partager cette chanson"}
      >
        {copied ? (
          <Check className="mr-2 h-4 w-4 text-green-600" />
        ) : (
          <Share2 className="mr-2 h-4 w-4" />
        )}
        {copied ? "Copié !" : "Share"}
      </Button>
    </div>
  );
};
