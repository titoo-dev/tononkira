import { prisma } from "../prisma";

/**
 * Searches songs, artists, and lyrics by a query string.
 * @param query The search term.
 * @returns An object containing matched songs, artists, and lyrics.
 */
export async function search(query: string) {
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
      include: {
        _count: {
          select: { songs: true },
        },
      },
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
            artists: { select: { id: true, name: true } },
          },
        },
      },
      take: 5,
    }),
  ]);

  // Transform the results to match the expected interface in SearchResultSection
  return {
    songs: songs.map((song) => ({
      id: String(song.id),
      title: song.title,
      // Join artist names with commas to display them together
      artist: song.artists.map((a) => a.name).join(", ") || "Unknown Artist",
      slug: song.slug,
    })),
    artists: artists.map((artist) => ({
      id: String(artist.id),
      name: artist.name,
      songCount: artist._count.songs,
      slug: artist.slug,
    })),
    lyrics: lyrics.map((lyric) => ({
      id: String(lyric.id),
      songTitle: lyric.song?.title || "Unknown Song",
      // Join artist names with commas to display them together
      artist:
        lyric.song?.artists.map((a) => a.name).join(", ") || "Unknown Artist",
      content:
        lyric.content.substring(0, 100) +
        (lyric.content.length > 100 ? "..." : ""),
    })),
  };
}
