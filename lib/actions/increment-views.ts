import { prisma } from "../prisma";

/**
 * Increments the view count for a song by ID.
 * Intended to be called inside next/server `after()` for deferred execution.
 */
export async function incrementSongViews(songId: number): Promise<void> {
  await prisma.song.update({
    where: { id: songId },
    data: { views: { increment: 1 } },
  });
}
