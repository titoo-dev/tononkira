import { prisma } from "../prisma";

// filepath: C:/Users/titos/dev/tononkira/lib/actions/get-lyrics-by-slug.ts

export type SongWithLyricsDetail = {
  id: number;
  title: string;
  slug: string;
  views: number | null;
  trackNumber: number | null;
  createdAt: Date;
  updatedAt: Date;
  lyric: Lyric | null;
  artists: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    bio: string | null;
  }[];
};

export type Lyric = {
  id: number;
  content: string;
  contentText: string | null;
  language: string;
  isSynced: boolean;
  url: string;
};

/**
 * Retrieves a song with its lyrics, album, and artist information by slug
 * @param slug - The unique slug identifier of the song
 * @returns Promise containing the song data with its related information or null if not found
 */
export async function getLyricsBySlug(
  artistSlug: string,
  songSlug: string,
): Promise<SongWithLyricsDetail | null> {
  try {
    if (!artistSlug || !songSlug) {
      throw new Error("Both artist slug and song slug parameters are required");
    }

    const song = await prisma.song.findFirst({
      where: {
        slug: songSlug,
        artists: {
          some: {
            slug: artistSlug,
          },
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        trackNumber: true,
        createdAt: true,
        updatedAt: true,
        lyric: {
          select: {
            id: true,
            content: true,
            contentText: true,
            language: true,
            isSynced: true,
            url: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
            bio: true,
          },
        },
      },
    });

    return song;
  } catch (error) {
    console.error(
      `Failed to fetch lyrics for artist ${artistSlug}, song ${songSlug}:`,
      error,
    );
    throw new Error(`Failed to fetch lyrics: ${(error as Error).message}`);
  } finally {
    await prisma.$disconnect();
  }
}
