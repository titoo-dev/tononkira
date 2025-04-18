import { prisma } from "../prisma";

/**
 * Searches songs, artists, and lyrics by a query string.
 * @param query The search term.
 * @returns An object containing matched songs, artists, and lyrics.
 */
export async function instantSearch(query: string) {
  if (!query || query.length < 2) return { songs: [], artists: [], lyrics: [] };

  const [songs, artists, lyrics] = await Promise.all([
    prisma.song.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          {
            artists: {
              some: { name: { contains: query, mode: "insensitive" } },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        artists: { select: { id: true, name: true, slug: true } },
      },
      take: 5,
    }),
    prisma.artist.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      select: { id: true, name: true, slug: true },
      take: 5,
    }),
    prisma.lyric.findMany({
      where: {
        OR: [
          { content: { contains: query, mode: "insensitive" } },
          { contentText: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        content: true,
        song: {
          select: {
            title: true,
            slug: true,
            artists: { select: { name: true, slug: true } },
          },
        },
      },
      take: 5,
    }),
  ]);

  return { songs, artists, lyrics };
}
