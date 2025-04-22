import { Prisma } from "../generated/prisma";
import { prisma } from "../prisma";

const ITEMS_PER_PAGE = 12;

export type SortOption = "popular" | "recent" | "alphabetical";

export type PaginatedLyricsResult = {
  songs: {
    id: number;
    title: string;
    slug: string;
    views: number | null;
    updatedAt: Date;
    lyric: {
      id: number;
      language: string;
    } | null;
    artists: {
      id: number;
      name: string;
      slug: string;
      imageUrl: string | null;
    }[];
  }[];
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
};

/**
 * Fetches paginated songs with their lyrics, album, and artist information
 * @param page The page number to fetch (starting from 1)
 * @param sortBy How to sort the results: by popularity, recency, or alphabetically
 * @returns Promise containing paginated songs with related data and pagination metadata
 */
export async function getPaginatedLyrics(
  page: number = 1,
  sortBy: SortOption = "popular",
): Promise<PaginatedLyricsResult> {
  try {
    // Ensure page is at least 1
    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    // Use the SortOrder enum from Prisma
    const { SortOrder } = Prisma;

    // Define ordering based on sort option
    const orderBy = {
      popular: { views: SortOrder.desc },
      recent: { updatedAt: SortOrder.desc },
      alphabetical: { title: SortOrder.asc },
    };

    // Count total songs for pagination
    const totalSongs = await prisma.song.count({
      where: {
        lyricId: { not: null }, // Only songs with lyrics
      },
    });

    const totalPages = Math.ceil(totalSongs / ITEMS_PER_PAGE);

    // Fetch songs with pagination
    const songs = await prisma.song.findMany({
      where: {
        lyricId: { not: null }, // Only songs with lyrics
      },
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: orderBy[sortBy],
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        updatedAt: true,
        lyric: {
          select: {
            id: true,
            language: true,
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

    return {
      songs,
      totalPages,
      currentPage,
      hasMore: currentPage < totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch paginated lyrics:", error);
    throw new Error("Failed to fetch paginated lyrics");
  } finally {
    await prisma.$disconnect();
  }
}
