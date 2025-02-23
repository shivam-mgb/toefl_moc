export type TrackType = 'conversation' | 'lecture';

export type QuestionType = 'single-choice' | 'multiple-choice-multiple-answer' | 'table-completion';

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  hasAudioSnippet?: boolean;
  type: QuestionType;
}

export interface TableCompletionQuestion extends Omit<Question, 'options' | 'hasAudioSnippet'> {
    type: 'table-completion';
    columnHeaders: string[];
    rowHeaders: string[];
    answers: (string | boolean)[][];
}

export interface TrackConfig {
  id: string;
  type: TrackType;
  title: string;
  audioLength: number; // in seconds
  questionCount: number;
  imageUrl: string;
  audioSrc: string;
  questions: (Question | TableCompletionQuestion)[];
}
