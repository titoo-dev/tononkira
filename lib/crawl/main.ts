import { getAllLyricsDatas } from "./lyrics/get-all-lyrics-datas";
import { processSong } from "./processSong";

export const BASE_URL = "https://tononkira.serasera.org";
export const LYRICS_LIST_URL = `${BASE_URL}/tononkira`;

/**
 * Logs a summary of the processing results
 * @param total Total number of songs processed
 * @param success Number of successfully processed songs
 * @param failed Number of failed song processing attempts
 */
function logSummary(total: number, success: number, failed: number): void {
  console.log("=== Summary ===");
  console.log(`Total songs processed: ${total}`);
  console.log(`Successfully created: ${success}`);
  console.log(`Failed to create: ${failed}`);
  console.log("Finished creating songs from links");
}

/**
 * Main function that orchestrates the scraping and processing of songs
 */
async function main() {
  console.log("Starting the scraping process...");

  // Fetch song data
  const songs = await getAllLyricsDatas(601, 762);
  console.log(`Retrieved ${songs.length} song links to process`);

  let successCount = 0;
  let failCount = 0;

  // Process each song
  console.log("Starting to process songs and create database entries...");
  for (let i = 0; i < songs.length; i++) {
    console.log(
      `Processing song ${i + 1}/${songs.length}: ${songs[i].song.title || "Unknown"}`,
    );

    const result = await processSong(songs[i]);
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  // Log final summary
  logSummary(songs.length, successCount, failCount);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
