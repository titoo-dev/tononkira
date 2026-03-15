import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "../prisma";

/**
 * Counts the total number of lyrics in the database
 * @returns Promise containing the total count of lyrics
 */
export async function getLyricsCount(): Promise<number> {
  "use cache";
  cacheLife("hours");
  cacheTag("songs-count");

  const count = await prisma.lyric.count();
  return count;
}
