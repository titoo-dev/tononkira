import * as cheerio from "cheerio";

const BASE_URL = "https://tononkira.serasera.org";
const LYRICS_LIST_URL = `${BASE_URL}/tononkira`;

export interface LinkData {
  artist: { name: string; url: string };
  song: { title: string; url: string };
}

export interface LyricsData {
  content: string;
}
/**
 * Fetches the HTML content of a lyrics page
 * @param page Page number to fetch
 * @returns Cheerio object containing the parsed HTML
 */
const fetchLyricsPage = async (page: number): Promise<cheerio.CheerioAPI> => {
  const url = new URL(LYRICS_LIST_URL);
  url.searchParams.set("page", page.toString());
  const pageText = await fetch(url, { headers: { accept: "text/html" } }).then(
    (res) => res.text(),
  );
  return cheerio.load(pageText);
};

export const fetchLyricsContentPage = async (
  url: string,
): Promise<cheerio.CheerioAPI> => {
  const pageText = await fetch(url, { headers: { accept: "text/html" } }).then(
    (res) => res.text(),
  );
  return cheerio.load(pageText);
};

/**
 * Extracts the total number of pages from the pagination
 * @param $ Cheerio object containing the parsed HTML
 * @returns Total number of pages
 */
const getTotalLyricsPages = ($: cheerio.CheerioAPI): number => {
  const totalPageElement = $("[aria-label='Farany']");
  if (!totalPageElement.length) return 1;

  const href = totalPageElement.attr("href");
  if (!href) return 1;

  const pageParam = new URL(href).searchParams.get("page");
  return pageParam ? parseInt(pageParam, 10) || 1 : 1;
};

/**
 * Parses lyrics links from a page
 * @param $ Cheerio object containing the parsed HTML
 * @returns Array of link data objects
 */
const parseLyricsLinks = ($: cheerio.CheerioAPI): LinkData[] => {
  const links: LinkData[] = [];

  $("#main div")
    .filter((_, div) => $(div).hasClass("border p-2 mb-3"))
    .each((_, div) => {
      const titleElement = $(div).find(`a[href^="${BASE_URL}/hira"]`).eq(0);
      const artistElement = $(div).find(`a[href^="${BASE_URL}/mpihira"]`).eq(0);

      const title = titleElement.text().trim();
      const artist = artistElement.text().trim();

      links.push({
        artist: {
          name: artist || "",
          url: artistElement.attr("href") || "",
        },
        song: {
          title: title || "",
          url: titleElement.attr("href") || "",
        },
      });
    });

  return links;
};
/**
 * Extracts the lyrics content from a song page
 * @param $ Cheerio object containing the parsed HTML of the song page
 * @returns The lyrics content as a string
 */
export const parseLyricsContent = ($: cheerio.CheerioAPI): LyricsData => {
  // Find the lyrics container which is in the first column of the main content area
  const mainContentColumn = $("#main .col-md-8").first();

  // Get all text nodes and elements between the h2 title and the "Rohy:" section
  let lyricsContent = "";

  // Clone the content to avoid modifying the original
  const contentClone = mainContentColumn.clone();

  // Remove the title, edit link, print info, and permalink sections
  contentClone.find("h2").remove();
  contentClone.find(".text-end").remove();
  contentClone.find(".print").remove();
  contentClone.find(".mw-100").remove();
  contentClone.find(".no-print").remove();

  // Get the remaining HTML content and clean it up
  lyricsContent = contentClone.html() || "";

  // Further clean up: remove any leading/trailing whitespace or divs
  lyricsContent = lyricsContent
    .trim()
    .replace(/<div.*?>(.*?)<\/div>/g, "$1") // Replace div tags with their content
    .replace(/<br\s*\/?>/g, "\n") // Convert <br> to newlines
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with spaces
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove any remaining HTML tags
    .replace(/\n{3,}/g, "\n\n") // Replace multiple newlines with just two
    .trim();

  return { content: lyricsContent };
};

/**
 * Fetches links within a specified range of pages
 * @param start Starting page number
 * @param end Ending page number
 * @returns Array of link data objects
 */
const fetchLinksInRange = async (
  start: number,
  end: number,
): Promise<LinkData[]> => {
  const allData: LinkData[] = [];

  for (let i = start; i <= end; i += 5) {
    const pageNumbers = Array.from(
      { length: Math.min(5, end - i + 1) },
      (_, idx) => i + idx,
    );

    const chunks = await Promise.all(pageNumbers.map(fetchLyricsPage));
    chunks.forEach(($) => allData.push(...parseLyricsLinks($)));
  }

  return allData;
};

/**
 * Gets all lyrics links within a specified range of pages
 * @param start Starting page number (defaults to 1)
 * @param end Ending page number (defaults to the total number of pages)
 * @returns Promise resolving to an array of link data objects
 */
export const getAllLyricsLinks = async (
  start: number = 1,
  end: number = Infinity,
): Promise<LinkData[]> => {
  const $ = await fetchLyricsPage(1);
  const totalPages = getTotalLyricsPages($);

  const rangeStart = Math.max(1, start);
  const rangeEnd = Math.min(totalPages, end);

  return fetchLinksInRange(rangeStart, rangeEnd);
};
