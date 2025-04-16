import { prisma } from "../prisma";

/**
 * Counts the total number of artists in the database
 * @returns Promise containing the total count of artists
 */
export async function getArtistsCount(): Promise<number> {
  try {
    // Count unique artists by grouping by name to avoid duplications
    const uniqueArtists = await prisma.artist.groupBy({
      by: ["slug"],
      _count: {
        _all: true,
      },
    });

    // Return the count of unique artist names
    return uniqueArtists.length;
  } catch (error) {
    console.error("Failed to count unique artists:", error);
    throw new Error("Failed to count unique artists");
  } finally {
    await prisma.$disconnect();
  }
}
