"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

export async function createSong(input: CreateSongInput) {
  return prisma.song.create({
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
      slug: input.slug,
    },
  });
}

export async function getSongs() {
  return prisma.song.findMany({
    include: {
      artists: true,
      album: true,
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
      album: true,
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
  artists:
    | string[]
    | Omit<
        Prisma.ArtistCreateInput,
        "songs" | "albums" | "createdAt" | "updatedAt"
      >[];
  album:
    | string
    | Omit<
        Prisma.AlbumCreateInput,
        "createdAt" | "artists" | "songs" | "updatedAt"
      >;
  lyrics: Omit<Prisma.LyricCreateInput, "song" | "createdAt">;
  slug: string;
};
