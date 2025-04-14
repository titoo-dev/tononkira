import * as cheerio from "cheerio";

const BASE_URL = "https://tononkira.serasera.org";
const LYRICS_LIST_URL = `${BASE_URL}/tononkira`;

export interface LinkData {
  artist: { name: string; url: string };
  song: { title: string; url: string };
}

export interface LyricsData {
  content: ContentBlock[];
}

export interface ContentBlock {
  type: string;
  content: string[];
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

  // Clone the content to avoid modifying the original
  const contentClone = mainContentColumn.clone();

  // Remove the title, edit link, print info, and permalink sections
  contentClone.find("h2").remove();
  contentClone.find(".text-end").remove();
  contentClone.find(".print").remove();
  contentClone.find(".mw-100").remove();
  contentClone.find(".no-print").remove();

  // Get the raw HTML content
  const rawHtml = contentClone.html() || "";

  // Process the HTML to identify verse blocks
  // Handle various combinations of BR tags and newlines that separate verses
  const processedHtml = rawHtml
    // First normalize all line breaks and make them consistent
    .replace(/\r\n|\r|\n/g, "\n")
    // Replace patterns like <br>\n<br>, <br><br>, or \n<br>\n with verse breaks
    .replace(
      /(<br\s*\/?>)\s*\n?\s*(<br\s*\/?>)/g,
      '<div class="verse-break"></div>',
    )
    // Handle cases where there are multiple BR tags separated by newlines
    .replace(
      /(<br\s*\/?>)\s*\n\s*(<br\s*\/?>)/g,
      '<div class="verse-break"></div>',
    )
    // Replace remaining <br> tags with newlines
    .replace(/<br\s*\/?>/g, "\n");

  // Load the processed HTML back into cheerio
  const processedContent = cheerio.load(
    `<div id="processed-content">${processedHtml}</div>`,
  );

  // Split content by the verse-break markers
  const blocks: string[] = [];
  let currentBlock = "";

  processedContent("#processed-content")
    .contents()
    .each((_, element) => {
      if (processedContent(element).is(".verse-break")) {
        if (currentBlock.trim()) {
          blocks.push(currentBlock.trim());
          currentBlock = "";
        }
      } else if (element.type === "text") {
        currentBlock += processedContent(element).text();
      } else if (!processedContent(element).is("script, style")) {
        // For other elements, get their text content
        currentBlock += processedContent(element).text();
      }
    });

  // Add the last block if it's not empty
  if (currentBlock.trim()) {
    blocks.push(currentBlock.trim());
  }

  // Clean up each block and convert to ContentBlock format
  const contentBlocks: ContentBlock[] = blocks
    .map((block) => {
      const trimmedBlock = block
        .replace(/&nbsp;/g, " ") // Replace &nbsp; with spaces
        .replace(/[-]{3,}/g, "") // Remove dash lines (like '--------')
        .replace(/\s+\n/g, "\n") // Remove trailing spaces before line breaks
        .replace(/\n\s+/g, "\n") // Remove leading spaces after line breaks
        .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
        .trim();

      if (!trimmedBlock) {
        return null; // Skip empty blocks
      }

      const lines = trimmedBlock.split("\n");

      // Default type is verse
      let type = "verse";

      // Common patterns for chorus/refrain markers in Malagasy and French songs
      const chorusPatterns = [
        /^chorus$/i,
        /^refrain$/i,
        /^ref(?:\.|\:)?$/i, // For "Ref", "Ref.", or "Ref:"
        /^fiverenana$/i,
        /^fiv(?:\.|\:)?$/i,
        /^\[chorus\]$/i,
        /^\[refrain\]$/i,
        /^\[ref(?:\.|\:)?\]$/i, // For "[Ref]", "[Ref.]", or "[Ref:]"
        /^\[fiverenana\]$/i,
        /^La La La\.\.\.$/i,
        /^[oO]{2,}$/,
      ];

      // Check if this is a chorus
      const firstLine = lines[0].trim();
      const isChorusMarker = chorusPatterns.some((pattern) =>
        pattern.test(firstLine),
      );

      // Check for repetition patterns indicating chorus
      const repeatedBlock =
        blocks.filter((b) => b.trim() === trimmedBlock).length > 1;

      // Check for parenthesized text that might indicate backing vocals in chorus
      const hasParenthesizedLines = lines.some((line) =>
        /\([^)]+\)/.test(line),
      );

      if (isChorusMarker) {
        type = "chorus";
        // Remove the chorus marker from content
        lines.shift();
      } else if (
        repeatedBlock &&
        (hasParenthesizedLines || trimmedBlock.length < 100)
      ) {
        // Shorter repeated blocks or blocks with backing vocals are likely chorus
        type = "chorus";
      } else if (
        /^[Ll]a [Ll]a [Ll]a|^[Oo]{2,}|^[Nn]a [Nn]a [Nn]a/.test(trimmedBlock)
      ) {
        // Common sound patterns for chorus/bridge
        type = "chorus";
      }

      // Check if verse has a verse number
      const verseNumberPattern = /^\d+[-\)][\s]*/;
      const startsWithVerseNumber = verseNumberPattern.test(lines[0]);
      let verseNumber: number | undefined;

      if (type === "verse" && startsWithVerseNumber) {
        const match = lines[0].match(/^(\d+)[-\)]/);
        if (match && match[1]) {
          verseNumber = parseInt(match[1], 10);
          // Remove the verse number from the first line
          lines[0] = lines[0].replace(verseNumberPattern, "");
        }
      }

      return {
        type,
        content: lines.filter((line) => line.trim().length > 0),
        ...(verseNumber !== undefined && { verseNumber }),
      };
    })
    .filter(Boolean) as ContentBlock[];

  return { content: contentBlocks };
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
