import { createSong } from "../actions/songs";
import { formatSongData } from "./format-song-data";
import { SongData } from "./types";

/**
 * Processes a single song and inserts it into the database
 * @param songData Raw song data from scraping
 * @returns Result object indicating success or failure
 */
export async function processSong(
  songData: SongData,
): Promise<{ success: boolean; id?: string; error?: unknown }> {
  try {
    const formattedData = formatSongData(songData);
    console.log(
      `Creating song in database: "${formattedData.title}" by ${formattedData.artists[0].name}`,
    );

    const createdSong = await createSong(formattedData);
    console.log(`Success! Created song with ID: ${createdSong.id}`);

    return { success: true, id: createdSong.id.toString() };
  } catch (error) {
    console.error(
      `Failed to create song: ${songData.song.title || "Unknown"}`,
      error,
    );
    return { success: false, error };
  }
}
