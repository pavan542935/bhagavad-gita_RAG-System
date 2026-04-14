export interface GitaVerse {
  chapter: number;
  verse: number;
  speaker: string;
  sanskrit: string;
  translation: string;
  explanation: string;
}

export interface GitaResponse {
  answer: string;
  verses?: GitaVerse[];
  life_application?: string;
}

export interface GitaRequest {
  query: string;
}
