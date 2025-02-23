export interface TaskConfig {
  id: string;
  type: 'independent' | 'integrated';
  title: string;
  prepTime: number;  // in seconds
  responseTime: number;
  prompt: string;
  readingPassage?: string;
  audioUrl?: string;
}
