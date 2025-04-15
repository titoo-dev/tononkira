import { getAllLyricsLinks } from "@/lib/scrap/songs";
import { createSong, CreateSongInput } from "../actions/songs";
import { slugify } from "../utils";

async function main() {
  console.log("Starting the scraping process...");

  const songs = await getAllLyricsLinks(601, 762);
  console.log(`Retrieved ${songs.length} song links to process`);

  let successCount = 0;
  let failCount = 0;

  // Process each link and create songs
  console.log("Starting to process songs and create database entries...");
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    console.log(
      `Processing song ${i + 1}/${songs.length}: ${song.song.title || "Unknown"}`,
    );

    try {
      // Extract data from the link
      const songData: CreateSongInput = {
        title: song.song.title || "Unknown Title",
        slug: slugify(song.song.title || "unknown-title"),
        artists: [
          {
            name: song.artist.name,
            url: song.artist.url,
            slug: slugify(song.artist.name),
          },
        ],
        album: { title: "Unknown Album" },
        lyrics: {
          content: song.song.lyrics || "No lyrics available",
          createdBy: "Unknown User",
          url: song.song.url,
        },
      };

      console.log(
        `Creating song in database: "${songData.title}" by ${songData.artists[0].name}`,
      );

      // Create the song in the database
      const createdSong = await createSong(songData);
      console.log(`Success! Created song with ID: ${createdSong.id}`);
      successCount++;
    } catch (error) {
      console.error(
        `Failed to create song for link: ${JSON.stringify(song)}`,
        error,
      );
      failCount++;
      // Continue with the next link even if one fails
    }
  }

  console.log("=== Summary ===");
  console.log(`Total songs processed: ${songs.length}`);
  console.log(`Successfully created: ${successCount}`);
  console.log(`Failed to create: ${failCount}`);
  console.log("Finished creating songs from links");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
