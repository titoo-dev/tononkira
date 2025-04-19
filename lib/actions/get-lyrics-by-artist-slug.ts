import { prisma } from "../prisma";

export type ArtistWithSongs = {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  url: string | null;
  imageUrl: string | null;
  songs: Song[];
};

export type Song = {
  id: number;
  title: string;
  slug: string;
  views: number | null;
  duration: number | null;
  trackNumber: number | null;
  album: {
    id: number;
    title: string;
    coverUrl: string | null;
  } | null;
  lyric: {
    id: number;
    language: string;
    isSynced: boolean;
  } | null;
};

/**
 * Retrieves an artist and all their songs with lyrics information by artist slug
 * @param artistSlug - The unique slug identifier of the artist
 * @returns Promise containing the artist data with their songs or null if not found
 */
export async function getLyricsByArtistSlug(
  artistSlug: string,
): Promise<ArtistWithSongs | null> {
  try {
    if (!artistSlug) {
      throw new Error("Artist slug parameter is required");
    }

    const artist = await prisma.artist.findFirst({
      where: {
        slug: artistSlug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        bio: true,
        url: true,
        imageUrl: true,
        songs: {
          select: {
            id: true,
            title: true,
            slug: true,
            views: true,
            duration: true,
            trackNumber: true,
            album: {
              select: {
                id: true,
                title: true,
                coverUrl: true,
              },
            },
            lyric: {
              select: {
                id: true,
                language: true,
                isSynced: true,
              },
            },
          },
          orderBy: [
            { album: { title: "asc" } },
            { trackNumber: "asc" },
            { title: "asc" },
          ],
        },
      },
    });

    if (!artist) {
      return null;
    }

    return artist;
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
