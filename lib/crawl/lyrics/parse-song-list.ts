import * as cheerio from "cheerio";
import { SongData } from "../types";
import { BASE_URL } from "../main";
import { fetchLyricsContentPage } from "./fetch-lyrics-content-page";
import { processLyricsBlocks } from "./process-lyrics-blocks";

/**
 * Parses lyrics links from a page
 * @param $ Cheerio object containing the parsed HTML
 * @returns Array of link data objects
 */
export const parseSongList = async (
  $: cheerio.CheerioAPI,
): Promise<SongData[]> => {
  const links: SongData[] = [];

  const songDivs = $("#main div").filter((_, div) =>
    $(div).hasClass("border p-2 mb-3"),
  );
  console.log(`📋 Found ${songDivs.length} song entries`);

  songDivs.each((index, div) => {
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

  // fetch lyrics content and parse those for each links
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    console.log(
      `📄 [${i + 1}/${links.length}] Fetching lyrics for "${link.song.title}" by ${link.artist.name}`,
    );
    try {
      const content = await fetchLyricsContentPage(link.song.url);
      const parsedContent = processLyricsBlocks(content);
      link.song.lyrics = JSON.stringify(parsedContent);
    } catch (error) {
      console.error(
        `❌ Error processing lyrics for "${link.song.title}":`,
        error,
      );
    }
  }

  return links;
};
