"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

export async function createSong(input: CreateSongInput) {
  return prisma.$transaction(async (tx) => {
    // Create the song with its relationships
    const song = await tx.song.create({
      data: {
        title: input.title,
        slug: input.slug,
        // Handle artists based on input type
        artists: input.artists.every((a) => typeof a === "string")
          ? {
              connect: input.artists.map((id) => ({ id: Number(id) })),
            }
          : {
              create: input.artists as Prisma.ArtistCreateInput[],
            },

        // Create lyrics
        lyric: {
          create: input.lyrics,
        },
      },
      include: {
        artists: true,
        lyric: true,
      },
    });

    return song;
  });
}

export async function getSongs() {
  return prisma.song.findMany({
    include: {
      artists: true,
      lyric: true,
    },
  });
}

export async function getSong(id: number) {
  return prisma.song.findUnique({
    where: {
      id,
    },
    include: {
      artists: true,
      lyric: true,
    },
  });
}

export async function deleteSong(id: string) {
  return prisma.song.delete({
    where: {
      id: Number(id),
    },
  });
}

export type CreateSongInput = {
  title: string;
  artists: Omit<
    Prisma.ArtistCreateInput,
    "songs" | "albums" | "createdAt" | "updatedAt"
  >[];
  lyrics: Omit<Prisma.LyricCreateInput, "song" | "createdAt">;
  slug: string;
};
