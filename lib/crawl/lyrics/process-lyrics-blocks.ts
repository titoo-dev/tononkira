import * as cheerio from "cheerio";
import { ContentBlock, LyricsData } from "../types";

/**
 * Extracts the lyrics content from a song page
 * @param $ Cheerio object containing the parsed HTML of the song page
 * @returns The lyrics content as a string
 */
export const processLyricsBlocks = ($: cheerio.CheerioAPI): LyricsData => {
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
