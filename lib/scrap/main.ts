import { parseLyricsContent, fetchLyricsContentPage } from "@/lib/scrap/songs";

async function main() {
  const content = await fetchLyricsContentPage(
    "https://tononkira.serasera.org/hira/aifa-imerintsiatosika-aina-sy-fanahy-ziona-vaovao-imerintsiatosika/velona-mandrakizay",
  );

  const parsedContent = parseLyricsContent(content);

  console.dir(parsedContent, { depth: null });

  // const songs = await getAllLyricsLinks(6, 11);
  // console.log(songs);

  // // Process each link and create songs
  // for (const song of songs) {
  //   try {
  //     // Extract data from the link
  //     const songData: CreateSongInput = {
  //       title: song.song.title || "Unknown Title",
  //       slug: slugify(song.song.title || "unknown-title"),
  //       artists: song.artist
  //         ? [
  //             {
  //               name: song.artist.name,
  //               url: song.artist.url,
  //               slug: slugify(song.artist.name),
  //             },
  //           ]
  //         : [{ name: "Unknown Artist", slug: "unknown-artist" }],
  //       album: { title: "Unknown Album" },
  //       lyrics: {
  //         content: "",
  //         createdBy: "Unknown User",
  //         url: song.song.url,
  //       },
  //     };

  //     console.log(`Creating song: ${songData.title}`);

  //     // Create the song in the database
  //     const createdSong = await createSong(songData);
  //     console.log(`Created song with ID: ${createdSong.id}`);
  //   } catch (error) {
  //     console.error(
  //       `Failed to create song for link: ${JSON.stringify(song)}`,
  //       error,
  //     );
  //     // Continue with the next link even if one fails
  //   }
  // }

  // console.log("Finished creating songs from links");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
