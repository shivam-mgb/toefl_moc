export interface TaskConfig {
  id: string;
  type: 1 | 2 | 3 | 4 ;
  title: string;
  prepTime: number;  // in seconds
    responseTime: number;
    prompt: string;
    readingPassage?: string;
    audioUrl?: string;
    readingTime?: number;
}
