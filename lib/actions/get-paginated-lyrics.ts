import { cacheLife, cacheTag } from "next/cache";
import { Prisma } from "../generated/prisma/client";
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
  "use cache";
  cacheLife("minutes");
  cacheTag("lyrics", `lyrics-page-${page}-${sortBy}`);

  const currentPage = Math.max(1, page);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const { SortOrder } = Prisma;

  const orderBy = {
    popular: { views: SortOrder.desc },
    recent: { updatedAt: SortOrder.desc },
    alphabetical: { title: SortOrder.asc },
  };

  const totalSongs = await prisma.song.count({
    where: {
      lyricId: { not: null },
    },
  });

  const totalPages = Math.ceil(totalSongs / ITEMS_PER_PAGE);

  const songs = await prisma.song.findMany({
    where: {
      lyricId: { not: null },
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
}
