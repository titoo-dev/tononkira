import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "../prisma";

/**
 * Counts the total number of artists in the database
 * @returns Promise containing the total count of artists
 */
export async function getArtistsCount(): Promise<number> {
  "use cache";
  cacheLife("hours");
  cacheTag("artists-count");

  const uniqueArtists = await prisma.artist.groupBy({
    by: ["slug"],
    _count: {
      _all: true,
    },
  });

  return uniqueArtists.length;
}
