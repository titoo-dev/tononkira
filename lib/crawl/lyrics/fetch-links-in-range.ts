import { SongData } from "../types";
import { fetchLyricsPage } from "./fetch-lyrics-page";
import { parseSongList } from "./parse-song-list";

/**
 * Fetches links within a specified range of pages
 * @param start Starting page number
 * @param end Ending page number
 * @returns Array of link data objects
 */
export const fetchLinksInRange = async (
  start: number,
  end: number,
): Promise<SongData[]> => {
  const allData: SongData[] = [];
  console.log(`🔍 Fetching lyrics from pages ${start} to ${end}`);

  for (let i = start; i <= end; i += 5) {
    const pageNumbers = Array.from(
      { length: Math.min(5, end - i + 1) },
      (_, idx) => i + idx,
    );
    console.log(`📑 Processing batch: pages ${pageNumbers.join(", ")}`);

    const chunks = await Promise.all(
      pageNumbers.map(async (pageNum) => {
        return fetchLyricsPage(pageNum);
      }),
    );

    // Process each chunk sequentially due to async parsing
    for (let j = 0; j < chunks.length; j++) {
      const pageNum = pageNumbers[j];
      console.log(`🎵 Parsing songs from page ${pageNum}`);
      const links = await parseSongList(chunks[j]);
      console.log(`✅ Found ${links.length} songs on page ${pageNum}`);
      allData.push(...links);
    }

    console.log(`📊 Progress: Collected ${allData.length} songs so far`);
  }

  console.log(`🎉 Total songs collected: ${allData.length}`);
  return allData;
};
