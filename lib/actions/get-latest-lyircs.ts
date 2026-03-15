import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "../prisma";

export type LatestSongWithLyrics = {
  id: number;
  title: string;
  slug: string;
  views: number | null;
  updatedAt: Date;
  artists: {
    id: number;
    name: string;
    slug: string;
  }[];
};

/**
 * Fetches the 5 most recently updated songs with their lyrics, album, and artist information
 * @returns Promise containing an array of the latest songs with their related data
 */
export async function getLatestSongs(): Promise<LatestSongWithLyrics[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("songs", "latest-songs");

  const latestSongs = await prisma.song.findMany({
    take: 5,
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      views: true,
      updatedAt: true,
      artists: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return latestSongs;
}
