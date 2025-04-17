import * as cheerio from "cheerio";

/**
 * Extracts the total number of pages from the pagination
 * @param $ Cheerio object containing the parsed HTML
 * @returns Total number of pages
 */
export const getTotalLyricsPages = ($: cheerio.CheerioAPI): number => {
  const totalPageElement = $("[aria-label='Farany']");

  if (!totalPageElement.length) {
    return 1;
  }

  const href = totalPageElement.attr("href");
  if (!href) {
    return 1;
  }

  try {
    const pageParam = new URL(href).searchParams.get("page");
    const totalPages = pageParam ? parseInt(pageParam, 10) || 1 : 1;
    console.log(`📊 Total pages: ${totalPages}`);
    return totalPages;
  } catch (error) {
    console.error("❌ Error parsing URL from href:", error);
    return 1;
  }
};
