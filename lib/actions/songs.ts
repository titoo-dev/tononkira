"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

export async function createSong(input: CreateSongInput) {
  await prisma.song.create({
    data: {
      title: input.title,
      artists: input.artists.every((a) => typeof a === "string")
        ? {
            connect: input.artists.map((id) => ({ id: Number(id) })),
          }
        : {
            create: input.artists as Prisma.ArtistCreateInput[],
          },

      album:
        typeof input.album === "string"
          ? {
              connect: { id: Number(input.album) },
            }
          : {
              create: input.album as Prisma.AlbumCreateInput,
            },

      lyric: {
        create: input.lyrics,
      },
    },
  });
}

export type CreateSongInput = {
  title: string;
  artists: string[] | Prisma.ArtistCreateInput[];
  album: string | Prisma.AlbumCreateInput;
  lyrics: Omit<Prisma.LyricCreateInput, "song" | "createdAt">;
};
