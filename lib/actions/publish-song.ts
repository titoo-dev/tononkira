"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { slugify } from "@/lib/utils";

export async function publishSong(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Vous devez être connecté pour publier une chanson." };
  }

  const title = formData.get("title") as string;
  const artistName = formData.get("artist") as string;
  const lyrics = formData.get("lyrics") as string;
  const language = (formData.get("language") as string) || "mg";
  const url = (formData.get("url") as string) || "";

  if (!title?.trim() || !artistName?.trim() || !lyrics?.trim()) {
    return { error: "Le titre, l'artiste et les paroles sont requis." };
  }

  const artistSlug = slugify(artistName);
  const songSlug = slugify(title);

  // Find or create artist
  let artist = await prisma.artist.findFirst({
    where: { slug: artistSlug },
  });

  if (!artist) {
    artist = await prisma.artist.create({
      data: {
        name: artistName.trim(),
        slug: artistSlug,
      },
    });
  }

  // Create lyric
  const lyric = await prisma.lyric.create({
    data: {
      content: JSON.stringify([{ type: "verse", text: lyrics.trim() }]),
      contentText: lyrics.trim(),
      url: url || `user://${session.user.id}`,
      language,
      createdBy: session.user.name,
    },
  });

  // Create song
  await prisma.song.create({
    data: {
      title: title.trim(),
      slug: songSlug,
      lyricId: lyric.id,
      publishedById: session.user.id,
      artists: {
        connect: { id: artist.id },
      },
    },
  });

  return {
    artistSlug,
    songSlug,
  };
}
