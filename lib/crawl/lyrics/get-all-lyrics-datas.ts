import { SongData } from "../types";
import { fetchLinksInRange } from "./fetch-links-in-range";
import { fetchLyricsPage } from "./fetch-lyrics-page";
import { getTotalLyricsPages } from "./get-total-lyrics-pages";

/**
 * Gets all lyrics links within a specified range of pages
 * @param start Starting page number (defaults to 1)
 * @param end Ending page number (defaults to the total number of pages)
 * @returns Promise resolving to an array of link data objects
 */
export const getAllLyricsDatas = async (
  start: number = 1,
  end: number = Infinity,
): Promise<SongData[]> => {
  console.log(
    `🚀 Starting getAllLyricsLinks: pages ${start} to ${end === Infinity ? "max" : end}`,
  );

  const $ = await fetchLyricsPage(1);
  const totalPages = getTotalLyricsPages($);

  const rangeStart = Math.max(1, start);
  const rangeEnd = Math.min(totalPages, end);
  console.log(
    `🔍 Fetching pages ${rangeStart} to ${rangeEnd} (out of ${totalPages} total)`,
  );

  if (rangeStart > rangeEnd) {
    console.warn(
      "⚠️ Invalid range: start page exceeds end page or total pages",
    );
    return [];
  }

  return await fetchLinksInRange(rangeStart, rangeEnd);
};
