import * as cheerio from "cheerio";
import { LYRICS_LIST_URL } from "../main";

/**
 * Fetches the HTML content of a lyrics page
 * @param page Page number to fetch
 * @returns Cheerio object containing the parsed HTML
 */
export const fetchLyricsPage = async (
  page: number,
): Promise<cheerio.CheerioAPI> => {
  console.log(`🔍 Fetching lyrics page: ${page}`);

  try {
    const url = new URL(LYRICS_LIST_URL);
    url.searchParams.set("page", page.toString());

    const response = await fetch(url, { headers: { accept: "text/html" } });

    if (!response.ok) {
      console.error(`⚠️ Failed to fetch page ${page}: HTTP ${response.status}`);
      throw new Error(`Failed to fetch page ${page}: HTTP ${response.status}`);
    }

    const pageText = await response.text();
    return cheerio.load(pageText);
  } catch (error) {
    console.error(`❌ Error fetching page ${page}:`, error);
    throw error;
  }
};
