"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

export async function createSong() {
  await prisma.song.create({
    data: {},
  });
}

export type CreateSongInput = {
  title: string;
  lyrics: {
    content: string;
    isSynced: boolean;
  };
};
