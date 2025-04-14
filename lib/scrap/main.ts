import { getAllLyricsLinks } from "@/lib/scrap/songs";
import { createSong, CreateSongInput } from "@/lib/actions/songs";

async function main() {
  const songs = await getAllLyricsLinks(1, 5);
  console.log(songs);

  // Import necessary functions

  // Process each link and create songs
  for (const song of songs) {
    try {
      // Extract data from the link
      // Assuming link structure contains title, artist info, etc.
      // You might need to adjust this based on your actual link structure
      const songData: CreateSongInput = {
        title: song.song.title || "Unknown Title",
        artists: song.artist ? [song.artist] : [{ name: "Unknown Artist" }],
        album: { title: "Unknown Album" },
        lyrics: {
          content: "",
          createdBy: "Unknown User",
        },
      };

      console.log(`Creating song: ${songData.title}`);

      // Create the song in the database
      const createdSong = await createSong(songData);
      console.log(`Created song with ID: ${createdSong.id}`);
    } catch (error) {
      console.error(
        `Failed to create song for link: ${JSON.stringify(song)}`,
        error,
      );
      // Continue with the next link even if one fails
    }
  }

  console.log("Finished creating songs from links");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
