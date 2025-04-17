import { CreateSongInput } from "../actions/songs";
import { slugify } from "../utils";
import { SongData } from "./types";

/**
 * Transforms raw song data into the format required for database creation
 * @param songData Raw song data from scraping
 * @returns Formatted song input ready for database insertion
 */
export function formatSongData(songData: SongData): CreateSongInput {
  return {
    title: songData.song.title || "Unknown Title",
    slug: slugify(songData.song.title || "unknown-title"),
    artists: [
      {
        name: songData.artist.name,
        url: songData.artist.url,
        slug: slugify(songData.artist.name),
      },
    ],
    album: { title: "Unknown Album" },
    lyrics: {
      content: songData.song.lyrics || "No lyrics available",
      createdBy: "Unknown User",
      url: songData.song.url,
    },
  };
}
