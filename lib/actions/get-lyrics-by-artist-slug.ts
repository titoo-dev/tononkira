import { prisma } from "../prisma";

export type SongByArtistSlug = {
  id: number;
  title: string;
  slug: string;
  views: number | null;
  createdAt: Date;
  artists: {
    id: number;
    name: string;
    slug: string;
  }[];
};

/**
 * Retrieves an artist and all their songs with lyrics information by artist slug
 * @param artistSlug - The unique slug identifier of the artist
 * @returns Promise containing the artist data with their songs or null if not found
 */
export async function getLyricsByArtistSlug(
  artistSlug: string,
): Promise<SongByArtistSlug[] | null> {
  try {
    if (!artistSlug) {
      throw new Error("Artist slug parameter is required");
    }

    const songs = await prisma.song.findMany({
      take: 10,
      where: {
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
        createdAt: true,
        artists: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    });

    if (!songs) {
      return null;
    }

    return songs;
  } catch (error) {
    console.error(
      `Failed to fetch lyrics for artist with slug ${artistSlug}:`,
      error,
    );
    throw new Error(
      `Failed to fetch artist lyrics: ${(error as Error).message}`,
    );
  } finally {
    await prisma.$disconnect();
  }
}
