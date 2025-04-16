import { prisma } from "../prisma";

export type LatestSongWithLyrics = {
  id: number;
  title: string;
  slug: string;
  views: number | null;
  updatedAt: Date;
  lyric: {
    id: number;
    content: string;
    contentText: string | null;
    language: string;
  } | null;
  album: {
    title: string;
    coverUrl: string | null;
  } | null;
  artists: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
  }[];
};

/**
 * Fetches the 5 most recently updated songs with their lyrics, album, and artist information
 * @returns Promise containing an array of the latest songs with their related data
 */
export async function getLatestSongs(): Promise<LatestSongWithLyrics[]> {
  try {
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
        lyric: {
          select: {
            id: true,
            content: true,
            contentText: true,
            language: true,
          },
        },
        album: {
          select: {
            title: true,
            coverUrl: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
          },
        },
      },
    });

    return latestSongs;
  } catch (error) {
    console.error("Failed to fetch latest songs:", error);
    throw new Error("Failed to fetch latest songs");
  } finally {
    await prisma.$disconnect();
  }
}
