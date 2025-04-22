"use client";

import { fixLyricsWithAI } from "@/lib/actions/fix-lyrics-with-ai";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";

// FixWithAIButton component
interface FixWithAIButtonProps {
  className?: string;
  lyricId?: number;
}

export const FixWithAIButton: React.FC<FixWithAIButtonProps> = ({
  className,
  lyricId,
}) => {
  const { artist, slug } = useParams<{
    artist: string;
    slug: string;
  }>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFixLyrics = async () => {
    if (!lyricId || !artist || !slug) {
      toast.error("Cannot fix lyrics due to missing data", {
        description: "Missing information",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await fixLyricsWithAI(lyricId, artist, slug);

      if (result.success) {
        toast.success(result.message);
        // Stop loading animation on success
        setIsLoading(false);
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      const errorMessage =
        process.env.NODE_ENV === "production"
          ? "Failed to fix lyrics. Please try again later."
          : `Failed to fix lyrics: ${(error as Error).message}`;

      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`text-primary relative overflow-hidden ${className || ""}`}
      onClick={handleFixLyrics}
      disabled={isLoading || !lyricId}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Enhancing...</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Fix with AI</span>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <motion.div
          className="bg-primary/10 absolute inset-0"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      )}
    </Button>
  );
};
