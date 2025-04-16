import { prisma } from "../prisma";

// filepath: C:/Users/titos/dev/tononkira/lib/actions/get-lyrics-by-slug.ts

export type SongWithLyricsDetail = {
  id: number;
  title: string;
  slug: string;
  views: number | null;
  duration: number | null;
  trackNumber: number | null;
  createdAt: Date;
  updatedAt: Date;
  lyric: {
    id: number;
    content: string;
    contentText: string | null;
    language: string;
    isSynced: boolean;
    url: string;
  } | null;
  album: {
    id: number;
    title: string;
    coverUrl: string | null;
    releaseDate: Date | null;
  } | null;
  artists: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    bio: string | null;
  }[];
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
        duration: true,
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
        album: {
          select: {
            id: true,
            title: true,
            coverUrl: true,
            releaseDate: true,
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

    // Increment view count if the song exists
    if (song) {
      await prisma.song.update({
        where: { id: song.id },
        data: { views: { increment: 1 } },
      });

      // Return the updated view count
      song.views = (song.views || 0) + 1;
    }

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
