import * as cheerio from "cheerio";

/**
 * Fetches the HTML content of a specific song lyrics page
 * @param url URL of the lyrics page to fetch
 * @returns Cheerio object containing the parsed HTML
 */
export const fetchLyricsContentPage = async (
  url: string,
): Promise<cheerio.CheerioAPI> => {
  console.log(`🔍 Fetching lyrics content from: ${url}`);

  try {
    const response = await fetch(url, { headers: { accept: "text/html" } });

    if (!response.ok) {
      console.error(
        `⚠️ Failed to fetch lyrics from ${url}: HTTP ${response.status}`,
      );
      throw new Error(`Failed to fetch lyrics: HTTP ${response.status}`);
    }

    const pageText = await response.text();
    return cheerio.load(pageText);
  } catch (error) {
    console.error(`❌ Error fetching lyrics from ${url}:`, error);
    throw error;
  }
};
