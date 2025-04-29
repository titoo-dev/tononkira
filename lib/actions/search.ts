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
      take: 10,
    }),
    prisma.artist.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      include: {
        _count: {
          select: { songs: true },
        },
      },
      take: 10,
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
        contentText: true,
        song: {
          select: {
            title: true,
            artists: { select: { id: true, name: true } },
          },
        },
      },
      take: 10,
    }),
  ]);

  // Helper function to extract content surrounding the match
  const extractMatchContext = (content: string, searchTerm: string): string => {
    const contentLower = content.toLowerCase();
    const queryLower = searchTerm.toLowerCase();
    const matchIndex = contentLower.indexOf(queryLower);

    if (matchIndex >= 0) {
      // Get context around the match (30 characters before and after)
      const startPos = Math.max(0, matchIndex - 30);
      const endPos = Math.min(
        content.length,
        matchIndex + searchTerm.length + 30,
      );

      return (
        (startPos > 0 ? "..." : "") +
        content.substring(startPos, endPos) +
        (endPos < content.length ? "..." : "")
      );
    }

    // If no exact match found, return first 100 characters
    return content.substring(0, 100) + (content.length > 100 ? "..." : "");
  };

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
      content: extractMatchContext(lyric.content, query),
      contentText: extractMatchContext(lyric.contentText!, query),
    })),
  };
}
