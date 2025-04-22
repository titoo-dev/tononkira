"use server";

import { Groq } from "groq-sdk";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import type { LyricsAnalysis } from "../crawl/types";
import { fetchLyricsContentPage } from "../crawl/lyrics/fetch-lyrics-content-page";
import { processLyricsRawText } from "../crawl/lyrics/process-lyrics-raw-text";

// Create Groq client instance
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// System prompt for the LLM to analyze and structure lyrics
const systemPrompt = `
Tu es un expert en extraction de paroles de chansons malgaches. Voici le texte brut des paroles :

{texte_brut}

Analyse le contenu et renvoie UNIQUEMENT un JSON structuré avec ces règles :
1. Format :
{
    "content": [
        {
            "type": "couplet" | "refrain" | "pont" | "introduction",
            "verseNumber": (optionnel, pour les couplets),
            "content": ["ligne 1", "ligne 2", ...]
        },
        ...
    ]
}
2. Consignes :
- Ne garde que les paroles, supprime les annotations (accords, numéros de page, etc.).
- Distingue clairement les couplets, refrains et autres sections.
- Les section sont toujours separée par deux saut de ligne.
- Si une section est répétée (ex: refrain), incluez-la à chaque occurrence.
- Corrige les sauts de ligne parasites.
- Si tu percois des virgules parasites à la fin de chaque ligne, supprime-les.
- Maintiens les retours à la ligne tant que possible
`;

/**
 * Makes a request to the Groq API to analyze lyrics content
 * @param content The raw lyrics content to analyze
 * @returns The parsed lyrics analysis from Groq
 */
async function analyzeLyricsWithGroq(content: string): Promise<LyricsAnalysis> {
  try {
    const userPrompt = `Texte brut à analyser: ${content}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 1,
      max_completion_tokens: 3024,
      top_p: 1,
      stop: null,
      response_format: { type: "json_object" },
    });

    // Parse the content and handle potential JSON parsing errors
    const responseContent = chatCompletion.choices[0]?.message.content || "{}";
    return JSON.parse(responseContent) as LyricsAnalysis;
  } catch (error) {
    console.error("Error analyzing lyrics with Groq:", error);
    throw new Error(
      `Failed to analyze lyrics with Groq: ${(error as Error).message}`,
    );
  }
}

/**
 * Server action to fix and structure lyrics using AI
 * @param lyricId The ID of the lyric to fix
 * @param artistSlug The slug of the artist (for path revalidation)
 * @param songSlug The slug of the song (for path revalidation)
 * @returns Object containing success status and message
 */
export async function fixLyricsWithAI(
  lyricId: number,
  artistSlug: string,
  songSlug: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Fetch the current lyric content
    const lyric = await prisma.lyric.findUnique({
      where: { id: lyricId },
      select: { content: true, contentText: true, url: true },
    });

    if (!lyric) {
      return { success: false, message: "Lyric not found" };
    }

    const htmlContent = await fetchLyricsContentPage(lyric.url);

    const textContent = processLyricsRawText(htmlContent);

    // 3. Analyze with AI
    const analysis = await analyzeLyricsWithGroq(textContent);

    console.dir(analysis, { depth: null });

    // 5. Update the lyric in the database
    await prisma.lyric.update({
      where: { id: lyricId },
      data: {
        content: JSON.stringify(analysis), // Store the structured content as JSON
        contentText: textContent, // Ensure we store the plain text version
        updatedAt: new Date(),
      },
    });

    // 6. Revalidate the page path to reflect changes
    if (artistSlug && songSlug) {
      revalidatePath(`/lyrics/${artistSlug}/${songSlug}`);
    }

    return {
      success: true,
      message: "Lyrics have been successfully structured and updated",
    };
  } catch (error) {
    console.error("Error fixing lyrics with AI:", error);
    return {
      success: false,
      message: `Failed to fix lyrics: ${(error as Error).message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
