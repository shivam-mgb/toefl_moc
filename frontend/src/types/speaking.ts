export interface TaskConfig {
  id: string;
  type: number ;
  title: string;
  prepTime: number;  // in seconds
    responseTime: number;
    prompt: string;
    promptAudio: string | null;
    readingPassage?: string;
    audioUrl?: string;
    readingTime?: number;
}
