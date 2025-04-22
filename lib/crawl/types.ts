export interface SongData {
  artist: { name: string; url: string };
  song: { title: string; url: string; lyrics?: string };
}

export interface LyricsData {
  content: ContentBlock[];
}

export interface ContentBlock {
  type: string;
  content: string[];
}

interface LyricsSection {
  type: "couplet" | "refrain" | "pont" | "introduction";
  verseNumber?: number;
  content: string[];
}

export interface LyricsAnalysis {
  content: LyricsSection[];
}
