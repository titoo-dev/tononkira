import { LinkData } from "./types.ts";
import { DOMParser, type HTMLDocument } from "deno-dom";
const BASE_URL = "https://tononkira.serasera.org";
const LYRICS_LIST_URL = `${BASE_URL}/tononkira`;
const parser = new DOMParser();
const fetchLyricsPage = async (page: number): Promise<HTMLDocument> => {
  const url = new URL(LYRICS_LIST_URL);
  url.searchParams.set("page", page.toString());
  const pageText = await fetch(url, { headers: { accept: "text/html" } }).then(
    (res) => res.text(),
  );
  return parser.parseFromString(pageText, "text/html")!;
};
const getTotalLyricsPages = (dom: HTMLDocument): number => {
  const totalPageElement = dom.querySelector<HTMLAnchorElement>(
    "[aria-label='Farany']",
  );
  if (!totalPageElement) return 1;
  const pageParam = new URL(
    totalPageElement.getAttribute("href")!,
  ).searchParams.get("page");
  return pageParam ? parseInt(pageParam, 10) || 1 : 1;
};
const parseLyricsLinks = (dom: HTMLDocument): LinkData[] => {
  return Array.from(dom.querySelectorAll("#main div"))
    .map((div) =>
      Array.from(div.querySelectorAll(`a[href^="${BASE_URL}/hira"]`)).slice(
        0,
        2,
      ),
    )
    .filter((links) => links.length > 0)
    .map(([title, artist]) => ({
      artist: {
        name: artist?.textContent?.trim() || "",
        url: artist?.getAttribute("href") || "",
      },
      song: {
        title: title?.textContent?.trim() || "",
        url: title?.getAttribute("href") || "",
      },
    }));
};
const fetchLinksInRange = async (start: number, end: number) => {
  const allData: LinkData[] = [];
  for (let i = start; i <= end; i += 5) {
    const pageNumbers = Array.from(
      { length: Math.min(5, end - i + 1) },
      (_, idx) => i + idx,
    );
    const chunks = await Promise.all(pageNumbers.map(fetchLyricsPage));
    chunks.forEach((dom) => allData.push(...parseLyricsLinks(dom)));
  }
  return allData;
};
export const getAllLyricsLinks = async (start: number, end: number) => {
  const initialPage = await fetchLyricsPage(1);
  const totalPages = getTotalLyricsPages(initialPage);
  const rangeStart = Math.max(1, start);
  const rangeEnd = Math.min(totalPages, end);
  return fetchLinksInRange(rangeStart, rangeEnd);
};

// for (let i = 0; i < totalLinks; i++) {
//   const songLinkEl = $(`#main > div:nth-child(${6 + i}) > a:nth-child(1)`);
//   const artistLinkEl = $(`#main > div:nth-child(${6 + i}) > a:nth-child(2)`);
//   console.log(songLinkEl, artistLinkEl);

//   links.push({
//     artist: {
//       name: artistLinkEl.text().trim() || "",
//       url: artistLinkEl.attr("href") || "",
//     },
//     song: {
//       title: songLinkEl.text().trim() || "",
//       url: songLinkEl.attr("href") || "",
//     },
//   });
// }
