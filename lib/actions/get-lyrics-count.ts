import { prisma } from "../prisma";

/**
 * Counts the total number of lyrics in the database
 * @returns Promise containing the total count of lyrics
 */
export async function getLyricsCount(): Promise<number> {
  try {
    const count = await prisma.lyric.count();
    return count;
  } catch (error) {
    console.error("Failed to count lyrics:", error);
    throw new Error("Failed to count lyrics");
  } finally {
    await prisma.$disconnect();
  }
}
