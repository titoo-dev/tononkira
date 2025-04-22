import { Groq } from "groq-sdk";
import { fetchLyricsContentPage } from "./lyrics/fetch-lyrics-content-page";
import { processLyricsRawText } from "./lyrics/process-lyrics-raw-text";
import { LyricsAnalysis } from "./types";

const systemPrompt = `
Tu es un expert en extraction de paroles de chansons malgaches. Voici le texte brut d'une page web contenant des paroles :

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

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Formats the extracted content into a prompt for the LLM
 * @param content The processed lyrics content
 * @returns A formatted user prompt
 */
function formatUserPrompt(content: string): string {
  return `Texte brut à analyser: ${content}`;
}

/**
 * Makes a request to the Groq API to analyze lyrics content
 * @param systemPrompt The system instructions for the LLM
 * @param userPrompt The user prompt containing the lyrics to analyze
 * @returns The parsed lyrics analysis from Groq
 */
async function analyzeLyricsWithGroq(
  systemPrompt: string,
  userPrompt: string,
): Promise<LyricsAnalysis> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stop: null,
      response_format: { type: "json_object" },
    });

    // Parse the content and handle potential JSON parsing errors
    const content = chatCompletion.choices[0]?.message.content || "{}";
    return JSON.parse(content) as LyricsAnalysis;
  } catch (error) {
    console.error("Error analyzing lyrics with Groq:", error);
    throw new Error("Failed to analyze lyrics with Groq");
  }
}

/**
 * Main function to orchestrate the lyrics extraction and analysis process
 */
async function main() {
  try {
    // Fetch and process the lyrics from the webpage
    const rawContent = await fetchLyricsContentPage(
      "https://tononkira.serasera.org/hira/serafima-ambohibao-toby/tsaroanao-ve",
    );
    const parsedContent = processLyricsRawText(rawContent);

    // Create the prompt and analyze with Groq
    const userPrompt = formatUserPrompt(parsedContent);
    const response = await analyzeLyricsWithGroq(systemPrompt, userPrompt);

    // Output the structured lyrics
    console.dir(response, { depth: null });
  } catch (error) {
    console.error("Error in lyrics analysis:", error);
    throw error;
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
