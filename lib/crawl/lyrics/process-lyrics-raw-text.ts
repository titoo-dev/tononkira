import * as cheerio from "cheerio";

/**
 * Extracts the raw lyrics content text from a song page
 * @param $ Cheerio object containing the parsed HTML of the song page
 * @returns The lyrics content as a plain text string
 */
export const processLyricsRawText = ($: cheerio.CheerioAPI): string => {
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

  // Process the content to extract only the lyrics text
  const lyricsText = contentClone
    .contents()
    .filter(function () {
      // Filter out specific sections we don't want
      return !$(this).is(
        "h2, .text-end, .print, .mw-100, .no-print, script, style",
      );
    })
    .text()
    // Clean up the text
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with spaces
    .replace(/[-]{3,}/g, "") // Remove dash lines (like '--------')
    .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
    .trim();

  return lyricsText;
};
